import {
  C,

  ICONS,
  VideoDef,
  bgLight,
  clamp01,
  easeBack,
  easeOut,
  icon,
  inAt,
  roundRect,
  text,
} from "../engine";
import { artLayout, splitLayout } from "../layout";
import {

  caption,
  ctaScene,
  hookScene,
  kicker,
  mockPanel,
  pad,
  supplierRow,
} from "../scenes";

/* =============================== VÍDEO 1 =============================== */
const v1: VideoDef = {
  id: "hom-1",
  campaign: "homologacao",
  title: "Chega de planilha",
  subtitle: "Problema central · homologação sem planilha",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      kicker: "Gestão de fornecedores",
      title: "Homologar\nfornecedor não é\nmais checar CNPJ.",
      highlight: "checar CNPJ.",
    }),
    {
      dur: 7,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        kicker(f, "O jeito antigo", L.p, f.h * 0.1, C.blue, inAt(f.k, 0.05, 0.6));
        const s = L.art.size;
        const icons = [
          { d: ICONS.mail, fx: -1, fy: -1.2 },
          { d: ICONS.sheet, fx: 1, fy: -1.2 },
          { d: ICONS.folder, fx: -1, fy: 1.2 },
          { d: ICONS.cloud, fx: 1, fy: 1.2 },
        ];
        const conv = easeOut(clamp01((f.k - 0.4) / 2.1));
        icons.forEach((it, i) => {
          const ap = inAt(f.k, 0.15 + i * 0.12, 0.6);
          if (ap <= 0) return;
          const fromX = L.art.cx + it.fx * s * 0.44;
          const fromY = L.art.cy + it.fy * s * 0.36;
          const toX = L.art.cx + it.fx * s * 0.17;
          const toY = L.art.cy + it.fy * s * 0.15;
          const x = fromX + (toX - fromX) * conv;
          const y = fromY + (toY - fromY) * conv;
          const box = s * 0.24;
          f.c.save();
          f.c.globalAlpha *= ap;
          f.c.fillStyle = C.white;
          f.c.strokeStyle = "rgba(31,56,100,.14)";
          f.c.lineWidth = 3 * f.u;
          roundRect(f.c, x - box / 2, y - box / 2, box, box, box * 0.22);
          f.c.fill();
          f.c.stroke();
          icon(f, it.d, x, y, box * 0.5, C.navy, 1.6);
          f.c.restore();
        });
        // X vermelho
        const xp = inAt(f.k, 2.3, 0.6, easeBack);
        if (xp > 0) {
          const r = s * 0.16 * xp;
          f.c.save();
          f.c.globalAlpha *= clamp01(xp);
          f.c.fillStyle = C.white;
          f.c.beginPath();
          f.c.arc(L.art.cx, L.art.cy, r, 0, Math.PI * 2);
          f.c.fill();
          f.c.strokeStyle = C.red;
          f.c.lineWidth = 8 * f.u;
          f.c.stroke();
          icon(f, ICONS.x, L.art.cx, L.art.cy, r, C.red, 2.2);
          f.c.restore();
        }
        caption(
          f,
          "Fornecedor novo.\nPlanilha de novo?",
          "E-mail, planilha, pasta, drive — tudo em lugares diferentes.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          3.1,
        );
      },
    },
    {
      dur: 13,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Plataforma MyTS", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const m = mockPanel(
          f,
          L.mock.x,
          L.mock.y,
          L.mock.w,
          L.mock.h,
          "Meus Fornecedores e Insumos",
          inAt(f.k, 0.1, 1),
        );
        const rows = [
          {
            name: "Laticínios Vale",
            sub: "Leite em pó integral",
            iconD: ICONS.building,
            fromLabel: "Pendente",
            fromBg: "rgba(232,163,61,.16)",
            fromFg: C.amberInk,
            flipAt: 4.2,
          },
          {
            name: "Embalagens Prisma",
            sub: "Filme laminado BOPP",
            iconD: ICONS.box,
            fromLabel: "Vencido",
            fromBg: "rgba(214,69,69,.14)",
            fromFg: C.redInk,
            flipAt: 5.6,
          },
          {
            name: "Aromas Sul",
            sub: "Aroma de baunilha",
            iconD: ICONS.flask,
            fromLabel: "Pendente",
            fromBg: "rgba(232,163,61,.16)",
            fromFg: C.amberInk,
            flipAt: 7,
          },
        ];
        const gap = 20 * f.u;
        const rowH = (m.bh - gap * 2) / 3;
        rows.forEach((r, i) => {
          supplierRow(f, m.bx, m.by + i * (rowH + gap), m.bw, rowH, {
            ...r,
            p: inAt(f.k, 0.8 + i * 0.2, 0.7),
          });
        });
        caption(
          f,
          "Fornecedor se cadastra sozinho.\nVocê só valida.",
          "Validação em tempo real, com histórico e alerta de vencimento.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          8.4,
        );
      },
    },
    ctaScene({ dur: 6, label: "Agende uma conversa", line: "Agende uma conversa\ncom a MyTS." }),
  ],
};

/* =============================== VÍDEO 2 =============================== */
const v2: VideoDef = {
  id: "hom-2",
  campaign: "homologacao",
  title: "A parte que ninguém vê",
  subtitle: "Matéria-prima e ficha técnica dentro do fornecedor",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      dark: false,
      kicker: "Matéria-prima e P&D",
      title: "Ficha técnica\ndo ingrediente.\nOnde ela está mesmo?",
      highlight: "Onde ela está mesmo?",
      extra: (f) => {
        const p = inAt(f.k, 0, 0.9, easeBack);
        const cy = f.v ? f.h * 0.2 : f.h * 0.16;
        f.c.save();
        f.c.globalAlpha *= clamp01(p);
        f.c.translate(pad(f) + 70 * f.u, cy);
        f.c.rotate((1 - p) * -0.5 + Math.sin(f.k * 1.2) * 0.05);
        icon(f, ICONS.flask, 0, 0, 130 * f.u, C.blue, 1.5);
        f.c.restore();
      },
    }),
    {
      dur: 7,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const open = easeOut(clamp01((f.k - 0.5) / 0.8));
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 0.05, 0.5);
        f.c.translate(L.art.cx, L.art.cy + s * 0.12);
        f.c.rotate(-open * 0.08);
        icon(f, ICONS.folder, 0, 0, s * 0.44, C.navy, 1.5);
        f.c.restore();
        const docs = [
          { dx: -0.34, dy: -0.36, rot: -0.3 },
          { dx: 0.02, dy: -0.46, rot: 0.12 },
          { dx: 0.36, dy: -0.3, rot: 0.34 },
        ];
        docs.forEach((d, i) => {
          const p = easeOut(clamp01((f.k - (0.9 + i * 0.18)) / 1.1));
          if (p <= 0) return;
          const x = L.art.cx + d.dx * s * p;
          const y = L.art.cy + d.dy * s * p;
          f.c.save();
          f.c.globalAlpha *= clamp01(p);
          f.c.translate(x, y + Math.sin(f.k * 1.4 + i) * 6 * f.u);
          f.c.rotate(d.rot * p);
          const bw = s * 0.2;
          const bh = bw * 1.3;
          f.c.fillStyle = C.white;
          f.c.strokeStyle = "rgba(31,56,100,.14)";
          f.c.lineWidth = 3 * f.u;
          roundRect(f.c, -bw / 2, -bh / 2, bw, bh, 14 * f.u);
          f.c.fill();
          f.c.stroke();
          icon(f, ICONS.doc, 0, 0, bw * 0.5, C.blue, 1.6);
          f.c.restore();
        });
        caption(
          f,
          "Perdida numa pasta\nseparada, longe do fornecedor.",
          "Sem rastro de versão, sem alerta de validade.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          3.1,
        );
      },
    },
    {
      dur: 13,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Ficha técnica no lugar certo", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const m = mockPanel(
          f,
          L.mock.x,
          L.mock.y,
          L.mock.w,
          L.mock.h,
          "Fornecedor · Laticínios Vale",
          inAt(f.k, 0.1, 1),
        );
        // card do fornecedor
        const headH = m.bh * 0.3;
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 0.7, 0.6);
        f.c.fillStyle = C.white;
        roundRect(f.c, m.bx, m.by, m.bw, headH, 24 * f.u);
        f.c.fill();
        f.c.strokeStyle = "rgba(31,56,100,.10)";
        f.c.lineWidth = 2 * f.u;
        roundRect(f.c, m.bx, m.by, m.bw, headH, 24 * f.u);
        f.c.stroke();
        icon(f, ICONS.building, m.bx + headH * 0.42, m.by + headH / 2, headH * 0.4, C.blue, 1.8);
        text(f, "Laticínios Vale", m.bx + headH * 0.8, m.by + headH * 0.25, {
          size: 34 * f.u,
          weight: 800,
          color: C.navy,
        });
        text(f, "Homologado · 2 insumos vinculados", m.bx + headH * 0.8, m.by + headH * 0.58, {
          size: 25 * f.u,
          weight: 600,
          color: "rgba(31,56,100,.55)",
        });
        // seta de expandir
        const rot = easeOut(clamp01((f.k - 2) / 0.6)) * Math.PI;
        f.c.save();
        f.c.translate(m.bx + m.bw - 46 * f.u, m.by + headH / 2);
        f.c.rotate(rot);
        f.c.strokeStyle = C.blue;
        f.c.lineWidth = 4 * f.u;
        f.c.lineCap = "round";
        f.c.beginPath();
        f.c.moveTo(-14 * f.u, -6 * f.u);
        f.c.lineTo(0, 8 * f.u);
        f.c.lineTo(14 * f.u, -6 * f.u);
        f.c.stroke();
        f.c.restore();
        f.c.restore();

        // sublista de insumos (accordion)
        const exp = easeOut(clamp01((f.k - 2.1) / 0.9));
        const items = [
          { n: "Leite em pó integral", d: "Ficha técnica · Laudo microbiológico" },
          { n: "Soro de leite", d: "Ficha técnica · Certificado de origem" },
        ];
        const areaY = m.by + headH + 22 * f.u;
        const areaH = (m.bh - headH - 44 * f.u) * exp;
        f.c.save();
        f.c.beginPath();
        f.c.rect(m.bx, areaY, m.bw, Math.max(0, areaH));
        f.c.clip();
        const ih = (m.bh - headH - 44 * f.u - 18 * f.u) / 2;
        items.forEach((it, i) => {
          const p = inAt(f.k, 2.5 + i * 0.35, 0.6);
          const y = areaY + i * (ih + 18 * f.u);
          f.c.save();
          f.c.globalAlpha *= clamp01(p);
          f.c.translate((1 - p) * 40 * f.u, 0);
          f.c.fillStyle = "rgba(46,91,170,.06)";
          roundRect(f.c, m.bx + 40 * f.u, y, m.bw - 40 * f.u, ih, 22 * f.u);
          f.c.fill();
          f.c.strokeStyle = "rgba(46,91,170,.18)";
          f.c.lineWidth = 2 * f.u;
          roundRect(f.c, m.bx + 40 * f.u, y, m.bw - 40 * f.u, ih, 22 * f.u);
          f.c.stroke();
          icon(f, ICONS.flask, m.bx + 40 * f.u + ih * 0.45, y + ih / 2, ih * 0.4, C.blue, 1.8);
          text(f, it.n, m.bx + 40 * f.u + ih * 0.85, y + ih * 0.24, {
            size: 30 * f.u,
            weight: 800,
            color: C.navy,
          });
          text(f, it.d, m.bx + 40 * f.u + ih * 0.85, y + ih * 0.58, {
            size: 24 * f.u,
            weight: 600,
            color: "rgba(31,56,100,.55)",
          });
          const anexo = inAt(f.k, 3.4 + i * 0.4, 0.5, easeBack);
          if (anexo > 0) {
            f.c.save();
            f.c.globalAlpha *= clamp01(anexo);
            const bx = m.bx + m.bw - 30 * f.u;
            f.c.fillStyle = "rgba(34,160,107,.16)";
            const bw2 = ih * 0.9;
            roundRect(f.c, bx - bw2, y + ih / 2 - bw2 / 2, bw2, bw2, bw2 * 0.32);
            f.c.fill();
            icon(f, ICONS.doc, bx - bw2 / 2, y + ih / 2, bw2 * 0.5, C.greenInk, 1.8);
            f.c.restore();
          }
          f.c.restore();
        });
        f.c.restore();

        caption(
          f,
          "Na MyTS, a matéria-prima\nvive dentro do fornecedor.",
          "Ficha técnica, laudo e validade sempre no mesmo cadastro.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          8.4,
        );
      },
    },
    ctaScene({ dur: 6, label: "Fale com a MyTS", line: "Fale com a MyTS\nsobre sua operação." }),
  ],
};

/* =============================== VÍDEO 3 =============================== */
const v3: VideoDef = {
  id: "hom-3",
  campaign: "homologacao",
  title: "Não é só ferramenta",
  subtitle: "Metodologia · homologar, monitorar, desenvolver",
  duration: 30,
  scenes: [
    {
      dur: 4,
      draw: (f) => {
        const L = artLayout(f);
        // fundo escuro
        f.c.save();
        f.c.fillStyle = C.navy;
        f.c.fillRect(0, 0, f.w, f.h);
        f.c.restore();
        const words = [
          { t: "Homologar.", d: ICONS.seal },
          { t: "Monitorar.", d: ICONS.radar },
          { t: "Desenvolver.", d: ICONS.chart },
        ];
        const p0 = pad(f);
        const size = f.v ? 86 * f.u : 74 * f.u;
        const gap = f.v ? 190 * f.u : 150 * f.u;
        const startY = f.h / 2 - gap;
        words.forEach((w, i) => {
          const p = inAt(f.k, 0.2 + i * 0.9, 0.7, easeBack);
          if (p <= 0) return;
          const y = startY + i * gap;
          f.c.save();
          f.c.globalAlpha *= clamp01(p);
          f.c.translate((1 - p) * -50 * f.u, 0);
          const box = size * 1.6;
          f.c.strokeStyle = "rgba(127,176,255,.35)";
          f.c.lineWidth = 3 * f.u;
          roundRect(f.c, p0, y - box / 2, box, box, box * 0.28);
          f.c.stroke();
          icon(f, w.d, p0 + box / 2, y, box * 0.55, C.blueSoft, 1.6);
          text(f, w.t, p0 + box + 40 * f.u, y - size * 0.6, {
            size,
            weight: 900,
            color: C.white,
          });
          f.c.restore();
        });
        void L;
      },
    },
    {
      dur: 6,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const p = inAt(f.k, 0.1, 0.7, easeBack);
        f.c.save();
        f.c.globalAlpha *= clamp01(p);
        icon(f, ICONS.calendar, L.art.cx, L.art.cy, s * 0.52, C.navy, 1.4);
        const blink = 0.55 + 0.45 * Math.sin(f.k * 5);
        f.c.globalAlpha *= blink;
        icon(f, ICONS.x, L.art.cx, L.art.cy + s * 0.06, s * 0.24, C.red, 2.4);
        f.c.restore();
        caption(
          f,
          "Cadastro parado depois\nde aprovado não é gestão.",
          "Documento vence, planta muda, risco aparece.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          2.4,
        );
      },
    },
    {
      dur: 14,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Implementação MyTS", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const steps = ["Kickoff", "Setup", "Integração", "Coleta", "Manutenção"];
        const m = L.mock;
        const vertical = f.v;
        const n = steps.length;
        const span = vertical ? m.h * 0.92 : m.w * 0.94;
        const startX = vertical ? m.x + m.w * 0.22 : m.x + m.w * 0.03;
        const startY = vertical ? m.y + m.h * 0.04 : m.y + m.h * 0.5;
        const gap = span / (n - 1);
        // trilho
        const prog = clamp01((f.k - 0.6) / 5.2);
        f.c.save();
        f.c.strokeStyle = "rgba(31,56,100,.14)";
        f.c.lineWidth = 8 * f.u;
        f.c.lineCap = "round";
        f.c.beginPath();
        if (vertical) {
          f.c.moveTo(startX, startY);
          f.c.lineTo(startX, startY + span);
        } else {
          f.c.moveTo(startX, startY);
          f.c.lineTo(startX + span, startY);
        }
        f.c.stroke();
        f.c.strokeStyle = C.blue;
        f.c.beginPath();
        if (vertical) {
          f.c.moveTo(startX, startY);
          f.c.lineTo(startX, startY + span * prog);
        } else {
          f.c.moveTo(startX, startY);
          f.c.lineTo(startX + span * prog, startY);
        }
        f.c.stroke();
        f.c.restore();

        steps.forEach((st, i) => {
          const at = 0.8 + i * 1.05;
          const on = f.k >= at;
          const since = f.k - at;
          const r = (vertical ? 34 : 30) * f.u * (on ? 1 + Math.max(0, 0.35 * (1 - easeOut(since / 0.5))) : 0.85);
          const x = vertical ? startX : startX + i * gap;
          const y = vertical ? startY + i * gap : startY;
          f.c.save();
          if (on && since < 1) {
            f.c.globalAlpha *= (1 - since) * 0.5;
            f.c.strokeStyle = C.blue;
            f.c.lineWidth = 5 * f.u;
            f.c.beginPath();
            f.c.arc(x, y, r + since * 60 * f.u, 0, Math.PI * 2);
            f.c.stroke();
            f.c.globalAlpha = 1;
          }
          f.c.restore();
          f.c.save();
          f.c.fillStyle = on ? C.blue : C.white;
          f.c.strokeStyle = on ? C.blue : "rgba(31,56,100,.22)";
          f.c.lineWidth = 5 * f.u;
          f.c.beginPath();
          f.c.arc(x, y, r, 0, Math.PI * 2);
          f.c.fill();
          f.c.stroke();
          if (on) icon(f, ICONS.check, x, y, r * 1.1, C.white, 2.6);
          const lblSize = (vertical ? 36 : 30) * f.u;
          f.c.globalAlpha *= on ? 1 : 0.35;
          if (vertical) {
            text(f, st, x + r + 34 * f.u, y - lblSize * 0.6, {
              size: lblSize,
              weight: 800,
              color: C.navy,
            });
          } else {
            text(f, st, x, y + r + 34 * f.u, {
              size: lblSize,
              weight: 800,
              color: C.navy,
              align: "center",
            });
          }
          f.c.restore();
        });

        caption(
          f,
          "Kickoff. Setup. Integração.\nColeta. Manutenção contínua.",
          "Metodologia com consultoria dentro — não só um software.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          7.4,
        );
      },
    },
    ctaScene({ dur: 6, label: "Agende uma conversa", line: "Conheça a metodologia.\nAgende uma conversa." }),
  ],
};

export const homologacaoVideos = [v1, v2, v3];
