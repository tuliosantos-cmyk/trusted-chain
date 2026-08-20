import MytsMark from "./MytsMark";

// Artes para recursos de imagem do Google Ads.
// Regras: SEM texto, número, palavra ou logo. Conteúdo centralizado ocupando ~80% do quadro.
// Cada arte é desenhada num espaço de design quadrado de 1000x1000 e escalada/centralizada
// no quadro final (1200x1200 ou 1200x628), garantindo os mesmos 80% de ocupação nos dois formatos.

export const NAVY = "#1F3864";
export const BLUE = "#2E5BAA";
export const LIGHT = "#F5F7FA";
export const WHITE = "#FFFFFF";

export const OK = "#2E9E6B";
export const WARN = "#E0A526";
export const DANGER = "#D2493F";

const D = 1000; // design box

/* ---------------------------------- helpers --------------------------------- */

// Barras "de texto" ilustrativas — nunca letras reais.
const Bar = ({
  x,
  y,
  w,
  h = 10,
  fill,
  o = 1,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill: string;
  o?: number;
}) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />;

const Check = ({ size = 100, stroke = WHITE, sw = 8 }: { size?: number; stroke?: string; sw?: number }) => (
  <path
    d={`M ${-size * 0.32} 0 L ${-size * 0.08} ${size * 0.24} L ${size * 0.34} ${-size * 0.26}`}
    fill="none"
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

/* ------------------------------- 1. fornecedores ------------------------------ */

const rowsData = [
  { s: OK, w: 250 },
  { s: OK, w: 300 },
  { s: WARN, w: 210 },
  { s: OK, w: 275 },
  { s: DANGER, w: 235 },
  { s: WARN, w: 290 },
  { s: OK, w: 220 },
];

const ArtFornecedores = () => (
  <g>
    <rect x={0} y={40} width={1000} height={920} rx={36} fill={WHITE} />
    <rect x={0} y={40} width={1000} height={920} rx={36} fill="none" stroke="#DCE3EE" strokeWidth={3} />
    {/* topbar */}
    <path d="M 0 76 A 36 36 0 0 1 36 40 H 964 A 36 36 0 0 1 1000 76 V 156 H 0 Z" fill={LIGHT} />
    <circle cx={54} cy={98} r={11} fill="#C9D3E3" />
    <circle cx={88} cy={98} r={11} fill="#C9D3E3" />
    <circle cx={122} cy={98} r={11} fill="#C9D3E3" />
    <rect x={170} y={82} width={330} height={32} rx={16} fill="#E4EAF3" />
    <rect x={790} y={78} width={150} height={40} rx={20} fill={BLUE} />

    {/* column head */}
    <Bar x={60} y={200} w={160} h={12} fill="#B9C4D6" />
    <Bar x={520} y={200} w={110} h={12} fill="#B9C4D6" />
    <Bar x={760} y={200} w={90} h={12} fill="#B9C4D6" />

    {rowsData.map((r, i) => {
      const y = 250 + i * 96;
      return (
        <g key={i}>
          <rect x={40} y={y} width={920} height={80} rx={18} fill={i % 2 ? LIGHT : WHITE} />
          <circle cx={92} cy={y + 40} r={22} fill="#E4EAF3" />
          <Bar x={132} y={y + 26} w={r.w} h={13} fill={NAVY} o={0.85} />
          <Bar x={132} y={y + 50} w={r.w * 0.55} h={10} fill={NAVY} o={0.3} />
          {/* badge */}
          <rect x={520} y={y + 24} width={150} height={34} rx={17} fill={r.s} opacity={0.15} />
          <circle cx={545} cy={y + 41} r={8} fill={r.s} />
          <Bar x={563} y={y + 36} w={86} h={11} fill={r.s} o={0.75} />
          {/* progress */}
          <rect x={760} y={y + 36} width={160} height={10} rx={5} fill="#E4EAF3" />
          <rect x={760} y={y + 36} width={40 + ((i * 37) % 120)} height={10} rx={5} fill={BLUE} />
        </g>
      );
    })}
  </g>
);

/* ---------------------------------- 2. alertas -------------------------------- */

const ArtAlertas = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
    {/* sino grande em linha fina */}
    <g transform="translate(500 250)" stroke={WHITE} strokeWidth={11} fill="none" strokeLinecap="round">
      <path d="M -96 62 C -96 -30 -62 -74 0 -80 C 62 -74 96 -30 96 62 L 118 92 H -118 Z" strokeLinejoin="round" />
      <path d="M 0 -80 V -108" />
      <path d="M -30 118 A 30 30 0 0 0 30 118" />
    </g>
    <circle cx={606} cy={168} r={30} fill={WARN} />

    {/* cards de documento a vencer */}
    {[0, 1, 2].map((i) => {
      const y = 440 + i * 168;
      const tone = [WARN, WARN, DANGER][i];
      return (
        <g key={i}>
          <rect x={80} y={y} width={840} height={136} rx={26} fill={WHITE} />
          <rect x={80} y={y} width={12} height={136} rx={6} fill={tone} />
          <rect x={124} y={y + 34} width={68} height={68} rx={16} fill={tone} opacity={0.14} />
          <g transform={`translate(158 ${y + 68})`} stroke={tone} strokeWidth={6} fill="none" strokeLinecap="round">
            <circle r={20} />
            <path d="M 0 -11 V 2 L 9 9" />
          </g>
          <Bar x={222} y={y + 42} w={400 - i * 60} h={16} fill={NAVY} o={0.85} />
          <Bar x={222} y={y + 76} w={260 - i * 40} h={13} fill={NAVY} o={0.3} />
          <rect x={740} y={y + 46} width={140} height={44} rx={22} fill={BLUE} opacity={0.14} />
          <rect x={766} y={y + 62} width={88} height={12} rx={6} fill={BLUE} />
        </g>
      );
    })}
  </g>
);

/* ------------------------------- 3. conformidade ------------------------------ */

const ArtGrafico = () => {
  const pts = [
    [90, 700],
    [220, 640],
    [350, 655],
    [480, 520],
    [610, 440],
    [740, 330],
    [880, 230],
  ];
  const line = pts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");
  const r = 118;
  const c = 2 * Math.PI * r;
  return (
    <g>
      <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
      {/* anel de progresso */}
      <g transform="translate(500 220)">
        <circle r={r} fill="none" stroke="#DCE3EE" strokeWidth={30} />
        <circle
          r={r}
          fill="none"
          stroke={BLUE}
          strokeWidth={30}
          strokeLinecap="round"
          strokeDasharray={`${c * 0.86} ${c}`}
          transform="rotate(-90)"
        />
        <circle r={r - 52} fill={WHITE} />
        <g transform="scale(1.5)">
          <Check size={70} stroke={NAVY} sw={9} />
        </g>
      </g>

      {/* grid */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={90} x2={910} y1={760 - i * 130} y2={760 - i * 130} stroke="#DCE3EE" strokeWidth={3} />
      ))}
      {/* área + linha */}
      <path d={`${line} L 880 760 L 90 760 Z`} fill={BLUE} opacity={0.13} />
      <path d={line} fill="none" stroke={NAVY} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={13} fill={WHITE} stroke={BLUE} strokeWidth={8} />
      ))}
      {/* barras discretas */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={70 + i * 128} y={820} width={70} height={30 + i * 14} rx={12} fill={NAVY} opacity={0.18} />
      ))}
    </g>
  );
};

/* -------------------------------- 4. documento -------------------------------- */

const ArtDocumento = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
    {/* folha de trás */}
    <rect x={230} y={80} width={520} height={720} rx={30} fill={WHITE} opacity={0.7} transform="rotate(-5 500 440)" />
    {/* folha principal */}
    <g>
      <path
        d="M 210 120 A 28 28 0 0 1 238 92 H 640 L 800 252 V 852 A 28 28 0 0 1 772 880 H 238 A 28 28 0 0 1 210 852 Z"
        fill={WHITE}
        stroke="#DCE3EE"
        strokeWidth={4}
      />
      <path d="M 640 92 L 800 252 H 668 A 28 28 0 0 1 640 224 Z" fill="#E4EAF3" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <Bar x={266} y={330 + i * 62} w={i === 5 ? 200 : 340 - (i % 3) * 40} h={16} fill={NAVY} o={0.22} />
        </g>
      ))}
      <Bar x={266} y={252} w={220} h={22} fill={NAVY} o={0.5} />
    </g>
    {/* selo circular */}
    <g transform="translate(720 730)">
      <circle r={150} fill={BLUE} />
      <circle r={124} fill="none" stroke={WHITE} strokeWidth={6} opacity={0.5} />
      <circle r={150} fill="none" stroke={NAVY} strokeWidth={10} />
      {Array.from({ length: 40 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={-138}
          x2={0}
          y2={-126}
          stroke={WHITE}
          strokeWidth={4}
          opacity={0.55}
          transform={`rotate(${i * 9})`}
        />
      ))}
      <g transform="scale(1.9)">
        <Check size={80} stroke={WHITE} sw={9} />
      </g>
    </g>
  </g>
);

/* ------------------------------- 5. matéria-prima ----------------------------- */

const ArtMateriaPrima = () => {
  const grains = (cx: number, cy: number, tone: string) =>
    Array.from({ length: 26 }).map((_, i) => {
      const a = (i / 26) * Math.PI * 2;
      const rr = 22 + ((i * 13) % 46);
      return (
        <ellipse
          key={i}
          cx={cx + Math.cos(a) * rr}
          cy={cy + Math.sin(a) * rr * 0.55}
          rx={13}
          ry={8}
          fill={tone}
          opacity={0.85}
          transform={`rotate(${(i * 37) % 180} ${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr * 0.55})`}
        />
      );
    });

  return (
    <g>
      <rect x={0} y={0} width={1000} height={1000} rx={40} fill={LIGHT} />
      {/* superfície */}
      <rect x={40} y={620} width={920} height={4} fill="#DCE3EE" />

      {/* frascos de laboratório */}
      {[
        { x: 200, h: 220, fill: BLUE },
        { x: 330, h: 160, fill: NAVY },
      ].map((f, i) => (
        <g key={i}>
          <path
            d={`M ${f.x - 46} 320 H ${f.x + 46} V ${400} L ${f.x + 92} 620 H ${f.x - 92} L ${f.x - 46} 400 Z`}
            fill={WHITE}
            stroke={NAVY}
            strokeWidth={8}
            strokeLinejoin="round"
          />
          <path
            d={`M ${f.x - 92 + (92 - (f.h - 100) / 2)} ${620 - f.h} H ${f.x + 92 - (92 - (f.h - 100) / 2)} L ${f.x + 92} 620 H ${f.x - 92} Z`}
            fill={f.fill}
            opacity={0.55}
          />
          <rect x={f.x - 56} y={296} width={112} height={26} rx={13} fill={NAVY} />
        </g>
      ))}

      {/* placas / grãos */}
      <g>
        <circle cx={640} cy={470} r={118} fill={WHITE} stroke="#DCE3EE" strokeWidth={6} />
        {grains(640, 470, "#C89A5B")}
      </g>
      <g>
        <circle cx={830} cy={560} r={92} fill={WHITE} stroke="#DCE3EE" strokeWidth={6} />
        {grains(830, 560, "#8FA86A")}
      </g>

      {/* lupa em linha fina, análise */}
      <g transform="translate(700 720)" stroke={BLUE} strokeWidth={14} fill="none" strokeLinecap="round">
        <circle r={110} fill={WHITE} fillOpacity={0.25} />
        <line x1={78} y1={78} x2={168} y2={168} />
        <g transform="translate(0 0) scale(1.3)" stroke={BLUE}>
          <Check size={80} stroke={BLUE} sw={11} />
        </g>
      </g>
    </g>
  );
};

/* ---------------------------------- 6. rede ----------------------------------- */

const nodes = [
  [180, 380],
  [300, 300],
  [268, 470],
  [400, 560],
  [470, 330],
  [520, 470],
  [600, 250],
  [660, 420],
  [720, 560],
  [800, 350],
  [560, 660],
  [380, 700],
  [860, 560],
  [240, 600],
];

const links: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 4],
  [2, 3],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 7],
  [6, 9],
  [7, 9],
  [7, 8],
  [8, 12],
  [8, 10],
  [10, 11],
  [11, 13],
  [13, 2],
  [3, 10],
  [9, 12],
];

const ArtRede = () => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={NAVY} />
    {/* globo estilizado */}
    <g transform="translate(500 500)" stroke={BLUE} fill="none" opacity={0.55}>
      <circle r={370} strokeWidth={4} />
      <ellipse rx={370} ry={140} strokeWidth={3} />
      <ellipse rx={370} ry={260} strokeWidth={3} />
      <ellipse rx={140} ry={370} strokeWidth={3} />
      <ellipse rx={260} ry={370} strokeWidth={3} />
      <line x1={-370} y1={0} x2={370} y2={0} strokeWidth={3} />
    </g>
    {/* malha de pontos */}
    {links.map(([a, b], i) => (
      <line
        key={i}
        x1={nodes[a][0]}
        y1={nodes[a][1]}
        x2={nodes[b][0]}
        y2={nodes[b][1]}
        stroke={WHITE}
        strokeWidth={3}
        opacity={0.5}
      />
    ))}
    {nodes.map((n, i) => (
      <g key={i}>
        {i % 4 === 0 && <circle cx={n[0]} cy={n[1]} r={26} fill={BLUE} opacity={0.45} />}
        <circle cx={n[0]} cy={n[1]} r={i % 4 === 0 ? 14 : 9} fill={WHITE} />
      </g>
    ))}
  </g>
);

/* --------------------------- 7/8/9 ícones de pilar ---------------------------- */

const PillarFrame = ({ dark, children }: { dark: boolean; children: React.ReactNode }) => (
  <g>
    <rect x={0} y={0} width={1000} height={1000} rx={40} fill={dark ? NAVY : LIGHT} />
    <circle cx={500} cy={500} r={430} fill="none" stroke={dark ? WHITE : NAVY} strokeWidth={3} opacity={0.12} />
    <g
      transform="translate(500 500)"
      stroke={dark ? WHITE : NAVY}
      strokeWidth={18}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  </g>
);

const ArtPilarSelo = () => (
  <PillarFrame dark>
    <path d="M 0 -330 L 280 -210 V 40 C 280 200 160 300 0 350 C -160 300 -280 200 -280 40 V -210 Z" />
    <path d="M -120 10 L -30 100 L 130 -80" stroke={BLUE} strokeWidth={26} />
  </PillarFrame>
);

const ArtPilarRadar = () => (
  <PillarFrame dark={false}>
    <circle r={330} opacity={0.35} />
    <circle r={220} opacity={0.6} />
    <circle r={110} />
    <line x1={0} y1={0} x2={0} y2={-330} opacity={0.35} />
    <line x1={0} y1={0} x2={330} y2={0} opacity={0.35} />
    <path d="M 0 0 L 250 -216 A 330 330 0 0 0 0 -330 Z" fill={BLUE} fillOpacity={0.18} stroke="none" />
    <line x1={0} y1={0} x2={250} y2={-216} stroke={BLUE} strokeWidth={22} />
    <circle cx={180} cy={-160} r={26} fill={BLUE} stroke="none" />
    <circle cx={-150} cy={150} r={20} fill={BLUE} stroke="none" opacity={0.6} />
  </PillarFrame>
);

const ArtPilarCrescimento = () => (
  <PillarFrame dark>
    <path d="M -330 300 V -300" opacity={0.35} />
    <path d="M -330 300 H 330" opacity={0.35} />
    <path d="M -230 210 V 40" strokeWidth={44} opacity={0.45} />
    <path d="M -80 210 V -60" strokeWidth={44} opacity={0.65} />
    <path d="M 70 210 V -160" strokeWidth={44} opacity={0.85} />
    <path d="M 220 210 V -250" strokeWidth={44} stroke={BLUE} />
    <path d="M -280 100 L -110 -20 L 40 -110 L 250 -300" stroke={BLUE} strokeWidth={22} />
    <path d="M 150 -300 H 265 V -190" stroke={BLUE} strokeWidth={22} />
  </PillarFrame>
);

/* --------------------------------- registry ---------------------------------- */

export type AdArt = {
  id: string;
  name: string;
  group: string;
  note: string;
  bg: string;
  render: () => JSX.Element;
};

export const adArts: AdArt[] = [
  {
    id: "dash-fornecedores",
    bg: LIGHT,
    name: "Dashboard — lista de fornecedores",
    group: "Tipo 1 · Produto",
    note: "Status conforme / atenção / vencido. Labels apenas ilustrativos.",
    render: () => <ArtFornecedores />,
  },
  {
    id: "dash-alertas",
    bg: NAVY,
    name: "Painel de alertas de vencimento",
    group: "Tipo 1 · Produto",
    note: "Urgência controlada, fundo navy, cards claros.",
    render: () => <ArtAlertas />,
  },
  {
    id: "dash-conformidade",
    bg: LIGHT,
    name: "Gráfico de conformidade",
    group: "Tipo 1 · Produto",
    note: "Anel de progresso + curva ascendente, sem números.",
    render: () => <ArtGrafico />,
  },
  {
    id: "doc-selo",
    bg: LIGHT,
    name: "Documento + selo de aprovação",
    group: "Tipo 2 · Normas",
    note: "Flat vetor, selo de check sem texto.",
    render: () => <ArtDocumento />,
  },
  {
    id: "materia-prima",
    bg: LIGHT,
    name: "Matéria-prima e análise",
    group: "Tipo 3 · Homologação / P&D",
    note: "Grãos, frascos e lupa de validação.",
    render: () => <ArtMateriaPrima />,
  },
  {
    id: "rede-global",
    bg: NAVY,
    name: "Rede global de cadeia",
    group: "Tipo 4 · Institucional",
    note: "Globo vetorial e malha de nós, sem países nomeados.",
    render: () => <ArtRede />,
  },
  {
    id: "pilar-homologar",
    bg: NAVY,
    name: "Pilar — homologar",
    group: "Tipo 5 · Ícone",
    note: "Escudo com check, fundo navy.",
    render: () => <ArtPilarSelo />,
  },
  {
    id: "pilar-monitorar",
    bg: LIGHT,
    name: "Pilar — monitorar",
    group: "Tipo 5 · Ícone",
    note: "Radar em linha fina, fundo claro.",
    render: () => <ArtPilarRadar />,
  },
  {
    id: "pilar-desenvolver",
    bg: NAVY,
    name: "Pilar — desenvolver",
    group: "Tipo 5 · Ícone",
    note: "Barras + curva ascendente, fundo navy.",
    render: () => <ArtPilarCrescimento />,
  },
];

/* --------------------------------- frame ------------------------------------- */

export const AdFrame = ({
  art,
  width,
  height,
  withLogo = false,
  svgRef,
}: {
  art: AdArt;
  width: number;
  height: number;
  withLogo?: boolean;
  svgRef?: (el: SVGSVGElement | null) => void;
}) => {
  const square = height >= width * 0.95;
  const scale = square ? (Math.min(width, height) * 0.86) / D : (height * 0.94) / D;
  const tx = (width - D * scale) / 2;
  const ty = (height - D * scale) / 2;
  const dark = art.bg === NAVY;
  const markSize = height * 0.1;
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block h-auto w-full"
      role="img"
      aria-label={art.name}
      data-ad-asset="true"
      data-w={width}
      data-h={height}
      data-name={`myts-${art.id}${withLogo ? "-logo" : ""}`}
    >
      <rect x={0} y={0} width={width} height={height} fill={art.bg} />
      <g transform={`translate(${tx} ${ty}) scale(${scale})`}>{art.render()}</g>
      {withLogo && (
        <g transform={`translate(${width - markSize - height * 0.045} ${height - markSize - height * 0.045})`}>
          <MytsMark size={markSize} fill={dark ? WHITE : NAVY} opacity={0.92} />
        </g>
      )}
    </svg>
  );
};

