import { useEffect, useRef } from "react";
import { preloadImages } from "@/lib/adsvideo/engine";
import { CANVAS, JVideo, jDuration, renderJ } from "@/lib/jornada/engine";
import { ALL_JORNADA_LOGOS } from "@/lib/jornada/videos";

type Props = {
  video: JVideo;
  playing?: boolean;
  staticAt?: number;
  scale?: number;
  className?: string;
};

export default function JCanvas({
  video,
  playing = false,
  staticAt = 1.6,
  scale = 0.35,
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = Math.round(CANVAS.w * scale);
    canvas.height = Math.round(CANVAS.h * scale);
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const dur = jDuration(video);
    let raf = 0;
    let cancelled = false;
    let start = performance.now();

    const loop = () => {
      if (cancelled) return;
      const t = ((performance.now() - start) / 1000) % (dur + 0.6);
      renderJ(video, ctx, canvas.width, canvas.height, t);
      raf = requestAnimationFrame(loop);
    };

    const run = () => {
      if (cancelled) return;
      if (playing) {
        start = performance.now();
        raf = requestAnimationFrame(loop);
      } else {
        renderJ(video, ctx, canvas.width, canvas.height, staticAt);
      }
    };

    Promise.all([document.fonts?.ready ?? Promise.resolve(), preloadImages(ALL_JORNADA_LOGOS)])
      .then(run)
      .catch(run);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [video, playing, staticAt, scale]);

  return <canvas ref={ref} className={className} />;
}
