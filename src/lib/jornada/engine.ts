/**
 * Engine mínima de canvas para os vídeos da Jornada da Autonomia.
 * Quadrado 1:1 (1080x1080), sem áudio, texto entrando palavra por palavra.
 */
import {
  Frame,
  clamp01,
  drawImageFit,
  easeBack,
  easeInOut,
  easeOut,
  font,
  roundRect,
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

export const CANVAS = { w: 1080, h: 1080 };

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

/** Assinatura na base da tela: placa clara com as logos em cores originais. */
export function drawLockup(f: Frame, k: number, l: Lockup, appear = 0.5) {
  const { c, u } = f;
  const p = easeOut(clamp01((k - appear) / 0.6));
  if (p <= 0.001) return;

  const slots = l.carrefour ? 3 : 2;
  const plateH = 172 * u;
  const plateW = Math.min(f.w - 96 * u, (slots === 3 ? 900 : 660) * u);
  const plateX = f.w / 2 - plateW / 2;
  const plateY = f.h - plateH - 68 * u;


  c.save();
  c.globalAlpha = p;

  // placa: sempre clara, garante contraste das marcas coloridas
  c.fillStyle = l.onLight ? "rgba(35,31,32,.05)" : "rgba(255,255,255,.96)";
  roundRect(c, plateX, plateY, plateW, plateH, 26 * u);
  c.fill();
  if (l.onLight) {
    c.strokeStyle = "rgba(35,31,32,.12)";
    c.lineWidth = 2 * u;
    roundRect(c, plateX, plateY, plateW, plateH, 26 * u);
    c.stroke();
  }

  const padX = 40 * u;
  const cellW = (plateW - padX * 2) / slots;
  const boxH = plateH - 48 * u;

  const boxW = cellW - 34 * u;
  const cy = plateY + plateH / 2;

  const urls = l.carrefour ? [l.jornada, l.carrefour, l.myts] : [l.jornada, l.myts];
  let allOk = true;
  urls.forEach((url, i) => {
    const cx = plateX + padX + cellW * i + cellW / 2;
    if (!drawImageFit(f, url, cx, cy, boxW, boxH)) allOk = false;
  });

  if (allOk) {
    for (let i = 1; i < slots; i++) {
      c.fillStyle = "rgba(35,31,32,.14)";
      c.fillRect(plateX + padX + cellW * i - 1 * u, cy - 34 * u, 2 * u, 68 * u);
    }
  } else {
    c.fillStyle = l.onLight ? "rgba(35,31,32,.05)" : "rgba(255,255,255,.96)";
    roundRect(c, plateX, plateY, plateW, plateH, 26 * u);
    c.fill();
    c.font = font(28 * u, 700);
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "rgba(35,31,32,.8)";
    c.fillText("Uma iniciativa Carrefour · Em parceria com MyTS", f.w / 2, cy);
  }

  c.restore();
}

/* ------------------------------------------------- dispositivos de movimento */

/**
 * A. Abertura-notificação. Banner desliza do topo, segura, e se expande até
 * preencher a tela. Devolve o progresso de expansão (0..1) para o conteúdo
 * da cena aparecer só depois.
 */
export function notificationOpen(f: Frame, k: number, previewText: string, bg = JC.dark) {
  const { c, u } = f;
  const enter = easeOut(clamp01(k / 0.42));
  const exp = easeInOut(clamp01((k - 1.15) / 0.75));
  if (exp >= 1) return 1;

  c.save();
  c.globalAlpha = 1 - exp;
  c.fillStyle = "#171514";
  c.fillRect(0, 0, f.w, f.h);
  c.restore();

  const bw0 = f.w - 96 * u;
  const bh0 = 232 * u;
  const bx0 = 48 * u;
  const by0 = f.h / 2 - bh0 / 2;
  // entrada: cresce um pouco a partir do centro, sem deslizar do topo
  const s = 0.9 + 0.1 * enter;
  const w = (bw0 + (f.w - bw0) * exp) * (exp > 0 ? 1 : s);
  const h = (bh0 + (f.h - bh0) * exp) * (exp > 0 ? 1 : s);
  const x = f.w / 2 - w / 2 + (bx0 - (f.w / 2 - bw0 / 2)) * 0;
  const y = f.h / 2 - h / 2;
  const r = 36 * u * (1 - exp);

  c.save();
  c.globalAlpha = exp > 0 ? 1 : enter;
  roundRect(c, x, y, w, h, r);
  c.fillStyle = bg;
  c.fill();
  c.save();
  c.clip();

  const ca = (1 - clamp01(exp / 0.4)) * enter;
  if (ca > 0.001) {
    c.globalAlpha = ca;
    const ix = x + 34 * u;
    const iy = y + h / 2 - 46 * u;
    c.fillStyle = "rgba(255,255,255,.14)";
    roundRect(c, ix, iy, 92 * u, 92 * u, 24 * u);
    c.fill();
    if (!drawImageFit(f, JORNADA_MARK.url, ix + 46 * u, iy + 46 * u, 70 * u, 70 * u)) {
      c.fillStyle = JC.light;
      c.font = font(48 * u, 900);
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("J", ix + 46 * u, iy + 48 * u);
    }
    c.textAlign = "left";
    c.textBaseline = "alphabetic";
    c.fillStyle = JC.white;
    c.font = font(38 * u, 800);
    c.fillText("Jornada da Autonomia", ix + 122 * u, y + h / 2 - 18 * u);
    // linha de prévia com peso: é o recado urgente
    c.fillStyle = JC.light;
    c.font = font(40 * u, 900);
    c.fillText(previewText.toUpperCase(), ix + 122 * u, y + h / 2 + 40 * u);
    // ponto pulsante de "não lido"
    const pulse = 0.55 + 0.45 * Math.abs(Math.sin(k * 4.2));
    c.globalAlpha = ca * pulse;
    c.fillStyle = JC.light;
    c.beginPath();
    c.arc(x + w - 44 * u, y + h / 2 - 26 * u, 11 * u, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = ca;
    c.fillStyle = "rgba(255,255,255,.5)";
    c.font = font(26 * u, 700);
    c.textAlign = "right";
    c.fillText("agora", x + w - 34 * u, y + h / 2 + 40 * u);
  }
  c.restore();
  c.restore();
  return exp;
}


/** Placeholder de marca usado no ícone da notificação (setado por videos.ts). */
export const JORNADA_MARK = { url: "" };

/**
 * B. Carimbo de peso. O texto entra a ~140% e assenta em 100% com overshoot
 * mínimo; um anel fino se expande uma única vez no impacto.
 */
export function stampText(
  f: Frame,
  str: string,
  cx: number,
  cy: number,
  k: number,
  o: { size: number; color?: string; at?: number; weight?: number | string; ring?: boolean },
) {
  const { c, u } = f;
  const at = o.at ?? 0.2;
  const t = clamp01((k - at) / 0.42);
  if (t <= 0.001) return;
  const s = 1.4 - 0.4 * easeBack(t);
  const a = clamp01(t / 0.35);

  c.save();
  c.globalAlpha = a;
  c.translate(cx, cy);
  c.scale(s, s);
  c.font = font(o.size, o.weight ?? 900);
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillStyle = o.color ?? JC.white;
  c.fillText(str, 0, 0);
  const tw = c.measureText(str).width;
  c.restore();

  if (o.ring !== false) {
    const rp = clamp01((k - at - 0.3) / 0.5);
    if (rp > 0.001 && rp < 1) {
      c.save();
      c.globalAlpha = (1 - rp) * 0.55;
      c.strokeStyle = o.color ?? JC.white;
      c.lineWidth = 3 * u;
      const rw = tw * (1.02 + rp * 0.22);
      const rh = o.size * (1.5 + rp * 0.5);
      roundRect(c, cx - rw / 2, cy - rh / 2, rw, rh, rh / 2);
      c.stroke();
      c.restore();
    }
  }
}

/** C. Tique duplo de "mensagem entregue". */
export function deliveredTicks(
  f: Frame,
  x: number,
  y: number,
  size: number,
  p: number,
  color: string,
) {
  if (p <= 0.001) return;
  const { c } = f;
  c.save();
  c.globalAlpha = clamp01(p);
  c.strokeStyle = color;
  c.lineWidth = size * 0.14;
  c.lineCap = "round";
  c.lineJoin = "round";
  for (const dx of [0, size * 0.42]) {
    c.beginPath();
    c.moveTo(x + dx, y);
    c.lineTo(x + dx + size * 0.24, y + size * 0.26);
    c.lineTo(x + dx + size * 0.62, y - size * 0.28);
    c.stroke();
  }
  c.restore();
}

/** D. Linha de leitura: traço fino se desenhando da esquerda para a direita. */
export function readingLine(
  f: Frame,
  cx: number,
  y: number,
  width: number,
  k: number,
  o: { at?: number; color?: string; thickness?: number } = {},
) {
  const p = easeOut(clamp01((k - (o.at ?? 0.2)) / 0.55));
  if (p <= 0.001) return;
  const { c, u } = f;
  c.save();
  c.globalAlpha = 0.9;
  c.fillStyle = o.color ?? JC.light;
  c.fillRect(cx - width / 2, y, width * p, (o.thickness ?? 6) * u);
  c.restore();
}

/** E. Discador: dígitos entram em cascata rápida. */
export function dialerDigits(
  f: Frame,
  str: string,
  cx: number,
  cy: number,
  k: number,
  o: { size: number; color?: string; at?: number },
) {
  const { c } = f;
  const at = o.at ?? 0;
  c.save();
  c.font = font(o.size, 900);
  c.textAlign = "left";
  c.textBaseline = "middle";
  const chars = [...str];
  const widths = chars.map((ch) => c.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = cx - total / 2;
  chars.forEach((ch, i) => {
    const p = easeOut(clamp01((k - (at + i * 0.045)) / 0.22));
    if (p > 0.001) {
      c.globalAlpha = p;
      c.fillStyle = o.color ?? JC.white;
      c.fillText(ch, x, cy + (1 - p) * o.size * 0.42);
    }
    x += widths[i];
  });
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
