import { useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Download, Phone, ClipboardCheck, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/myts-logo.svg";
import ralston from "@/assets/ralston/ralston-logo.webp.asset.json";
import { ralstonPilot as p, ralstonSuppliers } from "@/lib/ralston-pilot";

const events = [
  ["22–23 JUL", "Kickoff e escopo", "Piloto sem custo, 2 usuários e 4 fornecedores definidos."],
  ["05–06 AGO", "Base preparada", "Requisitos enviados e onboarding dos fornecedores iniciado."],
  ["10 SET", "Piloto oficial", "Treinamentos dos três módulos concluídos."],
  ["17–29 SET", "Expansão do uso", "Mais 4 fornecedores incluídos pela própria Ralston; apoio extra em 28/09."],
  ["10 OUT", "Próxima decisão", "Encerramento do piloto e alinhamento da continuidade."],
];
const ralstonLogoUrl = location.hostname === "localhost" ? new URL(ralston.url, "https://id-preview--f991cff1-300a-49e4-bc63-d89deb2a73e4.lovable.app").href : ralston.url;
function Lockup() { return <div className="flex items-center gap-5"><img src={ralstonLogoUrl} alt="Ralston" className="h-20 w-20 object-contain"/><span className="text-muted-foreground text-2xl">×</span><span className="bg-primary px-5 py-3 rounded-lg"><img src={logo} alt="MyTS" className="h-9 w-auto"/></span></div>; }
function Frame({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const print = new URLSearchParams(location.search).has("print");
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || print) return;
    const update = () => setScale(el.clientWidth / 1600);
    update(); const observer = new ResizeObserver(update); observer.observe(el);
    return () => observer.disconnect();
  }, [print]);
  return <section ref={ref} data-slide={n} className={`ralston-frame relative overflow-hidden bg-background ${print ? "ralston-print" : "ralston-preview"}`}><div className="absolute left-0 top-0 flex flex-col bg-background ralston-canvas" style={{ transform: `scale(${print ? 1 : scale})` }}>
    <header className="flex items-center justify-between"><p className="text-accent text-[18px] font-bold uppercase flex items-center gap-4"><span>0{n}</span><span className="h-px w-12 bg-accent"/>{label}</p><span className="text-[17px] text-muted-foreground">Panorama em {p.date}</span></header>
    {children}
    <footer className="mt-auto flex items-center justify-between border-t border-border pt-4 text-[15px] text-muted-foreground"><span>Ralston × MyTS · Implantação e piloto</span><span>0{n} / 04</span></footer>
  </div></section>;
}
function Heading({ children }: { children: React.ReactNode }) { return <h2 className="mt-6 font-display text-[48px] font-bold leading-[1.12] text-foreground">{children}</h2>; }
function Overview() { return <Frame n={1} label="Evolução do piloto">
  <div className="mt-7 flex items-center justify-between"><div><h1 className="text-[64px] font-display font-bold leading-tight">Ralston <span className="text-accent">×</span> MyTS</h1><p className="mt-3 text-[25px] text-muted-foreground">Da implantação ao uso real da plataforma.</p></div><Lockup/></div>
  <div className="my-10 flex items-center gap-10 border-y border-border py-7"><div><strong className="text-[70px] font-display text-accent leading-none">4 → 8</strong><p className="mt-2 text-[20px] text-muted-foreground">fornecedores no piloto</p></div><div className="h-24 w-px bg-border"/><div><h3 className="text-[30px] font-bold">O dobro do escopo inicial.</h3><p className="mt-3 max-w-[890px] text-[23px] leading-relaxed text-muted-foreground">A Ralston ampliou a base por iniciativa própria, após os treinamentos de Documentos, Fornecedores e Processos.</p></div></div>
  <div className="relative mt-4 grid grid-cols-5 gap-7"><div aria-hidden className="absolute left-0 right-0 top-10 h-px bg-border"/>{events.map(([date,title,text],i)=><div key={date} className="relative"><p className="text-[17px] font-bold text-accent">{date}</p><span className={`my-4 block size-3 rounded-full ${i===4 ? "bg-primary" : "bg-accent"}`}/><h3 className="text-[24px] font-bold leading-tight">{title}</h3><p className="mt-3 text-[19px] leading-[1.45] text-muted-foreground">{text}</p></div>)}</div>
  <p className="mt-9 flex items-center gap-3 text-[21px] text-accent"><CalendarDays size={24}/>Piloto oficial: 10/09 a 10/10/2026 · 30 dias sem custo</p>
 </Frame>; }
function Suppliers() { return <Frame n={2} label="Meus Fornecedores">
  <Heading>132 requisitos. Uma visão clara da cadeia.</Heading>
  <div className="mt-7 grid grid-cols-[320px_1fr] gap-10">
    <aside><div className="bg-primary text-primary-foreground rounded-lg p-7"><strong className="text-[72px] font-display leading-none">33%</strong><p className="mt-3 text-[22px]">{p.accepted} requisitos aceitos</p><p className="mt-6 text-[19px] text-primary-foreground/75">4 de 8 fornecedores já responderam pela plataforma.</p></div><div className="mt-6 space-y-4">{[["83","pendentes de resposta"],["4","recusados"],["1","aguardando aprovação"]].map(([value,label])=><p key={label} className="flex items-center gap-4 border-b border-border pb-4"><strong className="text-[34px] text-accent min-w-14">{value}</strong><span className="text-[19px] text-muted-foreground">{label}</span></p>)}</div></aside>
    <div><div className="grid grid-cols-[240px_120px_150px_1fr] gap-4 border-b border-border pb-3 text-[16px] font-bold text-muted-foreground"><span>Fornecedor</span><span>Categoria</span><span>Aceitos</span><span>Situação</span></div>{ralstonSuppliers.map(s=><div key={s.name} className="grid grid-cols-[240px_120px_150px_1fr] items-center gap-4 border-b border-border py-3"><strong className="text-[21px]">{s.name}</strong><span className="text-[18px] text-muted-foreground">{s.category}</span><div><span className="text-[20px] font-bold">{s.accepted}/{s.total}</span><div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-secondary"><div className={s.state === "complete" ? "bg-success" : "bg-accent"} style={{flexBasis:`${s.accepted/s.total*100}%`}}/></div></div><span className={`text-[17px] leading-tight ${s.state === "complete" ? "text-success" : s.state === "pending" ? "text-muted-foreground" : "text-accent"}`}>{s.note}</span></div>)}<p className="mt-4 text-[14px] text-muted-foreground">Base ajustada: 15 linhas duplicadas da Adel Coco excluídas da contagem.</p></div>
  </div>
 </Frame>; }
function Processes() { return <Frame n={3} label="Processos · Autoavaliação">
  <Heading>A primeira resposta já chegou.<br/><span className="text-accent">O próximo passo é validar.</span></Heading>
  <div className="mt-9 grid grid-cols-[1.2fr_0.8fr] items-center gap-12"><div className="rounded-lg border border-border overflow-hidden bg-card shadow-card"><div className="bg-secondary border-b border-border px-6 py-4 text-[18px] text-muted-foreground">MyTS · Autoavaliação Ralston · Resumo do painel</div><div className="p-7"><div className="grid grid-cols-3 gap-6 border-b border-border pb-6">{[[p.assessmentSubmissions,"envios registrados"],[p.assessmentResponses,"resposta recebida"],[p.assessmentApproved,"avaliações aprovadas"]].map(([n,l])=><div key={l}><strong className="block text-[48px] font-display text-accent">{n}</strong><span className="text-[17px] text-muted-foreground">{l}</span></div>)}</div>{[["Adel Coco","Aguardando aprovação"],["OXQuim","Em aberto"],["Sococo","Em aberto"],["Original Chemicals","Em aberto"]].map(([name,status],i)=><div key={name} className="flex justify-between items-center border-b border-border py-5 text-[21px]"><strong>{name}</strong><span className={i===0 ? "text-accent" : "text-muted-foreground"}>{status}</span></div>)}<p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">Envios brutos incluem reenvios e um registro de teste interno. Não representam oito fornecedores únicos.</p></div></div><div><ClipboardCheck size={48} className="text-accent"/><h3 className="mt-5 text-[32px] font-bold leading-tight">Concluir o primeiro ciclo</h3><div className="mt-7 space-y-6">{["Ralston aprova a resposta da Adel Coco.","O painel passa a exibir o primeiro resultado de conformidade.","MyTS e Ralston acompanham as demais respostas."].map((text,i)=><p key={text} className="flex gap-4 text-[23px] leading-[1.4]"><span className="text-accent font-bold">0{i+1}</span>{text}</p>)}</div><p className="mt-7 text-[19px] text-muted-foreground leading-relaxed">Sem avaliações aprovadas, o indicador zerado ainda não permite concluir o nível de conformidade.</p></div></div>
 </Frame>; }
function Next() { return <Frame n={4} label="Próximos passos">
  <Heading>Consolidar as respostas.<br/><span className="text-accent">Alinhar a continuidade.</span></Heading>
  <div className="mt-10 grid grid-cols-3 gap-10">{[
    {icon:Phone,title:"Engajar fornecedores",text:"Busca ativa por telefone, com a Ralston em cópia, para Sococo, Original Chemicals, Chão Preto e Adripan."},
    {icon:CheckCircle2,title:"Concluir as análises",text:"Apoiar Grespan e OXQuim nas correções e validar a autoavaliação recebida da Adel Coco."},
    {icon:Users,title:"Organizar a próxima etapa",text:"Revisar reenvios e teste interno com o Suporte; confirmar o escopo de autoavaliação dos fornecedores originais."},
  ].map(({icon:Icon,title,text},i)=><div key={title} className="border-t border-accent pt-6"><div className="flex justify-between items-center"><Icon size={34} className="text-accent"/><span className="text-[28px] text-muted-foreground">0{i+1}</span></div><h3 className="mt-6 text-[29px] font-bold leading-tight">{title}</h3><p className="mt-5 text-[22px] leading-[1.5] text-muted-foreground">{text}</p></div>)}</div>
  <div className="mt-10 flex items-center justify-between bg-primary rounded-lg px-8 py-7 text-primary-foreground"><div><p className="text-accent-glow text-[18px] font-bold">10 OUTUBRO · FIM DO PILOTO</p><h3 className="mt-2 text-[29px] font-bold">Reunião de ativação do contrato</h3><p className="mt-3 text-[20px] text-primary-foreground/75">Condição apresentada no kickoff: {p.discount}% de desconto na mensalidade.</p></div><ArrowRight size={44} className="text-accent-glow"/></div>
 </Frame>; }
export default function ApresentacaoImplantacaoRalston() {
  const print = new URLSearchParams(location.search).has("print");
  const [current,setCurrent] = useState(1);
  const go = (delta:number) => { const n=Math.max(1,Math.min(4,current+delta)); setCurrent(n); document.querySelector(`[data-slide="${n}"]`)?.scrollIntoView({behavior:"smooth",block:"center"}); };
  return <main className={`flex flex-col items-center min-h-screen bg-primary ${print ? "gap-0" : "gap-8 py-8"}`}>
    <Helmet><title>Ralston × MyTS — Panorama do piloto</title><meta name="description" content="Panorama da implantação Ralston × MyTS em 8 de outubro de 2026: evolução, fornecedores, autoavaliações e próximos passos."/><meta property="og:title" content="Ralston × MyTS — Panorama do piloto"/><meta property="og:description" content="Evolução do piloto e próximos passos da implantação."/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/></Helmet>
    <style>{`.ralston-preview{width:min(100%,calc((100vh - 64px)*16/9));aspect-ratio:16/9;border-radius:8px}.ralston-print{width:1600px;height:900px}.ralston-canvas{width:1600px;height:900px;transform-origin:top left;padding:54px 64px 36px;letter-spacing:0}@page{size:1600px 900px;margin:0}@media print{html,body,#root{margin:0!important;padding:0!important}.no-print{display:none!important}.ralston-frame{width:1600px!important;height:900px!important;border-radius:0;break-after:page}.ralston-canvas{transform:none!important}*{print-color-adjust:exact;-webkit-print-color-adjust:exact}}`}</style>
    {!print&&<><Button className="no-print fixed right-5 top-5 z-50 bg-accent text-accent-foreground" onClick={()=>window.print()}><Download/>Baixar PDF</Button><nav className="no-print fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-lg bg-primary p-2 border border-primary-foreground/20"><Button variant="ghost" size="icon" className="text-primary-foreground" aria-label="Slide anterior" onClick={()=>go(-1)}><ChevronLeft/></Button><span className="text-primary-foreground">{current} / 4</span><Button variant="ghost" size="icon" className="text-primary-foreground" aria-label="Próximo slide" onClick={()=>go(1)}><ChevronRight/></Button></nav></>}
    <Overview/><Suppliers/><Processes/><Next/>
  </main>;
}