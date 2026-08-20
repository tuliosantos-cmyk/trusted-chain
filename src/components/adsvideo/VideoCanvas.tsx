import { useEffect, useRef } from "react";
import { VideoDef, preloadImages, renderVideo, totalDuration } from "@/lib/adsvideo/engine";
import { ALL_LOGO_URLS } from "@/lib/adsvideo/brand";
import { FORMATS, FormatId } from "@/lib/adsvideo/registry";

type Props = {
  video: VideoDef;
  format: FormatId;
  /** quando definido, desenha um frame estático nesse tempo (miniatura) */
  staticAt?: number;
  playing?: boolean;
  className?: string;
  /** escala de render do canvas (1 = resolução real) */
  scale?: number;
};

export default function VideoCanvas({
  video,
  format,
  staticAt,
  playing = false,
  className,
  scale = 1,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const { w, h } = FORMATS[format];
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const dur = totalDuration(video);
    let raf = 0;
    let start = performance.now();
    let cancelled = false;

    const drawStatic = () => renderVideo(video, ctx, canvas.width, canvas.height, staticAt ?? 1.6);

    const loop = () => {
      if (cancelled) return;
      const t = ((performance.now() - start) / 1000) % dur;
      renderVideo(video, ctx, canvas.width, canvas.height, t);
      raf = requestAnimationFrame(loop);
    };

    const run = () => {
      if (playing) {
        start = performance.now();
        raf = requestAnimationFrame(loop);
      } else {
        drawStatic();
      }
    };

    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      preloadImages(ALL_LOGO_URLS),
    ]);
    ready.then(run).catch(run);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [video, format, staticAt, playing, scale]);

  return <canvas ref={ref} className={className} />;
}
