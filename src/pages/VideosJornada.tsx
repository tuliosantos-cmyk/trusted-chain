import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, Film, Image as ImageIcon, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import JCanvas from "@/components/jornada/JCanvas";
import { JVideo, jDuration } from "@/lib/jornada/engine";
import { JORNADA_VIDEOS, gifVersion } from "@/lib/jornada/videos";
import { buildGif, download, recordMp4 } from "@/lib/jornada/export";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap";

type Job = { kind: "mp4" | "gif"; phase: "render" | "convert" | "done"; pct: number };

function Card({ video }: { video: JVideo }) {
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  const runMp4 = async () => {
    if (job) return;
    setJob({ kind: "mp4", phase: "render", pct: 0 });
    try {
      const { blob, ext } = await recordMp4(video, (p) =>
        setJob({ kind: "mp4", phase: p.phase, pct: p.pct }),
      );
      download(blob, `jornada-${video.id}.${ext}`);
      if (ext === "webm")
        toast.warning("Baixado em .webm", {
          description: "A conversão para MP4 não rodou neste navegador.",
        });
      else toast.success("MP4 gerado", { description: video.title });
    } catch (e) {
      toast.error("Falha ao gerar o vídeo", {
        description: e instanceof Error ? e.message : "Tente no Chrome mais recente.",
      });
    } finally {
      setJob(null);
    }
  };

  const runGif = async () => {
    if (job) return;
    setJob({ kind: "gif", phase: "render", pct: 0 });
    try {
      const blob = await buildGif(gifVersion(video), (p) =>
        setJob({ kind: "gif", phase: p.phase, pct: p.pct }),
      );
      download(blob, `jornada-${video.id}-curto.gif`);
      toast.success("GIF gerado", {
        description: "Versão curta (720×720, 12 fps) para envio no WhatsApp.",
      });
    } catch (e) {
      toast.error("Falha ao gerar o GIF", {
        description: e instanceof Error ? e.message : "Tente novamente.",
      });
    } finally {
      setJob(null);
    }
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex justify-center bg-muted/40 p-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Assistir ${video.title}`}
          className="w-full max-w-[320px] overflow-hidden rounded-xl bg-[#577550] transition-opacity hover:opacity-90"
          style={{ aspectRatio: "1 / 1" }}
        >
          <JCanvas video={video} staticAt={1.7} scale={0.36} className="h-full w-full" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h2 className="text-lg font-bold leading-tight">{video.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{video.subtitle}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          1:1 · 1080×1080 · {jDuration(video).toFixed(1)}s · mudo
        </p>

        {job ? (
          <div className="space-y-2">
            <Progress value={Math.round(job.pct * 100)} />
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              {job.kind === "gif"
                ? "Montando GIF quadro a quadro…"
                : job.phase === "render"
                  ? "Gravando em 1080×1080…"
                  : "Convertendo para MP4…"}{" "}
              {Math.round(job.pct * 100)}%
            </p>
          </div>
        ) : (
          <div className="mt-auto flex gap-2 pt-1">
            <Button className="flex-1" onClick={runMp4}>
              <Download className="mr-2 h-4 w-4" /> Baixar MP4
            </Button>
            <Button variant="outline" className="flex-1" onClick={runGif}>
              <ImageIcon className="mr-2 h-4 w-4" /> Baixar GIF
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none border-0 bg-transparent p-0 shadow-none sm:max-w-none">
          <div className="flex flex-col items-center gap-4">
            <div
              className="overflow-hidden rounded-xl bg-black shadow-2xl"
              style={{ aspectRatio: "1 / 1", height: "min(78vh, 78vw)" }}
            >
              <JCanvas video={video} playing={open} scale={0.72} className="h-full w-full" />
            </div>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              <X className="mr-2 h-4 w-4" /> Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

export default function VideosJornada() {
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
        <title>Vídeos Jornada da Autonomia | Carrefour x MyTS</title>
        <meta
          name="description"
          content="Três vídeos quadrados 1:1 da Jornada da Autonomia para envio por WhatsApp aos fornecedores Carrefour, com download em MP4 e GIF."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="border-b border-border bg-[#577550] text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Carrefour · MyTS
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Jornada da Autonomia — vídeos de aviso
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Comunicação obrigatória para fornecedores, feita para leitura rápida no celular.
            Quadrado 1080×1080, sem áudio, texto entrando palavra por palavra.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {JORNADA_VIDEOS.map((v) => (
            <Card key={v.id} video={v} />
          ))}
        </div>

        <section className="mt-10 max-w-3xl space-y-3 text-xs leading-relaxed text-muted-foreground">
          <p className="flex items-start gap-2">
            <Film className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              O MP4 é gravado no navegador em resolução real (1080×1080, 60 fps) e convertido
              automaticamente quando necessário. Mantenha a aba aberta durante o processo.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <ImageIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              O GIF sai numa versão curta de propósito: só a tela de peso (“Participação
              obrigatória”) e o contato, em 720×720 a 12 fps. GIF não tem compressão de vídeo e
              fica pesado rápido — nessa configuração ele abre mesmo com sinal fraco. A sequência
              completa fica no MP4.
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}
