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
  Link as LinkIcon,
  Package,
  Recycle,
  MessageSquare,
  Globe,
} from "lucide-react";
import anneFoto from "@/assets/anne-dezan.jpeg";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import logoCarrefour from "@/assets/logos/carrefour.png.asset.json";
import logoCvale from "@/assets/logos/cvale.webp.asset.json";
import logoKorin from "@/assets/logos/korin.png.asset.json";
import logoAval from "@/assets/logos/aval.png.asset.json";
import logoMartins from "@/assets/logos/martins.jpg.asset.json";
import logoAtakarejo from "@/assets/logos/atakarejo.webp.asset.json";
import logoCasaPao from "@/assets/logos/casa-pao-queijo.png.asset.json";

/* -----------------------------------------------------------
   FSSC 22000 V7 — "Pronto para a V7?" — slides 16:9
   ----------------------------------------------------------- */

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/80">
    {children}
  </span>
);

const SectionLabel = ({ n, label, light = false }: { n: string; label: string; light?: boolean }) => (
  <div className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-accent-glow" : "text-accent"}`}>
    <span className="font-mono">{n}</span>
    <span className={`h-px w-10 ${light ? "bg-accent-glow/60" : "bg-accent/50"}`} />
    {label}
  </div>
);

/* Wrapper that constrains a section to a 16:9 frame */
const Slide = ({
  bg = "bg-background",
  className = "",
  children,
  decor,
  pad = "p-8 md:p-14",
}: {
  bg?: string;
  className?: string;
  children: React.ReactNode;
  decor?: React.ReactNode;
  pad?: string;
}) => (
  <section className={`${bg} relative ${className}`} style={{ width: 1920, height: 1080, margin: 0, padding: 0, overflow: "hidden" }}>
    <div className="relative w-full h-full overflow-hidden">
      {decor}
      <div className={`relative h-full w-full flex flex-col ${pad}`}>{children}</div>
    </div>
  </section>
);

/* Decorative MyTS mark watermark */
const MytsWatermark = ({ className = "" }: { className?: string }) => (
  <img
    src={mytsMark}
    alt=""
    aria-hidden
    className={`pointer-events-none select-none absolute opacity-[0.06] ${className}`}
  />
);

/* ---------- 01 · HERO ---------- */
const Hero = () => (
  <Slide
    bg="bg-hero"
    pad="p-8 md:p-14"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-glow opacity-60 pointer-events-none blur-3xl rounded-full" />
        <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
      </>
    }
  >
    <div className="flex h-full items-center gap-10">
      <div className="flex-1 min-w-0">
        <Chip>
          <ShieldCheck className="size-3.5 text-accent-glow" />
          Webinar técnico · Anne Dezan & MyTS
        </Chip>

        <h1 className="mt-6 font-display font-bold text-5xl md:text-7xl leading-[0.95] tracking-tight text-primary-foreground">
          Pronto para a <br />
          <span className="text-gradient">V7?</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-primary-foreground/75 max-w-xl">
          Tudo o que muda na transição da Versão 6 para a Versão 7 do esquema FSSC 22000,
          organizado visualmente.
        </p>

        <div className="mt-8 flex items-center gap-5 text-primary-foreground/75">
          <div>
            <div className="font-semibold text-primary-foreground">Anne Dezan</div>
            <div className="text-xs text-primary-foreground/55">Bióloga · Consultora · Auditora</div>
          </div>
          <div className="h-10 w-px bg-primary-foreground/15" />
          <img src={mytsLogo} alt="MyTS" className="h-8 opacity-90" />
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 01b · QUEM VAI CONDUZIR · ANNE ---------- */
const AnneSection = () => (
  <Slide
    bg="bg-background"
    decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
  >
    <SectionLabel n="01" label="Quem vai conduzir o webinar" />

    <div className="mt-4 flex-1 grid md:grid-cols-[360px_1fr] gap-10 items-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-2xl rounded-full" />
        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-elegant border border-border">
          <img src={anneFoto} alt="Anne Dezan" className="w-full h-full object-cover" />
        </div>
      </div>

      <div>
        <h2 className="font-display font-bold text-5xl md:text-6xl text-primary leading-[1]">
          Anne <span className="text-gradient">Dezan</span>
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Bióloga", "Consultora", "Auditora", "Perita técnica em alimentos"].map((t) => (
            <span key={t} className="rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>

        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          <strong className="text-primary">+15 anos</strong> de experiência na gestão da qualidade
          e segurança dos alimentos. Pós-graduada em Segurança dos Alimentos, Anne une bagagem
          técnica sólida com experiência prática real.
        </p>
      </div>
    </div>
  </Slide>
);

/* ---------- 01c · CONTEXTO ---------- */
const Contexto = () => (
  <Slide
    bg="bg-primary text-primary-foreground"
    decor={
      <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute -top-40 -right-20 size-[600px] bg-glow opacity-50 blur-3xl rounded-full" />
        <MytsWatermark className="-left-16 -bottom-20 w-[420px]" />
      </>
    }
  >
    <SectionLabel n="CTX" label="Contexto" light />

    <div className="mt-4 flex-1 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
      <div>
        <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05]">
          O esquema <span className="text-gradient">FSSC 22000</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
          Descreve os <strong className="text-primary-foreground">requisitos para a auditoria e certificação</strong>{" "}
          dos SGSA's das organizações na cadeia de abastecimento de alimentos.
        </p>
      </div>

      <div className="relative">
        <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-8 shadow-elegant">
          <div className="flex items-center gap-3 text-accent-glow">
            <Award className="size-5" />
            <span className="text-xs uppercase tracking-widest font-semibold">O certificado</span>
          </div>
          <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
            Confirma que o <strong className="text-primary-foreground">Sistema de Gestão</strong> da organização
            está em <span className="text-accent-glow font-semibold">conformidade</span> com os requisitos do Esquema.
          </p>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 02 · ESQUEMA V6 (3 quadrados → FSSC) ---------- */
const EsquemaV6 = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-12 -top-12 w-[280px] [filter:invert(1)]" />}>
    <SectionLabel n="02" label="Esquema FSSC 22000 · Versão 6.0" />
    <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-primary">
      Como está estruturado o esquema <span className="text-gradient">hoje</span>
    </h2>

    <div className="mt-4 flex-1 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
      {/* Left: three building blocks */}
      <div className="grid gap-3">
        {[
          { icon: ShieldCheck, label: "SGSA", title: "ISO 22000:2018", tone: "bg-primary text-primary-foreground" },
          { icon: Layers, label: "PPR's", title: "ISO/TS 22002-X", tone: "bg-accent text-accent-foreground" },
          { icon: ListChecks, label: "Por setor · Versão 6.0", title: "Requisitos Adicionais", tone: "bg-accent-glow text-primary" },
        ].map((b) => (
          <div key={b.title} className={`rounded-2xl px-5 py-4 shadow-card ${b.tone}`}>
            <div className="flex items-center gap-3">
              <b.icon className="size-5 opacity-90" />
              <div className="text-[10px] uppercase tracking-widest font-semibold opacity-80">{b.label}</div>
            </div>
            <div className="mt-1 font-display font-bold text-xl">{b.title}</div>
          </div>
        ))}
      </div>

      {/* Middle: converging arrows */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col gap-3 items-end">
          <ArrowRight className="size-7 text-accent" />
          <ArrowRight className="size-7 text-accent" />
          <ArrowRight className="size-7 text-accent" />
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">complementam-se</div>
      </div>

      {/* Right: FSSC scheme result */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-2xl rounded-full" />
        <div className="relative rounded-3xl bg-primary text-primary-foreground p-8 shadow-elegant text-center">
          <div className="text-xs uppercase tracking-widest text-accent-glow font-semibold">Resultado</div>
          <div className="mt-3 font-display font-bold text-3xl md:text-4xl">
            Esquema <span className="text-gradient">FSSC 22000</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["SGSA", "PPR's", "Req. Adicionais"].map((t) => (
              <span key={t} className="rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-[11px] font-semibold">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 03 · CONSELHO (texto completo) ---------- */
const Conselho = () => {
  const items = [
    { i: Building2, t: "É composto por representantes dos setores de alimentação." },
    { i: CheckCircle2, t: "É responsável pela aprovação do conteúdo e funcionamento do esquema FSSC 22000." },
    { i: FileText, t: "É um documento que contém decisões aplicáveis ao esquema FSSC 22000." },
    { i: GitCompare, t: "As decisões anulam ou clarificam melhor as regras existentes do regime e têm de ser aplicadas no período definido." },
    { i: Workflow, t: "A lista de decisões é dinâmica e pode ser ajustada pelo BoS quando considerado necessário." },
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute -top-20 -right-20 size-96 bg-glow opacity-50 blur-3xl rounded-full" />
          <MytsWatermark className="-left-12 -bottom-16 w-[340px]" />
        </>
      }
    >
      <SectionLabel n="03" label="Governança do esquema" light />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl leading-tight">
        Conselho das <span className="text-gradient">Partes Interessadas</span>
      </h2>

      <div className="mt-6 flex-1 grid md:grid-cols-2 gap-3 content-center">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-5 flex items-start gap-4"
          >
            <div className="size-10 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0 shadow-cta">
              <it.i className="size-5 text-accent-foreground" />
            </div>
            <p className="text-primary-foreground/90 leading-relaxed text-[15px]">{it.t}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
};

/* ---------- 04 · BoS v7.0 ---------- */
const BoSCard = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-right-16 -top-16 w-[300px] [filter:invert(1)]" />}>
    <SectionLabel n="04" label="Board of Stakeholders" />
    <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-primary">
      <span className="text-gradient">BoS v.7.0</span> — Maio 2026
    </h2>

    <div className="mt-6 flex-1 rounded-3xl bg-gradient-card border border-border shadow-card overflow-hidden flex flex-col">
      <div className="bg-success p-4 text-success-foreground flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Award className="size-5" />
          <span className="font-display font-semibold text-lg">FSSC 22000 — Decision</span>
          <span className="rounded-full bg-success-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Number: #1
          </span>
        </div>
        <span className="rounded-full bg-success-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Nature: Mandatory
        </span>
      </div>

      <div className="grid md:grid-cols-12 flex-1 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="md:col-span-5 p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Reference</div>
          <div className="mt-2 font-display font-semibold text-lg text-primary">
            Requirements for Version 7 Upgrade Process
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            The V7 Upgrade Process sets out the requirements for CBs and ABs on the transition
            process, including how to transition organizations from FSSC 22000 V6 to V7.
          </p>
          <a
            href="https://www.fssc.com/schemes/fssc-22000/version-7/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            <LinkIcon className="size-4" /> Acessar referência oficial
          </a>
        </div>
        <div className="md:col-span-2 p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Decision date</div>
          <div className="mt-2 font-display font-bold text-xl text-primary">12 Nov 2025</div>
        </div>
        <div className="md:col-span-2 p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Effective date</div>
          <div className="mt-2 font-display font-bold text-xl text-accent">01 May 2027</div>
        </div>
        <div className="md:col-span-3 p-6 bg-accent/5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Transition period</div>
          <div className="mt-2 font-display font-bold text-3xl text-primary">
            12 <span className="text-base font-medium text-muted-foreground">meses</span>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 05 · V6 → V7 ---------- */
const V6toV7 = () => {
  const Stack = ({
    label,
    items,
    extra,
    ring,
    extraTone,
  }: {
    label: string;
    items: string[];
    extra: string;
    ring: string;
    extraTone: string;
  }) => (
    <div className="flex-1 flex flex-col">
      <div className={`inline-block self-start rounded-2xl ${ring} px-4 py-1.5 font-display font-bold text-primary-foreground shadow-elegant`}>
        {label}
      </div>
      <div className="mt-4 space-y-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl bg-primary-foreground/95 border border-primary-foreground/40 p-3 text-primary font-semibold shadow-card text-sm"
          >
            {it}
          </div>
        ))}
        <div className={`rounded-xl ${extraTone} p-3 font-semibold text-sm shadow-card`}>
          {extra}
        </div>
      </div>
    </div>
  );

  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <MytsWatermark className="-right-16 -bottom-16 w-[360px]" />
        </>
      }
    >
      <SectionLabel n="05" label="Comparativo de normas" light />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl">
        Esquema FSSC 22000 — <span className="text-gradient">V.6 → V.7</span>
      </h2>

      <div className="mt-6 flex-1 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <Stack
          label="Antes · V.6"
          ring="bg-accent"
          items={["ISO 22000:2018", "ISO/TS 22002-1"]}
          extra="Requisitos adicionais"
          extraTone="bg-accent/20 text-accent-glow border border-accent/40"
        />
        <div className="hidden md:flex flex-col items-center">
          <div className="rounded-full bg-gradient-accent p-3 shadow-glow">
            <ArrowRight className="size-7 text-accent-foreground" />
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-accent-glow font-semibold">
            Transição
          </div>
        </div>
        <Stack
          label="Agora · V.7"
          ring="bg-accent-glow"
          items={["ISO 22000:2018", "ISO 22002-100:2025", "ISO 22002-1:2025 (Categoria)"]}
          extra="Requisitos adicionais V7"
          extraTone="bg-accent-glow/20 text-accent-glow border border-accent-glow/50"
        />
      </div>
    </Slide>
  );
};

/* ---------- 06 · TRANSIÇÃO timeline (compact 16:9) ---------- */
const Transicao = () => {
  const steps = [
    { date: "Maio 2026", title: "PUBLICAÇÃO", desc: "Versão 7.0 do esquema é publicada oficialmente.", color: "bg-accent", iconText: "text-primary-foreground" },
    { date: "até 30/abr/2027", title: "Auditorias V6", desc: "Auditorias FSSC 22000 V6 só poderão ser realizadas até esta data.", color: "bg-primary", iconText: "text-primary-foreground" },
    { date: "Maio 2027", title: "Início Auditorias V7", desc: "Começa o ciclo de auditorias contra o Esquema V7.", color: "bg-accent-glow", iconText: "text-primary" },
    { date: "01/mai/2027 → 30/abr/2028", title: "Auditorias de upgrade", desc: "Auditorias de upgrade contra o Esquema V7 conduzidas neste período.", color: "bg-success", iconText: "text-primary-foreground" },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-left-16 -bottom-16 w-[320px] [filter:invert(1)]" />}>
      <SectionLabel n="06" label="Calendário de transição" />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-primary">
        Linha do tempo da <span className="text-gradient">Transição</span>
      </h2>

      <div className="mt-8 flex-1 flex items-center">
        <div className="relative w-full">
          <div className="absolute left-0 right-0 top-[26px] h-px bg-gradient-to-r from-accent via-accent-glow to-success" />
          <div className="grid grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className={`size-[52px] rounded-full ${s.color} border-4 border-background shadow-glow flex items-center justify-center ${s.iconText} font-bold`}>
                  <CalendarDays className="size-5" />
                </div>
                <div className="mt-4 rounded-2xl bg-gradient-card border border-border p-4 shadow-card">
                  <div className="text-[10px] uppercase tracking-widest text-accent font-bold">{s.date}</div>
                  <div className="mt-1 font-display font-bold text-base text-primary">{s.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

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
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={<MytsWatermark className="-right-16 -top-16 w-[320px]" />}
    >
      <SectionLabel n="07" label="Estrutura do documento" light />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl">
        Requisitos adicionais <span className="text-gradient">FSSC 22000</span>
      </h2>

      <div className="mt-6 flex-1 flex flex-col gap-3 justify-center">
        <div className="grid md:grid-cols-5 gap-3">
          {parts.map((p, i) => (
            <div key={p.n} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-4 hover:border-accent-glow/60 transition-all">
              <div className="font-mono text-[10px] text-accent-glow font-bold">{p.n}</div>
              <div className="mt-2 font-display font-semibold text-sm leading-snug">{p.t}</div>
              <div className="mt-3 size-7 rounded-full bg-gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {apx.map((p) => (
            <div key={p.n} className="rounded-2xl border border-dashed border-primary-foreground/20 p-3 flex items-center gap-3">
              <FileText className="size-5 text-accent-glow" />
              <div>
                <div className="font-mono text-[10px] text-accent-glow font-bold">{p.n}</div>
                <div className="font-display font-semibold text-sm">{p.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 08 · VISÃO GERAL ---------- */
const VisaoGeral = () => {
  const semAlt = [
    "Na estrutura do esquema (5 partes, 2 apêndices e 5 anexos)",
    "No âmbito/cobertura/escopo do esquema",
  ];
  const alt = [
    "Inclusão da série ISO 22002-X como documentos substituindo a série ISO/TS 22002-X e PAS 221 (varejo)",
    "Adição da tabela 1.1 — Classificação de Sub(sub)categorias (competência auditores para diferentes produtos/escopos)",
    "Alterações editoriais, esclarecimentos e emenda (melhoria contínua)",
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-left-16 -top-16 w-[260px] [filter:invert(1)]" />}>
      <SectionLabel n="08" label="Visão geral das mudanças" />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-primary">
        O que <span className="text-gradient">muda</span> — e o que segue igual
      </h2>

      <div className="mt-6 flex-1 grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl bg-gradient-card border-2 border-success/30 p-6 shadow-card flex flex-col">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-success text-success-foreground flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
            <div className="font-display font-bold text-xl text-primary">Sem alterações</div>
          </div>
          <div className="mt-4 space-y-2 flex-1">
            {semAlt.map((x) => (
              <div key={x} className="rounded-xl bg-success/5 border border-success/20 px-3 py-2 text-sm font-medium text-primary leading-snug flex gap-2">
                <CheckCircle2 className="size-4 text-success shrink-0 mt-0.5" /> {x}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-card border-2 border-accent/30 p-6 shadow-card flex flex-col">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center">
              <AlertCircle className="size-5" />
            </div>
            <div className="font-display font-bold text-xl text-primary">Alterações</div>
          </div>
          <div className="mt-4 space-y-2 flex-1">
            {alt.map((x) => (
              <div key={x} className="rounded-xl bg-accent/5 border border-accent/20 px-3 py-2 text-sm font-medium text-primary leading-snug flex gap-2">
                <Sparkles className="size-4 text-accent shrink-0 mt-0.5" /> {x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 09 · TABELA 1.1 ---------- */
const Tabela11 = () => {
  const rows = [
    { cat: "C0", sub: "C0-1", desc: "Bovinos, ovinos e caprinos, suínos, aves & caça" },
    { cat: "C0", sub: "C0-2", desc: "Peixes, moluscos e crustáceos" },
    { cat: "CI", sub: "CI-1", desc: "Carne vermelha e branca" },
    { cat: "CI", sub: "CI-2", desc: "Peixes, moluscos e crustáceos" },
    { cat: "CI", sub: "CI-3", desc: "Laticínios" },
    { cat: "CI", sub: "CI-4", desc: "Ovos e derivados" },
    { cat: "CIV", sub: "CIV-1", desc: "Produtos processados térmicos/sob pressão (UHT, conservas, autoclave, HPP)" },
    { cat: "CIV", sub: "CIV-2", desc: "Alimentos secos e ingredientes (açúcar, sal, especiarias, farinha, etc.)" },
    { cat: "CIV", sub: "CIV-3", desc: "Alimentos e ingredientes conservados/autopreservados (excl. CIV-1)" },
    { cat: "CIV", sub: "CIV-4", desc: "Produtos extrusados, panificação e confeitaria" },
    { cat: "CIV", sub: "CIV-5", desc: "Gorduras e óleos vegetais ou animais" },
    { cat: "CIV", sub: "CIV-6", desc: "Bebidas (incluindo alcoólicas)" },
    { cat: "I", sub: "I-1", desc: "Plásticos (rígidos e flexíveis)" },
    { cat: "I", sub: "I-2", desc: "Papel e cartão" },
    { cat: "I", sub: "I-3", desc: "Metal" },
    { cat: "I", sub: "I-4", desc: "Vidro" },
    { cat: "I", sub: "I-5", desc: "Outros: madeira, cortiça, corda, fita, tinta, etc." },
    { cat: "K", sub: "K-1", desc: "Auxiliares, aditivos, corantes, aromas, gases, vitaminas, suplementos" },
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
    <Slide bg="bg-primary text-primary-foreground" decor={<MytsWatermark className="-right-12 -bottom-12 w-[300px]" />}>
      <SectionLabel n="09" label="Tabela 1.1" light />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl">
        (Sub)Categorias — <span className="text-gradient">Descrição</span>
      </h2>
      <p className="mt-1 text-xs text-primary-foreground/60">
        <strong>Obs.:</strong> Não existem sub(sub)categorias para BIII, CII, CIII, D, E, FI, FII e G.
      </p>

      {(() => {
        const catTitles: Record<string, string> = {
          C0: "Processamento Animal Primário",
          CI: "Produtos Perecíveis Animais",
          CIV: "Produtos Ambientes / Processados",
          I: "Embalagens",
          K: "Bioquímicos",
        };
        const order = ["C0", "CI", "CIV", "I", "K"];
        const grouped = order.map((c) => ({ cat: c, items: rows.filter((r) => r.cat === c) }));
        return (
          <div className="mt-4 flex-1 grid grid-cols-5 gap-2.5 min-h-0">
            {grouped.map((g) => (
              <div
                key={g.cat}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur flex flex-col overflow-hidden"
              >
                <div className={`${catColor[g.cat]} px-3 py-2 flex items-center justify-between`}>
                  <span className="font-mono text-[11px] font-bold text-white">{g.cat}</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/85 font-semibold truncate ml-2">
                    {catTitles[g.cat]}
                  </span>
                </div>
                <div className="flex-1 p-2 flex flex-col gap-1.5">
                  {g.items.map((r) => (
                    <div key={r.sub} className="rounded-lg bg-primary-foreground/[0.04] px-2 py-1.5 border border-primary-foreground/5">
                      <div className="font-mono text-[10px] text-accent-glow font-bold">{r.sub}</div>
                      <div className="text-[10.5px] text-primary-foreground/85 leading-snug">{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })()}
    </Slide>
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
    { n: "2.5.11", t: "Controle de perigos e prevenção de contaminação cruzada" },
    { n: "2.5.12", t: "Verificação do PPR (E, FI)" },
    { n: "2.5.13", t: "Design e desenvolvimento de produto" },
    { n: "2.5.14", t: "Rastreabilidade" },
    { n: "2.5.15", t: "Gestão de equipamentos" },
    { n: "2.5.16", t: "Perda e desperdício de alimentos" },
    { n: "2.5.17", t: "Requisitos de comunicação" },
    { n: "2.5.18", t: "Multisite (BIII)" },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-left-16 -bottom-16 w-[320px] [filter:invert(1)]" />}>
      <SectionLabel n="10" label="Requisitos adicionais V7" />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-primary">
        Os <span className="text-gradient">18 requisitos</span> da seção 2.5
      </h2>

      <div className="mt-4 flex-1 grid grid-cols-3 md:grid-cols-6 gap-2 content-center">
        {items.map((it) => (
          <div key={it.n} className="rounded-xl p-3 border border-border bg-gradient-card hover:-translate-y-0.5 transition">
            <div className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-secondary text-primary inline-block">{it.n}</div>
            <div className="mt-1.5 font-display font-semibold text-[12px] leading-tight text-primary">{it.t}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
};

/* ---------- 11 · Rotulagem / Impressão (texto correto) ---------- */
const RotulagemImpressao = () => {
  const subs = [
    "Aprovação do padrão de arte ou amostra mestre",
    "Processo para gerenciar alterações nas especificações de arte e impressão e para gerenciar obras de arte e materiais de impressão obsoletos",
    "Aprovação de cada tiragem em relação à norma acordada ou à amostra principal",
    "Processo para detectar e identificar erros de impressão durante a execução",
    "Processo para garantir a segregação efetiva de diferentes variantes de impressão",
    "Processo para contabilizar qualquer produto impresso não utilizado",
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute -top-16 -right-16 size-80 bg-glow opacity-40 blur-3xl rounded-full" />
          <MytsWatermark className="-left-16 -bottom-16 w-[300px]" />
        </>
      }
    >
      <SectionLabel n="11" label="Requisitos adicionais V7 · 2.5.2 d)" light />
      <h2 className="mt-3 font-display font-bold text-2xl md:text-4xl">
        Gestão das ilustrações e <span className="text-gradient">controle de impressão</span>
      </h2>
      <p className="mt-2 text-sm text-primary-foreground/75 max-w-4xl">
        <strong className="text-primary-foreground">Aplicabilidade:</strong> todas as organizações que imprimem etiquetas e/ou
        materiais (não apenas Categoria I). Procedimentos de Gestão e Controle de Impressão de Obras de
        Arte devem ser estabelecidos e implementados para garantir o cumprimento dos requisitos legais
        e do cliente, abrangendo no mínimo:
      </p>

      <div className="mt-4 flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 content-center">
        {subs.map((s, i) => (
          <div key={i} className="rounded-2xl border border-primary-foreground/15 bg-primary/40 p-4">
            <div className="flex items-center gap-2">
              <Printer className="size-4 text-accent-glow" />
              <span className="font-mono text-accent-glow font-bold text-sm">{["i","ii","iii","iv","v","vi"][i]}.</span>
            </div>
            <div className="mt-2 text-xs text-primary-foreground/85 leading-snug">{s}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
};

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
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-12 -top-12 w-[280px] [filter:invert(1)]" />}>
      <SectionLabel n="12" label="Requisito 2.5.8" />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-primary">
        Cultura de <span className="text-gradient">qualidade e segurança</span> de alimentos
      </h2>

      <div className="mt-4 flex-1 grid lg:grid-cols-[1fr_360px] gap-6 items-stretch">
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-gradient-card border border-border p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-accent text-lg">a)</span>
              <span className="font-display font-semibold text-primary">Requisito da alta direção</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-snug">
              Estabelecer, implementar, manter e melhorar continuamente uma cultura positiva de
              segurança de alimentos e qualidade, alinhada aos objetivos do SGSA.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-card border border-border p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-accent text-lg">c)</span>
              <span className="font-display font-semibold text-primary">Avaliação e melhoria</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-snug">
              A organização deve avaliar a eficácia da cultura e implementar planos de melhoria
              quando necessário, com evidências documentadas.
            </p>
          </div>
          <div className="rounded-2xl bg-accent text-accent-foreground p-4">
            <div className="text-[10px] uppercase tracking-widest font-semibold opacity-80">Requisitos específicos</div>
            <div className="font-display font-bold text-xl mt-0.5">GFSI</div>
          </div>
        </div>

        <div className="rounded-3xl bg-primary text-primary-foreground p-5 shadow-elegant flex flex-col">
          <div className="text-center font-display font-bold text-lg text-gradient">Quality Culture</div>
          <div className="mt-3 flex-1 grid grid-cols-2 gap-2">
            {dims.map((d) => (
              <div key={d.l} className="relative rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-2.5 hover:border-accent-glow transition">
                <d.icon className="size-4 text-accent-glow mb-1" />
                <div className="text-xs font-semibold leading-tight">{d.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 13 · Design e desenvolvimento (texto correto) ---------- */
const DesignProduto = () => {
  const principles = [
    { i: ShieldCheck, t: "Contenção eficaz e proteção do produto contra deterioração e danos ao longo de todas as etapas da cadeia de abastecimento." },
    { i: Package, t: "Preservação e prolongamento da vida útil do produto que será embalado." },
    { i: Recycle, t: "Minimização de perda e desperdício de alimentos." },
    { i: MessageSquare, t: "Comunicação clara aos consumidores sobre como manusear, armazenar e preparar alimentos." },
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={<MytsWatermark className="-right-16 -top-16 w-[300px]" />}
    >
      <SectionLabel n="13" label="Requisito 2.5.13 g)" light />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl">
        Design e <span className="text-gradient">desenvolvimento de produto</span>
      </h2>
      <p className="mt-2 text-sm text-primary-foreground/80 max-w-5xl leading-relaxed">
        Organizações que concebem embalagens primárias/materiais de embalagem devem levar em
        consideração os seguintes princípios ao desenvolver novos produtos ou efetuar alterações:
      </p>

      <div className="mt-4 flex-1 grid grid-cols-2 gap-3 content-center">
        {principles.map((p, i) => (
          <div key={i} className="rounded-2xl border border-primary-foreground/15 bg-primary/40 p-4 flex gap-3">
            <div className="size-10 shrink-0 rounded-xl bg-gradient-accent flex items-center justify-center shadow-cta">
              <p.i className="size-5 text-accent-foreground" />
            </div>
            <div>
              <div className="font-mono text-accent-glow text-xs font-bold">{["i","ii","iii","iv"][i]}.</div>
              <div className="text-sm text-primary-foreground/90 leading-snug">{p.t}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-accent/20 border border-accent-glow/40 px-4 py-2.5 text-xs text-accent-glow">
        Quando algum dos princípios for incorporado, <strong>não deverá ter impacto negativo na segurança dos alimentos</strong>.
      </div>
    </Slide>
  );
};

/* ---------- 14 · Impacto da mudança (texto correto) ---------- */
const ImpactoMudanca = () => {
  const items = [
    {
      icon: GitCompare,
      title: "Substituição da série",
      desc: "As normas ISO 22002-X publicadas em Julho/2025 substituem a série anterior ISO/TS 22002-X para que as organizações certificadas FSSC 22000 sejam incluídas como parte da V7.",
    },
    {
      icon: Layers,
      title: "Padrão PPR comum",
      desc: "Um padrão PPR comum, com partes adicionais específicas de setor.",
    },
    {
      icon: ListChecks,
      title: "Estruturas padronizadas",
      desc: "Estruturas de PPR mais padronizadas e expectativas de auditoria mais claras.",
    },
    {
      icon: AlertCircle,
      title: "Mais requisitos por setor",
      desc: "Para alguns setores, pode resultar em aumento de requisitos.",
    },
  ];
  return (
    <Slide bg="bg-background" decor={<MytsWatermark className="-right-16 -top-16 w-[300px] [filter:invert(1)]" />}>
      <SectionLabel n="14" label="Resumo executivo" />
      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-primary">
        Impacto da <span className="text-gradient">mudança</span>
      </h2>

      <div className="mt-6 flex-1 grid grid-cols-2 gap-4 content-center">
        {items.map((c) => (
          <div key={c.title} className="rounded-2xl bg-gradient-card border border-border p-5 shadow-card hover:shadow-elegant transition">
            <div className="size-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-cta">
              <c.icon className="size-5 text-accent-foreground" />
            </div>
            <div className="mt-3 font-display font-bold text-lg text-primary">{c.title}</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-snug">{c.desc}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
};

/* ---------- 15 · Tabela Alterações — split em 2 slides 16:9 ---------- */
const TabelaAlteracoes = () => {
  const rows = [
    { n: 4, old: "Construção e layout das edificações", v1: "Construção e layout dos edifícios", n1: 4, v100: "Construção e layout de edifícios", n100: 4 },
    { n: 5, old: "Layout das instalações e área de trabalho", v1: "Projeto e leiaute das instalações e áreas de trabalho", n1: 5, v100: "Projeto e leiaute das instalações e áreas de trabalho", n100: 5 },
    { n: 6, old: "Utilidades — ar, água e energia", v1: "Utilidades", n1: 6, v100: "Utilidades", n100: 6 },
    { n: 7, old: "Descarte de resíduos", v1: "Gestão de resíduos, FLW e reciclagem", n1: 8, v100: "Gestão de resíduos, FLW e reciclagem", n100: 8 },
    { n: 8, old: "Adequação, limpeza e manutenção de equipamentos", v1: "Adequação e manutenção de equipamentos", n1: 9, v100: "Adequação e manutenção de equipamentos", n100: 9 },
    { n: 9, old: "Gestão de materiais adquiridos", v1: "Gestão de materiais adquiridos", n1: 10, v100: "Gestão de materiais adquiridos", n100: 10 },
    { n: 10, old: "Medidas para prevenção de contaminação cruzada", v1: "Medidas para prevenção de contaminação", n1: 12, v100: "Medidas para prevenção de contaminação", n100: 12 },
    { n: 11, old: "Limpeza e Sanitização", v1: "Limpeza e Desinfecção", n1: 13, v100: "Limpeza e Desinfecção", n100: 13 },
    { n: 12, old: "Controle de Pragas", v1: "Controle de Pragas", n1: 7, v100: "Controle de Pragas", n100: 7 },
    { n: 13, old: "Higiene pessoal e instalação para funcionários", v1: "Higiene pessoal e instalações para trabalhadores", n1: 14, v100: "Higiene pessoal e instalações de trabalhadores", n100: 14 },
    { n: 14, old: "Retrabalho", v1: "Uso de material para reprocesso", n1: 17, v100: "—", n100: "—" },
    { n: 15, old: "Recolhimento", v1: "— (rec. ISO 22000 8.9.5)", n1: "—", v100: "— (rec. ISO 22000 8.9.5)", n100: "—" },
    { n: 16, old: "Armazenamento", v1: "Armazenamento, incl. estocagem em armazém e transporte", n1: 11, v100: "Armazenamento, incl. estocagem em armazém e transporte", n100: 11 },
    { n: 17, old: "Informação do produto e alerta ao consumidor", v1: "Informação sobre produtos ao consumidor", n1: 15, v100: "Informação sobre produtos ao consumidor", n100: 15 },
    { n: 18, old: "Defesa do alimento, biovigilância e bioterrorismo", v1: "Defesa e fraude de alimentos", n1: 16, v100: "Defesa e fraude de alimentos", n100: 16 },
  ];

  const Tabela = ({ subset, idx }: { subset: typeof rows; idx: string }) => (
    <Slide bg="bg-primary text-primary-foreground" decor={<MytsWatermark className="-right-16 -bottom-16 w-[280px]" />}>
      <SectionLabel n={idx} label={`Comparativo detalhado · parte ${idx === "15a" ? "1/2" : "2/2"}`} light />
      <h2 className="mt-2 font-display font-bold text-2xl md:text-4xl">
        <span className="text-gradient">Alterações</span> entre normas PPR
      </h2>

      <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur flex flex-col min-h-0">
        <div className="grid grid-cols-[40px_1fr_1fr_40px_1fr_40px] bg-primary-foreground/10 text-[10px] uppercase tracking-widest font-semibold shrink-0">
          <div className="p-2 px-3">#</div>
          <div className="p-2 px-3 text-accent-glow">ISO/TS 22002-1:2009</div>
          <div className="p-2 px-3 text-success">ISO 22002-1:2025</div>
          <div className="p-2 px-3 text-center text-success">#</div>
          <div className="p-2 px-3 text-orange-300">ISO 22002-100:2025</div>
          <div className="p-2 px-3 text-center text-orange-300">#</div>
        </div>
        <div className="overflow-y-auto">
          {subset.map((r, i) => (
            <div key={r.n} className={`grid grid-cols-[40px_1fr_1fr_40px_1fr_40px] items-center text-xs border-t border-primary-foreground/10 ${i % 2 ? "bg-primary-foreground/[0.02]" : ""}`}>
              <div className="p-2 px-3 font-mono font-bold text-accent-glow">{r.n}</div>
              <div className="p-2 px-3 text-primary-foreground/75 leading-snug">{r.old}</div>
              <div className="p-2 px-3 text-primary-foreground leading-snug">{r.v1}</div>
              <div className="p-2 px-3 text-center font-mono font-semibold text-success">{r.n1}</div>
              <div className="p-2 px-3 text-primary-foreground leading-snug">{r.v100}</div>
              <div className="p-2 px-3 text-center font-mono font-semibold text-orange-300">{r.n100}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );

  return (
    <>
      <Tabela subset={rows.slice(0, 8)} idx="15a" />
      <Tabela subset={rows.slice(8)} idx="15b" />
    </>
  );
};

/* ---------- 17 · MyTS — Gestão de fornecedores ---------- */
const MyTSFornecedores = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-left-16 -bottom-16 w-[320px] [filter:invert(1)]" />}>
    <SectionLabel n="17" label="MyTS · Como contribuímos" />
    <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-primary">
      Gestão de <span className="text-gradient">fornecedores</span> na FSSC 22000 V7
    </h2>

    <div className="mt-4 flex-1 grid md:grid-cols-[1fr_1.2fr] gap-6 items-stretch">
      <p className="text-base text-muted-foreground leading-relaxed self-center">
        A gestão de fornecedores continua sendo um elemento fundamental para garantir a
        segurança de alimentos e a conformidade. A nova versão da norma reforça o monitoramento
        contínuo e evidências que comprovem a qualificação e o desempenho dos fornecedores.
      </p>

      <div className="rounded-2xl bg-primary text-primary-foreground p-5 shadow-elegant relative overflow-hidden">
        <div className="absolute -right-12 -top-12 size-48 bg-glow opacity-50 blur-3xl rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 text-accent-glow">
            <img src={mytsLogo} alt="MyTS" className="h-5" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Como a MyTS contribui</span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {[
              { i: Building2, t: "Homologação digital de fornecedores" },
              { i: FileText, t: "Controle automatizado de documentos e certificações" },
              { i: AlertCircle, t: "Monitoramento de vencimentos e cobrança automática" },
              { i: ClipboardCheck, t: "Avaliação periódica de desempenho" },
              { i: Truck, t: "Histórico de evidências para auditorias" },
            ].map((s) => (
              <div key={s.t} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-3 flex items-center gap-3">
                <div className="size-8 shrink-0 rounded-lg bg-gradient-accent flex items-center justify-center">
                  <s.i className="size-4 text-accent-foreground" />
                </div>
                <div className="font-display font-semibold text-sm">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 18 · CTA Final ---------- */
const Final = () => (
  <Slide
    bg="bg-primary text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute -right-32 -bottom-32 size-[600px] bg-glow opacity-50 blur-3xl rounded-full" />
        <MytsWatermark className="-left-16 -top-16 w-[400px]" />
      </>
    }
  >
    <div className="flex-1 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <SectionLabel n="18" label="Conclusão" light />
        <p className="mt-4 text-base md:text-lg text-primary-foreground/80 leading-relaxed">
          A FSSC 22000 V7 reforça a importância do controle e monitoramento dos fornecedores
          para garantir a segurança de alimentos e a conformidade da cadeia produtiva.
        </p>
        <h2 className="mt-6 font-display font-bold text-4xl md:text-5xl leading-[1.05]">
          Visibilidade total,<br />
          controle completo e<br />
          <span className="text-gradient">conformidade garantida</span>
        </h2>

        <a href="#" className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-accent px-6 py-3 font-semibold text-accent-foreground shadow-cta hover:shadow-glow transition-all">
          Falar com a MyTS
          <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="relative">
        <div className="absolute -inset-8 bg-gradient-accent opacity-30 blur-3xl rounded-full" />
        <div className="relative aspect-square max-w-[380px] mx-auto rounded-[2.5rem] border-2 border-primary-foreground/20 bg-primary/50 backdrop-blur p-10 flex flex-col items-center justify-center text-center">
          <img src={mytsLogo} alt="MyTS" className="h-10 mb-4 opacity-90" />
          <div className="h-px w-16 bg-accent-glow/40 my-2" />
          <ShieldCheck className="size-12 text-accent-glow mt-2" />
          <div className="mt-3 font-display font-bold text-2xl">FSSC 22000</div>
          <div className="text-base text-accent-glow font-semibold">Versão 7.0</div>
          <div className="mt-3 text-[10px] uppercase tracking-widest text-primary-foreground/55">
            Maio 2026 · Vigência Maio 2027
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 19 · Bridge MyTS + André Tanzi ---------- */
const BridgeAndre = () => (
  <Slide
    bg="bg-primary text-primary-foreground"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute -left-32 top-1/3 size-[520px] bg-glow opacity-40 blur-3xl rounded-full" />
        <MytsWatermark className="-right-16 -bottom-16 w-[360px]" />
      </>
    }
  >
    <SectionLabel n="19" label="Da norma à rotina" light />
    <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl leading-[1.05] max-w-4xl">
      A norma evolui.<br />
      A forma de <span className="text-gradient">sustentá-la</span>, também.
    </h2>

    <div className="mt-6 flex-1 grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
      <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
        A V7 reforça que segurança de alimentos se prova com{" "}
        <span className="text-accent-glow font-semibold">evidência contínua</span> — e isso pede
        menos planilha e mais processo. É nesse ponto que a MyTS existe: para que controle de
        fornecedores deixe de ser esforço manual e vire{" "}
        <span className="text-accent-glow font-semibold">rotina confiável</span>.
      </p>

      <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 size-40 bg-glow opacity-40 blur-3xl rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <img src={mytsLogo} alt="MyTS" className="h-5 opacity-90" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-accent-glow">
              Próximo passo
            </span>
          </div>
          <p className="mt-4 font-display font-semibold text-lg leading-snug">
            Quer entender como isso se aplica à sua operação?
          </p>
          <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">
            Agende uma conversa com{" "}
            <span className="font-semibold text-primary-foreground">André Tanzi</span>,
            Diretor Comercial da MyTS.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a
              href="mailto:andre.tanzi@myt-s.com"
              className="flex items-center gap-3 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2 hover:bg-primary-foreground/10 transition-colors"
            >
              <MessageSquare className="size-4 text-accent-glow" />
              <span className="font-mono">andre.tanzi@myt-s.com</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2 hover:bg-primary-foreground/10 transition-colors"
            >
              <LinkIcon className="size-4 text-accent-glow" />
              <span>LinkedIn · André Tanzi</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 20 · Finalização da Anne ---------- */
const FinalAnne = () => (
  <Slide
    bg="bg-background"
    decor={
      <>
        <div className="absolute -top-32 -right-32 size-[600px] bg-glow opacity-25 blur-3xl rounded-full" />
        <MytsWatermark className="-left-16 -bottom-16 w-[320px] [filter:invert(1)]" />
      </>
    }
  >
    <SectionLabel n="20" label="Para levar daqui" />
    <div className="mt-4 flex-1 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
      <div>
        <h2 className="font-display font-bold text-4xl md:text-5xl leading-[1.05] text-primary">
          A V7 não muda o destino.<br />
          <span className="text-gradient">Refina o caminho.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
          A estrutura, o escopo e o propósito do esquema seguem firmes. O que a Versão 7
          traz é mais <span className="text-primary font-semibold">clareza</span>, mais{" "}
          <span className="text-primary font-semibold">padronização</span> e expectativas
          de auditoria melhor definidas. Quem começa a se preparar agora chega na transição
          com tranquilidade — e não com pressa.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <img
            src={anneFoto}
            alt="Anne Dezan"
            className="size-16 rounded-full object-cover border-2 border-accent/40"
          />
          <div>
            <div className="font-display font-semibold text-primary text-lg">Anne Dezan</div>
            <div className="text-sm text-muted-foreground">
              Bióloga · Consultora · Auditora
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 bg-gradient-accent opacity-20 blur-3xl rounded-full" />
        <div className="relative rounded-[2rem] border border-border bg-card p-8 shadow-elegant">
          <Sparkles className="size-8 text-accent" />
          <p className="mt-4 font-display text-xl leading-snug text-primary">
            "Quem se prepara agora chega na transição com{" "}
            <span className="text-gradient">tranquilidade</span> — e não com pressa."
          </p>
          <div className="mt-6 h-px w-12 bg-accent/50" />
          <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
            Mensagem final · Anne Dezan
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 21 · Encerramento oficial ---------- */
const Encerramento = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute -top-32 left-1/3 size-[700px] bg-glow opacity-60 blur-3xl rounded-full" />
        <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
      </>
    }
  >
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <Chip>
        <Sparkles className="size-3.5 text-accent-glow" />
        Obrigado por participar
      </Chip>

      <h2 className="mt-6 font-display font-bold text-6xl md:text-8xl leading-[0.95] tracking-tight text-primary-foreground">
        Pronto para a <span className="text-gradient">V7.</span>
      </h2>

      <p className="mt-6 text-xl md:text-2xl text-primary-foreground/75 max-w-2xl">
        Foi um prazer percorrer essa transição com você.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-4 w-full max-w-4xl">
        {[
          {
            i: MessageSquare,
            t: "Dúvidas técnicas sobre a transição",
            cta: "Falar com a Anne",
          },
          {
            i: Building2,
            t: "Conhecer a MyTS de perto",
            cta: "Falar com a MyTS",
          },
          {
            i: FileText,
            t: "Receber o material desta apresentação",
            cta: "Inscrever-se",
          },
        ].map((s) => (
          <a
            key={s.t}
            href="#"
            className="group rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-5 text-left hover:bg-primary-foreground/10 transition-colors"
          >
            <div className="size-10 rounded-lg bg-gradient-accent flex items-center justify-center">
              <s.i className="size-5 text-accent-foreground" />
            </div>
            <div className="mt-4 text-sm text-primary-foreground/75 leading-snug">{s.t}</div>
            <div className="mt-3 flex items-center gap-2 text-accent-glow font-semibold text-sm">
              {s.cta}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-4 text-primary-foreground/55 text-xs uppercase tracking-widest">
        <img src={mytsLogo} alt="MyTS" className="h-4 opacity-70" />
        <span>·</span>
        <span>Anne Dezan</span>
      </div>
    </div>
  </Slide>
);

/* ---------- 01d · Quem é a MyTS ---------- */
const QuemSomos = () => (
  <Slide
    bg="bg-background"
    decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
  >
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      <span className="font-mono">01d</span>
      <span className="h-px w-10 bg-accent/50" />
      MyTS · Quem somos
    </div>

    <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl text-primary leading-[1.1] max-w-4xl">
      A inteligência por trás de uma{" "}
      <span className="text-gradient">cadeia de fornecedores</span> confiável.
    </h2>

    <div className="mt-6 flex-1 flex flex-col">
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            i: Network,
            title: "Construída com quem vive a norma",
            body: "Desenvolvida lado a lado com indústrias e consultores de segurança de alimentos.",
          },
          {
            i: ClipboardCheck,
            title: "Pensada para auditoria",
            body: "Cada controle existe para virar evidência defensável — não só registro.",
          },
          {
            i: Globe,
            title: "O fornecedor acessa, envia e acompanha",
            body: "Sua equipe valida — não opera. Da homologação ao histórico, em um só lugar.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col"
          >
            <div className="size-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-cta">
              <c.i className="size-5 text-accent-foreground" />
            </div>
            <h3 className="mt-4 font-display font-semibold text-lg text-primary leading-snug">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
              {c.body}
            </p>
            <div className="mt-4 flex items-center gap-1 text-accent text-sm font-semibold">
              <ArrowRight className="size-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">
          Quem já confia na MyTS para sustentar sua cadeia
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {[
            { src: logoCarrefour.url, alt: "Grupo Carrefour Brasil" },
            { src: logoCvale.url, alt: "C.Vale" },
            { src: logoKorin.url, alt: "Korin" },
            { src: logoAval.url, alt: "AVAL" },
            { src: logoMartins.url, alt: "Redes Martins" },
            { src: logoAtakarejo.url, alt: "Atakarejo" },
            { src: logoCasaPao.url, alt: "Casa do Pão de Queijo" },
          ].map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 01e · A plataforma + FSSC 22000 V7 ---------- */
const PlataformaV7 = () => {
  const blocks = [
    {
      icon: Truck,
      title: "Gestão de Fornecedores",
      items: [
        "Homologação e qualificação digital, com aprovação registrada",
        "Avaliação periódica de desempenho com critérios padronizados",
        "O fornecedor acessa a própria conta e resolve as pendências — sem sua equipe cobrar",
      ],
      check: "Atende: monitoramento cont [0.020,0.068]n contínuo e qualificação que a V7 reforça",
    },
    {
      icon: FileText,
      title: "Gestão de Documentos",
      items: [
        "Controle automatizado de certificações e documentos",
        "Alertas de vencimento e cobrança automática antes do prazo",
        "Histórico completo e acessível na hora que o auditor pedir",
      ],
      check: "Atende: documentação sempre válida, disponível e defensável",
    },
    {
      icon: Workflow,
      title: "Gestão de Processos",
      items: [
        "Fluxos padronizados com histórico auditável de ponta a ponta",
        "Checklists, autoavaliações e registros centralizados",
        "Evidência pronta para apresentar — sem correria na véspera",
      ],
      check: "Atende: evidência contínua exigida na auditoria de upgrade",
    },
  ];

  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -top-40 -right-20 size-[600px] bg-glow opacity-50 blur-3xl rounded-full" />
          <MytsWatermark className="-left-16 -bottom-20 w-[420px]" />
        </>
      }
    >
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-glow">
        <span className="font-mono">01e</span>
        <span className="h-px w-10 bg-accent-glow/60" />
        MyTS · A plataforma
      </div>

      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl leading-[1.05]">
        Três frentes, um só controle.{" "}
        <span className="text-gradient">Tudo pronto para a V7.</span>
      </h2>

      <p className="mt-3 text-lg text-primary-foreground/80 leading-relaxed max-w-3xl">
        Fornecedor, processo e documento — onde a V7 mais cobra evidência.
      </p>

      <div className="mt-5 flex-1 grid md:grid-cols-3 gap-5 content-start">
        {blocks.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-6 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-cta">
                <b.icon className="size-5 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-primary-foreground">
                {b.title}
              </h3>
            </div>
            <ul className="mt-4 space-y-2 flex-1">
              {b.items.map((it, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-primary-foreground/85 leading-relaxed">
                  <CheckCircle2 className="size-4 text-accent-glow shrink-0 mt-0.5" />
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-primary-foreground/10 flex items-start gap-2">
              <CheckCircle2 className="size-4 text-accent-glow shrink-0 mt-0.5" />
              <span className="text-xs text-accent-glow font-semibold uppercase tracking-wide">
                {b.check}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-primary-foreground/60">
        Cada exigência da norma encontra, na MyTS, um processo que a sustenta.
      </p>
    </Slide>
  );
};

/* ---------- Page ---------- */
const FsscV7 = () => (
  <main className="bg-background" style={{ margin: 0, padding: 0, overflow: "hidden" }}>
    <style>{`html,body,#root{margin:0;padding:0;overflow-x:hidden}`}</style>
    <Helmet>
      <title>Pronto para a V7? — Anne Dezan & MyTS</title>
      <meta
        name="description"
        content="Webinar Pronto para a V7?: tudo o que muda na transição da Versão 6 para a Versão 7 do esquema FSSC 22000."
      />
    </Helmet>
    <Hero />
    <AnneSection />
    <Contexto />
    <QuemSomos />
    <PlataformaV7 />
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
    <BridgeAndre />
    <FinalAnne />
    <Encerramento />
  </main>
);

export default FsscV7;
