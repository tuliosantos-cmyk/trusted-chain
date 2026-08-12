import { AlertTriangle, ClipboardX, MailWarning, RefreshCcw } from "lucide-react";

const symptoms = [
  {
    icon: MailWarning,
    title: "Fornecedor cobrado um a um",
    desc: "WhatsApp, e-mail, ligação. E de novo na semana seguinte.",
  },
  {
    icon: ClipboardX,
    title: "Checklist fechado na correria",
    desc: "Montado na véspera, com o que deu tempo de achar.",
  },
  {
    icon: RefreshCcw,
    title: "A mesma não conformidade voltando",
    desc: "Ninguém teve tempo de resolver de verdade — só de apagar o incêndio.",
  },
  {
    icon: AlertTriangle,
    title: "A norma mudou, a operação não",
    desc: "A FSSC 22000 V7 entrou em vigor em maio de 2026 e o processo continua o antigo.",
  },
];

const LpProblem = () => (
  <section id="problema" className="relative bg-primary text-primary-foreground py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="absolute -right-40 top-0 size-[500px] bg-glow opacity-40 pointer-events-none" />

    <div className="container relative">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-widest text-accent-glow font-semibold">O problema</span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl leading-tight">
            A cena que se repete na <span className="text-gradient">véspera de toda auditoria.</span>
          </h2>

          <div className="mt-10 rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 backdrop-blur p-8">
            <div className="font-display font-bold text-6xl md:text-7xl tabular-nums text-primary-foreground/90 leading-none">
              22:00
            </div>
            <p className="mt-5 text-primary-foreground/70 leading-relaxed">
              Alguém da equipe está catando PDF de fornecedor no e-mail, tentando lembrar quem mandou o quê. Um documento
              venceu há três semanas — e ninguém percebeu,{" "}
              <span className="text-primary-foreground">porque ninguém tinha como perceber.</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          {symptoms.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-primary-foreground/12 bg-gradient-dark-card p-7 hover:border-accent/40 transition-colors"
            >
              <div className="size-11 rounded-xl grid place-items-center bg-accent/15">
                <Icon className="size-5 text-accent-glow" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-xl">{title}</h3>
              <p className="mt-2 text-primary-foreground/65 leading-relaxed">{desc}</p>
            </div>
          ))}

          <div className="sm:col-span-2 rounded-2xl border border-accent/30 bg-accent/10 px-7 py-6">
            <p className="font-display font-semibold text-2xl md:text-3xl">
              Isso não é falha da equipe. <span className="text-gradient">É o modelo.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LpProblem;
