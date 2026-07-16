import { Helmet } from "react-helmet-async";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Users,
  Building2,
  TrendingUp,
  FileCheck,
  Database,
  Satellite,
  MapPin,
  HeartHandshake,
  Store,
  Leaf,
  Mail,
  Globe,
  Target,
  GraduationCap,
  Award,
  Handshake,
  TreePine,
  HandHeart,
  Home,
  Coins,
  FileSpreadsheet,
  MessageCircle,
  FileText,
  EyeOff,
  TrendingDown,
  Radar,
  QrCode,
  BookOpen,
  Fingerprint,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import grounddAsset from "@/assets/logos/groundd.png.asset.json";
import ramoAsset from "@/assets/logos/ramo.png.asset.json";
import korinAsset from "@/assets/logos/korin.png.asset.json";
import carrefourAsset from "@/assets/logos/carrefour.png.asset.json";
import produtorImg from "@/assets/passaporte/produtor.jpg";

/* ============================================================
   Primitivos
   ============================================================ */
const PartnerLogo = ({
  src,
  alt,
  className = "h-8",
  variant = "light",
}: {
  src: string;
  alt: string;
  className?: string;
  variant?: "light" | "dark";
}) =>
  variant === "light" ? (
    <img
      src={src}
      alt={alt}
      className={`${className} w-auto object-contain`}
      style={{ filter: "invert(1) brightness(1.15) contrast(1.05)", mixBlendMode: "screen" }}
    />
  ) : (
    <img src={src} alt={alt} className={`${className} w-auto object-contain`} />
  );

const Chip = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span
    className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-sm font-semibold tracking-[0.18em] uppercase ${
      light
        ? "border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/80 backdrop-blur"
        : "border-accent/25 bg-accent/5 text-accent"
    }`}
  >
    {children}
  </span>
);

const SectionLabel = ({
  n,
  label,
  light = false,
}: {
  n: string;
  label: string;
  light?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] ${
      light ? "text-accent-glow" : "text-accent"
    }`}
  >
    <span className="font-mono">{n}</span>
    <span className={`h-px w-12 ${light ? "bg-accent-glow/60" : "bg-accent/50"}`} />
    {label}
  </div>
);

const Slide = ({
  bg = "bg-background",
  className = "",
  children,
  decor,
  pad = "p-12 md:p-16",
}: {
  bg?: string;
  className?: string;
  children: React.ReactNode;
  decor?: React.ReactNode;
  pad?: string;
}) => (
  <section
    className={`${bg} relative ${className} slide-frame`}
    style={{
      width: "min(100%, calc((100vh - 64px) * 16 / 9))",
      aspectRatio: "16 / 9",
      margin: "0 auto",
      padding: 0,
      overflow: "hidden",
      borderRadius: 16,
      boxShadow: "0 30px 80px -20px rgba(0,0,0,0.55)",
      scrollSnapAlign: "center",
    }}
  >
    <div className="relative h-full w-full slide-inner">
      {decor}
      <div className={`relative h-full w-full flex flex-col ${pad}`}>{children}</div>
    </div>
  </section>
);

const MytsWatermark = ({ className = "" }: { className?: string }) => (
  <img
    src={mytsMark}
    alt=""
    aria-hidden
    className={`pointer-events-none select-none absolute opacity-[0.06] ${className}`}
  />
);

/* ============================================================
   Diagramas customizados
   ============================================================ */

/* Slide 02 — Fluxo do desafio (produtor → invisível → menos renda) */
const ChallengeFlow = () => {
  const nos = [
    { icon: Sprout, t: "Produtor", tone: "start" },
    { icon: FileSpreadsheet, t: "Planilhas soltas" },
    { icon: MessageCircle, t: "WhatsApp" },
    { icon: FileText, t: "Papel & PDF" },
    { icon: EyeOff, t: "Invisível ao mercado", tone: "warn" },
    { icon: TrendingDown, t: "Menos renda", tone: "end" },
  ];
  return (
    <div className="w-full">
      <div className="grid grid-cols-11 items-center gap-0">
        {nos.map((n, i) => (
          <div key={n.t} className="contents">
            <div className="col-span-1 flex flex-col items-center text-center">
              <div
                className={`relative size-20 rounded-2xl grid place-items-center border-2 shadow-card ${
                  n.tone === "start"
                    ? "bg-gradient-accent border-accent-glow"
                    : n.tone === "warn"
                    ? "bg-destructive/10 border-destructive/40"
                    : n.tone === "end"
                    ? "bg-primary border-primary"
                    : "bg-card border-border"
                }`}
              >
                <n.icon
                  className={`size-8 ${
                    n.tone === "start"
                      ? "text-accent-foreground"
                      : n.tone === "warn"
                      ? "text-destructive"
                      : n.tone === "end"
                      ? "text-accent-glow"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <div
                className={`mt-3 font-display font-bold text-[15px] leading-tight max-w-[140px] ${
                  n.tone === "warn" ? "text-destructive" : "text-primary"
                }`}
              >
                {n.t}
              </div>
            </div>
            {i < nos.length - 1 && (
              <div className="col-span-1 flex items-center justify-center -mt-6">
                <ArrowRight className="size-6 text-muted-foreground/60" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* Slide 03 — Hub da iniciativa: MyTS no núcleo, Groundd + RAMO orbitando */
const InitiativeHub = () => (
  <svg viewBox="0 0 640 420" className="w-full h-full max-h-[420px]" role="img" aria-label="MyTS no núcleo, Groundd e RAMO como camadas complementares">
    <defs>
      <linearGradient id="hub-accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(214 95% 54%)" />
        <stop offset="100%" stopColor="hsl(199 95% 60%)" />
      </linearGradient>
      <radialGradient id="hub-glow">
        <stop offset="0%" stopColor="hsl(199 95% 60%)" stopOpacity="0.55" />
        <stop offset="100%" stopColor="hsl(214 95% 54%)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* conexões */}
    <line x1="180" y1="130" x2="320" y2="210" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />
    <line x1="180" y1="290" x2="320" y2="210" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />
    <line x1="460" y1="130" x2="320" y2="210" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />
    <line x1="460" y1="290" x2="320" y2="210" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />

    {/* núcleo */}
    <circle cx="320" cy="210" r="150" fill="url(#hub-glow)" />
    <circle cx="320" cy="210" r="90" fill="hsl(222 65% 14%)" stroke="hsl(214 95% 54%)" strokeWidth="2" />
    <circle cx="320" cy="210" r="110" fill="none" stroke="hsl(199 95% 60%)" strokeWidth="1" strokeDasharray="2 6" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" from="0 320 210" to="360 320 210" dur="24s" repeatCount="indefinite" />
    </circle>
    <text x="320" y="196" textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="10" fontWeight="700" letterSpacing="3" fontFamily="Rubik, sans-serif">
      INFRAESTRUTURA
    </text>
    <text x="320" y="228" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="800" fontFamily="Rubik, sans-serif">
      MyTS
    </text>
    <text x="320" y="248" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Lato, sans-serif">
      dados · evidências · governança
    </text>

    {/* Groundd — esquerda cima */}
    <g>
      <rect x="40" y="100" width="150" height="70" rx="14" fill="#fff" stroke="hsl(214 32% 91%)" />
      <text x="115" y="128" textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">GROUNDD</text>
      <text x="115" y="148" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="11" fontWeight="600" fontFamily="Lato, sans-serif">Pessoas · Território</text>
      <text x="115" y="162" textAnchor="middle" fill="hsl(215 16% 42%)" fontSize="9" fontFamily="Lato, sans-serif">CERS · capacitação</text>
    </g>

    {/* RAMO — direita cima */}
    <g>
      <rect x="450" y="100" width="150" height="70" rx="14" fill="#fff" stroke="hsl(214 32% 91%)" />
      <text x="525" y="128" textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">RAMO</text>
      <text x="525" y="148" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="11" fontWeight="600" fontFamily="Lato, sans-serif">Inteligência espacial</text>
      <text x="525" y="162" textAnchor="middle" fill="hsl(215 16% 42%)" fontSize="9" fontFamily="Lato, sans-serif">NatureOS · geoanálise</text>
    </g>

    {/* Produtor — esquerda baixo */}
    <g>
      <rect x="40" y="260" width="150" height="60" rx="14" fill="hsl(152 65% 40% / 0.1)" stroke="hsl(152 65% 40% / 0.4)" />
      <text x="115" y="285" textAnchor="middle" fill="hsl(152 65% 30%)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">PRODUTOR</text>
      <text x="115" y="304" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="10" fontWeight="600" fontFamily="Lato, sans-serif">protagonista</text>
    </g>

    {/* Mercado — direita baixo */}
    <g>
      <rect x="450" y="260" width="150" height="60" rx="14" fill="hsl(214 95% 54% / 0.1)" stroke="hsl(214 95% 54% / 0.4)" />
      <text x="525" y="285" textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">MERCADO</text>
      <text x="525" y="304" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="10" fontWeight="600" fontFamily="Lato, sans-serif">acesso &amp; reconhecimento</text>
    </g>
  </svg>
);

/* Slide 04 — Timeline horizontal da jornada */
const JourneySteps = () => {
  const etapas = [
    { icon: Radar, t: "Diagnóstico" },
    { icon: GraduationCap, t: "Capacitação" },
    { icon: Database, t: "Organização" },
    { icon: FileCheck, t: "Validação" },
    { icon: Fingerprint, t: "Passaporte Digital" },
    { icon: Store, t: "Mercado" },
  ];
  return (
    <div className="relative w-full">
      <div className="absolute left-10 right-10 top-[46px] h-1 rounded-full bg-gradient-to-r from-accent via-accent-glow to-accent opacity-70" />
      <div className="grid grid-cols-6 gap-3 relative">
        {etapas.map((e, i) => (
          <div key={e.t} className="flex flex-col items-center text-center">
            <div className="text-[11px] font-mono font-bold text-accent tracking-widest mb-2">
              0{i + 1}
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-accent opacity-25 blur-xl rounded-full" />
              <div
                className={`relative size-24 rounded-full grid place-items-center border-2 ${
                  i === etapas.length - 1
                    ? "bg-gradient-accent border-accent-glow shadow-cta"
                    : "bg-primary border-accent"
                }`}
              >
                <e.icon
                  className={`size-10 ${
                    i === etapas.length - 1 ? "text-accent-foreground" : "text-accent-glow"
                  }`}
                />
              </div>
            </div>
            <div className="mt-5 font-display font-bold text-[22px] text-primary leading-tight">
              {e.t}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Slide 07 — Ciclo virtuoso (8 nós) */
const VirtuousCycle = () => {
  const nos = [
    { icon: HandHeart, t: "Produtores preparados" },
    { icon: FileCheck, t: "Evidências" },
    { icon: Award, t: "Reconhecimento" },
    { icon: Store, t: "Acesso a mercado" },
    { icon: Coins, t: "Mais renda" },
    { icon: Home, t: "Comunidades fortes" },
    { icon: TreePine, t: "Territórios preservados" },
    { icon: ShieldCheck, t: "Confiança na cadeia" },
  ];
  const cx = 320;
  const cy = 320;
  const r = 230;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 640 640" className="w-full h-full max-h-[560px]">
        <defs>
          <linearGradient id="cyc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(214 95% 54%)" />
            <stop offset="100%" stopColor="hsl(199 95% 60%)" />
          </linearGradient>
          <marker id="cyc-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(199 95% 60%)" />
          </marker>
          <radialGradient id="cyc-glow">
            <stop offset="0%" stopColor="hsl(199 95% 60%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(214 95% 54%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={r + 40} fill="url(#cyc-glow)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#cyc-grad)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />

        {/* centro */}
        <circle cx={cx} cy={cy} r="88" fill="hsl(222 65% 14%)" stroke="hsl(214 95% 54%)" strokeWidth="2" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="11" fontWeight="700" letterSpacing="3" fontFamily="Rubik, sans-serif">CICLO</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800" fontFamily="Rubik, sans-serif">VIRTUOSO</text>
        <text x={cx} y={cy + 36} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Lato, sans-serif">cada elo fortalece o próximo</text>

        {nos.map((n, i) => {
          const angle = (i / nos.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          const next = ((i + 1) / nos.length) * Math.PI * 2 - Math.PI / 2;
          const nx = cx + Math.cos(next) * r;
          const ny = cy + Math.sin(next) * r;
          // arco entre nós
          const midAngle = (angle + next) / 2;
          const mx = cx + Math.cos(midAngle) * (r + 18);
          const my = cy + Math.sin(midAngle) * (r + 18);
          const labelX = cx + Math.cos(angle) * (r + 70);
          const labelY = cy + Math.sin(angle) * (r + 70);
          return (
            <g key={n.t}>
              <path
                d={`M ${x} ${y} Q ${mx} ${my} ${nx} ${ny}`}
                fill="none"
                stroke="url(#cyc-grad)"
                strokeWidth="1.6"
                markerEnd="url(#cyc-arr)"
                opacity="0.75"
              />
              <circle cx={x} cy={y} r="26" fill="#fff" stroke="hsl(214 95% 54%)" strokeWidth="2" />
              <text x={x} y={y + 5} textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="14" fontWeight="700" fontFamily="Rubik, sans-serif">
                {i + 1}
              </text>
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fill="hsl(222 47% 11%)"
                fontSize="13"
                fontWeight="600"
                fontFamily="Lato, sans-serif"
              >
                {n.t}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ============================================================
   SLIDES
   ============================================================ */

/* 01 — O potencial já existe. O reconhecimento ainda não. */
const S01Potencial = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] bg-glow blur-3xl opacity-40" />
        <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
      </>
    }
  >
    <div className="grid grid-cols-12 gap-10 h-full">
      <div className="col-span-7 flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <img src={mytsLogo} alt="MyTS" className="h-8 [filter:invert(1)]" />
          <SectionLabel n="01" label="POR QUE ISSO IMPORTA" light />
        </div>

        <div>
          <h1 className="font-display font-extrabold leading-[1.02] tracking-tight text-6xl md:text-7xl">
            O potencial <span className="text-gradient">já existe</span>.
            <br />
            O reconhecimento <br /> ainda não.
          </h1>
          <p className="mt-8 text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
            Todos os dias, milhões de pequenos produtores, cooperativas, povos indígenas e comunidades tradicionais geram impacto para pessoas, territórios e natureza — conservando biomas, produzindo alimentos e movimentando economias locais.
          </p>
          <p className="mt-4 text-lg text-primary-foreground/60 max-w-2xl">
            Mas boa parte desse valor continua invisível para quem compra, investe ou financia essas cadeias.
          </p>
        </div>

        <div className="text-sm text-primary-foreground/50 font-mono uppercase tracking-widest">
          MyTS · Passaporte da Sociobiodiversidade
        </div>
      </div>

      <div className="col-span-5 flex flex-col justify-center gap-5">
        {[
          { k: "77%", v: "dos estabelecimentos rurais do Brasil são da agricultura familiar", src: "Censo Agropecuário IBGE" },
          { k: "R$ 170 bi", v: "potencial da sociobiodiversidade até 2040", src: "Imaflora · TNC" },
          { k: "30,5%", v: "das florestas do Brasil protegidas por territórios tradicionais", src: "MapBiomas · ISA" },
        ].map((kpi) => (
          <div
            key={kpi.k}
            className="bg-gradient-dark-card border border-primary-foreground/10 rounded-2xl p-6 backdrop-blur"
          >
            <div className="font-display font-extrabold text-4xl text-gradient leading-none">
              {kpi.k}
            </div>
            <div className="mt-3 text-[15px] text-primary-foreground/85 leading-snug">
              {kpi.v}
            </div>
            <div className="mt-2 text-[11px] font-mono uppercase tracking-widest text-primary-foreground/40">
              {kpi.src}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

/* 02 — O desafio */
const S02Desafio = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[380px] [filter:invert(1)]" />}>
    <div className="flex flex-col h-full gap-8">
      <div className="flex items-center justify-between">
        <SectionLabel n="02" label="QUAL É O PROBLEMA" />
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          o desafio não está na produção — está na comprovação
        </div>
      </div>

      <div>
        <h2 className="font-display font-extrabold text-primary text-5xl leading-[1.05] max-w-4xl">
          O valor existe. A comprovação, hoje, <span className="text-gradient">não chega ao mercado</span>.
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <ChallengeFlow />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Building2, t: "Empresas", s: "não conseguem comprovar cadeias com a profundidade que reguladores já exigem" },
          { icon: Users, t: "Consumidores", s: "não sabem quem produziu o que estão comprando" },
          { icon: TrendingUp, t: "Investidores", s: "sem indicadores confiáveis do impacto que financiam" },
          { icon: Target, t: "62%", s: "trocariam de marca sem informação clara sobre origem (Deloitte · GS1)" },
        ].map((c) => (
          <div key={c.t} className="bg-gradient-card border border-border rounded-xl p-5 shadow-card">
            <c.icon className="size-6 text-accent" />
            <div className="mt-3 font-display font-bold text-primary text-lg">{c.t}</div>
            <div className="mt-1 text-[13px] text-muted-foreground leading-snug">{c.s}</div>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

/* 03 — Nossa iniciativa */
const S03Iniciativa = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-glow blur-3xl opacity-30" />
      </>
    }
  >
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <SectionLabel n="03" label="O QUE É" light />
        <Chip light>Nossa iniciativa</Chip>
      </div>

      <div className="mt-6 max-w-4xl">
        <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.05]">
          Como transformamos impacto <br />em <span className="text-gradient">acesso a mercado</span>.
        </h2>
        <p className="mt-5 text-lg text-primary-foreground/75 max-w-3xl">
          A iniciativa integra <strong className="text-primary-foreground">desenvolvimento territorial</strong>, <strong className="text-primary-foreground">tecnologia</strong> e <strong className="text-primary-foreground">inteligência geoespacial</strong> para preparar produtores, cooperativas e comunidades para mercados cada vez mais exigentes. No centro está a <strong className="text-accent-glow">MyTS</strong>, que estrutura dados, evidências e governança ao longo da cadeia.
        </p>
      </div>

      <div className="flex-1 mt-4">
        <InitiativeHub />
      </div>

      <div className="grid grid-cols-6 gap-2 mt-2">
        {["Território", "Capacitação", "Organização", "Evidências", "Passaporte", "Mercado"].map((s, i, arr) => (
          <div
            key={s}
            className="flex items-center justify-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2 text-[13px] font-semibold text-primary-foreground/85"
          >
            {s}
            {i < arr.length - 1 && <ArrowRight className="size-3.5 text-accent-glow" />}
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

/* 04 — Como funciona */
const S04ComoFunciona = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[380px] [filter:invert(1)]" />}>
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <SectionLabel n="04" label="A JORNADA" />
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          seis etapas · uma jornada contínua
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-display font-extrabold text-primary text-5xl leading-[1.05] max-w-4xl">
          Como funciona
        </h2>
      </div>

      <div className="flex-1 flex items-center">
        <JourneySteps />
      </div>

      <div className="text-center">
        <p className="font-display text-2xl text-primary/90 max-w-3xl mx-auto">
          Cada etapa fortalece capacidades que <span className="text-gradient font-bold">permanecem no território</span>.
        </p>
      </div>
    </div>
  </Slide>
);

/* 05 — O que entregamos */
const S05Entregamos = () => {
  const blocos = [
    {
      icon: GraduationCap,
      t: "Desenvolvimento",
      items: ["Diagnóstico territorial", "Capacitação", "Trilhas de evolução", "Acompanhamento contínuo"],
    },
    {
      icon: FileCheck,
      t: "Evidências",
      items: ["Documentos organizados", "Indicadores auditáveis", "Conformidade", "Rastreabilidade & governança"],
    },
    {
      icon: Store,
      t: "Conexão com mercado",
      items: ["Passaporte Digital", "QR Code de transparência", "História do produtor", "Reconhecimento"],
    },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)]" />}>
      <div className="flex flex-col h-full gap-8">
        <div className="flex items-center justify-between">
          <SectionLabel n="05" label="O QUE ENTREGAMOS" />
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            três entregas · um único ecossistema de confiança
          </div>
        </div>

        <div>
          <h2 className="font-display font-extrabold text-primary text-5xl leading-[1.05] max-w-4xl">
            Não vendemos software. Entregamos <span className="text-gradient">jornada</span>.
          </h2>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-6">
          {blocos.map((b, i) => (
            <div
              key={b.t}
              className="relative bg-gradient-card border border-border rounded-2xl p-8 shadow-card flex flex-col"
            >
              <div className="text-[11px] font-mono font-bold text-accent tracking-widest mb-3">
                0{i + 1}
              </div>
              <div className="size-14 rounded-2xl bg-accent/10 grid place-items-center">
                <b.icon className="size-7 text-accent" />
              </div>
              <div className="mt-5 font-display font-extrabold text-primary text-[28px] leading-tight">
                {b.t}
              </div>
              <ul className="mt-5 space-y-2.5">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-[15px] text-primary/85">
                    <span className="mt-2 size-1.5 rounded-full bg-accent flex-shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          A plataforma <span className="text-accent font-semibold">apenas suporta</span> — o valor está na jornada que entregamos junto ao produtor.
        </div>
      </div>
    </Slide>
  );
};

/* 06 — Por que funciona (diferencial + parceiros + cases) */
const S06PorQueFunciona = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-glow blur-3xl opacity-40" />
      </>
    }
  >
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="06" label="POR QUE SOMOS DIFERENTES" light />
        <Chip light>Nossa abordagem</Chip>
      </div>

      <div>
        <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.05] max-w-5xl">
          Não fazemos <span className="line-through opacity-40">apenas</span> auditorias. <br />
          Não entregamos <span className="line-through opacity-40">apenas</span> tecnologia. <br />
          Integramos tudo numa <span className="text-gradient">jornada contínua</span>.
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {[
          {
            logo: null, name: "MyTS", tag: "Infraestrutura digital",
            desc: "Dados, evidências, rastreabilidade, governança e Passaporte Digital.",
          },
          {
            logo: grounddAsset.url, name: "Groundd", tag: "Pessoas & território",
            desc: "Diagnóstico, metodologia CERS, engajamento comunitário e capacitação.",
          },
          {
            logo: ramoAsset.url, name: "RAMO", tag: "Inteligência espacial",
            desc: "NatureOS, geoanálise e integração de dados espaciais sob demanda.",
          },
        ].map((p) => (
          <div key={p.name} className="bg-gradient-dark-card border border-primary-foreground/10 rounded-2xl p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono font-bold text-accent-glow tracking-widest">
                {p.tag.toUpperCase()}
              </div>
              {p.logo ? (
                <PartnerLogo src={p.logo} alt={p.name} className="h-5" variant="light" />
              ) : (
                <img src={mytsLogo} alt="MyTS" className="h-5 [filter:invert(1)]" />
              )}
            </div>
            <div className="mt-4 font-display font-extrabold text-3xl">{p.name}</div>
            <p className="mt-3 text-[14px] text-primary-foreground/75 leading-snug">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="text-[11px] font-mono uppercase tracking-widest text-primary-foreground/50 mb-3">
          Experiência construída em projetos reais
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl px-5 py-4">
            <PartnerLogo src={korinAsset.url} alt="Korin" className="h-7" variant="light" />
            <div>
              <div className="font-display font-bold text-primary-foreground">Korin</div>
              <div className="text-[12px] text-primary-foreground/60">Passaporte Digital para consumidores</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl px-5 py-4">
            <PartnerLogo src={carrefourAsset.url} alt="Carrefour" className="h-7" variant="light" />
            <div>
              <div className="font-display font-bold text-primary-foreground">Carrefour</div>
              <div className="text-[12px] text-primary-foreground/60">Jornada da Autonomia · desenvolvimento de fornecedores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* 07 — O impacto (ciclo virtuoso) */
const S07Impacto = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-16 -bottom-16 w-[340px] [filter:invert(1)]" />}>
    <div className="grid grid-cols-12 gap-8 h-full">
      <div className="col-span-5 flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <SectionLabel n="07" label="O IMPACTO" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-primary text-5xl leading-[1.05]">
            Cada elo fortalecido <br />gera o <span className="text-gradient">próximo</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Produtores preparados geram evidências. Evidências geram reconhecimento. Reconhecimento abre mercado. Mercado gera renda. Renda fortalece comunidades — e comunidades fortes preservam territórios.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: HandHeart, t: "Social" },
              { icon: TreePine, t: "Ambiental" },
              { icon: Coins, t: "Econômico" },
            ].map((d) => (
              <div key={d.t} className="rounded-xl border border-border bg-gradient-card p-4 text-center">
                <d.icon className="size-6 text-accent mx-auto" />
                <div className="mt-2 text-sm font-display font-bold text-primary">{d.t}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-primary/70 italic">
          Esse é o propósito da MyTS.
        </div>
      </div>

      <div className="col-span-7">
        <VirtuousCycle />
      </div>
    </div>
  </Slide>
);

/* 08 — Quem somos */
const S08QuemSomos = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] bg-glow blur-3xl opacity-40" />
      </>
    }
  >
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="08" label="QUEM SOMOS" light />
        <img src={mytsLogo} alt="MyTS" className="h-7 [filter:invert(1)]" />
      </div>

      <div>
        <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.05]">
          Três organizações. <span className="text-gradient">Uma única jornada.</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {[
          {
            name: "MyTS", role: "My Trusted Source",
            desc: "Infraestrutura tecnológica e metodológica que transforma informação dispersa em confiança, desenvolvimento e acesso a mercado.",
            logo: null,
          },
          {
            name: "Groundd", role: "Impacto & território",
            desc: "Empresa liderada por mulheres, especializada em desenvolvimento territorial, engajamento comunitário e metodologia CERS.",
            logo: grounddAsset.url,
          },
          {
            name: "RAMO", role: "Nature-tech · geoespacial",
            desc: "Inteligência geoespacial sob demanda via NatureOS, mapeando áreas produtivas e gerando evidência espacial de território.",
            logo: ramoAsset.url,
          },
        ].map((o) => (
          <div key={o.name} className="bg-gradient-dark-card border border-primary-foreground/10 rounded-2xl p-6 backdrop-blur">
            <div className="h-8 flex items-center">
              {o.logo ? (
                <PartnerLogo src={o.logo} alt={o.name} className="h-6" variant="light" />
              ) : (
                <img src={mytsLogo} alt="MyTS" className="h-6 [filter:invert(1)]" />
              )}
            </div>
            <div className="mt-4 font-display font-extrabold text-2xl">{o.name}</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent-glow mt-1">{o.role}</div>
            <p className="mt-3 text-[13px] text-primary-foreground/75 leading-snug">{o.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {[
          { n: "Valmir Rodrigues", r: "CEO · MyTS", d: "Lidera a construção de infraestrutura de confiança para cadeias produtivas no Brasil e no exterior." },
          { n: "Marisa Rodrigues", r: "Fundadora · Groundd", d: "Atuação em desenvolvimento territorial, governança comunitária e prontidão socioambiental." },
          { n: "Federico Ferlito", r: "Head de GIS · RAMO", d: "Lidera a camada de inteligência geoespacial da iniciativa." },
        ].map((p) => (
          <div key={p.n} className="border-t border-primary-foreground/10 pt-4">
            <div className="font-display font-bold text-lg text-primary-foreground">{p.n}</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent-glow mt-0.5">{p.r}</div>
            <p className="mt-2 text-[13px] text-primary-foreground/65 leading-snug">{p.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-primary-foreground/10 pt-5">
        <div className="flex items-center gap-6 text-primary-foreground/80">
          <a href="mailto:valmir@myt-s.com" className="flex items-center gap-2 text-sm hover:text-accent-glow">
            <Mail className="size-4" /> valmir@myt-s.com
          </a>
          <a href="https://myt-s.com" className="flex items-center gap-2 text-sm hover:text-accent-glow">
            <Globe className="size-4" /> myt-s.com
          </a>
        </div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-primary-foreground/40">
          Fortalecemos pessoas · conectamos territórios
        </div>
      </div>
    </div>
  </Slide>
);

/* ============================================================
   Página
   ============================================================ */
const MytsPassaporte = () => (
  <main
    className="bg-[#0a0e1a]"
    style={{
      margin: 0,
      padding: "32px 0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      overflowX: "hidden",
    }}
  >
    <style>{`
      html,body,#root{margin:0;padding:0;background:#0a0e1a}
      html{scroll-snap-type:y proximity}
      .slide-frame{container-type:inline-size;container-name:slide}
      .slide-inner{overflow:hidden}
    `}</style>
    <Helmet>
      <title>MyTS — O potencial já existe. O reconhecimento ainda não.</title>
      <meta
        name="description"
        content="MyTS: infraestrutura que fortalece produtores, organiza evidências socioambientais e conecta cadeias produtivas ao mercado — em uma única jornada contínua com Groundd e RAMO."
      />
    </Helmet>
    <S01Potencial />
    <S02Desafio />
    <S03Iniciativa />
    <S04ComoFunciona />
    <S05Entregamos />
    <S06PorQueFunciona />
    <S07Impacto />
    <S08QuemSomos />
  </main>
);

export default MytsPassaporte;
