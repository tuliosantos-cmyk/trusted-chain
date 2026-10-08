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
import industriaImg from "@/assets/material/industria-alimentos.jpg";
import auditoriaImg from "@/assets/material/auditoria-campo.jpg";

/* Material comercial MyTS — follow-up do SDR. Mesmo sistema visual da apresentação institucional. */
const W = 1600;
const H = 900;
const P = 64;
const TOTAL = 10;

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

/** Composição para slides claros: grade sutil + símbolo MyTS como marca d'água discreta no canto. */
const LightEcho = ({ side = "right" }: { side?: "right" | "left" }) => (
  <>
    <Grid />
    <Glyph size={320} tone="accent" opacity={0.05} className={side === "right" ? "-bottom-[70px] -right-[90px]" : "-bottom-[70px] -left-[90px]"} />
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
  <Slide n={1} dark decor={<><Grid dark /><div aria-hidden className="absolute -left-40 -top-40 size-[560px] rounded-full bg-accent/25 blur-[130px]" /><Glyph size={560} tone="gradient" opacity={0.5} className="-right-[90px] top-[140px]" /></>}>
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
    <div className="mt-4 grid flex-1 grid-cols-[1fr_520px] items-center gap-14">
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
      <div className="relative overflow-hidden rounded-3xl bg-primary">
        <img src={industriaImg} alt="Linha de produção na indústria de alimentos" loading="lazy" width={1024} height={768} className="h-[180px] w-full object-cover" />
        <div className="p-8">
          <img src={mytsLogo} alt="MyTS" className="h-[36px] w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          <p className="mt-5 text-[20px] leading-[1.45] text-primary-foreground/85">Tecnologia e conhecimento técnico juntos para centralizar dados, integrar fluxos e acelerar decisões em toda a cadeia.</p>
          <p className="mt-6 text-[14px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.14em" }}>Onde estamos</p>
          <div className="mt-3 space-y-2 text-[18px] text-primary-foreground">
            <p className="flex items-center gap-3"><MapPin size={18} className="text-accent-glow" />Botucatu · SP · Brasil</p>
            <p className="flex items-center gap-3"><MapPin size={18} className="text-accent-glow" />Charlotte · NC · EUA</p>
            <p className="flex items-center gap-3"><Globe2 size={18} className="text-accent-glow" />Operação em +20 países</p>
          </div>
          <p className="mt-6 text-[14px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.14em" }}>Atuação</p>
          <div className="mt-3 flex flex-wrap gap-2">{["Compras", "Qualidade", "P&D", "ESG", "Compliance"].map((p) => <Pill key={p} dark>{p}</Pill>)}</div>
        </div>
      </div>
    </div>
  </Slide>
);

const MiniRow = ({ name, tag, ok }: { name: string; tag: string; ok: boolean }) => (
  <div className="flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.06] px-4 py-2.5">
    <span className="size-8 shrink-0 rounded-full bg-accent/25" />
    <span className="flex-1 text-[16px] font-semibold text-primary-foreground">{name}</span>
    <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${ok ? "bg-success/20 text-success" : "bg-accent/20 text-accent-glow"}`}>{tag}</span>
  </div>
);

const S03 = () => (
  <Slide n={3} dark decor={<DarkEcho />}>
    <Header n="02" label="Metodologia · 1 de 2" dark />
    <Title dark size={48}>Tudo começa com a conexão certa.</Title>
    <div className="my-auto grid grid-cols-2 gap-8">
      <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-7">
        <div className="flex items-center justify-between">
          <span className="grid size-14 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Search size={28} /></span>
          <span className="font-display text-[40px] font-bold text-primary-foreground/15">01</span>
        </div>
        <h3 className="mt-4 text-[26px] font-bold text-primary-foreground">Prospecção inteligente</h3>
        <p className="mt-2 text-[17px] leading-[1.4] text-primary-foreground/75">Conectamos empresas a fornecedores e especialistas qualificados para fortalecer a cadeia.</p>
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary/40 px-4 py-2.5 text-[15px] text-primary-foreground/60"><Search size={17} />Buscar fornecedor de ingredientes…</div>
          <MiniRow name="Alimentos Litoral" tag="Homologado" ok />
          <MiniRow name="Grãos do Vale" tag="Em análise" ok={false} />
          <MiniRow name="Embalagens Prisma" tag="Homologado" ok />
        </div>
      </div>
      <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-7">
        <div className="flex items-center justify-between">
          <span className="grid size-14 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Workflow size={28} /></span>
          <span className="font-display text-[40px] font-bold text-primary-foreground/15">02</span>
        </div>
        <h3 className="mt-4 text-[26px] font-bold text-primary-foreground">Homologação personalizada</h3>
        <p className="mt-2 text-[17px] leading-[1.4] text-primary-foreground/75">Fluxos por área — Qualidade, Compras, P&amp;D — com critérios técnicos, sanitários e etapas auditáveis.</p>
        <div className="mt-5 rounded-xl border border-primary-foreground/10 bg-primary/40 p-4">
          <div className="flex items-center justify-between text-[13px] font-bold text-primary-foreground/70"><span>Documentos</span><span>Análise técnica</span><span>Visita</span><span>Aprovado</span></div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-primary-foreground/10"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-accent-glow to-accent" /></div>
          <div className="mt-3 flex items-center gap-2 text-[14px] text-primary-foreground/70"><CheckCircle2 size={16} className="text-success" />12 de 16 requisitos concluídos</div>
        </div>
        <div className="mt-2.5 flex gap-2">{["Qualidade", "Compras", "P&D"].map((p) => <span key={p} className="rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.08] px-3.5 py-1.5 text-[13px] font-semibold text-primary-foreground/80">{p}</span>)}</div>
      </div>
    </div>
  </Slide>
);

const MonMock = () => (
  <Window title="MyTS · Monitoramento">
    <div className="p-6">
      <div className="grid grid-cols-3 gap-3">
        {[["98%", "base em dia"], ["14", "alertas do mês"], ["0", "RNC críticas"]].map(([v, l]) => <div key={l} className="rounded-xl bg-secondary px-4 py-3"><strong className="block text-[26px] leading-none text-foreground">{v}</strong><span className="mt-1.5 block text-[13px] text-muted-foreground">{l}</span></div>)}
      </div>
      <div className="mt-4 space-y-2.5">
        {[[BellRing, "Certificado FSSC do fornecedor Litoral vence em 12 dias", false], [BellRing, "Laudo microbiológico recebido e aprovado", true], [BellRing, "Autoavaliação trimestral enviada a 38 fornecedores", true]].map(([I, t, ok]) => { const Icon = I as typeof BellRing; return <div key={String(t)} className="flex items-center gap-3 rounded-xl border border-border px-4 py-2.5"><Icon size={18} className={ok ? "text-accent" : "text-destructive"} /><span className="text-[15px] font-medium text-foreground">{String(t)}</span></div>; })}
      </div>
      <div className="mt-4 flex h-[92px] items-end gap-2 rounded-xl bg-secondary p-4">
        {[40, 55, 48, 62, 70, 66, 78, 84, 80, 92].map((h, i) => <div key={i} className="w-full rounded-t bg-accent/70" style={{ height: h }} />)}
      </div>
    </div>
  </Window>
);

const S04 = () => (
  <Slide n={4} decor={<LightEcho />}>
    <Header n="02" label="Metodologia · 2 de 2" />
    <div className="grid flex-1 grid-cols-[0.9fr_1.1fr] items-center gap-12">
      <div>
        <Title size={48}>Monitoramento contínuo: a cadeia viva, todos os dias.</Title>
        <p className="mt-5 text-[20px] leading-[1.45] text-foreground/75">Depois da homologação, a MyTS vigia vencimentos, evidências e desempenho — sem trabalho manual.</p>
        <Checks items={["Alertas automáticos de vencimento", "Evidências e relatórios prontos para auditoria", "Cada etapa alimenta a próxima"]} />
      </div>
      <MonMock />
    </div>
  </Slide>
);

const S05 = () => (
  <Slide n={5} decor={<LightEcho />}>
    <Header n="03" label="Estrutura de contratação · SaaS" />
    <Title>Uma plataforma. Três módulos para contratar.</Title>
    <p className="mt-5 text-[23px] text-muted-foreground">Cada módulo organiza uma frente da operação. Juntos, conectam documentos, parceiros e processos.</p>
    <div className="my-auto grid grid-cols-3 gap-7">
      {[
        { icon: FileStack, name: "Meus Documentos", subtitle: "Gestão documental & Lista Mestra", description: "Arquivos internos, POPs e políticas centralizados para atender normas e certificações.", items: ["Lista Mestra de documentos", "Versões, validades e aprovações", "Evidências organizadas"] },
        { icon: Handshake, name: "Meus Fornecedores", subtitle: "Gestão e desenvolvimento B2B", description: "Solicitações e acompanhamento dos parceiros, com acesso do fornecedor e histórico centralizado.", items: ["Requisitos por produto e fornecedor", "Solicitações e notificações", "Informações e anexos no histórico"] },
        { icon: Workflow, name: "Processos e Autoavaliação", subtitle: "Workflows inteligentes & RNC", description: "Procedimentos transformados em etapas, prazos e responsabilidades dentro do sistema.", items: ["Validação, aceite e aprovação", "Checklists com notas e RNC", "Formulários e planos de ação"] },
      ].map((m, i) => {
        const Icon = m.icon;
        return <div key={m.name} className="rounded-lg border border-border bg-card p-7 shadow-card">
          <div className="flex items-center justify-between"><span className="grid size-14 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={28} /></span><span className="text-[17px] font-bold text-muted-foreground">MÓDULO 0{i + 1}</span></div>
          <h3 className="mt-6 min-h-[64px] text-[28px] font-bold leading-[1.15] text-foreground">{m.name}</h3>
          <p className="mt-2 text-[18px] font-bold text-accent">{m.subtitle}</p>
          <p className="mt-4 min-h-[84px] text-[20px] leading-[1.4] text-muted-foreground">{m.description}</p>
          <div className="mt-5 space-y-3 border-t border-border pt-5">{m.items.map(item => <p key={item} className="flex items-start gap-3 text-[18px] text-foreground"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-success" />{item}</p>)}</div>
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

const S06 = () => (
  <Slide n={6} decor={<LightEcho side="left" />}>
    <div className="grid flex-1 grid-cols-[0.8fr_1.2fr] items-center gap-12">
      <div>
        <Header n="04" label="Módulo 1 de 3" />
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
    <div className="p-6">
      <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-lg bg-accent/10 text-accent"><Factory size={23} /></span><div><strong className="block text-[22px] text-foreground">Alimentos Litoral</strong><span className="text-[15px] text-muted-foreground">Produto: farinha de trigo · Requisitos técnicos</span></div></div>
      <div className="mt-5 flex items-center gap-2 border-b border-border pb-3 text-[16px] font-bold"><span className="text-accent">Solicitações</span><span className="mx-3 text-muted-foreground">Documentos</span><span className="text-muted-foreground">Histórico</span></div>
      <div className="mt-4 space-y-3">{[["Laudo microbiológico", "Recebido", true], ["Ficha técnica do produto", "Em análise", false], ["Certidão atualizada", "Solicitado", false]].map(([name, status, ok]) => <div key={String(name)} className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"><div className="flex items-center gap-3 text-[17px] font-semibold text-foreground"><FileText size={19} className="shrink-0 text-accent" />{String(name)}</div><span className={`shrink-0 text-[14px] font-bold ${ok ? "text-success" : "text-accent"}`}>{String(status)}</span></div>)}</div>
      <div className="mt-5 flex items-start gap-3 rounded-lg bg-accent/10 p-4"><BellRing size={22} className="shrink-0 text-accent" /><div><strong className="text-[17px] text-foreground">Fornecedor notificado</strong><p className="mt-1 text-[15px] text-muted-foreground">Acessa a solicitação e envia informações e anexos.</p></div></div>
      <div className="mt-5 border-l-2 border-success pl-4"><p className="text-[15px] font-bold text-foreground">Histórico da solicitação</p><p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">Solicitado por Compras → anexo enviado pelo fornecedor → análise registrada por Qualidade.</p></div>
    </div>
  </Window>
);

const S07 = () => (
  <Slide n={7} decor={<LightEcho />}>
    <Header n="05" label="Módulo 2 de 3 · Meus Fornecedores" />
    <Title size={48}>Você solicita. O fornecedor participa.<br /><span className="text-accent">O histórico fica com a sua empresa.</span></Title>
    <div className="my-auto grid grid-cols-[0.95fr_1.05fr] items-center gap-12">
      <div>
        <p className="text-[23px] leading-[1.45] text-foreground/75">Da homologação ao acompanhamento contínuo: organize o que pedir, a quem pedir e para qual produto.</p>
        <div className="mt-7 space-y-5">{[[ListChecks, "Controle por produto, requisito e fornecedor", "Certidões, laudos e dados técnicos vinculados ao contexto certo."], [Users, "Acesso direto do fornecedor", "Notificações levam o parceiro às solicitações para responder e anexar documentos."], [FileStack, "Informações que não se perdem", "Solicitações, respostas, documentos anexados e análises preservados no histórico."]].map(([I, title, text]) => { const Icon = I as typeof ListChecks; return <div key={String(title)} className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={23} /></span><div><h3 className="text-[20px] font-bold leading-[1.3] text-foreground">{String(title)}</h3><p className="mt-1 text-[18px] leading-[1.4] text-muted-foreground">{String(text)}</p></div></div>; })}</div>
      </div>
      <SupMock />
    </div>
  </Slide>
);

const S08 = () => (
  <Slide n={8} dark decor={<DarkEcho pos="-top-24 -right-32" size={560} />}>
    <Header n="06" label="Módulo 3 de 3 · Processos e Autoavaliação" dark />
    <Title dark size={48}>Seu procedimento vira um processo vivo.</Title>
    <p className="mt-4 text-[22px] text-primary-foreground/75">Da rotina no papel à execução com etapas, prazos e pessoas responsáveis.</p>
    <div className="my-auto">
      <div className="grid grid-cols-4 gap-5">{[[FileText, "1. Modelar", "Traga qualquer processo ou procedimento."], [Workflow, "2. Organizar", "Defina etapas, prazos e envolvidos."], [Users, "3. Executar", "Valide, aceite e aprove cada entrega."], [ClipboardCheck, "4. Registrar e tratar", "Formulários, notas, RNC e planos de ação."]].map(([I, title, description], i) => { const Icon = I as typeof FileText; return <div key={String(title)} className="relative border-t-2 border-accent-glow/50 pt-4"><div className="flex items-center gap-3"><Icon size={25} className="text-accent-glow" /><h3 className="text-[23px] font-bold text-primary-foreground">{String(title)}</h3>{i < 3 && <ArrowRight size={22} className="ml-auto text-accent-glow/60" />}</div><p className="mt-3 text-[18px] leading-[1.4] text-primary-foreground/75">{String(description)}</p></div>; })}</div>
      <div className="mt-8 grid grid-cols-[1.15fr_0.85fr] gap-8">
        <Window title="MyTS · Meus Processos · Liberação de produção"><div className="p-5"><div className="flex items-center justify-between"><strong className="text-[20px] text-foreground">Checklist operacional</strong><span className="text-[15px] font-bold text-accent">Responsável: Qualidade</span></div><div className="mt-4 space-y-2">{[["Registrar formulário de inspeção", "Operação", "Concluído"], ["Validar evidências e checklist", "Qualidade", "Em validação"], ["Aprovar liberação da linha", "Gestão", "Próxima etapa"]].map(([task, person, status]) => <div key={task} className="grid grid-cols-[1fr_90px_115px] gap-3 border-b border-border py-2.5 text-[15px]"><span className="font-semibold text-foreground">{task}</span><span className="text-muted-foreground">{person}</span><span className="text-accent">{status}</span></div>)}<div className="mt-4 flex items-center gap-3 rounded-lg bg-destructive/10 p-3 text-[16px] font-semibold text-destructive"><AlertTriangle size={21} />Desvio no checklist → RNC automática → plano de ação</div></div></div></Window>
        <div className="flex flex-col justify-center"><h3 className="text-[22px] font-bold text-primary-foreground">A metodologia se adapta à sua rotina</h3><p className="mt-3 text-[19px] leading-[1.5] text-primary-foreground/75">Checklists com cálculo de notas (incluindo IQF), registros de formulários operacionais e tratamento de não conformidades no mesmo fluxo.</p><div className="mt-5 flex flex-wrap gap-2">{["Homologação", "Inspeções de BPF", "Liberação de produção", "Autoavaliações"].map(x => <span key={x} className="rounded-lg border border-primary-foreground/20 px-3 py-2 text-[16px] text-primary-foreground">{x}</span>)}</div></div>
      </div>
    </div>
  </Slide>
);

const S09 = () => (
  <Slide n={9} decor={<LightEcho side="left" />}>
    <div className="flex flex-1 flex-col">
      <Header n="07" label="Além do SaaS · Serviços MyTS" />
      <Title size={50}>Software para gerir. Especialistas para agir.</Title>
      <p className="mt-4 text-[22px] text-muted-foreground">Além dos três módulos, a MyTS oferece serviços técnicos para apoiar sua operação e desenvolver sua cadeia.</p>
      <div className="my-auto grid grid-cols-[440px_1fr] items-center gap-8">
        <div className="relative h-[430px] overflow-hidden rounded-3xl">
          <img src={auditoriaImg} alt="Auditora em visita técnica na indústria" loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary via-primary/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <strong className="block font-display text-[64px] leading-none text-accent-glow">100+</strong>
            <p className="mt-2 text-[18px] leading-[1.35] text-primary-foreground/90">auditores e especialistas no Brasil e no exterior.</p>
            <div className="mt-4 flex items-center gap-3 text-[15px] font-semibold text-primary-foreground">
              <span className="flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 backdrop-blur"><MapPin size={15} className="text-accent-glow" />Botucatu</span>
              <span className="h-px flex-1 border-t-2 border-dashed border-accent-glow/60" />
              <span className="flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 backdrop-blur"><MapPin size={15} className="text-accent-glow" />Charlotte</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {[[Users, "Outsourcing de Qualidade", "Suporte técnico contínuo às rotinas da sua operação."], [ShieldCheck, "Auditorias de 2ª parte", "Avaliação presencial ou remota de fornecedores conforme os seus critérios."], [ClipboardCheck, "Validação técnica", "Especialistas analisam evidências e respostas das autoavaliações."], [FileStack, "Carga inicial de acervo", "Organização e migração de documentos e dados para iniciar a operação."]].map(([I, t, d]) => {
            const Icon = I as typeof Users;
            return <div key={String(t)} className="flex items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-card"><span className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={24} /></span><div><h3 className="text-[23px] font-bold text-foreground">{String(t)}</h3><p className="mt-2 text-[20px] leading-[1.4] text-muted-foreground">{String(d)}</p></div></div>;
          })}
        </div>
      </div>
    </div>
  </Slide>
);

const S10 = () => (
  <Slide n={10} dark decor={<><Grid dark /><Glyph size={760} tone="light" opacity={0.05} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" /></>}>
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
      {[S01, S02, S03, S04, S05, S06, S07, S08, S09, S10].map((C, i) => <C key={i} />)}
    </main>
  );
};

export default MaterialComercial;
