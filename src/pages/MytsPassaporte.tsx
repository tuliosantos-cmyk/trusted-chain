import { Helmet } from "react-helmet-async";
import {
  Sprout,
  ArrowRight,
  QrCode,
  ShieldCheck,
  Users,
  Building2,
  Landmark,
  ShoppingBag,
  TrendingUp,
  Scale,
  FileCheck,
  Route,
  BarChart3,
  Database,
  Satellite,
  MapPin,
  CheckCircle2,
  HeartHandshake,
  Store,
  Leaf,
  Mail,
  Globe,
  Compass,
  Layers,
  Target,
  Zap,
  Fingerprint,
  Radar,
  Wallet,
  GraduationCap,
  Award,
  TreePine,
  HandHeart,
  Home,
  Coins,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import grounddAsset from "@/assets/logos/groundd.png.asset.json";
import ramoAsset from "@/assets/logos/ramo.png.asset.json";
import korinAsset from "@/assets/logos/korin.png.asset.json";
import carrefourAsset from "@/assets/logos/carrefour.png.asset.json";
import produtorImg from "@/assets/passaporte/produtor.jpg";
import geoImg from "@/assets/passaporte/geolocalizacao.jpg";
import korinMockup from "@/assets/korin/mockup-qr-embalagem.jpg";

/* Chip branco com a logo do parceiro — legibilidade sobre fundo navy */
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
    <span className="inline-flex items-center justify-center rounded-lg bg-background px-3 py-1.5 shadow-card">
      <img src={src} alt={alt} className={`${className} w-auto object-contain`} />
    </span>
  );

/* ============================================================
   Primitivos compartilhados
   ============================================================ */
const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-5 py-2 text-sm font-medium tracking-wide uppercase text-primary-foreground/80">
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
   Peças visuais customizadas
   ============================================================ */

/* Diagrama linear — Slide 06 · Jornada de Desenvolvimento */
const JornadaDesenvolvimento = () => {
  const etapas = [
    { icon: Radar, t: "Diagnóstico", s: "compreensão da realidade produtiva" },
    { icon: GraduationCap, t: "Capacitação", s: "fortalecimento de capacidades" },
    { icon: Sprout, t: "Desenvolvimento", s: "evolução contínua das práticas" },
    { icon: Database, t: "Organização", s: "estruturação das informações" },
    { icon: FileCheck, t: "Evidências", s: "construção de dados confiáveis" },
    { icon: Award, t: "Reconhecimento", s: "valorização do trabalho realizado" },
    { icon: Store, t: "Mercado", s: "acesso e novas oportunidades" },
  ];
  return (
    <div className="relative h-full w-full flex flex-col justify-center">
      {/* trilho */}
      <div className="absolute left-8 right-8 top-1/2 -translate-y-[46px] h-1 rounded-full bg-gradient-to-r from-accent via-accent-glow to-accent opacity-70" />
      <div className="grid grid-cols-7 gap-3 relative">
        {etapas.map((e, i) => (
          <div key={e.t} className="flex flex-col items-center text-center">
            <div className="text-[11px] font-mono font-bold text-accent tracking-widest mb-2">
              0{i + 1}
            </div>
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-accent opacity-25 blur-xl rounded-full" />
              <div className={`relative size-20 rounded-full grid place-items-center border-2 ${
                i === 6
                  ? "bg-gradient-accent border-accent-glow shadow-cta"
                  : "bg-primary border-accent"
              }`}>
                <e.icon className={`size-9 ${i === 6 ? "text-accent-foreground" : "text-accent-glow"}`} />
              </div>
            </div>
            <div className="mt-4 font-display font-bold text-xl text-primary leading-tight">
              {e.t}
            </div>
            <div className="mt-2 text-sm text-muted-foreground leading-snug max-w-[160px]">
              {e.s}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Diagrama circular — Slide 10 · Ciclo de Desenvolvimento Contínuo */
const CicloVirtuoso = () => {
  const nos = [
    { icon: HandHeart, t: "Produtores fortalecidos" },
    { icon: Sprout, t: "Melhores práticas" },
    { icon: FileCheck, t: "Mais evidências" },
    { icon: Award, t: "Reconhecimento" },
    { icon: Store, t: "Acesso a mercados" },
    { icon: Coins, t: "Mais renda" },
    { icon: Home, t: "Comunidades fortes" },
    { icon: TreePine, t: "Territórios preservados" },
  ];
  const radius = 240;
  const cx = 320;
  const cy = 320;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 640 640" className="w-full h-full max-h-[560px]">
        <defs>
          <linearGradient id="cycle-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(214 95% 54%)" />
            <stop offset="100%" stopColor="hsl(199 95% 60%)" />
          </linearGradient>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(199 95% 60%)" />
          </marker>
        </defs>
        {/* anel */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="url(#cycle-grad)" strokeWidth="2.5" strokeDasharray="4 8" opacity="0.55" />
        <circle cx={cx} cy={cy} r={radius - 4} fill="none" stroke="hsl(199 95% 60%)" strokeWidth="0.8" opacity="0.15" />

        {/* setas orbitais */}
        {nos.map((_, i) => {
          const a1 = (i / nos.length) * Math.PI * 2 - Math.PI / 2 + 0.18;
          const a2 = ((i + 1) / nos.length) * Math.PI * 2 - Math.PI / 2 - 0.18;
          const x1 = cx + Math.cos(a1) * radius;
          const y1 = cy + Math.sin(a1) * radius;
          const x2 = cx + Math.cos(a2) * radius;
          const y2 = cy + Math.sin(a2) * radius;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="hsl(199 95% 60%)"
              strokeWidth="2"
              markerEnd="url(#arr)"
              opacity="0.7"
            />
          );
        })}

        {/* núcleo */}
        <circle cx={cx} cy={cy} r="105" fill="hsl(222 65% 14%)" stroke="hsl(214 95% 54%)" strokeWidth="2" />
        <text x={cx} y={cy - 18} textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily="Rubik, sans-serif">
          CICLO
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily="Rubik, sans-serif">
          Virtuoso
        </text>
        <text x={cx} y={cy + 32} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="Lato, sans-serif">
          quando quem produz evolui,
        </text>
        <text x={cx} y={cy + 48} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="Lato, sans-serif">
          toda a cadeia evolui junto
        </text>
      </svg>

      {/* nós HTML sobrepostos */}
      {nos.map((n, i) => {
        const a = (i / nos.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (Math.cos(a) * radius * 100) / 640;
        const y = 50 + (Math.sin(a) * radius * 100) / 640;
        return (
          <div
            key={n.t}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="flex flex-col items-center gap-2 w-[150px]"
          >
            <div className="size-14 rounded-full bg-background border-2 border-accent shadow-elegant grid place-items-center">
              <n.icon className="size-6 text-accent" />
            </div>
            <div className="rounded-lg bg-background/95 backdrop-blur border border-border px-2.5 py-1.5 text-center shadow-card">
              <div className="text-[13px] font-semibold text-primary leading-tight">
                {n.t}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* Mockup Smartphone com Passaporte — Slide 09 */
const MockupPassaporte = () => (
  <div className="relative flex items-center justify-center h-full">
    <div className="absolute -inset-6 bg-gradient-accent opacity-25 blur-3xl rounded-full" />
    <div className="relative w-[340px] rounded-[44px] bg-primary p-3.5 border border-primary-foreground/10 shadow-2xl">
      <div className="relative rounded-[34px] overflow-hidden bg-background aspect-[9/18]">
        <div className="absolute top-0 inset-x-0 h-7 bg-primary/5 flex items-center justify-between px-5 z-10">
          <span className="text-[10px] font-semibold text-primary">9:41</span>
          <span className="text-[10px] text-primary/70">MyTS</span>
        </div>
        <div className="pt-9 px-5 pb-3 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
          <div className="text-[10px] uppercase tracking-widest text-accent-glow font-bold">
            Passaporte Digital
          </div>
          <div className="mt-1 font-display font-bold text-2xl leading-tight">
            Cacau Silvestre
          </div>
          <div className="text-xs text-primary-foreground/70">
            Comunidade Ribeirinha · Amazonas
          </div>
        </div>

        <div className="px-4 pt-3 grid grid-cols-2 gap-2">
          {[
            { src: produtorImg, label: "Produtor", caption: "Seu Raimundo" },
            { src: geoImg, label: "Território", caption: "-5.78, -67.34" },
          ].map((m) => (
            <div
              key={m.label}
              className="relative rounded-lg overflow-hidden border border-border bg-primary/5 aspect-[4/3]"
            >
              <img
                src={m.src}
                alt={m.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent px-1.5 py-1">
                <div className="text-[8px] uppercase tracking-wider text-accent-glow font-bold leading-none">
                  {m.label}
                </div>
                <div className="text-[9px] font-semibold text-primary-foreground truncate leading-tight">
                  {m.caption}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pt-3 pb-16 space-y-2">
          {[
            { icon: Users, t: "Quem produz", v: "42 famílias" },
            { icon: MapPin, t: "Onde é produzido", v: "Médio Juruá, AM" },
            { icon: Leaf, t: "Como é produzido", v: "Extrativismo agroflorestal" },
            { icon: ShieldCheck, t: "Evidências", v: "12 documentos" },
            { icon: HeartHandshake, t: "Impacto social", v: "Renda + comunidade" },
          ].map((r) => (
            <div
              key={r.t}
              className="flex items-center gap-3 rounded-lg border border-border bg-gradient-card px-3 py-1.5"
            >
              <div className="size-7 rounded-md bg-accent/10 grid place-items-center shrink-0">
                <r.icon className="size-4 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {r.t}
                </div>
                <div className="text-xs font-semibold text-primary truncate">
                  {r.v}
                </div>
              </div>
              <CheckCircle2 className="size-4 text-accent shrink-0" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 inset-x-4">
          <div className="rounded-lg bg-gradient-accent text-accent-foreground text-center text-xs font-bold py-2.5">
            Conheça esta história
          </div>
        </div>
      </div>
    </div>

    <div className="absolute -left-8 top-10 rounded-2xl bg-background border border-border shadow-elegant p-4 rotate-[-6deg]">
      <div className="grid grid-cols-8 gap-0.5 w-[104px]">
        {Array.from({ length: 64 }).map((_, i) => {
          const on = (i * 7 + (i % 5) * 3) % 3 !== 0;
          return (
            <span
              key={i}
              className={`aspect-square ${on ? "bg-primary" : "bg-transparent"} rounded-[1px]`}
            />
          );
        })}
      </div>
      <div className="mt-2 text-center text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
        scan
      </div>
    </div>
  </div>
);

/* ============================================================
   SLIDES
   ============================================================ */

/* ---------- 01 · CAPA ---------- */
const S01Capa = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute -top-40 left-1/3 w-[900px] h-[900px] bg-glow opacity-60 pointer-events-none blur-3xl rounded-full" />
        <MytsWatermark className="-right-24 -bottom-24 w-[520px]" />
      </>
    }
  >
    <div className="flex h-full items-center gap-14">
      <div className="flex-1 min-w-0">
        <Chip>
          <Fingerprint className="size-5 text-accent-glow" />
          Deck institucional · MyTS
        </Chip>

        <h1 className="mt-10 font-display font-bold text-[132px] leading-[0.9] tracking-tight text-primary-foreground">
          Fortalecendo <span className="text-gradient">pessoas</span>,<br />
          conectando <span className="text-gradient">territórios</span>.
        </h1>

        <p className="mt-8 text-3xl text-primary-foreground/85 max-w-4xl leading-snug">
          Uma infraestrutura de confiança para transformar boas práticas em{" "}
          <span className="text-primary-foreground font-semibold">desenvolvimento, evidências e acesso a mercado</span>.
        </p>

        <div className="mt-12 flex items-center gap-8 flex-wrap">
          <div className="rounded-2xl bg-primary-foreground/10 border border-primary-foreground/15 px-7 py-5">
            <div className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-3 font-semibold">
              Iniciativa liderada por
            </div>
            <div className="flex items-center gap-6">
              <img src={mytsLogo} alt="MyTS" className="h-9" />
              <span className="text-primary-foreground/40 text-2xl">·</span>
              <PartnerLogo src={grounddAsset.url} alt="Groundd" className="h-8" variant="dark" />
              <PartnerLogo src={ramoAsset.url} alt="RAMO" className="h-8" variant="dark" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-end gap-6 shrink-0">
        <img src={mytsLogo} alt="MyTS" className="h-24 opacity-95" />
        <div className="text-right text-primary-foreground/60 text-sm uppercase tracking-widest">
          My Trusted Source
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 02 · O MUNDO MUDOU ---------- */
const S02Mundo = () => {
  const forcas = [
    { icon: Users, t: "Consumidores", d: "querem conhecer quem produz." },
    { icon: ShoppingBag, t: "Empresas", d: "precisam comprovar suas cadeias." },
    { icon: TrendingUp, t: "Investidores", d: "exigem evidências de impacto." },
    { icon: Scale, t: "Reguladores", d: "ampliam exigências ESG." },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[420px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="01" label="O mundo mudou" />

      <h2 className="mt-5 font-display font-bold text-[56px] text-primary leading-[1.02] max-w-6xl">
        O mercado já não compra apenas produtos.<br />
        Compra <span className="text-gradient">histórias, transparência e impacto</span>.
      </h2>

      <div className="mt-8 grid grid-cols-4 gap-5 flex-1 min-h-0">
        {forcas.map((f, i) => (
          <div
            key={f.t}
            className="relative rounded-2xl border border-border bg-gradient-card shadow-card p-8 flex flex-col justify-center overflow-hidden"
          >
            <div className="absolute top-5 right-6 font-display font-bold text-4xl text-accent/25 leading-none">
              0{i + 1}
            </div>
            <div className="size-20 rounded-2xl bg-gradient-accent grid place-items-center shadow-cta">
              <f.icon className="size-10 text-accent-foreground" />
            </div>
            <div className="mt-6 font-display font-bold text-4xl text-primary leading-[1.05]">
              {f.t}
            </div>
            <div className="mt-4 text-xl text-muted-foreground leading-snug">
              {f.d}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border-l-4 border-accent bg-accent/5 px-6 py-4 text-lg text-primary">
        E ainda assim, boa parte desse valor{" "}
        <span className="font-semibold">continua invisível para o mercado</span>.
      </div>
    </Slide>
  );
};

/* ---------- 03 · PATRIMÔNIO INVISÍVEL — PRODUTOR PROTAGONISTA ---------- */
const S03Patrimonio = () => (
  <Slide bg="bg-background" pad="p-0" decor={<MytsWatermark className="-right-16 -bottom-16 w-[380px] [filter:invert(1)] opacity-[0.04]" />}>
    <div className="grid grid-cols-[1.1fr_1fr] h-full">
      {/* Coluna imagem — o protagonista */}
      <div className="relative overflow-hidden">
        <img
          src={produtorImg}
          alt="Produtor familiar em seu território"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

        <div className="absolute top-10 left-10 right-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-glow text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 shadow-cta">
            <Sprout className="size-4" />
            Os verdadeiros protagonistas
          </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 text-primary-foreground">
          <div className="text-sm uppercase tracking-widest text-accent-glow font-semibold mb-2">
            Todos os dias
          </div>
          <div className="font-display font-bold text-4xl leading-[1.1]">
            Produtores familiares, povos indígenas,<br />
            comunidades tradicionais e cooperativas<br />
            <span className="text-accent-glow">geram valor</span> para pessoas,<br />
            territórios e natureza.
          </div>
        </div>
      </div>

      {/* Coluna texto */}
      <div className="p-14 flex flex-col justify-center">
        <SectionLabel n="02" label="Patrimônio invisível" />

        <h2 className="mt-5 font-display font-bold text-[48px] text-primary leading-[1.05]">
          Existe um <span className="text-gradient">patrimônio</span> que o mercado ainda não enxerga.
        </h2>

        <div className="mt-8 space-y-4">
          {[
            { icon: Leaf, t: "Produzem alimentos", d: "com técnicas afinadas ao território" },
            { icon: TreePine, t: "Conservam biomas", d: "protegendo florestas e mananciais" },
            { icon: Brain, t: "Mantêm conhecimentos tradicionais", d: "acumulados por gerações" },
            { icon: HandHeart, t: "Fortalecem economias locais", d: "gerando renda e coesão social" },
          ].map((r) => (
            <div key={r.t} className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-gradient-accent grid place-items-center shrink-0">
                <r.icon className="size-6 text-accent-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-primary leading-tight">{r.t}</div>
                <div className="text-base text-muted-foreground">{r.d}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-lg text-primary/85 leading-snug border-l-4 border-accent pl-5">
          Não falta impacto. Falta{" "}
          <span className="font-semibold">organização, reconhecimento e evidências</span>{" "}
          para que esse impacto chegue ao mercado.
        </p>
      </div>
    </div>
  </Slide>
);

/* Importa Brain aqui pois só é usado no S03 */
import { Brain } from "lucide-react";

/* ---------- 04 · O DESAFIO ---------- */
const S04Desafio = () => {
  const barreiras = [
    { icon: Sprout, t: "Produtores", d: "enfrentam barreiras para acessar novos mercados." },
    { icon: Building2, t: "Compradores", d: "não conseguem comprovar suas cadeias." },
    { icon: TrendingUp, t: "Investidores", d: "encontram dificuldade para avaliar impacto." },
    { icon: Users, t: "Consumidores", d: "não reconhecem quem produz de forma responsável." },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[400px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="03" label="O desafio" />

      <h2 className="mt-5 font-display font-bold text-[52px] text-primary leading-[1.05] max-w-6xl">
        O problema não é produzir.<br />
        É conseguir <span className="text-gradient">demonstrar</span>.
      </h2>

      <p className="mt-5 text-xl text-muted-foreground max-w-4xl leading-snug">
        Boas práticas permanecem invisíveis quando informações ficam dispersas em planilhas,
        documentos, certificados, fotos, e-mails e conhecimento local.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-5 flex-1 min-h-0">
        {barreiras.map((b, i) => (
          <div
            key={b.t}
            className="relative rounded-2xl border border-border bg-gradient-card shadow-card p-8 pl-10 flex items-center gap-6 overflow-hidden"
          >
            <div className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-gradient-accent" />
            <div className="font-display font-bold text-5xl text-accent/40 leading-none w-14 shrink-0">
              0{i + 1}
            </div>
            <div className="size-16 rounded-xl bg-primary/5 border border-border grid place-items-center shrink-0">
              <b.icon className="size-8 text-accent" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-2xl text-primary leading-tight">
                {b.t}
              </div>
              <div className="mt-1 text-lg text-muted-foreground leading-snug">
                {b.d}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-primary text-primary-foreground px-6 py-5 flex items-center justify-between">
        <div className="font-display font-bold text-2xl leading-tight">
          O valor existe.
        </div>
        <ArrowRight className="size-5 text-accent-glow" />
        <div className="font-display font-bold text-2xl leading-tight text-accent-glow">
          Mas ainda não consegue ser percebido.
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 05 · NOSSA VISÃO ---------- */
const S05Visao = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-glow opacity-60 pointer-events-none blur-3xl rounded-full" />
        <MytsWatermark className="-left-20 -top-20 w-[420px]" />
      </>
    }
  >
    <SectionLabel n="04" label="Nossa visão" light />

    <div className="mt-6 grid grid-cols-[1.2fr_1fr] gap-14 flex-1 min-h-0 items-center">
      <div>
        <h2 className="font-display font-bold text-[76px] text-primary-foreground leading-[0.98]">
          Quando fortalecemos{" "}
          <span className="text-gradient">quem produz</span>,<br />
          fortalecemos toda a cadeia.
        </h2>

        <p className="mt-8 text-2xl text-primary-foreground/85 leading-snug max-w-2xl">
          Desenvolvimento sustentável começa pelas pessoas. Por isso colocamos{" "}
          <span className="text-accent-glow font-semibold">produtores, cooperativas e comunidades</span>{" "}
          no centro da transformação.
        </p>
      </div>

      <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur p-9">
        <div className="text-sm uppercase tracking-[0.24em] text-accent-glow font-semibold mb-6">
          Nosso papel vai além da rastreabilidade
        </div>
        <div className="space-y-4">
          {[
            { icon: GraduationCap, t: "Fortalecemos capacidades" },
            { icon: Database, t: "Organizamos informações" },
            { icon: FileCheck, t: "Construímos evidências" },
            { icon: Award, t: "Geramos reconhecimento" },
            { icon: Store, t: "Criamos acesso a mercado" },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-4">
              <div className="size-11 rounded-lg bg-accent/15 border border-accent/30 grid place-items-center shrink-0">
                <r.icon className="size-5 text-accent-glow" />
              </div>
              <div className="text-xl text-primary-foreground font-medium">{r.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 06 · JORNADA DE DESENVOLVIMENTO ---------- */
const S06Jornada = () => (
  <Slide bg="bg-background" pad="p-10 md:p-12" decor={<MytsWatermark className="-right-20 -bottom-20 w-[380px] [filter:invert(1)] opacity-[0.04]" />}>
    <SectionLabel n="05" label="Jornada de desenvolvimento" />

    <h2 className="mt-3 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
      Uma jornada contínua —{" "}
      <span className="text-gradient">do território ao mercado</span>.
    </h2>

    <p className="mt-3 text-lg text-muted-foreground max-w-4xl">
      Cada empreendimento percorre uma trajetória de evolução: compreende requisitos,
      fortalece sua gestão, registra boas práticas e estrutura evidências confiáveis.
    </p>

    <div className="mt-6 flex-1 min-h-0">
      <JornadaDesenvolvimento />
    </div>

    <p className="mt-4 text-center text-lg text-muted-foreground italic">
      A tecnologia MyTS{" "}
      <span className="font-semibold text-primary not-italic">acompanha e potencializa cada etapa</span>.
    </p>
  </Slide>
);

/* ---------- 07 · A MYTS ---------- */
const S07AMyts = () => {
  const caps = [
    { icon: Users, t: "Gestão de fornecedores" },
    { icon: FileCheck, t: "Gestão documental" },
    { icon: GraduationCap, t: "Desenvolvimento contínuo" },
    { icon: Route, t: "Rastreabilidade" },
    { icon: Leaf, t: "Evidências socioambientais" },
    { icon: BarChart3, t: "Dashboards & indicadores" },
    { icon: QrCode, t: "Passaporte Digital" },
    { icon: ShieldCheck, t: "Governança de cadeia" },
  ];
  return (
    <Slide
      bg="bg-hero"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -right-40 top-1/4 w-[700px] h-[700px] bg-glow opacity-40 pointer-events-none blur-3xl rounded-full" />
          <MytsWatermark className="-left-20 -top-20 w-[420px]" />
        </>
      }
    >
      <SectionLabel n="06" label="A MyTS" light />

      <div className="mt-5 grid grid-cols-[1fr_1.15fr] gap-14 flex-1 min-h-0 items-center">
        <div>
          <h2 className="font-display font-bold text-[64px] text-primary-foreground leading-[1] max-w-xl">
            A infraestrutura que conecta{" "}
            <span className="text-gradient">pessoas, territórios e mercados</span>.
          </h2>

          <p className="mt-7 text-xl text-primary-foreground/80 leading-relaxed max-w-xl">
            Atuamos como a{" "}
            <span className="text-primary-foreground font-semibold">infraestrutura tecnológica e metodológica</span>{" "}
            da iniciativa. Transformamos informações dispersas em uma base confiável de dados
            que apoia o desenvolvimento dos produtores e fortalece a governança das cadeias.
          </p>

          <div className="mt-7 rounded-xl border-l-4 border-accent-glow bg-primary-foreground/5 backdrop-blur px-6 py-5 max-w-xl">
            <div className="text-lg text-primary-foreground/90 leading-snug">
              Mais do que rastrear produtos —{" "}
              <span className="text-accent-glow font-semibold">
                organizamos relações de confiança
              </span>.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {caps.map((c) => (
            <div
              key={c.t}
              className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur px-5 py-4 flex items-center gap-4"
            >
              <div className="size-11 rounded-lg bg-accent/15 border border-accent/30 grid place-items-center shrink-0">
                <c.icon className="size-5 text-accent-glow" />
              </div>
              <div className="text-lg font-semibold text-primary-foreground leading-tight">
                {c.t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 08 · ECOSSISTEMA DE COMPETÊNCIAS ---------- */
const S08Ecossistema = () => {
  const parceiros = [
    {
      nome: "Groundd",
      papel: "Território & Comunidades",
      icon: HandHeart,
      itens: [
        "Desenvolvimento territorial",
        "Engajamento comunitário",
        "Metodologia CERS",
        "Diagnósticos participativos",
        "Capacitação",
      ],
    },
    {
      nome: "MyTS",
      papel: "Infraestrutura Digital",
      icon: Database,
      itens: [
        "Gestão de fornecedores",
        "Rastreabilidade",
        "Passaporte Digital",
        "Governança & indicadores",
      ],
      destaque: true,
    },
    {
      nome: "RAMO",
      papel: "Inteligência Geoespacial",
      icon: Satellite,
      itens: [
        "NatureOS",
        "Geoanálise",
        "Mensuração territorial",
        "Integração de dados espaciais",
      ],
    },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[380px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="07" label="Ecossistema de competências" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        Pessoas, tecnologia e território —{" "}
        <span className="text-gradient">trabalhando juntos</span>.
      </h2>

      <div className="mt-8 grid grid-cols-3 gap-6 flex-1 min-h-0 items-stretch">
        {parceiros.map((p) => {
          const logoSrc =
            p.nome === "Groundd" ? grounddAsset.url : p.nome === "RAMO" ? ramoAsset.url : null;
          return (
            <div
              key={p.nome}
              className={`relative rounded-2xl p-8 flex flex-col ${
                p.destaque
                  ? "bg-primary text-primary-foreground border-2 border-accent shadow-glow scale-[1.03]"
                  : "bg-gradient-card border border-border shadow-card"
              }`}
            >
              {p.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5">
                  Infraestrutura
                </div>
              )}
              {logoSrc ? (
                <div className="rounded-xl bg-background border border-border grid place-items-center px-5 py-3.5 h-20 self-start">
                  <img src={logoSrc} alt={p.nome} className="h-11 w-auto object-contain" />
                </div>
              ) : (
                <div className={`size-20 rounded-2xl grid place-items-center ${p.destaque ? "bg-gradient-accent" : "bg-primary/10"}`}>
                  <p.icon className={`size-10 ${p.destaque ? "text-accent-foreground" : "text-primary"}`} />
                </div>
              )}
              <div className={`mt-6 font-display font-bold text-5xl leading-tight ${p.destaque ? "text-primary-foreground" : "text-primary"}`}>
                {p.nome}
              </div>
              <div className={`mt-2 text-lg uppercase tracking-widest font-semibold ${p.destaque ? "text-accent-glow" : "text-accent"}`}>
                {p.papel}
              </div>
              <div className={`mt-5 h-px ${p.destaque ? "bg-primary-foreground/15" : "bg-border"}`} />
              <div className="mt-5 space-y-3 flex-1">
                {p.itens.map((it) => (
                  <div key={it} className="flex items-start gap-3">
                    <CheckCircle2 className={`size-5 mt-0.5 shrink-0 ${p.destaque ? "text-accent-glow" : "text-accent"}`} />
                    <span className={`text-base ${p.destaque ? "text-primary-foreground/90" : "text-primary/80"}`}>
                      {it}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-lg text-muted-foreground">
        Competências complementares.{" "}
        <span className="font-semibold text-primary">Uma única jornada de desenvolvimento.</span>
      </p>
    </Slide>
  );
};

/* ---------- 09 · PASSAPORTE DIGITAL ---------- */
const S09Passaporte = () => {
  const bullets = [
    "Quem produziu",
    "Onde foi produzido",
    "Quais práticas foram adotadas",
    "Quais evidências sustentam",
    "Quais impactos foram gerados",
    "Território e comunidade",
  ];
  return (
    <Slide
      bg="bg-hero"
      pad="p-12 md:p-16"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -right-40 top-1/4 w-[700px] h-[700px] bg-glow opacity-40 pointer-events-none blur-3xl rounded-full" />
        </>
      }
    >
      <SectionLabel n="08" label="Quando a confiança se torna visível" light />

      <div className="mt-6 grid grid-cols-[1.1fr_1fr] gap-12 flex-1 min-h-0 items-center">
        <div className="flex flex-col justify-center">
          <h2 className="font-display font-bold text-[68px] text-primary-foreground leading-[1.02] max-w-2xl">
            Cada produto pode contar{" "}
            <span className="text-gradient">sua própria história</span>.
          </h2>

          <p className="mt-7 text-2xl text-primary-foreground/80 max-w-xl leading-relaxed">
            Ao final da jornada, toda a evolução construída pelos produtores é comunicada
            de forma simples pelo Passaporte Digital:
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4 max-w-xl">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle2 className="size-6 text-accent-glow shrink-0" />
                <span className="text-primary-foreground/90 text-lg">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 rounded-xl border-l-4 border-accent-glow bg-primary-foreground/5 backdrop-blur px-7 py-6 max-w-xl">
            <div className="text-xl text-primary-foreground/90 leading-snug">
              O QR Code não é apenas tecnologia —{" "}
              <span className="text-accent-glow font-semibold">
                é a ponte entre quem produz e quem consome
              </span>.
            </div>
          </div>
        </div>

        <MockupPassaporte />
      </div>
    </Slide>
  );
};

/* ---------- 10 · CICLO DE DESENVOLVIMENTO CONTÍNUO ---------- */
const S10Ciclo = () => (
  <Slide bg="bg-background" pad="p-8 md:p-10" decor={<MytsWatermark className="-right-16 -bottom-16 w-[320px] [filter:invert(1)] opacity-[0.04]" />}>
    <SectionLabel n="09" label="Ciclo virtuoso" />

    <div className="mt-3 grid grid-cols-[1fr_1.2fr] gap-8 flex-1 min-h-0 items-center">
      <div>
        <h2 className="font-display font-bold text-[54px] text-primary leading-[1.02]">
          Quando produtores evoluem,{" "}
          <span className="text-gradient">toda a cadeia evolui junto</span>.
        </h2>

        <p className="mt-5 text-lg text-muted-foreground leading-snug max-w-xl">
          Um ciclo contínuo em que fortalecimento gera evidências, evidências geram
          reconhecimento, reconhecimento gera renda e renda fortalece comunidades e territórios.
        </p>

        <div className="mt-6 space-y-3">
          {[
            { t: "Impacto social", d: "renda, coesão e inclusão produtiva", icon: HandHeart },
            { t: "Impacto ambiental", d: "conservação de biomas e territórios", icon: TreePine },
            { t: "Impacto econômico", d: "acesso a mercado e novos investimentos", icon: Coins },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-4 rounded-xl border border-border bg-gradient-card px-5 py-4">
              <div className="size-11 rounded-lg bg-gradient-accent grid place-items-center shrink-0">
                <r.icon className="size-5 text-accent-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-primary leading-tight">{r.t}</div>
                <div className="text-sm text-muted-foreground">{r.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-full flex items-center justify-center">
        <CicloVirtuoso />
      </div>
    </div>
  </Slide>
);

/* ---------- 11 · EXPERIÊNCIA (CASES) ---------- */
const S11Experiencia = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />}>
    <SectionLabel n="10" label="Experiência construída em desafios reais" />

    <h2 className="mt-4 font-display font-bold text-[44px] text-primary leading-[1.05] max-w-4xl">
      A metodologia nasce da{" "}
      <span className="text-gradient">experiência acumulada</span> em cadeias produtivas.
    </h2>

    <p className="mt-3 text-base text-muted-foreground max-w-3xl leading-snug">
      Agora essa experiência é ampliada para apoiar cadeias da sociobiodiversidade,
      agricultura regenerativa e iniciativas de impacto territorial.
    </p>

    <div className="mt-5 grid grid-cols-2 gap-6 flex-1 min-h-0 items-stretch">
      {/* ---------- CASE KORIN ---------- */}
      <div className="relative rounded-3xl bg-gradient-card border border-border shadow-elegant overflow-hidden flex flex-col">
        <div className="flex items-center gap-4 px-6 pt-5 pb-4 border-b border-border/70">
          <div className="rounded-xl bg-background border border-border shadow-card px-3 py-2">
            <img src={korinAsset.url} alt="Korin" className="h-7 w-auto object-contain" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">
              Case · Consumidor
            </div>
            <div className="font-display font-bold text-xl text-primary leading-tight truncate">
              Transparência para o consumidor
            </div>
          </div>
        </div>

        <div className="relative px-5 pt-4">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-card aspect-[16/8]">
            <img
              src={korinMockup}
              alt="Consumidor escaneando QR Code em embalagem Korin"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 rounded-full bg-primary/90 backdrop-blur text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
              QR na embalagem
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex-1 flex flex-col gap-4">
          <ul className="space-y-1.5">
            {[
              "Origem, bem-estar animal e boas práticas contadas ao consumidor",
              "Passaporte Digital acessado direto na gôndola",
              "Canal contínuo entre marca, produtor e consumidor",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-primary/85 leading-snug">
                <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {["Bem-estar animal", "Origem verificada", "Storytelling"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider"
              >
                <Leaf className="size-3.5" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- CASE CARREFOUR ---------- */}
      <div className="relative rounded-3xl bg-gradient-card border border-border shadow-elegant overflow-hidden flex flex-col">
        <div className="flex items-center gap-4 px-6 pt-5 pb-4 border-b border-border/70">
          <div className="rounded-xl bg-background border border-border shadow-card px-3 py-2">
            <img src={carrefourAsset.url} alt="Carrefour" className="h-7 w-auto object-contain" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">
              Case · Desenvolvimento de fornecedores
            </div>
            <div className="font-display font-bold text-xl text-primary leading-tight truncate">
              Jornada da Autonomia
            </div>
          </div>
        </div>

        <div className="relative px-5 pt-4">
          <div className="relative rounded-2xl overflow-hidden border border-primary/15 shadow-card aspect-[16/8] bg-primary text-primary-foreground">
            <div className="flex items-center justify-between px-4 py-2 bg-primary-foreground/5 border-b border-primary-foreground/10">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-destructive/70" />
                <span className="size-2 rounded-full bg-yellow-400/70" />
                <span className="size-2 rounded-full bg-success/70" />
              </div>
              <div className="text-[9px] font-mono text-primary-foreground/60 tracking-wider">
                jornada-da-autonomia · MyTS
              </div>
              <div className="size-3 rounded-full bg-accent-glow/40" />
            </div>

            <div className="grid grid-cols-[110px_1fr] h-[calc(100%-24px)]">
              <div className="border-r border-primary-foreground/10 py-3 px-2.5 space-y-1.5 bg-primary-foreground/[0.03]">
                {[
                  { i: BarChart3, l: "Painel", on: true },
                  { i: Users, l: "Fornecedores" },
                  { i: FileCheck, l: "Docs" },
                  { i: Route, l: "Tiers" },
                  { i: ShieldCheck, l: "Conformidade" },
                ].map((m) => (
                  <div
                    key={m.l}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 ${
                      m.on ? "bg-accent/20 text-accent-glow" : "text-primary-foreground/55"
                    }`}
                  >
                    <m.i className="size-3" />
                    <span className="text-[9px] font-semibold truncate">{m.l}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 space-y-1.5">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { n: "247", l: "Fornecedores" },
                    { n: "92%", l: "Conformidade" },
                    { n: "3", l: "Tiers" },
                  ].map((k) => (
                    <div key={k.l} className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 px-2 py-1.5">
                      <div className="text-[9px] uppercase tracking-widest text-primary-foreground/50">{k.l}</div>
                      <div className="font-display font-bold text-lg leading-none text-accent-glow mt-0.5">{k.n}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] uppercase tracking-widest text-primary-foreground/60 font-semibold">Evolução mensal</div>
                    <div className="text-[9px] text-accent-glow font-mono">+18%</div>
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {[35, 48, 42, 60, 55, 72, 68, 84, 78, 92, 88, 95].map((h, idx) => (
                      <div key={idx} className={`flex-1 rounded-sm ${idx === 11 ? "bg-accent-glow" : "bg-accent/50"}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    { l: "Tier 1 — Distribuidores", v: 96 },
                    { l: "Tier 2 — Processadores", v: 84 },
                    { l: "Tier 3 — Produtores", v: 61 },
                  ].map((p) => (
                    <div key={p.l}>
                      <div className="flex items-center justify-between text-[9px] text-primary-foreground/70">
                        <span className="truncate">{p.l}</span>
                        <span className="font-mono text-accent-glow">{p.v}%</span>
                      </div>
                      <div className="mt-1 h-1 rounded-full bg-primary-foreground/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-accent" style={{ width: `${p.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-9 right-3 rounded-full bg-accent-glow/95 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
              Dashboard ESG
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex-1 flex flex-col gap-4">
          <ul className="space-y-1.5">
            {[
              "Desenvolvimento e conformidade de fornecedores",
              "Visibilidade de Tier 1, 2 e 3 com trilhas Social · Ambiental · Qualidade",
              "Evidência ESG para relatórios e regulação",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-primary/85 leading-snug">
                <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {["Governança de cadeia", "Risco fornecedor", "Evidência ESG"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider"
              >
                <ShieldCheck className="size-3.5" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 12 · ONDE ESSA INFRAESTRUTURA GERA VALOR ---------- */
const S12Aplicacoes = () => {
  const apps = [
    { icon: Leaf, t: "Sociobiodiversidade", destaque: true },
    { icon: Sprout, t: "Agricultura regenerativa", destaque: true },
    { icon: Users, t: "Cooperativas", destaque: true },
    { icon: Handshake, t: "Programas de fornecedores" },
    { icon: Store, t: "Marketplaces" },
    { icon: Building2, t: "Grandes compradores" },
    { icon: Landmark, t: "Instituições financeiras" },
    { icon: Wallet, t: "Fundos de impacto" },
    { icon: Compass, t: "Programas governamentais" },
    { icon: TreePine, t: "Bioeconomia" },
  ];
  return (
    <Slide
      bg="bg-background"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          <MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />
        </>
      }
    >
      <SectionLabel n="11" label="Onde essa infraestrutura gera valor" />

      <h2 className="mt-5 font-display font-bold text-[52px] text-primary leading-[1.05] max-w-5xl">
        Um <span className="text-gradient">núcleo comum</span> de informações.<br />
        Diversas possibilidades de aplicação.
      </h2>

      <div className="mt-6 grid grid-cols-5 gap-4 flex-1 min-h-0">
        {apps.map((a) => (
          <div
            key={a.t}
            className={`flex flex-col items-center justify-center text-center gap-3 rounded-xl border bg-gradient-card px-4 py-5 shadow-card hover:border-accent/40 transition-colors ${
              a.destaque ? "border-accent/40 bg-accent/[0.04]" : "border-border"
            }`}
          >
            <div className={`size-14 rounded-xl grid place-items-center shrink-0 ${a.destaque ? "bg-gradient-accent" : "bg-primary/5"}`}>
              <a.icon className={`size-7 ${a.destaque ? "text-accent-foreground" : "text-accent"}`} />
            </div>
            <span className="font-display font-semibold text-primary text-lg leading-tight">
              {a.t}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-primary text-primary-foreground px-6 py-4">
        <span className="font-display font-bold text-xl">Uma infraestrutura.</span>
        <ArrowRight className="size-5 text-accent-glow" />
        <span className="font-display font-bold text-xl text-accent-glow">Diversos setores atendidos.</span>
      </div>
    </Slide>
  );
};

import { Handshake } from "lucide-react";

/* ---------- 13 · IMPACTO PARA CADA PARTICIPANTE ---------- */
const S13Impacto = () => {
  const perfis = [
    {
      titulo: "Produtores",
      subtitulo: "Protagonistas da transformação",
      icon: Sprout,
      destaque: true,
      itens: [
        "Capacitação contínua",
        "Reconhecimento das boas práticas",
        "Menos burocracia",
        "Acesso a novos mercados",
        "Melhores oportunidades comerciais",
      ],
    },
    {
      titulo: "Comunidades",
      icon: HandHeart,
      itens: [
        "Fortalecimento institucional",
        "Valorização do conhecimento local",
        "Inclusão produtiva",
        "Desenvolvimento territorial",
      ],
    },
    {
      titulo: "Empresas",
      icon: Building2,
      itens: [
        "Maior transparência",
        "Dados confiáveis",
        "Redução de riscos",
        "Fornecedores mais preparados",
      ],
    },
    {
      titulo: "Consumidores",
      icon: Users,
      itens: [
        "Confiança e transparência",
        "Conexão com quem produz",
        "Escolhas mais conscientes",
      ],
    },
    {
      titulo: "Investidores",
      icon: TrendingUp,
      itens: [
        "Indicadores confiáveis",
        "Mensuração de impacto",
        "Projetos estruturados",
        "Maior segurança para investir",
      ],
    },
  ];
  return (
    <Slide bg="bg-background" pad="p-10 md:p-12" decor={<MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="12" label="Impacto para cada participante" />

      <h2 className="mt-4 font-display font-bold text-[46px] text-primary leading-[1.05] max-w-5xl">
        Começa com o <span className="text-gradient">produtor</span> — e chega a toda a cadeia.
      </h2>

      <div className="mt-6 grid grid-cols-[1.35fr_1fr_1fr] grid-rows-2 gap-4 flex-1 min-h-0">
        {perfis.map((p, i) => {
          const destaque = p.destaque;
          const spanRows = destaque ? "row-span-2" : "";
          return (
            <div
              key={p.titulo}
              className={`relative rounded-2xl p-6 flex flex-col ${spanRows} ${
                destaque
                  ? "bg-primary text-primary-foreground border-2 border-accent-glow shadow-glow"
                  : "bg-gradient-card border border-border shadow-card"
              }`}
            >
              {destaque && (
                <div className="absolute -top-3 left-6 rounded-full bg-gradient-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                  Protagonista
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className={`size-12 rounded-xl grid place-items-center shrink-0 ${destaque ? "bg-accent-glow/20" : "bg-gradient-accent"}`}>
                  <p.icon className={`size-6 ${destaque ? "text-accent-glow" : "text-accent-foreground"}`} />
                </div>
                <div>
                  <div className={`font-display font-bold ${destaque ? "text-3xl text-primary-foreground" : "text-2xl text-primary"} leading-tight`}>
                    {p.titulo}
                  </div>
                  {p.subtitulo && (
                    <div className="text-sm uppercase tracking-widest text-accent-glow font-semibold mt-1">
                      {p.subtitulo}
                    </div>
                  )}
                </div>
              </div>
              <div className={`mt-4 h-px ${destaque ? "bg-primary-foreground/15" : "bg-border"}`} />
              <div className="mt-4 space-y-2.5 flex-1">
                {p.itens.map((it) => (
                  <div key={it} className="flex items-start gap-2.5">
                    <CheckCircle2 className={`size-4 shrink-0 mt-1 ${destaque ? "text-accent-glow" : "text-accent"}`} />
                    <span className={`text-[15px] leading-snug ${destaque ? "text-primary-foreground/90" : "text-primary/85"}`}>
                      {it}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

/* ---------- 14 · QUEM SOMOS ---------- */
const S14Institucional = () => {
  const pilares = [
    { icon: Database, t: "Tecnologia", d: "Plataforma modular para captura, estruturação e visualização de evidências." },
    { icon: Compass, t: "Metodologia", d: "Conhecimento profundo dos elos, riscos e oportunidades de cada cadeia." },
    { icon: ShieldCheck, t: "Governança", d: "Dados verificáveis, auditáveis e comunicáveis para todos os elos." },
    { icon: HeartHandshake, t: "Parcerias", d: "Rede de especialistas em território, socioambiental e geoespacial." },
  ];
  return (
    <Slide
      bg="bg-hero"
      pad="p-10 md:p-12"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -top-40 -right-20 w-[700px] h-[700px] bg-glow opacity-40 pointer-events-none blur-3xl rounded-full" />
          <MytsWatermark className="-left-24 -bottom-24 w-[420px] opacity-[0.06]" />
        </>
      }
    >
      <SectionLabel n="13" label="Quem somos" light />

      <div className="mt-5 flex flex-col gap-5 flex-1 min-h-0">
        <div className="flex items-start gap-5">
          <img src={mytsLogo} alt="MyTS" className="h-14 shrink-0 mt-1" />
          <div className="h-14 w-px bg-primary-foreground/20 shrink-0" />
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.28em] text-accent-glow font-semibold">
              MyTS · My Trusted Source
            </div>
            <p className="mt-2 font-display font-bold text-[38px] text-primary-foreground leading-[1.12] max-w-[1200px]">
              Transformamos informações dispersas em{" "}
              <span className="text-gradient">confiança, desenvolvimento e acesso a mercado</span>{" "}
              — fortalecendo produtores e conectando territórios.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 flex-1 min-h-0">
          {pilares.map((p) => (
            <div
              key={p.t}
              className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur p-6 flex flex-col"
            >
              <div className="size-14 rounded-xl bg-accent/15 border border-accent/30 grid place-items-center">
                <p.icon className="size-7 text-accent-glow" />
              </div>
              <div className="mt-5 font-display font-bold text-2xl text-primary-foreground leading-tight">
                {p.t}
              </div>
              <div className="mt-3 text-base text-primary-foreground/75 leading-snug">
                {p.d}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border-l-4 border-accent-glow bg-primary-foreground/5 backdrop-blur px-6 py-4 text-lg text-primary-foreground/90">
          Tudo conectado em uma{" "}
          <span className="text-accent-glow font-semibold">única base de confiança</span>.
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 15 · PRÓXIMOS PASSOS ---------- */
const S15Proximos = () => {
  const marcos = [
    { icon: Radar, t: "Diagnóstico", d: "entender maturidade e ativos da cadeia." },
    { icon: Layers, t: "Planejamento", d: "definir escopo, módulos e indicadores." },
    { icon: Zap, t: "Implementação", d: "onboarding e captura de evidências." },
    { icon: GraduationCap, t: "Desenvolvimento", d: "capacidades que ficam no território." },
    { icon: Target, t: "Expansão", d: "escala para novos elos e cadeias." },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="14" label="Próximos passos" />

      <h2 className="mt-5 font-display font-bold text-[48px] text-primary leading-[1.05] max-w-5xl">
        Cada iniciativa é construída{" "}
        <span className="text-gradient">em conjunto com parceiros</span>.
      </h2>

      <p className="mt-4 text-lg text-muted-foreground max-w-4xl">
        Considerando as características do território, da cadeia produtiva e dos objetivos
        estratégicos do projeto.
      </p>

      <div className="mt-10 relative flex-1 min-h-0 flex flex-col justify-center">
        <div className="relative w-full">
          <div className="absolute top-12 left-8 right-8 h-0.5 bg-gradient-to-r from-accent via-accent-glow to-accent" />
          <div className="grid grid-cols-5 gap-4 relative">
            {marcos.map((m, i) => (
              <div key={m.t} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-accent opacity-30 blur-xl rounded-full" />
                  <div className="relative size-24 rounded-full bg-primary border-2 border-accent grid place-items-center">
                    <m.icon className="size-9 text-accent-glow" />
                  </div>
                </div>
                <div className="mt-4 text-sm font-mono font-bold text-accent">ETAPA 0{i + 1}</div>
                <div className="mt-2 font-display font-bold text-xl text-primary leading-tight">
                  {m.t}
                </div>
                <div className="mt-2 text-base text-muted-foreground max-w-[220px] leading-snug">
                  {m.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border-l-4 border-accent bg-accent/5 px-6 py-4 text-lg text-primary">
        Mais do que implantar tecnologia —{" "}
        <span className="font-semibold">construímos capacidades que permanecem no território</span>.
      </div>
    </Slide>
  );
};

/* ---------- 16 · ENCERRAMENTO ---------- */
const S16Encerramento = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-glow opacity-60 pointer-events-none blur-3xl rounded-full" />
        <MytsWatermark className="-left-24 -bottom-24 w-[520px]" />
      </>
    }
  >
    <div className="flex flex-col justify-between h-full">
      <SectionLabel n="15" label="Encerramento" light />

      <div className="max-w-6xl">
        <h1 className="font-display font-bold text-[80px] leading-[0.95] tracking-tight text-primary-foreground">
          O desenvolvimento sustentável começa por{" "}
          <span className="text-accent-glow">quem produz</span>.
        </h1>

        <div className="mt-10 grid grid-cols-6 gap-3 items-center max-w-5xl">
          {[
            { t: "Pessoas fortalecidas", icon: HandHeart },
            { t: "Boas práticas", icon: Sprout },
            { t: "Evidências", icon: FileCheck },
            { t: "Confiança", icon: ShieldCheck },
            { t: "Mercados", icon: Store },
            { t: "Comunidades e territórios", icon: TreePine },
          ].map((s, i) => (
            <div key={s.t} className="flex flex-col items-center text-center gap-2">
              <div className="size-14 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 grid place-items-center">
                <s.icon className="size-6 text-accent-glow" />
              </div>
              <div className="text-sm text-primary-foreground/80 leading-tight">{s.t}</div>
              {i < 5 && (
                <ArrowRight className="hidden lg:block size-4 text-accent-glow/40 absolute" style={{ display: "none" }} />
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-2xl text-primary-foreground/85 max-w-4xl leading-snug">
          Esse é o propósito da MyTS —{" "}
          <span className="text-accent-glow font-semibold">
            transformar boas práticas em desenvolvimento, evidências e novas oportunidades
          </span>.
        </p>
      </div>

      <div className="grid grid-cols-[1.3fr_1fr] gap-8 items-end">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-5">
            <div className="text-xs uppercase tracking-widest text-primary-foreground/50">CEO</div>
            <div className="mt-1 font-display font-bold text-xl text-primary-foreground">Valmir Rodrigues</div>
            <div className="mt-1 text-xs text-primary-foreground/60">MyTS</div>
          </div>
          <a
            href="mailto:valmir@myt-s.com"
            className="group flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
          >
            <div className="size-10 rounded-lg bg-gradient-accent grid place-items-center">
              <Mail className="size-4 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-primary-foreground/50">Contato</div>
              <div className="font-mono text-sm text-primary-foreground truncate">valmir@myt-s.com</div>
            </div>
          </a>
          <a
            href="https://myt-s.com"
            className="group flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
          >
            <div className="size-10 rounded-lg bg-gradient-accent grid place-items-center">
              <Globe className="size-4 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-primary-foreground/50">Web</div>
              <div className="font-mono text-sm text-primary-foreground truncate">www.myt-s.com</div>
            </div>
          </a>
        </div>

        <div className="flex flex-col items-end gap-4">
          <img src={mytsLogo} alt="MyTS" className="h-12 opacity-95" />
          <div className="text-[11px] uppercase tracking-widest text-primary-foreground/50 font-semibold">
            Em parceria com
          </div>
          <div className="flex items-center gap-5">
            <PartnerLogo src={grounddAsset.url} alt="Groundd" className="h-8" variant="dark" />
            <PartnerLogo src={ramoAsset.url} alt="RAMO" className="h-8" variant="dark" />
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ============================================================
   PAGE
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
      <title>MyTS — Fortalecendo pessoas, conectando territórios</title>
      <meta
        name="description"
        content="MyTS: infraestrutura digital que coloca produtores no centro. Fortalecemos pessoas, organizamos evidências socioambientais e conectamos cadeias produtivas ao mercado."
      />
    </Helmet>
    <S01Capa />
    <S02Mundo />
    <S03Patrimonio />
    <S04Desafio />
    <S05Visao />
    <S06Jornada />
    <S07AMyts />
    <S08Ecossistema />
    <S09Passaporte />
    <S10Ciclo />
    <S11Experiencia />
    <S12Aplicacoes />
    <S13Impacto />
    <S14Institucional />
    <S15Proximos />
    <S16Encerramento />
  </main>
);

export default MytsPassaporte;
