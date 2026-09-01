import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, Film, Image as ImageIcon, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import JCanvas from "@/components/jornada/JCanvas";
import { JVideo, jDuration } from "@/lib/jornada/engine";
import {
  CARD_FREEZE,
  SET_ATACADAO,
  SET_CARREFOUR,
} from "@/lib/jornada/videos";
import { buildGif, download, recordMp4, renderPng } from "@/lib/jornada/export";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap";

type Job = { kind: "mp4" | "gif" | "png"; phase: "render" | "convert" | "done"; pct: number };

type CardProps = {
  video: JVideo;
  /** quais botões mostrar */
  actions?: ("mp4" | "gif" | "png")[];
  staticAt?: number;
  /** GIF mais leve (peça 4) */
  gifFps?: number;
  /** peça de GIF que o botão "Baixar GIF" gera */
  gifVideo: JVideo;
  /** sufixo dos arquivos baixados */
  slug: string;
};

function Card({ video, actions = ["mp4", "gif"], staticAt = 2.9, gifFps = 12, gifVideo, slug }: CardProps) {
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const isCard = actions.length === 1 && actions[0] === "png";

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
      const blob = await buildGif(
        gifVideo,
        (p) => setJob({ kind: "gif", phase: p.phase, pct: p.pct }),
        { fps: gifFps },
      );
      download(blob, `jornada-${slug}-reforco.gif`);
      toast.success("GIF gerado", {
        description: `Peça de reforço (720×720, ${gifFps} fps) para envio no WhatsApp.`,
      });
    } catch (e) {
      toast.error("Falha ao gerar o GIF", {
        description: e instanceof Error ? e.message : "Tente novamente.",
      });
    } finally {
      setJob(null);
    }
  };

  const runPng = async () => {
    if (job) return;
    setJob({ kind: "png", phase: "render", pct: 0.5 });
    try {
      const blob = await renderPng(video, CARD_FREEZE);
      download(blob, `jornada-${slug}-card.png`);
      toast.success("Imagem gerada", { description: "1080×1080, frame do carimbo." });
    } catch (e) {
      toast.error("Falha ao gerar a imagem", {
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
          onClick={() => !isCard && setOpen(true)}
          aria-label={isCard ? video.title : `Assistir ${video.title}`}
          className="w-full max-w-[320px] overflow-hidden rounded-xl bg-[#231f20] transition-opacity hover:opacity-90"
          style={{ aspectRatio: "1 / 1", cursor: isCard ? "default" : "pointer" }}
        >
          <JCanvas
            video={video}
            staticAt={isCard ? CARD_FREEZE : staticAt}
            scale={0.36}
            className="h-full w-full"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h2 className="text-lg font-bold leading-tight">{video.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{video.subtitle}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isCard
            ? "1:1 · 1080×1080 · imagem"
            : `1:1 · 1080×1080 · ${jDuration(video).toFixed(1)}s · mudo`}
        </p>

        {job ? (
          <div className="space-y-2">
            <Progress value={Math.round(job.pct * 100)} />
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              {job.kind === "png"
                ? "Renderizando imagem…"
                : job.kind === "gif"
                  ? "Montando GIF quadro a quadro…"
                  : job.phase === "render"
                    ? "Gravando em 1080×1080…"
                    : "Convertendo para MP4…"}{" "}
              {Math.round(job.pct * 100)}%
            </p>
          </div>
        ) : (
          <div className="mt-auto flex gap-2 pt-1">
            {actions.includes("mp4") && (
              <Button className="flex-1" onClick={runMp4}>
                <Download className="mr-2 h-4 w-4" /> Baixar MP4
              </Button>
            )}
            {actions.includes("gif") && (
              <Button
                variant={actions.includes("mp4") ? "outline" : "default"}
                className="flex-1"
                onClick={runGif}
              >
                <ImageIcon className="mr-2 h-4 w-4" /> Baixar GIF
              </Button>
            )}
            {actions.includes("png") && (
              <Button className="flex-1" onClick={runPng}>
                <ImageIcon className="mr-2 h-4 w-4" /> Baixar imagem
              </Button>
            )}
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


const SETS = [
  { key: "carrefour", label: "Grupo Carrefour", set: SET_CARREFOUR, header: "#577550", eyebrow: "Carrefour · MyTS" },
  { key: "atacadao", label: "Atacadão", set: SET_ATACADAO, header: "#123A24", eyebrow: "Atacadão · MyTS" },
] as const;

export default function VideosJornada() {
  const [redeKey, setRedeKey] = useState<(typeof SETS)[number]["key"]>("carrefour");
  const active = SETS.find((s) => s.key === redeKey)!;
  const { set } = active;

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
        <title>Vídeos Jornada da Autonomia | Carrefour e Atacadão x MyTS</title>
        <meta
          name="description"
          content="Vídeos quadrados 1:1 da Jornada da Autonomia para envio por WhatsApp aos fornecedores Carrefour e Atacadão, com download em MP4 e GIF."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="border-b border-border text-white" style={{ background: active.header }}>
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {active.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Jornada da Autonomia — vídeos de aviso
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Comunicação obrigatória para fornecedores, feita para leitura rápida no celular.
            Quadrado 1080×1080, sem áudio, texto entrando palavra por palavra.
          </p>
          <div className="mt-5 inline-flex rounded-full bg-white/12 p-1">
            {SETS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setRedeKey(s.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  s.key === redeKey ? "bg-white text-[#231f20]" : "text-white/80 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Os três vídeos — {active.label}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {set.videos.map((v) => (
            <Card key={v.id} video={v} gifVideo={set.gif} slug={active.key} />
          ))}
        </div>

        <h2 className="mb-4 mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Peças de apoio
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            video={set.gif}
            gifVideo={set.gif}
            slug={active.key}
            actions={["gif"]}
            gifFps={10}
            staticAt={1.4}
          />
          <Card video={set.card} gifVideo={set.gif} slug={active.key} actions={["png"]} />
        </div>


        <section className="mt-10 max-w-3xl space-y-3 text-xs leading-relaxed text-muted-foreground">
          <p className="flex items-start gap-2">
            <Film className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Abertura-notificação idêntica nos três vídeos, carimbo nas mensagens de peso, tique
              de entregue no contato, linha de leitura entre blocos e discador no telefone. MP4
              gravado no navegador em 1080×1080, 60 fps — mantenha a aba aberta.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <ImageIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              O GIF de reforço é uma peça própria, não o vídeo convertido: carimbo, acesso e
              contato em 720×720 a 10 fps, para abrir mesmo com sinal fraco. O card estático é o
              fallback quando nem vídeo nem GIF carregam.
            </span>
          </p>
        </section>
      </main>

    </div>
  );
}
