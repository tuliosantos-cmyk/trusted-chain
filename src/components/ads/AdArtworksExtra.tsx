import { BLUE, DANGER, LIGHT, NAVY, OK, WARN, WHITE, type AdArt } from "./AdArtworks";

// Mesmas regras: nenhum texto, número ou palavra real. Espaço de design 1000x1000.

const Bar = ({ x, y, w, h = 10, fill, o = 1 }: { x: number; y: number; w: number; h?: number; fill: string; o?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />
);

/* ------------------------------ kanban de processos --------------------------- */

const ArtKanban = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    {[0, 1, 2].map((col) => (
      <g key={col}>
        <rect x={40 + col * 312} y={60} width={276} height={880} rx={28} fill={WHITE} stroke="#DCE3EE" strokeWidth={3} />
        <Bar x={76 + col * 312} y={104} w={120} h={14} fill={NAVY} o={0.35} />
        <circle cx={272 + col * 312} cy={111} r={16} fill={[OK, WARN, BLUE][col]} opacity={0.25} />
        {Array.from({ length: 4 - col }).map((_, i) => {
          const y = 160 + i * 176;
          return (
            <g key={i}>
              <rect x={72 + col * 312} y={y} width={212} height={148} rx={20} fill={LIGHT} />
              <rect x={96 + col * 312} y={y + 24} width={80} height={22} rx={11} fill={[OK, WARN, BLUE][col]} opacity={0.3} />
              <Bar x={96 + col * 312} y={y + 64} w={164} h={13} fill={NAVY} o={0.55} />
              <Bar x={96 + col * 312} y={y + 90} w={110} h={11} fill={NAVY} o={0.25} />
              <circle cx={110 + col * 312} cy={y + 122} r={13} fill="#C9D3E3" />
              <circle cx={136 + col * 312} cy={y + 122} r={13} fill="#DCE3EE" />
            </g>
          );
        })}
      </g>
    ))}
  </g>
);

/* --------------------------- autodeclaração no celular ------------------------ */

const ArtMobile = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
    <g transform="translate(500 500)">
      <rect x={-230} y={-420} width={460} height={840} rx={64} fill={WHITE} />
      <rect x={-206} y={-396} width={412} height={792} rx={44} fill={LIGHT} />
      <rect x={-56} y={-380} width={112} height={20} rx={10} fill={WHITE} />
      {/* header do app */}
      <rect x={-206} y={-352} width={412} height={120} fill={BLUE} />
      <circle cx={-150} cy={-292} r={26} fill={WHITE} opacity={0.85} />
      <Bar x={-104} y={-306} w={150} h={14} fill={WHITE} o={0.9} />
      <Bar x={-104} y={-280} w={96} h={11} fill={WHITE} o={0.5} />
      {/* itens de checklist */}
      {[OK, OK, WARN, OK, DANGER].map((tone, i) => {
        const y = -190 + i * 106;
        return (
          <g key={i}>
            <rect x={-176} y={y} width={352} height={84} rx={20} fill={WHITE} />
            <circle cx={-132} cy={y + 42} r={24} fill={tone} opacity={0.16} />
            <path
              d={`M ${-144} ${y + 42} l 9 10 l 20 -22`}
              fill="none"
              stroke={tone}
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Bar x={-92} y={y + 28} w={180 - i * 18} h={13} fill={NAVY} o={0.7} />
            <Bar x={-92} y={y + 52} w={110} h={10} fill={NAVY} o={0.25} />
          </g>
        );
      })}
      <rect x={-176} y={346} width={352} height={62} rx={31} fill={BLUE} />
    </g>
  </g>
);

/* --------------------------------- upload nuvem ------------------------------- */

const ArtUpload = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    <rect x={90} y={150} width={820} height={700} rx={40} fill={WHITE} stroke={BLUE} strokeWidth={8} strokeDasharray="34 26" />
    <g transform="translate(500 430)" stroke={NAVY} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M -180 60 A 110 110 0 0 1 -140 -140 A 150 150 0 0 1 120 -120 A 110 110 0 0 1 180 60 Z" fill={WHITE} />
      <path d="M 0 140 V -30" stroke={BLUE} strokeWidth={20} />
      <path d="M -70 40 L 0 -34 L 70 40" stroke={BLUE} strokeWidth={20} />
    </g>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={150 + i * 240} y={660} width={200} height={130} rx={22} fill={LIGHT} />
        <path
          d={`M ${180 + i * 240} 690 h 90 l 34 34 v 66 h -124 z`}
          fill={WHITE}
          stroke="#C9D3E3"
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <rect x={196 + i * 240} y={730} width={82} height={9} rx={4} fill={NAVY} opacity={0.25} />
        <rect x={196 + i * 240} y={750} width={60} height={9} rx={4} fill={NAVY} opacity={0.18} />
        <circle cx={306 + i * 240} cy={766} r={16} fill={[OK, BLUE, OK][i]} />
      </g>
    ))}
  </g>
);

/* -------------------------------- checklist auditoria ------------------------- */

const ArtChecklist = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
    <rect x={190} y={110} width={620} height={790} rx={38} fill={WHITE} />
    <rect x={370} y={70} width={260} height={90} rx={26} fill={LIGHT} stroke="#C9D3E3" strokeWidth={6} />
    <rect x={430} y={54} width={140} height={44} rx={22} fill={BLUE} />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const y = 240 + i * 106;
      const done = i < 4;
      return (
        <g key={i}>
          <rect x={250} y={y} width={64} height={64} rx={18} fill={done ? OK : LIGHT} opacity={done ? 0.16 : 1} stroke={done ? "none" : "#C9D3E3"} strokeWidth={5} />
          {done && (
            <path d={`M 266 ${y + 34} l 14 16 l 30 -34`} fill="none" stroke={OK} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
          )}
          <Bar x={344} y={y + 16} w={380 - (i % 3) * 60} h={16} fill={NAVY} o={done ? 0.7 : 0.35} />
          <Bar x={344} y={y + 46} w={240 - (i % 2) * 60} h={12} fill={NAVY} o={0.2} />
        </g>
      );
    })}
    <g transform="translate(760 790)">
      <circle r={110} fill={BLUE} />
      <path d="M -46 4 l 30 32 l 62 -70" fill="none" stroke={WHITE} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </g>
);

/* --------------------------------- calendário --------------------------------- */

const ArtCalendario = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    <rect x={110} y={140} width={780} height={740} rx={40} fill={WHITE} stroke="#DCE3EE" strokeWidth={4} />
    <path d="M 110 180 A 40 40 0 0 1 150 140 H 850 A 40 40 0 0 1 890 180 V 300 H 110 Z" fill={NAVY} />
    <rect x={250} y={100} width={40} height={100} rx={20} fill={BLUE} />
    <rect x={710} y={100} width={40} height={100} rx={20} fill={BLUE} />
    <Bar x={170} y={212} w={200} h={20} fill={WHITE} o={0.85} />
    <Bar x={740} y={212} w={90} h={20} fill={WHITE} o={0.4} />
    {Array.from({ length: 28 }).map((_, i) => {
      const c = i % 7;
      const r = Math.floor(i / 7);
      const x = 160 + c * 104;
      const y = 350 + r * 132;
      const tone = [null, null, WARN, null, OK, null, null, DANGER, null, null, null, OK, null, WARN][i % 14];
      return (
        <g key={i}>
          <rect x={x} y={y} width={84} height={104} rx={20} fill={tone ? tone : LIGHT} opacity={tone ? 0.14 : 1} />
          <rect x={x + 20} y={y + 22} width={44} height={12} rx={6} fill={NAVY} opacity={0.2} />
          {tone && <circle cx={x + 42} cy={y + 68} r={16} fill={tone} />}
        </g>
      );
    })}
  </g>
);

/* --------------------------------- ciclo 3 etapas ----------------------------- */

const ArtCiclo = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
    <circle cx={500} cy={500} r={300} fill="none" stroke={BLUE} strokeWidth={14} strokeDasharray="46 34" opacity={0.7} />
    {[
      { a: -90, icon: "shield" },
      { a: 30, icon: "radar" },
      { a: 150, icon: "growth" },
    ].map(({ a, icon }, i) => {
      const rad = (a * Math.PI) / 180;
      const x = 500 + Math.cos(rad) * 300;
      const y = 500 + Math.sin(rad) * 300;
      return (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r={124} fill={WHITE} />
          <circle r={124} fill="none" stroke={BLUE} strokeWidth={10} />
          <g stroke={NAVY} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {icon === "shield" && (
              <>
                <path d="M 0 -66 L 56 -42 V 6 C 56 40 32 62 0 74 C -32 62 -56 40 -56 6 V -42 Z" />
                <path d="M -24 2 L -6 20 L 26 -16" stroke={BLUE} />
              </>
            )}
            {icon === "radar" && (
              <>
                <circle r={64} opacity={0.4} />
                <circle r={32} />
                <line x1={0} y1={0} x2={48} y2={-42} stroke={BLUE} />
                <circle cx={40} cy={-36} r={10} fill={BLUE} stroke="none" />
              </>
            )}
            {icon === "growth" && (
              <>
                <path d="M -60 60 V -50" opacity={0.4} />
                <path d="M -60 60 H 60" opacity={0.4} />
                <path d="M -46 34 L -6 -6 L 24 18 L 62 -44" stroke={BLUE} />
                <path d="M 24 -44 H 62 V -8" stroke={BLUE} />
              </>
            )}
          </g>
        </g>
      );
    })}
    {/* setas do ciclo */}
    {[-30, 90, 210].map((a, i) => (
      <g key={i} transform={`rotate(${a} 500 500) translate(500 200)`}>
        <path d="M -18 -20 L 20 0 L -18 20 Z" fill={BLUE} transform="rotate(90)" />
      </g>
    ))}
  </g>
);

/* ---------------------------------- hub cadeia -------------------------------- */

const ArtHub = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    <circle cx={500} cy={500} r={330} fill="none" stroke="#DCE3EE" strokeWidth={4} />
    <circle cx={500} cy={500} r={200} fill="none" stroke="#DCE3EE" strokeWidth={4} />
    {Array.from({ length: 10 }).map((_, i) => {
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 ? 330 : 200;
      const x = 500 + Math.cos(a) * r;
      const y = 500 + Math.sin(a) * r;
      const tone = [OK, OK, BLUE, WARN, OK, BLUE, OK, DANGER, BLUE, OK][i];
      return (
        <g key={i}>
          <line x1={500} y1={500} x2={x} y2={y} stroke={BLUE} strokeWidth={4} opacity={0.35} />
          <circle cx={x} cy={y} r={44} fill={WHITE} stroke={tone} strokeWidth={8} />
          <circle cx={x} cy={y} r={16} fill={tone} />
        </g>
      );
    })}
    <circle cx={500} cy={500} r={110} fill={NAVY} />
    <g transform="translate(500 500)" stroke={WHITE} strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 -58 L 50 -36 V 4 C 50 34 28 54 0 64 C -28 54 -50 34 -50 4 V -36 Z" />
      <path d="M -20 2 L -4 18 L 24 -14" stroke={BLUE} />
    </g>
  </g>
);

/* -------------------------------- rastreabilidade ----------------------------- */

const ArtRastreio = () => {
  const cells = [
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
  ];
  return (
    <g>
      <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
      <rect x={200} y={140} width={600} height={600} rx={48} fill={WHITE} />
      {cells.map((row, r) =>
        row.map((v, c) =>
          v ? <rect key={`${r}-${c}`} x={248 + c * 56} y={188 + r * 56} width={48} height={48} rx={10} fill={NAVY} /> : null,
        ),
      )}
      <rect x={248} y={188} width={160} height={160} rx={24} fill="none" stroke={BLUE} strokeWidth={18} />
      <rect x={592} y={188} width={160} height={160} rx={24} fill="none" stroke={BLUE} strokeWidth={18} />
      <rect x={248} y={532} width={160} height={160} rx={24} fill="none" stroke={BLUE} strokeWidth={18} />
      {/* feixe de leitura */}
      <rect x={230} y={430} width={540} height={16} rx={8} fill={BLUE} opacity={0.8} />
      {/* elos da cadeia abaixo */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={280 + i * 148} cy={860} r={44} fill="none" stroke={WHITE} strokeWidth={10} opacity={0.85} />
          <circle cx={280 + i * 148} cy={860} r={14} fill={BLUE} />
          {i < 3 && <line x1={324 + i * 148} y1={860} x2={384 + i * 148} y2={860} stroke={WHITE} strokeWidth={8} opacity={0.5} />}
        </g>
      ))}
    </g>
  );
};

/* -------------------------------- cadeia logística ---------------------------- */

const ArtCadeia = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    <g stroke={NAVY} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* fazenda */}
      <g transform="translate(200 300)">
        <path d="M -90 40 V -20 L 0 -80 L 90 -20 V 40 Z" fill={WHITE} />
        <path d="M -34 40 V -6 H 34 V 40" stroke={BLUE} />
      </g>
      {/* indústria */}
      <g transform="translate(500 300)">
        <path d="M -95 40 V -30 L -20 10 V -30 L 55 10 V -60 H 95 V 40 Z" fill={WHITE} />
        <path d="M -60 40 V 10" stroke={BLUE} />
      </g>
      {/* caminhão */}
      <g transform="translate(800 300)">
        <path d="M -95 20 V -50 H 20 V 20 Z" fill={WHITE} />
        <path d="M 20 20 V -18 H 60 L 92 14 V 20 Z" fill={WHITE} stroke={BLUE} />
        <circle cx={-46} cy={40} r={22} fill={WHITE} />
        <circle cx={56} cy={40} r={22} fill={WHITE} />
      </g>
      {/* varejo */}
      <g transform="translate(350 700)">
        <path d="M -100 40 V -20 H 100 V 40 Z" fill={WHITE} />
        <path d="M -110 -20 L -84 -70 H 84 L 110 -20 Z" fill={WHITE} stroke={BLUE} />
        <path d="M -30 40 V -6 H 30 V 40" />
      </g>
      {/* consumidor */}
      <g transform="translate(700 700)">
        <circle cy={-42} r={40} fill={WHITE} />
        <path d="M -74 44 C -74 -6 74 -6 74 44" fill={WHITE} stroke={BLUE} />
      </g>
    </g>
    {/* setas conectando */}
    <g stroke={BLUE} strokeWidth={8} strokeDasharray="22 18" fill="none" opacity={0.7}>
      <path d="M 310 300 H 380" />
      <path d="M 610 300 H 680" />
      <path d="M 800 380 C 800 520 560 560 470 630" />
      <path d="M 470 700 H 600" />
    </g>
  </g>
);

/* ------------------------------- lupa em documento ---------------------------- */

const ArtAuditoria = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
    <g transform="rotate(-6 500 500)">
      <path
        d="M 240 190 A 30 30 0 0 1 270 160 H 620 L 770 310 V 830 A 30 30 0 0 1 740 860 H 270 A 30 30 0 0 1 240 830 Z"
        fill={WHITE}
      />
      <path d="M 620 160 L 770 310 H 650 A 30 30 0 0 1 620 280 Z" fill="#DCE3EE" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={296} y={360 + i * 58} width={i % 3 === 2 ? 220 : 380 - (i % 2) * 60} height={16} rx={8} fill={NAVY} opacity={0.18} />
      ))}
      <rect x={296} y={280} width={200} height={26} rx={13} fill={BLUE} opacity={0.5} />
    </g>
    <g transform="translate(660 690)">
      <circle r={190} fill={BLUE} opacity={0.14} />
      <circle r={190} fill="none" stroke={WHITE} strokeWidth={22} />
      <circle r={190} fill="none" stroke={BLUE} strokeWidth={8} />
      <line x1={134} y1={134} x2={244} y2={244} stroke={WHITE} strokeWidth={40} strokeLinecap="round" />
      <line x1={134} y1={134} x2={244} y2={244} stroke={BLUE} strokeWidth={20} strokeLinecap="round" />
      <path d="M -70 6 L -20 56 L 74 -50" fill="none" stroke={WHITE} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </g>
);

/* -------------------------------- automação engrenagem ------------------------ */

const Gear = ({ r, teeth, stroke, sw }: { r: number; teeth: number; stroke: string; sw: number }) => (
  <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
    <circle r={r} />
    <circle r={r * 0.42} />
    {Array.from({ length: teeth }).map((_, i) => (
      <line key={i} x1={0} y1={-r} x2={0} y2={-r - r * 0.24} transform={`rotate(${(360 / teeth) * i})`} />
    ))}
  </g>
);

const ArtAutomacao = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    <g transform="translate(390 420)">
      <Gear r={230} teeth={14} stroke={NAVY} sw={22} />
    </g>
    <g transform="translate(720 700)">
      <Gear r={150} teeth={10} stroke={BLUE} sw={20} />
    </g>
    <g transform="translate(730 300)">
      <Gear r={96} teeth={8} stroke={NAVY} sw={16} />
    </g>
    <g transform="translate(390 420)" stroke={BLUE} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M -70 6 L -18 58 L 78 -52" />
    </g>
  </g>
);

/* ------------------------------- pasta de documentos -------------------------- */

const ArtPasta = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
    {/* fichas atrás */}
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={250 + i * 24}
        y={200 - i * 36}
        width={500 - i * 48}
        height={480}
        rx={26}
        fill={WHITE}
        opacity={0.35 + i * 0.25}
      />
    ))}
    {/* pasta frente */}
    <path
      d="M 160 340 A 34 34 0 0 1 194 306 H 400 L 460 372 H 806 A 34 34 0 0 1 840 406 V 782 A 34 34 0 0 1 806 816 H 194 A 34 34 0 0 1 160 782 Z"
      fill={BLUE}
    />
    <path d="M 190 440 H 810 L 780 800 H 220 Z" fill={LIGHT} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={260} y={500 + i * 68} width={340 - i * 40} height={18} rx={9} fill={NAVY} opacity={0.22} />
        <circle cx={700} cy={509 + i * 68} r={18} fill={[OK, OK, WARN, OK][i]} />
      </g>
    ))}
  </g>
);

/* --------------------------------- selo faixa --------------------------------- */

const ArtSeloFaixa = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    <g transform="translate(500 440)">
      <circle r={300} fill={NAVY} />
      <circle r={252} fill="none" stroke={WHITE} strokeWidth={10} opacity={0.45} />
      {Array.from({ length: 48 }).map((_, i) => (
        <line key={i} x1={0} y1={-286} x2={0} y2={-262} stroke={WHITE} strokeWidth={6} opacity={0.35} transform={`rotate(${i * 7.5})`} />
      ))}
      <circle r={170} fill={BLUE} />
      <path d="M -80 8 L -20 68 L 90 -62" fill="none" stroke={WHITE} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
      {/* fitas */}
      <path d="M -150 250 L -230 470 L -110 420 L -40 500 L -30 280 Z" fill={BLUE} />
      <path d="M 150 250 L 230 470 L 110 420 L 40 500 L 30 280 Z" fill={NAVY} />
    </g>
  </g>
);

/* --------------------------------- registry extra ----------------------------- */

export const adArtsExtra: AdArt[] = [
  { id: "processos-kanban", name: "Processos — quadro de etapas", group: "Tipo 1 · Produto", note: "Fluxo de homologação em colunas.", bg: LIGHT, render: () => <ArtKanban /> },
  { id: "autodeclaracao-mobile", name: "Autodeclaração do fornecedor (mobile)", group: "Tipo 1 · Produto", note: "App de checklist preenchido pelo fornecedor.", bg: NAVY, render: () => <ArtMobile /> },
  { id: "upload-documentos", name: "Envio de documentos", group: "Tipo 1 · Produto", note: "Área de upload com arquivos validados.", bg: LIGHT, render: () => <ArtUpload /> },
  { id: "checklist-auditoria", name: "Checklist de auditoria", group: "Tipo 2 · Normas", note: "Prancheta com itens aprovados.", bg: NAVY, render: () => <ArtChecklist /> },
  { id: "calendario-vencimentos", name: "Calendário de vencimentos", group: "Tipo 2 · Normas", note: "Datas críticas destacadas por cor.", bg: LIGHT, render: () => <ArtCalendario /> },
  { id: "ciclo-dna", name: "Ciclo homologar · monitorar · desenvolver", group: "Tipo 5 · Ícone", note: "Três pilares em ciclo contínuo.", bg: NAVY, render: () => <ArtCiclo /> },
  { id: "hub-cadeia", name: "Hub de fornecedores", group: "Tipo 4 · Institucional", note: "Base central conectada à carteira.", bg: LIGHT, render: () => <ArtHub /> },
  { id: "rastreabilidade-qr", name: "Rastreabilidade de origem", group: "Tipo 4 · Institucional", note: "Código de leitura e elos da cadeia.", bg: NAVY, render: () => <ArtRastreio /> },
  { id: "cadeia-logistica", name: "Cadeia — campo à gôndola", group: "Tipo 4 · Institucional", note: "Ícones de linha fina conectados.", bg: LIGHT, render: () => <ArtCadeia /> },
  { id: "auditoria-lupa", name: "Auditoria documental", group: "Tipo 2 · Normas", note: "Lupa validando o documento.", bg: NAVY, render: () => <ArtAuditoria /> },
  { id: "automacao-engrenagens", name: "Automação de cobrança", group: "Tipo 5 · Ícone", note: "Engrenagens com validação.", bg: LIGHT, render: () => <ArtAutomacao /> },
  { id: "pasta-documentos", name: "Dossiê do fornecedor", group: "Tipo 1 · Produto", note: "Pasta organizada com status.", bg: NAVY, render: () => <ArtPasta /> },
  { id: "selo-certificacao", name: "Selo de certificação", group: "Tipo 2 · Normas", note: "Medalha com fitas, sem texto.", bg: LIGHT, render: () => <ArtSeloFaixa /> },
];
