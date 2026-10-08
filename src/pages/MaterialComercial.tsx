import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle, ArrowRight, ExternalLink, BarChart3, BellRing, Check, CheckCircle2, ClipboardCheck, Download,
  Eye, Factory, FileStack, FileText, Gauge, Globe2, Handshake, ListChecks, Mail, MapPin,
  MessageCircle, Network, Search, ShieldCheck, Users, Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { commercialMetrics } from "@/lib/commercial-metrics";
import { commercialClients, commercialNews } from "@/lib/commercial-proof";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg?raw";
import industriaImg from "@/assets/material/industria-alimentos.jpg";
import auditoriaImg from "@/assets/material/auditoria-campo.jpg";

/* Material comercial MyTS — follow-up do SDR. Mesmo sistema visual da apresentação institucional. */
const W = 1600;
const H = 900;
const P = 64;
const TOTAL = 11;

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
const markSvg = mytsMark.replace(/fill="white"/g, 'fill="currentColor"').replace('width="173" height="179"', 'width="100%" height="100%"');
/** Símbolo MyTS pintado com um token (sólido ou gradiente). */
const Glyph = ({ size, tone = "accent", opacity = 1, className = "", style }: { size: number; tone?: "accent" | "glow" | "light" | "navy" | "gradient"; opacity?: number; className?: string; style?: React.CSSProperties }) => {
  const color = { accent: "hsl(var(--accent))", glow: "hsl(var(--accent-glow))", light: "hsl(var(--primary-foreground))", navy: "hsl(var(--primary))", gradient: "hsl(var(--accent-glow))" }[tone];
  return <div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ width: size, height: size * 179 / 173, color, opacity, ...style }} dangerouslySetInnerHTML={{ __html: markSvg }} />;
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

/* ---------- Slides ---------- */
const S01 = () => (
  <Slide n={1} dark decor={<><Grid dark /><div aria-hidden className="absolute -left-40 -top-40 size-[560px] rounded-full bg-accent/25 blur-[130px]" /><Glyph size={560} tone="gradient" opacity={0.5} className="-right-[90px] top-[140px]" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark>Material para você conhecer a MyTS</Pill></div>
    <div className="flex flex-1 flex-col justify-center">
      <p className="text-[22px] font-semibold uppercase text-accent-glow" style={{ letterSpacing: "0.16em" }}>My Trusted Source</p>
      <h1 className="mt-6 max-w-[980px] font-display text-[70px] font-bold leading-[1.03] text-primary-foreground">Empresas, fornecedores e processos conectados em uma <span className="text-accent-glow">cadeia confiável.</span></h1>
      <p className="mt-7 max-w-[820px] text-[26px] leading-[1.4] text-primary-foreground/80">Plataforma inteligente para Compras, Qualidade, P&amp;D, ESG e Compliance.</p>
      <div className="mt-11 flex gap-4">
        {commercialMetrics.map(({ value, label }) => [value, label]).map(([v, l]) => (
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

const ClientSlide = () => (
  <Slide n={3} decor={<LightEcho />}>
    <Header n="02" label="Clientes MyTS" />
    <Title size={50}>Confiança construída com quem faz a cadeia acontecer.</Title>
    <p className="mt-4 text-[22px] text-muted-foreground">Indústria, varejo e agroindústria. Empresas que já confiam na MyTS.</p>
    <div className="my-auto grid grid-cols-4 gap-3">
      {commercialClients.map((client) => <div key={client.name} className="flex h-[82px] items-center gap-5 rounded-lg border border-border bg-card px-5">
        <div className="flex h-[62px] w-[130px] shrink-0 items-center justify-center"><img src={client.src} alt={client.name} loading="eager" className="max-h-[58px] max-w-full object-contain" /></div>
        <span className="text-[17px] font-semibold leading-[1.3] text-foreground">{client.name}</span>
      </div>)}
    </div>
  </Slide>
);

const ProofSlide = () => (
  <Slide n={4} decor={<LightEcho />}>
    <Header n="03" label="Projetos e presença na imprensa" />
    <Title size={50}>Projetos reais. Repercussão além da plataforma.</Title>
    <div className="mt-6 grid min-h-0 flex-1 grid-cols-[0.95fr_1.05fr] gap-12">
      <div className="flex flex-col justify-center gap-8">
        <div className="border-l-4 border-accent pl-7">
          <img src={commercialClients[0].src} alt="Carrefour" className="h-[54px] max-w-[190px] object-contain object-left" />
          <h3 className="mt-4 font-display text-[29px] font-bold text-foreground">Jornada da Autonomia</h3>
          <p className="mt-3 text-[21px] leading-[1.45] text-muted-foreground">Monitoramento e desenvolvimento da cadeia de frutas, legumes e verduras, com visibilidade dos fornecedores diretos e indiretos.</p>
          <div className="mt-5 flex items-center gap-3 text-[17px] font-bold text-accent"><span>Mapear</span><ArrowRight size={19} /><span>Monitorar</span><ArrowRight size={19} /><span>Desenvolver</span></div>
        </div>
        <div className="border-l-4 border-success pl-7">
          <img src={commercialClients[1].src} alt="Korin" className="h-[54px] max-w-[170px] object-contain object-left" />
          <h3 className="mt-4 font-display text-[29px] font-bold text-foreground">Korin 360 · Tecnologia MyTS 360</h3>
          <p className="mt-3 text-[21px] leading-[1.45] text-muted-foreground">Dados de origem, boas práticas e sustentabilidade transformados em informação acessível para o consumidor.</p>
          <div className="mt-5 flex items-center gap-3 text-[17px] font-bold text-success"><span>Coletar</span><ArrowRight size={19} /><span>Validar</span><ArrowRight size={19} /><span>Comunicar</span></div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="mb-3 text-[16px] font-bold uppercase text-accent">Na imprensa</p>
        <div className="space-y-3">{commercialNews.map((news) => <article key={news.url} className="rounded-lg border border-border bg-card px-5 py-4 shadow-card">
          <div className="flex items-center justify-between gap-4"><span className="text-[21px] font-bold text-accent">{news.publisher}</span><span className="text-[15px] text-muted-foreground">{news.date}</span></div>
          <h3 className="mt-2 text-[19px] font-bold leading-[1.25] text-foreground">{news.title}</h3>
          <p className="mt-2 text-[16px] leading-[1.35] text-muted-foreground">{news.summary}</p>
          <Button asChild variant="link" className="mt-1 h-auto justify-start p-0 text-[15px] font-bold text-accent"><a href={news.url} target="_blank" rel="noopener noreferrer">Ler matéria<ExternalLink size={15} /></a></Button>
        </article>)}</div>
        <p className="mt-2 text-[13px] text-muted-foreground">Fontes: Valor Econômico, TI Inside e Inforchannel.</p>
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
  <Slide n={5} dark decor={<DarkEcho size={460} />}>
    <Header n="04" label="Metodologia MyTS" dark />
    <Title dark size={50}>Uma jornada completa. Uma base confiável.</Title>
    <p className="mt-4 text-[22px] text-primary-foreground/75">Da conexão com o parceiro ao acompanhamento contínuo da sua cadeia.</p>
    <div className="my-auto grid grid-cols-3 gap-8">
      {[
        { icon: Search, title: "Prospecção", description: "Encontre fornecedores e especialistas para as necessidades da sua operação." },
        { icon: Workflow, title: "Homologação", description: "Defina requisitos, envolva as áreas e registre cada análise até a aprovação." },
        { icon: BellRing, title: "Monitoramento", description: "Acompanhe validades, novas evidências e pendências depois da homologação." },
      ].map((step, i) => { const Icon = step.icon; return <div key={step.title}>
        <div className="flex items-center gap-4 border-t border-accent-glow/40 pt-5"><span className="grid size-12 place-items-center rounded-lg bg-accent/20 text-accent-glow"><Icon size={26} /></span><span className="text-[19px] font-bold text-accent-glow">0{i + 1}</span>{i < 2 && <ArrowRight className="ml-auto text-accent-glow" size={26} />}</div>
        <h3 className="mt-5 text-[30px] font-bold text-primary-foreground">{step.title}</h3>
        <p className="mt-3 h-[90px] text-[20px] leading-[1.45] text-primary-foreground/75">{step.description}</p>
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card text-foreground">
          <div className="border-b border-border bg-secondary px-4 py-3 text-[15px] text-muted-foreground">MyTS · {step.title}</div>
          <div className="h-[192px] p-5">
            {i === 0 ? <><p className="flex items-center gap-2 rounded-lg bg-secondary p-3 text-[16px] text-muted-foreground"><Search size={18} />Ingredientes e embalagens</p>{["Alimentos Litoral", "Embalagens Prisma"].map(x => <p key={x} className="mt-4 flex items-center justify-between text-[17px] font-semibold">{x}<Handshake size={19} className="text-accent" /></p>)}</> : i === 1 ? <><p className="text-[18px] font-bold">12 de 16 requisitos concluídos</p><div className="my-5 h-3 rounded-full bg-secondary"><div className="h-full w-3/4 rounded-full bg-accent" /></div><p className="text-[16px] text-muted-foreground">Documentos → Análise → Aprovação</p><p className="mt-4 flex items-center gap-2 text-[16px] text-success"><CheckCircle2 size={19} />Análise técnica registrada</p></> : <><p className="text-[18px] font-bold">Evidências e alertas em dia</p><p className="mt-5 flex items-center gap-3 text-[16px]"><BellRing size={20} className="text-destructive" />Certificado vence em 12 dias</p><p className="mt-4 flex items-center gap-3 text-[16px]"><CheckCircle2 size={20} className="text-success" />Novo laudo recebido</p><p className="mt-4 text-[15px] text-muted-foreground">Histórico pronto para auditoria</p></>}
          </div>
        </div>
      </div>; })}
    </div>
  </Slide>
);

const S05 = () => (
  <Slide n={6} decor={<LightEcho />}>
    <Header n="05" label="Estrutura de contratação · SaaS" />
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
  <Slide n={7} decor={<LightEcho side="left" />}>
    <div className="grid flex-1 grid-cols-[0.8fr_1.2fr] items-center gap-12">
      <div>
        <Header n="06" label="Módulo 1 de 3" />
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
  <Slide n={8} decor={<LightEcho />}>
    <Header n="07" label="Módulo 2 de 3 · Meus Fornecedores" />
    <div className="grid flex-1 grid-cols-[0.85fr_1.15fr] items-center gap-14">
      <div>
        <Title size={48}>Solicite. Acompanhe.<br /><span className="text-accent">Preserve o histórico.</span></Title>
        <p className="mt-6 text-[22px] leading-[1.45] text-foreground/75">Seu fornecedor participa diretamente, enquanto sua empresa mantém o controle de cada informação.</p>
        <div className="mt-8 space-y-6">{[[ListChecks, "Produto, requisito e fornecedor", "Certidões, laudos e dados técnicos no contexto certo."], [Users, "Acesso e notificações", "O parceiro recebe a solicitação, responde e anexa documentos."], [FileStack, "Histórico centralizado", "Solicitações, respostas, anexos e análises preservados."]].map(([I, title, text]) => { const Icon = I as typeof ListChecks; return <div key={String(title)} className="flex items-start gap-4"><Icon size={26} className="mt-1 shrink-0 text-accent" /><div><h3 className="text-[22px] font-bold text-foreground">{String(title)}</h3><p className="mt-2 text-[19px] leading-[1.4] text-muted-foreground">{String(text)}</p></div></div>; })}</div>
      </div>
      <SupMock />
    </div>
  </Slide>
);

const S08 = () => (
  <Slide n={9} dark decor={<DarkEcho pos="-bottom-48 -right-32" size={480} />}>
    <Header n="08" label="Módulo 3 de 3 · Processos e Autoavaliação" dark />
    <div className="grid flex-1 grid-cols-[0.75fr_1.25fr] items-center gap-12">
      <div>
        <Title dark size={46}>Sua rotina.<br />Seu fluxo.<br /><span className="text-accent-glow">Tudo acompanhado.</span></Title>
        <p className="mt-6 text-[21px] leading-[1.5] text-primary-foreground/75">Transforme qualquer procedimento em etapas com prazos e responsáveis para validar, aceitar e aprovar.</p>
        <div className="mt-8 space-y-5">{[[Workflow, "Etapas e pessoas", "Cada entrega segue o fluxo definido pela sua empresa."], [ClipboardCheck, "Checklists e formulários", "Notas, registros operacionais e evidências no mesmo lugar."], [AlertTriangle, "Desvios com tratativa", "RNC automática e acompanhamento dos planos de ação."]].map(([I,t,d])=>{const Icon=I as typeof Workflow;return <div key={String(t)} className="flex gap-3"><Icon className="mt-1 shrink-0 text-accent-glow" size={25}/><div><h3 className="text-[21px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-1 text-[18px] leading-[1.4] text-primary-foreground/75">{String(d)}</p></div></div>;})}</div>
      </div>
      <Window title="MyTS · Meus Processos · Visão geral">
        <div className="p-6">
          <div className="flex items-center justify-between"><h3 className="text-[24px] font-bold text-foreground">Processos da operação</h3><span className="text-[14px] text-muted-foreground">Exemplo ilustrativo</span></div>
          <div className="mt-5 grid grid-cols-3 gap-3">{[["6", "tipos de processo"], ["248", "envios realizados"], ["19", "em andamento"]].map(([v,l])=><div key={l} className="rounded-lg bg-secondary p-4"><strong className="block text-[30px] text-foreground">{v}</strong><span className="text-[14px] text-muted-foreground">{l}</span></div>)}</div>
          <div className="mt-6 grid grid-cols-[1fr_65px_115px] gap-3 border-b border-border pb-3 text-[14px] font-bold text-muted-foreground"><span>Processo / categoria</span><span>Envios</span><span>Acompanhamento</span></div>
          {[["Autoavaliação · Ingredientes", "84", "72 concluídos"], ["Autoavaliação · Embalagens", "56", "51 concluídos"], ["Autoavaliação · Serviços", "32", "28 concluídos"], ["Inspeção de BPF", "40", "40 concluídos"], ["Liberação de produção", "24", "22 concluídos"], ["Recebimento de materiais", "12", "12 concluídos"]].map(([t,n,status])=><div key={t} className="grid grid-cols-[1fr_65px_115px] items-center gap-3 border-b border-border py-4"><span className="text-[17px] font-semibold text-foreground">{t}</span><span className="text-[18px] font-bold text-accent">{n}</span><span className="text-[14px] text-muted-foreground">{status}</span></div>)}
          <p className="mt-5 flex items-center gap-2 text-[15px] font-semibold text-accent"><Workflow size={19}/>Preencher → Validar → Aceitar → Aprovar</p>
        </div>
      </Window>
    </div>
  </Slide>
);

const S09 = () => (
  <Slide n={10} decor={<LightEcho side="left" />}>
    <div className="flex flex-1 flex-col">
      <Header n="09" label="Além do SaaS · Serviços MyTS" />
      <Title size={50}>Software para gerir. Especialistas para agir.</Title>
      <p className="mt-4 text-[22px] text-muted-foreground">Além dos três módulos, a MyTS oferece serviços técnicos para apoiar sua operação e desenvolver sua cadeia.</p>
      <div className="my-auto grid grid-cols-[440px_1fr] items-center gap-8">
        <div className="relative h-[430px] overflow-hidden rounded-3xl">
          <img src={auditoriaImg} alt="Auditora em visita técnica na indústria" loading="eager" width={1024} height={768} className="h-[240px] w-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 bg-primary p-7">
            <strong className="block font-display text-[64px] leading-none text-accent-glow">100+</strong>
            <p className="mt-2 text-[18px] leading-[1.35] text-primary-foreground/90">auditores e especialistas no Brasil e no exterior.</p>
            <div className="mt-4 flex items-center gap-3 text-[15px] font-semibold text-primary-foreground">
              <span className="flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2"><MapPin size={15} className="text-accent-glow" />Botucatu</span>
              <span className="h-px flex-1 border-t-2 border-dashed border-accent-glow/60" />
              <span className="flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2"><MapPin size={15} className="text-accent-glow" />Charlotte</span>
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
  <Slide n={11} dark decor={<><Grid dark /><Glyph size={760} tone="light" opacity={0.05} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark>Vamos conversar</Pill></div>
    <div className="flex flex-1 flex-col items-center justify-center text-center">
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
      {[S01, S02, ClientSlide, ProofSlide, S03, S05, S06, S07, S08, S09, S10].map((C, i) => <C key={i} />)}
    </main>
  );
};

export default MaterialComercial;
