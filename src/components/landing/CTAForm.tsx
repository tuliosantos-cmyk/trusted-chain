import { useState } from "react";
import { ArrowRight, CheckCircle2, Calendar, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const CTAForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", suppliers: "", phone: "" });

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error("Preencha nome, e-mail corporativo e empresa.");
      return;
    }
    setSubmitted(true);
    toast.success("Recebemos seu pedido. Nossa equipe entra em contato em até 1 dia útil.");
  };

  return (
    <section id="agendar" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-50 pointer-events-none" />
      <div className="container relative grid lg:grid-cols-12 gap-12 items-start">
        {/* Left: pitch */}
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Próximo passo</span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
            30 minutos. <br />
            <span className="text-gradient">Sem apresentação genérica.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Direto para a sua operação — tamanho da cadeia, normas que você gerencia, onde está o maior risco hoje.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Diagnóstico do seu cenário atual em tempo real",
              "Demonstração com seus fornecedores e normas",
              "Estimativa de economia com base no seu volume",
              "Sem compromisso. Você decide se faz sentido.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary font-medium">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-4 pt-8 border-t border-border">
            {[
              ["+3.000", "empresas ativas"],
              ["50K", "documentos"],
              ["+100", "auditores"],
              ["20 anos", "de experiência"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-display font-bold text-2xl text-primary">{k}</div>
                <div className="text-sm text-muted-foreground">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form card */}
        <div className="lg:col-span-7 lg:sticky lg:top-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl bg-card border border-border shadow-elegant p-8 md:p-10">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 rounded-xl bg-gradient-accent grid place-items-center shadow-cta">
                      <Calendar className="size-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-xl text-primary">Fale com um especialista MyTS</div>
                      <div className="text-sm text-muted-foreground">Conversa de 30 minutos, sem compromisso</div>
                    </div>
                  </div>

                  <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Field label="Nome completo *" value={form.name} onChange={handle("name")} placeholder="Seu nome" />
                    <Field label="E-mail corporativo *" type="email" value={form.email} onChange={handle("email")} placeholder="voce@empresa.com" />
                    <Field label="Empresa *" value={form.company} onChange={handle("company")} placeholder="Nome da empresa" />
                    <Field label="Cargo" value={form.role} onChange={handle("role")} placeholder="Ex: Gerente de Qualidade" />
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-primary mb-1.5">Quantos fornecedores você gerencia?</label>
                      <select
                        value={form.suppliers}
                        onChange={handle("suppliers")}
                        className="w-full h-12 rounded-xl border border-input bg-background px-4 text-primary outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                      >
                        <option value="">Selecione</option>
                        <option>Até 50</option>
                        <option>51 — 200</option>
                        <option>201 — 500</option>
                        <option>500+</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Telefone (WhatsApp)" value={form.phone} onChange={handle("phone")} placeholder="(00) 00000-0000" />
                    </div>

                    <button
                      type="submit"
                      className="sm:col-span-2 group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-accent px-6 py-4 mt-2 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
                    >
                      Agendar conversa de 30 min
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="sm:col-span-2 flex items-center gap-2 text-xs text-muted-foreground justify-center">
                      <ShieldCheck className="size-3.5 text-success" />
                      Seus dados são confidenciais. Nada de spam — só uma conversa direta.
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
                    Nossa equipe vai entrar em contato em até <strong className="text-primary">1 dia útil</strong> para alinhar o melhor horário.
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

export default CTAForm;
