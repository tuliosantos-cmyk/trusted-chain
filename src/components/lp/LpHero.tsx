import { ArrowRight, ShieldCheck } from "lucide-react";
import PlatformMock from "./PlatformMock";

export type Cluster = "default" | "fssc" | "brcgs" | "iso9001" | "haccp" | "anvisa" | "fornecedores";

const headlines: Record<Cluster, { eyebrow: string; h1: React.ReactNode }> = {
  default: {
    eyebrow: "Indústrias de alimentos, bebidas e bens de consumo",
    h1: (
      <>
        Documento vencido, fornecedor sumido, checklist de véspera —{" "}
        <span className="text-gradient">sua próxima certificação não precisa começar assim.</span>
      </>
    ),
  },
  fssc: {
    eyebrow: "FSSC 22000 V7 · em vigor desde maio de 2026",
    h1: (
      <>
        A V7 já chegou.{" "}
        <span className="text-gradient">Sua cadeia de fornecedores já se adaptou?</span>
      </>
    ),
  },
  brcgs: {
    eyebrow: "BRCGS Issue 9 · IFS Food v8",
    h1: (
      <>
        Sua cadeia de fornecedores está pronta{" "}
        <span className="text-gradient">pra BRCGS e IFS?</span>
      </>
    ),
  },
  iso9001: {
    eyebrow: "ISO 9001 · nova versão a caminho",
    h1: (
      <>
        A nova ISO 9001 está chegando.{" "}
        <span className="text-gradient">Sua documentação já está pronta?</span>
      </>
    ),
  },
  haccp: {
    eyebrow: "APPCC/HACCP e BPF na indústria",
    h1: (
      <>
        Checklist de APPCC{" "}
        <span className="text-gradient">sem planilha e sem véspera.</span>
      </>
    ),
  },
  anvisa: {
    eyebrow: "RDC ANVISA · LGPD na cadeia de fornecedores",
    h1: (
      <>
        Documentação da sua cadeia{" "}
        <span className="text-gradient">em dia com ANVISA e LGPD.</span>
      </>
    ),
  },
  fornecedores: {
    eyebrow: "Homologação e gestão de fornecedores",
    h1: (
      <>
        Fornecedor com documento vencido?{" "}
        <span className="text-gradient">Ele mesmo resolve.</span>
      </>
    ),
  },
};

const LpHero = ({ cluster = "default" }: { cluster?: Cluster }) => {
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
            A MyTS organiza fornecedores, processos e documentos num lugar só — pronta pra qualquer norma que a sua
            indústria precisa provar: FSSC 22000, BRCGS, IFS, ISO 9001, APPCC/HACCP e mais.
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
            {["FSSC 22000", "BRCGS", "IFS", "ISO 9001", "APPCC/HACCP", "BPF", "RDC ANVISA"].map((n) => (
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
              <PlatformMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LpHero;
