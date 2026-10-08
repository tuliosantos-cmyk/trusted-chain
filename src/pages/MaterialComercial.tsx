import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle, ArrowRight, BarChart3, BellRing, Check, CheckCircle2, ClipboardCheck, Download,
  Eye, Factory, FileStack, FileText, Gauge, Globe2, Handshake, ListChecks, Mail, MapPin,
  MessageCircle, Network, Search, ShieldCheck, Users, Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import carrefourLogo from "@/assets/clientes/Carrefour_logo.png";
import korinLogo from "@/assets/clientes/Korin_logo.png";
import cvaleLogo from "@/assets/clientes/C._Vale_logo.png";
import cfsLogo from "@/assets/clientes/CFS_logo.png";
import carbexLogo from "@/assets/clientes/Carbex_logo.png";
import viskaseLogo from "@/assets/clientes/Viskase_logo.png";
import augustaLogo from "@/assets/clientes/Augusta_Alimentos_logo.png";
import takasagoLogo from "@/assets/clientes/Takasago_Logo.png";

/* Material comercial MyTS — follow-up do SDR. Mesmo sistema visual da apresentação institucional. */
const W = 1600;
const H = 900;
const P = 64;
const TOTAL = 9;

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => setPrint(new URLSearchParams(window.location.search).has("print")), []);
  return print;
};

const Slide = ({ children, dark = false, decor, n }: { children: React.ReactNode; dark?: boolean; decor?: React.ReactNode; n: number }) => {
  const ref = useRef<HTMLElement>(null);
  const print = usePrintMode();
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    if (print || !ref.current) return;
    const el = ref.current;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [print]);
  const s = print ? 1 : scale;
  return (
    <section ref={ref} className={`${dark ? "bg-primary" : "bg-background"} relative slide-frame`}
      style={print ? { width: W, height: H, overflow: "hidden", breakAfter: "page" } : { width: "min(100%, calc((100vh - 64px) * 16 / 9))", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 16 }}>
      <div className={`${dark ? "bg-primary" : "bg-background"} absolute left-0 top-0 overflow-hidden`} style={{ width: W, height: H, transform: `scale(${s})`, transformOrigin: "top left", visibility: s ? "visible" : "hidden" }}>
        {decor}
        <div className="relative flex h-full w-full flex-col" style={{ padding: P, paddingBottom: 40 }}>
          {children}
          <div className={`mt-auto flex items-center justify-between pt-4 text-[15px] font-semibold ${dark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
            <img src={mytsLogo} alt="MyTS" className="h-[22px] w-auto" style={dark ? { filter: "brightness(0) invert(1)", opacity: 0.8 } : undefined} />
            <span>{String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Logo como elemento gráfico ---------- */
const markMask: React.CSSProperties = { WebkitMaskImage: `url(${mytsMark})`, maskImage: `url(${mytsMark})`, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskPosition: "center", maskPosition: "center" };
/** Símbolo MyTS pintado com um token (sólido ou gradiente). */
const Glyph = ({ size, tone = "accent", opacity = 1, className = "", style }: { size: number; tone?: "accent" | "glow" | "light" | "navy" | "gradient"; opacity?: number; className?: string; style?: React.CSSProperties }) => {
  const bg = { accent: "hsl(var(--accent))", glow: "hsl(var(--accent-glow))", light: "hsl(var(--primary-foreground))", navy: "hsl(var(--primary))", gradient: "linear-gradient(135deg, hsl(var(--accent-glow)), hsl(var(--accent)) 55%, hsl(var(--primary)))" }[tone];
  return <div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ width: size, height: size * 179 / 173, background: bg, opacity, ...markMask, ...style }} />;
};
const Grid = ({ dark = false }: { dark?: boolean }) => <div aria-hidden className={`absolute inset-0 ${dark ? "opacity-20" : "opacity-40"} grid-pattern`} />;

/** Composição para slides claros: faixa navy à direita com o símbolo em gradiente "saindo" do slide. */
const LightEcho = ({ side = "right" }: { side?: "right" | "left" }) => (
  <>
    <Grid />
    <div aria-hidden className={`absolute top-0 h-full w-[120px] bg-primary ${side === "right" ? "right-0" : "left-0"}`} />
    <Glyph size={300} tone="gradient" className={side === "right" ? "-right-[110px] bottom-[60px]" : "-left-[110px] bottom-[60px]"} />
  </>
);
const DarkEcho = ({ pos = "-bottom-48 -right-24", size = 680 }: { pos?: string; size?: number }) => (
  <><Grid dark /><Glyph size={size} tone="light" opacity={0.06} className={pos} /><div aria-hidden className="absolute -left-40 -top-40 size-[520px] rounded-full bg-accent/20 blur-[120px]" /></>
);

/* ---------- Primitivas (padrão institucional) ---------- */
const Header = ({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) => (
  <div className={`flex items-center gap-4 text-[17px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`} style={{ letterSpacing: "0.16em" }}>
    <span>{n}</span><span className={`h-px w-14 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} />{label}
  </div>
);
const Title = ({ children, dark = false, size = 54, max = 1240 }: { children: React.ReactNode; dark?: boolean; size?: number; max?: number }) => (
  <h2 className={`font-display font-bold leading-[1.08] ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size, marginTop: 20, maxWidth: max }}>{children}</h2>
);
const Pill = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span className={`inline-flex w-fit items-center rounded-full border px-5 py-2 text-[17px] font-semibold ${dark ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground" : "border-accent/25 bg-accent/10 text-accent"}`}>{children}</span>
);
const Window = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
    <div className="flex h-12 items-center gap-2 border-b border-border bg-secondary px-5">
      <i className="size-2.5 rounded-full bg-destructive/70" /><i className="size-2.5 rounded-full bg-accent/70" /><i className="size-2.5 rounded-full bg-success/70" />
      <span className="ml-3 text-[16px] text-muted-foreground">{title}</span>
    </div>
    {children}
  </div>
);
const Checks = ({ items }: { items: string[] }) => (
  <div className="mt-7 space-y-3">{items.map((x) => <p key={x} className="flex items-center gap-3 text-[21px] text-foreground"><CheckCircle2 className="shrink-0 text-success" size={24} />{x}</p>)}</div>
);

const CLIENTS = [
  { name: "Carrefour", src: carrefourLogo }, { name: "Korin", src: korinLogo }, { name: "C.Vale", src: cvaleLogo }, { name: "Augusta Alimentos", src: augustaLogo },
  { name: "CFS", src: cfsLogo }, { name: "Carbex", src: carbexLogo }, { name: "Viskase", src: viskaseLogo }, { name: "Takasago", src: takasagoLogo },
];

/* ---------- Slides ---------- */
const S01 = () => (
  <Slide n={1} dark decor={<><Grid dark /><div aria-hidden className="absolute -left-40 -top-40 size-[560px] rounded-full bg-accent/25 blur-[130px]" /><Glyph size={620} tone="gradient" opacity={0.9} className="-right-[90px] top-[120px]" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark>Material para você conhecer a MyTS</Pill></div>
    <div className="flex flex-1 flex-col justify-center">
      <p className="text-[22px] font-semibold uppercase text-accent-glow" style={{ letterSpacing: "0.16em" }}>My Trusted Source</p>
      <h1 className="mt-6 max-w-[980px] font-display text-[70px] font-bold leading-[1.03] text-primary-foreground">Empresas, fornecedores e processos conectados em uma <span className="text-accent-glow">cadeia confiável.</span></h1>
      <p className="mt-7 max-w-[820px] text-[26px] leading-[1.4] text-primary-foreground/80">Plataforma inteligente para Compras, Qualidade, P&amp;D, ESG e Compliance.</p>
      <div className="mt-11 flex gap-4">
        {[["+1.500", "empresas ativas"], ["50K+", "documentos"], ["+200", "processos"], ["+20", "países"]].map(([v, l]) => (
          <div key={l} className="w-fit rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] px-6 py-4">
            <strong className="block font-display text-[36px] leading-none text-primary-foreground">{v}</strong>
            <span className="mt-2 block text-[16px] text-primary-foreground/70">{l}</span>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

const S02 = () => (
  <Slide n={2} decor={<LightEcho />}>
    <Header n="01" label="Sobre a MyTS" />
    <div className="mt-4 grid flex-1 grid-cols-[1fr_520px] items-center gap-14 pr-[110px]">
      <div>
        <Title size={56}>My Trusted Source.<br /><span className="text-accent">O nome já diz o que somos.</span></Title>
        <p className="mt-6 max-w-[760px] text-[23px] leading-[1.45] text-foreground/75">Nascemos dentro da indústria de alimentos para resolver o que planilha e e-mail nunca deram conta: reunir empresas, fornecedores e processos em uma única base confiável.</p>
        <div className="mt-8 space-y-4">
          {[[ShieldCheck, "Base única de verdade", "Documentos, certidões e histórico centralizados e auditáveis."], [ClipboardCheck, "Fluxos auditáveis", "Homologação, autoavaliação e RNC com etapas e evidências."], [Network, "Rede de campo", "Mais de 100 auditores e especialistas no Brasil e no exterior."]].map(([I, t, d]) => {
            const Icon = I as typeof ShieldCheck;
            return <div key={String(t)} className="flex items-center gap-5"><span className="grid size-14 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Icon size={27} /></span><div><strong className="block text-[22px] text-foreground">{String(t)}</strong><span className="text-[18px] text-muted-foreground">{String(d)}</span></div></div>;
          })}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-primary p-9">
        <img src={mytsLogo} alt="MyTS" className="h-[40px] w-auto" style={{ filter: "brightness(0) invert(1)" }} />
        <p className="mt-6 text-[21px] leading-[1.45] text-primary-foreground/85">Tecnologia e conhecimento técnico juntos para centralizar dados, integrar fluxos e acelerar decisões em toda a cadeia.</p>
        <p className="mt-7 text-[14px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.14em" }}>Onde estamos</p>
        <div className="mt-3 space-y-2 text-[19px] text-primary-foreground">
          <p className="flex items-center gap-3"><MapPin size={18} className="text-accent-glow" />Botucatu · SP · Brasil</p>
          <p className="flex items-center gap-3"><MapPin size={18} className="text-accent-glow" />Charlotte · NC · EUA</p>
          <p className="flex items-center gap-3"><Globe2 size={18} className="text-accent-glow" />Operação em +20 países</p>
        </div>
        <p className="mt-7 text-[14px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.14em" }}>Atuação</p>
        <div className="mt-3 flex flex-wrap gap-2">{["Compras", "Qualidade", "P&D", "ESG", "Compliance"].map((p) => <Pill key={p} dark>{p}</Pill>)}</div>
      </div>
    </div>
  </Slide>
);

const S03 = () => (
  <Slide n={3} dark decor={<DarkEcho />}>
    <Header n="02" label="Metodologia" dark />
    <Title dark>Uma jornada completa, da prospecção ao monitoramento.</Title>
    <div className="my-auto flex items-start gap-5">
      {[[Search, "Prospecção inteligente", "Conectamos empresas a fornecedores e especialistas qualificados para fortalecer a cadeia."], [Workflow, "Homologação personalizada", "Fluxos por área (Qualidade, Compras, P&D) com critérios técnicos, sanitários e etapas auditáveis."], [Eye, "Monitoramento contínuo", "Alertas de vencimento, evidências organizadas e relatórios prontos para auditoria."]].map(([I, t, d], i, a) => {
        const Icon = I as typeof Search;
        return <Fragment key={String(t)}>
          <div className="flex-1 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-8">
            <div className="flex items-center justify-between"><span className="grid size-16 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Icon size={32} /></span><span className="font-display text-[44px] font-bold text-primary-foreground/15">0{i + 1}</span></div>
            <h3 className="mt-6 text-[28px] font-bold text-primary-foreground">{String(t)}</h3>
            <p className="mt-3 text-[19px] leading-[1.45] text-primary-foreground/75">{String(d)}</p>
          </div>
          {i < a.length - 1 && <ArrowRight className="mt-24 shrink-0 text-accent-glow" size={30} />}
        </Fragment>;
      })}
    </div>
    <div className="mb-6 w-fit rounded-2xl border border-accent/30 bg-accent/15 px-7 py-4 text-[21px] font-semibold text-primary-foreground">Cada etapa alimenta a próxima — dados, responsáveis e evidências sempre conectados.</div>
  </Slide>
);

const S04 = () => (
  <Slide n={4} decor={<LightEcho />}>
    <Header n="03" label="Soluções integradas" />
    <Title>Uma plataforma, seis frentes de trabalho.</Title>
    <div className="my-auto grid grid-cols-3 gap-6 pr-[110px]">
      {[[Handshake, "Homologação de fornecedores", "Critérios sanitários, técnicos e regulatórios em um fluxo rápido e seguro."], [FileStack, "Gestão documental e lista mestra", "Arquivos internos e externos com validades, versões e aprovações."], [Gauge, "Monitoramento B2B", "Matriz de risco personalizada, certidões, laudos e status em tempo real."], [ListChecks, "Autoavaliação e checklists", "Diagnósticos remotos de qualidade, BPF, segurança dos alimentos e ESG."], [AlertTriangle, "RNC e processos", "Não conformidades, planos de ação e histórico de desempenho."], [ShieldCheck, "Prontidão para auditorias", "Painéis prontos para 2ª parte, FSSC 22000, ISO e conformidade sanitária."]].map(([I, t, d]) => {
        const Icon = I as typeof Handshake;
        return <div key={String(t)} className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Icon size={24} /></span><h3 className="text-[22px] font-bold leading-tight text-foreground">{String(t)}</h3></div>
          <p className="mt-3 text-[18px] leading-[1.42] text-muted-foreground">{String(d)}</p>
        </div>;
      })}
    </div>
  </Slide>
);

const DocsMock = () => (
  <Window title="MyTS · Meus Documentos">
    <div className="p-7">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-5 py-3 text-[17px] text-muted-foreground"><Search size={20} />Buscar documento, norma ou responsável</div>
      <div className="mt-5 grid grid-cols-3 gap-4">{[["128", "documentos ativos"], ["07", "vencem em 30 dias"], ["96%", "lista mestra em dia"]].map(([v, l], i) => <div key={l} className={`rounded-xl px-5 py-4 ${i === 1 ? "bg-accent/10" : "bg-secondary"}`}><strong className="block text-[32px] leading-none text-foreground">{v}</strong><span className="mt-2 block text-[15px] text-muted-foreground">{l}</span></div>)}</div>
      <div className="mt-5 space-y-3">{[["POP — Higienização de linha", "vigente", true], ["Certificado FSSC 22000", "vence em 12 dias", false], ["Laudo microbiológico", "vigente", true], ["Política de qualidade", "vigente", true]].map(([a, b, ok]) => <div key={String(a)} className="flex items-center gap-4 rounded-xl border border-border px-5 py-3"><FileText size={20} className="text-accent" /><span className="flex-1 text-[18px] font-semibold text-foreground">{String(a)}</span><span className={`rounded-full px-3 py-1 text-[14px] font-bold ${ok ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{String(b)}</span></div>)}</div>
    </div>
  </Window>
);

const S05 = () => (
  <Slide n={5} decor={<LightEcho side="left" />}>
    <div className="grid flex-1 grid-cols-[0.8fr_1.2fr] items-center gap-12 pl-[110px]">
      <div>
        <Header n="04" label="Módulo" />
        <div className="mt-6"><Pill>Meus Documentos</Pill></div>
        <Title size={50}>Gestão documental e lista mestra, sempre prontas para auditoria.</Title>
        <p className="mt-5 text-[21px] leading-[1.45] text-foreground/75">POPs, políticas, certificados e laudos centralizados, atendendo à exigência de lista mestra das normas.</p>
        <Checks items={["Alertas automáticos de vencimento", "Versões e aprovações registradas", "Evidências organizadas"]} />
      </div>
      <DocsMock />
    </div>
  </Slide>
);

const SupMock = () => (
  <Window title="MyTS · Meus Fornecedores">
    <div className="p-7">
      <div className="flex items-center justify-between">
        <div><strong className="block text-[26px] text-foreground">Alimentos Litoral Ltda.</strong><span className="text-[16px] text-muted-foreground">Homologado · Ingredientes</span></div>
        <div className="grid size-[84px] place-items-center rounded-full border-[6px] border-success bg-success/10 text-center"><div><strong className="block text-[28px] leading-none text-foreground">92</strong><span className="text-[12px] font-bold text-success">IQF</span></div></div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-3">{[["Certidões", "12/12"], ["Laudos", "8/8"], ["Autoavaliação", "84/100"], ["RNC abertas", "0"]].map(([k, v]) => <div key={k} className="rounded-xl bg-secondary px-4 py-3"><span className="block text-[14px] text-muted-foreground">{k}</span><strong className="flex items-center gap-2 text-[22px] text-foreground">{v}<Check size={16} className="text-success" /></strong></div>)}</div>
      <p className="mt-6 text-[15px] font-bold uppercase text-muted-foreground" style={{ letterSpacing: "0.12em" }}>Matriz de risco</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["Médio", "Alto", "Alto", "Baixo", "Médio", "Alto", "Baixo", "Baixo", "Médio"].map((r, i) => <div key={i} className={`relative flex h-[46px] items-center justify-center rounded-lg text-[14px] font-bold ${r === "Baixo" ? "bg-success/20 text-success" : r === "Médio" ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`}>{r}{i === 6 && <span className="absolute -right-1 -top-1 size-5 rounded-full border-[3px] border-card bg-primary" />}</div>)}
      </div>
      <p className="mt-3 text-[15px] text-muted-foreground">● Fornecedor posicionado em <strong className="text-success">risco baixo</strong></p>
    </div>
  </Window>
);

const S06 = () => (
  <Slide n={6} decor={<LightEcho />}>
    <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] items-center gap-12 pr-[110px]">
      <SupMock />
      <div>
        <Header n="05" label="Módulo" />
        <div className="mt-6"><Pill>Meus Fornecedores</Pill></div>
        <Title size={50}>Cada fornecedor com nota, risco e status em tempo real.</Title>
        <p className="mt-5 text-[21px] leading-[1.45] text-foreground/75">Qualifique, solicite certidões e acompanhe parceiros com requisitos e histórico centralizados.</p>
        <Checks items={["Nota IQF calculada automaticamente", "Matriz de risco personalizada", "Fornecedor envia tudo sozinho"]} />
      </div>
    </div>
  </Slide>
);

const S07 = () => (
  <Slide n={7} dark decor={<DarkEcho pos="-top-24 -right-32" size={560} />}>
    <Header n="06" label="Processos e autoavaliação" dark />
    <Title dark>Do checklist ao plano de ação, sem perder nenhuma etapa.</Title>
    <div className="relative my-auto">
      <div aria-hidden className="absolute left-[8%] right-[8%] top-[36px] h-[3px] bg-gradient-to-r from-accent-glow/20 via-accent-glow to-accent-glow/20" />
      <div className="relative grid grid-cols-4 gap-6">
        {[[ListChecks, "Checklist", "Formulários técnicos aplicados remotamente."], [BarChart3, "Nota (IQF)", "Pontuação objetiva e comparável no tempo."], [AlertTriangle, "Registro de RNC", "Não conformidade com evidência e responsável."], [ClipboardCheck, "Plano de ação", "Tratativa acompanhada até o fechamento."]].map(([I, t, d], i) => {
          const Icon = I as typeof ListChecks;
          return <div key={String(t)} className="flex flex-col items-center text-center">
            <span className="grid size-[74px] place-items-center rounded-full border-4 border-primary bg-accent text-accent-foreground shadow-elegant"><Icon size={32} /></span>
            <span className="mt-4 text-[15px] font-bold text-accent-glow">ETAPA 0{i + 1}</span>
            <h3 className="mt-1 text-[26px] font-bold text-primary-foreground">{String(t)}</h3>
            <p className="mt-2 max-w-[290px] text-[18px] leading-[1.4] text-primary-foreground/75">{String(d)}</p>
          </div>;
        })}
      </div>
    </div>
    <div className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl border border-accent/30 bg-accent/15 px-7 py-4 text-[20px] font-semibold text-primary-foreground"><BellRing size={22} className="text-accent-glow" />Alertas e relatórios automáticos mantêm a base em dia sem trabalho manual.</div>
  </Slide>
);

const S08 = () => (
  <Slide n={8} decor={<LightEcho side="left" />}>
    <div className="flex flex-1 flex-col pl-[110px]">
      <Header n="07" label="Além do software" />
      <Title>Tecnologia com gente de verdade em campo.</Title>
      <div className="my-auto grid grid-cols-[440px_1fr] items-center gap-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8">
          <strong className="block font-display text-[88px] leading-none text-accent-glow">100+</strong>
          <p className="mt-3 text-[21px] leading-[1.4] text-primary-foreground/85">auditores e especialistas no Brasil e no exterior.</p>
          <div className="mt-7 flex items-center gap-3 text-[17px] font-semibold text-primary-foreground">
            <span className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2"><MapPin size={16} className="text-accent-glow" />Botucatu</span>
            <span className="h-px flex-1 border-t-2 border-dashed border-accent-glow/60" />
            <span className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2"><MapPin size={16} className="text-accent-glow" />Charlotte</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {[[Users, "Rede de auditores", "Atendimento rápido, com presença regional."], [Factory, "Visitas técnicas", "Verificação em campo de instalações e BPF."], [ShieldCheck, "Auditorias de 2ª parte", "Seus fornecedores avaliados pelo seu padrão."], [FileText, "Autoavaliação sob medida", "Questionários técnicos para cada público."]].map(([I, t, d]) => {
            const Icon = I as typeof Users;
            return <div key={String(t)} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Icon size={24} /></span><div><h3 className="text-[21px] font-bold text-foreground">{String(t)}</h3><p className="mt-1 text-[17px] leading-[1.4] text-muted-foreground">{String(d)}</p></div></div>;
          })}
        </div>
      </div>
    </div>
  </Slide>
);

const S09 = () => (
  <Slide n={9} dark decor={<><Grid dark /><Glyph size={760} tone="light" opacity={0.05} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark>Vamos conversar</Pill></div>
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="text-[15px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.16em" }}>Empresas que já confiam na MyTS</p>
      <div className="mt-5 grid grid-cols-8 gap-3">{CLIENTS.map((c) => <div key={c.name} className="flex h-[70px] w-[140px] items-center justify-center rounded-xl bg-primary-foreground px-3"><img src={c.src} alt={c.name} className="max-h-[42px] max-w-full object-contain" /></div>)}</div>
      <h2 className="mt-12 max-w-[1200px] font-display text-[56px] font-bold leading-[1.08] text-primary-foreground">Visibilidade total e controle completo<br /><span className="text-accent-glow">da sua cadeia de suprimentos.</span></h2>
      <div className="mt-10 flex gap-4">
        <a href="mailto:ricardo.machado@myt-s.com" className="flex items-center gap-3 rounded-xl bg-accent px-6 py-4 text-[21px] font-bold text-accent-foreground"><Mail size={23} />ricardo.machado@myt-s.com</a>
        <a href="https://wa.me/5514996823691" className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[21px] font-bold text-primary-foreground"><MessageCircle size={23} />+55 14 9 9682-3691</a>
        <a href="https://myt-s.com" className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[21px] font-bold text-primary-foreground"><Globe2 size={23} />myt-s.com</a>
      </div>
    </div>
  </Slide>
);

const MaterialComercial = () => {
  const print = usePrintMode();
  return (
    <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 32, overflowX: "hidden" }}>
      <Helmet><title>MyTS — Material Comercial</title><meta name="description" content="Conheça a MyTS: plataforma para gestão de fornecedores, documentos e processos da cadeia de suprimentos." /></Helmet>
      <style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>
      {!print && <Button onClick={() => window.open(`${window.location.pathname}?print`, "_blank")} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download />Baixar PDF</Button>}
      {[S01, S02, S03, S04, S05, S06, S07, S08, S09].map((C, i) => <C key={i} />)}
    </main>
  );
};

export default MaterialComercial;
