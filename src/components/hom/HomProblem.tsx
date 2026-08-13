import { CalendarX, FileWarning, MailWarning, Repeat } from "lucide-react";

const symptoms = [
  {
    icon: MailWarning,
    title: "Homologação de dias que leva semanas",
    desc: "Porque depende de cobrança manual: e-mail, ligação, e-mail de novo.",
  },
  {
    icon: FileWarning,
    title: "Homologado, mas com documento vencido",
    desc: "Venceu há meses e ninguém percebeu — não havia como perceber.",
  },
  {
    icon: Repeat,
    title: "Nenhum histórico de desempenho",
    desc: "Só a lembrança de quem cobrou da última vez.",
  },
  {
    icon: CalendarX,
    title: "Cada auditoria de fornecedor vira um projeto",
    desc: "Montado do zero, com o que deu tempo de achar.",
  },
];

const HomProblem = () => (
  <section id="problema" className="relative bg-primary text-primary-foreground py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="absolute -right-40 top-0 size-[500px] bg-glow opacity-40 pointer-events-none" />

    <div className="container relative">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-widest text-accent-glow font-semibold">O problema</span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl leading-tight">
            A cena que se repete a cada <span className="text-gradient">fornecedor novo.</span>
          </h2>

          <div className="mt-10 rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 backdrop-blur p-8">
            <div className="space-y-3 text-sm">
              {[
                { d: "Dia 1", t: "Fornecedor novo entra na cadeia. Abre planilha, cria pasta." },
                { d: "Dia 2", t: "E-mail pedindo alvará, contrato social, certidão." },
                { d: "Dia 9", t: "Cobra de novo. Chega metade." },
                { d: "Dia 21", t: "Ainda falta um documento — e ninguém sabe qual." },
              ].map((s) => (
                <div key={s.d} className="flex gap-4">
                  <span className="w-14 shrink-0 font-display font-bold text-accent-glow tabular-nums">{s.d}</span>
                  <span className="text-primary-foreground/70 leading-relaxed">{s.t}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 pt-6 border-t border-primary-foreground/10 text-primary-foreground/70 leading-relaxed">
              Espalhado entre e-mail, Drive e pasta física.{" "}
              <span className="text-primary-foreground">Homologação que devia levar dias leva semanas.</span>
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
              <h3 className="mt-5 font-display font-semibold text-xl leading-snug">{title}</h3>
              <p className="mt-2 text-primary-foreground/65 leading-relaxed">{desc}</p>
            </div>
          ))}

          <div className="sm:col-span-2 rounded-2xl border border-accent/30 bg-accent/10 px-7 py-6">
            <p className="font-display font-semibold text-2xl md:text-3xl">
              Isso não é falta de rigor da equipe.{" "}
              <span className="text-gradient">É o modelo tentando escalar numa planilha.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomProblem;
