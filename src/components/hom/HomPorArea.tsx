import { Briefcase, LineChart, ShieldCheck } from "lucide-react";

const areas = [
  {
    icon: ShieldCheck,
    t: "Qualidade",
    items: [
      "Checklist e autoavaliação organizados por norma, sem montar planilha do zero a cada fornecedor",
      "Histórico auditável de cada documento enviado — pronto pra mostrar na auditoria, sem caçar arquivo",
      "Vencimento avisado com antecedência, não descoberto na hora que o auditor pergunta",
    ],
  },
  {
    icon: Briefcase,
    t: "Compras / Supply Chain",
    items: [
      "Fornecedor cadastrado e homologado sem sua equipe abrir e-mail um por um",
      "Visão clara de quais fornecedores estão pendentes, sem planilha paralela",
      "Requisito documentado por fornecedor — decisão de troca ou renovação com histórico, não com achismo",
    ],
  },
  {
    icon: LineChart,
    t: "Diretoria / Compliance",
    items: [
      "Exposição de risco visível antes da auditoria chegar, não durante",
      "Indicador de desempenho por fornecedor pra sustentar continuidade ou revisão de contrato",
      "Tempo de equipe que hoje vira cobrança manual, liberado — argumento direto pro investimento",
    ],
  },
];

const HomPorArea = () => (
  <section className="py-24 md:py-32 bg-secondary/40">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Pela sua área</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          O que muda no seu dia, <span className="text-gradient">dependendo de quem está lendo.</span>
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {areas.map(({ icon: Icon, t, items }) => (
          <div key={t} className="rounded-3xl bg-card border border-border p-8 shadow-card">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-accent/10 grid place-items-center">
                <Icon className="size-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-xl text-primary">{t}</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                  <span className="mt-2 size-1.5 rounded-full bg-accent shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomPorArea;
