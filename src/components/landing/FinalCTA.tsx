import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => (
  <section id="comecar" className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-30" />
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[800px] bg-glow opacity-60 pointer-events-none" />

    <div className="container relative text-center max-w-3xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/80">
        <Sparkles className="size-3.5 text-accent-glow" />
        Pronto para começar?
      </span>

      <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight">
        Tire sua cadeia <br />
        <span className="text-gradient">do modo apagar incêndio.</span>
      </h2>

      <p className="mt-6 text-lg md:text-xl text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
        Em 30 minutos você vê como a MyTS funciona com seus fornecedores, suas normas e seu volume. Sem apresentação genérica.
      </p>

      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <a
          href="#agendar"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-8 py-4 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
        >
          Agendar conversa de 30 min
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-primary-foreground/60">
        <span>✓ Sem compromisso</span>
        <span>✓ Demo com seu cenário real</span>
        <span>✓ Resposta em 1 dia útil</span>
      </div>
    </div>
  </section>
);

export default FinalCTA;
