import { Helmet } from "react-helmet-async";
import {
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  Network,
  Sparkles,
  Building2,
  Boxes,
  ClipboardCheck,
  ListChecks,
  Workflow,
  GitCompare,
  Truck,
  Lock,
  Beaker,
  Cog,
  Award,
  Eye,
  Hexagon,
  Printer,
} from "lucide-react";

/* -----------------------------------------------------------
   FSSC 22000 V7 — Visual long-form page
   Conteúdo extraído fielmente do deck "Atualização FSSC 22000"
   ----------------------------------------------------------- */

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/80">
    {children}
  </span>
);

const SectionLabel = ({ n, label }: { n: string; label: string }) => (
  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
    <span className="font-mono text-accent-glow">{n}</span>
    <span className="h-px w-10 bg-accent/50" />
    {label}
  </div>
);

/* ---------- 01 · HERO ---------- */
const Hero = () => (
  <section className="relative bg-hero overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 noise">
    <div className="absolute inset-0 grid-pattern opacity-30" />
    <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full border border-primary-foreground/10" />
    <div className="absolute -top-20 right-20 w-[500px] h-[500px] rounded-full border border-primary-foreground/10" />
    <div className="absolute top-32 right-40 size-6 rounded-full bg-primary-foreground" />
    <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-glow opacity-60 pointer-events-none" />

    <div className="container relative">
      <Chip>
        <ShieldCheck className="size-3.5 text-accent-glow" />
        Esquema FSSC 22000 · Versão 7.0
      </Chip>

      <h1 className="mt-8 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-primary-foreground max-w-5xl">
        Atualização <br />
        <span className="text-gradient">FSSC 22000</span>
      </h1>

      <p className="mt-8 text-lg md:text-xl text-primary-foreground/70 max-w-2xl">
        Tudo o que muda na transição da Versão 6 para a Versão 7 do esquema FSSC 22000,
        organizado visualmente.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-6 text-primary-foreground/75">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-gradient-accent shadow-cta flex items-center justify-center font-display font-bold text-accent-foreground">
            AD
          </div>
          <div>
            <div className="font-semibold text-primary-foreground">Anne Dezan</div>
            <div className="text-xs text-primary-foreground/55">Apresentação técnica</div>
          </div>
        </div>
        <div className="h-10 w-px bg-primary-foreground/15" />
        <div className="font-display font-bold text-2xl text-primary-foreground">&amp; MyTS</div>
      </div>
    </div>
  </section>
);

/* ---------- 02 · ESQUEMA V6 ---------- */
const EsquemaV6 = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <SectionLabel n="02" label="Esquema FSSC 22000 · Versão 6.0" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary max-w-3xl">
        Como está estruturado o esquema <span className="text-gradient">hoje</span>
      </h2>

      <div className="mt-16 relative rounded-3xl bg-gradient-card border border-border p-8 md:p-14 shadow-card">
        {/* Top: SGSA / ISO 22000:2018 */}
        <div className="flex justify-center">
          <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-6 shadow-elegant text-center min-w-[260px]">
            <div className="text-xs uppercase tracking-widest text-accent-glow font-semibold">SGSA</div>
            <div className="mt-2 font-display font-bold text-2xl">ISO 22000:2018</div>
          </div>
        </div>

        {/* Down arrows */}
        <div className="mt-6 flex justify-center gap-32 md:gap-64">
          <ArrowRight className="size-8 text-accent rotate-90" />
          <ArrowRight className="size-8 text-accent rotate-90" />
        </div>

        {/* Center label */}
        <div className="mt-6 text-center">
          <div className="inline-block font-display font-bold text-3xl md:text-4xl text-primary">
            Esquema <span className="text-gradient">FSSC 22000</span>
          </div>
        </div>

        {/* Bottom: Two pillars */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-accent text-accent-foreground p-8 shadow-elegant">
            <div className="flex items-center gap-3">
              <Layers className="size-6" />
              <div className="text-xs uppercase tracking-widest font-semibold opacity-80">PPR's</div>
            </div>
            <div className="mt-4 font-display font-bold text-3xl">ISO/TS 22002-X</div>
            <div className="mt-2 text-sm opacity-85">Programa de pré-requisitos por categoria</div>
          </div>
          <div className="rounded-2xl bg-accent text-accent-foreground p-8 shadow-elegant">
            <div className="flex items-center gap-3">
              <ListChecks className="size-6" />
              <div className="text-xs uppercase tracking-widest font-semibold opacity-80">Por setor</div>
            </div>
            <div className="mt-4 font-display font-bold text-3xl">Requisitos Adicionais</div>
            <div className="mt-2 text-sm opacity-85">+ BoS &nbsp;·&nbsp; + Artigos de interpretação</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 03 · CONSELHO ---------- */
const Conselho = () => (
  <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute -top-20 -right-20 size-96 bg-glow opacity-50" />
    <div className="container relative">
      <SectionLabel n="03" label="Governança do esquema" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
        Conselho das <br />
        <span className="text-gradient">Partes Interessadas</span>
      </h2>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-8">
          <div className="flex items-center gap-3 text-accent-glow">
            <CheckCircle2 className="size-5" />
            <span className="text-xs uppercase tracking-widest font-semibold">Responsabilidade</span>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/85">
            É responsável pela <strong className="text-primary-foreground">aprovação do conteúdo do esquema FSSC 22000</strong>.
          </p>
        </div>
        <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-8">
          <div className="flex items-center gap-3 text-accent-glow">
            <Workflow className="size-5" />
            <span className="text-xs uppercase tracking-widest font-semibold">Decisão</span>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/85">
            A revisão pode ser <strong className="text-primary-foreground">contínua ou exclusiva</strong>, e pode ser assumida pelo <strong className="text-primary-foreground">BoS</strong> quando necessário.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 04 · BoS v7.0 ---------- */
const BoSCard = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <SectionLabel n="04" label="Board of Stakeholders" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary">
        <span className="text-gradient">BoS v.7.0</span> — Maio 2026
      </h2>

      <div className="mt-14 rounded-3xl bg-gradient-card border border-border shadow-card overflow-hidden">
        <div className="bg-success p-6 text-success-foreground flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="size-6" />
            <span className="font-display font-semibold text-lg">FSSC 22000 — Decision #1</span>
          </div>
          <span className="rounded-full bg-success-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Mandatory
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="md:col-span-5 p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Reference</div>
            <div className="mt-2 font-display font-semibold text-xl text-primary">
              Requirements for Version 7 Upgrade Process
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The V7 Upgrade Process sets out the requirements for CBs and ABs on the transition
              process, including how to transition organizations from FSSC 22000 Version 6 to Version 7.
            </p>
          </div>
          <div className="md:col-span-2 p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Decision date</div>
            <div className="mt-2 font-display font-bold text-2xl text-primary">12 Nov 2025</div>
          </div>
          <div className="md:col-span-2 p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Effective date</div>
            <div className="mt-2 font-display font-bold text-2xl text-accent">01 May 2027</div>
          </div>
          <div className="md:col-span-3 p-6 bg-accent/5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Transition period</div>
            <div className="mt-2 font-display font-bold text-3xl text-primary">12 <span className="text-base font-medium text-muted-foreground">meses</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 05 · V6 → V7 ---------- */
const V6toV7 = () => {
  const Stack = ({ label, items, ring }: { label: string; items: string[]; ring: string }) => (
    <div className="flex-1">
      <div className={`inline-block rounded-2xl ${ring} px-5 py-2 font-display font-bold text-primary-foreground text-lg shadow-elegant`}>
        {label}
      </div>
      <div className="mt-6 space-y-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl bg-primary-foreground/95 border border-primary-foreground/40 p-4 text-primary font-semibold shadow-card"
          >
            {it}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container relative">
        <SectionLabel n="05" label="Comparativo de normas" />
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl">
          Esquema FSSC 22000 — <span className="text-gradient">V.6 → V.7</span>
        </h2>

        <div className="mt-14 grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          <Stack
            label="Antes · V.6"
            ring="bg-accent"
            items={["ISO 22000:2018", "ISO/TS 22002-1"]}
          />
          <div className="hidden md:flex flex-col items-center pt-16">
            <div className="rounded-full bg-gradient-accent p-4 shadow-glow">
              <ArrowRight className="size-8 text-accent-foreground" />
            </div>
            <div className="mt-3 text-xs uppercase tracking-widest text-accent-glow font-semibold">Transição</div>
          </div>
          <Stack
            label="Agora · V.7"
            ring="bg-accent-glow"
            items={["ISO 22000:2018", "ISO 22002-100:2025", "ISO 22002-1:2025 (Categoria)"]}
          />
        </div>
      </div>
    </section>
  );
};

/* ---------- 06 · TRANSIÇÃO timeline ---------- */
const Transicao = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <SectionLabel n="06" label="Calendário de transição" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary">
        Linha do tempo da <span className="text-gradient">Transição</span>
      </h2>

      <div className="mt-16 relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-glow to-accent" />

        {[
          {
            date: "Maio 2026",
            title: "PUBLICAÇÃO",
            desc: "Versão 7.0 do esquema é publicada oficialmente.",
            side: "left",
            color: "bg-accent",
          },
          {
            date: "até 30 de abril de 2027",
            title: "Auditorias V6",
            desc: "As auditorias FSSC 22000 Versão 6 só poderão ser realizadas até 30 de abril de 2027.",
            side: "right",
            color: "bg-primary",
          },
          {
            date: "Maio 2027",
            title: "INÍCIO AUDITORIAS V7",
            desc: "Começa o ciclo de auditorias contra o Esquema V7.",
            side: "left",
            color: "bg-accent-glow",
          },
          {
            date: "1 maio 2027 → 30 abril 2028",
            title: "Auditorias de upgrade",
            desc: "As auditorias de upgrade contra o Esquema FSSC 22000 Versão 7 deverão ser conduzidas neste período.",
            side: "right",
            color: "bg-success",
          },
        ].map((s, i) => (
          <div
            key={i}
            className={`relative grid md:grid-cols-2 gap-8 mb-12 ${
              s.side === "right" ? "md:rtl" : ""
            }`}
          >
            <div className={`md:ltr ${s.side === "right" ? "md:col-start-2" : ""}`}>
              <div className="ml-12 md:ml-0 md:mr-12 rounded-2xl bg-gradient-card border border-border p-6 shadow-card">
                <div className="text-xs uppercase tracking-widest text-accent font-semibold">{s.date}</div>
                <div className="mt-2 font-display font-bold text-xl text-primary">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
            <div
              className={`absolute left-4 md:left-1/2 -translate-x-1/2 size-8 rounded-full ${s.color} border-4 border-background shadow-glow`}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- 07 · ESTRUTURA Requisitos Adicionais ---------- */
const EstruturaRequisitos = () => {
  const parts = [
    { n: "PARTE 1", t: "Visão geral do esquema" },
    { n: "PARTE 2", t: "Requisitos para as organizações a serem auditadas" },
    { n: "PARTE 3", t: "Requisitos para o processo de certificação" },
    { n: "PARTE 4", t: "Requisitos para os organismos de certificação" },
    { n: "PARTE 5", t: "Requisitos para os organismos de acreditação" },
  ];
  const apx = [
    { n: "APÊNDICE 1", t: "Definições" },
    { n: "APÊNDICE 2", t: "Referências normativas" },
  ];
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <SectionLabel n="07" label="Estrutura do documento" />
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl">
          Requisitos adicionais <span className="text-gradient">FSSC 22000</span>
        </h2>

        <div className="mt-14 grid md:grid-cols-5 gap-4">
          {parts.map((p, i) => (
            <div
              key={p.n}
              className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-6 hover:border-accent-glow/60 transition-all"
            >
              <div className="font-mono text-xs text-accent-glow font-bold">{p.n}</div>
              <div className="mt-3 font-display font-semibold text-lg leading-snug">{p.t}</div>
              <div className="mt-4 size-8 rounded-full bg-gradient-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {apx.map((p) => (
            <div key={p.n} className="rounded-2xl border border-dashed border-primary-foreground/20 p-5 flex items-center gap-4">
              <FileText className="size-5 text-accent-glow" />
              <div>
                <div className="font-mono text-xs text-accent-glow font-bold">{p.n}</div>
                <div className="font-display font-semibold">{p.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- 08 · VISÃO GERAL ---------- */
const VisaoGeral = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <SectionLabel n="08" label="Visão geral das mudanças" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary">
        O que <span className="text-gradient">muda</span> — e o que segue igual
      </h2>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-gradient-card border-2 border-success/30 p-8 shadow-card">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-success text-success-foreground flex items-center justify-center">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="font-display font-bold text-2xl text-primary">Sem alterações</div>
          </div>
          <div className="mt-6 space-y-2">
            {["Parte 1 — Visão geral", "Parte 3 — Processo de certificação"].map((x) => (
              <div key={x} className="rounded-xl bg-success/5 border border-success/20 px-4 py-3 text-sm font-medium text-primary">
                {x}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-card border-2 border-accent/30 p-8 shadow-card">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center">
              <AlertCircle className="size-6" />
            </div>
            <div className="font-display font-bold text-2xl text-primary">Alterações</div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {[
              "Parte 2 — Organizações auditadas",
              "Parte 4 — Organismos de certificação",
              "Parte 5 — Organismos de acreditação",
              "Apêndice 1 — Definições",
              "Apêndice 2 — Referências",
            ].map((x) => (
              <div key={x} className="rounded-xl bg-accent/5 border border-accent/20 px-4 py-3 text-sm font-medium text-primary">
                {x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 09 · TABELA 1.1 ---------- */
const Tabela11 = () => {
  const rows = [
    { cat: "C0", sub: "C0-1", desc: "Bovinos, ovinos e caprinos, suínos, aves & caça" },
    { cat: "C0", sub: "C0-2", desc: "Peixes, moluscos e crustáceos" },
    { cat: "CI", sub: "CI-1", desc: "Carne vermelha e branca" },
    { cat: "CI", sub: "CI-2", desc: "Peixes, moluscos e crustáceos" },
    { cat: "CI", sub: "CI-3", desc: "Laticínios" },
    { cat: "CI", sub: "CI-4", desc: "Ovos e derivados" },
    { cat: "CIV", sub: "CIV-1", desc: "Produtos processados térmicos e/ou sob pressão, incluindo pasteurização, esterilização comercial (UHT, conservas, autoclave) e processamento a alta pressão (HPP)" },
    { cat: "CIV", sub: "CIV-2", desc: "Alimentos secos e ingredientes (açúcar, sal, especiarias, farinha, etc.)" },
    { cat: "CIV", sub: "CIV-3", desc: "Alimentos e ingredientes conservados/autopreservados (ricos em ácidos, com baixa atividade de água, com alto teor de açúcar/brix, conservados com conservantes, vinagre, molhos, conservas, picles, produtos fermentados, molho de soja, mel cru/não pasteurizado). Exclui os produtos abrangidos pela CIV-1." },
    { cat: "CIV", sub: "CIV-4", desc: "Produtos extrusados, panificação e confeitaria" },
    { cat: "CIV", sub: "CIV-5", desc: "Gorduras e óleos vegetais ou animais" },
    { cat: "CIV", sub: "CIV-6", desc: "Bebidas (incluindo bebidas alcoólicas)" },
    { cat: "I", sub: "I-1", desc: "Plásticos (rígidos e flexíveis)" },
    { cat: "I", sub: "I-2", desc: "Papel e cartão" },
    { cat: "I", sub: "I-3", desc: "Metal" },
    { cat: "I", sub: "I-4", desc: "Vidro" },
    { cat: "I", sub: "I-5", desc: "Outros: madeira, cortiça, corda, fita, tinta, etc." },
    { cat: "K", sub: "K-1", desc: "Auxiliares de processamento, aditivos, corantes, aromas, gases, vitaminas, suplementos alimentares" },
    { cat: "K", sub: "K-2", desc: "Bioculturas e enzimas" },
  ];

  const catColor: Record<string, string> = {
    C0: "bg-blue-500",
    CI: "bg-cyan-500",
    CIV: "bg-indigo-500",
    I: "bg-violet-500",
    K: "bg-fuchsia-500",
  };

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <SectionLabel n="09" label="Tabela 1.1" />
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl">
          (Sub)Categorias — <span className="text-gradient">Descrição</span>
        </h2>
        <p className="mt-4 text-primary-foreground/65 max-w-3xl">
          <strong>Obs.:</strong> Não existem sub(sub)categorias para BIII, CII, CIII, D, E, FI, FII e G.
        </p>

        <div className="mt-12 rounded-3xl overflow-hidden border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur">
          <div className="grid grid-cols-[80px_100px_1fr] bg-primary-foreground/10 text-xs uppercase tracking-widest font-semibold">
            <div className="p-4">(Sub) Cat.</div>
            <div className="p-4">Sub(sub)</div>
            <div className="p-4">Descrição</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.sub}
              className={`grid grid-cols-[80px_100px_1fr] items-center text-sm border-t border-primary-foreground/10 ${
                i % 2 ? "bg-primary-foreground/[0.02]" : ""
              }`}
            >
              <div className="p-4">
                <span className={`inline-block rounded-full ${catColor[r.cat]} text-white px-3 py-1 text-xs font-bold font-mono`}>
                  {r.cat}
                </span>
              </div>
              <div className="p-4 font-mono text-accent-glow font-semibold">{r.sub}</div>
              <div className="p-4 text-primary-foreground/85 leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- 10 · REQUISITOS ADICIONAIS V7 ---------- */
const RequisitosV7 = () => {
  const items = [
    { n: "2.5.1", t: "Gestão de serviços e materiais comprados" },
    { n: "2.5.2", t: "Rotulagem de produtos e materiais impressos" },
    { n: "2.5.3", t: "Defesa de alimentos" },
    { n: "2.5.4", t: "Mitigação de fraude de alimentos" },
    { n: "2.5.5", t: "Uso de logotipo" },
    { n: "2.5.6", t: "Gestão de alérgenos" },
    { n: "2.5.7", t: "Monitoramento ambiental" },
    { n: "2.5.8", t: "Cultura de segurança de alimentos e qualidade" },
    { n: "2.5.9", t: "Controle de qualidade" },
    { n: "2.5.10", t: "Transporte, armazenamento e estocagem" },
    { n: "2.5.11", t: "Controle de perigos e medidas de prevenção da contaminação cruzada" },
    { n: "2.5.12", t: "Verificação do PPR (E, FI)" },
    { n: "2.5.13", t: "Design e desenvolvimento de produto", highlight: true },
    { n: "2.5.14", t: "Rastreabilidade", highlight: true },
    { n: "2.5.15", t: "Gestão de equipamentos" },
    { n: "2.5.16", t: "Perda e desperdício de alimentos" },
    { n: "2.5.17", t: "Requisitos de comunicação" },
    { n: "2.5.18", t: "Requisitos para organizações com certificação multisite (BIII)" },
  ];
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionLabel n="10" label="Requisitos adicionais V7" />
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary max-w-4xl">
          Os <span className="text-gradient">18 requisitos</span> da seção 2.5
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div
              key={it.n}
              className={`rounded-2xl p-5 border transition-all hover:-translate-y-0.5 hover:shadow-card ${
                it.highlight
                  ? "border-accent bg-accent/5 shadow-card"
                  : "border-border bg-gradient-card"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`font-mono text-sm font-bold px-2.5 py-1 rounded-lg ${
                    it.highlight ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"
                  }`}
                >
                  {it.n}
                </div>
                <div className="flex-1 font-display font-semibold text-primary leading-snug">
                  {it.t}
                </div>
              </div>
              {it.highlight && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Sparkles className="size-3" /> Destaque V7
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- 11 · Rotulagem / Impressão ---------- */
const RotulagemImpressao = () => (
  <section className="py-24 md:py-32 bg-primary text-primary-foreground">
    <div className="container">
      <SectionLabel n="11" label="Requisito 2.5.2 · item d)" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl max-w-4xl">
        Gestão das ilustrações e procedimentos de <span className="text-gradient">controle de impressão</span>
      </h2>

      <div className="mt-14 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="size-14 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-glow">
            <Printer className="size-6 text-accent-foreground" />
          </div>
          <div className="font-display font-semibold text-xl">Procedimento documentado deve contemplar:</div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {["i", "ii", "iii", "iv", "v", "vi"].map((r, i) => (
            <div key={r} className="rounded-2xl border border-primary-foreground/15 bg-primary/40 p-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-accent-glow font-bold text-lg">{r}.</span>
                <span className="text-xs uppercase tracking-widest text-primary-foreground/55 font-semibold">
                  Subitem {i + 1}
                </span>
              </div>
              <div className="mt-3 h-px bg-primary-foreground/10" />
              <div className="mt-3 text-sm text-primary-foreground/65 italic">
                Item do requisito da norma — controle de versão, aprovação, rastreabilidade e auditoria de ilustrações e materiais impressos.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 12 · Cultura ---------- */
const Cultura = () => {
  const dims = [
    { l: "Quality Systems", icon: Cog },
    { l: "Regulatory Focus", icon: ShieldCheck },
    { l: "Document Quality", icon: FileText },
    { l: "Leadership", icon: Award },
    { l: "Training", icon: CheckCircle2 },
    { l: "Awareness", icon: Eye },
    { l: "IT/IS Tools", icon: Boxes },
    { l: "Staffing Levels", icon: Building2 },
  ];
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionLabel n="12" label="Requisito 2.5.8" />
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary max-w-4xl">
          Cultura de <span className="text-gradient">qualidade e segurança</span> de alimentos
        </h2>

        <div className="mt-14 grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-card border border-border p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-accent text-lg">a)</span>
                <span className="font-display font-semibold text-primary">Requisito da alta direção</span>
              </div>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Estabelecer, implementar, manter e melhorar continuamente uma cultura positiva de
                segurança de alimentos e qualidade, alinhada aos objetivos do SGSA.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-card border border-border p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-accent text-lg">c)</span>
                <span className="font-display font-semibold text-primary">Avaliação e melhoria</span>
              </div>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                A organização deve avaliar a eficácia da cultura e implementar planos de melhoria
                quando necessário, com evidências documentadas.
              </p>
            </div>

            <div className="mt-2 rounded-2xl bg-accent text-accent-foreground p-5">
              <div className="text-xs uppercase tracking-widest font-semibold opacity-80">
                Requisitos específicos
              </div>
              <div className="font-display font-bold text-2xl mt-1">GFSI</div>
            </div>
          </div>

          {/* Hex grid */}
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 shadow-elegant">
            <div className="text-center font-display font-bold text-2xl text-gradient">
              Quality Culture
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {dims.map((d) => (
                <div key={d.l} className="relative rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4 hover:border-accent-glow transition">
                  <Hexagon className="size-5 text-accent-glow mb-2" />
                  <div className="text-sm font-semibold">{d.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 13 · Design e desenvolvimento ---------- */
const DesignProduto = () => (
  <section className="py-24 md:py-32 bg-primary text-primary-foreground">
    <div className="container">
      <SectionLabel n="13" label="Requisito 2.5.13" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl max-w-4xl">
        Design e <span className="text-gradient">desenvolvimento de produto</span>
      </h2>

      <div className="mt-14 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono font-bold text-accent-glow text-2xl">g)</span>
          <span className="font-display font-semibold text-xl">Mudança em produto incorporado</span>
        </div>
        <p className="text-lg text-primary-foreground/85 leading-relaxed max-w-4xl">
          Quando uma mudança for incorporada, <strong className="text-primary-foreground">não deverá ter</strong> impacto adverso sobre a
          segurança de alimentos, a legalidade e os requisitos do cliente, devendo ser
          devidamente validada e documentada antes da implementação.
        </p>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {[
            { i: Beaker, t: "Avaliação técnica" },
            { i: ShieldCheck, t: "Análise de perigos" },
            { i: ClipboardCheck, t: "Validação documentada" },
            { i: CheckCircle2, t: "Aprovação formal" },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-primary-foreground/10 bg-primary/40 p-5">
              <s.i className="size-6 text-accent-glow" />
              <div className="mt-3 font-display font-semibold">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 14 · Impacto da mudança ---------- */
const ImpactoMudanca = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <SectionLabel n="14" label="Resumo executivo" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary">
        Impacto da <span className="text-gradient">mudança</span>
      </h2>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Layers,
            title: "Um padrão único",
            desc: "Setor PPR comum em alinhamento com partes interessadas e expectativas específicas de cada categoria.",
          },
          {
            icon: GitCompare,
            title: "Alinhamento internacional",
            desc: "Convergência entre ISO 22002-1:2025 e ISO 22002-100:2025, simplificando auditorias multinacionais.",
          },
          {
            icon: Lock,
            title: "Mais rigor e rastreabilidade",
            desc: "Reforço em cultura, design de produto, rotulagem, gestão de fornecedores e rastreabilidade.",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-3xl bg-gradient-card border border-border p-8 shadow-card hover:shadow-elegant transition-all">
            <div className="size-12 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-cta">
              <c.icon className="size-6 text-accent-foreground" />
            </div>
            <div className="mt-6 font-display font-bold text-xl text-primary">{c.title}</div>
            <p className="mt-3 text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- 15 · Tabela Alterações ---------- */
const TabelaAlteracoes = () => {
  const rows = [
    { n: 4, old: "Construção e layout das edificações", v1: "Construção e layout dos edifícios", n1: 4, v100: "Construção e layout de edifícios", n100: 4 },
    { n: 5, old: "Layout das instalações e área de trabalho", v1: "Projeto e leiaute das instalações e áreas de trabalho", n1: 5, v100: "Projeto e leiaute das instalações e áreas de trabalho", n100: 5 },
    { n: 6, old: "Utilidades — ar, água e energia", v1: "Utilidades", n1: 6, v100: "Utilidades", n100: 6 },
    { n: 7, old: "Descarte de resíduos", v1: "Gestão de resíduos, perdas e desperdício de alimentos (FLW) e reciclagem", n1: 8, v100: "Gestão de resíduos, perdas e desperdício de alimentos (FLW) e reciclagem", n100: 8 },
    { n: 8, old: "Adequação, limpeza e manutenção de equipamentos", v1: "Adequação e manutenção de equipamentos", n1: 9, v100: "Adequação e manutenção de equipamentos", n100: 9 },
    { n: 9, old: "Gestão de materiais adquiridos", v1: "Gestão de materiais adquiridos", n1: 10, v100: "Gestão de materiais adquiridos", n100: 10 },
    { n: 10, old: "Medidas para a prevenção de contaminação cruzada", v1: "Medidas para prevenção de contaminação", n1: 12, v100: "Medidas para prevenção de contaminação", n100: 12 },
    { n: 11, old: "Limpeza e Sanitização", v1: "Limpeza e Desinfecção", n1: 13, v100: "Limpeza e Desinfecção", n100: 13 },
    { n: 12, old: "Controle de Pragas", v1: "Controle de Pragas", n1: 7, v100: "Controle de Pragas", n100: 7 },
    { n: 13, old: "Higiene pessoal e instalação para funcionários", v1: "Higiene pessoal e instalações para trabalhadores", n1: 14, v100: "Higiene pessoal e instalações de trabalhadores", n100: 14 },
    { n: 14, old: "Retrabalho", v1: "Uso de material para reprocesso", n1: 17, v100: "—", n100: "—" },
    { n: 15, old: "Recolhimento", v1: "— (rec. ISO 22000 item 8.9.5)", n1: "—", v100: "— (rec. ISO 22000 item 8.9.5)", n100: "—" },
    { n: 16, old: "Armazenamento", v1: "Armazenamento, incluindo estocagem em armazém e transporte", n1: 11, v100: "Armazenamento, incluindo estocagem em armazém e transporte", n100: 11 },
    { n: 17, old: "Informação do produto e alerta ao consumidor", v1: "Informação sobre produtos ao consumidor", n1: 15, v100: "Informação sobre produtos ao consumidor", n100: 15 },
    { n: 18, old: "Defesa do alimento, biovigilância e bioterrorismo", v1: "Defesa dos alimentos e fraude de alimentos", n1: 16, v100: "Defesa dos alimentos e fraude de alimentos", n100: 16 },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <SectionLabel n="15" label="Comparativo detalhado" />
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl">
          <span className="text-gradient">Alterações</span> entre normas PPR
        </h2>

        <div className="mt-12 overflow-x-auto rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-primary-foreground/10 text-xs uppercase tracking-widest">
                <th className="p-4 text-left font-semibold w-16">#</th>
                <th className="p-4 text-left font-semibold text-accent-glow">ISO/TS 22002-1:2009</th>
                <th className="p-4 text-left font-semibold text-success">ISO 22002-1:2025</th>
                <th className="p-4 text-center font-semibold text-success w-16">#</th>
                <th className="p-4 text-left font-semibold text-orange-300">ISO 22002-100:2025</th>
                <th className="p-4 text-center font-semibold text-orange-300 w-16">#</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.n} className={`border-t border-primary-foreground/10 ${i % 2 ? "bg-primary-foreground/[0.02]" : ""}`}>
                  <td className="p-4 font-mono font-bold text-accent-glow">{r.n}</td>
                  <td className="p-4 text-primary-foreground/80">{r.old}</td>
                  <td className="p-4 text-primary-foreground">{r.v1}</td>
                  <td className="p-4 text-center font-mono font-semibold text-success">{r.n1}</td>
                  <td className="p-4 text-primary-foreground">{r.v100}</td>
                  <td className="p-4 text-center font-mono font-semibold text-orange-300">{r.n100}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

/* ---------- 17 · MyTS — Gestão de fornecedores ---------- */
const MyTSFornecedores = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <SectionLabel n="17" label="MyTS · Como contribuímos" />
      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary max-w-4xl">
        Gestão de <span className="text-gradient">fornecedores</span> na nova FSSC 22000 V7
      </h2>

      <div className="mt-10 max-w-4xl text-lg text-muted-foreground leading-relaxed">
        A gestão de fornecedores continua sendo um elemento fundamental para garantir a
        segurança de alimentos e a conformidade ao longo da cadeia produtiva. A nova versão da
        norma reforça a necessidade de monitoramento contínuo e evidências que comprovem a
        qualificação e o desempenho dos fornecedores.
      </div>

      <div className="mt-14 rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 shadow-elegant relative overflow-hidden">
        <div className="absolute -right-20 -top-20 size-72 bg-glow opacity-60" />
        <div className="relative">
          <div className="flex items-center gap-3 text-accent-glow">
            <Network className="size-5" />
            <span className="text-xs uppercase tracking-widest font-semibold">Como a MyTS contribui</span>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              { i: Building2, t: "Homologação digital de fornecedores" },
              { i: FileText, t: "Controle automatizado de documentos e certificações" },
              { i: AlertCircle, t: "Monitoramento de vencimentos e solicitação de atualizações" },
              { i: ClipboardCheck, t: "Avaliação periódica de desempenho" },
              { i: Truck, t: "Histórico completo de registros e evidências para auditorias" },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-5 flex items-start gap-4">
                <div className="size-10 shrink-0 rounded-xl bg-gradient-accent flex items-center justify-center shadow-cta">
                  <s.i className="size-5 text-accent-foreground" />
                </div>
                <div className="font-display font-semibold leading-snug pt-1.5">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-4xl text-lg text-muted-foreground leading-relaxed">
        Ao automatizar essas atividades, as empresas reduzem riscos relacionados à cadeia de
        fornecimento, aumentam a eficiência dos processos e fortalecem a conformidade com os
        requisitos da <strong className="text-primary">FSSC 22000 V7</strong>.
      </p>
    </div>
  </section>
);

/* ---------- 18 · CTA Final ---------- */
const Final = () => (
  <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="absolute -right-32 -bottom-32 size-[600px] bg-glow opacity-50" />
    <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <SectionLabel n="18" label="Conclusão" />
        <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
          A FSSC 22000 V7 reforça a importância do controle e monitoramento dos fornecedores
          para garantir a segurança de alimentos e a conformidade da cadeia produtiva.
        </p>
        <h2 className="mt-10 font-display font-bold text-5xl md:text-6xl leading-[1.05] tracking-tight">
          Visibilidade total,<br />
          controle completo e <br />
          <span className="text-gradient">conformidade garantida</span>
        </h2>

        <a
          href="#"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-accent px-8 py-4 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all"
        >
          Falar com a MyTS
          <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="relative">
        <div className="absolute -inset-8 bg-gradient-accent opacity-30 blur-3xl rounded-full" />
        <div className="relative aspect-square rounded-[3rem] border-2 border-primary-foreground/20 bg-primary/50 backdrop-blur p-12 flex flex-col items-center justify-center text-center">
          <ShieldCheck className="size-20 text-accent-glow" />
          <div className="mt-6 font-display font-bold text-3xl">FSSC 22000</div>
          <div className="text-xl text-accent-glow font-semibold">Versão 7.0</div>
          <div className="mt-6 text-xs uppercase tracking-widest text-primary-foreground/55">
            Maio 2026 · Vigência Maio 2027
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Page ---------- */
const FsscV7 = () => (
  <main className="bg-background">
    <Helmet>
      <title>Atualização FSSC 22000 V7 — Anne Dezan & MyTS</title>
      <meta
        name="description"
        content="Versão visual da apresentação Atualização FSSC 22000 V7: esquema, transição, requisitos adicionais e impacto da mudança."
      />
    </Helmet>
    <Hero />
    <EsquemaV6 />
    <Conselho />
    <BoSCard />
    <V6toV7 />
    <Transicao />
    <EstruturaRequisitos />
    <VisaoGeral />
    <Tabela11 />
    <RequisitosV7 />
    <RotulagemImpressao />
    <Cultura />
    <DesignProduto />
    <ImpactoMudanca />
    <TabelaAlteracoes />
    <MyTSFornecedores />
    <Final />
  </main>
);

export default FsscV7;
