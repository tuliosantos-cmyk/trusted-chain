import {
  C,
  Frame,
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

/* ====================== MÓDULO 1 — MEUS FORNECEDORES ====================== */

const m1: VideoDef = {
  id: "mod-1",
  campaign: "modulos",
  title: "Meus Fornecedores",
  subtitle: "Módulo · convite, envio e validação",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      title: "Cada fornecedor,\numa cobrança manual.",
      highlight: "cobrança manual.",
    }),
    {
      dur: 5,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const icons = [ICONS.chat, ICONS.mail, ICONS.phone, ICONS.chat, ICONS.mail, ICONS.phone];
        icons.forEach((d, i) => {
          const p = inAt(f.k, 0.15 + i * 0.3, 0.5, easeBack);
          if (p <= 0) return;
          const bw = s * 0.3;
          const bh = bw * 0.72;
          const lean = (i % 2 === 0 ? -1 : 1) * (0.05 + i * 0.02);
          const x = L.art.cx + (i % 2 === 0 ? -1 : 1) * s * 0.06;
          const y = L.art.cy + s * 0.3 - i * bh * 0.46;
          f.c.save();
          f.c.globalAlpha *= clamp01(p);
          f.c.translate(x, y + (1 - p) * -40 * f.u);
          f.c.rotate(lean);
          f.c.fillStyle = C.white;
          f.c.strokeStyle = "rgba(31,56,100,.16)";
          f.c.lineWidth = 3 * f.u;
          roundRect(f.c, -bw / 2, -bh / 2, bw, bh, 20 * f.u);
          f.c.fill();
          f.c.stroke();
          icon(f, d, 0, 0, bh * 0.5, C.navy, 1.6);
          f.c.restore();
        });
        caption(
          f,
          "Um por um. Todo mês.\nDe novo.",
          "Cobrança manual não escala — e some no histórico.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          2.1,
        );
      },
    },
    {
      dur: 12,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Meus Fornecedores", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const m = mockPanel(
          f,
          L.mock.x,
          L.mock.y,
          L.mock.w,
          L.mock.h,
          "myt-s.com · fornecedores",
          inAt(f.k, 0.1, 0.7),
        );

        // --- beat 1: convite desliza até o cadastro e campos se autopreenchem
        const inv = clamp01((f.k - 0.6) / 1.1);
        const cardX = m.bx + m.bw * 0.08;
        const cardW = m.bw * 0.84;
        const cardY = m.by + m.bh * 0.05;
        const cardH = m.bh * 0.42;
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 0.5, 0.6);
        f.c.fillStyle = C.white;
        f.c.strokeStyle = "rgba(31,56,100,.12)";
        f.c.lineWidth = 3 * f.u;
        roundRect(f.c, cardX, cardY, cardW, cardH, 26 * f.u);
        f.c.fill();
        f.c.stroke();
        // campos
        const fields = 4;
        const fh = (cardH - 46 * f.u) / fields;
        for (let i = 0; i < fields; i++) {
          const y = cardY + 24 * f.u + i * fh;
          const w = cardW - 48 * f.u;
          f.c.fillStyle = "rgba(31,56,100,.07)";
          roundRect(f.c, cardX + 24 * f.u, y, w, fh * 0.62, fh * 0.31);
          f.c.fill();
          const fill = clamp01((f.k - (1.5 + i * 0.35)) / 0.5);
          if (fill > 0) {
            f.c.fillStyle = "rgba(46,91,170,.28)";
            roundRect(
              f.c,
              cardX + 24 * f.u,
              y,
              w * (0.35 + 0.5 * ((i * 7) % 5) / 10) * fill,
              fh * 0.62,
              fh * 0.31,
            );
            f.c.fill();
          }
        }
        f.c.restore();
        // envelope voando até o card
        if (inv < 1) {
          const ex = m.bx + m.bw * (0.05 + 0.4 * easeOut(inv));
          const ey = m.by + m.bh * (0.02 + 0.1 * easeOut(inv));
          f.c.save();
          f.c.globalAlpha *= 1 - inv * 0.2;
          icon(f, ICONS.envelope, ex, ey, m.bh * 0.16, C.blue, 1.8);
          f.c.restore();
        }

        // --- beat 2: documento arrastado até o slot de upload
        const slotY = cardY + cardH + m.bh * 0.05;
        const slotH = m.bh * 0.15;
        const drag = clamp01((f.k - 4.2) / 1.1);
        const dropped = f.k >= 5.3;
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 3.9, 0.5);
        f.c.setLineDash([14 * f.u, 12 * f.u]);
        f.c.strokeStyle = dropped ? C.green : "rgba(46,91,170,.5)";
        f.c.lineWidth = 3.5 * f.u;
        roundRect(f.c, cardX, slotY, cardW, slotH, 22 * f.u);
        f.c.stroke();
        f.c.setLineDash([]);
        if (dropped) {
          const bump = 1 + Math.max(0, 0.12 * (1 - easeOut((f.k - 5.3) / 0.5)));
          f.c.save();
          f.c.translate(cardX + cardW / 2, slotY + slotH / 2);
          f.c.scale(bump, bump);
          f.c.translate(-(cardX + cardW / 2), -(slotY + slotH / 2));
          f.c.fillStyle = "rgba(34,160,107,.12)";
          roundRect(f.c, cardX, slotY, cardW, slotH, 22 * f.u);
          f.c.fill();
          icon(f, ICONS.check, cardX + cardW / 2, slotY + slotH / 2, slotH * 0.5, C.greenInk, 2.6);
          f.c.restore();
        } else {
          const dx = cardX + cardW * (0.12 + 0.38 * easeOut(drag));
          const dy = slotY - slotH * (0.9 - 0.9 * easeOut(drag));
          icon(f, ICONS.doc, dx, dy, slotH * 0.62, C.navy, 1.7);
        }
        f.c.restore();

        // --- beat 3: badge amarelo -> verde com onda
        const flip = 7.4;
        const bp = inAt(f.k, 6.4, 0.5);
        if (bp > 0) {
          const rowY = slotY + slotH + m.bh * 0.05;
          const rowH = Math.min(m.bh * 0.2, m.by + m.bh - rowY - 8 * f.u);
          supplierRow(f, cardX, rowY, cardW, rowH, {
            name: "Laticínios Vale",
            sub: "Cadastro enviado",
            iconD: ICONS.building,
            fromLabel: "Em análise",
            fromBg: "rgba(240,180,40,.18)",
            fromFg: "#8A6300",
            flipAt: flip,
            p: bp,
          });
        }

        caption(
          f,
          "O fornecedor acessa,\nenvia, acompanha.",
          "Convite, autocadastro e upload direto na plataforma.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          6.6,
        );
      },
    },
    {
      dur: 4,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Visão geral", L.p, f.h * 0.08, C.blue, inAt(f.k, 0, 0.5));
        const rows = [
          { n: "Laticínios Vale", s: "Documentos completos", d: ICONS.building },
          { n: "Embalagens Prisma", s: "Laudo recebido", d: ICONS.box },
          { n: "Aromas Sul", s: "Autoavaliação concluída", d: ICONS.flask },
          { n: "Transportes Duo", s: "Certificados válidos", d: ICONS.globe },
        ];
        const gap = 16 * f.u;
        const rh = (L.mock.h - gap * (rows.length - 1)) / rows.length;
        rows.forEach((r, i) => {
          supplierRow(f, L.mock.x, L.mock.y + i * (rh + gap), L.mock.w, rh, {
            name: r.n,
            sub: r.s,
            iconD: r.d,
            fromLabel: "Pendente",
            fromBg: "rgba(240,180,40,.18)",
            fromFg: "#8A6300",
            flipAt: 0.6 + i * 0.28,
            p: inAt(f.k, i * 0.12, 0.5),
          });
        });
        caption(f, "Sua equipe só valida.", undefined, L.cap.x, L.cap.y, L.cap.w, 1.4);
      },
    },
    ctaScene({
      dur: 5,
      label: "Conhecer o módulo",
      line: "Conheça o módulo\nMeus Fornecedores.",
    }),
  ],
};

/* ====================== MÓDULO 2 — MEUS DOCUMENTOS ====================== */

const m2: VideoDef = {
  id: "mod-2",
  campaign: "modulos",
  title: "Meus Documentos",
  subtitle: "Módulo · histórico, versão e vencimento",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      dark: false,
      kicker: "Meus Documentos",
      title: "Documento vencido é sempre\ndescoberto tarde demais.",
      highlight: "tarde demais.",
    }),
    {
      dur: 5,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        [ICONS.folder, ICONS.cloud].forEach((d, k) => {
          const cx = L.art.cx + (k === 0 ? -1 : 1) * s * 0.24;
          const cy = L.art.cy + s * 0.1;
          const p = inAt(f.k, 0.1 + k * 0.25, 0.6, easeBack);
          f.c.save();
          f.c.globalAlpha *= clamp01(p);
          icon(f, d, cx, cy, s * 0.34, C.navy, 1.5);
          f.c.restore();
          for (let i = 0; i < 5; i++) {
            const t = clamp01((f.k - (0.8 + k * 0.2 + i * 0.28)) / 1.6);
            if (t <= 0) continue;
            f.c.save();
            f.c.globalAlpha *= (1 - t) * 0.85;
            const px = cx + (i - 2) * s * 0.05;
            const py = cy - s * 0.16 + t * s * 0.4;
            f.c.translate(px, py);
            f.c.rotate((i - 2) * 0.2 + t * 0.5);
            f.c.fillStyle = C.white;
            f.c.strokeStyle = "rgba(31,56,100,.2)";
            f.c.lineWidth = 2.5 * f.u;
            roundRect(f.c, -s * 0.045, -s * 0.06, s * 0.09, s * 0.12, 6 * f.u);
            f.c.fill();
            f.c.stroke();
            f.c.restore();
          }
        });
        caption(
          f,
          "Numa pasta. Num e-mail.\nNuma gaveta.",
          "Sem dono, sem histórico e sem alerta de validade.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          2.2,
        );
      },
    },
    {
      dur: 15,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Linha do tempo do documento", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const m = mockPanel(
          f,
          L.mock.x,
          L.mock.y,
          L.mock.w,
          L.mock.h,
          "myt-s.com · documentos",
          inAt(f.k, 0.1, 0.7),
        );
        const lineY = m.by + m.bh * 0.28;
        const x1 = m.bx + m.bw * 0.06;
        const x2 = m.bx + m.bw * 0.94;
        const grow = easeOut(clamp01((f.k - 0.5) / 1.8));
        f.c.save();
        f.c.strokeStyle = "rgba(46,91,170,.35)";
        f.c.lineWidth = 5 * f.u;
        f.c.lineCap = "round";
        f.c.beginPath();
        f.c.moveTo(x1, lineY);
        f.c.lineTo(x1 + (x2 - x1) * grow, lineY);
        f.c.stroke();
        f.c.restore();

        const marks = [0.12, 0.36, 0.6, 0.86];
        marks.forEach((mk, i) => {
          const p = clamp01((f.k - (1.2 + i * 0.3)) / 0.4);
          if (p <= 0) return;
          const x = x1 + (x2 - x1) * mk;
          const last = i === marks.length - 1;
          const alert = last && f.k >= 8.6;
          f.c.save();
          f.c.globalAlpha *= p;
          f.c.fillStyle = alert ? "#E9A400" : C.blue;
          f.c.beginPath();
          f.c.arc(x, lineY, 13 * f.u * p, 0, Math.PI * 2);
          f.c.fill();
          icon(f, ICONS.doc, x, lineY - m.bh * 0.13, m.bh * 0.11, C.navy, 1.6);
          if (alert) {
            // anel de contagem regressiva + sino
            const rp = clamp01((f.k - 8.6) / 2.4);
            f.c.strokeStyle = "#E9A400";
            f.c.lineWidth = 6 * f.u;
            f.c.beginPath();
            f.c.arc(x, lineY, 34 * f.u, -Math.PI / 2, -Math.PI / 2 + rp * Math.PI * 2);
            f.c.stroke();
            const beat = 1 + 0.12 * Math.sin(f.k * 7);
            f.c.save();
            f.c.translate(x, lineY + m.bh * 0.16);
            f.c.scale(beat, beat);
            icon(f, ICONS.bell, 0, 0, m.bh * 0.12, "#B87A00", 1.9);
            f.c.restore();
          }
          f.c.restore();
        });

        // versionamento: pilha v1 -> v2 -> v3
        const vShow = inAt(f.k, 4.6, 0.6);
        if (vShow > 0) {
          const vy = m.by + m.bh * 0.62;
          const vw = m.bw * 0.72;
          const vh = m.bh * 0.28;
          const vx = m.bx + m.bw * 0.06;
          const ver = Math.min(3, 1 + Math.floor(clamp01((f.k - 5.2) / 1.6) * 3));
          for (let i = 2; i >= 0; i--) {
            const back = i;
            f.c.save();
            f.c.globalAlpha *= clamp01(vShow) * (i === 0 ? 1 : 0.4 - i * 0.1);
            f.c.translate(vx + back * 16 * f.u, vy - back * 14 * f.u);
            f.c.fillStyle = C.white;
            f.c.strokeStyle = "rgba(31,56,100,.16)";
            f.c.lineWidth = 3 * f.u;
            roundRect(f.c, 0, 0, vw, vh, 22 * f.u);
            f.c.fill();
            f.c.stroke();
            f.c.restore();
          }
          f.c.save();
          f.c.globalAlpha *= clamp01(vShow);
          icon(f, ICONS.doc, vx + vh * 0.5, vy + vh / 2, vh * 0.44, C.blue, 1.7);
          text(f, "Laudo microbiológico", vx + vh * 0.95, vy + vh * 0.26, {
            size: Math.min(32 * f.u, vh * 0.3),
            weight: 800,
            color: C.navy,
            maxWidth: vw - vh * 1.1 - 24 * f.u,
          });
          text(f, `versão v${ver}`, vx + vh * 0.95, vy + vh * 0.58, {
            size: Math.min(28 * f.u, vh * 0.26),
            weight: 700,
            color: C.blue,
          });
          f.c.restore();
        }

        caption(
          f,
          f.k < 8.4
            ? "Histórico completo.\nNenhuma versão perdida."
            : "Vencimento avisado antes\nde virar problema.",
          f.k < 8.4
            ? "Cada envio guarda data, autor e versão anterior."
            : "Alerta amarelo bem antes do vermelho.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          f.k < 8.4 ? 5.2 : 8.6,
        );
      },
    },
    ctaScene({
      dur: 6,
      label: "Conhecer o módulo",
      line: "Conheça o módulo\nMeus Documentos.",
    }),
  ],
};

/* ====================== MÓDULO 3 — MEUS PROCESSOS ====================== */

function gauge(f: Frame, cx: number, cy: number, r: number, p: number) {
  f.c.save();
  f.c.lineCap = "round";
  f.c.strokeStyle = "rgba(31,56,100,.12)";
  f.c.lineWidth = r * 0.22;
  f.c.beginPath();
  f.c.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25);
  f.c.stroke();
  f.c.strokeStyle = p >= 0.99 ? C.green : C.blue;
  f.c.beginPath();
  f.c.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 0.75 + p * Math.PI * 1.5);
  f.c.stroke();
  text(f, `${Math.round(p * 100)}%`, cx, cy - r * 0.3, {
    size: r * 0.5,
    weight: 900,
    color: C.navy,
    align: "center",
  });
  f.c.restore();
}

const m3: VideoDef = {
  id: "mod-3",
  campaign: "modulos",
  title: "Meus Processos",
  subtitle: "Módulo · checklist e autoavaliação",
  duration: 30,
  scenes: [
    hookScene({
      dur: 4,
      title: "Checklist de auditoria,\nmontado do zero de novo?",
      highlight: "do zero de novo?",
    }),
    {
      dur: 5,
      draw: (f) => {
        bgLight(f);
        const L = artLayout(f);
        const s = L.art.size;
        const w = s * 0.66;
        const h = s * 0.5;
        const x = L.art.cx - w / 2;
        const y = L.art.cy - h / 2;
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 0.05, 0.5);
        f.c.fillStyle = C.white;
        f.c.strokeStyle = "rgba(31,56,100,.18)";
        f.c.lineWidth = 3 * f.u;
        roundRect(f.c, x, y, w, h, 18 * f.u);
        f.c.fill();
        f.c.stroke();
        for (let i = 1; i < 5; i++) {
          f.c.beginPath();
          f.c.moveTo(x, y + (h / 5) * i);
          f.c.lineTo(x + w, y + (h / 5) * i);
          f.c.stroke();
        }
        for (let i = 1; i < 3; i++) {
          f.c.beginPath();
          f.c.moveTo(x + (w / 3) * i, y);
          f.c.lineTo(x + (w / 3) * i, y + h);
          f.c.stroke();
        }
        // cursor piscando
        if (Math.floor(f.k * 2) % 2 === 0) {
          f.c.fillStyle = C.navy;
          f.c.fillRect(x + w * 0.06, y + h * 0.08, 4 * f.u, h / 5 - 12 * f.u);
        }
        f.c.restore();
        // relógio acelerado
        const cp = inAt(f.k, 0.6, 0.6, easeBack);
        f.c.save();
        f.c.globalAlpha *= clamp01(cp);
        const gx = L.art.cx + w * 0.62;
        const gy = L.art.cy - h * 0.4;
        const gr = s * 0.11;
        f.c.strokeStyle = C.red;
        f.c.lineWidth = 4 * f.u;
        f.c.beginPath();
        f.c.arc(gx, gy, gr, 0, Math.PI * 2);
        f.c.stroke();
        f.c.lineCap = "round";
        const a = f.k * 9;
        f.c.beginPath();
        f.c.moveTo(gx, gy);
        f.c.lineTo(gx + Math.cos(a) * gr * 0.7, gy + Math.sin(a) * gr * 0.7);
        f.c.stroke();
        f.c.restore();
        caption(
          f,
          "Toda vez, a mesma correria\nde montar tudo de novo.",
          "Modelo novo por fornecedor, sem padrão nem reuso.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          2.2,
        );
      },
    },
    {
      dur: 15,
      draw: (f) => {
        bgLight(f);
        const L = splitLayout(f);
        kicker(f, "Meus Processos", L.p, f.h * 0.08, C.blue, inAt(f.k, 0.05, 0.6));
        const m = mockPanel(
          f,
          L.mock.x,
          L.mock.y,
          L.mock.w,
          L.mock.h,
          "myt-s.com · processos",
          inAt(f.k, 0.1, 0.7),
        );
        const clone = easeOut(clamp01((f.k - 0.8) / 1.2));
        const cw = m.bw * 0.82;
        const chh = m.bh * 0.62;
        const bx = m.bx + m.bw * 0.04;
        const by = m.by + m.bh * 0.04;
        // template original (atrás)
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 0.3, 0.5) * (1 - clone * 0.55);
        f.c.fillStyle = C.white;
        f.c.strokeStyle = "rgba(31,56,100,.14)";
        f.c.lineWidth = 3 * f.u;
        roundRect(f.c, bx, by, cw, chh, 26 * f.u);
        f.c.fill();
        f.c.stroke();
        f.c.restore();
        // cópia que desliza
        const ox = bx + m.bw * 0.12 * clone;
        const oy = by + m.bh * 0.06 * clone;
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 0.6, 0.5);
        f.c.fillStyle = C.white;
        f.c.shadowColor = "rgba(10,25,55,.14)";
        f.c.shadowBlur = 46 * f.u;
        f.c.shadowOffsetY = 16 * f.u;
        roundRect(f.c, ox, oy, cw, chh, 26 * f.u);
        f.c.fill();
        f.c.shadowColor = "transparent";
        f.c.strokeStyle = "rgba(46,91,170,.3)";
        f.c.lineWidth = 3 * f.u;
        roundRect(f.c, ox, oy, cw, chh, 26 * f.u);
        f.c.stroke();
        text(f, "Checklist · Aromas Sul", ox + 30 * f.u, oy + 26 * f.u, {
          size: Math.min(32 * f.u, cw * 0.075),
          weight: 800,
          color: C.navy,
          maxWidth: cw - 60 * f.u,
        });
        // itens marcando
        const items = 5;
        const listY = oy + chh * 0.24;
        const ih = (chh * 0.72) / items;
        let done = 0;
        for (let i = 0; i < items; i++) {
          const y = listY + i * ih;
          const on = f.k >= 4.4 + i * 0.75;
          if (on) done++;
          const bs = Math.min(ih * 0.52, cw * 0.07);
          f.c.fillStyle = on ? "rgba(34,160,107,.16)" : "rgba(31,56,100,.07)";
          roundRect(f.c, ox + 30 * f.u, y, bs, bs, bs * 0.3);
          f.c.fill();
          if (on) icon(f, ICONS.check, ox + 30 * f.u + bs / 2, y + bs / 2, bs * 0.6, C.greenInk, 2.6);
          f.c.fillStyle = "rgba(31,56,100,.14)";
          roundRect(
            f.c,
            ox + 30 * f.u + bs * 1.5,
            y + bs * 0.28,
            (cw - 60 * f.u - bs * 1.5) * (0.6 + ((i * 3) % 4) / 10),
            bs * 0.42,
            bs * 0.21,
          );
          f.c.fill();
        }
        f.c.restore();

        // barra de progresso + gauge
        const prog = done / items;
        const barY = m.by + m.bh * 0.92;
        f.c.save();
        f.c.globalAlpha *= inAt(f.k, 4, 0.5);
        f.c.fillStyle = "rgba(31,56,100,.10)";
        roundRect(f.c, m.bx, barY, m.bw, 18 * f.u, 9 * f.u);
        f.c.fill();
        f.c.fillStyle = prog >= 1 ? C.green : C.blue;
        roundRect(f.c, m.bx, barY, Math.max(18 * f.u, m.bw * prog), 18 * f.u, 9 * f.u);
        f.c.fill();
        f.c.restore();

        const gp = inAt(f.k, 9.4, 0.6, easeBack);
        if (gp > 0) {
          const r = Math.min(m.bw, m.bh) * 0.19;
          const gx = m.bx + m.bw * 0.78;
          const gy = m.by + m.bh * 0.72;
          f.c.save();
          f.c.globalAlpha *= clamp01(gp);
          f.c.fillStyle = C.white;
          f.c.shadowColor = "rgba(10,25,55,.16)";
          f.c.shadowBlur = 50 * f.u;
          f.c.beginPath();
          f.c.arc(gx, gy, r * 1.5, 0, Math.PI * 2);
          f.c.fill();
          f.c.shadowColor = "transparent";
          gauge(f, gx, gy, r, easeOut(clamp01((f.k - 9.6) / 2.2)));
          f.c.restore();
        }

        caption(
          f,
          f.k < 9.2
            ? "Reaproveita.\nNão remonta do zero."
            : "Checklist e autoavaliação, prontos\npra qualquer fornecedor novo.",
          f.k < 9.2
            ? "Template duplicado e ajustado em segundos."
            : "Conformidade medida na hora, com evidência anexada.",
          L.cap.x,
          L.cap.y,
          L.cap.w,
          f.k < 9.2 ? 4.2 : 9.4,
        );
      },
    },
    ctaScene({
      dur: 6,
      label: "Conhecer o módulo",
      line: "Conheça o módulo\nMeus Processos.",
    }),
  ],
};

export const modulosVideos = [m1, m2, m3];
