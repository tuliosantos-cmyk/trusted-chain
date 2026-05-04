import FlowDiagram from "./visuals/FlowDiagram";

const steps = [
  { n: "01", title: "Centralização total", desc: "Documentos, certificados, auditorias e aprovações num só lugar, com histórico completo e controle de versão." },
  { n: "02", title: "Alertas e cobrança automática", desc: "O sistema avisa e cobra o fornecedor diretamente. Sua equipe só entra quando há um problema real para resolver." },
  { n: "03", title: "Audit-ready o ano todo", desc: "Evidências organizadas e rastreáveis continuamente. Na auditoria, você apresenta — não corre atrás." },
];

const norms = ["FSSC 22000", "BRCGS", "IFS", "ISO 9001", "GlobalG.A.P.", "HACCP", "BPF", "ESG", "Normas internas"];

const HowItWorks = () => (
  <section id="funciona" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Como funciona</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          Configure uma vez. <br />
          <span className="text-gradient">O sistema assume o resto.</span>
        </h2>
      </div>

      {/* Visual flow diagram */}
      <div className="mt-14 rounded-3xl bg-gradient-card border border-border p-6 md:p-10 shadow-card">
        <FlowDiagram />
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-3xl bg-gradient-card border border-border p-8 shadow-card hover:shadow-elegant transition-all">
            <div className="font-display font-bold text-7xl text-gradient leading-none opacity-90">{s.n}</div>
            <h3 className="mt-6 font-display font-semibold text-2xl text-primary">{s.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-accent to-transparent" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-primary p-10 md:p-14 text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-20 -top-20 size-72 bg-glow opacity-60" />
        <div className="relative">
          <span className="text-xs uppercase tracking-widest text-accent-glow font-semibold">Normas suportadas</span>
          <div className="mt-5 flex flex-wrap gap-3">
            {norms.map((n) => (
              <span key={n} className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-2 text-sm font-medium">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default HowItWorks;
