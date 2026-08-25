import { Frame, clamp01, drawImageFit, easeOut, font, roundRect } from "@/lib/adsvideo/engine";
import { JC, JScene, JVideo, drawLockup, revealWords } from "./engine";
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

/** A placa de assinatura é sempre clara: usar as marcas em cores originais. */
const LOCKUP = {
  jornada: LOGOS.jornada,
  carrefour: LOGOS.carrefour,
  myts: LOGOS.mytsDark,
  onLight: false,
};

const CONTACT = {
  name: "Ricardo Machado, da MyTS",
  phone: "(14) 9 9844-5410",
  email: "ricardo.machado@myt-s.com",
};

/* ------------------------------------------------------------------- telas */

/** Tela 1 — abertura verde escuro, logo do programa em destaque. */
function abertura(): JScene {
  return {
    dur: 2.8,
    bg: JC.dark,
    draw: (f) => {
      const { c, u, k } = f;

      const pl = easeOut(clamp01((k - 0.1) / 0.6));
      if (pl > 0.001) {
        c.save();
        c.globalAlpha = pl;
        const w = 520 * u;
        const h = 260 * u;
        const cx = f.w / 2;
        const cy = f.h * 0.3 + (1 - pl) * 18 * u;
        const drawn = drawImageFit(f, LOGOS.jornadaWhite, cx, cy, w, h);
        if (!drawn) {
          c.font = font(96 * u, 900);
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillStyle = JC.white;
          c.fillText("Jornada da Autonomia", cx, cy);
        }
        c.restore();
      }

      revealWords(f, "Um programa do Carrefour com a MyTS.", f.w / 2, f.h * 0.52, k, {
        size: 62 * u,
        weight: 700,
        color: "rgba(255,255,255,.9)",
        maxWidth: f.w - 220 * u,
        lineHeight: 76 * u,
        start: 0.7,
        step: 0.13,
      });

      const p = easeOut(clamp01((k - 0.55) / 0.6));
      c.save();
      c.globalAlpha = p;
      c.fillStyle = JC.light;
      c.fillRect(f.w / 2 - 90 * u * p, f.h * 0.455, 180 * u * p, 8 * u);
      c.restore();

      drawLockup(f, k, LOCKUP, 1.2);
    },
  };
}

/** Tela de peso — "Participação obrigatória". */
function obrigatoria(dur = 2.6): JScene {
  return {
    dur,
    bg: JC.ink,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "Participação\nobrigatória", f.w / 2, f.h * 0.24, k, {
        size: 138 * u,
        weight: 900,
        color: JC.white,
        maxWidth: f.w - 140 * u,
        lineHeight: 154 * u,
        step: 0.3,
      });
      revealWords(f, "para fornecedores Carrefour", f.w / 2, f.h * 0.56, k, {
        size: 52 * u,
        weight: 700,
        color: "rgba(255,255,255,.72)",
        maxWidth: f.w - 200 * u,
        start: 0.9,
        step: 0.1,
      });
      const p = easeOut(clamp01((k - 0.8) / 0.7));
      f.c.save();
      f.c.globalAlpha = p;
      f.c.fillStyle = JC.light;
      f.c.fillRect(f.w / 2 - 130 * u * p, f.h * 0.505, 260 * u * p, 10 * u);
      f.c.restore();
      drawLockup(f, k, LOCKUP, 1.4);
    },
  };
}

/** Tela de contato final, fundo branco. */
function contato(dur = 3.2): JScene {
  return {
    dur,
    bg: JC.white,
    draw: (f) => {
      const { c, u, k } = f;
      revealWords(f, "Dúvidas?", f.w / 2, f.h * 0.1, k, {
        size: 58 * u,
        weight: 700,
        color: JC.mid,
        maxWidth: f.w - 160 * u,
        step: 0.1,
      });
      revealWords(f, CONTACT.name, f.w / 2, f.h * 0.18, k, {
        size: 74 * u,
        weight: 900,
        color: JC.ink,
        maxWidth: f.w - 160 * u,
        lineHeight: 86 * u,
        start: 0.3,
        step: 0.14,
      });

      // telefone com leve pulso
      const p = easeOut(clamp01((k - 0.85) / 0.5));
      if (p > 0.001) {
        const s = 1 + Math.sin(Math.max(0, k - 1.2) * 3.1) * 0.016;
        const cy = f.h * 0.42;
        c.save();
        c.globalAlpha = p;
        c.translate(f.w / 2, cy);
        c.scale(s, s);
        c.font = font(84 * u, 900);
        const tw = c.measureText(CONTACT.phone).width;
        const bw = tw + 110 * u;
        const bh = 148 * u;
        c.fillStyle = JC.mid;
        roundRect(c, -bw / 2, -bh / 2, bw, bh, 26 * u);
        c.fill();
        c.fillStyle = JC.white;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(CONTACT.phone, 0, 4 * u);
        c.restore();
      }

      revealWords(f, CONTACT.email, f.w / 2, f.h * 0.53, k, {
        size: 50 * u,
        weight: 700,
        color: JC.dark,
        maxWidth: f.w - 120 * u,
        start: 1.25,
        step: 0.12,
      });

      drawLockup(f, k, { ...LOCKUP, onLight: true }, 1.5);
    },
  };
}

/** Tela de contexto (Vídeo B). */
function contexto(): JScene {
  return {
    dur: 3.2,
    bg: JC.mid,
    draw: (f) => {
      const { u, k } = f;
      revealWords(
        f,
        "Carrefour e MyTS acompanham o desenvolvimento da sua empresa.",
        f.w / 2,
        f.h * 0.16,
        k,
        {
          size: 82 * u,
          weight: 800,
          color: JC.white,
          maxWidth: f.w - 160 * u,
          lineHeight: 100 * u,
          step: 0.14,
        },
      );
      revealWords(f, "Agora esse acompanhamento tem um caminho claro.", f.w / 2, f.h * 0.52, k, {
        size: 58 * u,
        weight: 700,
        color: "rgba(255,255,255,.85)",
        maxWidth: f.w - 200 * u,
        lineHeight: 72 * u,
        start: 1.5,
        step: 0.11,
      });
      drawLockup(f, k, LOCKUP, 1.9);
    },
  };
}

/** Tela staccato (Vídeo C). */
function staccato(): JScene {
  const frases = ["É rápido.", "É gratuito.", "É obrigatório."];
  return {
    dur: 3.2,
    bg: JC.mid,
    draw: (f) => {
      const { c, u, k } = f;
      const top = f.h * 0.18;
      frases.forEach((s, i) => {
        const start = 0.25 + i * 0.55;
        const p = easeOut(clamp01((k - start) / 0.26));
        if (p <= 0.001) return;
        c.save();
        c.globalAlpha = p;
        c.font = font(i === 2 ? 116 * u : 100 * u, 900);
        c.textAlign = "center";
        c.textBaseline = "top";
        c.fillStyle = i === 2 ? JC.ink : JC.white;
        c.fillText(s, f.w / 2, top + i * 146 * u + (1 - p) * 24 * u);
        c.restore();
      });
      drawLockup(f, k, LOCKUP, 1.9);
    },
  };
}

/** Tela "acesso liberado" (Vídeo C). */
function acesso(): JScene {
  return {
    dur: 2.8,
    bg: JC.light,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "Seu acesso já está liberado.", f.w / 2, f.h * 0.2, k, {
        size: 92 * u,
        weight: 800,
        color: JC.ink,
        maxWidth: f.w - 160 * u,
        lineHeight: 110 * u,
        step: 0.15,
      });
      revealWords(f, "Falta só entrar.", f.w / 2, f.h * 0.47, k, {
        size: 108 * u,
        weight: 900,
        color: JC.dark,
        maxWidth: f.w - 160 * u,
        lineHeight: 122 * u,
        start: 1.1,
        step: 0.2,
      });
      drawLockup(f, k, { ...LOCKUP, onLight: true }, 1.6);
    },
  };
}

/* ------------------------------------------------------------------ vídeos */

export const JORNADA_VIDEOS: JVideo[] = [
  {
    id: "a-curta",
    title: "Vídeo A — Curta",
    subtitle: "Primeiro disparo. Nome do programa, obrigatoriedade e contato.",
    scenes: [abertura(), obrigatoria(2.6), contato(3.2)],
  },
  {
    id: "b-porque",
    title: "Vídeo B — Com o porquê",
    subtitle: "Para quem ainda não sabe o que é o programa.",
    scenes: [abertura(), contexto(), obrigatoria(2.6), contato(3.2)],
  },
  {
    id: "c-reforco",
    title: "Vídeo C — Reforço",
    subtitle: "Lembrete para quem recebeu e ainda não entrou.",
    scenes: [abertura(), staccato(), acesso(), contato(3.2)],
  },
];

/**
 * Versão curta para GIF: só a tela de maior peso + contato.
 * GIF é pesado por natureza; no WhatsApp com sinal fraco, menos frames = mais entrega.
 */
export function gifVersion(v: JVideo): JVideo {
  return {
    ...v,
    id: `${v.id}-gif`,
    scenes: [obrigatoria(2.4), contato(3)],
  };
}

export type { Frame };
