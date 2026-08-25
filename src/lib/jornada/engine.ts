/**
 * Engine mínima de canvas para os vídeos da Jornada da Autonomia.
 * Vertical 9:16 (1080x1920), sem áudio, texto entrando palavra por palavra.
 */
import {
  Frame,
  clamp01,
  drawImageFit,
  easeOut,
  font,
  wrapLines,
} from "@/lib/adsvideo/engine";

export const JC = {
  mid: "#3c8b59",
  light: "#7cc296",
  dark: "#577550",
  white: "#FFFFFF",
  ink: "#231f20",
};

export type JScene = {
  dur: number;
  bg: string;
  draw: (f: Frame) => void;
};

export type JVideo = {
  id: string;
  title: string;
  subtitle: string;
  scenes: JScene[];
};

export const CANVAS = { w: 1080, h: 1920 };

export function jDuration(v: JVideo) {
  return v.scenes.reduce((a, s) => a + s.dur, 0);
}

/* --------------------------------------------------------- texto por palavra */

type WordOpts = {
  size: number;
  weight?: number | string;
  color?: string;
  maxWidth: number;
  lineHeight?: number;
  /** momento (s) em que a primeira palavra entra */
  start?: number;
  /** intervalo entre palavras */
  step?: number;
};

/** Desenha texto centrado em `cx`, revelando palavra por palavra. `y` é o topo. */
export function revealWords(
  f: Frame,
  str: string,
  cx: number,
  y: number,
  k: number,
  o: WordOpts,
) {
  const { c } = f;
  const size = o.size;
  const weight = o.weight ?? 800;
  const lh = o.lineHeight ?? size * 1.14;
  const start = o.start ?? 0.15;
  const step = o.step ?? 0.16;
  const lines = wrapLines(c, str, { size, weight, maxWidth: o.maxWidth });

  c.save();
  c.font = font(size, weight);
  c.textAlign = "left";
  c.textBaseline = "top";
  const space = c.measureText(" ").width;
  let idx = 0;
  lines.forEach((line, li) => {
    const words = line.split(" ").filter(Boolean);
    const widths = words.map((w) => c.measureText(w).width);
    const total = widths.reduce((a, b) => a + b, 0) + space * (words.length - 1);
    let x = cx - total / 2;
    words.forEach((w, wi) => {
      const p = easeOut(clamp01((k - (start + idx * step)) / 0.34));
      idx++;
      if (p > 0.001) {
        c.globalAlpha = p;
        c.fillStyle = o.color ?? JC.white;
        c.fillText(w, x, y + li * lh + (1 - p) * size * 0.22);
      }
      x += widths[wi] + space;
    });
  });
  c.restore();
  return lines.length * lh;
}

export function measureWrapped(
  f: Frame,
  str: string,
  o: { size: number; weight?: number | string; maxWidth: number; lineHeight?: number },
) {
  const lh = o.lineHeight ?? o.size * 1.14;
  return wrapLines(f.c, str, o).length * lh;
}

/* ------------------------------------------------------------------ lockup */

export type Lockup = {
  jornada: string;
  carrefour?: string;
  myts: string;
  /** true quando o fundo é claro */
  onLight: boolean;
};

/** Assinatura discreta na base da tela. */
export function drawLockup(f: Frame, k: number, l: Lockup, appear = 0.5) {
  const { c, u } = f;
  const p = easeOut(clamp01((k - appear) / 0.6));
  if (p <= 0.001) return;
  const y = f.h - 170 * u;
  const ink = l.onLight ? "rgba(35,31,32,.75)" : "rgba(255,255,255,.85)";
  c.save();
  c.globalAlpha = p;

  const boxH = 88 * u;
  const slots = l.carrefour ? 3 : 2;
  const gap = 54 * u;
  const boxW = Math.min(230 * u, (f.w - 160 * u - gap * (slots - 1)) / slots);
  const totalW = boxW * slots + gap * (slots - 1);
  let x = f.w / 2 - totalW / 2 + boxW / 2;

  const urls = l.carrefour
    ? [l.jornada, l.carrefour, l.myts]
    : [l.jornada, l.myts];
  let allOk = true;
  for (const url of urls) {
    if (!drawImageFit(f, url, x, y, boxW, boxH)) allOk = false;
    x += boxW + gap;
  }

  if (!allOk) {
    c.font = font(30 * u, 700);
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = ink;
    c.fillText("Uma iniciativa Carrefour · Em parceria com MyTS", f.w / 2, y);
  }
  c.restore();
}

/* -------------------------------------------------------------- renderização */

const XFADE = 0.5;

export function renderJ(
  v: JVideo,
  c: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const u = Math.min(w, h) / 1080;
  c.save();
  c.fillStyle = v.scenes[0]?.bg ?? JC.dark;
  c.fillRect(0, 0, w, h);
  c.restore();

  let start = 0;
  const bounds = v.scenes.map((s) => {
    const b = { s, start, end: start + s.dur };
    start += s.dur;
    return b;
  });

  for (const b of bounds) {
    if (t < b.start || t >= b.end + XFADE) continue;
    const alpha = clamp01((t - b.start) / XFADE);
    if (alpha <= 0.001) continue;
    c.save();
    c.globalAlpha = alpha;
    c.fillStyle = b.s.bg;
    c.fillRect(0, 0, w, h);
    c.restore();
    c.save();
    c.globalAlpha = alpha;
    b.s.draw({ c, w, h, v: h > w, u, k: t - b.start });
    c.restore();
  }
}
