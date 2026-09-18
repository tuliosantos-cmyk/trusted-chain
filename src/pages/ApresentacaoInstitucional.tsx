import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle, ArrowRight, BellRing, Building2, Check, CheckCircle2, ClipboardCheck,
  Clock3, Download, FileCheck2, FileSpreadsheet, FileText, FolderOpen, Globe2, Leaf,
  Mail, MapPin, MessageCircle, PackageCheck, RefreshCw, Search, ShieldAlert, ShieldCheck,
  Sparkles, TrendingUp, UploadCloud, UserCheck, Users, Workflow, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import korinScene from "@/assets/korin/mockup-qr-embalagem.jpg";

const W = 1600;
const H = 900;
const P = 64;

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => setPrint(new URLSearchParams(window.location.search).has("print")), []);
  return print;
};

const Slide = ({ children, dark = false, decor }: { children: React.ReactNode; dark?: boolean; decor?: React.ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  const print = usePrintMode();
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    if (print || !ref.current) return;
    const el = ref.current;
    const update = () => setScale(el.clientWidth / W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [print]);
  const activeScale = print ? 1 : scale;
  return (
    <section
      ref={ref}
      className={`${dark ? "bg-primary" : "bg-background"} relative slide-frame`}
      style={print ? { width: W, height: H, overflow: "hidden", breakAfter: "page" } : { width: "min(100%, calc((100vh - 64px) * 16 / 9))", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 16, scrollSnapAlign: "center" }}
    >
      <div className={`${dark ? "bg-primary" : "bg-background"} absolute left-0 top-0 overflow-hidden`} style={{ width: W, height: H, transform: `scale(${activeScale})`, transformOrigin: "top left", visibility: activeScale ? "visible" : "hidden" }}>
        {decor}
        <div className="relative flex h-full w-full flex-col" style={{ padding: P }}>{children}</div>
      </div>
    </section>
  );
};

const Grid = ({ dark = false }: { dark?: boolean }) => <div aria-hidden className={`absolute inset-0 ${dark ? "opacity-20" : "opacity-40"} grid-pattern`} />;
const Mark = ({ className = "" }: { className?: string }) => <img src={mytsMark} alt="" aria-hidden className={`pointer-events-none absolute select-none opacity-[0.06] ${className}`} />;
const Logo = ({ src, alt, h = 34, invert = false }: { src: string; alt: string; h?: number; invert?: boolean }) => <img src={src} alt={alt} className="w-auto object-contain" style={{ height: h, filter: invert ? "brightness(0) invert(1)" : undefined }} />;
const BrandName = ({ children, dark = false, size = 25 }: { children: React.ReactNode; dark?: boolean; size?: number }) => (
  <span className={`font-display font-bold ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size }}>{children}</span>
);

const Header = ({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) => (
  <div className={`flex items-center gap-4 text-[15px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`} style={{ letterSpacing: "0.16em" }}>
    <span>{n}</span><span className={`h-px w-14 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} />{label}
  </div>
);
const Title = ({ children, dark = false, size = 48 }: { children: React.ReactNode; dark?: boolean; size?: number }) => <h2 className={`font-display font-bold leading-[1.08] ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size, marginTop: 20, maxWidth: 1240 }}>{children}</h2>;
const Pill = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <span className={`inline-flex items-center rounded-full border px-4 py-2 text-[15px] font-semibold ${dark ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground" : "border-accent/25 bg-accent/10 text-accent"}`}>{children}</span>;

const Window = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
    <div className="flex h-12 items-center gap-2 border-b border-border bg-secondary px-5">
      <i className="size-2.5 rounded-full bg-destructive/70" /><i className="size-2.5 rounded-full bg-accent/70" /><i className="size-2.5 rounded-full bg-success/70" />
      <span className="ml-3 text-[14px] text-muted-foreground">{title}</span>
    </div>
    {children}
  </div>
);

const S01 = () => <Slide dark decor={<><Grid dark /><Mark className="-bottom-48 -right-24 w-[700px]" /></>}>
  <div className="flex items-center justify-between"><Logo src={mytsLogo} alt="MyTS" h={44} invert /><Pill dark>Apresentação institucional</Pill></div>
  <div className="flex flex-1 items-center">
    <div className="max-w-[1240px]">
      <p className="text-[22px] font-semibold uppercase text-accent-glow" style={{ letterSpacing: "0.16em" }}>My Trusted Source</p>
      <h1 className="mt-6 font-display text-[76px] font-bold leading-[1.02] text-primary-foreground">Sua cadeia de fornecedores,<br /><span className="text-accent-glow">sem você cobrar ninguém.</span></h1>
      <p className="mt-8 max-w-[940px] text-[28px] leading-[1.4] text-primary-foreground/85">Tecnologia e conhecimento técnico para transformar conformidade em uma rotina contínua, compartilhada e rastreável.</p>
    </div>
  </div>
  <div className="flex items-center justify-between border-t border-primary-foreground/15 pt-5 text-[17px] text-primary-foreground/75"><span>Gestão de fornecedores • processos • documentos</span><span>myt-s.com</span></div>
</Slide>;

const S02 = () => {
  const flow = [{ icon: FileSpreadsheet, t: "Planilha" }, { icon: Mail, t: "Cobrança" }, { icon: FolderOpen, t: "Pasta" }, { icon: AlertTriangle, t: "Vencimento" }];
  return <Slide decor={<Grid />}><Header n="02" label="O modelo atual" /><Title>Como a gestão de fornecedores costuma funcionar.</Title>
    <div className="mt-8 grid flex-1 grid-cols-[0.92fr_1.08fr] gap-10">
      <div className="flex flex-col justify-center"><p className="text-[25px] leading-[1.55] text-foreground/80">A rotina de qualidade ainda se apoia em planilhas, e-mails e pastas de rede. A equipe cobra cada fornecedor, sobe arquivos manualmente e descobre vencimentos quando já é tarde.</p><div className="mt-8 rounded-2xl bg-primary p-7"><p className="font-display text-[30px] font-bold text-primary-foreground">Isso não é falha da equipe.<br /><span className="text-accent-glow">É o modelo.</span></p></div></div>
      <div className="flex items-center justify-center rounded-3xl border border-border bg-card p-8 shadow-card"><div className="grid w-full grid-cols-2 gap-5">{flow.map(({ icon: Icon, t }, i) => <Fragment key={t}><div className="relative flex min-h-[170px] flex-col justify-between rounded-2xl border border-border bg-secondary p-6"><span className="grid size-14 place-items-center rounded-xl bg-background text-accent"><Icon size={28} /></span><div><span className="text-[15px] font-bold text-muted-foreground">0{i + 1}</span><p className="mt-1 text-[25px] font-bold text-foreground">{t}</p></div>{i === 3 && <span className="absolute right-5 top-5 size-3 animate-pulse rounded-full bg-destructive" />}</div></Fragment>)}</div></div>
    </div>
  </Slide>;
};

const S03 = () => <Slide dark decor={<><Grid dark /><Mark className="-right-36 top-8 w-[520px]" /></>}><Header n="03" label="O custo invisível" dark /><Title dark>Quando a operação cobra, a estratégia espera.</Title>
  <div className="mt-9 grid flex-1 grid-cols-2 gap-5">{[
    [Clock3, "Auditoria vira corrida", "Documentos que já deveriam estar prontos precisam ser perseguidos às pressas."],
    [ShieldAlert, "Risco passa despercebido", "Uma pendência parada pode virar não conformidade sem que a empresa perceba."],
    [BellRing, "Vencimentos chegam tarde", "O alerta acontece depois do prazo, não antes da decisão."],
    [RefreshCw, "Talento gasto em cobrança", "A equipe de qualidade opera anexos quando deveria analisar risco."],
  ].map(([I, t, d]) => { const Icon = I as typeof Clock3; return <div key={String(t)} className="flex items-center gap-6 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-7"><span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-destructive/15 text-destructive"><Icon size={30} /></span><div><h3 className="text-[27px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-2 text-[20px] leading-[1.45] text-primary-foreground/80">{String(d)}</p></div></div> })}</div>
</Slide>;

const S04 = () => <Slide decor={<><Grid /><Mark className="-bottom-32 -right-20 w-[520px]" /></>}><Header n="04" label="Quem é a MyTS" /><Title>Nascemos dentro da indústria para resolver o que planilha e e-mail nunca deram conta.</Title>
  <div className="mt-8 grid flex-1 grid-cols-[1.15fr_0.85fr] gap-8"><div className="flex flex-col justify-center rounded-3xl bg-primary p-10"><Logo src={mytsLogo} alt="MyTS" h={44} invert /><p className="mt-8 text-[25px] leading-[1.55] text-primary-foreground/85">A MyTS combina tecnologia com consultoria especializada para centralizar dados, integrar fluxos e acelerar decisões na cadeia de fornecedores.</p><div className="mt-8 flex gap-3"><Pill dark>Alimentos</Pill><Pill dark>Bebidas</Pill><Pill dark>Cosméticos</Pill><Pill dark>Bens de consumo</Pill></div></div>
  <div className="grid grid-cols-2 gap-5">{[[MapPin,"Botucatu","Brasil"],[Globe2,"Charlotte","Estados Unidos"],[Globe2,"20+","países atendidos"],[Users,"4 áreas","Compras • Qualidade • P&D • Marca própria"]].map(([I,v,l])=>{const Icon=I as typeof MapPin;return <div key={String(l)} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-card"><Icon className="text-accent" size={30}/><div><strong className="block text-[32px] text-foreground">{String(v)}</strong><span className="mt-1 block text-[18px] leading-snug text-muted-foreground">{String(l)}</span></div></div>})}</div></div>
</Slide>;

const S05 = () => <Slide dark decor={<Grid dark />}><Header n="05" label="O diferencial" dark /><Title dark>O fornecedor não precisa ser cobrado.</Title>
  <p className="mt-4 max-w-[1150px] text-[23px] leading-[1.5] text-primary-foreground/80">Ele tem acesso próprio e gratuito, acompanha pendências, envia evidências e demonstra conformidade direto para o comprador.</p>
  <div className="mt-8 flex flex-1 items-center gap-5">{[
    [Building2,"Comprador","Define requisitos"],[Workflow,"MyTS","Orienta e avisa"],[Users,"Fornecedor","Resolve pendências"],[ShieldCheck,"Qualidade","Valida e decide"],
  ].map(([I,t,d],i,a)=>{const Icon=I as typeof Building2;return <Fragment key={String(t)}><div className={`flex h-[300px] flex-1 flex-col justify-between rounded-3xl border p-8 ${i===1?"border-accent/50 bg-accent/15":"border-primary-foreground/15 bg-primary-foreground/[0.06]"}`}><span className="grid size-16 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Icon size={32}/></span><div><span className="text-[15px] font-bold uppercase text-accent-glow" style={{letterSpacing:"0.12em"}}>0{i+1}</span><h3 className="mt-2 text-[28px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-2 text-[19px] text-primary-foreground/75">{String(d)}</p></div></div>{i<a.length-1&&<ArrowRight className="shrink-0 text-accent-glow" size={28}/>}</Fragment>})}</div>
  <div className="flex justify-center gap-8 border-t border-primary-foreground/15 pt-5 text-[20px] text-primary-foreground"><span>✓ A equipe valida, não opera</span><span>✓ A MyTS avisa antes</span><span>✓ Na auditoria, a equipe confirma</span></div>
</Slide>;

const SupplierMock = () => <Window title="Meus Fornecedores"><div className="grid grid-cols-[220px_1fr] min-h-[480px]"><aside className="border-r border-border bg-secondary p-5"><p className="text-[15px] font-bold text-foreground">Visão da cadeia</p>{["Todos", "Em conformidade", "Atenção", "Pendentes"].map((x,i)=><div key={x} className={`mt-3 rounded-lg px-3 py-3 text-[15px] ${i===0?"bg-accent text-accent-foreground":"text-muted-foreground"}`}>{x}</div>)}</aside><div className="p-6"><div className="flex justify-between"><div><p className="text-[14px] text-muted-foreground">Conformidade geral</p><strong className="text-[38px] text-foreground">92%</strong></div><span className="grid size-14 place-items-center rounded-xl bg-success/10 text-success"><TrendingUp/></span></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[92%] bg-success"/></div><div className="mt-6 space-y-3">{[["Cooperativa Vale Verde","Completo","ok"],["Embalagens Prisma","Vence em 12 dias","warn"],["Aromas Sul","Completo","ok"],["Transporte Frio BR","Aguardando envio","pending"]].map(([n,s,k])=><div key={n} className="flex items-center justify-between rounded-xl border border-border p-4"><div className="flex items-center gap-3"><i className={`size-3 rounded-full ${k==="ok"?"bg-success":k==="warn"?"bg-accent":"bg-muted-foreground"}`}/><span className="text-[17px] font-semibold text-foreground">{n}</span></div><span className="text-[14px] text-muted-foreground">{s}</span></div>)}</div></div></div></Window>;
const S06 = () => <Slide><Header n="06" label="Módulo 01" /><div className="mt-4 grid flex-1 grid-cols-[0.72fr_1.28fr] items-center gap-10"><div><Pill>Meus Fornecedores</Pill><h2 className="mt-6 font-display text-[50px] font-bold leading-[1.08] text-foreground">Homologação e desenvolvimento em um único fluxo.</h2><p className="mt-6 text-[22px] leading-[1.5] text-foreground/75">Documentos, requisitos técnicos e desempenho com histórico auditável. O fornecedor resolve pendências; o comprador acompanha tudo em tempo real.</p><div className="mt-7 space-y-3">{["Conta própria e gratuita", "Status visível para os dois lados", "Alertas automáticos de vencimento"].map(x=><p key={x} className="flex items-center gap-3 text-[19px] text-foreground"><CheckCircle2 className="text-success" size={22}/>{x}</p>)}</div></div><SupplierMock /></div></Slide>;

const S07 = () => <Slide><Header n="07" label="Módulo 02" /><div className="mt-4 grid flex-1 grid-cols-[0.76fr_1.24fr] items-center gap-10"><div><Pill>Meus Processos</Pill><h2 className="mt-6 font-display text-[50px] font-bold leading-[1.08] text-foreground">A rotina da qualidade, sem planilha solta.</h2><p className="mt-6 text-[22px] leading-[1.5] text-foreground/75">Autoavaliações, checklists e registros automatizados, configurados de acordo com o padrão de cada empresa.</p></div><Window title="Fluxo de autoavaliação"><div className="p-7"><div className="flex items-center justify-between"><div><p className="text-[15px] text-muted-foreground">Processo ativo</p><h3 className="text-[27px] font-bold text-foreground">Qualificação anual de fornecedor</h3></div><Pill>76% concluído</Pill></div><div className="mt-8 space-y-4">{[[Check,"Convite enviado","Concluído"],[ClipboardCheck,"Autoavaliação respondida","Concluído"],[Search,"Validação técnica","Em análise"],[FileCheck2,"Plano de ação","Próxima etapa"]].map(([I,t,s],i)=>{const Icon=I as typeof Check; return <div key={String(t)} className="flex items-center gap-5"><span className={`grid size-14 place-items-center rounded-full ${i<2?"bg-success text-success-foreground":i===2?"bg-accent text-accent-foreground":"bg-secondary text-muted-foreground"}`}><Icon size={24}/></span><div className="flex-1 rounded-xl border border-border p-4"><div className="flex justify-between"><strong className="text-[18px] text-foreground">{String(t)}</strong><span className="text-[14px] text-muted-foreground">{String(s)}</span></div></div></div>})}</div></div></Window></div></Slide>;

const S08 = () => <Slide><Header n="08" label="Módulo 03" /><div className="mt-4 grid flex-1 grid-cols-[0.72fr_1.28fr] items-center gap-10"><div><Pill>Meus Documentos</Pill><h2 className="mt-6 font-display text-[50px] font-bold leading-[1.08] text-foreground">Tudo pronto antes da auditoria chegar.</h2><p className="mt-6 text-[22px] leading-[1.5] text-foreground/75">Gestão documental interna com versionamento, vencimento e histórico auditável — sem depender de links, pendrives ou pastas físicas.</p></div><Window title="Central de documentos"><div className="p-7"><div className="flex items-center gap-4"><div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-3 text-[15px] text-muted-foreground"><Search size={18}/>Buscar documento, norma ou responsável</div><span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground"><UploadCloud/></span></div><div className="mt-6 grid grid-cols-3 gap-4">{[["1.284","Válidos"],["18","A vencer"],["06","Em revisão"]].map(([v,l],i)=><div key={l} className={`rounded-xl p-5 ${i===1?"bg-accent/10":"bg-secondary"}`}><strong className="text-[30px] text-foreground">{v}</strong><span className="block text-[14px] text-muted-foreground">{l}</span></div>)}</div><div className="mt-5 space-y-3">{[["Certificação FSSC 22000","v.04","12/2027"],["Laudo microbiológico","v.08","11/2026"],["Política de fornecedores","v.12","Sem vencimento"]].map(([a,b,c])=><div key={a} className="grid grid-cols-[1fr_100px_140px] rounded-xl border border-border p-4 text-[16px]"><strong className="text-foreground">{a}</strong><span className="text-muted-foreground">{b}</span><span className="text-muted-foreground">{c}</span></div>)}</div></div></Window></div></Slide>;

const S09 = () => <Slide dark decor={<><Grid dark /><Mark className="-bottom-40 -left-20 w-[560px]" /></>}><Header n="09" label="Além do software" dark /><Title dark>Tecnologia com suporte técnico para fazer acontecer.</Title><p className="mt-4 text-[22px] text-primary-foreground/80">Quando a empresa precisa de mais do que uma ferramenta, nosso time entra na operação.</p><div className="mt-8 grid flex-1 grid-cols-2 gap-5">{[[Users,"Outsourcing de qualidade","Apoio técnico contínuo para sustentar a operação."],[ShieldCheck,"Auditoria de 2ª parte","Avaliação direta do fornecedor segundo o padrão da empresa."],[ClipboardCheck,"Validação técnica","Autoavaliação respondida pelo fornecedor e validada por especialista."],[Sparkles,"Implementação guiada","Parametrização e adoção assistidas desde o primeiro dia."]].map(([I,t,d])=>{const Icon=I as typeof Users;return <div key={String(t)} className="flex items-center gap-6 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-7"><span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Icon size={30}/></span><div><h3 className="text-[26px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-2 text-[19px] leading-[1.45] text-primary-foreground/80">{String(d)}</p></div></div>})}</div></Slide>;

const S10 = () => <Slide><Header n="10" label="Case • Jornada da Autonomia" /><div className="mt-5 grid flex-1 grid-cols-[0.86fr_1.14fr] gap-10"><div className="flex flex-col justify-center"><div className="inline-flex w-fit items-center gap-4 rounded-2xl border border-success/25 bg-success/10 px-6 py-4"><Leaf className="text-success" size={34}/><BrandName size={29}>Jornada da Autonomia</BrandName></div><h2 className="mt-8 font-display text-[45px] font-bold leading-[1.08] text-foreground">Desenvolvimento que alcança onde a auditoria tradicional não chega.</h2><p className="mt-6 text-[21px] leading-[1.5] text-foreground/75">Programa criado para o Grupo Carrefour e estendido ao Sam's Club e Atacadão, com governança compartilhada e alcance aos tiers 1, 2 e 3.</p></div><div className="flex flex-col justify-center rounded-3xl bg-primary p-9"><p className="text-[15px] font-bold uppercase text-accent-glow" style={{letterSpacing:"0.14em"}}>Três trilhas integradas</p><div className="mt-7 grid grid-cols-3 gap-4">{[[Users,"Social"],[Leaf,"Ambiental"],[ShieldCheck,"Qualidade"]].map(([I,t])=>{const Icon=I as typeof Users;return <div key={String(t)} className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-6"><Icon className="text-accent-glow" size={34}/><strong className="text-[24px] text-primary-foreground">{String(t)}</strong></div>})}</div><div className="mt-6 flex items-center gap-3 rounded-2xl bg-accent/15 p-5 text-[18px] text-primary-foreground"><Workflow className="text-accent-glow"/>Varejistas definem requisitos; a MyTS conecta, monitora e registra a evolução.</div></div></div></Slide>;

const S11 = () => <Slide dark decor={<Grid dark />}><Header n="11" label="Case • Korin / MyTS 360°" dark /><div className="mt-6 grid flex-1 grid-cols-[0.88fr_1.12fr] gap-10"><div className="overflow-hidden rounded-3xl"><img src={korinScene} alt="Embalagem Korin com QR code e experiência digital" className="h-full w-full object-cover"/></div><div className="flex flex-col justify-center"><BrandName dark size={30}>KORIN</BrandName><h2 className="mt-7 font-display text-[45px] font-bold leading-[1.08] text-primary-foreground">Do campo à prateleira, com o produtor em evidência.</h2><p className="mt-5 text-[21px] leading-[1.5] text-primary-foreground/80">O QR code da embalagem conecta o consumidor à origem do produto, com vídeo, informação e depoimento real.</p><div className="mt-7 grid grid-cols-2 gap-4">{[["38","produtores rurais"],["116","pessoas no campo"],["13%","produção orgânica"],["47%","origem familiar"]].map(([v,l])=><div key={l} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-5"><strong className="text-[34px] text-accent-glow">{v}</strong><span className="ml-3 text-[17px] text-primary-foreground/80">{l}</span></div>)}</div></div></div></Slide>;

const S12 = () => <Slide><Header n="12" label="Confiança em escala" /><Title>Resultados construídos em cadeias reais.</Title><div className="mt-8 grid grid-cols-4 gap-5">{[[Building2,"2.000+","empresas ativas"],[FileText,"100 mil+","documentos"],[Workflow,"200+","fluxos ativos"],[Globe2,"20+","países"]].map(([I,v,l])=>{const Icon=I as typeof Building2;return <div key={String(l)} className="rounded-2xl border border-border bg-card p-7 shadow-card"><Icon className="text-accent" size={29}/><strong className="mt-6 block text-[42px] text-foreground">{String(v)}</strong><span className="text-[18px] text-muted-foreground">{String(l)}</span></div>})}</div><div className="mt-8 flex flex-1 flex-col justify-center rounded-3xl bg-secondary px-10"><p className="text-center text-[15px] font-bold uppercase text-muted-foreground" style={{letterSpacing:"0.14em"}}>Empresas que já confiam na MyTS</p><div className="mt-8 grid grid-cols-6 items-center gap-5">{["Carrefour","Korin","C.Vale","Atakarejo","Rede Martins","AVAL"].map(name=><div key={name} className="flex min-h-[86px] items-center justify-center rounded-xl border border-border bg-card px-4 text-center"><BrandName size={21}>{name}</BrandName></div>)}</div></div></Slide>;

const S13 = () => <Slide decor={<><Grid /><Mark className="-right-24 -bottom-36 w-[540px]" /></>}><Header n="13" label="Como começar" /><div className="mt-8 grid flex-1 grid-cols-[0.9fr_1.1fr] items-center gap-10"><div><Pill>Teste gratuito por 30 dias</Pill><h2 className="mt-7 font-display text-[54px] font-bold leading-[1.06] text-foreground">Veja a plataforma funcionar antes da conversa de venda.</h2><p className="mt-6 text-[22px] leading-[1.5] text-foreground/75">Sem cartão de crédito. Durante o teste, você acompanha o fornecedor usando a própria conta e enviando documentos sozinho.</p></div><div className="rounded-3xl bg-primary p-9"><p className="text-[15px] font-bold uppercase text-accent-glow" style={{letterSpacing:"0.14em"}}>Incluído no plano MyTS</p><h3 className="mt-4 text-[31px] font-bold text-primary-foreground">Sessão Estratégica de Conformidade</h3><p className="mt-3 text-[19px] leading-[1.45] text-primary-foreground/80">2 horas com um especialista para orientar a operação em FSSC 22000, BRCGS, IFS, BPF, APPCC/HACCP e gestão de fornecedores.</p><div className="mt-7 space-y-3">{["Suporte de implementação", "Configuração do primeiro fluxo", "Acompanhamento durante o teste"].map(x=><p key={x} className="flex items-center gap-3 text-[18px] text-primary-foreground"><CheckCircle2 className="text-accent-glow" size={21}/>{x}</p>)}</div></div></div></Slide>;

const S14 = () => <Slide dark decor={<><Grid dark /><Mark className="left-1/2 top-1/2 w-[720px] -translate-x-1/2 -translate-y-1/2" /></>}><div className="flex items-center justify-between"><Logo src={mytsLogo} alt="MyTS" h={44} invert/><Pill dark>Vamos conversar</Pill></div><div className="flex flex-1 flex-col items-center justify-center text-center"><h2 className="max-w-[1200px] font-display text-[60px] font-bold leading-[1.06] text-primary-foreground">Sua equipe analisa.<br/><span className="text-accent-glow">A MyTS mantém a cadeia em movimento.</span></h2><div className="mt-10 flex gap-5"><a href="mailto:tulio.santos@myt-s.com" className="flex items-center gap-3 rounded-xl bg-accent px-6 py-4 text-[19px] font-bold text-accent-foreground"><Mail size={22}/>tulio.santos@myt-s.com</a><a href="https://wa.me/5514991286962" className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[19px] font-bold text-primary-foreground"><MessageCircle size={22}/>(14) 99128-6962</a></div><p className="mt-8 text-[24px] font-semibold text-primary-foreground">Túlio dos Santos <span className="text-primary-foreground/55">• MyTS</span></p></div><div className="flex justify-between border-t border-primary-foreground/15 pt-5 text-[17px] text-primary-foreground/75"><span>myt-s.com</span><span>Botucatu, Brasil • Charlotte, EUA</span></div></Slide>;

const ApresentacaoInstitucional = () => {
  const print = usePrintMode();
  return <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 32, overflowX: "hidden" }}>
    <Helmet><title>MyTS — Apresentação institucional</title><meta name="description" content="Apresentação institucional MyTS: tecnologia e consultoria para gestão contínua de fornecedores, processos e documentos."/><meta property="og:title" content="MyTS — Apresentação institucional"/><meta property="og:description" content="Sua cadeia de fornecedores, sem você cobrar ninguém."/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/></Helmet>
    <style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>
    {!print && <Button onClick={() => window.open(`${window.location.pathname}?print`, "_blank")} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download/>Baixar PDF</Button>}
    {[S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14].map((Component,i)=><Component key={i}/>)}
  </main>;
};

export default ApresentacaoInstitucional;
