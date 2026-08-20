import {
  C,
  Frame,
  ICONS,
  Scene,
  accentBar,
  bgDark,
  bgLight,
  card,
  clamp01,
  easeBack,
  easeOut,
  font,
  icon,
  inAt,
  pill,
  pulse,
  roundRect,
  text,
  textHeight,
  wordmark,
  logoLock,
  logoMark,
  drawImageFit,
} from "./engine";

/** Margem de segurança lateral. */
export const pad = (f: Frame) => (f.v ? f.w * 0.09 : f.w * 0.075);

/** Tamanho base de título, adaptado ao formato. */
export const titleSize = (f: Frame) => (f.v ? 108 * f.u : 88 * f.u);
export const bodySize = (f: Frame) => (f.v ? 46 * f.u : 38 * f.u);
export const kickerSize = (f: Frame) => (f.v ? 32 * f.u : 27 * f.u);

/** Kicker (eyebrow) em caixa alta com tracking. */
export function kicker(
  f: Frame,
  str: string,
  x: number,
  y: number,
  color: string,
  p = 1,
) {
  f.c.save();
  f.c.globalAlpha *= clamp01(p);
  text(f, str.toUpperCase(), x, y + (1 - p) * 24 * f.u, {
    size: kickerSize(f),
    weight: 800,
    color,
    letterSpacing: `${0.3 * kickerSize(f)}px`,
  });
  f.c.restore();
}

/** Título que entra linha a linha, de baixo pra cima. */
export function risingTitle(
  f: Frame,
  str: string,
  x: number,
  y: number,
  opts: {
    size?: number;
    color?: string;
    maxWidth: number;
    start?: number;
    align?: CanvasTextAlign;
    highlight?: string;
    highlightColor?: string;
  },
) {
  // auto-fit: reduz o corpo até a linha mais larga caber no espaço disponível
  let size = opts.size ?? titleSize(f);
  const rawLines = str.split("\n");
  const widest = () => {
    f.c.font = font(size, 900);
    return Math.max(...rawLines.map((l) => f.c.measureText(l).width));
  };
  let guard = 0;
  while (widest() > opts.maxWidth && guard < 40) {
    size *= 0.95;
    guard++;
  }
  const lh = size * 1.08;
  const lines = rawLines;
  const start = opts.start ?? 0.15;

  lines.forEach((line, i) => {
    const p = inAt(f.k, start + i * 0.28, 0.85);
    if (p <= 0) return;
    f.c.save();
    f.c.globalAlpha *= p;
    const yy = y + i * lh + (1 - p) * 70 * f.u;
    if (opts.highlight && line.includes(opts.highlight)) {
      const [before, after] = line.split(opts.highlight);
      f.c.font = font(size, 900);
      const wb = f.c.measureText(before).width;
      text(f, before, x, yy, { size, color: opts.color ?? C.white, weight: 900 });
      text(f, opts.highlight, x + wb, yy, {
        size,
        color: opts.highlightColor ?? C.blueSoft,
        weight: 900,
      });
      const wh = f.c.measureText(opts.highlight).width;
      if (after)
        text(f, after, x + wb + wh, yy, {
          size,
          color: opts.color ?? C.white,
          weight: 900,
        });
    } else {
      text(f, line, x, yy, {
        size,
        color: opts.color ?? C.white,
        weight: 900,
        align: opts.align,
      });
    }
    f.c.restore();
  });
  return y + lines.length * lh;
}

/** Cena de gancho: fundo + kicker + título grande + barra de destaque. */
export function hookScene(o: {
  dur: number;
  dark?: boolean;
  kicker?: string;
  title: string;
  highlight?: string;
  extra?: (f: Frame) => void;
}): Scene {
  return {
    dur: o.dur,
    draw: (f) => {
      o.dark === false ? bgLight(f) : bgDark(f, f.k);
      const p = pad(f);
      const maxW = f.w - p * 2;
      let size = titleSize(f);
      const raw = o.title.split("\n");
      let guard = 0;
      const widest = () => {
        f.c.font = font(size, 900);
        return Math.max(...raw.map((l) => f.c.measureText(l).width));
      };
      while (widest() > maxW && guard < 40) {
        size *= 0.95;
        guard++;
      }
      const lines = raw.length;

      const blockH = lines * size * 1.08;
      let y = (f.h - blockH) / 2 - (o.kicker ? 90 * f.u : 0);
      if (o.extra) {
        o.extra(f);
        y += f.v ? 150 * f.u : 90 * f.u;
      }
      if (o.kicker)
        kicker(
          f,
          o.kicker,
          p,
          y - 100 * f.u,
          o.dark === false ? C.blue : "#9FC0F5",
          inAt(f.k, 0.05, 0.6),
        );
      const end = risingTitle(f, o.title, p, y, {
        size,
        maxWidth: maxW,
        color: o.dark === false ? C.navy : C.white,
        highlight: o.highlight,
        highlightColor: o.dark === false ? C.blue : C.blueSoft,
      });
      accentBar(
        f,
        p,
        end + 46 * f.u,
        inAt(f.k, 0.9, 0.9),
        o.dark === false ? C.blue : C.blue,
        f.v ? 200 * f.u : 240 * f.u,
      );
    },
  };
}

/** Legenda inferior (headline + apoio) usada nas cenas de produto. */
export function caption(
  f: Frame,
  headline: string,
  sub: string | undefined,
  x: number,
  y: number,
  maxWidth: number,
  start: number,
  dark = false,
) {
  const p = inAt(f.k, start, 0.8);
  if (p <= 0) return 0;
  f.c.save();
  f.c.globalAlpha *= p;
  const size = f.v ? 76 * f.u : 62 * f.u;
  const off = (1 - p) * 46 * f.u;
  const h = text(f, headline, x, y + off, {
    size,
    weight: 900,
    color: dark ? C.white : C.navy,
    maxWidth,
    lineHeight: size * 1.1,
  });
  if (sub)
    text(f, sub, x, y + off + h + 22 * f.u, {
      size: bodySize(f),
      weight: 600,
      color: dark ? "rgba(255,255,255,.66)" : C.inkSoft,
      maxWidth,
    });
  f.c.restore();
  return h;
}

/** Endereço do site em destaque: cápsula contornada + brilho suave. */
export function siteBadge(f: Frame, cx: number, cy: number, p = 1) {
  if (p <= 0) return;
  const size = f.v ? 52 * f.u : 44 * f.u;
  f.c.save();
  f.c.globalAlpha *= clamp01(p);
  f.c.translate(0, (1 - clamp01(p)) * 26 * f.u);
  f.c.font = font(size, 900);
  const label = "myt-s.com";
  const tw = f.c.measureText(label).width;
  const bh = size * 2.1;
  const bw = tw + bh * 1.5;
  const glow = 0.5 + 0.5 * Math.sin(f.k * 2.4);
  f.c.fillStyle = "rgba(159,192,245,.10)";
  roundRect(f.c, cx - bw / 2, cy - bh / 2, bw, bh, bh / 2);
  f.c.fill();
  f.c.strokeStyle = `rgba(159,192,245,${0.45 + 0.35 * glow})`;
  f.c.lineWidth = 3.5 * f.u;
  roundRect(f.c, cx - bw / 2, cy - bh / 2, bw, bh, bh / 2);
  f.c.stroke();
  text(f, label, cx, cy - size * 0.56, {
    size,
    weight: 900,
    color: C.white,
    align: "center",
    letterSpacing: `${0.04 * size}px`,
  });
  f.c.restore();
}

/**
 * Logo de cliente sobre cartão branco — funciona em fundo claro ou escuro.
 * Se a imagem ainda não carregou, desenha o nome como fallback.
 */
export function clientLogo(
  f: Frame,
  url: string | undefined,
  name: string,
  cx: number,
  cy: number,
  w: number,
  h: number,
  p = 1,
) {
  f.c.save();
  f.c.globalAlpha *= clamp01(p);
  f.c.fillStyle = C.white;
  f.c.shadowColor = "rgba(10,25,55,.16)";
  f.c.shadowBlur = 40 * f.u;
  f.c.shadowOffsetY = 12 * f.u;
  roundRect(f.c, cx - w / 2, cy - h / 2, w, h, h * 0.26);
  f.c.fill();
  f.c.shadowColor = "transparent";
  const drawn = url ? drawImageFit(f, url, cx, cy, w * 0.72, h * 0.6) : false;
  if (!drawn)
    text(f, name, cx, cy - h * 0.12, {
      size: h * 0.26,
      weight: 900,
      color: C.navy,
      align: "center",
    });
  f.c.restore();
}

/** Cena de CTA padrão: assinatura MyTS + frase + pill pulsando + site em destaque. */
export function ctaScene(o: { dur: number; label: string; line?: string }): Scene {
  return {
    dur: o.dur,
    draw: (f) => {
      bgDark(f, f.k);
      const cx = f.w / 2;
      const wmSize = f.v ? 150 * f.u : 120 * f.u;
      const baseY = f.h * (f.v ? 0.34 : 0.32);
      const pw = inAt(f.k, 0.1, 0.8, easeBack);
      f.c.save();
      f.c.globalAlpha *= clamp01(pw);
      f.c.translate(0, (1 - pw) * 40 * f.u);
      logoLock(f, cx, baseY, wmSize, true);
      f.c.restore();

      const pt = inAt(f.k, 0.4, 0.7);
      f.c.save();
      f.c.globalAlpha *= pt;
      text(f, "FORNECEDORES SOB CONTROLE", cx, baseY + wmSize * 0.62, {
        size: kickerSize(f),
        weight: 700,
        color: "rgba(255,255,255,.6)",
        align: "center",
        letterSpacing: `${0.32 * kickerSize(f)}px`,
      });
      f.c.restore();

      if (o.line) {
        const pl = inAt(f.k, 0.7, 0.8);
        f.c.save();
        f.c.globalAlpha *= pl;
        text(f, o.line, cx, baseY + wmSize * 1.05 + (1 - pl) * 34 * f.u, {
          size: f.v ? 62 * f.u : 52 * f.u,
          weight: 800,
          color: C.white,
          align: "center",
          maxWidth: f.w - pad(f) * 2,
          lineHeight: f.v ? 72 * f.u : 62 * f.u,
        });
        f.c.restore();
      }

      const pp = inAt(f.k, 1.15, 0.7, easeBack);
      if (pp > 0) {
        const scale = pp * (1 + Math.max(0, pulse(f.k - 1.6, 0.5, 0.02)));
        const size = f.v ? 48 * f.u : 42 * f.u;
        const cy = f.h * (f.v ? 0.68 : 0.72);
        f.c.save();
        f.c.globalAlpha *= clamp01(pp);
        f.c.translate(cx, cy);
        f.c.scale(scale, scale);
        f.c.translate(-cx, -cy);
        f.c.font = font(size, 800);
        const tw = f.c.measureText(o.label).width;
        const bw = tw + size * 3.6;
        const bh = size * 2.5;
        f.c.shadowColor = "rgba(46,91,170,.55)";
        f.c.shadowBlur = 60 * f.u;
        f.c.shadowOffsetY = 20 * f.u;
        f.c.fillStyle = C.blue;
        roundRect(f.c, cx - bw / 2, cy - bh / 2, bw, bh, bh / 2);
        f.c.fill();
        f.c.shadowColor = "transparent";
        icon(f, ICONS.check, cx - bw / 2 + size * 1.5, cy, size * 1.1, C.white, 2.6);
        f.c.fillStyle = C.white;
        f.c.textAlign = "left";
        f.c.textBaseline = "middle";
        f.c.fillText(o.label, cx - bw / 2 + size * 2.4, cy + size * 0.04);
        f.c.restore();
      }

      siteBadge(f, cx, f.h - (f.v ? 230 : 140) * f.u, inAt(f.k, 1.6, 0.8));
    },
  };
}

/** Painel de mockup de UI (barra de janela + corpo). Retorna a área do corpo. */
export function mockPanel(
  f: Frame,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  p = 1,
) {
  f.c.save();
  f.c.globalAlpha *= clamp01(p);
  f.c.translate(0, (1 - clamp01(p)) * 180 * f.u);
  const r = 34 * f.u;
  card(f, x, y, w, h, r);
  const barH = 78 * f.u;
  f.c.save();
  roundRect(f.c, x, y, w, h, r);
  f.c.clip();
  f.c.fillStyle = C.light;
  f.c.fillRect(x, y, w, barH);
  f.c.strokeStyle = "rgba(31,56,100,.10)";
  f.c.lineWidth = 2 * f.u;
  f.c.beginPath();
  f.c.moveTo(x, y + barH);
  f.c.lineTo(x + w, y + barH);
  f.c.stroke();
  for (let i = 0; i < 3; i++) {
    f.c.fillStyle = "rgba(31,56,100,.18)";
    f.c.beginPath();
    f.c.arc(x + 34 * f.u + i * 30 * f.u, y + barH / 2, 9 * f.u, 0, Math.PI * 2);
    f.c.fill();
  }
  text(f, title, x + 150 * f.u, y + barH / 2 - 15 * f.u, {
    size: 28 * f.u,
    weight: 600,
    color: "rgba(31,56,100,.55)",
  });
  f.c.restore();
  f.c.restore();
  return { bx: x + 34 * f.u, by: y + barH + 30 * f.u, bw: w - 68 * f.u, bh: h - barH - 60 * f.u };
}

/** Linha de fornecedor com badge que muda de estado. */
export function supplierRow(
  f: Frame,
  x: number,
  y: number,
  w: number,
  h: number,
  o: {
    name: string;
    sub: string;
    iconD: string;
    fromLabel: string;
    fromBg: string;
    fromFg: string;
    flipAt: number;
    p: number;
  },
) {
  f.c.save();
  f.c.globalAlpha *= clamp01(o.p);
  f.c.translate((1 - clamp01(o.p)) * 60 * f.u, 0);
  f.c.fillStyle = C.white;
  roundRect(f.c, x, y, w, h, 26 * f.u);
  f.c.fill();
  f.c.strokeStyle = "rgba(31,56,100,.10)";
  f.c.lineWidth = 2 * f.u;
  roundRect(f.c, x, y, w, h, 26 * f.u);
  f.c.stroke();

  const av = h * 0.56;
  const avX = x + 30 * f.u + av / 2;
  f.c.fillStyle = "rgba(46,91,170,.12)";
  roundRect(f.c, avX - av / 2, y + (h - av) / 2, av, av, 18 * f.u);
  f.c.fill();
  icon(f, o.iconD, avX, y + h / 2, av * 0.5, C.blue, 1.8);

  const tx = avX + av / 2 + 26 * f.u;
  text(f, o.name, tx, y + h * 0.26, {
    size: 32 * f.u,
    weight: 800,
    color: C.navy,
  });
  text(f, o.sub, tx, y + h * 0.56, {
    size: 25 * f.u,
    weight: 600,
    color: "rgba(31,56,100,.5)",
  });

  const flipped = f.k >= o.flipAt;
  const since = f.k - o.flipAt;
  const bump = flipped ? 1 + Math.max(0, 0.16 * (1 - easeOut(since / 0.5))) : 1;
  const bx = x + w - 28 * f.u;
  f.c.save();
  f.c.translate(bx, y + h / 2);
  f.c.scale(bump, bump);
  f.c.translate(-bx, -(y + h / 2));
  pill(
    f,
    bx,
    y + h / 2,
    flipped ? "Homologado" : o.fromLabel,
    flipped ? "rgba(34,160,107,.16)" : o.fromBg,
    flipped ? C.greenInk : o.fromFg,
    27 * f.u,
    flipped,
    "right",
  );
  f.c.restore();

  if (flipped && since < 1) {
    const rp = since / 1;
    f.c.save();
    f.c.globalAlpha *= (1 - rp) * 0.7;
    f.c.strokeStyle = C.green;
    f.c.lineWidth = 6 * f.u;
    f.c.beginPath();
    f.c.arc(bx - 40 * f.u, y + h / 2, (40 + rp * 70) * f.u, 0, Math.PI * 2);
    f.c.stroke();
    f.c.restore();
  }
  f.c.restore();
}

/** Contador com efeito count-up. */
export function counter(
  f: Frame,
  value: number,
  prefix: string,
  suffix: string,
  x: number,
  y: number,
  size: number,
  p: number,
  color = C.white,
) {
  const shown = Math.round(value * easeOut(p));
  const str = `${prefix}${shown.toLocaleString("pt-BR")}${suffix}`;
  text(f, str, x, y, { size, weight: 900, color, align: "center" });
}

export { bgDark, bgLight, card, icon, ICONS, text, textHeight, C, inAt, clamp01, pulse, easeOut, easeBack, font, roundRect, pill, accentBar, wordmark };
