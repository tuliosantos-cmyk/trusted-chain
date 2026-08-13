import { Activity, ShieldCheck, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    n: "01",
    t: "Homologar",
    d: "Cada fornecedor entra com os documentos e requisitos certos desde o primeiro dia — não seis meses depois, numa auditoria.",
  },
  {
    icon: Activity,
    n: "02",
    t: "Monitorar",
    d: "Vencimento e pendência aparecem antes de virar risco, não quando já é tarde.",
  },
  {
    icon: TrendingUp,
    n: "03",
    t: "Desenvolver",
    d: "O fornecedor evolui com indicadores de desempenho ao longo do tempo — não é aprovado uma vez e esquecido.",
  },
];

const HomDna = () => (
  <section className="relative bg-primary text-primary-foreground py-24 md:py-32 overflow-hidden noise">
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="absolute left-1/2 -translate-x-1/2 top-10 size-[600px] bg-glow opacity-40 pointer-events-none" />

    <div className="container relative">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent-glow font-semibold">O DNA da plataforma</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl leading-tight">
          Homologar, monitorar, <span className="text-gradient">desenvolver.</span>
        </h2>
        <p className="mt-6 text-lg text-primary-foreground/70 leading-relaxed">
          Não é um cadastro que fica parado depois de aprovado. É um método aplicado em cada fornecedor da sua cadeia.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {pillars.map(({ icon: Icon, n, t, d }, i) => (
          <div
            key={t}
            className="relative rounded-3xl border border-primary-foreground/12 bg-gradient-dark-card p-8 hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="size-12 rounded-2xl bg-gradient-accent grid place-items-center shadow-cta">
                <Icon className="size-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-4xl text-primary-foreground/10">{n}</span>
            </div>
            <h3 className="mt-6 font-display font-semibold text-2xl">{t}</h3>
            <p className="mt-3 text-primary-foreground/65 leading-relaxed">{d}</p>
            {i < pillars.length - 1 && (
              <span className="hidden md:block absolute top-1/2 -right-3 size-6 rotate-45 border-t border-r border-accent/40" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 px-8 py-6 text-center">
        <p className="text-primary-foreground/70">
          O ciclo se repete a cada renovação, a cada novo insumo e a cada mudança de norma —{" "}
          <span className="text-primary-foreground">sem sua equipe recomeçar do zero.</span>
        </p>
      </div>
    </div>
  </section>
);

export default HomDna;
