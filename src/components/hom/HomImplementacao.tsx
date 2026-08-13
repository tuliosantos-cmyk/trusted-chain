import { Handshake, Inbox, RefreshCw, Rocket, Settings } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    t: "Kickoff",
    when: "Semana 1",
    d: "Alinhamento dos objetivos com a sua equipe. Os requisitos que mais importam pro seu setor entram no escopo desde o início.",
  },
  {
    icon: Settings,
    t: "Setup",
    when: "Semana 1–2",
    d: "Plataforma configurada pro seu time, com os requisitos de homologação certos pra sua operação.",
  },
  {
    icon: Handshake,
    t: "Integração dos fornecedores",
    when: "Semana 2–4",
    d: "Um contato dedicado da MyTS leva cada fornecedor pra dentro da plataforma. Sua equipe não precisa convencer ninguém.",
  },
  {
    icon: Inbox,
    t: "Coleta",
    when: "A partir da semana 3",
    d: "Documentos, questionários, checklists e autoavaliações chegam organizados, direto dos fornecedores.",
  },
  {
    icon: RefreshCw,
    t: "Manutenção contínua",
    when: "Sempre",
    d: "A MyTS reaplica e solicita o que vence, sozinha. Sua equipe só confirma.",
  },
];

const HomImplementacao = () => (
  <section id="implementacao" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Implementação</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          A homologação não recomeça do zero. <br />
          <span className="text-gradient">Vira rotina já na primeira semana.</span>
        </h2>
      </div>

      <div className="mt-14 relative">
        <div className="hidden lg:block absolute top-[46px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map(({ icon: Icon, t, when, d }, i) => (
            <div
              key={t}
              className="relative rounded-3xl bg-gradient-card border border-border p-6 shadow-card hover:shadow-elegant transition-all"
            >
              <div className="relative flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-gradient-accent grid place-items-center shadow-cta">
                  <Icon className="size-5 text-accent-foreground" />
                </div>
                <span className="font-display font-bold text-3xl text-border">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-wider font-semibold text-accent">{when}</div>
              <h3 className="mt-1.5 font-display font-semibold text-lg text-primary leading-snug">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HomImplementacao;
