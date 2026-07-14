import { Helmet } from "react-helmet-async";
import {
  Sprout,
  ArrowRight,
  ArrowDown,
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
  Eye,
  HeartHandshake,
  Store,
  Leaf,
  Mail,
  Globe,
  Compass,
  Layers,
  Target,
  Zap,
  FileText,
  Handshake,
  Fingerprint,
  Radar,
  Wallet,
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
  /** "light" = renderiza logo em branco sobre fundo escuro (sem caixa);
   *  "dark"  = mantém logo original sobre caixa branca (fundos claros). */
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

/* -----------------------------------------------------------
   MyTS · Infraestrutura Digital de Confiança — deck institucional
   Rota: /myts-passaporte
   ----------------------------------------------------------- */

/* ============================================================
   Primitivos compartilhados
   ============================================================ */
const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-5 py-2 text-sm font-medium tracking-wide uppercase text-primary-foreground/80">
    {children}
  </span>
);

const LightChip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
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

/* Diagrama vertical de fluxo — Slide 06 */
const FluxoInfraestrutura = () => {
  const steps = [
    { icon: Compass, t: "Diagnóstico", s: "maturidade da cadeia" },
    { icon: Handshake, t: "Desenvolvimento", s: "fortalecimento dos produtores" },
    { icon: Database, t: "Organização dos Dados", s: "único ponto de verdade" },
    { icon: FileCheck, t: "Gestão de Evidências", s: "verificáveis e auditáveis" },
    { icon: Satellite, t: "Inteligência Territorial", s: "leitura geoespacial" },
    { icon: QrCode, t: "Passaporte Digital", s: "experiência para o mercado" },
  ];
  const destinos = [
    { icon: Users, t: "Consumidores" },
    { icon: Store, t: "Compradores" },
    { icon: TrendingUp, t: "Investidores" },
    { icon: Landmark, t: "Inst. Financeiras" },
  ];
  return (
    <div className="grid grid-cols-[1fr_auto_1.1fr] gap-6 items-stretch h-full min-h-0">
      {/* Coluna esquerda: entradas */}
      <div className="flex flex-col justify-center gap-4">
        {steps.slice(0, 3).map((s) => (
          <div
            key={s.t}
            className="flex items-center gap-4 rounded-xl border border-border bg-gradient-card shadow-card px-5 py-4"
          >
            <div className="size-12 rounded-xl bg-gradient-accent grid place-items-center shrink-0">
              <s.icon className="size-6 text-accent-foreground" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-semibold text-primary text-base leading-tight">
                {s.t}
              </div>
              <div className="text-sm text-muted-foreground truncate">{s.s}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Coluna centro: hub MyTS */}
      <div className="flex flex-col items-center justify-center gap-5 px-2">
        <ArrowRight className="size-8 text-accent -rotate-0 md:rotate-0" />
        <div className="relative">
          <div className="absolute -inset-10 bg-gradient-accent opacity-20 blur-3xl rounded-full" />
          <div className="relative size-48 rounded-full bg-primary border-2 border-accent grid place-items-center shadow-glow">
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-accent-glow font-semibold">
                Infraestrutura
              </div>
              <div className="font-display font-bold text-primary-foreground text-4xl leading-none mt-1">
                MyTS
              </div>
              <div className="text-xs text-primary-foreground/60 mt-1">
                de confiança
              </div>
            </div>
          </div>
        </div>
        <ArrowRight className="size-8 text-accent" />
      </div>

      {/* Coluna direita: saídas + destinos */}
      <div className="flex flex-col justify-center gap-4">
        {steps.slice(3).map((s) => (
          <div
            key={s.t}
            className="flex items-center gap-4 rounded-xl border border-border bg-gradient-card shadow-card px-5 py-3.5"
          >
            <div className="size-12 rounded-xl bg-primary grid place-items-center shrink-0">
              <s.icon className="size-6 text-accent-glow" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-semibold text-primary text-base leading-tight">
                {s.t}
              </div>
              <div className="text-sm text-muted-foreground truncate">{s.s}</div>
            </div>
          </div>
        ))}
        <div className="mt-1 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <div className="text-xs uppercase tracking-widest text-accent font-bold mb-2">
            Mercado
          </div>
          <div className="grid grid-cols-2 gap-2">
            {destinos.map((d) => (
              <div
                key={d.t}
                className="flex items-center gap-2 rounded-lg bg-background border border-border px-3 py-2"
              >
                <d.icon className="size-4 text-accent shrink-0" />
                <span className="text-xs font-semibold text-primary truncate">{d.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Mockup Smartphone com Passaporte — Slide 08 */
const MockupPassaporte = () => (
  <div className="relative flex items-center justify-center h-full">
    <div className="absolute -inset-6 bg-gradient-accent opacity-25 blur-3xl rounded-full" />
    {/* Smartphone frame */}
    <div className="relative w-[340px] rounded-[44px] bg-primary p-3.5 border border-primary-foreground/10 shadow-2xl">
      <div className="relative rounded-[34px] overflow-hidden bg-background aspect-[9/18]">
        {/* status bar */}
        <div className="absolute top-0 inset-x-0 h-7 bg-primary/5 flex items-center justify-between px-5 z-10">
          <span className="text-[10px] font-semibold text-primary">9:41</span>
          <span className="text-[10px] text-primary/70">MyTS</span>
        </div>
        {/* header product */}
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

        {/* media strip: produtor + geolocalização */}
        <div className="px-4 pt-3 grid grid-cols-2 gap-2">
          {[
            { src: produtorImg, label: "Produtor", caption: "Seu Raimundo" },
            { src: geoImg, label: "Geolocalização", caption: "-5.78, -67.34" },
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

        {/* content list */}
        <div className="px-4 pt-3 pb-16 space-y-2">
          {[
            { icon: MapPin, t: "Origem verificada", v: "Médio Juruá, AM" },
            { icon: Users, t: "Produtores", v: "42 famílias" },
            { icon: Leaf, t: "Prática", v: "Extrativismo agroflorestal" },
            { icon: ShieldCheck, t: "Evidência", v: "12 documentos" },
            { icon: Fingerprint, t: "Rastreabilidade", v: "Lote #A-2094" },
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
        {/* CTA */}
        <div className="absolute bottom-4 inset-x-4">
          <div className="rounded-lg bg-gradient-accent text-accent-foreground text-center text-xs font-bold py-2.5">
            Conheça esta história
          </div>
        </div>
      </div>
    </div>

    {/* QR code flutuante */}
    <div className="absolute -left-8 top-10 rounded-2xl bg-background border border-border shadow-elegant p-4 rotate-[-6deg]">
      <div className="grid grid-cols-8 gap-0.5 w-[104px]">
        {Array.from({ length: 64 }).map((_, i) => {
          // padrão pseudo-aleatório determinístico
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

/* Avatar circular com monograma para o time */
const AvatarPessoa = ({ nome }: { nome: string }) => {
  const iniciais = nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-accent opacity-40 blur-md rounded-full" />
      <div className="relative size-28 rounded-full bg-primary border-2 border-accent-glow/40 grid place-items-center">
        <span className="font-display font-bold text-4xl text-accent-glow">{iniciais}</span>
      </div>
    </div>
  );
};

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

        <h1 className="mt-10 font-display font-bold text-[200px] leading-[0.88] tracking-tight text-primary-foreground">
          My<span className="text-gradient">TS</span>
        </h1>

        <p className="mt-8 text-6xl text-primary-foreground/95 max-w-4xl leading-[1.05] font-medium">
          Infraestrutura Digital de{" "}
          <span className="text-accent-glow font-semibold">Confiança</span>.
        </p>

        <p className="mt-8 text-3xl text-primary-foreground/75 max-w-3xl leading-snug">
          Transformando origem, território e impacto em valor para cadeias produtivas.
        </p>

        <div className="mt-14 flex items-center gap-8 flex-wrap">
          <div className="rounded-2xl bg-primary-foreground/10 border border-primary-foreground/15 px-7 py-5">
            <div className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-3 font-semibold">
              Em parceria com
            </div>
            <div className="flex items-center gap-6">
              <PartnerLogo src={grounddAsset.url} alt="Groundd" className="h-12" />
              <PartnerLogo src={ramoAsset.url} alt="RAMO" className="h-12" />
            </div>
          </div>
          <div className="h-16 w-px bg-primary-foreground/15" />
          <div>
            <div className="text-sm uppercase tracking-widest text-primary-foreground/60 font-semibold">
              Apresentação para
            </div>
            <div className="mt-1 font-display font-bold text-accent-glow text-3xl leading-tight">
              (Cliente)
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

/* ---------- 02 · O MERCADO MUDOU ---------- */
const S02Mercado = () => {
  const forcas = [
    {
      icon: Users,
      t: "Consumidores",
      d: "querem conhecer a origem do que consomem.",
    },
    {
      icon: ShoppingBag,
      t: "Compradores",
      d: "exigem transparência antes de comprar.",
    },
    {
      icon: TrendingUp,
      t: "Investidores",
      d: "cobram evidências para alocar capital.",
    },
    {
      icon: Scale,
      t: "Reguladores",
      d: "ampliam exigências de rastreabilidade e ESG.",
    },
  ];
  return (
    <Slide
      bg="bg-background"
      decor={
        <MytsWatermark className="-right-20 -bottom-20 w-[420px] [filter:invert(1)] opacity-[0.04]" />
      }
    >
      <SectionLabel n="01" label="O mercado mudou" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        A confiança deixou de ser um diferencial.{" "}
        <span className="text-gradient">Tornou-se uma exigência.</span>
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
        As cadeias produtivas precisam acompanhar essa transformação —{" "}
        <span className="font-semibold">a nova vantagem competitiva está em comprovar a própria história.</span>
      </div>
    </Slide>
  );
};

/* ---------- 03 · O DESAFIO ---------- */
const S03Desafio = () => {
  const disperso = [
    { t: "Planilhas", style: { top: "18%", left: "8%", transform: "rotate(-6deg)" } },
    { t: "Certificados", style: { top: "10%", right: "10%", transform: "rotate(4deg)" } },
    { t: "PDFs", style: { top: "38%", left: "20%", transform: "rotate(-2deg)" } },
    { t: "E-mails", style: { top: "45%", right: "14%", transform: "rotate(6deg)" } },
    { t: "Fotos", style: { bottom: "22%", left: "10%", transform: "rotate(-4deg)" } },
    { t: "Conhecimento local", style: { bottom: "12%", right: "8%", transform: "rotate(3deg)" } },
  ] as const;
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-16 -bottom-16 w-[380px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="02" label="O desafio" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        Existe um enorme <span className="text-gradient">patrimônio invisível</span> dentro
        das cadeias produtivas.
      </h2>

      <div className="mt-8 grid grid-cols-[1fr_auto_1fr] gap-6 flex-1 min-h-0 items-stretch">
        {/* Caos */}
        <div className="relative h-full rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 overflow-hidden">
          <div className="absolute top-5 left-5 text-sm uppercase tracking-widest text-muted-foreground font-semibold z-10">
            Hoje · disperso
          </div>
          {disperso.map((d) => (
            <div
              key={d.t}
              style={d.style as React.CSSProperties}
              className="absolute rounded-xl bg-background border border-border shadow-card px-5 py-3 flex items-center gap-3"
            >
              <FileText className="size-6 text-muted-foreground" />
              <span className="text-lg font-semibold text-primary whitespace-nowrap">{d.t}</span>
            </div>
          ))}
        </div>

        {/* Seta */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="rounded-full bg-gradient-accent p-3 shadow-cta">
            <ArrowRight className="size-6 text-accent-foreground" />
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-accent">MyTS</div>
        </div>

        {/* Organizado */}
        <div className="relative h-full rounded-2xl border border-accent/30 bg-gradient-card shadow-elegant p-8 flex flex-col justify-center">
          <div className="text-sm uppercase tracking-widest text-accent font-bold">
            Organizado · gerando valor
          </div>
          <div className="mt-6 flex flex-col gap-4">
            {[
              "Boas práticas registradas",
              "Comunidades reconhecidas",
              "Conhecimento local estruturado",
              "Impactos positivos evidenciados",
              "Histórias reais comunicáveis",
            ].map((t) => (
              <div key={t} className="flex items-center gap-4">
                <CheckCircle2 className="size-7 text-accent shrink-0" />
                <span className="text-xl font-medium text-primary">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      <p className="mt-5 text-lg text-muted-foreground max-w-4xl">
        Tudo já existe. Sem organização, essas informações{" "}
        <span className="font-semibold text-primary">deixam de gerar valor</span>.
      </p>
    </Slide>
  );
};

/* ---------- 04 · A CONSEQUÊNCIA ---------- */
const S04Consequencia = () => {
  const custos = [
    { t: "Perda de acesso a mercado", d: "Compradores exigentes ficam fora do alcance." },
    { t: "Exposição regulatória e reputacional", d: "Risco cresce a cada novo marco normativo." },
    { t: "Baixa valorização da origem", d: "Impacto do produtor não se traduz em prêmio." },
    { t: "Processos lentos e burocráticos", d: "Homologação e auditoria consomem meses." },
  ];
  return (
    <Slide
      bg="bg-background"
      decor={<MytsWatermark className="-right-20 -bottom-20 w-[400px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="03" label="A consequência" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        O custo de uma cadeia <span className="text-gradient">sem visibilidade</span>.
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-6 flex-1 min-h-0">
        {custos.map((c, i) => (
          <div
            key={c.t}
            className="relative rounded-2xl border border-border bg-gradient-card shadow-card p-10 pl-12 flex flex-col justify-center overflow-hidden"
          >
            <div className="absolute left-0 top-8 bottom-8 w-2 rounded-r-full bg-gradient-accent" />
            <div className="font-display font-bold text-7xl text-accent leading-none">0{i + 1}</div>
            <div className="mt-5 font-display font-bold text-4xl text-primary leading-tight">
              {c.t}
            </div>
            <div className="mt-4 text-xl text-muted-foreground leading-snug">{c.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-primary text-primary-foreground px-6 py-5 flex items-center justify-between">
        <div className="font-display font-bold text-2xl leading-tight">
          A cadeia produz valor.
        </div>
        <ArrowRight className="size-5 text-accent-glow" />
        <div className="font-display font-bold text-2xl leading-tight text-accent-glow">
          O mercado não consegue enxergá-lo.
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 05 · A RESPOSTA ---------- */
const S05Resposta = () => (
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
    <div className="flex flex-col justify-center h-full max-w-6xl mx-auto text-center items-center">
      <SectionLabel n="04" label="A resposta" light />

      <h1 className="mt-6 font-display font-bold text-[180px] leading-[0.85] tracking-tight text-primary-foreground">
        My<span className="text-gradient">TS</span>
      </h1>

      <p className="mt-5 text-5xl text-primary-foreground/95 font-medium leading-tight">
        Infraestrutura Digital de{" "}
        <span className="text-accent-glow font-semibold">Confiança</span>
      </p>

      <p className="mt-8 text-2xl text-primary-foreground/75 leading-relaxed max-w-4xl">
        Transformamos informações dispersas em uma infraestrutura digital que conecta{" "}
        <span className="text-primary-foreground font-semibold">produtores, compradores, consumidores, investidores</span> e parceiros. Mais do
        que rastrear produtos, organizamos dados, estruturamos evidências e fortalecemos relações
        de confiança ao longo de toda a cadeia.
      </p>

      <div className="mt-10 flex items-center gap-6">
        <div className="text-primary-foreground/60 uppercase tracking-widest text-lg">
          Uma única infraestrutura
        </div>
        <div className="h-8 w-px bg-accent-glow/40" />
        <div className="text-accent-glow uppercase tracking-widest text-lg font-bold">
          Múltiplas aplicações
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 06 · COMO FUNCIONA ---------- */
const S06ComoFunciona = () => (
  <Slide
    bg="bg-background"
    pad="p-10 md:p-12"
    decor={<MytsWatermark className="-right-20 -bottom-20 w-[380px] [filter:invert(1)] opacity-[0.04]" />}
  >
    <SectionLabel n="05" label="Como funciona" />

    <h2 className="mt-3 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
      Da origem ao mercado —{" "}
      <span className="text-gradient">uma única jornada de dado</span>.
    </h2>

    <div className="mt-5 flex-1 min-h-0">
      <FluxoInfraestrutura />
    </div>

    <p className="mt-4 text-center text-lg text-muted-foreground italic">
      Cada informação é registrada uma única vez e{" "}
      <span className="font-semibold text-primary not-italic">gera valor para toda a cadeia</span>.
    </p>
  </Slide>
);

/* ---------- 07 · ALÉM DA RASTREABILIDADE ---------- */
const S07Alem = () => {
  const cards = [
    {
      icon: Users,
      t: "Gestão de Fornecedores",
      d: "Homologação, desenvolvimento e monitoramento contínuo.",
    },
    {
      icon: FileCheck,
      t: "Gestão Documental",
      d: "Organização, validação e atualização de documentos.",
    },
    {
      icon: Route,
      t: "Rastreabilidade",
      d: "Origem, cadeia produtiva e histórico completo.",
    },
    {
      icon: Leaf,
      t: "Evidências Socioambientais",
      d: "Indicadores, conformidade e impacto verificado.",
    },
    {
      icon: QrCode,
      t: "Passaporte Digital",
      d: "QR Code que conecta consumidor à origem.",
    },
    {
      icon: BarChart3,
      t: "Inteligência Analítica",
      d: "Dashboards e apoio à tomada de decisão.",
    },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[380px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="06" label="Muito além da rastreabilidade" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        Uma plataforma. <span className="text-gradient">Diversas capacidades.</span>
      </h2>

      <div className="mt-8 grid grid-cols-3 gap-5 flex-1 min-h-0">
        {cards.map((c) => (
          <div
            key={c.t}
            className="group relative rounded-2xl border border-border bg-gradient-card shadow-card p-8 flex flex-col justify-center hover:border-accent/40 transition-colors overflow-hidden"
          >
            <div className="size-16 rounded-2xl bg-gradient-accent grid place-items-center shadow-cta">
              <c.icon className="size-8 text-accent-foreground" />
            </div>
            <div className="mt-6 font-display font-bold text-3xl text-primary leading-tight">
              {c.t}
            </div>
            <div className="mt-3 text-lg text-muted-foreground leading-snug">{c.d}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
};

/* ---------- 08 · PASSAPORTE DIGITAL ---------- */
const S08Passaporte = () => {
  const bullets = [
    "Origem do produto",
    "Quem produziu",
    "Território e comunidade",
    "Práticas produtivas",
    "Evidências socioambientais",
    "Documentos e certificações",
    "Histórias das pessoas",
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
      <SectionLabel n="07" label="Passaporte Digital" light />

      <div className="mt-6 grid grid-cols-[1.1fr_1fr] gap-12 flex-1 min-h-0 items-center">
        <div className="flex flex-col justify-center">
          <h2 className="font-display font-bold text-6xl text-primary-foreground leading-[1.05] max-w-2xl">
            Tornando a{" "}
            <span className="text-gradient">confiança visível</span>.
          </h2>

          <p className="mt-6 text-xl text-primary-foreground/75 max-w-xl leading-relaxed">
            Toda a inteligência construída pela MyTS é disponibilizada de forma simples por meio
            do Passaporte Digital. Ao escanear o QR Code, compradores e consumidores acessam:
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 max-w-xl">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-accent-glow shrink-0" />
                <span className="text-primary-foreground/85 text-base">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border-l-4 border-accent-glow bg-primary-foreground/5 backdrop-blur px-6 py-5 max-w-xl">
            <div className="text-lg text-primary-foreground/90 leading-snug">
              Transparência deixa de ser um relatório —{" "}
              <span className="text-accent-glow font-semibold">
                passa a fazer parte da experiência do produto
              </span>.
            </div>
          </div>
        </div>

        <MockupPassaporte />
      </div>
    </Slide>
  );
};

/* ---------- 09 · ECOSSISTEMA ---------- */
const S09Ecossistema = () => {
  const parceiros = [
    {
      nome: "Groundd",
      papel: "Território & Comunidades",
      icon: Sprout,
      itens: ["Desenvolvimento territorial", "Diagnósticos em campo", "Metodologia CERS"],
    },
    {
      nome: "MyTS",
      papel: "Infraestrutura Digital",
      icon: Database,
      itens: [
        "Rastreabilidade & governança",
        "Gestão de fornecedores",
        "Passaporte Digital",
        "Inteligência analítica",
      ],
      destaque: true,
    },
    {
      nome: "RAMO",
      papel: "Inteligência Geoespacial",
      icon: Satellite,
      itens: ["Geoanálise territorial", "NatureOS", "Integração de dados espaciais"],
    },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[380px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="08" label="Um ecossistema de competências" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        Tecnologia, território e{" "}
        <span className="text-gradient">inteligência</span> — em uma única solução.
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
                <div
                  className={`size-20 rounded-2xl grid place-items-center ${
                    p.destaque ? "bg-gradient-accent" : "bg-primary/10"
                  }`}
                >
                  <p.icon
                    className={`size-10 ${p.destaque ? "text-accent-foreground" : "text-primary"}`}
                  />
                </div>
              )}
              <div
                className={`mt-6 font-display font-bold text-5xl leading-tight ${
                  p.destaque ? "text-primary-foreground" : "text-primary"
                }`}
              >
                {p.nome}
              </div>
              <div
                className={`mt-2 text-lg uppercase tracking-widest font-semibold ${
                  p.destaque ? "text-accent-glow" : "text-accent"
                }`}
              >
                {p.papel}
              </div>
              <div
                className={`mt-5 h-px ${
                  p.destaque ? "bg-primary-foreground/15" : "bg-border"
                }`}
              />
              <div className="mt-5 space-y-4 flex-1">
                {p.itens.map((it) => (
                  <div key={it} className="flex items-start gap-3">
                    <CheckCircle2
                      className={`size-6 mt-0.5 shrink-0 ${
                        p.destaque ? "text-accent-glow" : "text-accent"
                      }`}
                    />
                    <span
                      className={`text-lg ${
                        p.destaque ? "text-primary-foreground/90" : "text-primary/80"
                      }`}
                    >
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
        Competências complementares. <span className="font-semibold text-primary">Uma única solução.</span>
      </p>
    </Slide>
  );
};

/* ---------- 10 · ONDE GERA VALOR ---------- */
const S10Aplicacoes = () => {
  const apps = [
    { icon: Leaf, t: "Sociobiodiversidade" },
    { icon: Sprout, t: "Agricultura regenerativa" },
    { icon: HeartHandshake, t: "Bem-estar animal" },
    { icon: Users, t: "Cooperativas" },
    { icon: Handshake, t: "Programas de fornecedores" },
    { icon: Store, t: "Marketplaces" },
    { icon: Building2, t: "Grandes compradores" },
    { icon: Landmark, t: "Instituições financeiras" },
    { icon: Wallet, t: "Fundos de impacto" },
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
      <SectionLabel n="09" label="Onde essa solução gera valor" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        Uma infraestrutura preparada para{" "}
        <span className="text-gradient">diferentes cadeias produtivas</span>.
      </h2>

      <div className="mt-6 grid grid-cols-3 gap-4 flex-1 min-h-0">
        {apps.map((a, i) => (
          <div
            key={a.t}
            className={`group flex items-center gap-5 rounded-xl border bg-gradient-card px-6 py-5 shadow-card hover:border-accent/40 transition-colors ${
              [0, 4, 8].includes(i) ? "border-accent/30" : "border-border"
            }`}
          >
            <div
              className={`size-12 rounded-lg grid place-items-center shrink-0 ${
                [0, 4, 8].includes(i) ? "bg-gradient-accent" : "bg-primary/5"
              }`}
            >
              <a.icon
                className={`size-6 ${
                  [0, 4, 8].includes(i) ? "text-accent-foreground" : "text-accent"
                }`}
              />
            </div>
            <span className="font-display font-semibold text-primary text-xl leading-tight">
              {a.t}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-primary text-primary-foreground px-6 py-4">
        <span className="font-display font-bold text-xl">Uma plataforma.</span>
        <ArrowRight className="size-5 text-accent-glow" />
        <span className="font-display font-bold text-xl text-accent-glow">Diversas aplicações.</span>
      </div>
    </Slide>
  );
};

/* ---------- 11 · EXPERIÊNCIA ---------- */
const S11Experiencia = () => (
  <Slide
    bg="bg-background"
    decor={
      <MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />
    }
  >
    <SectionLabel n="10" label="Experiência construída em projetos reais" />

    <h2 className="mt-4 font-display font-bold text-4xl text-primary leading-[1.05] max-w-4xl">
      A metodologia MyTS evolui a partir de{" "}
      <span className="text-gradient">desafios reais</span>.
    </h2>

    <p className="mt-3 text-base text-muted-foreground max-w-3xl leading-snug">
      Dois cases em pontas opostas da cadeia: relação direta com o consumidor e
      governança da rede de fornecedores.
    </p>

    <div className="mt-5 grid grid-cols-2 gap-6 flex-1 min-h-0 items-stretch">
      {/* ---------- CASE KORIN ---------- */}
      <div className="relative rounded-3xl bg-gradient-card border border-border shadow-elegant overflow-hidden flex flex-col">
        <div className="flex items-center gap-4 px-8 pt-7 pb-5 border-b border-border/70">
          <div className="rounded-xl bg-background border border-border shadow-card px-4 py-2.5">
            <img src={korinAsset.url} alt="Korin" className="h-9 w-auto object-contain" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">
              Case · Consumidor
            </div>
            <div className="font-display font-bold text-2xl text-primary leading-tight truncate">
              Transparência que aproxima
            </div>
          </div>
        </div>

        <div className="relative px-6 pt-6">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-card aspect-[16/10]">
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

        <div className="px-8 py-6 flex-1 flex flex-col gap-4">
          <ul className="space-y-2.5">
            {[
              "Passaporte Digital acessado por QR Code direto na gôndola",
              "História da origem, granjas e boas práticas contadas ao consumidor",
              "Canal contínuo entre marca, produtor e comprador final",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-lg text-primary/85 leading-snug">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-1" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {["Bem-estar animal", "Origem verificada", "Storytelling de cadeia"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold px-3 py-1.5 uppercase tracking-wider"
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
        <div className="flex items-center gap-4 px-8 pt-7 pb-5 border-b border-border/70">
          <div className="rounded-xl bg-background border border-border shadow-card px-4 py-2.5">
            <img src={carrefourAsset.url} alt="Carrefour" className="h-9 w-auto object-contain" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">
              Case · Cadeia de fornecedores
            </div>
            <div className="font-display font-bold text-2xl text-primary leading-tight truncate">
              Jornada da Autonomia
            </div>
          </div>
        </div>

        {/* Dashboard mockup — JSX */}
        <div className="relative px-6 pt-6">
          <div className="relative rounded-2xl overflow-hidden border border-primary/15 shadow-card aspect-[16/10] bg-primary text-primary-foreground">
            {/* barra topo */}
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
              {/* sidebar */}
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
                      m.on
                        ? "bg-accent/20 text-accent-glow"
                        : "text-primary-foreground/55"
                    }`}
                  >
                    <m.i className="size-3" />
                    <span className="text-[9px] font-semibold truncate">{m.l}</span>
                  </div>
                ))}
              </div>

              {/* main */}
              <div className="p-3 space-y-2.5">
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { n: "247", l: "Fornecedores" },
                    { n: "92%", l: "Conformidade" },
                    { n: "3", l: "Tiers mapeados" },
                  ].map((k) => (
                    <div
                      key={k.l}
                      className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 px-2 py-1.5"
                    >
                      <div className="text-[9px] uppercase tracking-widest text-primary-foreground/50">
                        {k.l}
                      </div>
                      <div className="font-display font-bold text-lg leading-none text-accent-glow mt-0.5">
                        {k.n}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart mock */}
                <div className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] uppercase tracking-widest text-primary-foreground/60 font-semibold">
                      Evolução mensal
                    </div>
                    <div className="text-[9px] text-accent-glow font-mono">+18%</div>
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {[35, 48, 42, 60, 55, 72, 68, 84, 78, 92, 88, 95].map((h, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-sm ${
                          idx === 11 ? "bg-accent-glow" : "bg-accent/50"
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress list */}
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
                        <div
                          className="h-full rounded-full bg-gradient-accent"
                          style={{ width: `${p.v}%` }}
                        />
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

        <div className="px-8 py-6 flex-1 flex flex-col gap-4">
          <ul className="space-y-2.5">
            {[
              "Programa multivarejo de desenvolvimento e conformidade de fornecedores",
              "Visibilidade contínua de Tier 1, 2 e 3 com trilhas Social · Ambiental · Qualidade",
              "Evidência ESG real para relatórios de sustentabilidade e regulação",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-lg text-primary/85 leading-snug">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-1" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {["Governança de cadeia", "Risco fornecedor", "Evidência ESG"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold px-3 py-1.5 uppercase tracking-wider"
              >
                <ShieldCheck className="size-3.5" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <p className="mt-6 text-center text-lg text-muted-foreground italic">
      Dois pontos da cadeia — <span className="font-semibold text-primary not-italic">uma única infraestrutura</span>.
    </p>
  </Slide>
);

/* ---------- 12 · O VALOR POR PARTICIPANTE ---------- */
const S12Valor = () => {
  const perfis = [
    {
      titulo: "Produtores",
      icon: Sprout,
      cor: "accent",
      itens: [
        "Mais organização",
        "Maior visibilidade",
        "Acesso a novos mercados",
        "Redução da burocracia",
        "Desenvolvimento contínuo",
      ],
    },
    {
      titulo: "Compradores",
      icon: Building2,
      cor: "primary",
      itens: [
        "Maior governança",
        "Dados confiáveis",
        "Redução de riscos",
        "Mais eficiência na cadeia",
      ],
    },
    {
      titulo: "Consumidores",
      icon: Users,
      cor: "accent",
      itens: [
        "Transparência",
        "Confiança",
        "Conexão com a origem",
        "Escolhas mais conscientes",
      ],
    },
    {
      titulo: "Investidores & Financiadores",
      icon: TrendingUp,
      cor: "primary",
      itens: [
        "Indicadores confiáveis",
        "Comprovação de impacto",
        "Segurança para decisão",
      ],
    },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="11" label="O valor" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        O que muda para{" "}
        <span className="text-gradient">cada participante</span> da cadeia.
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-6 flex-1 min-h-0">
        {perfis.map((p) => {
          const dark = p.cor === "primary";
          return (
            <div
              key={p.titulo}
              className={`relative rounded-2xl p-8 flex flex-col justify-center ${
                dark
                  ? "bg-primary text-primary-foreground border border-accent/30"
                  : "bg-gradient-card border border-border shadow-card"
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`size-16 rounded-2xl grid place-items-center ${
                    dark ? "bg-accent-glow/20" : "bg-gradient-accent"
                  }`}
                >
                  <p.icon
                    className={`size-8 ${dark ? "text-accent-glow" : "text-accent-foreground"}`}
                  />
                </div>
                <div
                  className={`font-display font-bold text-4xl leading-[1.05] ${
                    dark ? "text-primary-foreground" : "text-primary"
                  }`}
                >
                  {p.titulo}
                </div>
              </div>
              <div className={`mt-5 h-px ${dark ? "bg-primary-foreground/15" : "bg-border"}`} />
              <div className="mt-5 grid grid-cols-1 gap-3 content-center">
                {p.itens.map((it) => (
                  <div key={it} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`size-6 shrink-0 ${dark ? "text-accent-glow" : "text-accent"}`}
                    />
                    <span
                      className={`text-xl ${
                        dark ? "text-primary-foreground/90" : "text-primary/85"
                      }`}
                    >
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

/* ---------- 13 · QUEM SOMOS ---------- */
const S13Institucional = () => {
  const stats = [
    { n: "20+", t: "Clientes atendidos" },
    { n: "1.000+", t: "Fornecedores gerenciados" },
    { n: "8", t: "Setores atuando" },
  ];
  const capacidades = [
    { icon: Route, t: "Rastreabilidade" },
    { icon: FileCheck, t: "Governança" },
    { icon: QrCode, t: "Passaporte Digital" },
    { icon: BarChart3, t: "Inteligência" },
  ];
  return (
    <Slide
      bg="bg-hero"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -top-40 -right-20 w-[700px] h-[700px] bg-glow opacity-40 pointer-events-none blur-3xl rounded-full" />
        </>
      }
    >
      <SectionLabel n="12" label="Quem somos" light />

      <div className="mt-6 grid grid-cols-[1.2fr_1fr] gap-12 flex-1 min-h-0">
        <div className="flex flex-col justify-center">
          <img src={mytsLogo} alt="MyTS" className="h-20 self-start" />
          <div className="mt-4 text-lg uppercase tracking-widest text-accent-glow font-semibold">
            My Trusted Source
          </div>
          <p className="mt-6 text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
            Tecnologia e inteligência para gestão de fornecedores, rastreabilidade e
            transparência de cadeias produtivas.
          </p>
          <p className="mt-4 text-base text-primary-foreground/70 leading-relaxed max-w-2xl">
            Combinamos tecnologia, metodologia e conhecimento de cadeia para transformar
            informações dispersas em confiança, acesso a mercado e geração de valor para todos
            os participantes do ecossistema.
          </p>

          <div className="mt-8 grid grid-cols-4 gap-3 max-w-2xl">
            {capacidades.map((c) => (
              <div
                key={c.t}
                className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-3 flex flex-col items-center text-center"
              >
                <c.icon className="size-5 text-accent-glow" />
                <span className="mt-2 text-xs text-primary-foreground/80 font-semibold">
                  {c.t}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5">
          {stats.map((s) => (
            <div
              key={s.t}
              className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-7"
            >
              <div className="font-display font-bold text-8xl text-gradient leading-none">
                {s.n}
              </div>
              <div className="mt-3 text-primary-foreground/75 uppercase tracking-widest text-base font-semibold">
                {s.t}
              </div>
            </div>
          ))}
          <div className="text-[11px] uppercase tracking-widest text-primary-foreground/40 font-semibold">
            números institucionais · editáveis
          </div>
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 14 · NOSSO TIME ---------- */
const S14Time = () => {
  const time = [
    { nome: "Valmir Rodrigues", cargo: "CEO — MyTS", bio: "Lidera a visão e estratégia da MyTS." },
    { nome: "(Nome)", cargo: "Diretoria — Groundd", bio: "Especialista em desenvolvimento territorial." },
    { nome: "(Nome)", cargo: "Groundd", bio: "Metodologia CERS e engajamento comunitário." },
    { nome: "(Nome)", cargo: "RAMO", bio: "Inteligência geoespacial e NatureOS." },
    { nome: "(Nome)", cargo: "MyTS", bio: "Tecnologia e infraestrutura de dados." },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="13" label="Nosso time" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        Especialistas que conectam{" "}
        <span className="text-gradient">tecnologia, território e mercado</span>.
      </h2>

      <div className="mt-10 grid grid-cols-5 gap-5 flex-1 min-h-0">
        {time.map((p, i) => {
          const real = !p.nome.startsWith("(");
          return (
            <div
              key={p.nome + i}
              className={`rounded-2xl p-6 flex flex-col items-center text-center justify-center ${
                real
                  ? "bg-gradient-card border border-border shadow-card"
                  : "bg-muted/30 border border-dashed border-muted-foreground/30"
              }`}
            >
              <AvatarPessoa nome={real ? p.nome : "??"} />
              <div
                className={`mt-5 font-display font-bold text-2xl leading-tight ${
                  real ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {p.nome}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-accent font-semibold">
                {p.cargo}
              </div>
              <div className="mt-3 text-base text-muted-foreground leading-snug">{p.bio}</div>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

/* ---------- 15 · PRÓXIMOS PASSOS ---------- */
const S15Proximos = () => {
  const marcos = [
    { icon: Radar, t: "Diagnóstico", d: "Entender maturidade, desafios e ativos da cadeia." },
    { icon: Layers, t: "Desenho", d: "Definir escopo, módulos e indicadores prioritários." },
    { icon: Zap, t: "Implantação", d: "Onboarding de produtores e captura estruturada de evidências." },
    { icon: Target, t: "Evolução", d: "Passaporte Digital, dashboards e expansão progressiva." },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-20 -bottom-20 w-[360px] [filter:invert(1)] opacity-[0.04]" />}>
      <SectionLabel n="14" label="Próximos passos" />

      <h2 className="mt-5 font-display font-bold text-5xl text-primary leading-[1.05] max-w-5xl">
        Construindo uma nova geração de{" "}
        <span className="text-gradient">cadeias produtivas</span>.
      </h2>

      <p className="mt-4 text-lg text-muted-foreground max-w-4xl">
        Cada projeto é desenvolvido de forma personalizada — considerando as características da
        cadeia, do território e dos objetivos estratégicos do parceiro.
      </p>

      <div className="mt-10 relative flex-1 min-h-0">
        {/* linha do tempo */}
        <div className="absolute top-16 left-8 right-8 h-0.5 bg-gradient-to-r from-accent via-accent-glow to-accent" />

        <div className="grid grid-cols-4 gap-5 relative">
          {marcos.map((m, i) => (
            <div key={m.t} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-accent opacity-30 blur-xl rounded-full" />
                <div className="relative size-24 rounded-full bg-primary border-2 border-accent grid place-items-center">
                  <m.icon className="size-10 text-accent-glow" />
                </div>
              </div>
              <div className="mt-4 text-sm font-mono font-bold text-accent">
                ETAPA 0{i + 1}
              </div>
              <div className="mt-2 font-display font-bold text-2xl text-primary leading-tight">
                {m.t}
              </div>
              <div className="mt-3 text-base text-muted-foreground max-w-[240px] leading-snug">
                {m.d}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border-l-4 border-accent bg-accent/5 px-6 py-4 text-lg text-primary">
        A proposta é estruturar uma infraestrutura digital capaz de{" "}
        <span className="font-semibold">fortalecer produtores, organizar informações e preparar cadeias</span>{" "}
        para os desafios atuais e futuros do mercado.
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

      <div className="max-w-5xl">
        <h1 className="font-display font-bold text-[80px] leading-[0.95] tracking-tight text-primary-foreground">
          Confiança não nasce no{" "}
          <span className="text-primary-foreground/40">ponto de venda</span>.
        </h1>
        <h2 className="mt-4 font-display font-bold text-[56px] leading-[1] tracking-tight text-accent-glow">
          Ela começa na organização da cadeia.
        </h2>

        <div className="mt-8 flex items-center gap-5 text-xl text-primary-foreground/80">
          <span>Dados</span>
          <ArrowRight className="size-4 text-accent-glow" />
          <span>Evidências</span>
          <ArrowRight className="size-4 text-accent-glow" />
          <span>Confiança</span>
          <ArrowRight className="size-4 text-accent-glow" />
          <span className="text-primary-foreground font-semibold">Acesso a mercado</span>
        </div>
      </div>

      <div className="grid grid-cols-[1.3fr_1fr] gap-8 items-end">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-5">
            <div className="text-xs uppercase tracking-widest text-primary-foreground/50">
              CEO
            </div>
            <div className="mt-1 font-display font-bold text-xl text-primary-foreground">
              Valmir Rodrigues
            </div>
            <div className="mt-1 text-xs text-primary-foreground/60">MyTS</div>
          </div>
          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-5">
            <div className="text-xs uppercase tracking-widest text-primary-foreground/50">
              Diretor Comercial
            </div>
            <div className="mt-1 font-display font-bold text-xl text-primary-foreground">
              André Tanzi
            </div>
            <div className="mt-1 text-xs text-primary-foreground/60">MyTS</div>
          </div>
          <a
            href="mailto:contato@myt-s.com"
            className="group flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
          >
            <div className="size-10 rounded-lg bg-gradient-accent grid place-items-center">
              <Mail className="size-4 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-primary-foreground/50">
                Contato
              </div>
              <div className="font-mono text-sm text-primary-foreground truncate">
                contato@myt-s.com
              </div>
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
              <div className="text-[10px] uppercase tracking-widest text-primary-foreground/50">
                Web
              </div>
              <div className="font-mono text-sm text-primary-foreground truncate">
                www.myt-s.com
              </div>
            </div>
          </a>
        </div>

        <div className="flex flex-col items-end gap-4">
          <img src={mytsLogo} alt="MyTS" className="h-12 opacity-95" />
          <div className="text-[11px] uppercase tracking-widest text-primary-foreground/50 font-semibold">
            Em parceria com
          </div>
          <div className="flex items-center gap-5">
            <PartnerLogo src={grounddAsset.url} alt="Groundd" className="h-9" />
            <PartnerLogo src={ramoAsset.url} alt="RAMO" className="h-9" />
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
      <title>MyTS — Infraestrutura Digital de Confiança</title>
      <meta
        name="description"
        content="MyTS: infraestrutura digital de confiança para cadeias produtivas. Transformamos origem, evidências e impacto em valor — em parceria com Groundd e RAMO."
      />
    </Helmet>
    <S01Capa />
    <S02Mercado />
    <S03Desafio />
    <S04Consequencia />
    <S05Resposta />
    <S06ComoFunciona />
    <S07Alem />
    <S08Passaporte />
    <S09Ecossistema />
    <S10Aplicacoes />
    <S11Experiencia />
    <S12Valor />
    <S13Institucional />
    <S14Time />
    <S15Proximos />
    <S16Encerramento />
  </main>
);

export default MytsPassaporte;
