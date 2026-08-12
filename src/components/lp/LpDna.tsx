import { Activity, ShieldCheck, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    n: "01",
    t: "Homologar",
    d: "Cada fornecedor entra com os documentos e requisitos certos, desde o primeiro dia.",
  },
  {
    icon: Activity,
    n: "02",
    t: "Monitorar",
    d: "Vencimento, pendência e não conformidade aparecem antes de virar problema — não durante a auditoria.",
  },
  {
    icon: TrendingUp,
    n: "03",
    t: "Desenvolver",
    d: "A cadeia melhora com o tempo, não é só fiscalizada.",
  },
];

const LpDna = () => (
  <section className="py-24 md:py-32 bg-secondary/40">
    <div className="container">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">O DNA da plataforma</span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
            Homologar, monitorar, <span className="text-gradient">desenvolver.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Não é um painel que a sua equipe alimenta sozinha. É um método aplicado em cada fornecedor da sua cadeia — e
            que roda continuamente, não em ciclos de auditoria.
          </p>

          {/* ciclo em SVG */}
          <div className="mt-10 rounded-3xl bg-card border border-border p-8 shadow-card">
            <svg viewBox="0 0 320 200" className="w-full h-auto" role="img" aria-label="Ciclo homologar, monitorar e desenvolver">
              <defs>
                <linearGradient id="dnaGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" />
                  <stop offset="100%" stopColor="hsl(var(--accent-glow))" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="100" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
              <circle
                cx="160"
                cy="100"
                r="70"
                fill="none"
                stroke="url(#dnaGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="330 110"
                transform="rotate(-90 160 100)"
              />
              {[
                { x: 160, y: 30, l: "Homologar" },
                { x: 221, y: 135, l: "Monitorar" },
                { x: 99, y: 135, l: "Desenvolver" },
              ].map((p) => (
                <g key={p.l}>
                  <circle cx={p.x} cy={p.y} r="9" fill="hsl(var(--accent))" />
                  <circle cx={p.x} cy={p.y} r="4" fill="hsl(var(--accent-foreground))" />
                </g>
              ))}
              <text x="160" y="95" textAnchor="middle" className="font-display" fill="hsl(var(--primary))" fontSize="16" fontWeight="700">
                Ciclo
              </text>
              <text x="160" y="115" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                contínuo
              </text>
            </svg>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          {pillars.map(({ icon: Icon, n, t, d }) => (
            <div
              key={t}
              className="group flex items-start gap-6 rounded-3xl bg-card border border-border p-8 shadow-card hover:shadow-elegant hover:border-accent/30 transition-all"
            >
              <div className="shrink-0">
                <div className="size-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-cta">
                  <Icon className="size-6 text-accent-foreground" />
                </div>
              </div>
              <div>
                <div className="font-display font-bold text-sm text-accent">{n}</div>
                <h3 className="mt-1 font-display font-semibold text-2xl text-primary">{t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed text-lg">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default LpDna;
