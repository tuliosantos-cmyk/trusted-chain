import { Frame, clamp01, easeOut, font, roundRect } from "@/lib/adsvideo/engine";
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

const CONTACT = {
  name: "Ricardo Machado, da MyTS",
  phone: "(14) 9 9844-5410",
  email: "ricardo.machado@myt-s.com",
};

/* ------------------------------------------------------------------- telas */

/** Tela 1 — abertura verde escuro com o nome do programa. */
function abertura(): JScene {
  return {
    dur: 2.5,
    bg: JC.dark,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "Jornada da\nAutonomia", f.w / 2, f.h * 0.34, k, {
        size: 128 * u,
        weight: 900,
        color: JC.white,
        maxWidth: f.w - 180 * u,
        lineHeight: 146 * u,
        step: 0.22,
      });
      const p = easeOut(clamp01((k - 0.75) / 0.7));
      f.c.save();
      f.c.globalAlpha = p;
      f.c.fillStyle = JC.light;
      f.c.fillRect(f.w / 2 - 110 * u * p, f.h * 0.34 + 320 * u, 220 * u * p, 10 * u);
      f.c.restore();
      drawLockup(
        f,
        k,
        {
          jornada: LOGOS.jornadaWhite,
          carrefour: LOGOS.carrefour,
          myts: LOGOS.jornada,
          onLight: false,
        },
        1.1,
      );
    },
  };
}

/** Tela de peso — "Participação obrigatória". */
function obrigatoria(dur = 2.5): JScene {
  return {
    dur,
    bg: JC.ink,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "Participação\nobrigatória", f.w / 2, f.h * 0.3, k, {
        size: 166 * u,
        weight: 900,
        color: JC.white,
        maxWidth: f.w - 120 * u,
        lineHeight: 186 * u,
        step: 0.3,
      });
      const p = easeOut(clamp01((k - 0.9) / 0.8));
      f.c.save();
      f.c.globalAlpha = p;
      f.c.fillStyle = JC.light;
      f.c.fillRect(f.w / 2 - 160 * u * p, f.h * 0.3 + 420 * u, 320 * u * p, 12 * u);
      f.c.restore();
    },
  };
}

/** Tela de contato final, fundo branco. */
function contato(dur = 3): JScene {
  return {
    dur,
    bg: JC.white,
    draw: (f) => {
      const { c, u, k } = f;
      revealWords(f, "Dúvidas?", f.w / 2, f.h * 0.2, k, {
        size: 76 * u,
        weight: 700,
        color: JC.dark,
        maxWidth: f.w - 160 * u,
        step: 0.1,
      });
      revealWords(f, CONTACT.name, f.w / 2, f.h * 0.2 + 120 * u, k, {
        size: 92 * u,
        weight: 900,
        color: JC.ink,
        maxWidth: f.w - 160 * u,
        lineHeight: 106 * u,
        start: 0.3,
        step: 0.14,
      });

      // telefone com leve pulso
      const p = easeOut(clamp01((k - 0.85) / 0.5));
      if (p > 0.001) {
        const s = 1 + Math.sin(Math.max(0, k - 1.2) * 3.1) * 0.018;
        const cy = f.h * 0.5;
        c.save();
        c.globalAlpha = p;
        c.translate(f.w / 2, cy);
        c.scale(s, s);
        c.font = font(96 * u, 900);
        const tw = c.measureText(CONTACT.phone).width;
        const bw = tw + 120 * u;
        const bh = 168 * u;
        c.fillStyle = JC.mid;
        roundRect(c, -bw / 2, -bh / 2, bw, bh, 28 * u);
        c.fill();
        c.fillStyle = JC.white;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(CONTACT.phone, 0, 4 * u);
        c.restore();
      }

      revealWords(f, CONTACT.email, f.w / 2, f.h * 0.62, k, {
        size: 60 * u,
        weight: 700,
        color: JC.dark,
        maxWidth: f.w - 120 * u,
        start: 1.25,
        step: 0.12,
      });

      drawLockup(
        f,
        k,
        {
          jornada: LOGOS.jornada,
          carrefour: LOGOS.carrefour,
          myts: LOGOS.mytsDark,
          onLight: true,
        },
        1.5,
      );
    },
  };
}

/** Tela de contexto (Vídeo B). */
function contexto(): JScene {
  return {
    dur: 3.5,
    bg: JC.mid,
    draw: (f) => {
      const { u, k } = f;
      revealWords(
        f,
        "Carrefour e MyTS acompanham e reconhecem o desenvolvimento da sua empresa.",
        f.w / 2,
        f.h * 0.26,
        k,
        {
          size: 92 * u,
          weight: 800,
          color: JC.white,
          maxWidth: f.w - 180 * u,
          lineHeight: 116 * u,
          step: 0.16,
        },
      );
    },
  };
}

/** Tela staccato (Vídeo C). */
function staccato(): JScene {
  const frases = ["É rápido.", "É gratuito.", "É obrigatório."];
  return {
    dur: 3.5,
    bg: JC.mid,
    draw: (f) => {
      const { c, u, k } = f;
      const top = f.h * 0.29;
      frases.forEach((s, i) => {
        const start = 0.25 + i * 0.55;
        const p = easeOut(clamp01((k - start) / 0.26));
        if (p <= 0.001) return;
        c.save();
        c.globalAlpha = p;
        c.font = font(i === 2 ? 132 * u : 116 * u, 900);
        c.textAlign = "center";
        c.textBaseline = "top";
        c.fillStyle = i === 2 ? JC.ink : JC.white;
        c.fillText(s, f.w / 2, top + i * 170 * u + (1 - p) * 26 * u);
        c.restore();
      });
    },
  };
}

/** Tela "acesso liberado" (Vídeo C). */
function acesso(): JScene {
  return {
    dur: 3,
    bg: JC.light,
    draw: (f) => {
      const { u, k } = f;
      revealWords(f, "O acesso já está liberado.", f.w / 2, f.h * 0.28, k, {
        size: 106 * u,
        weight: 800,
        color: JC.ink,
        maxWidth: f.w - 180 * u,
        lineHeight: 126 * u,
        step: 0.16,
      });
      revealWords(f, "Falta só entrar.", f.w / 2, f.h * 0.52, k, {
        size: 126 * u,
        weight: 900,
        color: JC.dark,
        maxWidth: f.w - 180 * u,
        lineHeight: 140 * u,
        start: 1.1,
        step: 0.2,
      });
    },
  };
}

/* ------------------------------------------------------------------ vídeos */

export const JORNADA_VIDEOS: JVideo[] = [
  {
    id: "a-curta",
    title: "Vídeo A — Curta",
    subtitle: "Primeiro disparo. Nome do programa, obrigatoriedade e contato.",
    scenes: [abertura(), obrigatoria(2.5), contato(3)],
  },
  {
    id: "b-porque",
    title: "Vídeo B — Com o porquê",
    subtitle: "Para quem ainda não sabe o que é o programa.",
    scenes: [abertura(), contexto(), obrigatoria(2.5), contato(3)],
  },
  {
    id: "c-reforco",
    title: "Vídeo C — Reforço",
    subtitle: "Lembrete para quem recebeu e ainda não entrou.",
    scenes: [abertura(), staccato(), acesso(), contato(3)],
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
