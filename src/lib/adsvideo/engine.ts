/**
 * Engine de animação em canvas para os vídeos de anúncio.
 * A mesma função de desenho alimenta: miniatura, player do modal e exportação em
 * resolução real (1080x1920 / 1920x1080).
 */

export const C = {
  navy: "#1F3864",
  navyDeep: "#152845",
  blue: "#2E5BAA",
  blueSoft: "#7FB0FF",
  light: "#F5F7FA",
  white: "#FFFFFF",
  amber: "#E8A33D",
  amberInk: "#9A6512",
  red: "#D64545",
  redInk: "#A62F2F",
  green: "#22A06B",
  greenInk: "#157A50",
  inkSoft: "rgba(31,56,100,.62)",
  inkFaint: "rgba(31,56,100,.30)",
};

export type Frame = {
  c: CanvasRenderingContext2D;
  /** largura do canvas em px */
  w: number;
  /** altura do canvas em px */
  h: number;
  /** true quando 9:16 */
  v: boolean;
  /** escala relativa (1 = render nativo) */
  u: number;
  /** tempo local da cena, em segundos */
  k: number;
};

export type Scene = {
  dur: number;
  draw: (f: Frame) => void;
};

export type CampaignId =
  | "homologacao"
  | "normas"
  | "institucional"
  | "modulos"
  | "depoimentos";

export type VideoDef = {
  id: string;
  campaign: CampaignId;
  title: string;
  subtitle: string;
  duration: number;
  scenes: Scene[];
};

/* ---------------------------------------------------------------- easing */
export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const easeInOut = (x: number) =>
  clamp01(x) < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * clamp01(x) + 2, 3) / 2;
export const easeBack = (x: number) => {
  const t = clamp01(x);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** progresso 0..1 de um elemento que entra em `start` durando `dur` */
export const inAt = (k: number, start: number, dur = 0.7, ease = easeOut) =>
  ease(clamp01((k - start) / dur));

/** pulso suave contínuo */
export const pulse = (k: number, speed = 1.6, amp = 1) =>
  Math.sin(k * speed * Math.PI * 2) * amp;

/* ------------------------------------------------------------- primitivas */
export function fill(f: Frame, color: string) {
  f.c.fillStyle = color;
  f.c.fillRect(0, 0, f.w, f.h);
}

export function roundRect(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  c.beginPath();
  c.moveTo(x + rr, y);
  c.arcTo(x + w, y, x + w, y + h, rr);
  c.arcTo(x + w, y + h, x, y + h, rr);
  c.arcTo(x, y + h, x, y, rr);
  c.arcTo(x, y, x + w, y, rr);
  c.closePath();
}

export function font(size: number, weight: number | string = 800) {
  return `${weight} ${size}px Montserrat, "Helvetica Neue", Arial, sans-serif`;
}

type TextOpts = {
  size: number;
  weight?: number | string;
  color?: string;
  align?: CanvasTextAlign;
  maxWidth?: number;
  lineHeight?: number;
  letterSpacing?: string;
};

/** Quebra o texto em linhas respeitando maxWidth e \n. */
export function wrapLines(
  c: CanvasRenderingContext2D,
  str: string,
  o: TextOpts,
): string[] {
  c.font = font(o.size, o.weight ?? 800);
  const out: string[] = [];
  for (const para of str.split("\n")) {
    if (!o.maxWidth) {
      out.push(para);
      continue;
    }
    let line = "";
    for (const word of para.split(" ")) {
      const test = line ? `${line} ${word}` : word;
      if (c.measureText(test).width > o.maxWidth && line) {
        out.push(line);
        line = word;
      } else line = test;
    }
    out.push(line);
  }
  return out;
}

/** Desenha texto multi-linha. `y` é o topo do bloco. Retorna a altura usada. */
export function text(
  f: Frame,
  str: string,
  x: number,
  y: number,
  o: TextOpts,
): number {
  const { c } = f;
  const lh = o.lineHeight ?? o.size * 1.12;
  const lines = wrapLines(c, str, o);
  c.save();
  c.font = font(o.size, o.weight ?? 800);
  c.fillStyle = o.color ?? C.white;
  c.textAlign = o.align ?? "left";
  c.textBaseline = "top";
  if (o.letterSpacing && "letterSpacing" in c) {
    (c as unknown as { letterSpacing: string }).letterSpacing = o.letterSpacing;
  }
  lines.forEach((l, i) => c.fillText(l, x, y + i * lh));
  if ("letterSpacing" in c) {
    (c as unknown as { letterSpacing: string }).letterSpacing = "0px";
  }
  c.restore();
  return lines.length * lh;
}

export function textHeight(
  f: Frame,
  str: string,
  o: TextOpts,
): number {
  const lh = o.lineHeight ?? o.size * 1.12;
  return wrapLines(f.c, str, o).length * lh;
}

/** Ícone de linha fina a partir de um path SVG em viewBox 24x24. */
export function icon(
  f: Frame,
  d: string,
  x: number,
  y: number,
  size: number,
  color: string,
  lw = 1.6,
) {
  const { c } = f;
  c.save();
  c.translate(x - size / 2, y - size / 2);
  c.scale(size / 24, size / 24);
  c.strokeStyle = color;
  c.fillStyle = "transparent";
  c.lineWidth = lw;
  c.lineCap = "round";
  c.lineJoin = "round";
  for (const part of d.split("|")) c.stroke(new Path2D(part));
  c.restore();
}

export const ICONS = {
  mail: "M2.5 5h19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z|M1 7l11 7 11-7",
  sheet:
    "M3 3.5h18v17H3z|M3 9h18M3 15h18M9 3.5v17M15 3.5v17",
  folder:
    "M3 7.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  cloud:
    "M7 18.5a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.4 9.6 3.95 3.95 0 0 1 17.5 18.5z",
  doc: "M6 2.5h8l5 5v14H6z|M14 2.5v5h5|M9 13h7M9 17h5",
  flask:
    "M9 2.5h6|M10 2.5v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 8.5v-6|M7.5 15h9",
  seal: "M12 2.5l2.6 1.9 3.2-.2.9 3 2.6 1.9-1.4 2.9 1.4 2.9-2.6 1.9-.9 3-3.2-.2L12 21.5l-2.6-1.9-3.2.2-.9-3-2.6-1.9L4.1 12 2.7 9.1l2.6-1.9.9-3 3.2.2z|M8.5 12l2.5 2.5 4.5-5",
  radar:
    "M12 2.5a9.5 9.5 0 1 0 9.5 9.5|M12 7a5 5 0 1 0 5 5|M12 12l8-7",
  chart: "M3.5 20.5h17|M6 20.5V12|M11 20.5V6.5|M16 20.5v-6|M20.5 20.5V9",
  calendar:
    "M4 5.5h16v15H4z|M4 10h16M8.5 3v5M15.5 3v5",
  clock: "M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z",
  envelope: "M3 6h18v12H3z|M3 6.8l9 6 9-6",
  flame:
    "M12 2.5s5.5 4.6 5.5 9.5a5.5 5.5 0 1 1-11 0c0-2 1-3.6 2-4.8.2 1.7 1.1 2.6 2 2.6 1.2 0 1.8-1.2 1.5-3-.2-1.6 0-3 0-4.3z",
  eye: "M1.5 12S5.5 5.5 12 5.5 22.5 12 22.5 12 18.5 18.5 12 18.5 1.5 12 1.5 12z|M12 9.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2z",
  eyeOff:
    "M3 3l18 18|M10.3 6a9.4 9.4 0 0 1 1.7-.15c6.5 0 10.5 6.15 10.5 6.15a17 17 0 0 1-3.4 4|M6.1 7.9A16.6 16.6 0 0 0 1.5 12S5.5 18.2 12 18.2a9.9 9.9 0 0 0 4-.8",
  gauge: "M4 18a9 9 0 1 1 16 0|M12 18l4.5-6",
  check: "M5 13l4 4 10-10",
  x: "M6 6l12 12M18 6L6 18",
  building: "M4 20.5V8.5l8-5 8 5v12|M9 20.5v-6h6v6",
  box: "M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z|M3.5 7.5L12 12l8.5-4.5M12 12v9",
  globe:
    "M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z|M2.5 12h19|M12 2.5c2.6 2.6 4 6 4 9.5s-1.4 6.9-4 9.5c-2.6-2.6-4-6-4-9.5s1.4-6.9 4-9.5z",
  users:
    "M16 20v-1.8a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20|M9 10.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2|M22 20v-1.8a4 4 0 0 0-3-3.87|M16.5 3.5a3.6 3.6 0 0 1 0 7",
  shield: "M12 2.6l8 3v6c0 5-3.4 8.6-8 9.8-4.6-1.2-8-4.8-8-9.8v-6z|M8.6 12l2.4 2.4 4.4-4.8",
  question: "M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z|M9.2 9.2a2.9 2.9 0 1 1 3.9 2.7c-.7.3-1.1 1-1.1 1.8v.4|M12 17.6h.01",
  clipboard:
    "M9 4.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-13a2 2 0 0 0-2-2h-2|M9 2.6h6v3.8H9z",
};

/* ------------------------------------------------------------- mini-blocos */

/** Fundo escuro com grid + glows (assinatura visual MyTS). */
export function bgDark(f: Frame, k = 0) {
  fill(f, C.navy);
  const { c, w, h, u } = f;
  c.save();
  c.globalAlpha = 0.16;
  c.strokeStyle = "rgba(46,91,170,.85)";
  c.lineWidth = 1 * u;
  const step = 90 * u;
  for (let x = 0; x <= w; x += step) {
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, h);
    c.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(w, y);
    c.stroke();
  }
  c.restore();
  glow(f, w * 0.12, h * 0.14, 520 * u + pulse(k, 0.12, 20 * u), "#2E5BAA", 0.5);
  glow(f, w * 0.9, h * 0.88, 460 * u, "#0f2547", 0.6);
}

export function bgLight(f: Frame) {
  fill(f, C.light);
  const { c, w, h, u } = f;
  c.save();
  c.globalAlpha = 0.5;
  c.strokeStyle = "rgba(31,56,100,.10)";
  c.lineWidth = 1 * u;
  const step = 90 * u;
  for (let x = 0; x <= w; x += step) {
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, h);
    c.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(w, y);
    c.stroke();
  }
  c.restore();
}

export function glow(
  f: Frame,
  x: number,
  y: number,
  r: number,
  color: string,
  alpha = 0.5,
) {
  const { c } = f;
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  c.save();
  c.globalAlpha = alpha;
  c.fillStyle = g;
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fill();
  c.restore();
}

/** Barra de destaque azul (accent bar) com scaleX animado. */
export function accentBar(
  f: Frame,
  x: number,
  y: number,
  p: number,
  color = C.blue,
  width?: number,
) {
  const { c, u } = f;
  const wFull = width ?? 180 * u;
  const hh = 12 * u;
  c.save();
  c.fillStyle = color;
  roundRect(c, x, y, wFull * clamp01(p), hh, hh / 2);
  c.fill();
  c.restore();
}

/** Cartão branco com sombra suave. */
export function card(
  f: Frame,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  bg = C.white,
  border = "rgba(31,56,100,.10)",
) {
  const { c, u } = f;
  c.save();
  c.shadowColor = "rgba(31,56,100,.18)";
  c.shadowBlur = 60 * u;
  c.shadowOffsetY = 24 * u;
  c.fillStyle = bg;
  roundRect(c, x, y, w, h, r);
  c.fill();
  c.restore();
  c.save();
  c.strokeStyle = border;
  c.lineWidth = 2 * u;
  roundRect(c, x, y, w, h, r);
  c.stroke();
  c.restore();
}

/** Pílula (badge) com texto e cor. */
export function pill(
  f: Frame,
  x: number,
  y: number,
  label: string,
  bg: string,
  fg: string,
  size: number,
  withCheck = false,
  align: "left" | "right" = "left",
) {
  const { c, u } = f;
  c.font = font(size, 800);
  const padX = 24 * u;
  const iconW = withCheck ? size * 1.5 : 0;
  const w = c.measureText(label).width + padX * 2 + iconW;
  const h = size * 2.1;
  const xx = align === "right" ? x - w : x;
  c.save();
  c.fillStyle = bg;
  roundRect(c, xx, y - h / 2, w, h, h / 2);
  c.fill();
  if (withCheck) icon(f, ICONS.check, xx + padX + size * 0.5, y, size * 1.15, fg, 2.6);
  c.fillStyle = fg;
  c.textAlign = "left";
  c.textBaseline = "middle";
  c.fillText(label, xx + padX + iconW, y + size * 0.05);
  c.restore();
  return { w, h };
}

/** Wordmark MyTS desenhado em texto. */
export function wordmark(
  f: Frame,
  x: number,
  y: number,
  size: number,
  light = true,
) {
  const { c } = f;
  c.save();
  c.font = font(size, 900);
  c.textAlign = "center";
  c.textBaseline = "middle";
  const my = "My";
  const ts = "TS";
  const wMy = c.measureText(my).width;
  const wTs = c.measureText(ts).width;
  const total = wMy + wTs;
  c.textAlign = "left";
  c.fillStyle = light ? C.white : C.navy;
  c.fillText(my, x - total / 2, y);
  c.fillStyle = light ? C.blueSoft : C.blue;
  c.fillText(ts, x - total / 2 + wMy, y);
  c.restore();
}

/* ------------------------------------------------------------ marca MyTS */

/** Paths oficiais do símbolo MyTS, em box 172.4 × 178.5. */
const MARK_PATHS = [
  "M101.9 98.2904L91.3 107.89C89.7 109.29 88.9 111.19 88.9 113.29V123.69C88.9 125.29 88.2 126.69 87.1 127.79L48.7 162.89C46.4 164.99 42.6 164.99 40.3 162.89L19.3 143.79C18.1 142.69 17.4 141.19 17.4 139.69V68.0904C17.4 66.4904 18.1 65.0904 19.3 63.9904L40.1 44.9904C42.5 42.8904 46.2 42.8904 48.5 44.9904L64.3 59.3904C66.7 61.4904 70.4 61.4904 72.8 59.3904C75.2 57.0904 75.2 53.3904 72.8 51.1904L52.7 32.8904C50.4 30.7904 47.4 29.6904 44.3 29.6904C41.2 29.6904 38.1 30.7904 35.9 32.8904L3.60001 62.3904C1.30001 64.4904 0 67.4904 0 70.5904V137.39C0 140.49 1.29998 143.49 3.69998 145.69L35.9 175.19C38.2 177.29 41.2 178.49 44.4 178.49C47.5 178.49 50.6 177.39 52.9 175.19L104.1 128.49C105.3 127.39 106.5 125.39 106.5 123.29V100.29C106.4 97.8904 103.6 96.7904 101.9 98.2904Z",
  "M88.8999 38.4905V15.7905C88.8999 13.7905 89.7999 11.7905 91.2999 10.3905L101.8 0.690466C103.5 -0.809534 106.3 0.290484 106.3 2.49048V25.2905C106.3 27.3905 105.4 29.2905 103.9 30.6905C101.2 33.0905 96.6999 37.1905 93.3999 40.1905C91.6999 41.8905 88.8999 40.6905 88.8999 38.4905Z",
  "M70.5 109.39L81 99.7902C82.6 98.3902 83.4 96.4902 83.4 94.3902V83.9902C83.4 82.3902 84.1 80.9902 85.2 79.8902L123.6 44.6902C125.9 42.5902 129.7 42.5902 132 44.6902L153 63.7902C154.2 64.8902 154.9 66.3902 154.9 67.8902V139.59C154.9 141.19 154.2 142.59 153 143.69L132.3 162.89C129.9 164.99 126.2 164.99 123.9 162.89L108.1 148.49C105.7 146.39 102 146.39 99.6 148.49C97.2 150.79 97.2 154.49 99.6 156.69L119.7 174.99C122 177.09 125 178.19 128.1 178.19C131.2 178.19 134.3 177.09 136.5 174.99L168.8 145.49C171.1 143.39 172.4 140.39 172.4 137.29V70.3902C172.4 67.2902 171.1 64.3902 168.8 62.1902L136.5 32.6902C134.2 30.5902 131.2 29.4902 128.1 29.4902H128C124.9 29.4902 121.8 30.5902 119.6 32.6902L68.1 79.6902C66.9 80.7902 66 83.2902 66 84.7902V107.69C66 109.89 68.8 110.99 70.5 109.39Z",
];

/** Símbolo MyTS. `size` é a altura desejada; centro em (x, y). */
export function logoMark(
  f: Frame,
  x: number,
  y: number,
  size: number,
  color = C.white,
) {
  const { c } = f;
  const s = size / 178.5;
  c.save();
  c.translate(x - (172.4 * s) / 2, y - size / 2);
  c.scale(s, s);
  c.fillStyle = color;
  for (const d of MARK_PATHS) c.fill(new Path2D(d));
  c.restore();
}

/**
 * Assinatura oficial: símbolo + wordmark, centralizada em (cx, cy).
 * `dark = true` para fundos escuros (marca em branco).
 */
export function logoLock(
  f: Frame,
  cx: number,
  cy: number,
  size: number,
  dark = true,
) {
  const markH = size * 1.18;
  const gap = size * 0.36;
  const { c } = f;
  c.font = font(size, 900);
  const total = markH * (172.4 / 178.5) + gap + c.measureText("MyTS").width;
  const left = cx - total / 2;
  logoMark(f, left + (markH * (172.4 / 178.5)) / 2, cy, markH, dark ? C.white : C.navy);
  c.save();
  c.font = font(size, 900);
  c.textAlign = "left";
  c.textBaseline = "middle";
  const my = "My";
  const wMy = c.measureText(my).width;
  const tx = left + markH * (172.4 / 178.5) + gap;
  c.fillStyle = dark ? C.white : C.navy;
  c.fillText(my, tx, cy + size * 0.02);
  c.fillStyle = dark ? C.blueSoft : C.blue;
  c.fillText("TS", tx + wMy, cy + size * 0.02);
  c.restore();
  return { width: total, height: markH };
}

/* ------------------------------------------------------------- imagens */

const imgCache = new Map<string, HTMLImageElement>();

/** Carrega (com cache) uma imagem para uso no canvas. */
export function loadImage(url: string): Promise<HTMLImageElement> {
  const hit = imgCache.get(url);
  if (hit && hit.complete && hit.naturalWidth) return Promise.resolve(hit);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgCache.set(url, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function preloadImages(urls: string[]) {
  return Promise.all(urls.map((u) => loadImage(u).catch(() => null)));
}

/** Retorna a imagem já carregada, ou dispara o carregamento e devolve null. */
export function img(url: string): HTMLImageElement | null {
  const hit = imgCache.get(url);
  if (hit && hit.complete && hit.naturalWidth) return hit;
  if (!hit) void loadImage(url).catch(() => undefined);
  return null;
}

/** Desenha a imagem contida numa caixa (contain), centrada em (cx, cy). */
export function drawImageFit(
  f: Frame,
  url: string,
  cx: number,
  cy: number,
  maxW: number,
  maxH: number,
) {
  const im = img(url);
  if (!im) return false;
  const r = Math.min(maxW / im.naturalWidth, maxH / im.naturalHeight);
  const w = im.naturalWidth * r;
  const h = im.naturalHeight * r;
  f.c.drawImage(im, cx - w / 2, cy - h / 2, w, h);
  return true;
}

/* -------------------------------------------------------------- timeline */

export function totalDuration(v: VideoDef) {
  return v.scenes.reduce((a, s) => a + s.dur, 0);
}

const XFADE = 0.55;

/** Desenha o frame do vídeo no tempo `t` (segundos), com cross-fade entre cenas. */
export function renderVideo(
  v: VideoDef,
  c: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const vertical = h > w;
  const u = Math.min(w, h) / 1080;
  c.save();
  c.clearRect(0, 0, w, h);
  c.fillStyle = C.navy;
  c.fillRect(0, 0, w, h);
  c.restore();

  let start = 0;
  const bounds = v.scenes.map((s) => {
    const b = { s, start, end: start + s.dur };
    start += s.dur;
    return b;
  });

  for (let i = 0; i < bounds.length; i++) {
    const b = bounds[i];
    // a cena continua desenhada durante o cross-fade da próxima por cima dela
    if (t < b.start || t >= b.end + XFADE) continue;
    const alpha = clamp01((t - b.start) / XFADE);
    if (alpha <= 0.001) continue;
    c.save();
    c.globalAlpha = alpha;
    b.s.draw({ c, w, h, v: vertical, u, k: t - b.start });
    c.restore();
  }
}

