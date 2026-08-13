import { ArrowRight, ShieldCheck } from "lucide-react";
import HomMock from "./HomMock";

export type HomCluster = "default" | "homologacao" | "risco" | "kys" | "vencimento" | "esg";

const headlines: Record<HomCluster, { eyebrow: string; h1: React.ReactNode }> = {
  default: {
    eyebrow: "Homologação de fornecedores · indústria de alimentos",
    h1: (
      <>
        Homologar fornecedor não é mais{" "}
        <span className="text-gradient">checar CNPJ e atualizar planilha.</span>
      </>
    ),
  },
  homologacao: {
    eyebrow: "Homologação de fornecedores",
    h1: (
      <>
        Homologação de fornecedores{" "}
        <span className="text-gradient">sem planilha nem e-mail perdido.</span>
      </>
    ),
  },
  risco: {
    eyebrow: "Gestão de risco de terceiros",
    h1: (
      <>
        Sua gestão de risco de fornecedores{" "}
        <span className="text-gradient">ainda depende de planilha?</span>
      </>
    ),
  },
  kys: {
    eyebrow: "Know Your Supplier · due diligence",
    h1: (
      <>
        Conheça de verdade{" "}
        <span className="text-gradient">quem fornece pra sua indústria.</span>
      </>
    ),
  },
  vencimento: {
    eyebrow: "Monitoramento de documentos de fornecedores",
    h1: (
      <>
        Vencimento de documento avisado antes,{" "}
        <span className="text-gradient">não descoberto depois.</span>
      </>
    ),
  },
  esg: {
    eyebrow: "Cadeia de fornecedores · base documental",
    h1: (
      <>
        A base documental que sustenta{" "}
        <span className="text-gradient">sua estratégia com fornecedores.</span>
      </>
    ),
  },
};

const HomHero = ({ cluster = "default" }: { cluster?: HomCluster }) => {
  const { eyebrow, h1 } = headlines[cluster] ?? headlines.default;

  return (
    <section id="topo" className="relative bg-hero overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 noise">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-glow opacity-70 pointer-events-none" />

      <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 text-primary-foreground animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/80">
            <ShieldCheck className="size-3.5 text-accent-glow" />
            {eyebrow}
          </span>

          <h1 className="mt-6 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
            {h1}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed">
            O mercado virou gestão de risco de terceiros — saúde financeira, documentação, desempenho ao longo do tempo.
            A MyTS organiza o que sustenta essa homologação: cadastro, requisitos e indicadores por fornecedor, num
            lugar só.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href="#teste"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-accent px-8 py-4 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
            >
              Testar grátis por 30 dias
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#plataforma"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/20 px-7 py-4 font-medium text-primary-foreground hover:bg-primary-foreground/5 transition"
            >
              Ver como funciona
            </a>
          </div>

          <p className="mt-4 text-sm text-primary-foreground/55">
            Sem cartão de crédito. Sem conversa de venda antes de você ver funcionando.
          </p>

          <div className="mt-10 flex flex-wrap gap-2 max-w-2xl">
            {[
              "Cadastro do fornecedor",
              "Documentação",
              "Requisitos por norma",
              "Indicadores de desempenho",
              "Alerta de vencimento",
            ].map((n) => (
              <span
                key={n}
                className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-primary-foreground/75"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-accent opacity-30 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl border border-primary-foreground/10 shadow-elegant overflow-hidden bg-background animate-float">
              <HomMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomHero;
