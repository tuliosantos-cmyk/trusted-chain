import { useState } from "react";
import { ArrowRight, CheckCircle2, CreditCard, LifeBuoy, ShieldCheck, Timer } from "lucide-react";
import { toast } from "sonner";

const entregas = [
  "Ver o fornecedor acessando a própria conta e enviando documentos sozinho — sem sua equipe cobrando",
  "Rodar um checklist ou autoavaliação sem montar planilha do zero",
  "Ver o vencimento de um documento sendo avisado antes de virar problema",
  "Ter acesso ao time de implementação e suporte durante todo o período — inclusive para orientar o fornecedor",
];

const facts = [
  { icon: Timer, k: "30 dias", v: "de teste completo" },
  { icon: CreditCard, k: "R$ 0", v: "sem cartão de crédito" },
  { icon: LifeBuoy, k: "Suporte", v: "time dedicado incluso" },
];

const LpTeste = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error("Preencha nome, e-mail corporativo e empresa.");
      return;
    }
    setSubmitted(true);
    toast.success("Recebemos seu pedido. Seu acesso é liberado em até 1 dia útil.");
  };

  return (
    <section id="teste" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-50 pointer-events-none" />
      <div className="container relative grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Teste grátis</span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
            No teste grátis, <span className="text-gradient">você vai:</span>
          </h2>

          <ul className="mt-8 space-y-4">
            {entregas.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-1" />
                <span className="text-lg text-primary leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {facts.map(({ icon: Icon, k, v }) => (
              <div key={k} className="rounded-2xl border border-border bg-gradient-card p-5 shadow-card">
                <Icon className="size-5 text-accent" />
                <div className="mt-3 font-display font-bold text-2xl text-primary">{k}</div>
                <div className="text-sm text-muted-foreground">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 lg:sticky lg:top-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl bg-card border border-border shadow-elegant p-8 md:p-10">
              {!submitted ? (
                <>
                  <h3 className="font-display font-semibold text-2xl text-primary">Começar meu teste grátis</h3>
                  <p className="mt-2 text-muted-foreground">
                    30 dias, sem cartão. Você vê funcionando antes de qualquer conversa de venda.
                  </p>

                  <form onSubmit={submit} className="mt-7 grid sm:grid-cols-2 gap-4">
                    <Field label="Nome *" value={form.name} onChange={handle("name")} placeholder="Seu nome" />
                    <Field
                      label="E-mail corporativo *"
                      type="email"
                      value={form.email}
                      onChange={handle("email")}
                      placeholder="voce@empresa.com"
                    />
                    <Field label="Empresa *" value={form.company} onChange={handle("company")} placeholder="Nome da empresa" />
                    <Field label="Cargo (opcional)" value={form.role} onChange={handle("role")} placeholder="Ex: Gerente de Qualidade" />

                    <button
                      type="submit"
                      className="sm:col-span-2 group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-accent px-6 py-4 mt-2 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
                    >
                      Começar meu teste grátis
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="sm:col-span-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="size-3.5 text-success" />
                      Seus dados são confidenciais. Sem spam, sem cartão de crédito.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto size-16 rounded-full bg-success/15 grid place-items-center">
                    <CheckCircle2 className="size-8 text-success" />
                  </div>
                  <h3 className="mt-6 font-display font-bold text-2xl text-primary">Pedido recebido!</h3>
                  <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                    Nossa equipe libera seu acesso em até <strong className="text-primary">1 dia útil</strong> — junto com
                    o convite para a Sessão Estratégica de Conformidade.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
    <input
      {...props}
      className="w-full h-12 rounded-xl border border-input bg-background px-4 text-primary placeholder:text-muted-foreground/60 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
    />
  </div>
);

export default LpTeste;
