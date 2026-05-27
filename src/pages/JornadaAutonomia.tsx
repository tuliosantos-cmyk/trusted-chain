import { Helmet } from "react-helmet-async";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  Factory,
  Gauge,
  Globe,
  Handshake,
  Landmark,
  Layers,
  LineChart,
  Mail,
  Network as NetworkIcon,
  Phone,
  Scale,
  Shield,
  ShieldAlert,
  Sprout,
  Store,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

/* ---------- helpers ---------- */
const Section: React.FC<
  React.PropsWithChildren<{ id?: string; dark?: boolean; className?: string }>
> = ({ id, dark, className = "", children }) => (
  <section
    id={id}
    className={`relative min-h-screen flex items-center py-24 overflow-hidden ${
      dark ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
    } ${className}`}
  >
    <div className="container relative z-10 w-full">{children}</div>
  </section>
);

const Kicker: React.FC<React.PropsWithChildren<{ tone?: "light" | "dark" }>> = ({
  children,
  tone = "dark",
}) => (
  <span
    className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full ${
      tone === "light"
        ? "bg-primary-foreground/10 text-primary-foreground/80 border border-primary-foreground/15"
        : "bg-accent/10 text-accent border border-accent/20"
    }`}
  >
    {children}
  </span>
);

const PageBadge: React.FC<{ n: number; total?: number; tone?: "light" | "dark" }> = ({
  n,
  total = 11,
  tone = "dark",
}) => (
  <div
    className={`absolute top-8 right-8 text-xs font-mono tracking-widest ${
      tone === "light" ? "text-primary-foreground/40" : "text-muted-foreground"
    }`}
  >
    {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
  </div>
);

/* ---------- page ---------- */
const JornadaAutonomia = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Jornada da Autonomia | MyTS — Programa multivarejo de FLV</title>
        <meta
          name="description"
          content="Programa multivarejo de monitoramento e desenvolvimento da cadeia de FLV. Visibilidade tier 1, 2 e 3, governança e evidência ESG real. Uma iniciativa MyTS em parceria com Carrefour."
        />
      </Helmet>

      {/* ============ SLIDE 1 — CAPA ============ */}
      <Section dark>
        <PageBadge n={1} tone="light" />
        {/* background art */}
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-glow opacity-60" />
        <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-accent/70 animate-pulse-glow" />

        <div className="max-w-4xl">
          <Kicker tone="light">Apresentação Comercial</Kicker>
          <h1 className="mt-6 font-display font-extrabold text-6xl md:text-8xl leading-[0.95] tracking-tight">
            Jornada da{" "}
            <span className="text-gradient">Autonomia</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-primary-foreground/75 max-w-3xl leading-relaxed">
            Programa multivarejo de monitoramento e desenvolvimento da cadeia de FLV.
          </p>

          <div className="mt-14 flex items-center gap-6 pt-6 border-t border-primary-foreground/10">
            <div className="flex items-center gap-2.5">
              <div className="size-10 rounded-lg bg-gradient-accent grid place-items-center font-display font-bold text-accent-foreground">
                M
              </div>
              <span className="font-display font-semibold text-lg">MyTS</span>
            </div>
            <span className="text-primary-foreground/30">×</span>
            <span className="text-sm uppercase tracking-widest text-primary-foreground/60">
              Em parceria com Carrefour
            </span>
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 2 — PROBLEMA ============ */}
      <Section>
        <PageBadge n={2} />
        <div className="max-w-5xl">
          <Kicker>O Problema</Kicker>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            Sua cadeia de FLV tem riscos que você{" "}
            <span className="text-gradient">ainda não consegue ver</span>.
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Fornecedores invisíveis",
                text: "Tier 2 e tier 3 da cadeia de FLV operam sem visibilidade, sem avaliação e sem padrão. Quando o problema aparece, já é público.",
              },
              {
                icon: ShieldAlert,
                title: "Auditorias que não chegam onde precisam",
                text: "As auditorias tradicionais cobrem o tier 1. A origem do risco — trabalhista, ambiental, sanitária — está nos elos mais profundos da cadeia.",
              },
              {
                icon: LineChart,
                title: "ESG sem evidência é só discurso",
                text: "Relatórios de sustentabilidade que não conseguem comprovar a cadeia de fornecedores são um risco reputacional e regulatório crescente.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group relative p-7 rounded-2xl bg-gradient-card border border-border shadow-card hover:shadow-elegant transition-all"
              >
                <div className="absolute top-0 left-7 right-7 h-0.5 bg-destructive rounded-b-full" />
                <div className="size-12 rounded-xl bg-destructive/10 grid place-items-center mb-5">
                  <Icon className="size-6 text-destructive" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary text-primary-foreground shadow-elegant">
            <div className="size-2 rounded-full bg-accent animate-pulse-glow" />
            <p className="font-display font-semibold text-lg">
              O mercado mudou. A cadeia ainda não.
            </p>
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 3 — CONSEQUÊNCIA ============ */}
      <Section dark>
        <PageBadge n={3} tone="light" />
        <div className="absolute inset-0 bg-hero opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="max-w-6xl">
          <Kicker tone="light">A Consequência</Kicker>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            O custo de não ter visibilidade{" "}
            <span className="text-gradient">sobre sua cadeia</span>
          </h2>

          <div className="mt-16 grid md:grid-cols-2 gap-5">
            {[
              {
                icon: AlertTriangle,
                title: "Risco reputacional",
                text: "Um incidente em um produtor de terceiro tier pode viralizar em horas — e a marca no produto é a sua.",
              },
              {
                icon: Scale,
                title: "Pressão regulatória crescente",
                text: "Legislação ESG, due diligence de cadeia e exigências de financiadores internacionais avançam rapidamente no Brasil.",
              },
              {
                icon: Globe,
                title: "Perda de acesso a mercados",
                text: "Grandes redes internacionais e fundos de investimento já exigem comprovação de cadeia sustentável para negociação.",
              },
              {
                icon: ShieldAlert,
                title: "Exposição sem resposta",
                text: "Sem dados da cadeia, não há argumento técnico para apresentar a órgãos regulatórios, imprensa ou investidores.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group flex gap-5 p-7 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur hover:bg-primary-foreground/[0.08] hover:border-accent/40 transition-all"
              >
                <div className="shrink-0">
                  <div className="size-14 rounded-xl bg-gradient-accent grid place-items-center shadow-cta">
                    <Icon className="size-7 text-accent-foreground" />
                  </div>
                  <div className="mt-3 text-center text-xs font-mono text-primary-foreground/40">
                    0{i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
                  <p className="text-primary-foreground/70 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 4 — SOLUÇÃO ============ */}
      <Section>
        <PageBadge n={4} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-glow opacity-30" />

        <div className="max-w-6xl relative">
          <Kicker>A resposta para esses desafios</Kicker>
          <h2 className="mt-6 font-display font-extrabold text-5xl md:text-7xl leading-[0.95] tracking-tight">
            Jornada da <span className="text-gradient">Autonomia</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl leading-relaxed">
            O primeiro programa multivarejo de monitoramento, qualificação e desenvolvimento
            da cadeia de FLV no Brasil.
          </p>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Store,
                title: "Plataforma Multivarejo",
                text: "Varejistas diferentes, uma cadeia compartilhada. Cada empresa acessa somente seus dados — mas o programa opera em escala de mercado.",
              },
              {
                icon: Layers,
                title: "Visibilidade Profunda",
                text: "Alcança tier 1, tier 2 e tier 3 da cadeia de FLV — exatamente onde as auditorias tradicionais não chegam.",
              },
              {
                icon: Sprout,
                title: "Foco em ESG Real",
                text: "Trilhas estruturadas de avaliação nas dimensões Social, Ambiental e Qualidade — com dados, indicadores e histórico auditável.",
              },
              {
                icon: Landmark,
                title: "Governança Própria",
                text: "Comitê formado pelos varejistas aderentes. Regras e requisitos técnicos definidos coletivamente — não por um fornecedor.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="relative p-8 rounded-2xl bg-gradient-card border border-border shadow-card overflow-hidden group hover:shadow-elegant transition-all"
              >
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="size-14 rounded-xl bg-gradient-accent grid place-items-center shadow-cta">
                      <Icon className="size-7 text-accent-foreground" />
                    </div>
                    <span className="text-4xl font-display font-extrabold text-accent/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 5 — COMO FUNCIONA ============ */}
      <Section dark>
        <PageBadge n={5} tone="light" />
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="max-w-6xl">
          <Kicker tone="light">Como Funciona</Kicker>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            Como o programa opera{" "}
            <span className="text-gradient">na prática</span>
          </h2>

          {/* timeline */}
          <div className="mt-16 relative">
            <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-accent via-accent/60 to-accent/30" />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "①",
                  title: "Adesão do varejista",
                  text: "O varejista adere ao programa e convida sua cadeia de fornecedores — de tier 1 até os produtores na origem.",
                },
                {
                  n: "②",
                  title: "Avaliação e desenvolvimento",
                  text: "Fornecedores e produtores respondem trilhas estruturadas nas dimensões Social, Ambiental e Qualidade. Recebem conteúdo educativo, identificam riscos e desenvolvem boas práticas — sem cobrança de documentos formais na fase inicial.",
                },
                {
                  n: "③",
                  title: "Visibilidade e governança",
                  text: "O varejista acessa dashboards com status da cadeia, indicadores de risco e dados para relatórios ESG. O Comitê acessa apenas indicadores agregados e anonimizados.",
                },
              ].map(({ n, title, text }) => (
                <div key={title} className="relative">
                  <div className="size-14 rounded-full bg-gradient-accent grid place-items-center mx-auto shadow-cta font-display font-bold text-2xl text-accent-foreground relative z-10">
                    {n}
                  </div>
                  <div className="mt-6 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur text-center">
                    <h3 className="font-display font-semibold text-xl mb-3">{title}</h3>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex gap-4 items-start p-6 rounded-2xl bg-accent/10 border-l-4 border-accent">
            <CheckCircle2 className="size-6 text-accent shrink-0 mt-0.5" />
            <p className="text-primary-foreground/85 leading-relaxed">
              <strong>Reuso de perfil:</strong> o fornecedor pode autorizar reutilização do
              seu perfil em outros relacionamentos varejistas — reduzindo fricção e aumentando
              o alcance do programa.
            </p>
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 6 — PARTICIPANTES ============ */}
      <Section>
        <PageBadge n={6} />
        <div className="max-w-6xl">
          <Kicker>Quem faz parte</Kicker>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            Um ecossistema <span className="text-gradient">completo</span>
          </h2>

          {/* ecosystem diagram */}
          <div className="mt-16 grid lg:grid-cols-5 gap-5">
            {[
              {
                icon: Store,
                title: "Varejistas Aderentes",
                text: "Aderem ao programa, convidam sua cadeia e acessam visibilidade e governança da operação.",
                accent: true,
              },
              {
                icon: Factory,
                title: "Fornecedores e Produtores",
                subtitle: "Tier 1 / 2 / 3",
                text: "Convidados pelo varejista. Participam das trilhas, recebem conteúdo e desenvolvem boas práticas.",
              },
              {
                icon: Handshake,
                title: "Apoiadores Técnicos",
                text: "Empresas que disponibilizam conteúdo técnico para treinamentos e qualificações — como Natura, Lucato e outros.",
              },
              {
                icon: Landmark,
                title: "Institutos e Órgãos de Governo",
                text: "Membros ou convidados para apoiar conteúdo, trilhas e recomendações técnicas.",
              },
              {
                icon: Wrench,
                title: "MyTS",
                text: "Administradora do programa, operadora tecnológica e mantenedora da metodologia e inteligência analítica.",
                accent: true,
              },
            ].map(({ icon: Icon, title, subtitle, text, accent }) => (
              <div
                key={title}
                className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
                  accent
                    ? "bg-primary text-primary-foreground border-primary shadow-elegant"
                    : "bg-gradient-card border-border shadow-card"
                }`}
              >
                <div
                  className={`size-12 rounded-xl grid place-items-center mb-4 ${
                    accent ? "bg-gradient-accent" : "bg-accent/10"
                  }`}
                >
                  <Icon className={`size-6 ${accent ? "text-accent-foreground" : "text-accent"}`} />
                </div>
                <h3 className="font-display font-semibold text-base mb-1">{title}</h3>
                {subtitle && (
                  <div
                    className={`text-xs font-mono uppercase tracking-widest mb-2 ${
                      accent ? "text-primary-foreground/50" : "text-muted-foreground"
                    }`}
                  >
                    {subtitle}
                  </div>
                )}
                <p
                  className={`text-sm leading-relaxed ${
                    accent ? "text-primary-foreground/75" : "text-muted-foreground"
                  }`}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 7 — BENEFÍCIOS ============ */}
      <Section dark>
        <PageBadge n={7} tone="light" />
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-glow opacity-30" />

        <div className="max-w-6xl">
          <Kicker tone="light">O Valor</Kicker>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            O que muda para{" "}
            <span className="text-gradient">o seu negócio</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Eye, title: "Visão clara de toda a cadeia", text: "Saber quem são seus fornecedores, onde estão os riscos e como a cadeia está evoluindo — em tempo real." },
              { icon: Shield, title: "Proteção da marca", text: "Mitigação de risco reputacional antes que o problema se torne público." },
              { icon: LineChart, title: "Evidência ESG verificável", text: "Dados reais da cadeia para relatórios, auditorias de financiadores e exigências regulatórias." },
              { icon: TrendingUp, title: "Desenvolvimento contínuo", text: "A cadeia não é só avaliada — é qualificada. Boas práticas se tornam padrão ao longo do tempo." },
              { icon: Landmark, title: "Governança compartilhada", text: "Regras definidas pelos próprios varejistas — não por um fornecedor de tecnologia." },
              { icon: Gauge, title: "Resposta regulatória", text: "Dados organizados e auditáveis para apresentar a órgãos financeiros e de fiscalização quando necessário." },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur hover:border-accent/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-lg bg-gradient-accent grid place-items-center shrink-0">
                    <Icon className="size-5 text-accent-foreground" />
                  </div>
                  <CheckCircle2 className="size-5 text-accent ml-auto" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 8 — MODELO DE NEGÓCIO ============ */}
      <Section>
        <PageBadge n={8} />
        <div className="max-w-6xl">
          <Kicker>Modelo de Negócio</Kicker>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            Modelo de acesso{" "}
            <span className="text-gradient">ao programa</span>
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "01",
                title: "Setup e Onboarding",
                subtitle: "Taxa única de implementação",
                text: "Inclui configuração, treinamento da equipe e integração inicial da cadeia.",
              },
              {
                tag: "02",
                title: "Licença Mensal",
                subtitle: "Acesso recorrente",
                text: "Plataforma, dashboards e governança do programa.",
                highlight: true,
              },
              {
                tag: "03",
                title: "Por Fornecedor Ativo",
                subtitle: "Componente variável",
                text: "Cobrança conforme o volume da cadeia monitorada.",
              },
            ].map(({ tag, title, subtitle, text, highlight }) => (
              <div
                key={title}
                className={`relative p-8 rounded-2xl transition-all ${
                  highlight
                    ? "bg-primary text-primary-foreground shadow-elegant scale-[1.02] border border-accent/40"
                    : "bg-gradient-card border border-border shadow-card"
                }`}
              >
                <div
                  className={`text-5xl font-display font-extrabold mb-4 ${
                    highlight ? "text-accent" : "text-accent/30"
                  }`}
                >
                  {tag}
                </div>
                <h3 className="font-display font-bold text-2xl mb-1">{title}</h3>
                <div
                  className={`text-xs uppercase tracking-widest mb-4 ${
                    highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {subtitle}
                </div>
                <p
                  className={`leading-relaxed ${
                    highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 items-start p-6 rounded-2xl bg-accent/5 border-l-4 border-accent">
            <NetworkIcon className="size-6 text-accent shrink-0 mt-0.5" />
            <p className="text-foreground leading-relaxed">
              O modelo <strong>multivarejo</strong> distribui o custo de operação entre os
              participantes — tornando o programa economicamente viável para varejistas de
              diferentes portes.
            </p>
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 9 — ORIGEM E CREDENCIAL ============ */}
      <Section dark>
        <PageBadge n={9} tone="light" />
        <div className="absolute inset-0 bg-hero" />

        <div className="max-w-5xl grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <Kicker tone="light">Origem e Credencial</Kicker>
            <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
              Como o programa <span className="text-gradient">nasceu</span>
            </h2>

            <div className="mt-10 space-y-5 text-lg text-primary-foreground/80 leading-relaxed">
              <p>
                A Jornada da Autonomia foi desenvolvida em <strong>2023 a pedido do Grupo
                Carrefour</strong> — para responder aos desafios mais complexos de
                sustentabilidade da cadeia de FLV no Brasil.
              </p>
              <p>
                O programa surgiu de uma necessidade real, identificada por um dos maiores
                varejistas do mundo: como ter visibilidade e governança sobre uma cadeia
                produtiva profunda, fragmentada e de alto risco reputacional.
              </p>
              <p className="text-primary-foreground">
                O resultado é uma <strong>metodologia proprietária</strong>, operada pela
                MyTS, que já está em funcionamento e disponível para novos varejistas
                aderentes.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur grid place-items-center p-12">
              <div className="text-center">
                <div className="font-display font-extrabold text-7xl text-primary-foreground tracking-tighter">
                  2023
                </div>
                <div className="mt-4 text-sm uppercase tracking-[0.2em] text-primary-foreground/50">
                  Desenvolvido para
                </div>
                <div className="mt-3 inline-block px-6 py-3 rounded-lg bg-primary-foreground/95 text-primary font-display font-bold text-2xl tracking-tight">
                  Carrefour
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 10 — MYTS ============ */}
      <Section>
        <PageBadge n={10} />
        <div className="max-w-6xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-16 rounded-2xl bg-gradient-accent grid place-items-center font-display font-bold text-3xl text-accent-foreground shadow-cta">
              M
            </div>
            <div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
                MyTS
              </h2>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">
                My Trusted Source
              </div>
            </div>
          </div>

          <p className="text-2xl md:text-3xl text-foreground font-display font-medium max-w-3xl leading-snug">
            Gestão de fornecedores, processos e documentos para quem leva{" "}
            <span className="text-gradient">qualidade a sério</span>.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              { icon: Wrench, title: "Operadora do programa", text: "Tecnológica e metodológica da Jornada da Autonomia." },
              { icon: Layers, title: "Plataforma completa", text: "Módulos Meus Fornecedores, Meus Processos e Meus Documentos." },
              { icon: Users, title: "Clientes em escala", text: "Setores alimentício, varejo e indústria." },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-gradient-card border border-border shadow-card"
              >
                <div className="size-11 rounded-lg bg-accent/10 grid place-items-center mb-4">
                  <Icon className="size-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl bg-primary text-primary-foreground shadow-elegant relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-glow opacity-50" />
            <div className="relative flex gap-5 items-start">
              <Target className="size-8 text-accent shrink-0 mt-1" />
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-2">
                  Diferencial
                </div>
                <p className="text-xl font-display leading-snug">
                  Na MyTS, o <strong>fornecedor é protagonista</strong> do próprio processo —
                  acessa a plataforma, envia documentos e acompanha suas pendências. O
                  varejista valida e decide.
                </p>
                <a
                  href="https://myt-s.com"
                  className="inline-flex items-center gap-2 mt-5 text-accent hover:brightness-110 transition font-medium"
                >
                  myt-s.com <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SLIDE 11 — PRÓXIMO PASSO ============ */}
      <Section dark id="proximo-passo">
        <PageBadge n={11} tone="light" />
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-50" />

        <div className="max-w-6xl">
          <Kicker tone="light">Próximo Passo</Kicker>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            O que propomos como{" "}
            <span className="text-gradient">próximo passo</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Eye,
                tag: "Opção A",
                title: "Demonstração do programa",
                text: "Mostramos a plataforma funcionando — com a visão do varejista e a visão do fornecedor — em 30 minutos.",
              },
              {
                icon: Building2,
                tag: "Opção B",
                title: "Proposta customizada",
                text: "Com base no volume da sua cadeia de FLV, apresentamos uma proposta com escopo, cronograma e modelo de investimento.",
              },
            ].map(({ icon: Icon, tag, title, text }) => (
              <a
                key={title}
                href="mailto:andre.tanzi@myt-s.com"
                className="group p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur hover:border-accent/60 hover:bg-primary-foreground/[0.08] transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="size-14 rounded-xl bg-gradient-accent grid place-items-center shadow-cta">
                    <Icon className="size-7 text-accent-foreground" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-primary-foreground/50">
                    {tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">{title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed mb-6">{text}</p>
                <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  Solicitar <ArrowRight className="size-4" />
                </div>
              </a>
            ))}
          </div>

          <p className="mt-14 font-display font-semibold text-2xl md:text-3xl text-primary-foreground/90 max-w-4xl leading-snug">
            A cadeia de FLV do seu negócio pode ser mais segura, mais visível e mais
            preparada para o mercado que está chegando.
          </p>

          <div className="mt-12 pt-10 border-t border-primary-foreground/10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-2">
                Fale agora
              </div>
              <div className="font-display font-bold text-2xl">André Tanzi</div>
              <div className="mt-4 space-y-2 text-primary-foreground/75">
                <a
                  href="mailto:andre.tanzi@myt-s.com"
                  className="flex items-center gap-3 hover:text-accent transition"
                >
                  <Mail className="size-4" /> andre.tanzi@myt-s.com
                </a>
                <a
                  href="tel:+5514996370596"
                  className="flex items-center gap-3 hover:text-accent transition"
                >
                  <Phone className="size-4" /> +55 (14) 9 9637-0596
                </a>
                <a
                  href="https://myt-s.com"
                  className="flex items-center gap-3 hover:text-accent transition"
                >
                  <Globe className="size-4" /> myt-s.com
                </a>
              </div>
            </div>
            <a
              href="mailto:andre.tanzi@myt-s.com"
              className="justify-self-start md:justify-self-end inline-flex items-center gap-2 rounded-full bg-gradient-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-cta hover:brightness-110 transition"
            >
              Agendar demonstração <ArrowRight className="size-5" />
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default JornadaAutonomia;
