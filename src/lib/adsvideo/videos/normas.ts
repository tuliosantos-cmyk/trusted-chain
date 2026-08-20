import {
  C,
  Frame,
  ICONS,
  font,
  VideoDef,
  bgLight,
  logoMark,
  clamp01,
  easeBack,
  easeOut,
  icon,
  inAt,
  roundRect,
  text,
} from "../engine";
import { artLayout, splitLayout } from "../layout";
import { caption, ctaScene, hookScene, kicker, mockPanel, pad } from "../scenes";

/* =============================== VÍDEO 1 =============================== */
const v1: VideoDef = {
  id: "nor-1",
  campaign: "normas",
  title: "A V7 já chegou",
  subtitle: "Urgência · FSSC 22000 versão 7",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      kicker: "Atualização de norma",
      title: "FSSC 22000 V7.\nJá está em vigor.",
      highlight: "Já está em vigor.",
    }),
    {
      dur: 7,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const p = inAt(f.k, 0.1, 0.7);
        f.c.save();
        f.c.globalAlpha *= clamp01(p);
        icon(f, ICONS.doc, L.art.cx, L.art.cy, s * 0.62, C.navy, 1.3);
        f.c.restore();

        // selo antigo riscado
        const oldX = L.art.cx - s * 0.2;
        const oldY = L.art.cy + s * 0.22;
        const strike = easeOut(clamp01((f.k - 1.2) / 0.6));
        const oldFade = 1 - easeOut(clamp01((f.k - 2.1) / 0.7));
        f.c.save();
        f.c.globalAlpha *= clamp01(inAt(f.k, 0.5, 0.5) * oldFade);
        icon(f, ICONS.seal, oldX, oldY, s * 0.26, "rgba(31,56,100,.45)", 1.6);
        text(f, "V6", oldX, oldY + s * 0.16, {
          size: 30 * f.u,
          weight: 800,
          color: "rgba(31,56,100,.45)",
          align: "center",
        });
        if (strike > 0) {
          f.c.strokeStyle = C.red;
          f.c.lineWidth = 8 * f.u;
          f.c.lineCap = "round";
          f.c.beginPath();
          f.c.moveTo(oldX - s * 0.17, oldY + s * 0.13);
          f.c.lineTo(oldX - s * 0.17 + s * 0.34 * strike, oldY - s * 0.15);
          f.c.stroke();
        }
        f.c.restore();

        // selo novo entrando
        const np = inAt(f.k, 2.2, 0.7, easeBack);
        if (np > 0) {
          const nx = L.art.cx + s * 0.16;
          const ny = L.art.cy + s * 0.18;
          f.c.save();
          f.c.globalAlpha *= clamp01(np);
          f.c.translate(nx, ny + (1 - np) * -60 * f.u);
          icon(f, ICONS.seal, 0, 0, s * 0.34, C.green, 1.8);
          text(f, "V7", 0, s * 0.2, {
            size: 36 * f.u,
            weight: 900,
            color: C.greenInk,
            align: "center",
          });
          f.c.restore();
        }

        caption(
          f,
          "Sua operação ainda segue\no modelo antigo?",
          "Novos requisitos, novo escopo, nova evidência exigida.",
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
        kicker(f, "Diagnóstico MyTS", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const m = mockPanel(
          f,
          L.mock.x,
          L.mock.y,
          L.mock.w,
          L.mock.h,
          "Checklist de auditoria · FSSC 22000 V7",
          inAt(f.k, 0.1, 1),
        );
        const items = [
          "Escopo e cláusulas adicionais",
          "Cultura de segurança de alimentos",
          "Controle de qualidade e perdas",
          "Gestão de alérgenos",
          "Requisitos de comunicação",
        ];
        const barH = 26 * f.u;
        const listH = m.bh - barH - 46 * f.u;
        const ih = (listH - 16 * f.u * (items.length - 1)) / items.length;
        items.forEach((it, i) => {
          const at = 1.2 + i * 1.15;
          const on = f.k >= at;
          const y = m.by + i * (ih + 16 * f.u);
          const p = inAt(f.k, 0.6 + i * 0.15, 0.6);
          f.c.save();
          f.c.globalAlpha *= clamp01(p);
          f.c.fillStyle = on ? "rgba(34,160,107,.08)" : C.white;
          roundRect(f.c, m.bx, y, m.bw, ih, 20 * f.u);
          f.c.fill();
          f.c.strokeStyle = on ? "rgba(34,160,107,.35)" : "rgba(31,56,100,.10)";
          f.c.lineWidth = 2 * f.u;
          roundRect(f.c, m.bx, y, m.bw, ih, 20 * f.u);
          f.c.stroke();
          const bx = m.bx + 26 * f.u + ih * 0.3;
          const bump = on ? 1 + Math.max(0, 0.25 * (1 - easeOut((f.k - at) / 0.4))) : 1;
          f.c.save();
          f.c.translate(bx, y + ih / 2);
          f.c.scale(bump, bump);
          f.c.fillStyle = on ? C.green : "rgba(31,56,100,.06)";
          roundRect(f.c, -ih * 0.28, -ih * 0.28, ih * 0.56, ih * 0.56, ih * 0.18);
          f.c.fill();
          if (on) icon(f, ICONS.check, 0, 0, ih * 0.36, C.white, 2.8);
          f.c.restore();
          text(f, it, bx + ih * 0.5, y + ih / 2 - 16 * f.u, {
            size: 29 * f.u,
            weight: 700,
            color: on ? C.navy : "rgba(31,56,100,.55)",
          });
          f.c.restore();
        });
        // barra de progresso
        const prog = clamp01((f.k - 1.2) / 5.2);
        const by = m.by + listH + 26 * f.u;
        f.c.save();
        f.c.fillStyle = "rgba(31,56,100,.10)";
        roundRect(f.c, m.bx, by, m.bw, barH, barH / 2);
        f.c.fill();
        const g = f.c.createLinearGradient(m.bx, 0, m.bx + m.bw, 0);
        g.addColorStop(0, C.blue);
        g.addColorStop(1, C.green);
        f.c.fillStyle = g;
        roundRect(f.c, m.bx, by, Math.max(barH, m.bw * prog), barH, barH / 2);
        f.c.fill();
        text(f, `${Math.round(prog * 100)}%`, m.bx + m.bw, by - 46 * f.u, {
          size: 30 * f.u,
          weight: 800,
          color: C.navy,
          align: "right",
        });
        f.c.restore();

        caption(
          f,
          "Diagnóstico real.\nPlano concreto pra sua norma.",
          "Do gap à evidência: o que muda, quem faz e até quando.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          8.4,
        );
      },
    },
    ctaScene({ dur: 6, label: "Agendar sessão", line: "Agende sua\nSessão Estratégica." }),
  ],
};

/* =============================== VÍDEO 2 =============================== */
const NORM_TAGS = [
  { n: "FSSC 22000", i: 0 },
  { n: "BRCGS", i: 1 },
  { n: "IFS", i: 2 },
  { n: "ISO 9001", i: 3 },
  { n: "APPCC", i: 4 },
  { n: "ISO 22000", i: 5 },
];
const NORM_ICONS = [ICONS.shield, ICONS.seal, ICONS.clipboard, ICONS.chart, ICONS.radar, ICONS.doc];

/** posições "bagunçadas" determinísticas dentro de um quadrado unitário */
const SCATTER = NORM_TAGS.map((_, i) => {
  const r = (k: number) => {
    const x = Math.sin((i + 1) * k) * 43758.5453;
    return x - Math.floor(x);
  };
  return { x: 0.16 + r(12.9898) * 0.68, y: 0.16 + r(78.233) * 0.68, rot: (r(37.71) - 0.5) * 0.5 };
});

function normChip(
  f: Frame,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  d: string,
  rot: number,
  p: number,
  active = false,
) {
  f.c.save();
  f.c.globalAlpha *= clamp01(p);
  f.c.translate(x, y);
  f.c.rotate(rot);
  f.c.fillStyle = C.white;
  f.c.shadowColor = "rgba(10,25,55,.12)";
  f.c.shadowBlur = 30 * f.u;
  f.c.shadowOffsetY = 10 * f.u;
  roundRect(f.c, -w / 2, -h / 2, w, h, h * 0.28);
  f.c.fill();
  f.c.shadowColor = "transparent";
  f.c.strokeStyle = active ? "rgba(46,91,170,.55)" : "rgba(31,56,100,.12)";
  f.c.lineWidth = (active ? 4 : 3) * f.u;
  roundRect(f.c, -w / 2, -h / 2, w, h, h * 0.28);
  f.c.stroke();
  icon(f, d, 0, -h * 0.14, Math.min(w, h) * 0.36, C.blue, 1.6);
  text(f, label, 0, h * 0.2, {
    size: Math.min(w * 0.17, 30 * f.u),
    weight: 800,
    color: C.navy,
    align: "center",
  });
  f.c.restore();
}

const v2: VideoDef = {
  id: "nor-2",
  campaign: "normas",
  title: "A MyTS organiza tudo",
  subtitle: "Todas as normas num lugar só",
  duration: 30,
  scenes: [
    {
      dur: 4,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const x0 = L.art.cx - s / 2;
        const y0 = L.art.cy - s / 2;
        const cw = s * 0.34;
        const ch = cw * 0.72;
        NORM_TAGS.forEach((t, i) => {
          const p = inAt(f.k, 0.1 + i * 0.14, 0.6, easeBack);
          if (p <= 0) return;
          const wob = Math.sin(f.k * 1.6 + i) * 0.03;
          normChip(
            f,
            x0 + SCATTER[i].x * s,
            y0 + SCATTER[i].y * s,
            cw,
            ch,
            t.n,
            NORM_ICONS[i],
            SCATTER[i].rot + wob,
            p,
          );
        });
        const p = inAt(f.k, 1.4, 0.8);
        f.c.save();
        f.c.globalAlpha *= p;
        text(
          f,
          "Uma norma.\nUm processo diferente.\nToda vez.",
          f.v ? pad(f) : L.cap.x,
          (f.v ? f.h * 0.68 : L.cap.y) + (1 - p) * 40 * f.u,
          {
            size: f.v ? 78 * f.u : 66 * f.u,
            weight: 900,
            color: C.navy,
            maxWidth: f.v ? f.w - pad(f) * 2 : L.cap.w,
            lineHeight: (f.v ? 78 : 66) * f.u * 1.14,
          },
        );
        f.c.restore();
      },
    },
    {
      dur: 6,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const x0 = L.art.cx - s / 2;
        const y0 = L.art.cy - s / 2;
        const cw = s * 0.34;
        const ch = cw * 0.72;
        const collapse = easeOut(clamp01(f.k / 2.4));
        NORM_TAGS.forEach((t, i) => {
          const jit = 0.006 * collapse * s;
          const jx = Math.sin(f.k * 22 + i * 2.1) * jit;
          const jy = Math.cos(f.k * 19 + i * 1.7) * jit;
          const cx = x0 + (SCATTER[i].x + (0.5 - SCATTER[i].x) * collapse * 0.7) * s + jx;
          const cy = y0 + (SCATTER[i].y + (0.5 - SCATTER[i].y) * collapse * 0.7) * s + jy;
          normChip(f, cx, cy, cw, ch, t.n, NORM_ICONS[i], SCATTER[i].rot, 1);
        });
        caption(
          f,
          "Cada norma isolada.\nNinguém vê o todo.",
          "Escopos duplicados, evidências espalhadas, esforço repetido.",
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
        kicker(f, "Tudo num lugar só", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const s = Math.min(L.mock.w, L.mock.h);
        const cx = L.mock.x + L.mock.w / 2;
        const cy = L.mock.y + L.mock.h / 2;
        const org = easeOut(clamp01((f.k - 0.4) / 1.8));
        const cols = 3;
        const cw = s * 0.29;
        const ch = cw * 0.72;
        const rx = s * 0.36;
        const ry = s * 0.34;
        const pts = NORM_TAGS.map((_, i) => {
          const gx = cx + ((i % cols) - 1) * rx;
          const gy = cy + (Math.floor(i / cols) - 0.5) * (ry * 1.55);
          const sx = L.mock.x + SCATTER[i].x * L.mock.w;
          const sy = L.mock.y + SCATTER[i].y * L.mock.h;
          return { x: sx + (gx - sx) * org, y: sy + (gy - sy) * org };
        });
        // linhas conectando ao centro, acendendo uma a uma
        pts.forEach((pt, i) => {
          const lp = clamp01((f.k - (2.2 + i * 0.45)) / 0.6);
          if (lp <= 0) return;
          f.c.save();
          f.c.globalAlpha *= lp;
          f.c.strokeStyle = "rgba(46,91,170,.45)";
          f.c.lineWidth = 3.5 * f.u;
          f.c.beginPath();
          f.c.moveTo(cx, cy);
          f.c.lineTo(cx + (pt.x - cx) * lp, cy + (pt.y - cy) * lp);
          f.c.stroke();
          f.c.restore();
        });
        NORM_TAGS.forEach((t, i) => {
          const on = f.k >= 2.2 + i * 0.45;
          normChip(
            f,
            pts[i].x,
            pts[i].y,
            cw,
            ch,
            t.n,
            NORM_ICONS[i],
            SCATTER[i].rot * (1 - org),
            1,
            on,
          );
        });
        // marca MyTS pulsando no centro
        const mp = inAt(f.k, 1.6, 0.7, easeBack);
        if (mp > 0) {
          const beat = 1 + 0.05 * Math.sin(f.k * 3.2);
          const d = s * 0.145 * beat;
          f.c.save();
          f.c.globalAlpha *= clamp01(mp);
          f.c.fillStyle = C.navy;
          f.c.shadowColor = "rgba(46,91,170,.4)";
          f.c.shadowBlur = 60 * f.u;
          f.c.beginPath();
          f.c.arc(cx, cy, d, 0, Math.PI * 2);
          f.c.fill();
          f.c.shadowColor = "transparent";
          logoMark(f, cx, cy, d * 1.0, C.white);
          f.c.restore();
        }
        caption(
          f,
          "A MyTS organiza todas\nas suas normas, num lugar só.",
          "Um escopo, uma base de evidências, uma visão da operação inteira.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          7.4,
        );
      },
    },
    ctaScene({
      dur: 6,
      label: "Agendar Sessão Estratégica",
      line: "Agende sua\nSessão Estratégica.",
    }),
  ],
};

/* =============================== VÍDEO 3 =============================== */
const v3: VideoDef = {
  id: "nor-3",
  campaign: "normas",
  title: "Antecipe-se",
  subtitle: "ISO 9001:2026 · diagnóstico antes da transição",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      kicker: "Transição de norma",
      title: "A nova ISO 9001\nestá chegando.",
      highlight: "está chegando.",
      extra: (f) => {
        // dígitos difusos ao fundo
        f.c.save();
        f.c.globalAlpha *= 0.12;
        f.c.filter = "blur(6px)";
        for (let i = 0; i < 14; i++) {
          const seed = (i * 37) % 100;
          const x = ((seed / 100) * f.w + f.k * 90 * f.u) % f.w;
          const y = (i / 14) * f.h + Math.sin(f.k + i) * 20 * f.u;
          text(f, String(Math.floor((f.k * 7 + i * 13) % 100)).padStart(2, "0"), x, y, {
            size: 90 * f.u,
            weight: 900,
            color: C.blueSoft,
          });
        }
        f.c.filter = "none";
        f.c.restore();
      },
    }),
    {
      dur: 6,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const p = inAt(f.k, 0.1, 0.7);
        f.c.save();
        f.c.globalAlpha *= clamp01(p);
        icon(f, ICONS.doc, L.art.cx, L.art.cy, s * 0.6, C.navy, 1.3);
        const beat = 1 + 0.08 * Math.sin(f.k * 4);
        f.c.translate(L.art.cx + s * 0.16, L.art.cy + s * 0.2);
        f.c.scale(beat, beat);
        icon(f, ICONS.question, 0, 0, s * 0.3, C.blue, 1.8);
        f.c.restore();
        caption(
          f,
          "Sua documentação\njá está pronta pra ela?",
          "Requisitos novos exigem evidência nova.",
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
        kicker(f, "Diagnóstico da operação", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const cx = L.mock.x + L.mock.w / 2;
        const cy = L.mock.y + L.mock.h * 0.46;
        const r = Math.min(L.mock.w, L.mock.h) * 0.34;
        const prog = easeOut(clamp01((f.k - 0.8) / 5));
        f.c.save();
        f.c.lineCap = "round";
        f.c.strokeStyle = "rgba(31,56,100,.12)";
        f.c.lineWidth = r * 0.22;
        f.c.beginPath();
        f.c.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25);
        f.c.stroke();
        const g = f.c.createLinearGradient(cx - r, cy, cx + r, cy);
        g.addColorStop(0, C.blue);
        g.addColorStop(1, C.green);
        f.c.strokeStyle = g;
        f.c.beginPath();
        f.c.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * prog);
        f.c.stroke();
        text(f, `${Math.round(prog * 100)}%`, cx, cy - r * 0.42, {
          size: r * 0.46,
          weight: 900,
          color: C.navy,
          align: "center",
        });
        text(f, "conformidade mapeada", cx, cy + r * 0.14, {
          size: r * 0.115,
          weight: 700,
          color: "rgba(31,56,100,.55)",
          align: "center",
        });
        f.c.restore();
        // selo "pronto"
        const sp = inAt(f.k, 6.1, 0.7, easeBack);
        if (sp > 0) {
          f.c.save();
          f.c.globalAlpha *= clamp01(sp);
          const sy = cy + r * 1.42;
          const label = "Pronto pra transição";
          const fs = r * 0.17;
          f.c.font = font(fs, 800);
          const tw = f.c.measureText(label).width;
          const bh = fs * 2.1;
          const bw = tw + bh * 2.1;
          f.c.fillStyle = "rgba(34,160,107,.14)";
          roundRect(f.c, cx - bw / 2, sy - bh / 2, bw, bh, bh / 2);
          f.c.fill();
          icon(f, ICONS.check, cx - bw / 2 + bh * 0.62, sy, bh * 0.5, C.greenInk, 2.8);
          text(f, label, cx + bh * 0.55, sy - fs * 0.5, {
            size: fs,
            weight: 800,
            color: C.greenInk,
            align: "center",
          });

          f.c.restore();
        }
        caption(
          f,
          "Diagnóstico da sua operação,\nantes da transição.",
          "Você entra na nova versão sem correria e sem não-conformidade.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          8,
        );
      },
    },
    ctaScene({ dur: 6, label: "Agendar sessão", line: "Agende sua\nSessão Estratégica." }),
  ],
};

export const normasVideos = [v1, v2, v3];
