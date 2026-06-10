import { useState } from "react";
import { Helmet } from "react-helmet-async";
import anneDezan from "@/assets/anne-dezan.jpg";
import logoFssc from "@/assets/logo-fssc.png";
import eventInfoPills from "@/assets/event-info-pills.png";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Monitor,
  Ticket,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Quote,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const learn = [
  ["O que mudou da V6 para a V7 na prática", "Quais são as mudanças reais nos requisitos e o que isso significa para a sua operação."],
  ["Cultura de food safety como requisito auditável", "Como demonstrar — com evidências — que a cultura de segurança dos alimentos existe de verdade na sua empresa."],
  ["O que os auditores estão cobrando agora", "Direto da prática de auditorias: o que mudou nas exigências depois da V7 e o que as empresas ainda estão pegando de surpresa."],
  ["Gestão de fornecedores e controle de alérgenos na V7", "Novos critérios de avaliação, qualificação e monitoramento que as empresas precisam estruturar."],
  ["Como preparar sua empresa agora", "O que é mais crítico fazer antes da próxima auditoria."],
  ["Erros mais comuns na adaptação à V7", "O que as empresas estão errando e como evitar as principais armadilhas."],
];

const audience = [
  "Trabalha com qualidade na indústria alimentícia",
  "Lida com certificações e auditorias FSSC 22000",
  "Precisa entender o que muda com a V7 na prática",
  "Quer preparar sua empresa para a próxima certificação",
  "Quer evitar surpresas na próxima auditoria",
];

const WebinarV7 = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error("Preencha nome, e-mail e empresa.");
      return;
    }
    setSubmitted(true);
    toast.success("Inscrição confirmada! Você receberá o link por e-mail.");
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Pronto para a V7? | Webinar gratuito FSSC 22000 com Anne Dezan — 24/06</title>
        <meta
          name="description"
          content="Webinar gratuito sobre FSSC 22000 V7 com Anne Dezan — Auditora Líder BRCGS. 24/06, 19h30, online. Entenda o que mudou e como preparar sua empresa para a próxima auditoria."
        />
        <link rel="canonical" href="/webinar-v7" />
        <meta property="og:title" content="Pronto para a V7? Webinar FSSC 22000 com Anne Dezan" />
        <meta property="og:description" content="24/06, 19h30, online. Gratuito. O que mudou na FSSC 22000 V7 e como preparar sua empresa." />
        <meta property="og:url" content="/webinar-v7" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section className="relative bg-hero text-primary-foreground overflow-hidden noise">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative py-20 md:py-28 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Texto */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/90 backdrop-blur">
                <Sparkles className="size-3.5 text-accent-glow" />
                Webinar gratuito · 24 de junho · 19h30 · Online
              </div>
              <h1 className="mt-6 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                Sua empresa está pronta para a <span className="text-gradient">FSSC 22000 V7?</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/75 max-w-xl leading-relaxed">
                Descubra o que mudou, o que os auditores estão cobrando agora e como preparar sua operação — antes da próxima auditoria.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                {[
                  [CalendarDays, "24 de junho de 2025"],
                  [Clock, "19h30 (Brasília)"],
                  [Monitor, "Online — ao vivo"],
                  [Ticket, "Gratuito"],
                ].map(([Icon, label], i) => (
                  <div key={i} className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2.5 backdrop-blur">
                    <Icon className="size-4 text-accent-glow" />
                    <span className="font-medium">{label as string}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-primary-foreground/10">
                <div className="rounded-lg bg-primary-foreground/95 px-4 py-2.5 shadow-card">
                  <img src={logoFssc} alt="FSSC 22000" className="h-7 w-auto" loading="lazy" />
                </div>
                <p className="text-xs text-primary-foreground/65 leading-snug max-w-xs">
                  Conteúdo oficial sobre os novos requisitos da <strong className="text-primary-foreground/90">FSSC 22000 V7</strong>.
                </p>
              </div>

              <p className="mt-6 text-sm text-primary-foreground/60 flex items-center gap-2">
                <AlertTriangle className="size-3.5 text-accent-glow" />
                Vagas limitadas. Inscrição encerra em breve.
              </p>
            </div>

            {/* Form */}
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-accent opacity-25 blur-2xl rounded-3xl" />
              <div className="relative rounded-2xl bg-background text-foreground border border-white/10 shadow-elegant p-6 md:p-8">
                {!submitted ? (
                  <form onSubmit={submit} className="space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary">Inscreva-se agora</h3>
                      <p className="text-sm text-muted-foreground mt-1">Receba o link de acesso no seu e-mail.</p>
                    </div>
                    <FieldLight label="Nome completo *" value={form.name} onChange={handle("name")} placeholder="Seu nome" />
                    <FieldLight label="E-mail *" type="email" value={form.email} onChange={handle("email")} placeholder="voce@empresa.com" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FieldLight label="Empresa *" value={form.company} onChange={handle("company")} placeholder="Nome da empresa" />
                      <FieldLight label="Cargo / Área" value={form.role} onChange={handle("role")} placeholder="Ex: Gerente de Qualidade" />
                    </div>
                    <button
                      type="submit"
                      className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
                    >
                      Quero participar — é gratuito
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="flex items-center gap-2 text-xs text-muted-foreground justify-center text-center">
                      <ShieldCheck className="size-3.5 text-success shrink-0" />
                      Ao se inscrever, você concorda com nossa política de privacidade.
                    </p>
                  </form>
                ) : (
                  <div className="py-10 text-center">
                    <div className="mx-auto size-14 rounded-full bg-success/15 grid place-items-center">
                      <CheckCircle2 className="size-7 text-success" />
                    </div>
                    <h3 className="mt-5 font-display font-bold text-xl text-primary">Inscrição confirmada!</h3>
                    <p className="mt-2 text-muted-foreground text-sm">
                      Enviamos o link para <strong className="text-primary">{form.email}</strong>. Nos vemos no dia <strong className="text-primary">24/06 às 19h30</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">O cenário</span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl text-primary leading-tight">
            A versão 7 da FSSC 22000 chegou com mudanças que vão{" "}
            <span className="text-gradient">além de uma revisão de documentos.</span>
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>Cultura de food safety virou requisito auditável. A comprovação de eficácia do sistema passou a ser exigida com evidências concretas. Gestão de fornecedores, controle de alérgenos e rastreabilidade ficaram mais rigorosos.</p>
            <p className="text-primary font-semibold text-xl">Não basta ter o processo documentado. Agora é preciso provar que funciona.</p>
            <p className="border-l-4 border-accent pl-5 italic text-primary">
              Quem não entender o que mudou — vai descobrir na auditoria.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE VAI APRENDER */}
      <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />
        <div className="container relative max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Conteúdo</span>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl text-primary leading-tight">
              O que será abordado no webinar
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Conteúdo direto de quem conduz auditorias — sem teoria, sem enrolação.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {learn.map(([title, desc]) => (
              <div key={title} className="group rounded-2xl bg-card border border-border p-7 shadow-card hover:shadow-elegant transition-all">
                <CheckCircle2 className="size-7 text-accent" />
                <h3 className="mt-4 font-display font-semibold text-xl text-primary leading-snug">{title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#inscricao"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-accent px-7 py-4 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
            >
              Quero garantir minha vaga
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* PALESTRANTE */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-5xl">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Palestrante</span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl text-primary leading-tight">
            Quem vai conduzir o webinar
          </h2>

          <div className="mt-12 grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-accent opacity-20 blur-2xl rounded-3xl" />
                <img
                  src={anneDezan}
                  alt="Anne Dezan — Auditora Líder BRCGS e palestrante do webinar FSSC 22000 V7"
                  loading="lazy"
                  className="relative aspect-[4/5] w-full object-cover rounded-2xl shadow-elegant border border-border"
                />
              </div>
            </div>

            <div className="md:col-span-8">
              <h3 className="font-display font-bold text-3xl text-primary">Anne Dezan</h3>
              <p className="mt-2 text-accent font-semibold">
                Bióloga · Consultora · Auditora Líder BRCGS · Auditora por certificadoras
              </p>

              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Anne Dezan é bióloga, consultora, auditora e perita técnica em alimentos com mais de <strong className="text-primary">10 anos de experiência</strong> na gestão da qualidade e segurança dos alimentos.
                </p>
                <p>
                  Auditora Líder certificada pela BRCGS, auditora por certificadoras e assessora IFS Progress HPC, ela atua diretamente na implementação e auditoria de normas como <strong className="text-primary">FSSC 22000, IFS, BRCGS, HACCP e BPF</strong> — da produção primária à industrialização.
                </p>
                <p>
                  Pós-graduada em Segurança dos Alimentos, Anne une bagagem técnica sólida com experiência prática real. Ela não vai falar de teoria — vai trazer o que vê dentro das empresas e nas auditorias.
                </p>
              </div>

              <blockquote className="mt-8 relative rounded-2xl bg-gradient-card border border-border p-6 shadow-card">
                <Quote className="absolute -top-3 -left-3 size-8 text-accent bg-background rounded-full p-1.5" />
                <p className="font-display font-semibold text-xl text-primary italic leading-snug">
                  "Quem faz auditoria de verdade sabe o que cobram de verdade."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container relative max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-accent-glow font-semibold">Público</span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl leading-tight">
            Este webinar foi feito para você que
          </h2>

          <ul className="mt-10 space-y-4">
            {audience.map((a) => (
              <li key={a} className="flex items-start gap-4 text-lg">
                <ArrowRight className="size-5 text-accent-glow shrink-0 mt-1.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-display font-semibold text-2xl">
            Se você se reconheceu em algum desses pontos — esse webinar é para você.
          </p>
          <p className="mt-5 text-primary-foreground/65 leading-relaxed border-l-2 border-primary-foreground/20 pl-5">
            Se você já domina cada requisito da V7 e sua empresa está 100% adequada — talvez não precise. Mas se ainda tem alguma dúvida, vale garantir sua vaga.
          </p>

          <div className="mt-10">
            <a
              href="#inscricao"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-accent px-7 py-4 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
            >
              Garantir minha vaga
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* DETALHES */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Evento</span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl text-primary">Detalhes do evento</h2>

          <dl className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              ["Data", "24 de junho de 2025"],
              ["Horário", "19h30 (horário de Brasília)"],
              ["Formato", "Online · Ao vivo"],
              ["Investimento", "Gratuito"],
              ["Vagas", "Limitadas"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{k}</dt>
                <dd className="mt-2 font-display font-bold text-xl text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="inscricao" className="relative py-24 md:py-32 bg-secondary/50 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-40 pointer-events-none" />
        <div className="container relative max-w-3xl">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Inscrição</span>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl text-primary leading-tight">
              Garanta sua vaga agora
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Preencha os dados abaixo e receba o link de acesso no seu e-mail.
            </p>
          </div>

          <div className="mt-12 relative">
            <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl bg-card border border-border shadow-elegant p-8 md:p-10">
              {!submitted ? (
                <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nome completo *" value={form.name} onChange={handle("name")} placeholder="Seu nome" />
                  <Field label="E-mail *" type="email" value={form.email} onChange={handle("email")} placeholder="voce@empresa.com" />
                  <Field label="Empresa *" value={form.company} onChange={handle("company")} placeholder="Nome da empresa" />
                  <Field label="Cargo / Área (opcional)" value={form.role} onChange={handle("role")} placeholder="Ex: Gerente de Qualidade" />

                  <button
                    type="submit"
                    className="sm:col-span-2 group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-accent px-6 py-4 mt-2 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
                  >
                    Quero participar — é gratuito
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="sm:col-span-2 flex items-center gap-2 text-xs text-muted-foreground justify-center text-center">
                    <ShieldCheck className="size-3.5 text-success shrink-0" />
                    Ao se inscrever, você concorda com nossa política de privacidade. Não enviamos spam.
                  </p>
                </form>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto size-16 rounded-full bg-success/15 grid place-items-center">
                    <CheckCircle2 className="size-8 text-success" />
                  </div>
                  <h3 className="mt-6 font-display font-bold text-2xl text-primary">Inscrição confirmada!</h3>
                  <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                    Enviamos o link de acesso para <strong className="text-primary">{form.email}</strong>. Nos vemos no dia <strong className="text-primary">24/06 às 19h30</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE A MYTS */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl text-center">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Realização</span>
          <div className="mt-6 inline-flex items-center gap-3">
            <div className="size-12 rounded-xl bg-gradient-accent grid place-items-center font-display font-bold text-2xl text-accent-foreground shadow-cta">M</div>
            <span className="font-display font-bold text-2xl text-primary">MyTS</span>
          </div>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A MyTS é uma solução de gestão de fornecedores, processos e documentação para empresas que levam qualidade a sério.
            </p>
            <p>
              Organizamos esse webinar porque acreditamos que conformidade começa com conhecimento — e que quem trabalha com qualidade merece conteúdo à altura.
            </p>
          </div>
          <a href="https://myt-s.com" className="mt-6 inline-block text-accent font-semibold hover:underline">
            myt-s.com
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-primary-foreground/10">
        <div className="container text-center text-sm text-primary-foreground/60 space-y-3">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="#" className="hover:text-primary-foreground transition">Política de privacidade</a>
            <span className="text-primary-foreground/30">·</span>
            <a href="#" className="hover:text-primary-foreground transition">Contato</a>
            <span className="text-primary-foreground/30">·</span>
            <a href="https://myt-s.com" className="hover:text-primary-foreground transition">myt-s.com</a>
          </div>
          <div className="text-xs text-primary-foreground/40">
            © 2025 MyTS — My Trusted Source. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
};

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
    <input
      {...props}
      className="w-full h-12 rounded-xl border border-input bg-background px-4 text-primary placeholder:text-muted-foreground/60 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
    />
  </div>
);

const FieldLight = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
    <input
      {...props}
      className="w-full h-11 rounded-xl border border-border bg-secondary/60 px-4 text-primary placeholder:text-muted-foreground/60 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
    />
  </div>
);

export default WebinarV7;
