import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown, ArrowLeft, ArrowRight, BellRing, BookOpenCheck, Box, Building2,
  CalendarClock, Check, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck,
  Clock3, Download, FileCheck2, FileText, FolderSearch, Gauge, Globe2, GraduationCap,
  Languages, LayoutDashboard, PackageCheck, Send, ShieldCheck, Sparkles, Target,
  Truck, UploadCloud, Users, Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mytsLogo from "@/assets/myts-logo.svg";
import mdsLogo from "@/assets/mds/mds-logo.png";

const W = 1600;
const H = 900;
const P = 64;
const TOTAL = 15;

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => setPrint(new URLSearchParams(window.location.search).has("print")), []);
  return print;
};

const Slide = ({ children, dark = false, n, label }: { children: React.ReactNode; dark?: boolean; n: number; label: string }) => {
  const ref = useRef<HTMLElement>(null);
  const print = usePrintMode();
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    if (print || !ref.current) return;
    const element = ref.current;
    const update = () => setScale(element.clientWidth / W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [print]);
  const activeScale = print ? 1 : scale;
  return (
    <section ref={ref} data-slide={n} className={`${dark ? "bg-primary" : "bg-background"} relative slide-frame`} style={print ? { width: W, height: H, overflow: "hidden", breakAfter: "page" } : { width: "min(100%, calc((100vh - 64px) * 16 / 9))", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 12, scrollSnapAlign: "center" }}>
      <div className={`${dark ? "bg-primary" : "bg-background"} absolute left-0 top-0 overflow-hidden`} style={{ width: W, height: H, transform: `scale(${activeScale})`, transformOrigin: "top left", visibility: activeScale ? "visible" : "hidden" }}>
        <Grid dark={dark} />
        <div className="relative flex h-full flex-col" style={{ padding: P }}>
          <Header n={n} label={label} dark={dark} />
          {children}
          <Footer n={n} dark={dark} />
        </div>
      </div>
    </section>
  );
};

const Grid = ({ dark = false }: { dark?: boolean }) => <div aria-hidden className={`absolute inset-0 grid-pattern ${dark ? "opacity-20" : "opacity-40"}`} />;
const Header = ({ n, label, dark = false }: { n: number; label: string; dark?: boolean }) => (
  <div className={`flex items-center gap-4 text-[16px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`}>
    <span>{String(n).padStart(2, "0")}</span><span className={`h-px w-12 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} /><span>{label}</span>
  </div>
);
const Footer = ({ n, dark = false }: { n: number; dark?: boolean }) => (
  <div className={`mt-auto flex items-end justify-between border-t pt-4 text-[15px] ${dark ? "border-primary-foreground/15 text-primary-foreground" : "border-border text-muted-foreground"}`}>
    <div className="flex items-center gap-4"><BrandLockup dark={dark} compact /></div><span>{String(n).padStart(2, "0")} / {TOTAL}</span>
  </div>
);
const Title = ({ children, dark = false, size = 52 }: { children: React.ReactNode; dark?: boolean; size?: number }) => <h2 className={`mt-5 max-w-[1400px] font-display font-bold leading-[1.08] ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size }}>{children}</h2>;
const Support = ({ children, dark = false, width = 1260 }: { children: React.ReactNode; dark?: boolean; width?: number }) => <p className={`mt-4 text-[23px] leading-[1.45] ${dark ? "text-primary-foreground" : "text-foreground/70"}`} style={{ maxWidth: width }}>{children}</p>;
const Logo = ({ src, alt, h = 48, invert = false }: { src: string; alt: string; h?: number; invert?: boolean }) => <img src={src} alt={alt} className="w-auto object-contain" style={{ height: h, filter: invert ? "brightness(0) invert(1)" : undefined }} />;
const BrandLockup = ({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) => (
  <div className="flex items-center gap-4">
    <div className={`flex items-center justify-center rounded-md px-3 py-1.5 ${dark ? "bg-primary-foreground" : "bg-card border border-border"}`}><Logo src={mdsLogo} alt="MDS" h={compact ? 24 : 56} /></div>
    <span className={dark ? "text-primary-foreground" : "text-muted-foreground"}>+</span>
    <Logo src={mytsLogo} alt="MyTS" h={compact ? 22 : 48} invert={dark} />
  </div>
);
const IconBox = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <span className={`grid size-16 shrink-0 place-items-center rounded-xl ${dark ? "bg-accent/20 text-accent-glow" : "bg-accent/10 text-accent"}`}>{children}</span>;
const CheckLine = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <div className={`flex items-start gap-3 text-[20px] leading-[1.4] ${dark ? "text-primary-foreground" : "text-foreground/80"}`}><CheckCircle2 className={`mt-0.5 shrink-0 ${dark ? "text-accent-glow" : "text-success"}`} size={23}/><span>{children}</span></div>;

const S01 = () => <Slide n={1} label="Plano de implantação" dark>
  <div className="mt-7"><BrandLockup dark /></div>
  <div className="flex flex-1 items-center">
    <div className="max-w-[1260px]">
      <span className="inline-flex rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-2.5 text-[18px] font-semibold text-primary-foreground">Plano de implantação</span>
      <h1 className="mt-7 font-display text-[72px] font-bold leading-[1.04] text-primary-foreground">MDS + MyTS: uma nova etapa na gestão da <span className="text-accent-glow">Qualidade</span></h1>
      <p className="mt-7 max-w-[1060px] text-[28px] leading-[1.42] text-primary-foreground">Fornecedores, processos e documentos em uma mesma rotina de gestão.</p>
    </div>
  </div>
</Slide>;

const S02 = () => {
  const rows = [
    ["O que estamos fazendo", "Implantando a MyTS para apoiar fornecedores, processos e documentos da Qualidade."],
    ["Por que agora", "Os processos estão sendo revisados com apoio da consultoria de Heber Zana."],
    ["Por onde começamos", "Documentos dos fornecedores e recebimento de materiais."],
    ["Quem participa", "A Qualidade conduz junto às áreas que usam as informações e aos fornecedores."],
  ];
  return <Slide n={2} label="Resumo executivo"><Title>Em resumo: o projeto em uma página</Title>
    <div className="mt-7 grid flex-1 grid-cols-[1.08fr_0.92fr] gap-7">
      <div className="space-y-3">{rows.map(([k,v])=><div key={k} className="grid min-h-[95px] grid-cols-[230px_1fr] items-center rounded-xl border border-border bg-card px-6 shadow-card"><strong className="text-[19px] text-accent">{k}</strong><p className="text-[19px] leading-[1.4] text-foreground/75">{v}</p></div>)}</div>
      <div className="flex flex-col justify-between rounded-2xl bg-primary p-8"><div><p className="text-[17px] font-bold uppercase text-accent-glow">O que acontece agora</p><div className="mt-7 space-y-4">{["MDS envia as informações","MyTS configura","MDS valida","Equipe é treinada","A rotina começa"].map((x,i)=><div key={x} className="flex items-center gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-[18px] font-bold text-accent-foreground">{i+1}</span><strong className="text-[21px] text-primary-foreground">{x}</strong></div>)}</div></div><div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-5 text-[18px] text-primary-foreground">Dúvidas sobre a ferramenta<br/><strong className="text-primary-foreground">suporte@myt-s.com</strong></div></div>
    </div>
  </Slide>;
};

const S03 = () => <Slide n={3} label="Por que agora"><Title>A MDS está revisando seus processos e quer transformá-los em rotina</Title><Support>A MDS já investe na Qualidade. Agora, com o apoio da consultoria de Heber Zana, estamos revisando processos, requisitos e controles.</Support>
  <div className="mt-10 flex flex-1 items-center">{[
    [BookOpenCheck,"Revisão","Definimos como a MDS deve trabalhar."],
    [LayoutDashboard,"MyTS","O que foi definido ganha responsável, prazo e registro."],
    [Sparkles,"Rotina","O que foi definido passa a fazer parte do dia a dia."],
  ].map(([I,t,d],i,a)=>{const Icon=I as typeof BookOpenCheck;return <Fragment key={String(t)}><div className={`flex h-[330px] flex-1 flex-col justify-between rounded-2xl border p-8 shadow-card ${i===1?"border-accent bg-accent/10":"border-border bg-card"}`}><IconBox><Icon size={32}/></IconBox><div><span className="text-[16px] font-bold text-accent">ETAPA 0{i+1}</span><h3 className="mt-2 text-[31px] font-bold text-foreground">{String(t)}</h3><p className="mt-3 text-[21px] leading-[1.4] text-foreground/70">{String(d)}</p></div></div>{i<a.length-1&&<ArrowRight className="mx-5 shrink-0 text-accent" size={34}/>}</Fragment>})}</div>
</Slide>;

const S04 = () => <Slide n={4} label="Quem conduz" dark><Title dark>As regras continuam sendo da MDS; a MyTS ajuda a colocá-las em prática</Title><Support dark>A MyTS não traz um processo pronto. Ela é configurada para funcionar do jeito que a MDS decidiu trabalhar.</Support>
  <div className="mt-9 grid flex-1 grid-cols-[0.92fr_1.08fr] gap-8">
    <div className="flex items-center justify-center rounded-2xl bg-primary-foreground p-10"><Logo src={mdsLogo} alt="MDS" h={190}/></div>
    <div className="flex flex-col justify-center gap-5">{[[Users,"A experiência está na nossa equipe."],[ShieldCheck,"As regras e os critérios são da MDS."],[BellRing,"A MyTS organiza, lembra os prazos e guarda o histórico."]].map(([I,t],i)=>{const Icon=I as typeof Users;return <div key={String(t)} className={`flex items-center gap-6 rounded-2xl border p-7 ${i===2?"border-accent/50 bg-accent/20":"border-primary-foreground/15 bg-primary-foreground/[0.07]"}`}><IconBox dark><Icon size={31}/></IconBox><strong className="text-[25px] leading-[1.3] text-primary-foreground">{String(t)}</strong></div>})}</div>
  </div>
</Slide>;

const S05 = () => <Slide n={5} label="O que muda na prática"><Title>Na prática, três coisas mudam no dia a dia</Title><Support>O fornecedor ganha acesso próprio à MyTS. Ele vê o que está pendente e envia seus documentos sem precisar ser cobrado.</Support>
  <div className="mt-9 grid flex-1 grid-cols-3 gap-6">{[
    [CalendarClock,"Um documento vai vencer.","A MyTS avisa o fornecedor antes."],
    [Truck,"Um material chegou.","O recebimento fica registrado."],
    [FolderSearch,"Um cliente pediu evidência.","Está registrada e é fácil de encontrar."],
  ].map(([I,t,d],i)=>{const Icon=I as typeof CalendarClock;return <div key={String(t)} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card"><div className="flex items-center justify-between"><IconBox><Icon size={32}/></IconBox><span className="text-[48px] font-bold text-muted/70">0{i+1}</span></div><div className="mt-auto"><h3 className="text-[28px] font-bold leading-[1.2] text-foreground">{String(t)}</h3><div className="my-5 h-1 w-16 bg-accent"/><p className="text-[22px] leading-[1.42] text-foreground/72">{String(d)}</p></div></div>})}</div>
</Slide>;

const S06 = () => <Slide n={6} label="Escopo contratado"><Title>Contratamos três módulos que funcionam juntos</Title><Support>Cada módulo é uma parte da MyTS. Os três funcionam dentro da mesma ferramenta e podem trabalhar de forma integrada.</Support>
  <div className="mt-8 flex flex-1 flex-col"><div className="grid flex-1 grid-cols-3 gap-6">{[
    [Building2,"Meus Fornecedores","Aprovação de fornecedores (homologação), documentos, requisitos e avaliações."],
    [Workflow,"Meus Processos","Rotinas com etapas, responsáveis, prazos e registros, começando pelo recebimento."],
    [FileText,"Meus Documentos","Documentos internos com versão, vencimento e histórico."],
  ].map(([I,t,d])=>{const Icon=I as typeof Building2;return <div key={String(t)} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card"><IconBox><Icon size={33}/></IconBox><h3 className="mt-8 text-[29px] font-bold text-foreground">{String(t)}</h3><p className="mt-4 text-[20px] leading-[1.45] text-foreground/70">{String(d)}</p></div>})}</div><div className="relative mt-6 flex h-20 items-center justify-center rounded-xl bg-primary text-[22px] font-bold text-primary-foreground"><span className="absolute -top-6 left-[16.7%] h-6 w-px bg-accent"/><span className="absolute -top-6 left-1/2 h-6 w-px bg-accent"/><span className="absolute -top-6 right-[16.7%] h-6 w-px bg-accent"/>As mesmas informações conectam os três módulos</div></div>
</Slide>;

const S07 = () => <Slide n={7} label="Decisões da MDS" dark><Title dark>A MDS definiu como a implantação deve acontecer</Title><Support dark>Antes de começar, a Qualidade da MDS tomou decisões importantes sobre a implantação.</Support>
  <div className="mt-8 grid flex-1 grid-cols-2 gap-5">{[
    [UploadCloud,"Primeiro, organizamos o que já temos","Os documentos existentes são carregados antes de os fornecedores receberem acesso."],
    [Building2,"Duas unidades, uma visão só","As duas unidades compartilham as informações necessárias na mesma estrutura."],
    [Languages,"Cada fornecedor no seu idioma","Fornecedores de outros países recebem orientação na língua deles."],
    [GraduationCap,"Treinamento presencial","A equipe aprende com a MyTS já configurada para a realidade da MDS."],
  ].map(([I,t,d])=>{const Icon=I as typeof UploadCloud;return <div key={String(t)} className="flex items-start gap-6 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-7"><IconBox dark><Icon size={31}/></IconBox><div><h3 className="text-[25px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-3 text-[19px] leading-[1.42] text-primary-foreground">{String(d)}</p></div></div>})}</div>
</Slide>;

const S08 = () => <Slide n={8} label="Etapas da implantação"><Title>A implantação acontece em etapas, começando pelo que mais importa agora</Title><Support>Começamos pelo que a operação mais precisa. As próximas etapas entram conforme a rotina se consolida.</Support>
  <div className="mt-10 flex flex-1 items-end gap-5">{[
    ["01","AGORA","Documentos dos fornecedores e recebimento de materiais.",330,true],
    ["02","PRÓXIMA","RNC — registro do que fazer quando algo sai do padrão — e avaliação de fornecedores.",280,false],
    ["03","NA SEQUÊNCIA","Documentos internos da MDS.",230,false],
  ].map(([n,k,d,h,active])=><div key={String(n)} className={`flex flex-1 flex-col justify-between rounded-t-2xl border p-8 ${active?"border-accent bg-accent text-accent-foreground":"border-border bg-card text-foreground"}`} style={{height:Number(h)}}><div className="flex items-center justify-between"><strong className="text-[48px] opacity-40">{String(n)}</strong><span className={`rounded-full px-4 py-2 text-[15px] font-bold ${active?"bg-accent-foreground/15 text-accent-foreground":"bg-secondary text-muted-foreground"}`}>{String(k)}</span></div><p className="text-[23px] font-semibold leading-[1.4]">{String(d)}</p></div>)}</div>
</Slide>;

const S09 = () => <Slide n={9} label="Ciclo de cada etapa"><Title>Nada entra em uso sem a aprovação da MDS</Title><Support>Cada etapa segue os mesmos cinco passos. A MDS sempre revisa e aprova antes de colocar em uso.</Support>
  <div className="mt-12 flex flex-1 items-center">{[
    ["Entender","MDS","A MDS mostra como trabalha hoje."],
    ["Configurar","MyTS","A ferramenta recebe as regras da MDS."],
    ["Validar","MDS + MyTS","As duas equipes revisam e ajustam."],
    ["Treinar","MyTS","Quem vai usar aprende com tudo pronto."],
    ["Usar","MDS","A rotina passa a acontecer na MyTS."],
  ].map(([t,o,d],i,a)=><Fragment key={t}><div className={`flex h-[320px] flex-1 flex-col rounded-2xl border p-6 ${i===2?"border-accent bg-accent/10 shadow-elegant":"border-border bg-card"}`}><div className="flex items-center justify-between"><span className={`grid size-12 place-items-center rounded-full text-[18px] font-bold ${i===2?"bg-accent text-accent-foreground":"bg-secondary text-foreground"}`}>{i+1}</span>{i===2&&<span className="rounded-full bg-accent px-3 py-1.5 text-[14px] font-bold text-accent-foreground">PONTO DE CONTROLE</span>}</div><h3 className="mt-8 text-[26px] font-bold text-foreground">{t}</h3><span className="mt-2 text-[16px] font-bold text-accent">{o}</span><p className="mt-5 text-[17px] leading-[1.42] text-foreground/68">{d}</p></div>{i<a.length-1&&<ArrowRight className="mx-3 shrink-0 text-muted-foreground" size={25}/>}</Fragment>)}</div>
</Slide>;

const S10 = () => <Slide n={10} label="Além da Qualidade" dark><Title dark>A informação da Qualidade também ajuda outras áreas</Title><Support dark>Informação organizada na Qualidade ajuda quem compra, quem produz, quem vende e quem decide.</Support>
  <div className="relative mt-7 flex flex-1 items-center justify-center"><div className="absolute grid size-44 place-items-center rounded-full border-8 border-accent/25 bg-accent text-center text-[27px] font-bold text-accent-foreground shadow-glow">Qualidade</div>{[
    ["left-0 top-5",PackageCheck,"Compras","Sabe quais fornecedores estão aprovados antes de comprar."],
    ["right-0 top-5",Box,"Produção","Recebe matéria-prima de fornecedores com documentação em dia."],
    ["bottom-6 left-0",ClipboardCheck,"Comercial","Encontra os comprovantes quando um cliente audita a MDS."],
    ["bottom-6 right-0",Gauge,"Diretoria","Vê a situação dos fornecedores sem pedir relatório."],
  ].map(([pos,I,t,d])=>{const Icon=I as typeof PackageCheck;return <div key={String(t)} className={`absolute ${String(pos)} flex h-[190px] w-[500px] items-start gap-6 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-7`}><IconBox dark><Icon size={31}/></IconBox><div><h3 className="text-[25px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-3 text-[18px] leading-[1.42] text-primary-foreground">{String(d)}</p></div></div>})}<div className="absolute left-[500px] top-[185px] h-px w-[175px] bg-accent/50"/><div className="absolute right-[500px] top-[185px] h-px w-[175px] bg-accent/50"/><div className="absolute bottom-[185px] left-[500px] h-px w-[175px] bg-accent/50"/><div className="absolute bottom-[185px] right-[500px] h-px w-[175px] bg-accent/50"/></div>
</Slide>;

const S11 = () => <Slide n={11} label="Indicadores"><Title>Vamos acompanhar a evolução com quatro números</Title><Support>Primeiro acompanhamos a adoção. Com a rotina rodando, passamos a medir os resultados da operação.</Support>
  <div className="mt-9 grid flex-1 grid-cols-4 gap-5">{[
    [Users,"Fornecedores usando a MyTS","Quantos já acessam e enviam seus documentos."],
    [ShieldCheck,"Fornecedores em dia","Quantos estão sem documento pendente ou vencido."],
    [Truck,"Recebimentos registrados","Quantos já são feitos no novo processo."],
    [GraduationCap,"Pessoas treinadas","Quantos usuários da MDS já usam a MyTS no dia a dia."],
  ].map(([I,t,d])=>{const Icon=I as typeof Users;return <div key={String(t)} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card"><div className="flex items-center justify-between"><IconBox><Icon size={31}/></IconBox><strong className="text-[58px] text-accent">—</strong></div><h3 className="mt-7 text-[24px] font-bold leading-[1.22] text-foreground">{String(t)}</h3><p className="mt-4 text-[18px] leading-[1.4] text-foreground/70">{String(d)}</p><span className="mt-auto rounded-lg bg-secondary px-4 py-3 text-[15px] font-semibold text-muted-foreground">Linha de base a medir</span></div>})}</div>
</Slide>;

const S12 = () => <Slide n={12} label="Cronograma"><Title>Em outubro, preparamos a base da primeira etapa</Title><Support>O ritmo acompanha o envio das informações e as validações da nossa equipe. Nada avança sem a aprovação da MDS.</Support>
  <div className="mt-10 flex flex-1 items-center"><div className="flex flex-1 items-stretch gap-4">{[
    [LayoutDashboard,"Configuração","Regras e fornecedores da MDS na MyTS."],
    [UploadCloud,"Carga inicial","Documentos que a MDS já possui."],
    [ClipboardCheck,"Validação","Processo de recebimento revisado pela equipe."],
  ].map(([I,t,d],i)=>{const Icon=I as typeof LayoutDashboard;return <div key={String(t)} className="flex min-h-[330px] flex-1 flex-col rounded-2xl border border-border bg-card p-7 shadow-card"><div className="flex items-center justify-between"><IconBox><Icon size={31}/></IconBox><span className="text-[16px] font-bold text-accent">OUTUBRO • 0{i+1}</span></div><h3 className="mt-auto text-[27px] font-bold text-foreground">{String(t)}</h3><p className="mt-4 text-[19px] leading-[1.42] text-foreground/68">{String(d)}</p></div>})}</div><ArrowRight className="mx-6 shrink-0 text-accent" size={36}/><div className="flex min-h-[330px] w-[310px] flex-col rounded-2xl bg-primary p-7"><IconBox dark><GraduationCap size={31}/></IconBox><span className="mt-6 text-[16px] font-bold text-accent-glow">APÓS A VALIDAÇÃO</span><h3 className="mt-auto text-[27px] font-bold text-primary-foreground">Treinar e liberar</h3><p className="mt-4 text-[19px] leading-[1.42] text-primary-foreground">Treinamento presencial e acesso liberado aos fornecedores.</p></div></div>
</Slide>;

const S13 = () => <Slide n={13} label="Próximos passos" dark><Title dark>Para avançar, precisamos de três informações da MDS</Title><Support dark>Com elas, o time da MyTS segue com a preparação da ferramenta para a nossa realidade.</Support>
  <div className="mt-7 grid flex-1 grid-cols-2 gap-7"><div className="rounded-2xl bg-primary-foreground p-8"><div className="flex items-center justify-between"><h3 className="text-[29px] font-bold text-foreground">Da MDS</h3><Logo src={mdsLogo} alt="MDS" h={44}/></div><div className="mt-7 space-y-6">{["Planilha preenchida: fornecedores, usuários e documentos exigidos por tipo de fornecedor.","Como o recebimento funciona hoje: passo a passo e registros usados.","Data da primeira reunião com o time de implantação da MyTS."].map(x=><div key={x} className="flex gap-4"><span className="mt-1 size-6 shrink-0 rounded border-2 border-accent"/><p className="text-[19px] leading-[1.43] text-foreground/75">{x}</p></div>)}</div></div><div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-8"><div className="flex items-center justify-between"><h3 className="text-[29px] font-bold text-primary-foreground">Da MyTS</h3><Logo src={mytsLogo} alt="MyTS" h={38} invert/></div><div className="mt-7 space-y-6">{["Preparar a ferramenta com as informações recebidas.","Revisar tudo com a equipe da MDS antes de colocar em uso.","Treinar os usuários e orientar os fornecedores."].map(x=><CheckLine key={x} dark>{x}</CheckLine>)}</div></div></div>
</Slide>;

const S14 = () => <Slide n={14} label="E na sua área?"><Title>A MyTS também pode ajudar outras áreas</Title><Support>Começamos pela Qualidade, mas a MyTS também pode apoiar outras rotinas da MDS.</Support>
  <div className="mt-7 grid flex-1 grid-cols-3 gap-5">{[
    [FileText,"Meus Documentos","Precisa organizar documentos?",["Controlar versões e vencimentos","Encontrar uma evidência rapidamente"]],
    [Workflow,"Meus Processos","Precisa controlar uma rotina?",["Acompanhar etapas, prazos e responsáveis","Registrar o que foi feito"]],
    [Building2,"Meus Fornecedores","Precisa acompanhar fornecedores?",["Aprovar fornecedores e controlar documentos","Ver pendências resolvidas sem precisar cobrar"]],
  ].map(([I,t,q,items])=>{const Icon=I as typeof FileText;return <div key={String(t)} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card"><IconBox><Icon size={31}/></IconBox><h3 className="mt-6 text-[25px] font-bold text-accent">{String(t)}</h3><p className="mt-4 text-[25px] font-bold leading-[1.25] text-foreground">{String(q)}</p><div className="mt-6 space-y-4">{(items as string[]).map(x=><CheckLine key={x}>{x}?</CheckLine>)}</div></div>})}</div><div className="mt-5 flex items-center justify-between rounded-xl bg-secondary px-6 py-4 text-[18px] text-foreground"><strong>Tem uma rotina assim na sua área? Converse com a Qualidade.</strong><span>Dúvidas: suporte@myt-s.com</span></div>
</Slide>;

const S15 = () => <Slide n={15} label="Uma nova rotina" dark>
  <div className="mt-7"><BrandLockup dark /></div>
  <div className="flex flex-1 flex-col items-center justify-center text-center"><h2 className="max-w-[1250px] font-display text-[72px] font-bold leading-[1.05] text-primary-foreground">Qualidade não é uma área.<br/><span className="text-accent-glow">É como a MDS trabalha.</span></h2><p className="mt-7 max-w-[980px] text-[27px] leading-[1.45] text-primary-foreground">A MyTS é a ferramenta. Quem faz o projeto acontecer é a equipe da MDS, de todas as áreas.</p><div className="mt-10 flex gap-4">{["A metodologia é da MDS","A MyTS ajuda a colocar em prática","O resultado é de todos"].map((x,i)=><div key={x} className={`rounded-xl border px-6 py-4 text-[20px] font-semibold ${i===2?"border-accent bg-accent text-accent-foreground":"border-primary-foreground/20 bg-primary-foreground/[0.07] text-primary-foreground"}`}>{x}</div>)}</div></div>
</Slide>;

const SLIDES = [S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15];

const ApresentacaoImplantacaoMds = () => {
  const print = usePrintMode();
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    if (print) return;
    const onScroll = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
      const center = window.innerHeight / 2;
      const closest = sections.reduce((best, section) => Math.abs(section.getBoundingClientRect().top + section.clientHeight / 2 - center) < Math.abs(best.getBoundingClientRect().top + best.clientHeight / 2 - center) ? section : best, sections[0]);
      if (closest) setCurrent(Number(closest.dataset.slide));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [print]);
  const go = (n: number) => document.querySelector<HTMLElement>(`[data-slide="${Math.min(TOTAL, Math.max(1, n))}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  return <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 32, overflowX: "hidden" }}>
    <Helmet><title>MDS + MyTS — Plano de Implantação</title><meta name="description" content="Plano de implantação da MyTS na MDS para fornecedores, processos e documentos da Qualidade."/><meta property="og:title" content="MDS + MyTS — Plano de Implantação"/><meta property="og:description" content="Uma nova etapa na gestão da Qualidade da MDS."/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/></Helmet>
    <style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>
    {!print && <><Button onClick={() => window.print()} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download/>Baixar PDF</Button><div className="no-print fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary/90 p-2 shadow-elegant backdrop-blur"><Button size="icon" variant="ghost" className="rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => go(current-1)} aria-label="Slide anterior"><ChevronLeft/></Button><span className="min-w-20 text-center text-[14px] font-bold text-primary-foreground">{current} / {TOTAL}</span><Button size="icon" variant="ghost" className="rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => go(current+1)} aria-label="Próximo slide"><ChevronRight/></Button></div></>}
    {SLIDES.map((Component,i)=><Component key={i}/>)}
  </main>;
};

export default ApresentacaoImplantacaoMds;
