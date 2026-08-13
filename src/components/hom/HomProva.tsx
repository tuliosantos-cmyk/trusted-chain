import { Quote } from "lucide-react";

const logos = ["Carrefour", "C.Vale", "Korin", "AVAL", "Redes Martins", "Atakarejo"];

const depoimentos = [
  {
    q: "Em duas semanas já tinha cadastrado todos os fornecedores e as solicitações em andamento.",
    n: "Daiane",
    r: "Gerente de Compras · MMFoods",
  },
  {
    q: "Antes contatava fornecedor por fornecedor, o que consumia muito tempo. Hoje abre e já vê tudo.",
    n: "Francielly",
    r: "Especiali Alimentos",
  },
];

const HomProva = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Prova social</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          Quem já homologa na MyTS <span className="text-gradient">não volta pra planilha.</span>
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-5">
        {depoimentos.map((d) => (
          <figure key={d.n} className="rounded-3xl bg-gradient-card border border-border p-8 md:p-10 shadow-card">
            <Quote className="size-8 text-accent/40" />
            <blockquote className="mt-5 font-display text-2xl md:text-3xl text-primary leading-snug">
              “{d.q}”
            </blockquote>
            <figcaption className="mt-7 pt-6 border-t border-border">
              <div className="font-semibold text-primary">{d.n}</div>
              <div className="text-sm text-muted-foreground">{d.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-medium mb-8">
          Confiam na MyTS
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {logos.map((l) => (
            <span key={l} className="font-display font-semibold text-xl md:text-2xl text-muted-foreground/60">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HomProva;
