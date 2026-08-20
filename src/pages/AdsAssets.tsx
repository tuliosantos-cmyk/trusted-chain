import { useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download } from "lucide-react";
import { AdFrame, adArts, type AdArt } from "@/components/ads/AdArtworks";
import { Button } from "@/components/ui/button";

const FORMATS = [
  { id: "square", label: "1:1 · 1200×1200", w: 1200, h: 1200 },
  { id: "landscape", label: "1,91:1 · 1200×628", w: 1200, h: 628 },
] as const;

const downloadSvgAsPng = (svg: SVGSVGElement, w: number, h: number, filename: string) => {
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
    if (ctx) {
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
      }, "image/png");
    }
    URL.revokeObjectURL(url);
  };
  img.src = url;
};

const AssetCard = ({ art, format }: { art: AdArt; format: (typeof FORMATS)[number] }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  const handleDownload = useCallback(() => {
    if (ref.current) downloadSvgAsPng(ref.current, format.w, format.h, `myts-${art.id}-${format.w}x${format.h}.png`);
  }, [art.id, format]);

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-secondary/40">
        <AdFrame art={art} width={format.w} height={format.h} svgRef={(el) => (ref.current = el)} />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-primary">{art.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {format.label} · {art.note}
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
  const downloadAll = () => {
    document.querySelectorAll<SVGSVGElement>("svg[data-ad-asset]").forEach((svg, i) => {
      const w = Number(svg.dataset.w);
      const h = Number(svg.dataset.h);
      setTimeout(() => downloadSvgAsPng(svg, w, h, `${svg.dataset.name}-${w}x${h}.png`), i * 350);
    });
  };

  return (
    <>
      <Helmet>
        <title>Recursos de imagem para Google Ads | MyTS</title>
        <meta
          name="description"
          content="Biblioteca de recursos de imagem 1:1 e 1,91:1 para campanhas de Pesquisa e Performance Max, sem texto ou logo sobreposto."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <header className="border-b border-border bg-gradient-card">
          <div className="container mx-auto max-w-7xl px-6 py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Google Ads · image assets</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
              Recursos de imagem — sem texto, sem logo
            </h1>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Nove artes vetoriais em dois formatos aprovados (1200×1200 e 1200×628). Nenhuma palavra, número ou marca
              sobreposta; conteúdo centralizado ocupando cerca de 80% do quadro, sem colagem, desfoque ou bordas vazias.
              Cada arte é SVG — exporte em PNG no botão do card, na resolução exata exigida.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button onClick={downloadAll}>
                <Download className="size-4" />
                Baixar todos em PNG
              </Button>
              <span className="text-xs text-muted-foreground">
                Paleta #1F3864 · #2E5BAA · #F5F7FA · branco — arquivos bem abaixo de 5.120 KB
              </span>
            </div>
          </div>
        </header>

        {FORMATS.map((format) => (
          <section key={format.id} className="container mx-auto max-w-7xl px-6 py-12">
            <h2 className="font-display text-xl font-bold text-primary">Formato {format.label}</h2>
            <div
              className={`mt-6 grid gap-6 ${format.id === "square" ? "sm:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2"}`}
            >
              {adArts.map((art) => (
                <AssetCard key={`${art.id}-${format.id}`} art={art} format={format} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default AdsAssets;
