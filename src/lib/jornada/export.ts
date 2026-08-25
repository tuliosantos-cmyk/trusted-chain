import { preloadImages } from "@/lib/adsvideo/engine";
import { CANVAS, JVideo, jDuration, renderJ } from "./engine";
import { ALL_JORNADA_LOGOS } from "./videos";

export type ExportProgress = { phase: "render" | "convert" | "done"; pct: number };

function pickMime(): { mime: string; isMp4: boolean } {
  const mp4 = ["video/mp4;codecs=avc1.640028", "video/mp4;codecs=avc1.42E01E", "video/mp4"];
  for (const m of mp4)
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m))
      return { mime: m, isMp4: true };
  for (const m of ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"])
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m))
      return { mime: m, isMp4: false };
  return { mime: "", isMp4: false };
}

async function toMp4(blob: Blob, onProgress: (pct: number) => void): Promise<Blob | null> {
  try {
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { fetchFile, toBlobURL } = await import("@ffmpeg/util");
    const ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress }) => onProgress(Math.min(1, progress || 0)));
    const base = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
    });
    await ffmpeg.writeFile("in.webm", await fetchFile(blob));
    await ffmpeg.exec([
      "-i", "in.webm",
      "-c:v", "libx264",
      "-preset", "veryfast",
      "-crf", "20",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "out.mp4",
    ]);
    const data = (await ffmpeg.readFile("out.mp4")) as Uint8Array;
    return new Blob([data.slice().buffer as ArrayBuffer], { type: "video/mp4" });
  } catch (e) {
    console.warn("Conversão para MP4 falhou:", e);
    return null;
  }
}

/** Grava a animação em 1080x1920 e devolve MP4 (ou WEBM como fallback). */
export async function recordMp4(
  video: JVideo,
  onProgress: (p: ExportProgress) => void,
): Promise<{ blob: Blob; ext: "mp4" | "webm" }> {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS.w;
  canvas.height = CANVAS.h;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Canvas indisponível");
  await preloadImages(ALL_JORNADA_LOGOS);

  const stream = canvas.captureStream(60);
  const { mime, isMp4 } = pickMime();
  if (!mime) throw new Error("Este navegador não suporta gravação de vídeo.");
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12_000_000 });
  const chunks: BlobPart[] = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  const done = new Promise<Blob>((r) => {
    rec.onstop = () => r(new Blob(chunks, { type: mime }));
  });

  const duration = jDuration(video);
  renderJ(video, ctx, CANVAS.w, CANVAS.h, 0);
  rec.start(200);
  const start = performance.now();
  await new Promise<void>((resolve) => {
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      renderJ(video, ctx, CANVAS.w, CANVAS.h, Math.min(t, duration));
      onProgress({ phase: "render", pct: Math.min(1, t / duration) });
      if (t >= duration) return resolve();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
  rec.stop();
  const raw = await done;
  stream.getTracks().forEach((t) => t.stop());

  if (isMp4) {
    onProgress({ phase: "done", pct: 1 });
    return { blob: new Blob([raw], { type: "video/mp4" }), ext: "mp4" };
  }
  onProgress({ phase: "convert", pct: 0 });
  const mp4 = await toMp4(raw, (pct) => onProgress({ phase: "convert", pct }));
  onProgress({ phase: "done", pct: 1 });
  return mp4 ? { blob: mp4, ext: "mp4" } : { blob: raw, ext: "webm" };
}

/**
 * GIF leve para WhatsApp: 720x720, 12fps.
 * Menos frames e menor resolução mantêm o arquivo abrindo mesmo com sinal fraco.
 */
export async function buildGif(
  video: JVideo,
  onProgress: (p: ExportProgress) => void,
  opts: { w?: number; h?: number; fps?: number } = {},
): Promise<Blob> {
  const w = opts.w ?? 720;
  const h = opts.h ?? 720;
  const fps = opts.fps ?? 12;
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");
  await preloadImages(ALL_JORNADA_LOGOS);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
  if (!ctx) throw new Error("Canvas indisponível");

  const duration = jDuration(video);
  const frames = Math.max(1, Math.round(duration * fps));
  const delay = Math.round(1000 / fps);
  const enc = GIFEncoder();

  for (let i = 0; i < frames; i++) {
    renderJ(video, ctx, w, h, (i / fps) % duration);
    const data = ctx.getImageData(0, 0, w, h).data;
    const palette = quantize(data, 64);
    const index = applyPalette(data, palette);
    enc.writeFrame(index, w, h, { palette, delay });
    onProgress({ phase: "render", pct: (i + 1) / frames });
    if (i % 4 === 0) await new Promise((r) => setTimeout(r, 0));
  }
  enc.finish();
  onProgress({ phase: "done", pct: 1 });
  const bytes = enc.bytesView();
  const buf = new Uint8Array(bytes.length);
  buf.set(bytes);
  return new Blob([buf.buffer as ArrayBuffer], { type: "image/gif" });
}

/** Renderiza um único frame em resolução real e devolve um PNG. */
export async function renderPng(video: JVideo, t: number): Promise<Blob> {
  await preloadImages(ALL_JORNADA_LOGOS);
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS.w;
  canvas.height = CANVAS.h;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Canvas indisponível");
  renderJ(video, ctx, CANVAS.w, CANVAS.h, t);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (!blob) throw new Error("Não foi possível gerar a imagem");
  return blob;
}

export function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

