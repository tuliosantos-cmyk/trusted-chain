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

/* ---------- 01 · HERO ---------- */
const Hero = () => (
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
    <div className="flex h-full items-center gap-12">
      <div className="flex-1 min-w-0">
        <Chip>
          <Sprout className="size-4 text-accent-glow" />
          Proposta · Produtor do Bem × MyTS
        </Chip>

        <h1 className="mt-8 font-display font-bold text-[140px] leading-[0.9] tracking-tight text-primary-foreground">
          MyTS <span className="text-gradient">360</span>
        </h1>

        <p className="mt-8 text-4xl text-primary-foreground/90 max-w-3xl leading-tight font-medium">
          Transformando certificações em{" "}
          <span className="text-accent-glow font-semibold">experiências de transparência</span>.
        </p>

        <p className="mt-6 text-xl text-primary-foreground/70 max-w-3xl leading-relaxed">
          Uma plataforma para ampliar o valor das certificações, fortalecer as marcas certificadas
          e aproximar consumidores da origem dos alimentos.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {["Transparência", "Storytelling", "Confiança", "Valorização do produtor"].map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-6">
          <div className="rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 px-5 py-3">
            <div className="text-xs uppercase tracking-widest text-primary-foreground/55">
              Para
            </div>
            <div className="font-display font-bold text-primary-foreground text-2xl leading-tight">
              Produtor do Bem
            </div>
          </div>
          <div className="h-12 w-px bg-primary-foreground/15" />
          <div className="text-primary-foreground/70 text-xs uppercase tracking-widest">
            Metodologia
          </div>
          <img src={mytsLogo} alt="MyTS" className="h-12 opacity-90" />
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 02 · SOBRE — CONTEXTO ---------- */
const Sobre = () => (
  <Slide
    bg="bg-background"
    decor={<MytsWatermark className="-right-20 -bottom-20 w-[440px] [filter:invert(1)] opacity-[0.04]" />}
  >
    <SectionLabel n="01" label="Por que MyTS 360" />

    <h2 className="mt-5 font-display font-bold text-6xl text-primary leading-[1.05] max-w-5xl">
      Tornando visível o que <span className="text-gradient">já é praticado</span>
    </h2>

    <div className="mt-10 grid grid-cols-[1.4fr_1fr] gap-10 flex-1 min-h-0">
      <div className="flex flex-col justify-center gap-8 text-2xl text-muted-foreground leading-relaxed max-w-3xl">
        <p>
          A <span className="font-semibold text-primary">Produtor do Bem</span> certifica boas práticas
          reais em <span className="font-semibold text-primary">bem-estar animal</span>,{" "}
          <span className="font-semibold text-primary">sustentabilidade</span> e responsabilidade
          socioambiental — um valor que hoje permanece{" "}
          <span className="font-semibold text-primary">invisível ao consumidor final</span>.
        </p>
        <p>
          Quando esse valor não chega à prateleira, o produto certificado{" "}
          <span className="font-semibold text-primary">compete no preço como qualquer outro</span> — e
          a lealdade que a boa prática mereceria nunca se forma. O MyTS 360 nasce para virar esse jogo.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 bg-gradient-accent opacity-15 blur-2xl rounded-full" />
        <div className="relative rounded-3xl border border-border bg-gradient-card shadow-elegant p-10 h-full flex flex-col justify-center">
          <ShieldCheck className="size-12 text-accent" />
          <div className="mt-6 font-display font-bold text-5xl text-primary leading-tight">
            Não substituímos a certificação.
          </div>
          <div className="mt-5 text-xl text-muted-foreground leading-relaxed">
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
  const partida = [
    { icon: Building2, t: "Empresa certificada" },
    { icon: Award, t: "Selo Produtor do Bem" },
  ];
  const experiencia = [
    { icon: Globe, t: "Website personalizado" },
    { icon: Users, t: "Conheça produtores & fazendas" },
    { icon: BookOpen, t: "Boas práticas + significado do selo" },
  ];
  return (
    <Slide
      bg="bg-background"
      pad="p-10 md:p-12"
      decor={<MytsWatermark className="-right-20 -bottom-20 w-[440px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="02" label="Da certificação à experiência" />

      <h2 className="mt-3 font-display font-bold text-4xl text-primary leading-[1.05] max-w-5xl">
        A certificação deixa de ser um selo —{" "}
        <span className="text-gradient">passa a contar uma história</span>
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-6 flex-1 min-h-0">
        {/* HOJE */}
        <div className="rounded-2xl border border-border bg-gradient-card shadow-card p-5 flex flex-col min-h-0">
          <div className="flex items-center justify-between">
            <div className="text-sm uppercase tracking-widest font-semibold text-muted-foreground">
              Hoje
            </div>
            <span className="text-xs text-muted-foreground/70 px-3 py-1 rounded-full border border-border">
              jornada curta
            </span>
          </div>
          <div className="mt-3 flex-1 flex flex-col justify-around min-h-0">
            {hoje.map((s, i) => (
              <div key={s.t + i}>
                <div
                  className={`flex items-center gap-4 rounded-xl px-4 py-2.5 ${
                    s.muted
                      ? "bg-muted/40 text-muted-foreground"
                      : "bg-background border border-border text-primary"
                  }`}
                >
                  <s.icon className="size-5 shrink-0" />
                  <span className="text-base font-medium">{s.t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COM MyTS 360 */}
        <div className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-accent-glow/5 shadow-elegant p-5 flex flex-col min-h-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-sm uppercase tracking-widest font-semibold text-accent">
              <Sparkles className="size-4" /> Com MyTS 360
            </div>
            <span className="text-xs text-accent px-3 py-1 rounded-full border border-accent/40 bg-accent/10">
              jornada ampliada
            </span>
          </div>
          <div className="mt-3 flex-1 flex flex-col justify-between gap-2.5 min-h-0">
            {/* Linha 1 — ponto de partida */}
            <div className="grid grid-cols-2 gap-2.5">
              {partida.map((s) => (
                <div
                  key={s.t}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 bg-background/70 border border-accent/20"
                >
                  <div className="size-7 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                    <s.icon className="size-3.5 text-accent-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-primary leading-tight">{s.t}</span>
                </div>
              ))}
            </div>

            {/* Linha 2 — gatilho QR (destaque) */}
            <div className="flex items-center gap-3.5 rounded-xl px-4 py-2.5 bg-accent/15 border-2 border-accent/50 shadow-glow">
              <div className="size-9 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                <QrCode className="size-5 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-widest font-bold text-accent">o gatilho</div>
                <div className="text-base font-bold text-primary leading-tight">QR Code na embalagem</div>
              </div>
            </div>

            {/* Linha 3 — experiência digital agrupada */}
            <div className="rounded-xl border border-accent/25 bg-background/50 p-3">
              <div className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2 flex items-center gap-2">
                <Sparkles className="size-3" /> Experiência digital
              </div>
              <div className="space-y-1">
                {experiencia.map((s) => (
                  <div key={s.t} className="flex items-center gap-3 text-primary">
                    <s.icon className="size-3.5 shrink-0 text-accent" />
                    <span className="text-sm font-medium leading-tight">{s.t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Linha 4 — resultado */}
            <div className="flex items-center gap-3 rounded-xl px-4 py-2.5 bg-gradient-accent text-accent-foreground">
              <Share2 className="size-4 shrink-0" />
              <span className="text-base font-bold leading-tight">
                Compartilhe e fortaleça a confiança
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-primary text-primary-foreground px-6 py-3 text-center text-base">
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
        "Torna a certificação mais atraente para novas empresas",
        "Fortalece o reconhecimento da certificação",
        "Amplia a visibilidade do trabalho",
        "Aproxima consumidores da missão",
      ],
    },
    {
      icon: Factory,
      eyebrow: "Para as empresas certificadas",
      cor: "from-primary/10 to-primary/0",
      borda: "border-primary/25",
      itens: [
        "Diferencia seus produtos no PDV",
        "Justifica preço premium na prateleira",
        "Valoriza seus produtores",
        "Reforça atributos de sustentabilidade",
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
          <div className="absolute -bottom-40 right-1/4 size-[700px] bg-glow opacity-50 blur-3xl rounded-full" />
          <MytsWatermark className="-left-20 -top-20 w-[440px]" />
        </>
      }
    >
      <SectionLabel n="03" label="Benefícios para todo o ecossistema" light />

      <h2 className="mt-5 font-display font-bold text-5xl leading-[1.05] max-w-5xl text-primary-foreground">
        Um modelo que fortalece <span className="text-gradient">toda a cadeia</span>
      </h2>

      <div className="mt-10 flex-1 grid grid-cols-3 gap-6 min-h-0">
        {colunas.map((c) => (
          <div
            key={c.eyebrow}
            className={`rounded-3xl border-2 ${c.borda} bg-gradient-to-b ${c.cor} bg-primary/40 backdrop-blur-sm p-8 flex flex-col min-h-0`}
          >
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-2xl bg-gradient-accent flex items-center justify-center shrink-0">
                <c.icon className="size-8 text-accent-foreground" />
              </div>
              <div className="text-sm uppercase tracking-widest font-semibold text-accent-glow leading-tight">
                {c.eyebrow}
              </div>
            </div>
            <div className="mt-7 flex-1 flex flex-col justify-around gap-2">
              {c.itens.map((it) => (
                <div
                  key={it}
                  className="flex items-start gap-3 text-xl text-primary-foreground/90 leading-snug"
                >
                  <CheckCircle2 className="size-6 text-accent-glow shrink-0 mt-0.5" />
                  <span>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-accent-glow/25 bg-accent-glow/10 px-7 py-4 text-center">
        <p className="text-primary-foreground text-xl">
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
    { icon: TrendingUp, v: "+9.700", l: "sessões registradas no ambiente digital" },
    { icon: Smartphone, v: "83%", l: "via dispositivos móveis" },
    { icon: Clock, v: "+2min", l: "tempo médio por sessão" },
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
      pad="p-10 md:p-12"
      decor={<MytsWatermark className="-right-20 -bottom-20 w-[440px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="04" label="Um modelo validado" />

      <h2 className="mt-3 font-display font-bold text-4xl text-primary leading-[1.05] max-w-5xl">
        Projeto entregue para uma indústria brasileira de alimentos —{" "}
        <span className="text-gradient">resultados em ~1 ano</span>
      </h2>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-border bg-gradient-card shadow-card p-4"
          >
            <s.icon className="size-7 text-accent" />
            <div className="mt-2 font-display font-bold text-3xl text-primary leading-none whitespace-nowrap">
              {s.v}
            </div>
            <div className="mt-1.5 text-sm text-muted-foreground leading-snug">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex-1 rounded-3xl border-2 border-accent/30 bg-accent/5 p-4 min-h-0 flex flex-col">
        <div className="flex items-center gap-2.5 text-accent font-semibold uppercase text-sm tracking-widest">
          <CheckCircle2 className="size-5" /> O que foi entregue
        </div>
        <div className="mt-3 grid grid-cols-7 gap-3 flex-1">
          {entregas.map((e) => (
            <div
              key={e.t}
              className="rounded-2xl border border-border bg-background p-2.5 flex flex-col items-center justify-center text-center gap-2"
            >
              <div className="size-10 rounded-xl bg-gradient-accent flex items-center justify-center">
                <e.icon className="size-5 text-accent-foreground" />
              </div>
              <div className="text-xs font-semibold text-primary leading-tight">{e.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-primary text-primary-foreground px-6 py-3 text-center text-base">
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
    { nome: "Mowi", flag: "no" },
    { nome: "Llet Nostra", flag: "es" },
  ];
  const praticas = [
    "QR Codes",
    "Histórias dos produtores",
    "Origem dos alimentos",
    "Bem-estar animal",
    "Sustentabilidade",
    "Conteúdo digital",
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -top-40 right-1/4 size-[700px] bg-glow opacity-40 blur-3xl rounded-full" />
          <MytsWatermark className="-left-20 -bottom-20 w-[440px]" />
        </>
      }
    >
      <SectionLabel n="05" label="O mercado já está evoluindo" light />

      <h2 className="mt-5 font-display font-bold text-6xl leading-[1.05] max-w-6xl text-primary-foreground">
        Transparência deixou de ser tendência.{" "}
        <span className="text-gradient">Passou a ser diferencial competitivo.</span>
      </h2>

      <div className="mt-9 grid grid-cols-6 gap-4">
        {marcas.map((m) => (
          <div
            key={m.nome}
            className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur p-5 flex flex-col items-center gap-3"
          >
            <img
              src={`https://flagcdn.com/w80/${m.flag}.png`}
              alt={m.flag.toUpperCase()}
              className="h-7 w-auto rounded shadow-sm"
            />
            <div className="font-display font-bold text-xl text-primary-foreground text-center leading-tight">
              {m.nome}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex-1 grid grid-cols-[1fr_1.4fr] gap-6 min-h-0">
        <div className="rounded-3xl border-2 border-accent-glow/25 bg-primary-foreground/[0.04] backdrop-blur p-8 flex flex-col justify-center">
          <Eye className="size-12 text-accent-glow" />
          <div className="mt-5 font-display font-bold text-3xl text-primary-foreground leading-tight">
            As principais marcas do setor já estão usando…
          </div>
          <div className="mt-4 text-lg text-primary-foreground/75 leading-relaxed">
            …para gerar confiança e fortalecer suas marcas.
          </div>
        </div>

        <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur p-8 flex flex-col">
          <div className="text-sm uppercase tracking-widest text-accent-glow font-semibold">
            O que estão fazendo
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 flex-1">
            {praticas.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3"
              >
                <CheckCircle2 className="size-6 text-accent-glow shrink-0" />
                <span className="text-lg text-primary-foreground font-medium">{p}</span>
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
    { icon: Store, t: "Diferenciação no PDV" },
    { icon: Users, t: "Relacionamento com consumidores" },
  ];
  return (
    <Slide
      bg="bg-hero"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-15" />
          <div className="absolute top-1/3 -right-40 size-[700px] bg-glow opacity-45 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 left-1/4 size-[600px] bg-glow opacity-35 blur-3xl rounded-full" />
          <MytsWatermark className="-right-24 -bottom-24 w-[480px]" />
        </>
      }
    >
      <SectionLabel n="06" label="Oportunidade para a Produtor do Bem" light />

      <h2 className="mt-4 font-display font-bold text-5xl leading-[1.05] max-w-6xl text-primary-foreground">
        Um <span className="text-gradient">novo benefício</span> para todas as empresas certificadas
      </h2>

      <div className="mt-9 grid grid-cols-[0.85fr_auto_1.6fr] gap-6 items-stretch flex-1 min-h-0">
        {/* HOJE */}
        <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur p-7 flex flex-col">
          <div className="text-sm uppercase tracking-widest font-semibold text-primary-foreground/55">
            Hoje, a Produtor do Bem entrega
          </div>
          <div className="mt-5 flex-1 flex flex-col justify-around gap-3">
            {hoje.map((h) => (
              <div
                key={h}
                className="flex items-center gap-3.5 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 px-5 py-4"
              >
                <CheckCircle2 className="size-6 text-primary-foreground/60 shrink-0" />
                <span className="text-xl font-semibold text-primary-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* + */}
        <div className="flex flex-col items-center justify-center px-2 gap-3">
          <div className="size-20 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow">
            <span className="font-display font-bold text-5xl text-accent-foreground leading-none">
              +
            </span>
          </div>
          <div className="text-xs uppercase tracking-widest text-accent-glow font-semibold text-center">
            MyTS 360
          </div>
        </div>

        {/* NOVO */}
        <div className="relative rounded-3xl border-2 border-accent-glow/40 bg-gradient-to-br from-accent/15 to-accent-glow/5 backdrop-blur p-7 flex flex-col shadow-elegant">
          <div className="absolute -top-4 left-7 rounded-full bg-gradient-accent px-4 py-1.5 text-xs uppercase tracking-widest font-bold text-accent-foreground shadow-cta">
            Novo
          </div>
          <div className="text-sm uppercase tracking-widest font-semibold text-accent-glow mt-1">
            Passa a entregar também
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 flex-1">
            {novos.map((n) => (
              <div
                key={n.t}
                className="flex items-center gap-3.5 rounded-xl bg-primary-foreground/[0.06] border border-accent-glow/20 px-4 py-3.5"
              >
                <div className="size-11 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
                  <n.icon className="size-5 text-accent-foreground" />
                </div>
                <span className="text-lg font-semibold text-primary-foreground leading-tight">
                  {n.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-accent-glow/25 bg-primary-foreground/[0.05] backdrop-blur px-7 py-4 text-center">
        <p className="text-primary-foreground text-xl">
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
        <div className="absolute -top-40 left-1/3 size-[900px] bg-glow opacity-60 blur-3xl rounded-full" />
        <MytsWatermark className="-right-24 -bottom-24 w-[520px]" />
      </>
    }
  >
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <Chip>
        <HeartHandshake className="size-4 text-accent-glow" />
        MyTS 360
      </Chip>

      <h2 className="mt-8 font-display font-bold text-7xl leading-[1.02] tracking-tight text-primary-foreground max-w-5xl">
        Transformando certificações em{" "}
        <span className="text-gradient">experiências de confiança.</span>
      </h2>

      <div className="mt-10 w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur-xl p-8">
          <div className="absolute -right-32 -top-32 size-96 bg-glow opacity-50 blur-3xl rounded-full" />
          <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-accent" />

          <div className="relative grid grid-cols-[1.2fr_1fr] gap-8 items-center text-left">
            <div>
              <div className="flex items-center gap-3">
                <img src={mytsLogo} alt="MyTS" className="h-6 opacity-90" />
                <span className="h-px w-10 bg-primary-foreground/25" />
                <span className="text-sm uppercase tracking-[0.2em] font-semibold text-accent-glow">
                  Próximo passo
                </span>
              </div>
              <p className="mt-4 font-display font-semibold text-3xl leading-[1.15] text-primary-foreground">
                Vamos desenhar isso para a{" "}
                <span className="text-gradient">Produtor do Bem?</span>
              </p>
              <p className="mt-3 text-base text-primary-foreground/70 leading-relaxed">
                Agende uma conversa com{" "}
                <span className="font-semibold text-primary-foreground">André Tanzi</span>, Diretor
                Comercial da MyTS.
              </p>
            </div>

            <div className="border-l border-primary-foreground/10 pl-9 space-y-3">
              <a
                href="mailto:andre.tanzi@myt-s.com"
                className="group flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3.5 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
              >
                <div className="size-11 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                  <Mail className="size-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-widest text-primary-foreground/50">
                    E-mail
                  </div>
                  <div className="font-mono text-sm text-primary-foreground truncate">
                    andre.tanzi@myt-s.com
                  </div>
                </div>
                <ArrowRight className="size-5 text-accent-glow group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="group flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3.5 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
              >
                <div className="size-11 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                  <LinkIcon className="size-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-widest text-primary-foreground/50">
                    LinkedIn
                  </div>
                  <div className="text-base text-primary-foreground truncate">André Tanzi</div>
                </div>
                <ArrowRight className="size-5 text-accent-glow group-hover:translate-x-1 transition-transform" />
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
