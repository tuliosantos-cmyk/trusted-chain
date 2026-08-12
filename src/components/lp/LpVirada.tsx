import { ArrowRight, Bell, CheckCircle2, ClipboardCheck, FileText, Users, X } from "lucide-react";

const antes = [
  "Sua equipe cobra fornecedor um a um",
  "Planilha montada do zero antes de cada auditoria",
  "Documento vencido descoberto pelo auditor",
  "Evidência espalhada em e-mail, pasta e drive",
];

const depois = [
  "O fornecedor vê o que falta e resolve sozinho",
  "Checklist e autoavaliação já prontos, sempre atualizados",
  "Vencimento avisado antes de virar problema",
  "Tudo num lugar só, com histórico e rastreabilidade",
];

const modulos = [
  {
    icon: Users,
    tag: "Meus Fornecedores",
    title: "O fornecedor entra no processo",
    desc: "Ele acessa a própria conta, vê o que está pendente, envia e acompanha. Sua equipe valida — não opera.",
    visual: (
      <div className="space-y-2">
        {[
          ["Vale Norte", "Enviado", "success"],
          ["Prisma", "Pendente", "accent"],
          ["Aromas Sul", "Enviado", "success"],
        ].map(([n, s, c]) => (
          <div key={n} className="flex items-center justify-between rounded-lg bg-background border border-border px-3 py-2">
            <span className="text-xs font-medium text-primary">{n}</span>
            <span className={`text-[10px] font-semibold ${c === "success" ? "text-success" : "text-accent"}`}>{s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: ClipboardCheck,
    tag: "Meus Processos",
    title: "Checklist e autoavaliação sem planilha",
    desc: "Modelos prontos por norma, aplicados na cadeia inteira. Nada de montar do zero antes de cada auditoria.",
    visual: (
      <div className="space-y-2">
        {[
          ["Autoavaliação FSSC 22000", 86],
          ["Checklist BPF", 64],
          ["Questionário ESG", 41],
        ].map(([n, p]) => (
          <div key={n as string} className="rounded-lg bg-background border border-border px-3 py-2">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="text-primary font-medium">{n}</span>
              <span>{p}%</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-gradient-accent rounded-full" style={{ width: `${p}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: FileText,
    tag: "Meus Documentos",
    title: "Vencimento avisado, não descoberto",
    desc: "O sistema acompanha validade, versão e evidência. O alerta sai antes — não na hora que o auditor pergunta.",
    visual: (
      <div className="space-y-2">
        <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2.5">
          <Bell className="size-3.5 text-accent shrink-0 mt-0.5" />
          <span className="text-[11px] leading-snug text-primary">
            Laudo microbiológico vence em <strong>12 dias</strong> — fornecedor já notificado.
          </span>
        </div>
        {["Certificado FSSC 22000 · válido", "Ficha técnica · válida"].map((t) => (
          <div key={t} className="flex items-center gap-2 rounded-lg bg-background border border-border px-3 py-2">
            <CheckCircle2 className="size-3.5 text-success" />
            <span className="text-[11px] text-primary">{t}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const LpVirada = () => (
  <section id="plataforma" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">A virada</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          Não é um software a mais pra alimentar. <br />
          <span className="text-gradient">É o fornecedor virando parte do processo.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Seu fornecedor não precisa que você cobre. Ele já sabe o que está pendente.
        </p>
      </div>

      {/* antes / depois */}
      <div className="mt-14 grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-border bg-secondary/50 p-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Hoje</div>
          <ul className="mt-5 space-y-3.5">
            {antes.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <X className="size-4 text-destructive shrink-0 mt-1" />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-3xl border border-accent/25 bg-gradient-card p-8 shadow-card">
          <div className="text-xs uppercase tracking-widest text-accent font-semibold">Com a MyTS</div>
          <ul className="mt-5 space-y-3.5">
            {depois.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-success shrink-0 mt-1" />
                <span className="text-primary font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* módulos */}
      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {modulos.map(({ icon: Icon, tag, title, desc, visual }) => (
          <div
            key={tag}
            className="rounded-3xl border border-border bg-card p-7 shadow-card hover:shadow-elegant hover:border-accent/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-accent/10 grid place-items-center">
                <Icon className="size-5 text-accent" />
              </div>
              <span className="font-display font-semibold text-lg text-primary">{tag}</span>
            </div>
            <h3 className="mt-5 font-display font-semibold text-xl text-primary leading-snug">{title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
            <div className="mt-6 rounded-2xl bg-secondary/50 border border-border p-3">{visual}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 size-64 bg-glow opacity-60" />
        <p className="relative font-display font-semibold text-2xl md:text-3xl">
          Quando a auditoria chega, a equipe não corre. <span className="text-gradient">Confirma.</span>
        </p>
        <a
          href="#teste"
          className="relative group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all whitespace-nowrap"
        >
          Testar grátis por 30 dias
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </section>
);

export default LpVirada;
