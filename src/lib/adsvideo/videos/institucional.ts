import {
  C,
  ICONS,
  VideoDef,
  bgDark,
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
import { caption, ctaScene, hookScene, kicker, pad } from "../scenes";

/* =============================== VÍDEO 1 =============================== */
const stats = [
  { v: 3000, prefix: "+", suffix: "", label: "empresas na plataforma", icon: ICONS.building },
  { v: 50, prefix: "", suffix: "K", label: "documentos gerenciados", icon: ICONS.doc },
  { v: 20, prefix: "+", suffix: "", label: "países alcançados", icon: ICONS.globe },
  { v: 100, prefix: "+", suffix: "", label: "auditores na rede", icon: ICONS.users },
];

const v1: VideoDef = {
  id: "ins-1",
  campaign: "institucional",
  title: "Números que sustentam",
  subtitle: "Marca e reputação · prova em vez de dor",
  duration: 30,
  scenes: [
    {
      dur: 4,
      draw: (f) => {
        bgDark(f, f.k);
        const p = inAt(f.k, 0.05, 1.2);
        const n = Math.round(20 * easeOut(p));
        const cx = f.w / 2;
        const size = f.v ? 300 * f.u : 240 * f.u;
        text(f, String(n), cx, f.h * 0.34, {
          size,
          weight: 900,
          color: C.white,
          align: "center",
        });
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 0.9, 0.8);
        text(f, "anos de supply chain.", cx, f.h * 0.34 + size * 1.02, {
          size: f.v ? 68 * f.u : 56 * f.u,
          weight: 800,
          color: C.blueSoft,
          align: "center",
        });
        f.c.restore();
      },
    },
    {
      dur: 20,
      draw: (f) => {
        bgDark(f, f.k);
        const slot = 4.8;
        const idx = Math.min(stats.length - 1, Math.floor(f.k / slot));
        const local = f.k - idx * slot;
        const s = stats[idx];
        const inP = clamp01(local / 1.4);
        const outP = 1 - clamp01((local - (slot - 0.45)) / 0.45);
        const cx = f.w / 2;
        f.c.save();
        f.c.globalAlpha *= clamp01(outP);
        // ícone
        f.c.save();
        f.c.globalAlpha *= inAt(local, 0, 0.6);
        icon(f, s.icon, cx, f.h * (f.v ? 0.3 : 0.28), (f.v ? 170 : 140) * f.u, C.blueSoft, 1.4);
        f.c.restore();
        const size = f.v ? 250 * f.u : 210 * f.u;
        const shown = Math.round(s.v * easeOut(inP));
        text(
          f,
          `${s.prefix}${shown.toLocaleString("pt-BR")}${s.suffix}`,
          cx,
          f.h * (f.v ? 0.42 : 0.4),
          { size, weight: 900, color: C.white, align: "center" },
        );
        f.c.save();
        f.c.globalAlpha *= inAt(local, 0.5, 0.7);
        text(f, s.label, cx, f.h * (f.v ? 0.42 : 0.4) + size * 1.05, {
          size: f.v ? 56 * f.u : 46 * f.u,
          weight: 700,
          color: "rgba(255,255,255,.7)",
          align: "center",
          maxWidth: f.w - pad(f) * 2,
        });
        f.c.restore();
        f.c.restore();
        // indicadores de progresso
        const dotY = f.h * (f.v ? 0.8 : 0.84);
        stats.forEach((_, i) => {
          const w = 90 * f.u;
          const gap = 18 * f.u;
          const total = stats.length * w + (stats.length - 1) * gap;
          const x = cx - total / 2 + i * (w + gap);
          f.c.save();
          f.c.fillStyle = i <= idx ? C.blueSoft : "rgba(255,255,255,.22)";
          roundRect(f.c, x, dotY, w, 8 * f.u, 4 * f.u);
          f.c.fill();
          f.c.restore();
        });
      },
    },
    ctaScene({ dur: 6, label: "Agendar 30 minutos", line: "Conheça a MyTS.\nAgende 30 minutos." }),
  ],
};

/* =============================== VÍDEO 2 =============================== */
const v2: VideoDef = {
  id: "ins-2",
  campaign: "institucional",
  title: "Case C.Vale",
  subtitle: "Resultado real · autoavaliação e 2ª parte",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      dark: false,
      kicker: "Case de cliente",
      title: "C.Vale trocou\ncobrança por análise.",
      highlight: "por análise.",
    }),
    {
      dur: 6,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        for (let i = 0; i < 4; i++) {
          const fade = 1 - easeOut(clamp01((f.k - (0.8 + i * 0.7)) / 0.8));
          const p = inAt(f.k, 0.1 + i * 0.12, 0.5);
          const cols = 2;
          const bw = s * 0.34;
          const bh = bw * 0.66;
          const x = L.art.cx + ((i % cols) - 0.5) * (bw + 26 * f.u);
          const y = L.art.cy + (Math.floor(i / cols) - 0.5) * (bh + 26 * f.u);
          f.c.save();
          f.c.globalAlpha *= clamp01(p * fade);
          f.c.fillStyle = C.white;
          f.c.strokeStyle = "rgba(31,56,100,.14)";
          f.c.lineWidth = 3 * f.u;
          roundRect(f.c, x - bw / 2, y - bh / 2, bw, bh, 16 * f.u);
          f.c.fill();
          f.c.stroke();
          icon(f, ICONS.mail, x, y, bh * 0.55, C.navy, 1.5);
          f.c.restore();
        }
        caption(
          f,
          "A equipe parava\npra cobrar fornecedor.",
          "Tempo de análise virando tempo de cobrança.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          2.2,
        );
      },
    },
    {
      dur: 14,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Resultado C.Vale", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const items = [
          { v: 90, label: "de custo com\nautoavaliação", at: 0.8 },
          { v: 50, label: "de custo com auditoria\nde 2ª parte", at: 1.5 },
        ];
        const stacked = f.v;
        const gap = 26 * f.u;
        const cw = stacked ? L.mock.w : (L.mock.w - gap) / 2;
        const ch = stacked ? (L.mock.h - gap) / 2 : L.mock.h;
        items.forEach((it, i) => {
          const x = L.mock.x + (stacked ? 0 : i * (cw + gap));
          const y = L.mock.y + (stacked ? i * (ch + gap) : 0);
          const p = inAt(f.k, it.at, 0.7);
          const count = clamp01((f.k - it.at) / 2.2);
          f.c.save();
          f.c.globalAlpha *= clamp01(p);
          f.c.translate(0, (1 - p) * 50 * f.u);
          f.c.fillStyle = C.white;
          f.c.strokeStyle = "rgba(31,56,100,.12)";
          f.c.lineWidth = 3 * f.u;
          roundRect(f.c, x, y, cw, ch, 30 * f.u);
          f.c.fill();
          f.c.stroke();
          const num = Math.round(it.v * easeOut(count));
          const numSize = Math.min(cw * 0.3, ch * 0.42);
          text(f, `−${num}%`, x + cw / 2, y + ch * (stacked ? 0.18 : 0.24), {
            size: numSize,
            weight: 900,
            color: C.blue,
            align: "center",
          });
          text(f, it.label, x + cw / 2, y + ch * (stacked ? 0.18 : 0.24) + numSize * 1.06, {
            size: numSize * 0.2,
            weight: 700,
            color: C.inkSoft,
            align: "center",
            lineHeight: numSize * 0.26,
          });
          // barra decrescente
          const barY = y + ch * 0.82;
          const barW = cw * 0.76;
          const barX = x + (cw - barW) / 2;
          f.c.fillStyle = "rgba(31,56,100,.10)";
          roundRect(f.c, barX, barY, barW, 18 * f.u, 9 * f.u);
          f.c.fill();
          f.c.fillStyle = C.green;
          roundRect(
            f.c,
            barX,
            barY,
            Math.max(18 * f.u, barW * (easeOut(count) * (it.v / 100))),
            18 * f.u,
            9 * f.u,
          );
          f.c.fill();
          f.c.restore();
        });
        caption(
          f,
          "−90% no custo da autoavaliação.\n−50% na auditoria de 2ª parte.",
          "O time voltou a analisar risco em vez de perseguir documento.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          7.6,
        );
      },
    },
    ctaScene({ dur: 6, label: "Agendar uma conversa", line: "Quero esses resultados.\nAgende uma conversa." }),
  ],
};

/* =============================== VÍDEO 3 =============================== */
type Node = { x: number; y: number; gx: number; gy: number; risk: boolean };

function buildNodes(): Node[] {
  const rnd = (seed: number) => {
    const x = Math.sin(seed * 127.1) * 43758.5453;
    return x - Math.floor(x);
  };
  const nodes: Node[] = [];
  const cols = 4;
  const rows = 3;
  for (let i = 0; i < cols * rows; i++) {
    nodes.push({
      x: rnd(i + 1) * 0.9 + 0.05,
      y: rnd(i + 20) * 0.9 + 0.05,
      gx: (i % cols) / (cols - 1),
      gy: Math.floor(i / cols) / (rows - 1),
      risk: i % 3 === 0,
    });
  }
  return nodes;
}
const NODES = buildNodes();

const v3: VideoDef = {
  id: "ins-3",
  campaign: "institucional",
  title: "Modo apagar incêndio",
  subtitle: "Dor + audit-ready o ano todo",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      title: "Sua cadeia vive no\nmodo apagar incêndio?",
      highlight: "apagar incêndio?",
      extra: (f) => {
        const p = inAt(f.k, 0, 0.8, easeBack);
        const beat = 1 + 0.06 * Math.sin(f.k * 5);
        f.c.save();
        f.c.globalAlpha *= clamp01(p);
        f.c.translate(pad(f) + 60 * f.u, f.v ? f.h * 0.2 : f.h * 0.17);
        f.c.scale(beat, beat);
        icon(f, ICONS.flame, 0, 0, 120 * f.u, C.red, 1.5);
        f.c.restore();
      },
    }),
    {
      dur: 7,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const x0 = L.art.cx - s / 2;
        const y0 = L.art.cy - s / 2;
        const p = inAt(f.k, 0.2, 0.9);
        f.c.save();
        f.c.globalAlpha *= clamp01(p);
        // ligações mal conectadas
        f.c.strokeStyle = "rgba(31,56,100,.20)";
        f.c.lineWidth = 3 * f.u;
        NODES.forEach((n, i) => {
          const m = NODES[(i * 5 + 3) % NODES.length];
          f.c.beginPath();
          f.c.moveTo(x0 + n.x * s, y0 + n.y * s);
          f.c.lineTo(x0 + m.x * s, y0 + m.y * s);
          f.c.stroke();
        });
        NODES.forEach((n, i) => {
          const np = inAt(f.k, 0.3 + i * 0.05, 0.5);
          const r = (n.risk ? 20 : 14) * f.u * np;
          f.c.fillStyle = n.risk ? C.red : "rgba(31,56,100,.35)";
          f.c.beginPath();
          f.c.arc(x0 + n.x * s, y0 + n.y * s, r, 0, Math.PI * 2);
          f.c.fill();
          if (n.risk) {
            f.c.globalAlpha *= 0.35 + 0.3 * Math.sin(f.k * 4 + i);
            f.c.beginPath();
            f.c.arc(x0 + n.x * s, y0 + n.y * s, r * 2.2, 0, Math.PI * 2);
            f.c.fill();
            f.c.globalAlpha = clamp01(p);
          }
        });
        icon(f, ICONS.eyeOff, L.art.cx, y0 - s * 0.06, s * 0.2, "rgba(31,56,100,.5)", 1.6);
        f.c.restore();
        caption(
          f,
          "Sem visibilidade, o problema\nsempre chega tarde.",
          "Risco espalhado, sem dono e sem alerta.",
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
        kicker(f, "Dashboard MyTS", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const s = Math.min(L.mock.w, L.mock.h);
        const x0 = L.mock.x + (L.mock.w - s) / 2;
        const y0 = L.mock.y + (L.mock.h - s) / 2;
        const org = easeOut(clamp01((f.k - 0.6) / 2.2));
        const pos = NODES.map((n) => ({
          x: x0 + (n.x + (n.gx * 0.86 + 0.07 - n.x) * org) * s,
          y: y0 + (n.y + (n.gy * 0.86 + 0.07 - n.y) * org) * s,
          risk: n.risk,
        }));
        f.c.save();
        f.c.strokeStyle = `rgba(46,91,170,${0.18 + 0.22 * org})`;
        f.c.lineWidth = 3 * f.u;
        pos.forEach((n, i) => {
          const m = pos[(i * 5 + 3) % pos.length];
          const gridNeighbour = pos[i + 1];
          const target = org > 0.5 && gridNeighbour && (i + 1) % 4 !== 0 ? gridNeighbour : m;
          f.c.beginPath();
          f.c.moveTo(n.x, n.y);
          f.c.lineTo(target.x, target.y);
          f.c.stroke();
        });
        pos.forEach((n, i) => {
          const flipAt = 3 + i * 0.28;
          const green = !n.risk || f.k >= flipAt;
          const bump = n.risk && f.k >= flipAt ? 1 + Math.max(0, 0.6 * (1 - easeOut((f.k - flipAt) / 0.5))) : 1;
          const r = (n.risk ? 20 : 14) * f.u * bump;
          f.c.fillStyle = green ? C.green : C.red;
          f.c.beginPath();
          f.c.arc(n.x, n.y, r, 0, Math.PI * 2);
          f.c.fill();
          if (green && n.risk && f.k - flipAt < 0.9) {
            f.c.save();
            f.c.globalAlpha *= 1 - (f.k - flipAt) / 0.9;
            f.c.strokeStyle = C.green;
            f.c.lineWidth = 4 * f.u;
            f.c.beginPath();
            f.c.arc(n.x, n.y, r + (f.k - flipAt) * 90 * f.u, 0, Math.PI * 2);
            f.c.stroke();
            f.c.restore();
          }
        });
        f.c.restore();
        caption(
          f,
          "Dashboard em tempo real.\nAudit-ready o ano todo.",
          "Risco visível antes de virar recall, multa ou parada de linha.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          8.2,
        );
      },
    },
    ctaScene({
      dur: 6,
      label: "Falar com especialista",
      line: "Fale com um especialista.\nSem apresentação genérica.",
    }),
  ],
};

export const institucionalVideos = [v1, v2, v3];
