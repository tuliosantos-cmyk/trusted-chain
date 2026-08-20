import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import JSZip from "jszip";
import { Download, Loader2 } from "lucide-react";
import { AdFrame, adArts, type AdArt } from "@/components/ads/AdArtworks";
import { adArtsExtra } from "@/components/ads/AdArtworksExtra";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const FORMATS = [
  { id: "square", label: "1:1 · 1200×1200", w: 1200, h: 1200 },
  { id: "landscape", label: "1,91:1 · 1200×628", w: 1200, h: 628 },
] as const;

const ALL_ARTS: AdArt[] = [...adArts, ...adArtsExtra];

const svgToPngBlob = (svg: SVGSVGElement, w: number, h: number): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", String(w));
    clone.setAttribute("height", String(h));
    const data = new XMLSerializer().serializeToString(clone);
    const url = URL.createObjectURL(new Blob([data], { type: "image/svg+xml;charset=utf-8" }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("canvas"));
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("blob"))), "image/png");
    };
    img.onerror = () => reject(new Error("img"));
    img.src = url;
  });

const saveBlob = (blob: Blob, filename: string) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
};

const AssetCard = ({
  art,
  format,
  withLogo,
}: {
  art: AdArt;
  format: (typeof FORMATS)[number];
  withLogo: boolean;
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  const handleDownload = async () => {
    if (!ref.current) return;
    const blob = await svgToPngBlob(ref.current, format.w, format.h);
    saveBlob(blob, `myts-${art.id}${withLogo ? "-logo" : ""}-${format.w}x${format.h}.png`);
  };

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-secondary/40">
        <AdFrame
          art={art}
          width={format.w}
          height={format.h}
          withLogo={withLogo}
          svgRef={(el) => (ref.current = el)}
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-primary">{art.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {art.group} · {format.label}
          </p>
        </div>
        <Button size="sm" variant="secondary" onClick={handleDownload} className="shrink-0">
          <Download className="size-4" />
          PNG
        </Button>
      </figcaption>
    </figure>
  );
};

const AdsAssets = () => {
  const [withLogo, setWithLogo] = useState(false);
  const [busy, setBusy] = useState(false);
  const total = useMemo(() => ALL_ARTS.length * FORMATS.length, []);

  const downloadAllZip = async () => {
    setBusy(true);
    try {
      const zip = new JSZip();
      const nodes = Array.from(document.querySelectorAll<SVGSVGElement>("svg[data-ad-asset]"));
      for (const svg of nodes) {
        const w = Number(svg.dataset.w);
        const h = Number(svg.dataset.h);
        const blob = await svgToPngBlob(svg, w, h);
        zip.file(`${w === h ? "1x1" : "1.91x1"}/${svg.dataset.name}-${w}x${h}.png`, blob);
      }
      const out = await zip.generateAsync({ type: "blob" });
      saveBlob(out, `myts-google-ads-imagens${withLogo ? "-com-logo" : ""}.zip`);
      toast.success(`${nodes.length} imagens exportadas em ZIP`);
    } catch {
      toast.error("Não foi possível gerar o ZIP. Tente novamente.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recursos de imagem para Google Ads | MyTS</title>
        <meta
          name="description"
          content="Biblioteca de recursos de imagem 1:1 e 1,91:1 para campanhas de Pesquisa e Performance Max, sem texto sobreposto."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <header className="border-b border-border bg-gradient-card">
          <div className="container mx-auto max-w-7xl px-6 py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Google Ads · image assets</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
              Biblioteca de recursos de imagem
            </h1>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              {ALL_ARTS.length} artes vetoriais em dois formatos aprovados — {total} imagens no total, dentro do limite
              de 60 recursos por campanha. Nenhuma palavra ou número real, conteúdo centralizado ocupando ~80% do quadro,
              sem colagem, desfoque ou bordas vazias. Exporte em PNG na resolução exata (1200×1200 e 1200×628).
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button onClick={downloadAllZip} disabled={busy}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
                Baixar todas em ZIP ({total})
              </Button>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                <Switch id="logo" checked={withLogo} onCheckedChange={setWithLogo} />
                <Label htmlFor="logo" className="cursor-pointer text-sm text-primary">
                  Incluir marca MyTS
                </Label>
              </div>
            </div>

            <p className="mt-4 max-w-3xl rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm text-primary">
              <strong>Atenção:</strong> a Rede de Pesquisa não aceita logo sobreposto na imagem — mantenha o botão
              desligado para esses recursos. Ative a marca apenas para Performance Max e Display, onde ela é tolerada;
              nesses casos o símbolo entra pequeno e no canto, sem competir com o conteúdo.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Paleta #1F3864 · #2E5BAA · #F5F7FA · branco — cada PNG fica bem abaixo de 5.120 KB.
            </p>
          </div>
        </header>

        {FORMATS.map((format) => (
          <section key={format.id} className="container mx-auto max-w-7xl px-6 py-12">
            <h2 className="font-display text-xl font-bold text-primary">
              Formato {format.label} <span className="text-muted-foreground">· {ALL_ARTS.length} imagens</span>
            </h2>
            <div
              className={`mt-6 grid gap-6 ${format.id === "square" ? "sm:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2"}`}
            >
              {ALL_ARTS.map((art) => (
                <AssetCard key={`${art.id}-${format.id}`} art={art} format={format} withLogo={withLogo} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default AdsAssets;
