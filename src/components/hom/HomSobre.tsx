import { ArrowRight } from "lucide-react";

const HomSobre = () => (
  <section className="relative bg-primary text-primary-foreground py-24 md:py-32 overflow-hidden noise">
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-40 size-[700px] bg-glow opacity-50 pointer-events-none" />

    <div className="container relative max-w-4xl text-center">
      <span className="text-xs uppercase tracking-widest text-accent-glow font-semibold">Sobre a MyTS</span>
      <p className="mt-6 text-xl md:text-2xl text-primary-foreground/75 leading-relaxed">
        A MyTS nasceu dentro da indústria de alimentos para resolver o que planilha e e-mail nunca deram conta. Não é um
        cadastro genérico de fornecedor — é o lugar onde o fornecedor deixa de ser cobrado e passa a ser parte do próprio
        processo de homologação.
      </p>

      <h2 className="mt-10 font-display font-bold text-4xl md:text-6xl leading-[1.05]">
        Fornecedor novo <br />
        <span className="text-gradient">não precisa mais ser planilha de novo.</span>
      </h2>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="#teste"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-8 py-4 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
        >
          Testar grátis por 30 dias
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="https://myt-s.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-7 py-4 font-medium text-primary-foreground hover:bg-primary-foreground/5 transition"
        >
          Conhecer a MyTS
        </a>
      </div>
    </div>
  </section>
);

export default HomSobre;
