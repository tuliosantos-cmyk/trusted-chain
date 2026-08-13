import { BellRing, ClipboardCheck, FileText, Users } from "lucide-react";

const modulos = [
  {
    icon: Users,
    t: "Meus Fornecedores",
    d: "O fornecedor acessa a própria conta, se cadastra, sobe os documentos e requisitos exigidos e acompanha o próprio status de homologação. Dentro do cadastro dele, você organiza a documentação regulatória de cada matéria-prima ou ingrediente que ele fornece — ficha técnica, laudo, especificação. Sua equipe valida — não persegue.",
    tags: ["Autocadastro", "Status de homologação", "Matéria-prima e ingrediente"],
  },
  {
    icon: ClipboardCheck,
    t: "Meus Processos",
    d: "Checklist e autoavaliação de qualificação técnica sem planilha, sem montar do zero a cada fornecedor novo.",
    tags: ["Checklist por norma", "Autoavaliação", "Reaplicação automática"],
  },
  {
    icon: FileText,
    t: "Meus Documentos",
    d: "Vencimento de documento avisado antes de virar problema, com histórico auditável de tudo que já foi enviado.",
    tags: ["Alerta de vencimento", "Histórico auditável", "Versões"],
  },
];

const antes = [
  "Equipe cobra documento um por um",
  "Status do fornecedor mora na cabeça de alguém",
  "Documento vence sem ninguém perceber",
  "Cada auditoria remonta tudo do zero",
];

const depois = [
  "O fornecedor entra com os próprios dados",
  "Status visível por fornecedor, em tempo real",
  "Vencimento avisado antes de virar risco",
  "Histórico pronto pra mostrar na auditoria",
];

const HomVirada = () => (
  <section id="plataforma" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">A virada</span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-tight">
          O cadastro não depende mais <span className="text-gradient">de cobrança.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          A virada não é ter mais uma ferramenta pra alimentar. É o fornecedor entrando com os próprios dados, direto.
          Ele não precisa que você cobre — ele já sabe o que está pendente.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-border bg-secondary/50 p-8">
          <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Antes</div>
          <ul className="mt-6 space-y-4">
            {antes.map((t) => (
              <li key={t} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-2 size-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-accent/25 bg-gradient-card p-8 shadow-card">
          <div className="text-xs uppercase tracking-widest font-semibold text-accent">Com a MyTS</div>
          <ul className="mt-6 space-y-4">
            {depois.map((t) => (
              <li key={t} className="flex items-start gap-3 text-primary leading-relaxed">
                <span className="mt-2 size-1.5 rounded-full bg-accent shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid md:grid-cols-3 gap-5">
        {modulos.map(({ icon: Icon, t, d, tags }) => (
          <div
            key={t}
            className="rounded-3xl bg-card border border-border p-8 shadow-card hover:shadow-elegant hover:border-accent/30 transition-all"
          >
            <div className="size-12 rounded-2xl bg-gradient-accent grid place-items-center shadow-cta">
              <Icon className="size-5 text-accent-foreground" />
            </div>
            <h3 className="mt-5 font-display font-semibold text-2xl text-primary">{t}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-accent/25 bg-accent/5 px-8 py-7 flex items-start gap-4">
        <BellRing className="size-6 text-accent shrink-0 mt-0.5" />
        <p className="font-display font-semibold text-xl md:text-2xl text-primary leading-snug">
          Quando um fornecedor crítico precisa ser revisado, a equipe não procura em três lugares. Confirma num só.
        </p>
      </div>
    </div>
  </section>
);

export default HomVirada;
