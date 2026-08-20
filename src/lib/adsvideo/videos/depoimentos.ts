import {
  C,
  ICONS,
  Scene,
  VideoDef,
  bgDark,
  bgLight,
  clamp01,
  easeBack,
  icon,
  inAt,
  text,
} from "../engine";
import { CLIENT_LOGOS } from "../brand";
import { accentBar, caption, clientLogo, ctaScene, kicker, pad } from "../scenes";

type Testimonial = {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  dark: boolean;
  logo?: string;
  quote: [string, string];
  author: string;
  ctaLabel: string;
  ctaLine: string;
};

/** Abertura: nome da empresa em destaque (com logo, quando existe). */
function openScene(t: Testimonial): Scene {
  return {
    dur: 4,
    draw: (f) => {
      t.dark ? bgDark(f, f.k) : bgLight(f);
      const cx = f.w / 2;
      const p = inAt(f.k, 0.05, 0.8, easeBack);
      const cy = f.h * (t.logo ? 0.42 : 0.46);
      if (t.logo) {
        const w = f.v ? f.w * 0.56 : f.w * 0.26;
        clientLogo(f, t.logo, t.company, cx, f.h * 0.3, w, w * 0.44, p);
      }
      f.c.save();
      f.c.globalAlpha *= clamp01(p);
      kicker(
        f,
        "Depoimento de cliente",
        cx,
        cy - (f.v ? 120 : 100) * f.u,
        t.dark ? "#9FC0F5" : C.blue,
        p,
      );
      f.c.restore();
      // kicker centralizado precisa de align: redesenha centralizado
      const size = f.v ? 96 * f.u : 82 * f.u;
      f.c.save();
      f.c.globalAlpha *= clamp01(p);
      text(f, t.company, cx, cy + (1 - p) * 40 * f.u, {
        size,
        weight: 900,
        color: t.dark ? C.white : C.navy,
        align: "center",
        maxWidth: f.w - pad(f) * 2,
        lineHeight: size * 1.1,
      });
      f.c.restore();
      accentBar(
        f,
        cx - (f.v ? 100 : 120) * f.u,
        cy + size * 1.4,
        inAt(f.k, 0.7, 0.8),
        C.blue,
        (f.v ? 200 : 240) * f.u,
      );
    },
  };
}

/** Depoimento em 2 blocos + atribuição. */
function quoteScene(t: Testimonial): Scene {
  return {
    dur: 18,
    draw: (f) => {
      t.dark ? bgDark(f, f.k) : bgLight(f);
      const cx = f.w / 2;
      const maxW = f.w - pad(f) * 2.4;
      const size = f.v ? 74 * f.u : 62 * f.u;
      const qp = inAt(f.k, 0.2, 0.8);
      f.c.save();
      f.c.globalAlpha *= qp * 0.5;
      icon(
        f,
        ICONS.quote,
        cx,
        f.h * (f.v ? 0.22 : 0.2),
        (f.v ? 120 : 96) * f.u,
        t.dark ? "#9FC0F5" : C.blue,
        1.6,
      );
      f.c.restore();

      const blocks = t.quote;
      let y = f.h * (f.v ? 0.34 : 0.32);
      blocks.forEach((b, i) => {
        const p = inAt(f.k, 0.6 + i * 4.2, 1);
        if (p <= 0) return;
        f.c.save();
        f.c.globalAlpha *= p * (i === 0 && f.k > 5.4 ? 0.55 : 1);
        const h = text(f, `“${b}”`, cx, y + (1 - p) * 36 * f.u, {
          size,
          weight: 800,
          color: t.dark ? C.white : C.navy,
          align: "center",
          maxWidth: maxW,
          lineHeight: size * 1.22,
        });
        f.c.restore();
        y += h + size * 0.7;
      });

      const ap = inAt(f.k, 13.6, 0.8);
      if (ap > 0) {
        f.c.save();
        f.c.globalAlpha *= ap;
        text(f, t.author, cx, y + (1 - ap) * 26 * f.u, {
          size: f.v ? 40 * f.u : 34 * f.u,
          weight: 700,
          color: t.dark ? "rgba(255,255,255,.7)" : C.inkSoft,
          align: "center",
          maxWidth: maxW,
        });
        f.c.restore();
      }
    },
  };
}

function testimonial(t: Testimonial): VideoDef {
  return {
    id: t.id,
    campaign: "depoimentos",
    title: t.title,
    subtitle: t.subtitle,
    duration: 28,
    scenes: [
      openScene(t),
      quoteScene(t),
      ctaScene({ dur: 6, label: t.ctaLabel, line: t.ctaLine }),
    ],
  };
}

export const depoimentosVideos: VideoDef[] = [
  testimonial({
    id: "dep-korin",
    title: "Depoimento — Korin",
    subtitle: "Organização, rastreabilidade e auditorias",
    company: "Korin Alimentos",
    dark: true,
    logo: CLIENT_LOGOS.korin,
    quote: [
      "A MyTS trouxe ganhos em organização, rastreabilidade e padronização dos processos.",
      "Especialmente na gestão documental e no suporte a auditorias.",
    ],
    author: "Mylena Ferreira · Korin Alimentos",
    ctaLabel: "Agendar uma conversa",
    ctaLine: "Agende uma conversa\ncom a MyTS.",
  }),
  testimonial({
    id: "dep-augusta",
    title: "Depoimento — Augusta",
    subtitle: "Pendências visíveis e cobrança com embasamento",
    company: "Augusta Alimentos",
    dark: false,
    quote: [
      "Consigo visualizar melhor as pendências e cobrar meus fornecedores com mais clareza e embasamento.",
      "Já indiquei a MyTS pra fornecedores — como o nosso cliente Catupiry.",
    ],
    author: "Larissa · Augusta Alimentos",
    ctaLabel: "Agendar uma conversa",
    ctaLine: "Agende uma conversa\ncom a MyTS.",
  }),
  testimonial({
    id: "dep-especiali",
    title: "Depoimento — Especiali",
    subtitle: "De ligar fornecedor por fornecedor a abrir o sistema",
    company: "Especiali Alimentos",
    dark: true,
    quote: [
      "Antes contatava fornecedor por fornecedor. Hoje só abro o sistema e já vejo tudo.",
      "Reduziu o estresse de ter que ficar cobrando os fornecedores.",
    ],
    author: "Francielly · Especiali Alimentos",
    ctaLabel: "Agendar uma conversa",
    ctaLine: "Agende uma conversa\ncom a MyTS.",
  }),
  testimonial({
    id: "dep-aval",
    title: "Depoimento — Aval",
    subtitle: "Perspectiva de quem audita",
    company: "Aval",
    dark: false,
    logo: CLIENT_LOGOS.aval,
    quote: [
      "A MyTS tornou o processo de auditoria mais ágil e fácil de conduzir.",
      "Mais simples pra quem audita e pra quem é auditado.",
    ],
    author: "Fabiane, auditora · Aval",
    ctaLabel: "Falar sobre auditoria",
    ctaLine: "Fale com a MyTS\nsobre sua auditoria.",
  }),
];
