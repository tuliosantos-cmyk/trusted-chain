import { Check, X } from "lucide-react";

const sim = [
  "Você lidera qualidade, compliance ou supply chain numa indústria de alimentos, bebidas, cosméticos ou bens de consumo",
  "Homologa fornecedor novo com frequência e sente que cada um vira um projeto à parte",
  "Não tem histórico organizado de desempenho e pendência por fornecedor",
  "Cansou de ser a única pessoa responsável por cobrar toda a cadeia",
];

const HomParaQuem = () => (
  <section className="py-24 md:py-32 bg-secondary/40">
    <div className="container grid lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-4">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Para quem é</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          Faz sentido <span className="text-gradient">se você…</span>
        </h2>
      </div>

      <div className="lg:col-span-8 space-y-5">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-card">
          <ul className="space-y-5">
            {sim.map((t) => (
              <li key={t} className="flex items-start gap-4">
                <span className="size-7 rounded-full bg-success/15 grid place-items-center shrink-0 mt-0.5">
                  <Check className="size-4 text-success" />
                </span>
                <span className="text-lg text-primary leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-secondary/60 p-8 flex items-start gap-4">
          <span className="size-7 rounded-full bg-muted grid place-items-center shrink-0 mt-0.5">
            <X className="size-4 text-muted-foreground" />
          </span>
          <p className="text-muted-foreground leading-relaxed text-lg">
            <strong className="text-primary">Não é pra você</strong> se sua homologação já roda rápido e sem depender de
            cobrança manual. Aí a gente torce por você.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HomParaQuem;
