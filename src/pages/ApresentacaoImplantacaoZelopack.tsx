// ============= Full file contents =============

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle, ArrowRight, BellRing, Boxes, Building2, CalendarClock, Check,
  CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, Download, FileCheck2,
  FileText, Filter, GraduationCap, Image, Layers3, MapPin, PackageCheck,
  RefreshCw, Scale, Send, ShieldCheck, UploadCloud, Users,
  Workflow, XCircle, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mytsLogo from "@/assets/myts-logo.svg";
import zelopackLogo from "@/assets/zelopack/zelopack-logo.png";

const W = 1600;
const H = 900;
const P = 58;
const TOTAL = 11;

type IconType = typeof Building2;
type CompareItem = { icon: IconType; title: string; text: string };

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => setPrint(new URLSearchParams(location.search).has("print")), []);
  return print;
};

const Zelopack = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-center justify-center rounded-md border border-border bg-card px-4" style={{ height: compact ? 34 : 66 }}>
    <img src={zelopackLogo} alt="Zelopack" className="w-auto object-contain" style={{ height: compact ? 21 : 40 }} />
  </div>
);
const Logo = ({ h = 38 }: { h?: number }) => <img src={mytsLogo} alt="MyTS" className="w-auto object-contain" style={{ height: h }} />;
const Lockup = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-center gap-4">
    <Zelopack compact={compact} />
    <span className="text-muted-foreground">×</span>
    <div className="rounded-md bg-primary px-4 py-3"><Logo h={compact ? 20 : 38} /></div>
  </div>
);
const Grid = ({ dark = false }: { dark?: boolean }) => <div aria-hidden className={`grid-pattern absolute inset-0 ${dark ? "opacity-20" : "opacity-40"}`} />;
const Header = ({ n, label, dark = false }: { n: number; label: string; dark?: boolean }) => (
  <div className={`flex items-center gap-4 text-[14px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`}>
    <span>{String(n).padStart(2, "0")}</span><span className={`h-px w-12 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} /><span>{label}</span>
  </div>
);
const Footer = ({ n, dark = false, reference }: { n: number; dark?: boolean; reference?: string }) => (
  <div className={`mt-auto flex items-end justify-between border-t pt-3 text-[12px] ${dark ? "border-primary-foreground/15 text-primary-foreground/65" : "border-border text-muted-foreground"}`}>
    <Lockup compact />
    {reference && <span className="max-w-[780px] text-center">{reference}</span>}
    <span>{String(n).padStart(2, "0")} / {TOTAL}</span>
  </div>
);
const Slide = ({ children, n, label, dark = false, reference }: { children: React.ReactNode; n: number; label: string; dark?: boolean; reference?: string }) => {
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
  const appliedScale = print ? 1 : scale;
  return (
    <section ref={ref} data-slide={n} className={`${dark ? "bg-primary" : "bg-background"} relative slide-frame`} style={print ? { width: W, height: H, overflow: "hidden", breakAfter: "page" } : { width: "min(100%, calc((100vh - 64px) * 16 / 9))", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 12, scrollSnapAlign: "center" }}>
      <div className={`${dark ? "bg-primary" : "bg-background"} absolute left-0 top-0 overflow-hidden`} style={{ width: W, height: H, transform: `scale(${appliedScale})`, transformOrigin: "top left", visibility: appliedScale ? "visible" : "hidden" }}>
        <Grid dark={dark} />
        <div className="relative flex h-full flex-col" style={{ padding: P }}>
          <Header n={n} label={label} dark={dark} />
          {children}
          <Footer n={n} dark={dark} reference={reference} />
        </div>
      </div>
    </section>
  );
};
const Title = ({ children, dark = false, size = 46 }: { children: React.ReactNode; dark?: boolean; size?: number }) => <h2 className={`mt-4 max-w-[1460px] font-display font-bold leading-[1.07] ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size }}>{children}</h2>;
const Support = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <p className={`mt-3 max-w-[1380px] text-[19px] leading-[1.4] ${dark ? "text-primary-foreground/75" : "text-foreground/70"}`}>{children}</p>;
const IconBox = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <span className={`grid size-12 shrink-0 place-items-center rounded-lg ${dark ? "bg-accent/20 text-accent-glow" : "bg-accent/10 text-accent"}`}>{children}</span>;
const CheckLine = ({ children, dark = false, warning = false }: { children: React.ReactNode; dark?: boolean; warning?: boolean }) => <div className={`flex items-start gap-3 text-[16px] leading-[1.3] ${dark ? "text-primary-foreground" : "text-foreground/80"}`}>{warning ? <AlertTriangle className="mt-0.5 shrink-0 text-accent" size={19} /> : <CheckCircle2 className={`mt-0.5 shrink-0 ${dark ? "text-accent-glow" : "text-success"}`} size={19} />}<span>{children}</span></div>;
const CompareColumn = ({ title, items, accent = false, badge, height = 490 }: { title: string; items: CompareItem[]; accent?: boolean; badge?: IconType; height?: number }) => {
  const Badge = badge ?? (accent ? Check : undefined);
  const itemMinHeight = Math.min(118, Math.max(70, Math.round((height - 120) / items.length - 12)));
  return (
    <div className={`flex h-full flex-col rounded-xl border p-6 ${accent ? "border-accent bg-accent/10" : "border-border bg-card"}`}>
      <div className="flex items-center gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-full text-[15px] font-bold ${accent ? "bg-accent text-accent-foreground" : badge ? "bg-secondary text-accent" : "bg-secondary text-muted-foreground"}`}>{Badge ? <Badge size={19} /> : "Z"}</span>
        <h3 className="text-[19px] font-bold uppercase text-foreground">{title}</h3>
      </div>
      <div className="mt-5 grid flex-1 content-center gap-3">
        {items.map(({ icon: Icon, title: itemTitle, text }) => <div key={itemTitle} style={{ minHeight: itemMinHeight }} className="flex items-center gap-4 rounded-lg border border-border/80 bg-background px-4 py-3.5"><Icon className={accent ? "text-accent" : "text-muted-foreground"} size={21} /><div><strong className="block text-[15px] leading-tight">{itemTitle}</strong><span className="text-[13px] leading-tight text-muted-foreground">{text}</span></div></div>)}
      </div>
    </div>
  );
};
const StagePill = ({ n, name }: { n: number; name: string }) => <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-[13px] font-bold uppercase text-accent"><span className="grid size-6 place-items-center rounded-full bg-accent text-[11px] text-accent-foreground">{n}</span>{name}</div>;

const S01 = () => <Slide n={1} label="Resposta à proposta" dark><div className="mt-7"><Lockup /></div><div className="flex flex-1 items-center"><div className="max-w-[1280px]"><span className="text-[17px] font-bold uppercase text-accent-glow">Reunião de alinhamento</span><h1 className="mt-5 font-display text-[78px] font-bold leading-[1.02] text-primary-foreground">Zelopack <span className="text-accent-glow">×</span> MyTS</h1><p className="mt-6 max-w-[1180px] text-[31px] leading-[1.25] text-primary-foreground">Como cada solicitação da sua proposta fica na MyTS</p><div className="mt-10 flex items-center gap-4 text-[17px] text-primary-foreground/75"><ShieldCheck className="text-accent-glow" size={24} /><span>Resposta à Proposta de Parametrização — Rev. 00, 25/09/2026</span></div></div></div></Slide>;

const stages = [
  [Building2, "Cadastro", "Quem são os fornecedores"], [FileText, "Requisitos", "O que cada um entrega"], [ClipboardCheck, "Questionários", "Como cada um é avaliado"], [UploadCloud, "Carga inicial", "O que a Zelopack já tem"], [ShieldCheck, "Homologação", "A decisão da Qualidade"], [BellRing, "Monitoramento", "Validades e mudanças em dia"], [PackageCheck, "Recebimento", "F_QLD_033 digital"],
] as const;
const S02 = () => <Slide n={2} label="O caminho da implantação" dark><Title dark>Sete etapas, na ordem em que acontecem</Title><Support dark>As etapas 1 a 6 são Meus Fornecedores. A etapa 7 é Meus Processos.</Support><div className="mt-7 grid flex-1 grid-cols-7 gap-3">{stages.map(([Icon, title, text], index) => <div key={title} className={`relative flex h-full flex-col rounded-xl border p-4 ${index === 6 ? "border-accent bg-accent/20" : "border-primary-foreground/15 bg-primary-foreground/[0.06]"}`}><span className="text-[44px] font-bold text-primary-foreground/20">0{index + 1}</span><Icon className="mt-7 text-accent-glow" size={33} /><h3 className="mt-7 text-[20px] font-bold text-primary-foreground">{title}</h3><p className="mt-auto pt-4 text-[15px] leading-[1.35] text-primary-foreground/70">{text}</p>{index < 6 && <ArrowRight className="absolute -right-[14px] top-1/2 z-10 text-accent-glow" size={26} />}</div>)}</div><div className="mb-3 grid grid-cols-[6fr_1fr] gap-3 text-center text-[13px] font-bold uppercase"><span className="rounded-md bg-primary-foreground/10 py-2 text-primary-foreground">Meus Fornecedores</span><span className="rounded-md bg-accent py-2 text-accent-foreground">Meus Processos</span></div></Slide>;

const S03 = () => <Slide n={3} label="Meus Fornecedores • Etapa 1" reference="Ref.: Seção 2, p.1"><div className="mt-3"><StagePill n={1} name="Cadastro" /></div><Title>Cada estabelecimento, com seu próprio cadastro</Title><Support>O cadastro é a base de tudo: quem fornece, de onde vem e para qual cliente.</Support><div className="mt-6 grid h-[490px] grid-cols-2 gap-5"><CompareColumn title="Vocês pediram" items={[{ icon: Building2, title: "Cadastro por CNPJ", text: "Cada estabelecimento efetivo" }, { icon: Boxes, title: "Fabricante original", text: "Origem identificada" }, { icon: PackageCheck, title: "Vínculos", text: "Estabelecimento, produto e cliente" }, { icon: Users, title: "Relação múltipla", text: "Vários clientes por fornecedor" }]} /><CompareColumn accent title="Na MyTS" items={[{ icon: MapPin, title: "Cadastro completo", text: "Nome, localização e CNPJ" }, { icon: UploadCloud, title: "Planilha de início", text: "Dados coletados para a carga" }, { icon: FileText, title: "Produto e versão", text: "Organizados nos requisitos" }, { icon: Filter, title: "Filtros rápidos", text: "Por produto ou fornecedor" }]} /></div></Slide>;

const S04 = () => <Slide n={4} label="Meus Fornecedores • Etapa 2" reference="Ref.: Seção 2, p.2 · Seção 3, p.2 · Seção 4, p.2–4 · Seção 7, p.7"><div className="mt-3"><StagePill n={2} name="Requisitos documentais" /></div><Title size={43}>Cada documento vira um requisito — só para quem se aplica</Title><Support>Requisitos valem para um estabelecimento, produto ou categoria — e são enviados só a quem se aplica.</Support><div className="mt-6 grid h-[530px] grid-cols-2 gap-5"><CompareColumn height={530} title="Vocês pediram" items={[{ icon: Building2, title: "Por estabelecimento", text: "Documentos gerais" }, { icon: PackageCheck, title: "Por produto", text: "Documentos técnicos" }, { icon: Layers3, title: "Por categoria", text: "Material e enquadramento" }, { icon: Filter, title: "Com pertinência", text: "Nada de laudo universal" }, { icon: FileCheck2, title: "Classificação", text: "P / C / L / O" }]} /><CompareColumn accent height={530} title="Na MyTS" items={[{ icon: Workflow, title: "Parametrização", text: "Requisitos criados na implantação" }, { icon: Send, title: "Envio direcionado", text: "Conforme a categoria" }, { icon: CalendarClock, title: "Validade", text: "Configurada por documento" }, { icon: RefreshCw, title: "Renovação", text: "Nova solicitação ao vencer" }, { icon: AlertTriangle, title: "P / C / L / O", text: "Viabilidade a confirmar" }]} /></div></Slide>;

const S05 = () => <Slide n={5} label="Meus Fornecedores • Etapa 3" reference="Ref.: Seção 2, p.2 · Seção 5, p.4–6"><div className="mt-3"><StagePill n={3} name="Questionários de homologação" /></div><Title>Um questionário por categoria de fornecedor</Title><Support>Cada categoria responde apenas ao que faz sentido para a própria atividade.</Support><div className="mt-6 grid h-[490px] grid-cols-2 gap-5"><CompareColumn title="Vocês pediram" items={[{ icon: ClipboardCheck, title: "Sim / Não / N/A", text: "Respostas padronizadas" }, { icon: FileText, title: "Justificativa", text: "Obrigatória para N/A" }, { icon: Image, title: "Evidência", text: "Nas respostas críticas" }, { icon: Truck, title: "Contexto", text: "Perguntas por atividade e transporte" }]} /><CompareColumn accent title="Na MyTS" items={[{ icon: Layers3, title: "Por categoria", text: "Questionário específico" }, { icon: FileCheck2, title: "Pergunta crítica", text: "Campo de justificativa" }, { icon: UploadCloud, title: "Anexos", text: "Evidência na própria resposta" }]} /></div></Slide>;

const S06 = () => <Slide n={6} label="Meus Fornecedores • Etapa 4" reference="Ref.: Seção 7, p.7"><div className="mt-3"><StagePill n={4} name="Carga inicial" /></div><Title>O fornecedor recebe só o que falta</Title><Support>Primeiro aproveitamos o acervo existente. Depois, cada fornecedor completa apenas as pendências.</Support><div className="mt-7 grid h-[430px] grid-cols-[0.85fr_1.5fr] gap-7"><div className="grid grid-rows-2 gap-4"><div className="rounded-xl border border-border bg-card p-5"><h3 className="text-[16px] font-bold uppercase text-muted-foreground">Vocês pediram</h3><div className="mt-4 space-y-3"><CheckLine>Importar os documentos que já existem</CheckLine><CheckLine>Pedir apenas pendências e atualizações</CheckLine></div></div><div className="rounded-xl border border-accent bg-accent/10 p-5"><h3 className="text-[16px] font-bold uppercase text-accent">Na MyTS</h3><div className="mt-4 space-y-3"><CheckLine>Requisitos definidos e fornecedores cadastrados</CheckLine><CheckLine>Time Zelopack sobe o acervo atual</CheckLine><CheckLine>Fornecedor recebe acesso e finaliza o upload</CheckLine></div></div></div><div className="flex items-center gap-4">{[[UploadCloud,"01","Zelopack envia","Licença sanitária.pdf"],[FileCheck2,"02","MyTS confere","Requisito atendido"],[Send,"03","Fornecedor recebe","Somente 2 pendências"]].map(([Icon,n,t,d],i,a)=><Fragment key={String(n)}><div className={`flex h-[300px] flex-1 flex-col justify-between rounded-xl border p-6 ${i===2?"border-accent bg-accent/10":"border-border bg-card"}`}><div className="flex items-center justify-between"><IconBox><Icon size={25}/></IconBox><span className="text-[42px] font-bold text-muted-foreground/25">{String(n)}</span></div><div><h3 className="text-[20px] font-bold">{String(t)}</h3><p className="mt-3 text-[15px] text-muted-foreground">{String(d)}</p></div>{i===0&&<div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-3/4 bg-accent"/></div>}{i===1&&<span className="text-[12px] font-bold text-success">✓ APROVEITADO</span>}{i===2&&<span className="text-[12px] font-bold text-accent">ACESSO LIBERADO</span>}</div>{i<a.length-1&&<ArrowRight className="shrink-0 text-accent" size={28}/>}</Fragment>)}</div></div></Slide>;

const S07 = () => <Slide n={7} label="Meus Fornecedores • Etapa 5" reference="Ref.: Seção 2, p.2"><div className="mt-3"><StagePill n={5} name="Homologação e status" /></div><Title>A decisão é da Qualidade — e fica registrada</Title><Support>Nada é liberado automaticamente: o resultado é sempre uma decisão registrada da Qualidade.</Support><div className="mt-6 grid h-[490px] grid-cols-2 gap-5"><CompareColumn title="Vocês pediram" items={[{ icon: ShieldCheck, title: "Quatro status", text: "Aprovado, condicionado, reprovado, suspenso" }, { icon: XCircle, title: "Pendência crítica", text: "Bloqueia o uso" }, { icon: AlertTriangle, title: "Compra emergencial", text: "Somente com autorização" }]} /><CompareColumn accent title="Na MyTS" items={[{ icon: Filter, title: "Pendências visíveis", text: "Por produto ou fornecedor" }, { icon: ClipboardCheck, title: "Resultado registrado", text: "No processo de avaliação" }, { icon: ShieldCheck, title: "Bloqueio humano", text: "Aplicado pela Qualidade" }]} /></div></Slide>;

const S08 = () => <Slide n={8} label="Meus Fornecedores • Etapa 6" reference="Ref.: Seção 2, p.2 · Seção 7, p.7"><div className="mt-3"><StagePill n={6} name="Monitoramento contínuo" /></div><Title>O fornecedor já sabe o que está pendente</Title><Support>Fornecedor e Zelopack acompanham as mesmas pendências, no mesmo momento.</Support><div className="mt-6 grid h-[490px] grid-cols-2 gap-5"><CompareColumn title="Vocês pediram" items={[{ icon: CalendarClock, title: "Validade documental", text: "Controle contínuo" }, { icon: RefreshCw, title: "Mudanças", text: "Formulação, fábrica, embalagem" }, { icon: Scale, title: "Reavaliação", text: "Periódica e por risco" }, { icon: AlertTriangle, title: "Não conformidades", text: "Registro e reincidências" }]} /><CompareColumn accent title="Na MyTS" items={[{ icon: BellRing, title: "Avisos contínuos", text: "Fornecedor e Zelopack" }, { icon: FileText, title: "Novo requisito", text: "Quando uma mudança é comunicada" }, { icon: CalendarClock, title: "Alerta periódico", text: "Para reavaliação" }, { icon: Workflow, title: "NC configurada", text: "Gerada pelo processo" }]} /></div></Slide>;

const S09 = () => <Slide n={9} label="Meus Processos • Etapa 7" reference="Ref.: Seção 7, p.7 · Anexo I-A, I-C e I-E, p.8–12"><div className="mt-3"><StagePill n={7} name="Recebimento • Estrutura" /></div><Title>O F_QLD_033 vira um processo na MyTS</Title><Support>O recebimento ganha etapas claras, evidências e contexto de homologação.</Support><div className="mt-6 grid h-[490px] grid-cols-2 gap-5"><CompareColumn badge={Workflow} title="Estrutura do processo" items={[{ icon: Workflow, title: "Processo com etapas", text: "Recebimento definido passo a passo" }, { icon: Image, title: "Evidências", text: "Fotos e anexos na própria resposta" }, { icon: Layers3, title: "Estruturas separadas", text: "Tetra Pak e granel em rotinas próprias" }, { icon: FileText, title: "Modelo digital", text: "F_QLD_033 aplicado na plataforma" }]} /><CompareColumn accent badge={ShieldCheck} title="Contexto na abertura" items={[{ icon: ShieldCheck, title: "Situação da homologação", text: "Visível antes de qualquer decisão" }, { icon: PackageCheck, title: "Nota e lotes", text: "Cada lote da NF identificado" }, { icon: Truck, title: "Inspeção do veículo", text: "Registro da carga que chega" }, { icon: ClipboardCheck, title: "Decisão registrada", text: "Resultado e histórico do recebimento" }]} /></div></Slide>;

const S10 = () => <Slide n={10} label="Meus Processos • Etapa 7" reference="Ref.: Seção 6, p.7 · Anexo I-E, p.11"><div className="mt-3"><StagePill n={7} name="Recebimento • Regras e decisão" /></div><Title>Cada “Não” pede explicação; a liberação, a Qualidade</Title><Support>As regras do recebimento entram no processo — e o histórico guarda cada resposta.</Support><div className="mt-6 grid h-[490px] grid-cols-2 gap-5"><CompareColumn badge={Scale} title="Regras de operação" items={[{ icon: Boxes, title: "Vários lotes", text: "Tratados na mesma nota fiscal" }, { icon: Truck, title: "Veículo compartilhado", text: "Inspeção única para a carga" }, { icon: FileText, title: "Resposta Não ou N/A", text: "Justificativa obrigatória" }, { icon: ShieldCheck, title: "Aprovado com restrição", text: "Não libera o uso do material" }]} /><CompareColumn accent badge={ClipboardCheck} title="Desfecho do recebimento" items={[{ icon: XCircle, title: "Retido", text: "Pendência crítica impede a entrada" }, { icon: AlertTriangle, title: "Com restrição", text: "Aguarda decisão da Qualidade" }, { icon: CheckCircle2, title: "Liberado", text: "Resultado registrado no histórico" }]} /></div></Slide>;

const S11 = () => <Slide n={11} label="Análise técnica" reference="Ref.: Seção 1, p.1 · Seção 7, p.7 · Seção 8, p.7"><Title>O olhar da norma, com uma especialista MyTS</Title><Support>Esta análise é independente da configuração da plataforma: ela avalia como a Zelopack está estruturada frente à FSSC 22000 v7.</Support><div className="mt-7 grid h-[430px] grid-cols-[0.9fr_1.4fr] gap-7"><div className="rounded-xl border border-border bg-card p-6"><span className="text-[13px] font-bold uppercase text-muted-foreground">Vocês pediram</span><div className="mt-5 space-y-5"><CheckLine>Análise crítica frente à FSSC 22000 v7</CheckLine><CheckLine>Validar critérios de risco e aceitação</CheckLine><CheckLine>Definir responsabilidades Zelopack × clientes</CheckLine></div><div className="mt-8 flex items-center gap-4 rounded-lg bg-secondary p-4"><Scale className="text-accent" size={28}/><p className="text-[13px] font-semibold">Norma, risco e operação avaliados no mesmo contexto.</p></div></div><div className="relative overflow-hidden rounded-xl border border-accent bg-accent/10 p-7"><div className="absolute right-7 top-7 grid size-20 place-items-center rounded-full bg-accent text-accent-foreground"><GraduationCap size={35}/></div><span className="text-[13px] font-bold uppercase text-accent">Como vamos conduzir</span><h3 className="mt-3 max-w-[620px] text-[27px] font-bold">Reunião de consultoria com especialista MyTS</h3><div className="mt-7 grid grid-cols-3 gap-3">{[[ShieldCheck,"01","Leitura técnica","Estrutura frente à norma"],[Scale,"02","Critérios de risco","Aceitação e decisão"],[FileCheck2,"03","Formalização","Responsabilidades por escrito"]].map(([Icon,n,t,d])=><div key={String(n)} className="rounded-lg border border-border bg-background p-4"><Icon className="text-accent" size={23}/><span className="mt-5 block text-[10px] font-bold text-accent">ETAPA {String(n)}</span><strong className="mt-1 block text-[15px]">{String(t)}</strong><p className="mt-2 text-[11px] text-muted-foreground">{String(d)}</p></div>)}</div><div className="mt-5 rounded-lg bg-primary px-5 py-4 text-[14px] font-semibold text-primary-foreground">Resultado: critérios claros para configurar e operar com segurança.</div></div></div></Slide>;

const SLIDES = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11];
export default function ApresentacaoImplantacaoZelopack() {
  const print = usePrintMode();
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    if (print) return;
    const update = () => {
      const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
      const center = innerHeight / 2;
      const closest = slides.reduce((a, b) => Math.abs(b.getBoundingClientRect().top + b.clientHeight / 2 - center) < Math.abs(a.getBoundingClientRect().top + a.clientHeight / 2 - center) ? b : a, slides[0]);
      if (closest) setCurrent(Number(closest.dataset.slide));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, [print]);
  const go = (n: number) => document.querySelector<HTMLElement>(`[data-slide="${Math.min(TOTAL, Math.max(1, n))}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  return <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 32, overflowX: "hidden" }}><Helmet><title>Zelopack × MyTS — Resposta à Proposta de Parametrização</title><meta name="description" content="Apresentação de alinhamento da implantação Zelopack e MyTS, da gestão de fornecedores ao recebimento."/><meta property="og:title" content="Zelopack × MyTS — Reunião de implantação"/><meta property="og:description" content="Como cada solicitação da proposta da Zelopack fica na MyTS."/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/></Helmet><style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>{!print&&<><Button onClick={() => window.print()} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download/>Baixar PDF</Button><div className="no-print fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary/90 p-2 shadow-elegant backdrop-blur"><Button size="icon" variant="ghost" className="rounded-full text-primary-foreground" onClick={() => go(current - 1)} aria-label="Slide anterior"><ChevronLeft/></Button><span className="min-w-20 text-center text-[14px] font-bold text-primary-foreground">{current} / {TOTAL}</span><Button size="icon" variant="ghost" className="rounded-full text-primary-foreground" onClick={() => go(current + 1)} aria-label="Próximo slide"><ChevronRight/></Button></div></>}{SLIDES.map((Component, index) => <Component key={index}/>)}</main>;
}
