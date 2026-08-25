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

/* ------------------------------------------------------------------- telas */

/** Tela 1 — abertura-notificação + nome do programa. Idêntica nos 3 vídeos. */
function abertura(): JScene {
  return {
    dur: 3.0,
    bg: JC.dark,
    draw: (f) => {
      const { c, u, k } = f;
      const open = notificationOpen(f, k, "Participação obrigatória", JC.dark);
      if (open < 0.98) return;
      const kk = k - 1.8;

      const pl = easeOut(clamp01(kk / 0.5));
      if (pl > 0.001) {
        c.save();
        c.globalAlpha = pl;
        const cx = f.w / 2;
        const cy = f.h * 0.34 + (1 - pl) * 16 * u;
        if (!drawImageFit(f, LOGOS.jornadaWhite, cx, cy, 560 * u, 280 * u)) {
          c.font = font(96 * u, 900);
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillStyle = JC.white;
          c.fillText("Jornada da Autonomia", cx, cy);
        }
        c.restore();
      }

      readingLine(f, f.w / 2, f.h * 0.5, 240 * u, kk, { at: 0.35 });

      revealWords(f, "Um programa do Carrefour com a MyTS.", f.w / 2, f.h * 0.55, kk, {
        size: 56 * u,
        weight: 700,
        color: "rgba(255,255,255,.9)",
        maxWidth: f.w - 240 * u,
        lineHeight: 70 * u,
        start: 0.45,
        step: 0.12,
      });

      drawLockup(f, kk, LOCKUP, 0.7);
    },
  };
}

/** Tela de peso — carimbo em "OBRIGATÓRIA". */
function obrigatoria(dur = 3.0): JScene {
  return {
    dur,
    bg: JC.ink,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "PARTICIPAÇÃO", f.w / 2, f.h * 0.26, k, {
        size: 108 * u,
        weight: 700,
        color: "rgba(255,255,255,.92)",
        maxWidth: f.w - 120 * u,
        lineHeight: 120 * u,
        start: 0.12,
        step: 0.2,
      });
      stampText(f, "OBRIGATÓRIA", f.w / 2, f.h * 0.47, k, {
        size: 118 * u,
        color: JC.light,
        at: 0.85,
      });
      revealWords(f, "para fornecedores Carrefour", f.w / 2, f.h * 0.6, k, {
        size: 46 * u,
        weight: 700,
        color: "rgba(255,255,255,.62)",
        maxWidth: f.w - 200 * u,
        start: 1.5,
        step: 0.09,
      });
      drawLockup(f, k, LOCKUP, 1.7);
    },
  };
}

/** Tela de contato final, fundo branco. */
function contato(dur = 3.4): JScene {
  return {
    dur,
    bg: JC.white,
    draw: (f) => {
      const { c, u, k } = f;
      revealWords(f, "Dúvidas?", f.w / 2, f.h * 0.12, k, {
        size: 54 * u,
        weight: 700,
        color: JC.mid,
        maxWidth: f.w - 160 * u,
        step: 0.1,
      });

      const pn = easeOut(clamp01((k - 0.3) / 0.45));
      if (pn > 0.001) {
        c.save();
        c.globalAlpha = pn;
        c.font = font(66 * u, 900);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = JC.ink;
        const cy = f.h * 0.24;
        c.fillText(CONTACT.name, f.w / 2, cy);
        const tw = c.measureText(CONTACT.name).width;
        c.restore();
        deliveredTicks(
          f,
          f.w / 2 + tw / 2 + 24 * u,
          f.h * 0.24,
          38 * u,
          clamp01((k - 0.85) / 0.35),
          JC.mid,
        );
      }

      readingLine(f, f.w / 2, f.h * 0.3, 220 * u, k, { at: 0.7, color: JC.light, thickness: 5 });

      // telefone — discador
      const p = easeOut(clamp01((k - 0.95) / 0.35));
      if (p > 0.001) {
        const cy = f.h * 0.45;
        c.save();
        c.globalAlpha = p;
        c.font = font(80 * u, 900);
        const tw = c.measureText(CONTACT.phone).width;
        const bw = tw + 110 * u;
        const bh = 150 * u;
        c.fillStyle = JC.mid;
        roundRect(c, f.w / 2 - bw / 2, cy - bh / 2, bw, bh, 26 * u);
        c.fill();
        c.restore();
        dialerDigits(f, CONTACT.phone, f.w / 2, cy + 2 * u, k, {
          size: 80 * u,
          color: JC.white,
          at: 1.15,
        });
      }

      revealWords(f, CONTACT.email, f.w / 2, f.h * 0.56, k, {
        size: 46 * u,
        weight: 700,
        color: JC.dark,
        maxWidth: f.w - 120 * u,
        start: 1.6,
        step: 0.1,
      });

      drawLockup(f, k, { ...LOCKUP, onLight: true }, 1.8);
    },
  };
}

/** Tela de contexto (Vídeo B) — composição cumulativa com linha de leitura. */
function contexto(): JScene {
  const blocos = [
    { t: "CARREFOUR & MYTS", size: 74, weight: 900, color: JC.white },
    { t: "acompanham e reconhecem", size: 60, weight: 700, color: "rgba(255,255,255,.92)" },
    { t: "o desenvolvimento", size: 60, weight: 700, color: "rgba(255,255,255,.92)" },
    { t: "da sua empresa.", size: 74, weight: 900, color: JC.white },
  ];
  return {
    dur: 4.0,
    bg: JC.mid,
    draw: (f) => {
      const { c, u, k } = f;
      const top = f.h * 0.24;
      const gap = 122 * u;
      blocos.forEach((b, i) => {
        const at = 0.25 + i * 0.75;
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
        readingLine(f, f.w / 2, y + b.size * u * 0.72, tw, k, {
          at: at + 0.1,
          color: "rgba(124,194,150,.85)",
          thickness: 5,
        });
      });
      drawLockup(f, k, LOCKUP, 2.6);
    },
  };
}

/** Tela staccato (Vídeo C) — frases permanecem, a última com carimbo. */
function staccato(): JScene {
  return {
    dur: 4.0,
    bg: JC.mid,
    draw: (f) => {
      const { c, u, k } = f;
      const linhas: [string, number, number][] = [
        ["É RÁPIDO.", f.h * 0.26, 0.3],
        ["É GRATUITO.", f.h * 0.44, 1.2],
      ];
      linhas.forEach(([s, y, at]) => {
        const p = easeOut(clamp01((k - at) / 0.3));
        if (p <= 0.001) return;
        c.save();
        c.globalAlpha = p;
        c.font = font(92 * u, 800);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = JC.white;
        c.fillText(s, f.w / 2, y + (1 - p) * 18 * u);
        c.restore();
      });
      stampText(f, "É OBRIGATÓRIO.", f.w / 2, f.h * 0.63, k, {
        size: 106 * u,
        color: JC.ink,
        at: 2.1,
      });
      drawLockup(f, k, LOCKUP, 2.8);
    },
  };
}

/** Tela "acesso liberado" (Vídeo C). */
function acesso(): JScene {
  return {
    dur: 3.4,
    bg: JC.light,
    draw: (f) => {
      const { c, u, k } = f;
      const p1 = easeOut(clamp01((k - 0.2) / 0.4));
      c.save();
      c.globalAlpha = p1;
      c.font = font(64 * u, 700);
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = "rgba(35,31,32,.75)";
      c.fillText("O ACESSO", f.w / 2, f.h * 0.28);
      c.restore();

      revealWords(f, "JÁ ESTÁ LIBERADO.", f.w / 2, f.h * 0.36, k, {
        size: 96 * u,
        weight: 900,
        color: JC.ink,
        maxWidth: f.w - 140 * u,
        lineHeight: 108 * u,
        start: 0.7,
        step: 0.22,
      });

      const p2 = easeOut(clamp01((k - 1.6) / 0.5));
      if (p2 > 0.001) {
        c.save();
        c.globalAlpha = p2;
        c.font = font(62 * u, 700);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = JC.dark;
        const y = f.h * 0.56;
        c.fillText("Falta só entrar.", f.w / 2, y);
        const tw = c.measureText("Falta só entrar.").width;
        c.restore();
        readingLine(f, f.w / 2, f.h * 0.56 + 46 * u, tw, k, {
          at: 1.85,
          color: JC.mid,
          thickness: 5,
        });
      }

      drawLockup(f, k, { ...LOCKUP, onLight: true }, 2.1);
    },
  };
}

/** Tela curta de acesso, usada só no GIF de reforço. */
function acesseGif(): JScene {
  return {
    dur: 1.8,
    bg: JC.mid,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "Acesse a Jornada da Autonomia", f.w / 2, f.h * 0.34, k, {
        size: 78 * u,
        weight: 900,
        color: JC.white,
        maxWidth: f.w - 160 * u,
        lineHeight: 94 * u,
        start: 0.1,
        step: 0.13,
      });
      drawLockup(f, k, LOCKUP, 0.6);
    },
  };
}

/* ------------------------------------------------------------------ vídeos */

export const JORNADA_VIDEOS: JVideo[] = [
  {
    id: "a-curta",
    title: "Vídeo A — Curta",
    subtitle: "Primeiro disparo. Nome do programa, obrigatoriedade e contato.",
    scenes: [abertura(), obrigatoria(3.0), contato(3.4)],
  },
  {
    id: "b-porque",
    title: "Vídeo B — Com o porquê",
    subtitle: "Para quem ainda não sabe o que é o programa.",
    scenes: [abertura(), contexto(), obrigatoria(3.0), contato(3.4)],
  },
  {
    id: "c-reforco",
    title: "Vídeo C — Reforço",
    subtitle: "Lembrete para quem recebeu e ainda não entrou.",
    scenes: [abertura(), staccato(), acesso(), contato(3.4)],
  },
];

/** Peça 4 — GIF de reforço: carimbo + acesso + contato resumido. */
export const GIF_REFORCO: JVideo = {
  id: "reforco",
  title: "GIF de reforço",
  subtitle: "Só o carimbo, o acesso e o contato. Leve o bastante para sinal fraco.",
  scenes: [obrigatoria(2.4), acesseGif(), contato(2.2)],
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
        drawImageFit(f, LOGOS.jornadaWhite, f.w / 2, f.h * 0.19, 460 * u, 200 * u);
        c.restore();

        revealWords(f, "PARTICIPAÇÃO", f.w / 2, f.h * 0.34, k, {
          size: 96 * u,
          weight: 700,
          color: "rgba(255,255,255,.92)",
          maxWidth: f.w - 120 * u,
          lineHeight: 108 * u,
          start: 0.1,
          step: 0.2,
        });
        stampText(f, "OBRIGATÓRIA", f.w / 2, f.h * 0.52, k, {
          size: 108 * u,
          color: JC.light,
          at: 0.8,
        });

        const p = easeOut(clamp01((k - 1.3) / 0.4));
        c.save();
        c.globalAlpha = p;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.font = font(46 * u, 800);
        c.fillStyle = JC.white;
        c.fillText(`${CONTACT.name} · ${CONTACT.phone}`, f.w / 2, f.h * 0.66);
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
