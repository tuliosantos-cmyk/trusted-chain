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
  Store,
  Mail,
  Globe,
  GraduationCap,
  TreePine,
  HandHeart,
  Coins,
  FileSpreadsheet,
  MessageCircle,
  FileText,
  EyeOff,
  TrendingDown,
  Radar,
  Fingerprint,
  Scale,
  Quote,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import grounddAsset from "@/assets/logos/groundd.png.asset.json";
import ramoAsset from "@/assets/logos/ramo.png.asset.json";
import korinAsset from "@/assets/logos/korin.png.asset.json";
import carrefourAsset from "@/assets/logos/carrefour.png.asset.json";
import produtorImg from "@/assets/passaporte/produtor.jpg";
import valmirAsset from "@/assets/team/valmir.png.asset.json";
import marisaAsset from "@/assets/team/marisa.png.asset.json";

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
    className={`inline-flex items-center gap-3 rounded-full border px-6 py-2.5 text-base font-semibold tracking-[0.18em] uppercase ${
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
    className={`flex items-center gap-4 text-base font-semibold uppercase tracking-[0.22em] ${
      light ? "text-accent-glow" : "text-accent"
    }`}
  >
    <span className="font-mono">{n}</span>
    <span className={`h-px w-16 ${light ? "bg-accent-glow/60" : "bg-accent/50"}`} />
    {label}
  </div>
);

const Slide = ({
  bg = "bg-background",
  className = "",
  children,
  decor,
  pad = "p-10 md:p-14",
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

/* Slide 02 — Fluxo do desafio */
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
                className={`relative size-28 rounded-3xl grid place-items-center border-2 shadow-elegant ${
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
                  className={`size-12 ${
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
                className={`mt-4 font-display font-bold text-[18px] leading-tight max-w-[160px] ${
                  n.tone === "warn" ? "text-destructive" : "text-primary"
                }`}
              >
                {n.t}
              </div>
            </div>
            {i < nos.length - 1 && (
              <div className="col-span-1 flex items-center justify-center -mt-8">
                <ArrowRight className="size-8 text-muted-foreground/60" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* Slide 03 — Hub da abordagem */
const InitiativeHub = () => (
  <svg viewBox="0 0 640 380" className="w-full h-full" role="img" aria-label="MyTS no núcleo, Groundd e RAMO como camadas complementares" preserveAspectRatio="xMidYMid meet">
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

    <line x1="180" y1="130" x2="320" y2="190" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />
    <line x1="180" y1="260" x2="320" y2="190" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />
    <line x1="460" y1="130" x2="320" y2="190" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />
    <line x1="460" y1="260" x2="320" y2="190" stroke="url(#hub-accent)" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />

    <circle cx="320" cy="190" r="150" fill="url(#hub-glow)" />
    <circle cx="320" cy="190" r="96" fill="hsl(222 65% 14%)" stroke="hsl(214 95% 54%)" strokeWidth="2" />
    <circle cx="320" cy="190" r="118" fill="none" stroke="hsl(199 95% 60%)" strokeWidth="1" strokeDasharray="2 6" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" from="0 320 190" to="360 320 190" dur="24s" repeatCount="indefinite" />
    </circle>
    <text x="320" y="172" textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="11" fontWeight="700" letterSpacing="3" fontFamily="Rubik, sans-serif">INFRAESTRUTURA</text>
    <text x="320" y="206" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="800" fontFamily="Rubik, sans-serif">MyTS</text>
    <text x="320" y="228" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Lato, sans-serif">dados · evidências · governança</text>

    <g>
      <rect x="30" y="95" width="170" height="80" rx="16" fill="#fff" stroke="hsl(214 32% 91%)" />
      <text x="115" y="125" textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="12" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">GROUNDD</text>
      <text x="115" y="147" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="13" fontWeight="600" fontFamily="Lato, sans-serif">Pessoas · Território</text>
      <text x="115" y="163" textAnchor="middle" fill="hsl(215 16% 42%)" fontSize="11" fontFamily="Lato, sans-serif">CERS · capacitação</text>
    </g>

    <g>
      <rect x="440" y="95" width="170" height="80" rx="16" fill="#fff" stroke="hsl(214 32% 91%)" />
      <text x="525" y="125" textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="12" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">RAMO</text>
      <text x="525" y="147" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="13" fontWeight="600" fontFamily="Lato, sans-serif">Inteligência espacial</text>
      <text x="525" y="163" textAnchor="middle" fill="hsl(215 16% 42%)" fontSize="11" fontFamily="Lato, sans-serif">NatureOS · geoanálise</text>
    </g>

    <g>
      <rect x="30" y="225" width="170" height="72" rx="16" fill="hsl(152 65% 40% / 0.14)" stroke="hsl(152 65% 40% / 0.45)" />
      <text x="115" y="253" textAnchor="middle" fill="hsl(152 65% 30%)" fontSize="12" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">PRODUTOR</text>
      <text x="115" y="277" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="12" fontWeight="600" fontFamily="Lato, sans-serif">protagonista</text>
    </g>

    <g>
      <rect x="440" y="225" width="170" height="72" rx="16" fill="hsl(214 95% 54% / 0.12)" stroke="hsl(214 95% 54% / 0.45)" />
      <text x="525" y="253" textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="12" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">MERCADO</text>
      <text x="525" y="277" textAnchor="middle" fill="hsl(222 47% 11%)" fontSize="12" fontWeight="600" fontFamily="Lato, sans-serif">acesso &amp; reconhecimento</text>
    </g>
  </svg>
);

/* Slide 04 — Timeline horizontal + parceiro por etapa */
const JourneySteps = () => {
  const etapas = [
    { icon: Radar, t: "Diagnóstico", by: "Groundd" },
    { icon: GraduationCap, t: "Capacitação", by: "Groundd" },
    { icon: Database, t: "Organização", by: "MyTS" },
    { icon: FileCheck, t: "Evidências", by: "MyTS + RAMO" },
    { icon: Fingerprint, t: "Passaporte Digital", by: "MyTS" },
    { icon: Store, t: "Mercado", by: "resultado" },
  ];
  return (
    <div className="relative w-full">
      <div className="absolute left-12 right-12 top-[124px] h-1.5 rounded-full bg-gradient-to-r from-accent via-accent-glow to-accent opacity-70" />
      <div className="grid grid-cols-6 gap-4 relative">
        {etapas.map((e, i) => (
          <div key={e.t} className="flex flex-col items-center text-center">
            <div className="text-[13px] font-mono font-bold text-accent tracking-widest mb-2">
              0{i + 1}
            </div>
            <div className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-[12px] font-mono font-bold tracking-widest uppercase text-accent">
              {e.by}
            </div>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-accent opacity-25 blur-xl rounded-full" />
              <div
                className={`relative size-32 rounded-full grid place-items-center border-2 ${
                  i === etapas.length - 1
                    ? "bg-gradient-accent border-accent-glow shadow-cta"
                    : "bg-primary border-accent"
                }`}
              >
                <e.icon
                  className={`size-14 ${
                    i === etapas.length - 1 ? "text-accent-foreground" : "text-accent-glow"
                  }`}
                />
              </div>
            </div>
            <div className="mt-6 font-display font-bold text-[26px] text-primary leading-tight">
              {e.t}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Slide 08 — Ciclo virtuoso */
const VirtuousCycle = () => {
  const nos = [
    { t: "Produtores preparados" },
    { t: "Evidências" },
    { t: "Reconhecimento" },
    { t: "Acesso a mercado" },
    { t: "Mais renda" },
    { t: "Comunidades fortes" },
    { t: "Territórios preservados" },
    { t: "Confiança na cadeia" },
  ];
  const cx = 340;
  const cy = 340;
  const r = 250;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 680 680" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cyc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(214 95% 54%)" />
            <stop offset="100%" stopColor="hsl(199 95% 60%)" />
          </linearGradient>
          <marker id="cyc-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(199 95% 60%)" />
          </marker>
          <radialGradient id="cyc-glow">
            <stop offset="0%" stopColor="hsl(199 95% 60%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(214 95% 54%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={r + 50} fill="url(#cyc-glow)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#cyc-grad)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />

        <circle cx={cx} cy={cy} r="102" fill="hsl(222 65% 14%)" stroke="hsl(214 95% 54%)" strokeWidth="2" />
        <text x={cx} y={cy - 10} textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily="Rubik, sans-serif">CICLO</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily="Rubik, sans-serif">VIRTUOSO</text>
        <text x={cx} y={cy + 42} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Lato, sans-serif">cada elo fortalece o próximo</text>

        {nos.map((n, i) => {
          const angle = (i / nos.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          const next = ((i + 1) / nos.length) * Math.PI * 2 - Math.PI / 2;
          const nx = cx + Math.cos(next) * r;
          const ny = cy + Math.sin(next) * r;
          const midAngle = (angle + next) / 2;
          const mx = cx + Math.cos(midAngle) * (r + 20);
          const my = cy + Math.sin(midAngle) * (r + 20);
          const labelX = cx + Math.cos(angle) * (r + 78);
          const labelY = cy + Math.sin(angle) * (r + 78);
          return (
            <g key={n.t}>
              <path
                d={`M ${x} ${y} Q ${mx} ${my} ${nx} ${ny}`}
                fill="none"
                stroke="url(#cyc-grad)"
                strokeWidth="1.8"
                markerEnd="url(#cyc-arr)"
                opacity="0.75"
              />
              <circle cx={x} cy={y} r="32" fill="#fff" stroke="hsl(214 95% 54%)" strokeWidth="2" />
              <text x={x} y={y + 6} textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="18" fontWeight="700" fontFamily="Rubik, sans-serif">
                {i + 1}
              </text>
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fill="hsl(222 47% 11%)"
                fontSize="16"
                fontWeight="700"
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

/* 01 — O potencial já existe. */
const S01Potencial = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-40 -right-40 w-[640px] h-[640px] bg-glow blur-3xl opacity-40" />
        <MytsWatermark className="-right-20 -bottom-20 w-[520px]" />
      </>
    }
  >
    <div className="grid grid-cols-12 gap-10 h-full">
      <div className="col-span-7 flex flex-col justify-between">
        <div className="flex items-center gap-5">
          <img src={mytsLogo} alt="MyTS" className="h-10 [filter:invert(1)]" />
          <SectionLabel n="01" label="POR QUE ISSO IMPORTA" light />
        </div>

        <div>
          <h1 className="font-display font-extrabold leading-[1.0] tracking-tight text-7xl md:text-8xl">
            O potencial <span className="text-gradient">já existe</span>.
            <br />
            O reconhecimento <br /> ainda não.
          </h1>
          <p className="mt-10 text-2xl text-primary-foreground/85 leading-relaxed max-w-2xl">
            Todos os dias, milhões de pequenos produtores, cooperativas, povos indígenas e comunidades tradicionais conservam florestas, produzem alimentos e mantêm conhecimentos que sustentam pessoas, territórios e economias inteiras.
          </p>
          <p className="mt-5 text-xl text-primary-foreground/60 max-w-2xl">
            Ainda assim, boa parte desse valor permanece invisível para quem compra, investe ou financia essas cadeias.
          </p>
        </div>

        <div className="text-sm text-primary-foreground/50 font-mono uppercase tracking-[0.25em]">
          MyTS · Passaporte Digital
        </div>
      </div>

      <div className="col-span-5 flex flex-col gap-5 min-h-0">
        <div className="relative rounded-2xl overflow-hidden border border-primary-foreground/15 shadow-elegant flex-[0_0_44%]">
          <img src={produtorImg} alt="Produtor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          <div className="absolute bottom-6 left-7 right-7">
            <div className="text-[12px] font-mono uppercase tracking-[0.28em] text-accent-glow">
              O verdadeiro protagonista
            </div>
            <div className="mt-2 font-display font-bold text-primary-foreground text-2xl leading-tight">
              O produtor que conserva, cultiva e sustenta cadeias inteiras.
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {[
            { k: "77%", v: "dos estabelecimentos rurais do Brasil são da agricultura familiar", src: "Censo Agropecuário IBGE" },
            { k: "R$ 170 bi", v: "potencial da sociobiodiversidade até 2040", src: "Imaflora · TNC" },
            { k: "30,5%", v: "das florestas do Brasil protegidas por territórios tradicionais", src: "MapBiomas · ISA" },
          ].map((kpi) => (
            <div
              key={kpi.k}
              className="flex-1 bg-gradient-dark-card border border-primary-foreground/10 rounded-2xl px-6 py-5 backdrop-blur flex items-center gap-6"
            >
              <div className="font-display font-extrabold text-4xl text-gradient leading-none min-w-[140px]">
                {kpi.k}
              </div>
              <div className="flex-1">
                <div className="text-[16px] text-primary-foreground/90 leading-snug">
                  {kpi.v}
                </div>
                <div className="mt-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-foreground/45">
                  {kpi.src}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Slide>
);

/* 02 — O desafio */
const S02Desafio = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[460px] [filter:invert(1)]" />}>
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="02" label="QUAL É O PROBLEMA" />
        <div className="text-sm font-mono uppercase tracking-[0.22em] text-muted-foreground">
          o desafio não está na produção — está na comprovação
        </div>
      </div>

      <h2 className="font-display font-extrabold text-primary text-7xl md:text-[88px] leading-[1.0] max-w-6xl">
        O valor existe. A comprovação, hoje, <span className="text-gradient">não chega ao mercado</span>.
      </h2>

      <div className="flex-1 flex items-center min-h-0">
        <ChallengeFlow />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            icon: Building2,
            t: "Empresas",
            kpi: "7 países",
            s: "com leis de due diligence de cadeia (EUDR, CSDDD, UK, França, Alemanha, EUA e Noruega) já exigindo rastreabilidade auditável",
          },
          {
            icon: Users,
            t: "Consumidores",
            kpi: "62%",
            s: "trocariam de marca sem informação clara sobre origem e impacto (Deloitte · GS1)",
          },
          {
            icon: TrendingUp,
            t: "Investidores",
            kpi: "US$ 1,5 tri",
            s: "em fundos de impacto exigem métricas verificáveis — sem evidência, não há alocação (GIIN 2024)",
          },
        ].map((c) => (
          <div key={c.t} className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-center justify-between">
              <div className="size-14 rounded-2xl bg-accent/10 grid place-items-center">
                <c.icon className="size-8 text-accent" />
              </div>
              <div className="text-[12px] font-mono uppercase tracking-[0.22em] text-muted-foreground">{c.t}</div>
            </div>
            <div className="mt-5 font-display font-extrabold text-5xl leading-none text-gradient">{c.kpi}</div>
            <div className="mt-4 text-[17px] text-muted-foreground leading-snug">{c.s}</div>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

/* 03 — Nossa abordagem */
const S03Abordagem = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] bg-glow blur-3xl opacity-30" />
      </>
    }
  >
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="03" label="O QUE É" light />
        <Chip light>Nossa abordagem</Chip>
      </div>

      <div className="max-w-5xl">
        <h2 className="font-display font-extrabold text-6xl md:text-7xl leading-[1.02]">
          Como transformamos impacto <br />em <span className="text-gradient">acesso a mercado</span>.
        </h2>
        <p className="mt-5 text-xl text-primary-foreground/80 max-w-3xl">
          Uma iniciativa que integra <strong className="text-primary-foreground">desenvolvimento territorial</strong>, <strong className="text-primary-foreground">infraestrutura digital</strong> e <strong className="text-primary-foreground">inteligência geoespacial</strong> — com o produtor no centro.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        <div className="col-span-7 flex items-center justify-center min-h-0">
          <InitiativeHub />
        </div>
        <div className="col-span-5 flex flex-col gap-5 justify-center">
          {[
            {
              logo: null, name: "MyTS", tag: "Infraestrutura digital",
              desc: "Dados, evidências, rastreabilidade e Passaporte Digital.",
            },
            {
              logo: grounddAsset.url, name: "Groundd", tag: "Pessoas & território",
              desc: "Metodologia CERS, engajamento comunitário e capacitação.",
            },
            {
              logo: ramoAsset.url, name: "RAMO", tag: "Inteligência espacial",
              desc: "NatureOS · geoanálise e evidência espacial de território.",
            },
          ].map((p) => (
            <div key={p.name} className="bg-gradient-dark-card border border-primary-foreground/10 rounded-2xl p-6 backdrop-blur flex items-center gap-5">
              <div className="size-16 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 grid place-items-center flex-shrink-0">
                {p.logo ? (
                  <PartnerLogo src={p.logo} alt={p.name} className="h-8" variant="light" />
                ) : (
                  <img src={mytsLogo} alt="MyTS" className="h-7 [filter:invert(1)]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <div className="font-display font-extrabold text-2xl">{p.name}</div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent-glow">{p.tag}</div>
                </div>
                <p className="text-[15px] text-primary-foreground/75 leading-snug mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Slide>
);

/* 04 — Como funciona */
const S04ComoFunciona = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[460px] [filter:invert(1)]" />}>
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="04" label="A JORNADA" />
        <div className="text-sm font-mono uppercase tracking-[0.22em] text-muted-foreground">
          seis etapas · uma jornada contínua
        </div>
      </div>

      <div>
        <h2 className="font-display font-extrabold text-primary text-6xl md:text-7xl leading-[1.02] max-w-5xl">
          Como funciona
        </h2>
        <p className="mt-3 text-muted-foreground text-xl max-w-4xl">
          Cada etapa tem uma organização responsável — e cada organização entrega o que sabe fazer melhor.
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <JourneySteps />
      </div>

      <div className="text-center">
        <p className="font-display text-3xl text-primary/90 max-w-4xl mx-auto leading-tight">
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
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[440px] [filter:invert(1)]" />}>
      <div className="flex flex-col h-full gap-6">
        <div className="flex items-center justify-between">
          <SectionLabel n="05" label="O QUE ENTREGAMOS" />
          <div className="text-sm font-mono uppercase tracking-[0.22em] text-muted-foreground">
            três entregas · um único ecossistema de confiança
          </div>
        </div>

        {/* Assinatura tipográfica gigante */}
        <div className="relative">
          <div className="absolute -left-4 -top-6 text-[180px] leading-none text-accent/10 font-display font-black select-none">"</div>
          <h2 className="relative font-display font-black text-primary text-[88px] md:text-[104px] leading-[0.95] tracking-tight max-w-6xl">
            Não vendemos <span className="line-through text-muted-foreground/40 font-bold">software</span>.
            <br />
            Entregamos <span className="text-gradient">jornada</span>.
          </h2>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-8 min-h-0">
          {blocos.map((b, i) => (
            <div
              key={b.t}
              className="relative bg-gradient-card border border-border rounded-2xl p-10 shadow-card flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-mono font-bold text-accent tracking-[0.22em]">
                  0{i + 1}
                </div>
                <div className="size-16 rounded-2xl bg-accent/10 grid place-items-center">
                  <b.icon className="size-8 text-accent" />
                </div>
              </div>
              <div className="mt-6 font-display font-extrabold text-primary text-4xl leading-tight">
                {b.t}
              </div>
              <ul className="mt-6 space-y-3.5 flex-1">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[18px] text-primary/85">
                    <span className="mt-2.5 size-2 rounded-full bg-accent flex-shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

/* 06 — Antes → Depois */
const S06AntesDepois = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-16 -bottom-16 w-[420px] [filter:invert(1)]" />}>
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="06" label="O QUE MUDA NA PRÁTICA" />
        <div className="text-sm font-mono uppercase tracking-[0.22em] text-muted-foreground">
          da invisibilidade ao reconhecimento
        </div>
      </div>

      <div>
        <h2 className="font-display font-extrabold text-primary text-6xl md:text-7xl leading-[1.02] max-w-5xl">
          Antes e depois de <span className="text-gradient">passar pela jornada</span>.
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Retrato */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-elegant flex-1 min-h-0">
            <img src={produtorImg} alt="Produtor" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-primary-foreground">
              <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-accent-glow">exemplo</div>
              <div className="font-display font-extrabold text-3xl leading-tight mt-1">José</div>
              <div className="text-sm text-primary-foreground/80">Produtor de cacau · Sul da Bahia</div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-gradient-card p-5">
            <Quote className="size-5 text-accent" />
            <p className="mt-2 text-[15px] italic text-primary/80 leading-snug">
              "O impacto sempre esteve no meu trabalho. Faltava só quem enxergasse."
            </p>
          </div>
        </div>

        {/* Antes */}
        <div className="col-span-4 bg-muted/40 border border-border rounded-2xl p-8 flex flex-col">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-full bg-destructive/10 grid place-items-center">
              <XCircle className="size-7 text-destructive" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-muted-foreground">antes da jornada</div>
              <div className="font-display font-extrabold text-primary text-3xl leading-tight">Invisível</div>
            </div>
          </div>
          <ul className="mt-6 space-y-4 flex-1">
            {[
              "Documentos espalhados em pastas e no WhatsApp",
              "Nunca participou de capacitação formal",
              "Vende apenas para o atravessador local",
              "Não consegue provar boas práticas socioambientais",
              "Renda instável, sem acesso a mercado premium",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[17px] text-primary/80 leading-snug">
                <span className="mt-2.5 size-2 rounded-full bg-destructive/60 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Seta */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-16 rounded-full bg-gradient-accent grid place-items-center shadow-cta">
              <ArrowRight className="size-8 text-accent-foreground" />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent text-center leading-tight">
              jornada<br />MyTS
            </div>
          </div>
        </div>

        {/* Depois */}
        <div className="col-span-4 bg-primary text-primary-foreground border border-accent/30 rounded-2xl p-8 flex flex-col relative overflow-hidden">
          <div className="absolute -right-20 -top-20 size-72 bg-glow opacity-40" />
          <div className="relative flex items-center gap-4">
            <div className="size-14 rounded-full bg-success/20 grid place-items-center">
              <CheckCircle2 className="size-7 text-success" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-accent-glow">depois da jornada</div>
              <div className="font-display font-extrabold text-primary-foreground text-3xl leading-tight">Reconhecido</div>
            </div>
          </div>
          <ul className="relative mt-6 space-y-4 flex-1">
            {[
              "Documentos e evidências centralizados na MyTS",
              "Capacitado em boas práticas e governança",
              "Cooperativa organizada, com dados auditáveis",
              "Passaporte Digital: história e impacto rastreáveis via QR",
              "Acessa compradores exigentes — Korin, redes, exportação",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[17px] text-primary-foreground/90 leading-snug">
                <CheckCircle2 className="size-5 text-accent-glow mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </Slide>
);

/* 07 — Por que somos diferentes */
const S07Diferencial = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -top-40 -left-40 w-[620px] h-[620px] bg-glow blur-3xl opacity-40" />
      </>
    }
  >
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="07" label="POR QUE SOMOS DIFERENTES" light />
        <Chip light>Diferencial</Chip>
      </div>

      <div>
        <h2 className="font-display font-extrabold text-6xl md:text-7xl leading-[1.02] max-w-6xl">
          Não fazemos <span className="line-through opacity-40">apenas</span> auditorias.<br />
          Não entregamos <span className="line-through opacity-40">apenas</span> tecnologia.<br />
          Integramos tudo numa <span className="text-gradient">jornada contínua</span>.
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: HandHeart, t: "Pessoas antes de plataforma", d: "O produtor é o ponto de partida — não o consumidor final da tecnologia." },
          { icon: Scale, t: "Metodologia + tecnologia", d: "Capacitação de campo, evidência espacial e infraestrutura digital numa única entrega." },
          { icon: ShieldCheck, t: "Confiança auditável", d: "Cada dado tem origem, versão e rastreabilidade — pronto para regulador, comprador e financiador." },
        ].map((d) => (
          <div key={d.t} className="bg-gradient-dark-card border border-primary-foreground/10 rounded-2xl p-8 backdrop-blur">
            <div className="size-14 rounded-xl bg-accent/15 grid place-items-center">
              <d.icon className="size-7 text-accent-glow" />
            </div>
            <div className="mt-5 font-display font-extrabold text-2xl">{d.t}</div>
            <p className="mt-3 text-[16px] text-primary-foreground/75 leading-snug">{d.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="text-sm font-mono uppercase tracking-[0.22em] text-primary-foreground/50 mb-4">
          Já aplicado em
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-6 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl px-8 py-6">
            <PartnerLogo src={korinAsset.url} alt="Korin" className="h-12" variant="light" />
            <div>
              <div className="font-display font-bold text-primary-foreground text-2xl">Korin</div>
              <div className="text-[15px] text-primary-foreground/60 mt-0.5">Passaporte Digital em produtos que chegam ao consumidor final</div>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl px-8 py-6">
            <PartnerLogo src={carrefourAsset.url} alt="Carrefour" className="h-12" variant="light" />
            <div>
              <div className="font-display font-bold text-primary-foreground text-2xl">Carrefour</div>
              <div className="text-[15px] text-primary-foreground/60 mt-0.5">Jornada da Autonomia · desenvolvimento de fornecedores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* 08 — O impacto */
const S08Impacto = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-16 -bottom-16 w-[400px] [filter:invert(1)]" />}>
    <div className="grid grid-cols-12 gap-10 h-full">
      <div className="col-span-5 flex flex-col justify-between">
        <SectionLabel n="08" label="O IMPACTO" />

        <div>
          <div className="text-sm font-mono uppercase tracking-[0.28em] text-accent mb-5">
            Comece pelo propósito
          </div>
          <h2 className="font-display font-extrabold text-primary text-[56px] leading-[1.02]">
            Quando fortalecemos <span className="text-gradient">quem produz</span>,
          </h2>
          <ul className="mt-7 space-y-3 text-2xl text-primary/85 leading-tight">
            <li>fortalecemos <strong className="text-primary">comunidades</strong>,</li>
            <li>que fortalecem <strong className="text-primary">territórios</strong>,</li>
            <li>que fortalecem <strong className="text-primary">cadeias</strong>,</li>
            <li>que fortalecem <strong className="text-primary">mercados</strong>.</li>
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: HandHeart, t: "Social" },
              { icon: TreePine, t: "Ambiental" },
              { icon: Coins, t: "Econômico" },
            ].map((d) => (
              <div key={d.t} className="rounded-xl border border-border bg-gradient-card p-5 text-center">
                <d.icon className="size-8 text-accent mx-auto" />
                <div className="mt-2 text-base font-display font-bold text-primary">{d.t}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-lg text-primary/70 italic">
          Esse é o propósito da MyTS.
        </div>
      </div>

      <div className="col-span-7 min-h-0">
        <VirtuousCycle />
      </div>
    </div>
  </Slide>
);

/* 09 — Quem somos */
const S09QuemSomos = () => (
  <Slide
    bg="bg-hero"
    className="text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -bottom-40 -right-40 w-[620px] h-[620px] bg-glow blur-3xl opacity-40" />
      </>
    }
  >
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel n="09" label="QUEM SOMOS" light />
        <img src={mytsLogo} alt="MyTS" className="h-8 [filter:invert(1)]" />
      </div>

      <div>
        <h2 className="font-display font-extrabold text-6xl md:text-7xl leading-[1.02]">
          Três organizações. <span className="text-gradient">Uma única jornada.</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            name: "MyTS", role: "My Trusted Source",
            desc: "Infraestrutura tecnológica e metodológica que transforma informação dispersa em confiança e acesso a mercado.",
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
          <div key={o.name} className="bg-gradient-dark-card border border-primary-foreground/10 rounded-2xl p-7 backdrop-blur">
            <div className="h-10 flex items-center">
              {o.logo ? (
                <PartnerLogo src={o.logo} alt={o.name} className="h-8" variant="light" />
              ) : (
                <img src={mytsLogo} alt="MyTS" className="h-8 [filter:invert(1)]" />
              )}
            </div>
            <div className="mt-5 font-display font-extrabold text-3xl">{o.name}</div>
            <div className="text-[12px] font-mono uppercase tracking-[0.22em] text-accent-glow mt-1.5">{o.role}</div>
            <p className="mt-4 text-[15px] text-primary-foreground/75 leading-snug">{o.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            n: "Valmir Rodrigues",
            r: "CEO · MyTS",
            d: "Empreendedor com mais de 20 anos em cadeias de fornecimento de alimentos. Fundou a MyTS para simplificar a qualificação de fornecedores, ampliar governança e reduzir riscos com tecnologia prática e centrada nas pessoas.",
            photo: valmirAsset.url,
          },
          {
            n: "Marisa Rodrigues",
            r: "CEO · Groundd",
            d: "Zootecnista e fundadora da Groundd. Atua com comunidades, governos, ONGs e empresas para estruturar iniciativas de comércio responsável e negócios positivos para a natureza — protegendo paisagens e criando oportunidades reais.",
            photo: marisaAsset.url,
          },
          {
            n: "Time RAMO",
            r: "Inteligência geoespacial",
            d: "Camada de inteligência espacial da iniciativa, com o NatureOS como base de evidência territorial. Bios em breve.",
            photo: null,
          },
        ].map((p) => (
          <div key={p.n} className="border-t border-primary-foreground/10 pt-5 flex gap-5">
            <div className="size-24 rounded-full bg-primary-foreground/5 border border-primary-foreground/15 grid place-items-center flex-shrink-0 overflow-hidden">
              {p.photo ? (
                <img src={p.photo} alt={p.n} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display font-bold text-primary-foreground/40 text-3xl">
                  {p.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold text-xl text-primary-foreground leading-tight">{p.n}</div>
              <div className="text-[12px] font-mono uppercase tracking-[0.22em] text-accent-glow mt-1">{p.r}</div>
              <p className="mt-2 text-[14px] text-primary-foreground/75 leading-snug">{p.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-primary-foreground/10 pt-6">
        <div className="flex items-center gap-8 text-primary-foreground/80">
          <a href="mailto:valmir@myt-s.com" className="flex items-center gap-2.5 text-base hover:text-accent-glow">
            <Mail className="size-5" /> valmir@myt-s.com
          </a>
          <a href="https://myt-s.com" className="flex items-center gap-2.5 text-base hover:text-accent-glow">
            <Globe className="size-5" /> myt-s.com
          </a>
        </div>
        <div className="text-[12px] font-mono uppercase tracking-[0.22em] text-primary-foreground/45">
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
    <S03Abordagem />
    <S04ComoFunciona />
    <S05Entregamos />
    <S06AntesDepois />
    <S07Diferencial />
    <S08Impacto />
    <S09QuemSomos />
  </main>
);

export default MytsPassaporte;
