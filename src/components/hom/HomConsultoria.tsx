import { ArrowRight, BadgeCheck, CalendarClock, ClipboardList, Search, UserCog } from "lucide-react";

const servicos = [
  { icon: UserCog, t: "Outsourcing de qualidade", d: "Reforço técnico quando a equipe está no limite." },
  { icon: Search, t: "Auditoria de 2ª parte", d: "Visão externa antes de um fornecedor crítico virar risco." },
  { icon: ClipboardList, t: "Autoavaliação com validação técnica", d: "Não é só preencher formulário — alguém confere." },
  {
    icon: BadgeCheck,
    t: "Implementação guiada",
    d: "Kickoff, setup e integração dos fornecedores conduzidos com você, não entregues sozinho.",
  },
];

const HomConsultoria = () => (
  <section className="py-24 md:py-32 bg-secondary/40">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Bônus incluído</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          Consultoria especializada, <span className="text-gradient">dentro da conta.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Toda conta MyTS vem com gente especializada olhando pra sua operação — não só um painel esperando ser
          preenchido. Quando um fornecedor crítico exige análise mais profunda, a consultoria entra junto.
        </p>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {servicos.map(({ icon: Icon, t, d }) => (
          <div
            key={t}
            className="rounded-3xl bg-card border border-border p-7 shadow-card hover:shadow-elegant hover:border-accent/30 transition-all"
          >
            <div className="size-11 rounded-xl bg-accent/10 grid place-items-center">
              <Icon className="size-5 text-accent" />
            </div>
            <h3 className="mt-5 font-display font-semibold text-xl text-primary leading-snug">{t}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-14">
        <div className="absolute -left-24 -bottom-24 size-80 bg-glow opacity-60" />
        <div className="relative grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-glow">
              <CalendarClock className="size-3.5" />
              Exclusivo para quem testa
            </span>
            <h3 className="mt-5 font-display font-bold text-3xl md:text-4xl leading-tight">
              Sessão Estratégica de Conformidade — <span className="text-gradient">2h, sem custo.</span>
            </h3>
            <p className="mt-4 text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
              Um consultor especialista aponta, na prática, onde a sua homologação está hoje e o que resolver primeiro.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href="#teste"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-4 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
            >
              Quero minha sessão
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomConsultoria;
