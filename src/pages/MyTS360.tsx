import { Helmet } from "react-helmet-async";
import {
  Sparkles,
  ArrowRight,
  ArrowDown,
  Award,
  QrCode,
  Globe,
  Users,
  Share2,
  ShieldCheck,
  HeartHandshake,
  Smartphone,
  Clock,
  TrendingUp,
  CheckCircle2,
  Megaphone,
  Store,
  Newspaper,
  Building2,
  Factory,
  ShoppingBag,
  Eye,
  BookOpen,
  Leaf,
  Mail,
  Link as LinkIcon,
  Sprout,
  Camera,
  MessageCircle,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";

/* -----------------------------------------------------------
   MyTS 360 · Produtor do Bem — slides 16:9
   ----------------------------------------------------------- */

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/80">
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
    className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
      light ? "text-accent-glow" : "text-accent"
    }`}
  >
    <span className="font-mono">{n}</span>
    <span className={`h-px w-10 ${light ? "bg-accent-glow/60" : "bg-accent/50"}`} />
    {label}
  </div>
);

const Slide = ({
  bg = "bg-background",
  className = "",
  children,
  decor,
  pad = "p-8 md:p-14",
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

/* ---------- 01 · HERO ---------- */
const Hero = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-glow opacity-60 pointer-events-none blur-3xl rounded-full" />
        <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
      </>
    }
  >
    <div className="flex h-full items-center gap-10">
      <div className="flex-1 min-w-0">
        <Chip>
          <Sprout className="size-3.5 text-accent-glow" />
          Proposta · Produtor do Bem × MyTS
        </Chip>

        <h1 className="mt-6 font-display font-bold text-6xl md:text-8xl leading-[0.95] tracking-tight text-primary-foreground">
          MyTS <span className="text-gradient">360</span>
        </h1>

        <p className="mt-5 text-lg md:text-2xl text-primary-foreground/85 max-w-2xl leading-snug font-medium">
          Transformando certificações em{" "}
          <span className="text-accent-glow font-semibold">experiências de transparência</span>.
        </p>

        <p className="mt-4 text-sm md:text-base text-primary-foreground/65 max-w-2xl leading-relaxed">
          Uma plataforma para ampliar o valor das certificações, fortalecer as marcas certificadas
          e aproximar consumidores da origem dos alimentos.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {["Transparência", "Storytelling", "Confiança", "Valorização do produtor"].map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-5">
          <div className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/15 px-4 py-2.5">
            <div className="text-[10px] uppercase tracking-widest text-primary-foreground/55">
              Para
            </div>
            <div className="font-display font-bold text-primary-foreground text-lg leading-tight">
              Produtor do Bem
            </div>
          </div>
          <div className="h-10 w-px bg-primary-foreground/15" />
          <div className="text-primary-foreground/70 text-xs uppercase tracking-widest">
            Metodologia
          </div>
          <img src={mytsLogo} alt="MyTS" className="h-8 opacity-90" />
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 02 · SOBRE — CONTEXTO ---------- */
const Sobre = () => (
  <Slide
    bg="bg-background"
    decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
  >
    <SectionLabel n="01" label="Por que MyTS 360" />

    <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-[1.05] max-w-4xl">
      Tornando visível o que <span className="text-gradient">já é praticado</span>
    </h2>

    <div className="mt-8 grid md:grid-cols-[1.4fr_1fr] gap-8 flex-1">
      <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        <p>
          A <span className="font-semibold text-primary">Produtor do Bem</span> nasceu com um propósito
          claro: promover sistemas de produção mais responsáveis e conectar empresas, produtores e
          consumidores por meio da confiança.
        </p>
        <p>
          Suas certificações representam muito mais do que conformidade — reconhecem boas práticas em{" "}
          <span className="font-semibold text-primary">bem-estar animal</span>,{" "}
          <span className="font-semibold text-primary">sustentabilidade</span>,{" "}
          responsabilidade socioambiental e qualidade na produção.
        </p>
        <p>
          O desafio é que grande parte desse valor permanece{" "}
          <span className="font-semibold text-primary">invisível ao consumidor final</span>. O MyTS 360
          nasce para ampliar esse valor, transformando cada certificação em uma experiência digital de
          transparência, educação e relacionamento.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-accent opacity-15 blur-2xl rounded-full" />
        <div className="relative rounded-3xl border border-border bg-gradient-card shadow-elegant p-7 h-full flex flex-col justify-center">
          <ShieldCheck className="size-7 text-accent" />
          <div className="mt-4 font-display font-bold text-3xl text-primary leading-tight">
            Não substituímos a certificação.
          </div>
          <div className="mt-3 text-base text-muted-foreground leading-relaxed">
            Tornamos seu valor{" "}
            <span className="font-semibold text-primary">visível</span> para quem realmente importa:
            o consumidor.
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 03 · DA CERTIFICAÇÃO À EXPERIÊNCIA ---------- */
const DaCertificacao = () => {
  const hoje = [
    { icon: Building2, t: "Empresa certificada" },
    { icon: Award, t: "Recebe o selo" },
    { icon: ShoppingBag, t: "Aplica na embalagem" },
    { icon: Eye, t: "Consumidor reconhece" },
    { icon: ArrowDown, t: "Fim da jornada", muted: true },
  ];
  const com = [
    { icon: Building2, t: "Empresa certificada" },
    { icon: Award, t: "Selo Produtor do Bem" },
    { icon: QrCode, t: "QR Code na embalagem" },
    { icon: Globe, t: "Website personalizado" },
    { icon: Users, t: "Conheça produtores & fazendas" },
    { icon: BookOpen, t: "Boas práticas + significado da certificação" },
    { icon: Share2, t: "Compartilhe e fortaleça a confiança" },
  ];
  return (
    <Slide
      bg="bg-background"
      decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="02" label="Da certificação à experiência" />

      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-primary leading-[1.05] max-w-4xl">
        A certificação deixa de ser um selo —{" "}
        <span className="text-gradient">passa a contar uma história</span>
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-5 flex-1 min-h-0">
        {/* HOJE */}
        <div className="rounded-2xl border border-border bg-gradient-card shadow-card p-5 flex flex-col min-h-0">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">
              Hoje
            </div>
            <span className="text-[10px] text-muted-foreground/70 px-2 py-0.5 rounded-full border border-border">
              jornada curta
            </span>
          </div>
          <div className="mt-3 flex-1 flex flex-col gap-1.5 min-h-0">
            {hoje.map((s, i) => (
              <div key={s.t + i}>
                <div
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 ${
                    s.muted
                      ? "bg-muted/40 text-muted-foreground"
                      : "bg-background border border-border text-primary"
                  }`}
                >
                  <s.icon className="size-3.5 shrink-0" />
                  <span className="text-[12px] font-medium">{s.t}</span>
                </div>
                {i < hoje.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="size-2.5 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COM MyTS 360 */}
        <div className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-accent-glow/5 shadow-elegant p-5 flex flex-col min-h-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-accent">
              <Sparkles className="size-3.5" /> Com MyTS 360
            </div>
            <span className="text-[10px] text-accent px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10">
              jornada ampliada
            </span>
          </div>
          <div className="mt-3 flex-1 flex flex-col gap-1 min-h-0">
            {com.map((s, i) => (
              <div key={s.t}>
                <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 bg-background/70 border border-accent/20">
                  <div className="size-6 rounded-md bg-gradient-accent flex items-center justify-center shrink-0">
                    <s.icon className="size-3 text-accent-foreground" />
                  </div>
                  <span className="text-[12px] font-medium text-primary">{s.t}</span>
                </div>
                {i < com.length - 1 && (
                  <div className="flex justify-center py-0">
                    <ArrowDown className="size-2.5 text-accent/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-center text-sm">
        Cada produto passa a mostrar{" "}
        <span className="text-accent-glow font-semibold">
          quem produziu, quais práticas foram adotadas e por que a certificação faz diferença.
        </span>
      </div>
    </Slide>
  );
};

/* ---------- 04 · BENEFÍCIOS — ECOSSISTEMA ---------- */
const Beneficios = () => {
  const colunas = [
    {
      icon: ShieldCheck,
      eyebrow: "Para a Produtor do Bem",
      cor: "from-accent/15 to-accent/0",
      borda: "border-accent/30",
      itens: [
        "Fortalece o reconhecimento da certificação",
        "Aproxima consumidores da missão",
        "Amplia a visibilidade do trabalho",
        "Gera valor percebido para novas empresas certificadas",
      ],
    },
    {
      icon: Factory,
      eyebrow: "Para as empresas certificadas",
      cor: "from-primary/10 to-primary/0",
      borda: "border-primary/25",
      itens: [
        "Diferencia seus produtos no PDV",
        "Valoriza seus produtores",
        "Reforça atributos de sustentabilidade",
        "Cria experiência digital para consumidores",
        "Gera conteúdo para marketing",
      ],
    },
    {
      icon: HeartHandshake,
      eyebrow: "Para o consumidor",
      cor: "from-accent-glow/15 to-accent-glow/0",
      borda: "border-accent-glow/30",
      itens: [
        "Conhece quem produziu",
        "Entende o significado da certificação",
        "Descobre o impacto positivo da sua compra",
        "Desenvolve maior confiança na marca",
      ],
    },
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -bottom-32 right-1/4 size-[600px] bg-glow opacity-50 blur-3xl rounded-full" />
          <MytsWatermark className="-left-16 -top-16 w-[360px]" />
        </>
      }
    >
      <SectionLabel n="03" label="Benefícios para todo o ecossistema" light />

      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl leading-[1.05] max-w-4xl text-primary-foreground">
        Um modelo que fortalece <span className="text-gradient">toda a cadeia</span>
      </h2>

      <div className="mt-6 flex-1 grid grid-cols-3 gap-4 min-h-0">
        {colunas.map((c) => (
          <div
            key={c.eyebrow}
            className={`rounded-2xl border-2 ${c.borda} bg-gradient-to-b ${c.cor} bg-primary/40 backdrop-blur-sm p-5 flex flex-col min-h-0`}
          >
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
                <c.icon className="size-5 text-accent-foreground" />
              </div>
              <div className="text-[11px] uppercase tracking-widest font-semibold text-accent-glow leading-tight">
                {c.eyebrow}
              </div>
            </div>
            <div className="mt-4 space-y-2 flex-1">
              {c.itens.map((it) => (
                <div
                  key={it}
                  className="flex items-start gap-2.5 text-[13px] text-primary-foreground/90 leading-snug"
                >
                  <CheckCircle2 className="size-3.5 text-accent-glow shrink-0 mt-0.5" />
                  <span>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-accent-glow/25 bg-accent-glow/10 px-5 py-3 text-center">
        <p className="text-primary-foreground text-sm md:text-base">
          O MyTS 360 fortalece toda a cadeia:{" "}
          <span className="text-accent-glow font-semibold">
            quem certifica, quem produz e quem consome.
          </span>
        </p>
      </div>
    </Slide>
  );
};

/* ---------- 05 · MODELO VALIDADO ---------- */
const ModeloValidado = () => {
  const stats = [
    { icon: TrendingUp, v: "+9.700", l: "acessos ao ambiente digital" },
    { icon: Smartphone, v: "83%", l: "via dispositivos móveis" },
    { icon: Clock, v: "+2min", l: "tempo médio de navegação" },
    { icon: Users, v: "milhares", l: "de consumidores conectados à origem" },
  ];
  const entregas = [
    { icon: Globe, t: "Website" },
    { icon: QrCode, t: "QR Code nas embalagens" },
    { icon: BookOpen, t: "Histórias dos produtores" },
    { icon: Camera, t: "Conteúdo institucional" },
    { icon: Newspaper, t: "Assessoria de imprensa" },
    { icon: MessageCircle, t: "Redes sociais" },
    { icon: Megaphone, t: "Posicionamento da marca" },
  ];
  return (
    <Slide
      bg="bg-background"
      decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="04" label="Um modelo validado" />

      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-primary leading-[1.05] max-w-4xl">
        Projeto entregue para uma indústria brasileira de alimentos —{" "}
        <span className="text-gradient">resultados em ~1 ano</span>
      </h2>

      <div className="mt-5 grid grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-gradient-card shadow-card p-4">
            <s.icon className="size-5 text-accent" />
            <div className="mt-2 font-display font-bold text-3xl text-primary leading-none">{s.v}</div>
            <div className="mt-2 text-[11px] text-muted-foreground leading-snug">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex-1 rounded-2xl border-2 border-accent/30 bg-accent/5 p-5 min-h-0 flex flex-col">
        <div className="flex items-center gap-2 text-accent font-semibold uppercase text-[11px] tracking-widest">
          <CheckCircle2 className="size-4" /> O que foi entregue
        </div>
        <div className="mt-3 grid grid-cols-7 gap-2.5 flex-1">
          {entregas.map((e) => (
            <div
              key={e.t}
              className="rounded-xl border border-border bg-background p-3 flex flex-col items-center justify-center text-center gap-2"
            >
              <div className="size-9 rounded-lg bg-gradient-accent flex items-center justify-center">
                <e.icon className="size-4 text-accent-foreground" />
              </div>
              <div className="text-[11px] font-semibold text-primary leading-tight">{e.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-center text-sm">
        Consumidores valorizam{" "}
        <span className="text-accent-glow font-semibold">
          conhecer a origem dos alimentos e as pessoas por trás da produção.
        </span>
      </div>
    </Slide>
  );
};

/* ---------- 06 · O MERCADO JÁ ESTÁ EVOLUINDO ---------- */
const Mercado = () => {
  const marcas = [
    { nome: "Vital Farms", flag: "us" },
    { nome: "Carrefour", flag: "fr" },
    { nome: "Minerva", flag: "br" },
    { nome: "NatureSweet", flag: "us" },
    { nome: "Barilla", flag: "it" },
    { nome: "Tesco", flag: "gb" },
  ];
  const praticas = [
    "QR Codes",
    "Histórias dos produtores",
    "Rastreabilidade",
    "Sustentabilidade",
    "Conteúdo digital",
    "Transparência",
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -top-32 right-1/4 size-[600px] bg-glow opacity-40 blur-3xl rounded-full" />
          <MytsWatermark className="-left-16 -bottom-16 w-[360px]" />
        </>
      }
    >
      <SectionLabel n="05" label="O mercado já está evoluindo" light />

      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl leading-[1.05] max-w-5xl text-primary-foreground">
        Transparência deixou de ser tendência.{" "}
        <span className="text-gradient">Passou a ser diferencial competitivo.</span>
      </h2>

      <div className="mt-6 grid grid-cols-6 gap-3">
        {marcas.map((m) => (
          <div
            key={m.nome}
            className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur p-3 flex flex-col items-center gap-2"
          >
            <img
              src={`https://flagcdn.com/w40/${m.flag}.png`}
              alt={m.flag.toUpperCase()}
              className="h-4 w-auto rounded shadow-sm"
            />
            <div className="font-display font-bold text-[13px] text-primary-foreground text-center leading-tight">
              {m.nome}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex-1 grid grid-cols-[1fr_1.4fr] gap-5 min-h-0">
        <div className="rounded-2xl border-2 border-accent-glow/25 bg-primary-foreground/[0.04] backdrop-blur p-5 flex flex-col justify-center">
          <Eye className="size-7 text-accent-glow" />
          <div className="mt-3 font-display font-bold text-xl text-primary-foreground leading-tight">
            As principais marcas do setor já estão usando…
          </div>
          <div className="mt-2 text-[13px] text-primary-foreground/75 leading-relaxed">
            …para gerar confiança e fortalecer suas marcas.
          </div>
        </div>

        <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur p-5 flex flex-col">
          <div className="text-[11px] uppercase tracking-widest text-accent-glow font-semibold">
            O que estão fazendo
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 flex-1">
            {praticas.map((p) => (
              <div
                key={p}
                className="flex items-center gap-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 px-3 py-2"
              >
                <CheckCircle2 className="size-4 text-accent-glow shrink-0" />
                <span className="text-[13px] text-primary-foreground font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 07 · OPORTUNIDADE — slide mais bonito ---------- */
const Oportunidade = () => {
  const hoje = ["Protocolos", "Auditorias", "Certificações", "Credibilidade"];
  const novos = [
    { icon: BookOpen, t: "Storytelling" },
    { icon: Eye, t: "Transparência" },
    { icon: Smartphone, t: "Experiência digital" },
    { icon: Sprout, t: "Valorização dos produtores" },
    { icon: Megaphone, t: "Conteúdo para marketing" },
    { icon: Store, t: "Diferenciação no PDV" },
    { icon: Users, t: "Relacionamento com consumidores" },
    { icon: TrendingUp, t: "Inteligência para a cadeia" },
  ];
  return (
    <Slide
      bg="bg-hero"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-15" />
          <div className="absolute -top-40 left-1/4 size-[700px] bg-glow opacity-55 blur-3xl rounded-full" />
          <div className="absolute -bottom-32 right-1/4 size-[500px] bg-glow opacity-40 blur-3xl rounded-full" />
          <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
        </>
      }
    >
      <SectionLabel n="06" label="Oportunidade para a Produtor do Bem" light />

      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl leading-[1.05] max-w-5xl text-primary-foreground">
        Um <span className="text-gradient">novo benefício</span> para todas as empresas certificadas
      </h2>

      <div className="mt-6 grid grid-cols-[0.85fr_auto_1.6fr] gap-5 items-stretch flex-1 min-h-0">
        {/* HOJE */}
        <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur p-5 flex flex-col">
          <div className="text-[11px] uppercase tracking-widest font-semibold text-primary-foreground/55">
            Hoje, a Produtor do Bem entrega
          </div>
          <div className="mt-3 space-y-2 flex-1">
            {hoje.map((h) => (
              <div
                key={h}
                className="flex items-center gap-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 px-3 py-2"
              >
                <CheckCircle2 className="size-4 text-primary-foreground/60 shrink-0" />
                <span className="text-[13px] font-semibold text-primary-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* + */}
        <div className="flex flex-col items-center justify-center px-1">
          <div className="size-12 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow">
            <span className="font-display font-bold text-2xl text-accent-foreground">+</span>
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-accent-glow font-semibold">
            MyTS 360
          </div>
        </div>

        {/* NOVO */}
        <div className="relative rounded-2xl border-2 border-accent-glow/40 bg-gradient-to-br from-accent/15 to-accent-glow/5 backdrop-blur p-5 flex flex-col shadow-elegant">
          <div className="absolute -top-3 left-5 rounded-full bg-gradient-accent px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-accent-foreground shadow-cta">
            Novo
          </div>
          <div className="text-[11px] uppercase tracking-widest font-semibold text-accent-glow">
            Passa a entregar também
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 flex-1">
            {novos.map((n) => (
              <div
                key={n.t}
                className="flex items-center gap-2.5 rounded-lg bg-primary-foreground/[0.06] border border-accent-glow/20 px-3 py-2"
              >
                <div className="size-7 rounded-md bg-gradient-accent flex items-center justify-center shrink-0">
                  <n.icon className="size-3.5 text-accent-foreground" />
                </div>
                <span className="text-[12.5px] font-semibold text-primary-foreground leading-tight">
                  {n.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-accent-glow/25 bg-primary-foreground/[0.05] backdrop-blur px-5 py-3 text-center">
        <p className="text-primary-foreground text-sm md:text-base">
          Cada certificação passa a contar uma história. Cada produto passa a mostrar seu propósito.{" "}
          <span className="text-accent-glow font-semibold">
            Cada consumidor passa a entender o valor por trás do selo.
          </span>
        </p>
      </div>
    </Slide>
  );
};

/* ---------- 08 · MENSAGEM FINAL ---------- */
const MensagemFinal = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute -top-32 left-1/3 size-[700px] bg-glow opacity-60 blur-3xl rounded-full" />
        <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
      </>
    }
  >
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <Chip>
        <HeartHandshake className="size-3.5 text-accent-glow" />
        MyTS 360
      </Chip>

      <h2 className="mt-8 font-display font-bold text-5xl md:text-7xl leading-[1.02] tracking-tight text-primary-foreground max-w-5xl">
        Transformando certificações em{" "}
        <span className="text-gradient">experiências de confiança.</span>
      </h2>

      <div className="mt-12 w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur-xl p-7 md:p-8">
          <div className="absolute -right-24 -top-24 size-72 bg-glow opacity-50 blur-3xl rounded-full" />
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-accent" />

          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-7 items-center text-left">
            <div>
              <div className="flex items-center gap-3">
                <img src={mytsLogo} alt="MyTS" className="h-5 opacity-90" />
                <span className="h-px w-8 bg-primary-foreground/25" />
                <span className="text-[13.5px] uppercase tracking-[0.2em] font-semibold text-accent-glow">
                  Próximo passo
                </span>
              </div>
              <p className="mt-4 font-display font-semibold text-2xl md:text-[26px] leading-[1.15] text-primary-foreground">
                Vamos desenhar isso para a{" "}
                <span className="text-gradient">Produtor do Bem?</span>
              </p>
              <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
                Agende uma conversa com{" "}
                <span className="font-semibold text-primary-foreground">André Tanzi</span>, Diretor
                Comercial da MyTS.
              </p>
            </div>

            <div className="md:border-l md:border-primary-foreground/10 md:pl-7 space-y-2.5">
              <a
                href="mailto:andre.tanzi@myt-s.com"
                className="group flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3.5 py-2.5 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
              >
                <div className="size-8 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                  <Mail className="size-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] uppercase tracking-widest text-primary-foreground/50">
                    E-mail
                  </div>
                  <div className="font-mono text-xs text-primary-foreground truncate">
                    andre.tanzi@myt-s.com
                  </div>
                </div>
                <ArrowRight className="size-4 text-accent-glow group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3.5 py-2.5 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
              >
                <div className="size-8 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                  <LinkIcon className="size-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] uppercase tracking-widest text-primary-foreground/50">
                    LinkedIn
                  </div>
                  <div className="text-xs text-primary-foreground truncate">André Tanzi</div>
                </div>
                <ArrowRight className="size-4 text-accent-glow group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- PAGE ---------- */
const MyTS360 = () => (
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
      <title>MyTS 360 — Transformando certificações em experiências · Produtor do Bem</title>
      <meta
        name="description"
        content="MyTS 360: plataforma para ampliar o valor das certificações Produtor do Bem, fortalecer marcas e aproximar consumidores da origem dos alimentos."
      />
    </Helmet>
    <Hero />
    <Sobre />
    <DaCertificacao />
    <Beneficios />
    <ModeloValidado />
    <Mercado />
    <Oportunidade />
    <MensagemFinal />
  </main>
);

export default MyTS360;
