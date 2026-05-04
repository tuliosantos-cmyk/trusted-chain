import { Check } from "lucide-react";
import { ComplianceChart, SupplyDonut } from "./visuals/MiniCharts";

const Results = () => (
  <section id="resultados" className="py-24 md:py-32 bg-secondary/40">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Resultados reais</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          Quem já usa, <span className="text-gradient">não volta para planilha.</span>
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        <article className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-card hover:shadow-elegant transition-all">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">C.Vale — cooperativa agroindustrial</div>
          <blockquote className="mt-5 font-display text-xl md:text-2xl text-primary leading-snug">
            "A equipe parou de fazer cobrança e começou a fazer análise. A carteira cresceu sem crescer o operacional."
          </blockquote>

          <div className="mt-6 rounded-2xl bg-secondary/60 p-5 border border-border">
            <ComplianceChart />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <div className="font-display font-bold text-4xl text-gradient">−90%</div>
              <div className="mt-1 text-sm text-muted-foreground">custo com autoavaliação de fornecedores</div>
            </div>
            <div>
              <div className="font-display font-bold text-4xl text-gradient">−50%</div>
              <div className="mt-1 text-sm text-muted-foreground">gastos com auditorias de 2ª parte</div>
            </div>
          </div>
        </article>

        <article className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-card hover:shadow-elegant transition-all">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Carrefour — Jornada da Autonomia</div>
          <blockquote className="mt-5 font-display text-xl md:text-2xl text-primary leading-snug">
            "Mapeamento e desenvolvimento de toda a cadeia do agro — social, ambiental e qualidade — dentro da plataforma."
          </blockquote>

          <div className="mt-6 rounded-2xl bg-secondary/60 p-5 border border-border">
            <SupplyDonut />
          </div>

          <ul className="mt-6 space-y-3 pt-6 border-t border-border">
            {["Diagnósticos automáticos por fornecedor", "Treinamentos e reconhecimento integrados"].map((t) => (
              <li key={t} className="flex items-start gap-3 text-primary">
                <span className="mt-0.5 size-5 rounded-full bg-success/15 grid place-items-center">
                  <Check className="size-3 text-success" />
                </span>
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  </section>
);
export default Results;
