import { Frame, clamp01, drawImageFit, easeOut, font, roundRect } from "@/lib/adsvideo/engine";
import {
  JC,
  JORNADA_MARK,
  JScene,
  JVideo,
  deliveredTicks,
  dialerDigits,
  drawLockup,
  notificationOpen,
  readingLine,
  revealWords,
  stampText,
} from "./engine";
import jornadaAsset from "@/assets/jornada/jornada.png.asset.json";
import jornadaWhiteAsset from "@/assets/jornada/jornada-white.png.asset.json";
import carrefourAsset from "@/assets/jornada/carrefour-grupo.png.asset.json";
import mytsDarkAsset from "@/assets/jornada/myts-dark.png.asset.json";

export const LOGOS = {
  jornada: jornadaAsset.url,
  jornadaWhite: jornadaWhiteAsset.url,
  carrefour: carrefourAsset.url,
  mytsDark: mytsDarkAsset.url,
};

export const ALL_JORNADA_LOGOS = Object.values(LOGOS);

// ícone da notificação de abertura
JORNADA_MARK.url = LOGOS.jornadaWhite;

/** A placa de assinatura é sempre clara: usar as marcas em cores originais. */
const LOCKUP = {
  jornada: LOGOS.jornada,
  carrefour: LOGOS.carrefour,
  myts: LOGOS.mytsDark,
  onLight: false,
};

const CONTACT = {
  name: "Ricardo Machado · MyTS",
  phone: "(14) 9 9844-5410",
  email: "ricardo.machado@myt-s.com",
};

/** Mote da campanha. */
const MOTE = "O caminho para fornecer com autonomia.";

/**
 * Área útil: acima da placa de assinatura (que ocupa a base) e abaixo da zona
 * segura superior. Todo conteúdo das telas é centrado dentro dela.
 */
const contentCenter = (f: Frame) => f.h * 0.41;

/* ------------------------------------------------------------------- telas */

/** Tela 1 — abertura-notificação + nome do programa. Idêntica nos 3 vídeos. */
function abertura(): JScene {
  return {
    dur: 3.8,
    bg: JC.dark,
    draw: (f) => {
      const { c, u, k } = f;
      const open = notificationOpen(f, k, "Participação obrigatória", JC.dark);
      if (open < 0.98) return;
      const kk = k - 1.8;

      const cy = contentCenter(f) - 60 * u;
      const pl = easeOut(clamp01(kk / 0.55));
      if (pl > 0.001) {
        c.save();
        c.globalAlpha = pl;
        const y = cy + (1 - pl) * 18 * u;
        if (!drawImageFit(f, LOGOS.jornadaWhite, f.w / 2, y, 820 * u, 420 * u)) {
          c.font = font(104 * u, 900);
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillStyle = JC.white;
          c.fillText("Jornada da Autonomia", f.w / 2, y);
        }
        c.restore();
      }

      const lineY = cy + 226 * u;
      readingLine(f, f.w / 2, lineY, 300 * u, kk, { at: 0.55, color: JC.light });

      revealWords(f, MOTE, f.w / 2, lineY + 46 * u, kk, {
        size: 54 * u,
        weight: 700,
        color: JC.white,
        maxWidth: f.w - 260 * u,
        lineHeight: 68 * u,
        start: 0.7,
        step: 0.12,
      });

      drawLockup(f, kk, LOCKUP, 1.1);
    },
  };
}

/** Tela de peso — carimbo em "OBRIGATÓRIA". */
function obrigatoria(dur = 3.8): JScene {
  return {
    dur,
    bg: JC.ink,
    draw: (f) => {
      const { u, k } = f;
      const cy = contentCenter(f);
      revealWords(f, "PARTICIPAÇÃO", f.w / 2, cy - 190 * u, k, {
        size: 104 * u,
        weight: 700,
        color: JC.white,
        maxWidth: f.w - 140 * u,
        lineHeight: 116 * u,
        start: 0.14,
        step: 0.22,
      });
      stampText(f, "OBRIGATÓRIA", f.w / 2, cy, k, {
        size: 116 * u,
        color: JC.light,
        at: 0.95,
      });
      revealWords(f, "para fornecedores Carrefour", f.w / 2, cy + 110 * u, k, {
        size: 46 * u,
        weight: 700,
        color: "rgba(255,255,255,.82)",
        maxWidth: f.w - 220 * u,
        lineHeight: 58 * u,
        start: 1.7,
        step: 0.09,
      });
      drawLockup(f, k, LOCKUP, 2.0);
    },
  };
}

/** Tela de contato final, fundo branco. */
function contato(dur = 4.2): JScene {
  return {
    dur,
    bg: JC.white,
    draw: (f) => {
      const { c, u, k } = f;
      const cy = contentCenter(f);

      revealWords(f, "Dúvidas?", f.w / 2, cy - 250 * u, k, {
        size: 52 * u,
        weight: 700,
        color: JC.dark,
        maxWidth: f.w - 160 * u,
        lineHeight: 62 * u,
        step: 0.1,
      });

      const nameY = cy - 150 * u;
      const pn = easeOut(clamp01((k - 0.35) / 0.45));
      if (pn > 0.001) {
        c.save();
        c.globalAlpha = pn;
        c.font = font(58 * u, 900);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = JC.ink;
        c.fillText(CONTACT.name, f.w / 2, nameY);
        const tw = c.measureText(CONTACT.name).width;
        c.restore();
        deliveredTicks(f, f.w / 2 + tw / 2 + 24 * u, nameY, 34 * u, clamp01((k - 0.95) / 0.35), JC.mid);
      }

      readingLine(f, f.w / 2, nameY + 58 * u, 240 * u, k, {
        at: 0.8,
        color: JC.mid,
        thickness: 5,
      });

      // telefone — discador
      const phoneY = cy + 20 * u;
      const p = easeOut(clamp01((k - 1.1) / 0.35));
      if (p > 0.001) {
        c.save();
        c.globalAlpha = p;
        c.font = font(76 * u, 900);
        const tw = c.measureText(CONTACT.phone).width;
        const bw = Math.min(f.w - 160 * u, tw + 110 * u);
        const bh = 148 * u;
        c.fillStyle = JC.dark;
        roundRect(c, f.w / 2 - bw / 2, phoneY - bh / 2, bw, bh, 26 * u);
        c.fill();
        c.restore();
        dialerDigits(f, CONTACT.phone, f.w / 2, phoneY + 2 * u, k, {
          size: 76 * u,
          color: JC.white,
          at: 1.3,
        });
      }

      revealWords(f, CONTACT.email, f.w / 2, cy + 130 * u, k, {
        size: 44 * u,
        weight: 700,
        color: JC.ink,
        maxWidth: f.w - 140 * u,
        lineHeight: 56 * u,
        start: 1.9,
        step: 0.1,
      });

      drawLockup(f, k, { ...LOCKUP, onLight: true }, 2.1);
    },
  };
}

/** Tela de contexto (Vídeo B) — composição cumulativa com linha de leitura. */
function contexto(): JScene {
  const blocos = [
    { t: "CARREFOUR & MYTS", size: 68, weight: 900, color: JC.white },
    { t: "acompanham e reconhecem", size: 54, weight: 700, color: JC.white },
    { t: "o desenvolvimento", size: 54, weight: 700, color: JC.white },
    { t: "da sua empresa.", size: 68, weight: 900, color: JC.white },
  ];
  return {
    dur: 4.8,
    bg: JC.mid,
    draw: (f) => {
      const { c, u, k } = f;
      const gap = 116 * u;
      const top = contentCenter(f) - ((blocos.length - 1) * gap) / 2;
      blocos.forEach((b, i) => {
        const at = 0.3 + i * 0.85;
        const p = easeOut(clamp01((k - at) / 0.4));
        if (p <= 0.001) return;
        const y = top + i * gap;
        c.save();
        c.globalAlpha = p;
        c.font = font(b.size * u, b.weight);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = b.color;
        c.fillText(b.t, f.w / 2, y + (1 - p) * 18 * u);
        const tw = c.measureText(b.t).width;
        c.restore();
        readingLine(f, f.w / 2, y + b.size * u * 0.7, Math.min(tw, f.w - 200 * u), k, {
          at: at + 0.1,
          color: JC.white,
          thickness: 4,
        });
      });
      drawLockup(f, k, LOCKUP, 3.2);
    },
  };
}

/** Tela staccato (Vídeo C) — frases permanecem, a última com carimbo. */
function staccato(): JScene {
  return {
    dur: 4.8,
    bg: JC.dark,
    draw: (f) => {
      const { c, u, k } = f;
      const cy = contentCenter(f);
      const linhas: [string, number, number][] = [
        ["É RÁPIDO.", cy - 190 * u, 0.35],
        ["É GRATUITO.", cy - 60 * u, 1.35],
      ];
      linhas.forEach(([s, y, at]) => {
        const p = easeOut(clamp01((k - at) / 0.3));
        if (p <= 0.001) return;
        c.save();
        c.globalAlpha = p;
        c.font = font(88 * u, 800);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = JC.white;
        c.fillText(s, f.w / 2, y + (1 - p) * 18 * u);
        c.restore();
      });
      stampText(f, "É OBRIGATÓRIO.", f.w / 2, cy + 110 * u, k, {
        size: 98 * u,
        color: JC.light,
        at: 2.4,
      });
      drawLockup(f, k, LOCKUP, 3.2);
    },
  };
}

/** Tela "acesso liberado" (Vídeo C). */
function acesso(): JScene {
  return {
    dur: 4.0,
    bg: JC.light,
    draw: (f) => {
      const { c, u, k } = f;
      const cy = contentCenter(f);
      const p1 = easeOut(clamp01((k - 0.2) / 0.4));
      c.save();
      c.globalAlpha = p1;
      c.font = font(58 * u, 700);
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = JC.dark;
      c.fillText("O ACESSO", f.w / 2, cy - 190 * u);
      c.restore();

      revealWords(f, "JÁ ESTÁ LIBERADO.", f.w / 2, cy - 130 * u, k, {
        size: 88 * u,
        weight: 900,
        color: JC.ink,
        maxWidth: f.w - 160 * u,
        lineHeight: 100 * u,
        start: 0.75,
        step: 0.24,
      });

      const p2 = easeOut(clamp01((k - 1.9) / 0.5));
      if (p2 > 0.001) {
        const y = cy + 110 * u;
        c.save();
        c.globalAlpha = p2;
        c.font = font(58 * u, 700);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = JC.dark;
        c.fillText("Falta só entrar.", f.w / 2, y);
        const tw = c.measureText("Falta só entrar.").width;
        c.restore();
        readingLine(f, f.w / 2, y + 44 * u, tw, k, { at: 2.15, color: JC.dark, thickness: 5 });
      }

      drawLockup(f, k, { ...LOCKUP, onLight: true }, 2.5);
    },
  };
}

/** Tela curta de acesso, usada só no GIF de reforço. */
function acesseGif(): JScene {
  return {
    dur: 2.2,
    bg: JC.mid,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "Acesse a Jornada da Autonomia", f.w / 2, contentCenter(f) - 110 * u, k, {
        size: 74 * u,
        weight: 900,
        color: JC.white,
        maxWidth: f.w - 200 * u,
        lineHeight: 92 * u,
        start: 0.1,
        step: 0.13,
      });
      drawLockup(f, k, LOCKUP, 0.7);
    },
  };
}

/* ------------------------------------------------------------------ vídeos */

export const JORNADA_VIDEOS: JVideo[] = [
  {
    id: "a-curta",
    title: "Vídeo A — Curta",
    subtitle: "Primeiro disparo. Nome do programa, obrigatoriedade e contato.",
    scenes: [abertura(), obrigatoria(), contato()],
  },
  {
    id: "b-porque",
    title: "Vídeo B — Com o porquê",
    subtitle: "Para quem ainda não sabe o que é o programa.",
    scenes: [abertura(), contexto(), obrigatoria(), contato()],
  },
  {
    id: "c-reforco",
    title: "Vídeo C — Reforço",
    subtitle: "Lembrete para quem recebeu e ainda não entrou.",
    scenes: [abertura(), staccato(), acesso(), contato()],
  },
];

/** Peça 4 — GIF de reforço: carimbo + acesso + contato resumido. */
export const GIF_REFORCO: JVideo = {
  id: "reforco",
  title: "GIF de reforço",
  subtitle: "Só o carimbo, o acesso e o contato. Leve o bastante para sinal fraco.",
  scenes: [obrigatoria(3.0), acesseGif(), contato(2.8)],
};

/** Peça 5 — card estático: frame do impacto do carimbo. */
export const CARD_ESTATICO: JVideo = {
  id: "card",
  title: "Card estático",
  subtitle: "Fallback para quando vídeo ou GIF não carregam.",
  scenes: [
    {
      dur: 3,
      bg: JC.ink,
      draw: (f) => {
        const { c, u, k } = f;
        const pl = easeOut(clamp01(k / 0.4));
        c.save();
        c.globalAlpha = pl;
        drawImageFit(f, LOGOS.jornadaWhite, f.w / 2, f.h * 0.2, 700 * u, 300 * u);
        c.restore();

        revealWords(f, "PARTICIPAÇÃO", f.w / 2, f.h * 0.37, k, {
          size: 92 * u,
          weight: 700,
          color: JC.white,
          maxWidth: f.w - 140 * u,
          lineHeight: 104 * u,
          start: 0.1,
          step: 0.2,
        });
        stampText(f, "OBRIGATÓRIA", f.w / 2, f.h * 0.54, k, {
          size: 104 * u,
          color: JC.light,
          at: 0.8,
        });

        const p = easeOut(clamp01((k - 1.3) / 0.4));
        c.save();
        c.globalAlpha = p;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.font = font(44 * u, 800);
        c.fillStyle = JC.white;
        c.fillText(`${CONTACT.name} · ${CONTACT.phone}`, f.w / 2, f.h * 0.655);
        c.restore();

        drawLockup(f, k, LOCKUP, 1.4);
      },
    },
  ],
};

/** Momento (s) em que o card estático é congelado — frame do impacto. */
export const CARD_FREEZE = 2.2;

/** Compatibilidade: versão curta usada pelo botão "Baixar GIF" dos vídeos. */
export function gifVersion(_v: JVideo): JVideo {
  return GIF_REFORCO;
}

export type { Frame };
