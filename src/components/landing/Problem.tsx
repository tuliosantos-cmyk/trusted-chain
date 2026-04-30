import { AlertTriangle, Clock, FileSearch, Users } from "lucide-react";

const items = [
  { icon: Clock, title: "Documentos vencem sem aviso", desc: "Você só descobre quando a auditoria já chegou." },
  { icon: Users, title: "Equipe vira central de cobrança", desc: "Tempo de qualidade gasto enviando e-mail para fornecedor renovar certificado." },
  { icon: FileSearch, title: "Rastreabilidade impossível de provar", desc: "Evidências espalhadas em pastas e caixas de e-mail — a corrida começa na véspera da auditoria." },
  { icon: AlertTriangle, title: "Fornecedor fora de conformidade, sua certificação em risco", desc: "Sem visibilidade em tempo real, o problema sempre chega tarde demais." },
];

const Problem = () => (
  <section id="problema" className="py-24 md:py-32 bg-secondary/40">
    <div className="container">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">O problema</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          Planilha não <span className="text-gradient">gerencia risco.</span>
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group relative rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-elegant hover:border-accent/30 transition-all">
            <div className="size-11 rounded-xl bg-gradient-accent/10 grid place-items-center mb-5" style={{ background: "hsl(var(--accent) / 0.1)" }}>
              <Icon className="size-5 text-accent" />
            </div>
            <h3 className="font-display font-semibold text-xl text-primary">{title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default Problem;
