import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Download, Loader2, Play, X } from "lucide-react";
import VideoCanvas from "@/components/adsvideo/VideoCanvas";
import { VideoDef } from "@/lib/adsvideo/engine";
import { CAMPAIGNS, FORMATS, FormatId } from "@/lib/adsvideo/registry";
import { download, recordVideo } from "@/lib/adsvideo/record";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap";

type Job = { id: string; phase: "render" | "convert" | "done"; pct: number };

function FormatToggle({
  value,
  onChange,
}: {
  value: FormatId;
  onChange: (v: FormatId) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-border bg-muted/40 p-1">
      {(Object.keys(FORMATS) as FormatId[]).map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            value === f
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

function VideoCard({ video }: { video: VideoDef }) {
  const [format, setFormat] = useState<FormatId>("9:16");
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  const handleDownload = async () => {
    if (job) return;
    setJob({ id: video.id, phase: "render", pct: 0 });
    try {
      const { blob, ext } = await recordVideo(video, format, (p) =>
        setJob({ id: video.id, phase: p.phase, pct: p.pct }),
      );
      const slug = `${video.id}-${format.replace(":", "x")}`;
      download(blob, `myts-${slug}.${ext}`);
      if (ext === "webm")
        toast.warning("Baixado em .webm", {
          description:
            "A conversão automática para MP4 não rodou neste navegador. Converta no HandBrake ou CloudConvert.",
        });
      else toast.success("MP4 gerado", { description: `${video.title} · ${format}` });
    } catch (e) {
      toast.error("Falha ao gerar o vídeo", {
        description: e instanceof Error ? e.message : "Tente no Chrome mais recente.",
      });
    } finally {
      setJob(null);
    }
  };

  const aspect = format === "9:16" ? "9 / 16" : "16 / 9";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-center bg-muted/40 p-4">
        <div
          className="relative w-full max-w-[260px] overflow-hidden rounded-xl bg-[#1F3864]"
          style={{ aspectRatio: aspect }}
        >
          <VideoCanvas
            video={video}
            format={format}
            staticAt={1.8}
            scale={0.35}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Assistir ${video.title}`}
            className="absolute inset-0 grid place-items-center bg-black/0 transition-colors hover:bg-black/25"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-[#1F3864] shadow-lg">
              <Play className="h-6 w-6 translate-x-[2px]" />
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight">{video.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{video.subtitle}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            30s · sem áudio
          </span>
          <FormatToggle value={format} onChange={setFormat} />
        </div>
        <p className="text-xs text-muted-foreground">{FORMATS[format].label}</p>

        {job ? (
          <div className="space-y-2">
            <Progress value={Math.round(job.pct * 100)} />
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              {job.phase === "render"
                ? "Gravando animação em resolução real…"
                : "Convertendo para MP4…"}{" "}
              {Math.round(job.pct * 100)}%
            </p>
          </div>
        ) : (
          <div className="mt-auto flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(true)}>
              <Play className="mr-2 h-4 w-4" /> Assistir
            </Button>
            <Button className="flex-1" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Baixar MP4
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-none border-0 bg-transparent p-0 shadow-none sm:max-w-none"
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="overflow-hidden rounded-xl bg-black shadow-2xl"
              style={{
                aspectRatio: aspect,
                height: format === "9:16" ? "82vh" : "auto",
                width: format === "9:16" ? "auto" : "min(92vw, 1200px)",
              }}
            >
              <VideoCanvas
                video={video}
                format={format}
                playing={open}
                scale={0.6}
                className="h-full w-full"
              />
            </div>
            <div className="flex items-center gap-3">
              <FormatToggle value={format} onChange={setFormat} />
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

export default function VideosAds() {
  const [tab, setTab] = useState(CAMPAIGNS[0].id);
  const current = useMemo(() => CAMPAIGNS.find((c) => c.id === tab)!, [tab]);

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Vídeos de Anúncio MyTS | 9 peças 9:16 e 16:9</title>
        <meta
          name="description"
          content="Biblioteca de 9 vídeos de anúncio animados da MyTS, em 9:16 e 16:9, com preview e download em MP4 para LinkedIn e YouTube."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Vídeos de Anúncio — MyTS
            </h1>
            <p className="text-sm text-muted-foreground">
              9 peças de 30s, sem áudio, em vertical (1080×1920) e horizontal (1920×1080).
            </p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {CAMPAIGNS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setTab(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {current.videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          A geração do MP4 acontece no seu navegador: a animação é gravada em resolução
          real a 60fps com bitrate alto e convertida automaticamente quando necessário.
          Cada arquivo leva cerca de 30 a 60 segundos — mantenha a aba aberta durante o
          processo.
        </p>
      </main>
    </div>
  );
}
