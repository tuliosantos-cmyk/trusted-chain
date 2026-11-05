import { useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle, ArrowRight, BellRing, CheckCircle2, ClipboardCheck, Download, FileStack, FileText,
  Globe2, Handshake, Mail, MapPin, MessageCircle, Network, Quote, Search, ShieldCheck, Workflow, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { commercialMetrics } from "@/lib/commercial-metrics";
import { commercialClients } from "@/lib/commercial-proof";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg?raw";
import industriaImg from "@/assets/material/industria-alimentos.jpg";
import auditoriaImg from "@/assets/material/auditoria-campo.jpg";

/* Apresentação padrão MyTS — catálogo de layouts-base reutilizáveis. Textos entre [colchetes] são exemplos. */
const W = 1600;
const H = 900;
const P = 64;
const TOTAL = 14;

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => setPrint(new URLSearchParams(window.location.search).has("print")), []);
  return print;
};

const Slide = ({ children, dark = false, decor, n, name }: { children: React.ReactNode; dark?: boolean; decor?: React.ReactNode; n: number; name: string }) => {
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
    <div className="flex w-full flex-col items-center gap-3">
      {!print && <p className="no-print text-[14px] font-bold uppercase text-primary-foreground/70" style={{ letterSpacing: "0.14em" }}>Modelo {String(n).padStart(2, "0")} · {name}</p>}
      <section ref={ref} className={`${dark ? "bg-primary" : "bg-background"} relative slide-frame`}
        style={print ? { width: W, height: H, overflow: "hidden", breakAfter: "page" } : { width: "min(100%, calc((100vh - 96px) * 16 / 9))", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 16 }}>
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
    </div>
  );
};

/* ---------- Logo como elemento gráfico (um símbolo por tela) ---------- */
const markSvg = mytsMark.replace(/fill="white"/g, 'fill="currentColor"').replace('width="173" height="179"', 'width="100%" height="100%"');
const Glyph = ({ size, tone = "accent", opacity = 1, className = "" }: { size: number; tone?: "accent" | "glow" | "light"; opacity?: number; className?: string }) => {
  const color = { accent: "hsl(var(--accent))", glow: "hsl(var(--accent-glow))", light: "hsl(var(--primary-foreground))" }[tone];
  return <div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ width: size, height: size * 179 / 173, color, opacity }} dangerouslySetInnerHTML={{ __html: markSvg }} />;
};
const Grid = ({ dark = false }: { dark?: boolean }) => <div aria-hidden className={`absolute inset-0 ${dark ? "opacity-20" : "opacity-40"} grid-pattern`} />;
const LightEcho = ({ side = "right" }: { side?: "right" | "left" }) => (
  <><Grid /><Glyph size={320} opacity={0.05} className={side === "right" ? "-bottom-[70px] -right-[90px]" : "-bottom-[70px] -left-[90px]"} /></>
);
const DarkEcho = ({ pos = "-bottom-48 -right-24", size = 620 }: { pos?: string; size?: number }) => (
  <><Grid dark /><Glyph size={size} tone="light" opacity={0.06} className={pos} /><div aria-hidden className="absolute -left-40 -top-40 size-[520px] rounded-full bg-accent/20 blur-[120px]" /></>
);

/* ---------- Primitivas ---------- */
const Header = ({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) => (
  <div className={`flex items-center gap-4 text-[17px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`} style={{ letterSpacing: "0.16em" }}>
    <span>{n}</span><span className={`h-px w-14 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} />{label}
  </div>
);
const Title = ({ children, dark = false, size = 54, max = 1240 }: { children: React.ReactNode; dark?: boolean; size?: number; max?: number }) => (
  <h2 className={`font-display font-bold leading-[1.08] ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size, marginTop: 20, maxWidth: max }}>{children}</h2>
);
const Lead = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`mt-5 max-w-[1000px] text-[23px] leading-[1.45] ${dark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{children}</p>
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
const IconBox = ({ icon: Icon, dark = false }: { icon: typeof ShieldCheck; dark?: boolean }) => (
  <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${dark ? "bg-accent-glow/15 text-accent-glow" : "bg-accent/10 text-accent"}`}><Icon size={27} /></span>
);

/* ---------- 01 Capa ---------- */
const Capa = () => (
  <Slide n={1} name="Capa" dark decor={<><Grid dark /><div aria-hidden className="absolute -left-40 -top-40 size-[560px] rounded-full bg-accent/25 blur-[130px]" /><Glyph size={560} tone="glow" opacity={0.5} className="-right-[90px] top-[140px]" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark>[Contexto · Cliente · Data]</Pill></div>
    <div className="flex flex-1 flex-col justify-center">
      <p className="text-[22px] font-semibold uppercase text-accent-glow" style={{ letterSpacing: "0.16em" }}>My Trusted Source</p>
      <h1 className="mt-6 max-w-[980px] font-display text-[70px] font-bold leading-[1.03] text-primary-foreground">[Título principal da apresentação em até <span className="text-accent-glow">duas linhas.</span>]</h1>
      <p className="mt-7 max-w-[820px] text-[26px] leading-[1.4] text-primary-foreground/80">[Subtítulo curto que explica a proposta em uma frase.]</p>
      <div className="mt-11 flex gap-4">
        {commercialMetrics.map(({ value, label }) => (
          <div key={label} className="w-fit rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] px-6 py-4">
            <strong className="block font-display text-[36px] leading-none text-primary-foreground">{value}</strong>
            <span className="mt-2 block text-[16px] text-primary-foreground/70">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

/* ---------- 02 Sobre ---------- */
const Sobre = () => (
  <Slide n={2} name="Sobre a MyTS" decor={<LightEcho />}>
    <Header n="01" label="Sobre a MyTS" />
    <div className="mt-4 grid flex-1 grid-cols-[1fr_520px] items-center gap-14">
      <div>
        <Title size={56}>My Trusted Source.<br /><span className="text-accent">O nome já diz o que somos.</span></Title>
        <p className="mt-6 max-w-[760px] text-[23px] leading-[1.45] text-foreground/75">A MyTS nasceu para resolver o que planilha e e-mail nunca deram conta: provar, todos os dias, que cada fornecedor está em dia.</p>
        <div className="mt-8 space-y-4">
          {([[ShieldCheck, "Base única de verdade", "Documentos, certidões e histórico centralizados e auditáveis."], [ClipboardCheck, "Fluxos auditáveis", "Homologação, autoavaliação e RNC com etapas e evidências."], [Network, "Rede de campo", "Mais de 100 auditores e especialistas no Brasil e no exterior."]] as const).map(([I, t, d]) => (
            <div key={t} className="flex items-center gap-5"><IconBox icon={I} /><div><strong className="block text-[22px] text-foreground">{t}</strong><span className="text-[18px] text-muted-foreground">{d}</span></div></div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl bg-primary">
        <img src={industriaImg} alt="Linha de produção na indústria de alimentos" loading="eager" width={1024} height={768} className="h-[180px] w-full object-cover" />
        <div className="p-8">
          <img src={mytsLogo} alt="MyTS" className="h-[36px] w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          <p className="mt-5 text-[20px] leading-[1.45] text-primary-foreground/85">Tecnologia e conhecimento técnico juntos para centralizar dados, integrar fluxos e acelerar decisões em toda a cadeia.</p>
          <p className="mt-6 text-[14px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.14em" }}>Onde estamos</p>
          <div className="mt-3 space-y-2 text-[18px] text-primary-foreground">
            <p className="flex items-center gap-3"><MapPin size={18} className="text-accent-glow" />Botucatu · SP · Brasil</p>
            <p className="flex items-center gap-3"><MapPin size={18} className="text-accent-glow" />Charlotte · NC · EUA</p>
            <p className="flex items-center gap-3"><Globe2 size={18} className="text-accent-glow" />Operação em +20 países</p>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 03 Clientes ---------- */
const Clientes = () => (
  <Slide n={3} name="Clientes" decor={<LightEcho />}>
    <Header n="02" label="Quem confia na MyTS" />
    <Title size={50}>Marcas que confiam na MyTS.</Title>
    <Lead>[Frase de apoio sobre a base de clientes.]</Lead>
    <div className="my-auto grid grid-cols-3 gap-5">
      {commercialClients.slice(0, 6).map((c) => (
        <div key={c.name} className="flex h-[150px] items-center justify-center rounded-lg border border-border bg-card px-6 shadow-card">
          <img src={c.src} alt={c.name} loading="eager" className="max-h-[78px] max-w-full object-contain" />
        </div>
      ))}
    </div>
  </Slide>
);

/* ---------- 04 Divisor de seção ---------- */
const Divisor = () => (
  <Slide n={4} name="Divisor de seção" dark decor={<DarkEcho pos="-bottom-40 -right-20" size={640} />}>
    <div className="flex flex-1 flex-col justify-center">
      <span className="font-display text-[140px] font-bold leading-none text-accent-glow">03</span>
      <h2 className="mt-6 max-w-[1000px] font-display text-[72px] font-bold leading-[1.05] text-primary-foreground">[Nome da seção]</h2>
      <p className="mt-6 max-w-[820px] text-[26px] leading-[1.4] text-primary-foreground/75">[Uma frase que introduz o que vem a seguir.]</p>
    </div>
  </Slide>
);

/* ---------- 05 Problema (dor) ---------- */
const Problema = () => (
  <Slide n={5} name="Problema / cenário atual" decor={<LightEcho side="left" />}>
    <Header n="03" label="Cenário atual" />
    <div className="grid flex-1 grid-cols-[0.9fr_1.1fr] items-center gap-14">
      <div>
        <Title size={50}>[O problema que o cliente vive, <span className="text-accent">em uma frase forte.</span>]</Title>
        <div className="mt-8 space-y-5">
          {["[Dor 1 — ex.: documentos espalhados em e-mails]", "[Dor 2 — ex.: vencimentos descobertos na auditoria]", "[Dor 3 — ex.: cobrança manual de fornecedores]"].map((t) => (
            <p key={t} className="flex items-start gap-3 text-[21px] text-foreground"><AlertTriangle size={24} className="mt-0.5 shrink-0 text-destructive" />{t}</p>
          ))}
        </div>
      </div>
      <Window title="Caixa de entrada · Qualidade">
        <div className="space-y-3 p-6">
          {[["RE: RE: Laudo atualizado??", "Fornecedor A", "há 12 dias"], ["Certificado vencido — urgente", "Auditoria", "ontem"], ["Planilha_fornecedores_v7_FINAL.xlsx", "Compras", "há 3 dias"], ["Cadê a ficha técnica?", "P&D", "hoje"]].map(([a, b, c], i) => (
            <div key={a} className={`flex items-center gap-4 rounded-lg border px-5 py-4 ${i === 1 ? "border-destructive/30 bg-destructive/5" : "border-border"}`}>
              <Mail size={20} className={i === 1 ? "text-destructive" : "text-muted-foreground"} />
              <div className="flex-1"><strong className="block text-[18px] text-foreground">{a}</strong><span className="text-[15px] text-muted-foreground">{b}</span></div>
              <span className="text-[14px] text-muted-foreground">{c}</span>
            </div>
          ))}
        </div>
      </Window>
    </div>
  </Slide>
);

/* ---------- 06 Antes x Depois ---------- */
const AntesDepois = () => (
  <Slide n={6} name="Antes x depois" decor={<LightEcho />}>
    <Header n="04" label="O que muda" />
    <Title size={50}>[Do jeito antigo para o jeito MyTS.]</Title>
    <div className="my-auto grid grid-cols-[1fr_auto_1fr] items-center gap-8">
      <div className="rounded-2xl border border-border bg-secondary p-8">
        <p className="text-[16px] font-bold uppercase text-muted-foreground" style={{ letterSpacing: "0.14em" }}>Antes</p>
        <div className="mt-5 space-y-4">{["[E-mail e planilha]", "[Cobrança manual]", "[Histórico perdido]"].map((t) => <p key={t} className="flex items-center gap-3 text-[22px] text-foreground/80"><XCircle size={24} className="shrink-0 text-destructive" />{t}</p>)}</div>
      </div>
      <span className="grid size-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-cta"><ArrowRight size={30} /></span>
      <div className="rounded-2xl border border-accent/30 bg-card p-8 shadow-elegant">
        <p className="text-[16px] font-bold uppercase text-accent" style={{ letterSpacing: "0.14em" }}>Com a MyTS</p>
        <div className="mt-5 space-y-4">{["[Base única e auditável]", "[Fornecedor notificado]", "[Histórico preservado]"].map((t) => <p key={t} className="flex items-center gap-3 text-[22px] font-semibold text-foreground"><CheckCircle2 size={24} className="shrink-0 text-success" />{t}</p>)}</div>
      </div>
    </div>
  </Slide>
);

/* ---------- 07 Três cards ---------- */
const TresCards = () => (
  <Slide n={7} name="Três módulos / três pilares" decor={<LightEcho />}>
    <Header n="05" label="Estrutura de contratação · SaaS" />
    <Title>Uma plataforma. Três módulos para contratar.</Title>
    <div className="my-auto grid grid-cols-3 gap-7">
      {([[FileStack, "Meus Documentos", "Gestão documental & Lista Mestra"], [Handshake, "Meus Fornecedores", "Gestão e desenvolvimento B2B"], [Workflow, "Processos e Autoavaliação", "Workflows inteligentes & RNC"]] as const).map(([I, name, sub], i) => (
        <div key={name} className="rounded-lg border border-border bg-card p-7 shadow-card">
          <div className="flex items-center justify-between"><IconBox icon={I} /><span className="text-[17px] font-bold text-muted-foreground">MÓDULO 0{i + 1}</span></div>
          <h3 className="mt-6 text-[28px] font-bold leading-[1.15] text-foreground">{name}</h3>
          <p className="mt-2 text-[18px] font-bold text-accent">{sub}</p>
          <p className="mt-4 text-[20px] leading-[1.4] text-muted-foreground">[Descrição curta em até duas linhas.]</p>
        </div>
      ))}
    </div>
  </Slide>
);

/* ---------- 08 Texto + mockup ---------- */
const TextoMockup = () => (
  <Slide n={8} name="Texto + tela da plataforma" decor={<LightEcho side="left" />}>
    <div className="grid flex-1 grid-cols-[0.8fr_1.2fr] items-center gap-12">
      <div>
        <Header n="06" label="Módulo 1 de 3" />
        <div className="mt-6"><Pill>Meus Documentos</Pill></div>
        <Title size={50}>[Benefício principal do módulo em uma frase.]</Title>
        <p className="mt-5 text-[21px] leading-[1.45] text-foreground/75">[Explicação curta de como funciona.]</p>
        <Checks items={["[Benefício 1]", "[Benefício 2]", "[Benefício 3]"]} />
      </div>
      <Window title="MyTS · Meus Documentos">
        <div className="p-7">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-5 py-3 text-[17px] text-muted-foreground"><Search size={20} />Buscar documento, norma ou responsável</div>
          <div className="mt-5 grid grid-cols-3 gap-4">{[["128", "documentos ativos"], ["07", "vencem em 30 dias"], ["96%", "lista mestra em dia"]].map(([v, l], i) => <div key={l} className={`rounded-xl px-5 py-4 ${i === 1 ? "bg-accent/10" : "bg-secondary"}`}><strong className="block text-[32px] leading-none text-foreground">{v}</strong><span className="mt-2 block text-[15px] text-muted-foreground">{l}</span></div>)}</div>
          <div className="mt-5 space-y-3">{([["POP — Higienização de linha", "vigente", true], ["Certificado FSSC 22000", "vence em 12 dias", false], ["Laudo microbiológico", "vigente", true]] as const).map(([a, b, ok]) => <div key={a} className="flex items-center gap-4 rounded-xl border border-border px-5 py-3"><FileText size={20} className="text-accent" /><span className="flex-1 text-[18px] font-semibold text-foreground">{a}</span><span className={`rounded-full px-3 py-1 text-[14px] font-bold ${ok ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{b}</span></div>)}</div>
          <div className="mt-5 flex items-start gap-3 rounded-lg bg-accent/10 p-4"><BellRing size={22} className="shrink-0 text-accent" /><p className="text-[16px] text-foreground"><strong>Alerta automático</strong> — responsável notificado 30 dias antes do vencimento.</p></div>
        </div>
      </Window>
    </div>
  </Slide>
);

/* ---------- 09 Fluxo / etapas ---------- */
const Fluxo = () => (
  <Slide n={9} name="Fluxo / metodologia" dark decor={<DarkEcho pos="-bottom-48 -right-32" size={460} />}>
    <Header n="07" label="Como funciona" dark />
    <Title dark size={50}>[Do pedido à aprovação, <span className="text-accent-glow">em quatro etapas.</span>]</Title>
    <div className="my-auto grid grid-cols-4 gap-5">
      {["Solicitar", "Enviar", "Validar", "Aprovar"].map((t, i) => (
        <div key={t} className="relative rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-7">
          <span className="font-display text-[48px] font-bold leading-none text-accent-glow">0{i + 1}</span>
          <h3 className="mt-4 text-[26px] font-bold text-primary-foreground">{t}</h3>
          <p className="mt-3 text-[18px] leading-[1.4] text-primary-foreground/70">[Descrição curta da etapa.]</p>
          {i < 3 && <ArrowRight size={26} className="absolute -right-[19px] top-1/2 -translate-y-1/2 text-accent-glow" />}
        </div>
      ))}
    </div>
  </Slide>
);

/* ---------- 10 Números ---------- */
const Numeros = () => (
  <Slide n={10} name="Números / resultados" decor={<LightEcho />}>
    <Header n="08" label="Resultados" />
    <Title size={50}>[O impacto em números.]</Title>
    <div className="my-auto grid grid-cols-3 gap-7">
      {[["[00]", "[indicador 1]"], ["[00%]", "[indicador 2]"], ["[00 dias]", "[indicador 3]"]].map(([v, l]) => (
        <div key={l} className="rounded-2xl border border-border bg-card p-9 shadow-card">
          <strong className="block font-display text-[76px] font-bold leading-none text-accent">{v}</strong>
          <span className="mt-4 block text-[22px] text-muted-foreground">{l}</span>
        </div>
      ))}
    </div>
  </Slide>
);

/* ---------- 11 Serviços com foto ---------- */
const Servicos = () => (
  <Slide n={11} name="Foto + cards (serviços)" decor={<LightEcho side="left" />}>
    <Header n="09" label="Além do SaaS · Serviços MyTS" />
    <Title size={50}>Solução para gerir. Especialistas para agir.</Title>
    <div className="my-auto grid grid-cols-[440px_1fr] items-center gap-8">
      <div className="relative h-[420px] overflow-hidden rounded-3xl">
        <img src={auditoriaImg} alt="Auditora em visita técnica na indústria" loading="eager" width={1024} height={768} className="h-[240px] w-full object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 bg-primary p-7">
          <strong className="block font-display text-[64px] leading-none text-accent-glow">100+</strong>
          <p className="mt-2 text-[18px] text-primary-foreground/90">auditores e especialistas no Brasil e no exterior.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {["[Serviço 1]", "[Serviço 2]", "[Serviço 3]", "[Serviço 4]"].map((t) => (
          <div key={t} className="flex items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-card"><IconBox icon={ShieldCheck} /><div><h3 className="text-[23px] font-bold text-foreground">{t}</h3><p className="mt-2 text-[19px] leading-[1.4] text-muted-foreground">[Descrição curta.]</p></div></div>
        ))}
      </div>
    </div>
  </Slide>
);

/* ---------- 12 Investimento ---------- */
const Investimento = () => (
  <Slide n={12} name="Investimento / tabela" decor={<LightEcho />}>
    <Header n="10" label="Investimento" />
    <Title size={50}>[Proposta de investimento.]</Title>
    <div className="my-auto grid grid-cols-[1.3fr_0.7fr] gap-8">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="grid grid-cols-[1fr_200px] bg-secondary px-7 py-4 text-[16px] font-bold uppercase text-muted-foreground" style={{ letterSpacing: "0.1em" }}><span>Item</span><span className="text-right">Valor / mês</span></div>
        {["[Módulo / item 1]", "[Módulo / item 2]", "[Módulo / item 3]"].map((t) => <div key={t} className="grid grid-cols-[1fr_200px] border-t border-border px-7 py-5 text-[21px]"><span className="text-foreground">{t}</span><span className="text-right font-bold text-foreground">R$ [0.000]</span></div>)}
        <div className="grid grid-cols-[1fr_200px] border-t border-border bg-accent/10 px-7 py-5 text-[23px] font-bold"><span className="text-foreground">Total mensal</span><span className="text-right text-accent">R$ [0.000]</span></div>
      </div>
      <div className="rounded-2xl bg-primary p-8">
        <p className="text-[15px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.14em" }}>Implantação</p>
        <strong className="mt-3 block font-display text-[52px] leading-none text-primary-foreground">R$ [0.000]</strong>
        <p className="mt-4 text-[19px] leading-[1.4] text-primary-foreground/75">[Condição de pagamento, piloto ou observação.]</p>
      </div>
    </div>
  </Slide>
);

/* ---------- 13 Depoimento ---------- */
const Depoimento = () => (
  <Slide n={13} name="Depoimento" dark decor={<DarkEcho pos="-top-24 -right-24" size={520} />}>
    <Header n="11" label="Quem usa, recomenda" dark />
    <div className="flex flex-1 flex-col justify-center">
      <Quote size={64} className="text-accent-glow" />
      <p className="mt-6 max-w-[1250px] font-display text-[46px] font-bold leading-[1.2] text-primary-foreground">“Em duas semanas, já tínhamos todos os fornecedores cadastrados e as solicitações em andamento.”</p>
      <p className="mt-8 text-[22px] text-primary-foreground/75"><strong className="text-primary-foreground">Daiane</strong> · Gerente de Compras, MMFoods</p>
    </div>
  </Slide>
);

/* ---------- 14 Encerramento ---------- */
const Encerramento = () => (
  <Slide n={14} name="Encerramento / contato" dark decor={<><Grid dark /><Glyph size={760} tone="light" opacity={0.05} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark>Vamos conversar</Pill></div>
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h2 className="max-w-[1200px] font-display text-[56px] font-bold leading-[1.08] text-primary-foreground">Visibilidade total e controle completo<br /><span className="text-accent-glow">da sua cadeia de suprimentos.</span></h2>
      <div className="mt-10 flex gap-4">
        <span className="flex items-center gap-3 rounded-xl bg-accent px-6 py-4 text-[21px] font-bold text-accent-foreground"><Mail size={23} />[nome@myt-s.com]</span>
        <span className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[21px] font-bold text-primary-foreground"><MessageCircle size={23} />[+55 14 0 0000-0000]</span>
        <span className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[21px] font-bold text-primary-foreground"><Globe2 size={23} />myt-s.com</span>
      </div>
    </div>
  </Slide>
);

const ApresentacaoPadrao = () => {
  const print = usePrintMode();
  return (
    <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 40, overflowX: "hidden" }}>
      <Helmet><title>MyTS — Apresentação Padrão</title><meta name="description" content="Modelos de slides padrão da MyTS: capa, sobre, clientes, fluxos, mockups, investimento e encerramento." /></Helmet>
      <style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>
      {!print && <Button onClick={() => window.open(`${window.location.pathname}?print`, "_blank")} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download />Baixar PDF</Button>}
      {[Capa, Sobre, Clientes, Divisor, Problema, AntesDepois, TresCards, TextoMockup, Fluxo, Numeros, Servicos, Investimento, Depoimento, Encerramento].map((C, i) => <C key={i} />)}
    </main>
  );
};

export default ApresentacaoPadrao;
