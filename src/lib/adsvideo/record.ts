import { VideoDef, preloadImages, renderVideo, totalDuration } from "./engine";
import { ALL_LOGO_URLS } from "./brand";
import { FORMATS, FormatId } from "./registry";

export type RecordProgress = {
  phase: "render" | "convert" | "done";
  pct: number;
};

function pickMime(): { mime: string; isMp4: boolean } {
  const mp4 = [
    "video/mp4;codecs=avc1.640028",
    "video/mp4;codecs=avc1.42E01E",
    "video/mp4",
  ];
  for (const m of mp4) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m))
      return { mime: m, isMp4: true };
  }
  const webm = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  for (const m of webm) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m))
      return { mime: m, isMp4: false };
  }
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
      "-i",
      "in.webm",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "18",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "out.mp4",
    ]);
    const data = (await ffmpeg.readFile("out.mp4")) as Uint8Array;
    return new Blob([data.slice().buffer as ArrayBuffer], { type: "video/mp4" });
  } catch (e) {
    console.warn("Conversão para MP4 falhou, usando WEBM:", e);
    return null;
  }
}

/**
 * Grava a animação em resolução real e devolve um arquivo MP4
 * (converte de WEBM via ffmpeg.wasm quando o navegador não grava MP4 nativo).
 */
export async function recordVideo(
  video: VideoDef,
  format: FormatId,
  onProgress: (p: RecordProgress) => void,
): Promise<{ blob: Blob; ext: "mp4" | "webm" }> {
  const { w, h } = FORMATS[format];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Canvas indisponível");

  const fps = 60;
  const stream = canvas.captureStream(fps);
  const { mime, isMp4 } = pickMime();
  if (!mime) throw new Error("Este navegador não suporta gravação de vídeo.");
  const rec = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: 16_000_000,
  });
  const chunks: BlobPart[] = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);

  const duration = totalDuration(video);
  const done = new Promise<Blob>((resolve) => {
    rec.onstop = () => resolve(new Blob(chunks, { type: mime }));
  });

  renderVideo(video, ctx, w, h, 0);
  rec.start(200);
  const start = performance.now();
  await new Promise<void>((resolve) => {
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      renderVideo(video, ctx, w, h, Math.min(t, duration));
      onProgress({ phase: "render", pct: Math.min(1, t / duration) });
      if (t >= duration) {
        resolve();
        return;
      }
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
