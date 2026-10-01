import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, BarChart3, BookOpen, CalendarCheck, Check, ChevronLeft, ChevronRight,
  CircleDollarSign, Clock3, Download, FileText, Flame, Gauge, Linkedin, Mail,
  MessageCircle, MonitorPlay, Phone, Search, Send, Sparkles, Target, Trophy,
  UserCheck, Users, Video, Workflow, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mytsLogo from "@/assets/myts-logo.svg";

const W = 1600;
const H = 900;
const P = 64;
const TOTAL = 9;

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
    const el = ref.current;
    const update = () => setScale(el.clientWidth / W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [print]);
  const activeScale = print ? 1 : scale;
  return <section ref={ref} data-slide={n} className={`${dark ? "bg-primary" : "bg-background"} relative slide-frame`} style={print ? { width: W, height: H, overflow: "hidden", breakAfter: "page" } : { width: "min(100%, calc((100vh - 64px) * 16 / 9))", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 12, scrollSnapAlign: "center" }}>
    <div className={`${dark ? "bg-primary" : "bg-background"} absolute left-0 top-0 overflow-hidden`} style={{ width: W, height: H, transform: `scale(${activeScale})`, transformOrigin: "top left", visibility: activeScale ? "visible" : "hidden" }}>
      <div aria-hidden className={`absolute inset-0 grid-pattern ${dark ? "opacity-20" : "opacity-40"}`} />
      <div className="relative flex h-full flex-col" style={{ padding: P }}>
        <Header n={n} label={label} dark={dark} />{children}<Footer n={n} dark={dark} />
      </div>
    </div>
  </section>;
};

const Header = ({ n, label, dark = false }: { n: number; label: string; dark?: boolean }) => <div className={`flex items-center gap-4 text-[16px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`}><span>{String(n).padStart(2, "0")}</span><span className={`h-px w-12 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} /><span>{label}</span></div>;
const Footer = ({ n, dark = false }: { n: number; dark?: boolean }) => <div className={`mt-auto flex items-end justify-between border-t pt-4 text-[15px] ${dark ? "border-primary-foreground/15 text-primary-foreground/70" : "border-border text-muted-foreground"}`}><div className="rounded-md bg-primary px-3 py-2"><img src={mytsLogo} alt="MyTS" className="h-5 w-auto" /></div><span>{String(n).padStart(2, "0")} / {TOTAL}</span></div>;
const Title = ({ children, dark = false, size = 52 }: { children: React.ReactNode; dark?: boolean; size?: number }) => <h2 className={`mt-5 max-w-[1400px] font-display font-bold leading-[1.08] ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size }}>{children}</h2>;
const Support = ({ children, dark = false, width = 1300 }: { children: React.ReactNode; dark?: boolean; width?: number }) => <p className={`mt-4 text-[23px] leading-[1.42] ${dark ? "text-primary-foreground/75" : "text-foreground/70"}`} style={{ maxWidth: width }}>{children}</p>;
const IconBox = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${dark ? "bg-accent/20 text-accent-glow" : "bg-accent/10 text-accent"}`}>{children}</span>;

const S01 = () => <Slide n={1} label="Treinamento comercial" dark>
  <div className="flex flex-1 items-center justify-between gap-16">
    <div className="max-w-[970px]"><div className="mb-9 inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-2.5 text-[17px] font-bold text-primary-foreground"><Sparkles size={20} className="text-accent-glow"/>BEM-VINDO DE VOLTA, RICARDO</div><h1 className="font-display text-[76px] font-bold leading-[1.02] text-primary-foreground">SDR na MyTS:<br/><span className="text-accent-glow">como vamos jogar</span><br/>daqui pra frente</h1><p className="mt-7 text-[27px] text-primary-foreground/75">A nova estrutura da área — rotina, cadência, processo e evolução.</p></div>
    <div className="relative grid h-[520px] w-[390px] place-items-center"><div className="absolute inset-x-0 top-10 h-px bg-accent-glow/30"/><div className="absolute bottom-10 top-10 left-1/2 w-px bg-accent-glow/30"/><div className="relative grid size-64 place-items-center rounded-full border-8 border-accent/30 bg-accent text-accent-foreground shadow-glow"><Target size={110}/></div>{[["top-0 left-0","PROSPECTAR"],["top-0 right-0","QUALIFICAR"],["bottom-0 left-0","REGISTRAR"],["bottom-0 right-0","AGENDAR"]].map(([p,t])=><span key={t} className={`absolute ${p} rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 text-[14px] font-bold text-primary-foreground`}>{t}</span>)}</div>
  </div>
</Slide>;

const S02 = () => <Slide n={2} label="O papel do SDR"><Title>O SDR não vende o sistema.<br/><span className="text-accent">Ele vende a próxima conversa.</span></Title><Support>Toda venda começa com uma porta aberta. Quem abre essa porta é o SDR.</Support>
  <div className="mt-10 flex flex-1 items-center"><div className="flex h-[330px] flex-1 flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-card"><IconBox><Search size={30}/></IconBox><div><span className="text-[15px] font-bold text-accent">ENCONTRAR</span><h3 className="mt-2 text-[29px] font-bold">Dor real</h3><p className="mt-3 text-[19px] leading-[1.4] text-foreground/65">Gestão de fornecedores, documentos e conformidade.</p></div></div><ArrowRight className="mx-6 text-accent" size={40}/><div className="flex h-[380px] flex-1 flex-col justify-between rounded-2xl border-2 border-accent bg-accent/10 p-8 shadow-elegant"><IconBox><Zap size={30}/></IconBox><div><span className="text-[15px] font-bold text-accent">DESPERTAR</span><h3 className="mt-2 text-[29px] font-bold">Interesse</h3><p className="mt-3 text-[19px] leading-[1.4] text-foreground/65">Conectar a dor do contato com uma conversa que vale a pena.</p></div></div><ArrowRight className="mx-6 text-accent" size={40}/><div className="flex h-[330px] flex-1 flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-card"><IconBox><UserCheck size={30}/></IconBox><div><span className="text-[15px] font-bold text-accent">ENTREGAR</span><h3 className="mt-2 text-[29px] font-bold">Contexto ao Closer</h3><p className="mt-3 text-[19px] leading-[1.4] text-foreground/65">Contato qualificado e pronto para avançar.</p></div></div></div>
  <div className="mb-4 flex items-center justify-center gap-4 rounded-xl bg-primary px-7 py-4 text-[20px] font-bold text-primary-foreground"><span>SDR</span><span className="h-px w-28 bg-accent-glow"/><span>+</span><span className="h-px w-28 bg-accent-glow"/><span>CLOSER</span><span className="ml-5 text-primary-foreground/70">Dois motores. Uma operação.</span></div>
</Slide>;

const S03 = () => <Slide n={3} label="Rotina em blocos" dark><Title dark>Tempo bem dividido é <span className="text-accent-glow">resultado multiplicado.</span></Title><Support dark>Quatro blocos organizam o dia e transformam atividade em aprendizado comercial.</Support>
  <div className="mt-8 grid flex-1 grid-cols-4 gap-5">{[
    ["01","PROSPECÇÃO",Search,"Contatos novos","Listas do BDR + ICP","08:00 — 10:00"],
    ["02","FOLLOW-UP",MessageCircle,"Cadência ativa","Dar sequência","10:00 — 12:00"],
    ["03","QUALIFICAÇÃO",Target,"Quem respondeu","Aprofundar a dor","14:00 — 16:00"],
    ["04","CRM",Workflow,"Registrar tudo","O que não está lá não aconteceu","16:00 — 17:00"],
  ].map(([n,t,I,a,b,time],i)=>{const Icon=I as typeof Search;return <div key={String(t)} className={`flex h-[390px] flex-col rounded-2xl border p-6 ${i===3?"border-accent bg-accent/20":"border-primary-foreground/15 bg-primary-foreground/[0.07]"}`}><div className="flex items-center justify-between"><span className="text-[44px] font-bold text-primary-foreground/20">{String(n)}</span><IconBox dark><Icon size={28}/></IconBox></div><h3 className="mt-7 text-[24px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-8 text-[20px] font-bold text-primary-foreground">{String(a)}</p><p className="mt-2 text-[17px] leading-[1.35] text-primary-foreground/65">{String(b)}</p><span className="mt-auto border-t border-primary-foreground/15 pt-4 text-[15px] font-bold text-accent-glow">{String(time)}</span></div>})}</div>
  <div className="mb-3 rounded-xl bg-primary-foreground/10 px-6 py-4 text-center text-[18px] font-semibold text-primary-foreground">Nossa ciência dos contatos: dia + horário + mercado + persona + cargo.</div>
</Slide>;

const S04 = () => <Slide n={4} label="Cadência"><Title>Cada ponto de contato tem um propósito.</Title><Support>Oito dias, múltiplos canais e uma sequência consistente para descobrir o que realmente converte.</Support>
  <div className="relative mt-12 flex flex-1 items-center"><div className="absolute left-12 right-12 top-[153px] h-2 rounded-full bg-secondary"><div className="h-full w-full rounded-full bg-accent"/></div><div className="relative z-10 grid w-full grid-cols-7 gap-4">{[
    ["D1",Linkedin,"Conexão","LinkedIn"],["D2",Phone,"Ligação","+ e-mail"],["D4",MessageCircle,"WhatsApp","+ e-mail"],["D5",FileText,"Ligação","+ PDF"],["D6",Video,"Demonstração","do módulo"],["D7",Trophy,"Case","de cliente"],["D8",CalendarCheck,"Reunião","com Closer"],
  ].map(([day,I,t,s],i)=>{const Icon=I as typeof Linkedin;return <div key={String(day)} className="flex h-[335px] flex-col items-center text-center"><span className="rounded-full bg-primary px-4 py-2 text-[16px] font-bold text-primary-foreground">{String(day)}</span><div className={`mt-6 grid size-20 place-items-center rounded-full border-8 border-background ${i===6?"bg-success text-success-foreground":"bg-accent text-accent-foreground"}`}><Icon size={31}/></div><div className="mt-7 w-full rounded-xl border border-border bg-card px-3 py-5 shadow-card"><strong className="block text-[19px]">{String(t)}</strong><span className="mt-1 block text-[15px] text-muted-foreground">{String(s)}</span></div></div>})}</div></div>
</Slide>;

const S05 = () => <Slide n={5} label="Pipeline no RD" dark><Title dark>O pipeline transforma movimento em <span className="text-accent-glow">próxima ação.</span></Title><Support dark>O RD cria tarefas, guarda o histórico e mostra exatamente onde cada lead está.</Support>
  <div className="mt-8 grid flex-1 grid-cols-[1fr_70px_1fr] items-center gap-4"><div className="h-[410px] rounded-2xl bg-primary-foreground p-7"><div className="flex items-center justify-between"><div><span className="text-[14px] font-bold text-accent">ETAPA 01</span><h3 className="mt-1 text-[30px] font-bold text-foreground">Lead recebido</h3></div><span className="grid size-14 place-items-center rounded-xl bg-accent/10 text-accent"><Users size={29}/></span></div><div className="mt-6 grid grid-cols-2 gap-3">{["LP / formulário","LinkedIn / Google Ads","Lista do gestor","Lead scoring / indicação"].map(x=><span key={x} className="rounded-lg bg-secondary px-4 py-3 text-[15px] font-semibold text-foreground">{x}</span>)}</div><div className="mt-6 rounded-xl border-l-4 border-accent bg-accent/10 p-5"><div className="flex items-center gap-3"><Clock3 className="text-accent"/><strong className="text-[20px]">SLA: até 24h</strong></div><p className="mt-2 text-[16px] text-foreground/65">Primeira tentativa feita → o lead avança.</p></div></div><ArrowRight className="text-accent-glow" size={52}/><div className="h-[410px] rounded-2xl border-2 border-accent bg-accent/15 p-7"><div className="flex items-center justify-between"><div><span className="text-[14px] font-bold text-accent-glow">ETAPA 02</span><h3 className="mt-1 text-[30px] font-bold text-primary-foreground">Em prospecção</h3></div><span className="grid size-14 place-items-center rounded-xl bg-accent text-accent-foreground"><Zap size={29}/></span></div><div className="mt-6 flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-4"><div className="text-[50px] font-bold text-primary-foreground">7</div><div><strong className="block text-[18px] text-primary-foreground">dias multicanal</strong><span className="text-[15px] text-primary-foreground/65">tarefas automáticas por etapa</span></div></div><div className="mt-5 grid grid-cols-2 gap-4"><div className="rounded-xl bg-success/20 p-4"><Check className="text-success"/><strong className="mt-3 block text-[17px] text-primary-foreground">Respondeu</strong><span className="text-[14px] text-primary-foreground/65">Contato engajado</span></div><div className="rounded-xl bg-destructive/15 p-4"><Clock3 className="text-destructive"/><strong className="mt-3 block text-[17px] text-primary-foreground">Cadência esgotada</strong><span className="text-[14px] text-primary-foreground/65">Perdido / Nutrição</span></div></div></div></div>
</Slide>;

const S06 = () => <Slide n={6} label="Qualificação"><Title>Reunião boa é reunião com <span className="text-accent">timing.</span></Title><Support>Antes de passar ao Closer, o SDR precisa completar o mapa de decisão.</Support>
  <div className="mt-8 grid flex-1 grid-cols-[1.12fr_.88fr] gap-7"><div className="grid grid-cols-2 gap-4">{[[UserCheck,"Quem decide?"],[Flame,"Quais são as dores?"],[MonitorPlay,"Quais módulos e serviços?"],[Zap,"Existe urgência?"],[CircleDollarSign,"Quando entra o orçamento?"],[CalendarCheck,"Qual a previsão de implantação?"]].map(([I,t],i)=>{const Icon=I as typeof UserCheck;return <div key={String(t)} className={`flex items-center gap-5 rounded-xl border p-5 ${i===5?"border-accent bg-accent/10":"border-border bg-card"}`}><span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={23}/></span><strong className="text-[19px] leading-[1.25]">{String(t)}</strong></div>})}</div><div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"><div className="flex h-14 items-center gap-2 border-b border-border bg-secondary px-5"><span className="size-2.5 rounded-full bg-destructive/70"/><span className="size-2.5 rounded-full bg-accent/70"/><span className="size-2.5 rounded-full bg-success/70"/><span className="ml-4 text-[14px] font-bold text-muted-foreground">RD CRM · Qualificação</span></div><div className="p-6"><div className="flex items-center justify-between"><div><span className="text-[13px] font-bold text-accent">OPORTUNIDADE</span><h3 className="text-[24px] font-bold">Indústria Aurora</h3></div><span className="rounded-full bg-success/15 px-4 py-2 text-[14px] font-bold text-success">6 / 6</span></div><div className="mt-7 space-y-3">{["Decisor identificado","Dor documentada","Escopo de interesse","Urgência confirmada","Ciclo de orçamento","Previsão de implantação"].map(x=><div key={x} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3 text-[15px] font-semibold"><span>{x}</span><Check size={19} className="text-success"/></div>)}</div></div></div></div>
  <div className="mb-3 rounded-xl bg-primary px-6 py-4 text-center text-[19px] font-bold text-primary-foreground">Sem essas respostas, a proposta fica parada no CRM.</div>
</Slide>;

const S07 = () => <Slide n={7} label="Passagem de bastão" dark><Title dark>O cliente chega ao Closer <span className="text-accent-glow">sem precisar repetir nada.</span></Title><Support dark>Uma passagem bem feita protege a experiência do cliente e acelera a proposta.</Support>
  <div className="mt-10 flex flex-1 items-center"><div className="w-[340px] rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-8 text-center"><span className="mx-auto grid size-24 place-items-center rounded-full bg-accent text-accent-foreground"><Target size={45}/></span><h3 className="mt-5 text-[31px] font-bold text-primary-foreground">SDR</h3><p className="mt-2 text-[17px] text-primary-foreground/65">Descobre, qualifica e registra</p></div><div className="relative flex-1 px-8"><div className="h-2 rounded-full bg-accent"/><span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-8 border-primary bg-accent text-accent-foreground"><ArrowRight size={34}/></span></div><div className="w-[620px] rounded-2xl bg-primary-foreground p-7"><div className="flex items-center justify-between"><div><span className="text-[14px] font-bold text-accent">HANDOFF COMPLETO</span><h3 className="mt-1 text-[28px] font-bold">Reunião pronta para avançar</h3></div><UserCheck size={42} className="text-accent"/></div><div className="mt-6 grid grid-cols-2 gap-3">{["Briefing do cliente","CRM atualizado","Convite no Google Agenda","Agendamento nos KPIs"].map(x=><div key={x} className="flex items-center gap-3 rounded-xl bg-secondary p-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-success text-success-foreground"><Check size={18}/></span><strong className="text-[16px]">{x}</strong></div>)}</div><div className="mt-5 rounded-xl border-l-4 border-accent bg-accent/10 px-5 py-4 text-[15px] font-semibold text-foreground/70">Lead de marketing? O feedback detalhado melhora as próximas campanhas.</div></div></div>
</Slide>;

const S08 = () => <Slide n={8} label="Seu arsenal"><Title>Ferramentas e conteúdo para abrir portas.</Title><Support>O SDR combina mensagem certa, material certo e histórico completo — tudo conectado à cadência.</Support>
  <div className="mt-9 grid flex-1 grid-cols-2 gap-7"><div className="rounded-2xl border border-border bg-card p-7 shadow-card"><div className="flex items-center gap-4"><IconBox><BookOpen size={29}/></IconBox><div><span className="text-[14px] font-bold text-accent">CONTEÚDO</span><h3 className="text-[28px] font-bold">Materiais</h3></div></div><div className="mt-6 grid grid-cols-2 gap-3">{[[FileText,"Script de vendas"],[MessageCircle,"Script de objeções"],[MonitorPlay,"Apresentação comercial"],[Video,"Vídeos demonstrativos"],[BookOpen,"Blogs"],[Trophy,"Cases"]].map(([I,t])=>{const Icon=I as typeof FileText;return <div key={String(t)} className="flex items-center gap-3 rounded-xl bg-secondary p-4"><Icon size={22} className="text-accent"/><strong className="text-[16px]">{String(t)}</strong></div>})}</div></div><div className="rounded-2xl border-2 border-accent bg-accent/10 p-7 shadow-elegant"><div className="flex items-center gap-4"><IconBox><Workflow size={29}/></IconBox><div><span className="text-[14px] font-bold text-accent">OPERAÇÃO</span><h3 className="text-[28px] font-bold">Ferramentas</h3></div></div><div className="mt-6 space-y-3">{[[Workflow,"RD CRM","Automação de vendas"],[Phone,"Telefone virtual","Chamadas registradas"],[MessageCircle,"WhatsApp","Conversas integradas"],[Mail,"E-mail","Histórico no CRM"],[Gauge,"Landing pages","Origem rastreada"]].map(([I,t,s])=>{const Icon=I as typeof Workflow;return <div key={String(t)} className="flex items-center gap-4 rounded-xl bg-card p-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon size={20}/></span><div><strong className="block text-[16px]">{String(t)}</strong><span className="text-[13px] text-muted-foreground">{String(s)}</span></div></div>})}</div></div></div>
</Slide>;

const S09 = () => <Slide n={9} label="Medir e crescer" dark><Title dark>O que medimos mostra <span className="text-accent-glow">como melhorar.</span></Title><Support dark>Resultado é consequência de rotina visível, aprendizado contínuo e consistência.</Support>
  <div className="mt-8 grid flex-1 grid-cols-[1.12fr_.88fr] gap-7"><div className="grid grid-cols-5 gap-3">{[[BarChart3,"Atividades","por dia","48"],[Clock3,"Primeiro","contato","<24h"],[MessageCircle,"Resposta","por canal","—"],[CalendarCheck,"Agenda →","conversão","—"],[Users,"Taxa de","no-show","—"]].map(([I,a,b,v],i)=>{const Icon=I as typeof BarChart3;return <div key={String(a)} className={`flex h-[320px] flex-col rounded-2xl border p-5 ${i===1?"border-accent bg-accent/20":"border-primary-foreground/15 bg-primary-foreground/[0.07]"}`}><Icon size={28} className="text-accent-glow"/><span className="mt-auto text-[40px] font-bold text-primary-foreground">{String(v)}</span><strong className="mt-3 text-[17px] text-primary-foreground">{String(a)}</strong><span className="text-[15px] text-primary-foreground/60">{String(b)}</span><div className="mt-5 flex h-12 items-end gap-1">{[35,55,42,76,62,88].map((h,j)=><span key={j} className={`flex-1 rounded-t-sm ${i===1?"bg-accent-glow":"bg-accent/50"}`} style={{height:`${h}%`}}/>)}</div></div>})}</div><div className="flex flex-col justify-between rounded-2xl bg-primary-foreground p-8"><div><span className="text-[14px] font-bold text-accent">CULTURA DE EVOLUÇÃO</span><h3 className="mt-3 text-[31px] font-bold text-foreground">Cada “não” ensina alguma coisa.</h3><p className="mt-5 text-[19px] leading-[1.45] text-foreground/65">Até o agendamento, o SDR ouve muitos deles. Faz parte do jogo — e alimenta a nossa receita.</p></div><div className="space-y-3">{["Dailys para ajustar rápido","Reconhecimento da consistência","Formação contínua","Prospecção Fanática como ponto de partida"].map(x=><div key={x} className="flex items-center gap-3 rounded-xl bg-secondary p-4"><Check size={20} className="text-success"/><strong className="text-[16px]">{x}</strong></div>)}</div></div></div>
  <div className="mb-3 flex items-center justify-center gap-4 rounded-xl bg-accent px-7 py-4 text-[25px] font-bold text-accent-foreground"><Send size={27}/>Bora abrir portas.</div>
</Slide>;

const SLIDES = [S01,S02,S03,S04,S05,S06,S07,S08,S09];

const TreinamentoSdr = () => {
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
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [print]);
  const go = (n: number) => document.querySelector<HTMLElement>(`[data-slide="${Math.min(TOTAL, Math.max(1, n))}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  return <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 32, overflowX: "hidden" }}>
    <Helmet><title>Treinamento SDR — MyTS</title><meta name="description" content="Treinamento da operação SDR MyTS: rotina, cadência, qualificação, pipeline e indicadores."/><meta property="og:title" content="Treinamento SDR — MyTS"/><meta property="og:description" content="Como vamos jogar daqui pra frente na operação comercial MyTS."/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/></Helmet>
    <style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>
    {!print && <><Button onClick={() => window.print()} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download/>Baixar PDF</Button><div className="no-print fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary/90 p-2 shadow-elegant backdrop-blur"><Button size="icon" variant="ghost" className="rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => go(current-1)} aria-label="Slide anterior"><ChevronLeft/></Button><span className="min-w-20 text-center text-[14px] font-bold text-primary-foreground">{current} / {TOTAL}</span><Button size="icon" variant="ghost" className="rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => go(current+1)} aria-label="Próximo slide"><ChevronRight/></Button></div></>}
    {SLIDES.map((Component,i)=><Component key={i}/>)}
  </main>;
};

export default TreinamentoSdr;
