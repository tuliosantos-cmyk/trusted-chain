import { useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle, BellRing, CalendarCheck, CheckCircle2, ClipboardCheck, Clock, Download, FileSpreadsheet, FileText,
  Globe2, GraduationCap, Handshake, History, Layers, Mail, MapPin, Phone, Rocket, Send, ShieldCheck, Sparkles,
  TrendingUp, Users, Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { commercialClients } from "@/lib/commercial-proof";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg?raw";
import catupiryLogo from "@/assets/catupiry/catupiry-logo.png";
import labImg from "@/assets/catupiry/laticinio-qualidade.jpg";

/* Proposta Catupiry — mesmo sistema visual do Material Comercial MyTS (foco na marca MyTS). */
const W = 1600;
const H = 900;
const P = 64;
const TOTAL = 12;

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
            <span>Proposta Catupiry · {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

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

const Header = ({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) => (
  <div className={`flex items-center gap-4 text-[17px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`} style={{ letterSpacing: "0.16em" }}>
    <span>{n}</span><span className={`h-px w-14 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} />{label}
  </div>
);
const Title = ({ children, dark = false, size = 52, max = 1240 }: { children: React.ReactNode; dark?: boolean; size?: number; max?: number }) => (
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
/** Informação ainda a confirmar com o cliente. */
const Tbc = ({ children }: { children: React.ReactNode }) => <span className="rounded bg-destructive/10 px-1.5 font-bold text-destructive">{children}</span>;
/** Selo pequeno da Catupiry — só como identificação do cliente. */
const ClientSeal = ({ size = 56 }: { size?: number }) => <span className="inline-grid place-items-center rounded-full bg-card p-1 shadow-card" style={{ width: size, height: size }}><img src={catupiryLogo} alt="Catupiry" className="size-full object-contain" /></span>;

/* ---------- Slides ---------- */
const S01 = () => (
  <Slide n={1} dark decor={<><Grid dark /><div aria-hidden className="absolute -left-40 -top-40 size-[560px] rounded-full bg-accent/25 blur-[130px]" /><Glyph size={560} tone="glow" opacity={0.5} className="-right-[90px] top-[140px]" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark>Versão 4.0 · 04/11/2026</Pill></div>
    <div className="flex flex-1 flex-col justify-center">
      <p className="text-[22px] font-semibold uppercase text-accent-glow" style={{ letterSpacing: "0.16em" }}>Proposta comercial e técnica</p>
      <h1 className="mt-6 max-w-[980px] font-display text-[70px] font-bold leading-[1.03] text-primary-foreground">Fornecedores, homologação e não conformidades <span className="text-accent-glow">em um só lugar.</span></h1>
      <div className="mt-10 flex items-center gap-5">
        <ClientSeal size={72} />
        <div><p className="text-[16px] font-bold uppercase text-primary-foreground/60" style={{ letterSpacing: "0.14em" }}>Preparada para</p><p className="font-display text-[30px] font-bold text-primary-foreground">Catupiry</p></div>
        <span className="mx-4 h-12 w-px bg-primary-foreground/20" />
        <div><p className="text-[16px] font-bold uppercase text-primary-foreground/60" style={{ letterSpacing: "0.14em" }}>Por</p><p className="text-[22px] text-primary-foreground"><b>André Tanzi</b> · andre.tanzi@myt-s.com</p></div>
      </div>
    </div>
  </Slide>
);

const S02 = () => (
  <Slide n={2} decor={<LightEcho side="left" />}>
    <Header n="00" label="A proposta em 1 minuto" />
    <div className="grid flex-1 grid-cols-[540px_1fr] items-center gap-14">
      <div>
        <Title size={50}>A proposta inteira, <span className="text-accent">em um minuto.</span></Title>
        <p className="mt-6 max-w-[480px] text-[21px] leading-[1.5] text-foreground/75">Se a diretoria ler apenas uma página, é esta. Os detalhes de cada ponto vêm nos próximos slides.</p>
      </div>
      <div className="space-y-4">
        {([
          [Layers, "O quê", "Homologação, monitoramento e não conformidades de fornecedores em um lugar só.", null],
          [Users, "Para quem", "Até 240 fornecedores da Catupiry — que acessam de graça.", null],
          [Sparkles, "Investimento", "R$ 2.370,00/mês", "+ R$ 4.740,00 de implantação (pagamento único)"],
          [CalendarCheck, "Quando começa", <>Implantação em <Tbc>[mês]</Tbc>.</>, <>Primeiro faturamento só em <b className="text-foreground">05/01/2027</b>.</>],
          [ShieldCheck, "Piloto", "60 dias sem custo para RNC Internas.", null],
        ] as const).map(([Icon, label, main, sub]) => (
          <div key={label} className="flex items-center gap-5 rounded-lg border border-border bg-card px-6 py-4 shadow-card">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={24} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold uppercase text-accent" style={{ letterSpacing: "0.14em" }}>{label}</p>
              <p className="mt-0.5 text-[21px] font-semibold leading-[1.3] text-foreground">{main}</p>
              {sub && <p className="mt-1 text-[17px] leading-[1.35] text-muted-foreground">{sub}</p>}
            </div>
            <CheckCircle2 size={24} className="shrink-0 text-success" />
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

const S03 = () => (
  <Slide n={3} decor={<LightEcho />}>
    <Header n="—" label="Para a equipe da Catupiry" />
    <div className="mt-2 grid flex-1 grid-cols-[1fr_470px] items-center gap-14">
      <div>
        <Title size={44}>Uma marca como a Catupiry não pode depender de <span className="text-accent">planilha, e-mail e memória</span> para saber se os fornecedores estão em dia.</Title>
        <div className="mt-7 max-w-[860px] space-y-4 text-[21px] leading-[1.5] text-foreground/75">
          <p>Esta proposta organiza isso em um lugar só: <b className="text-foreground">quem entra</b> (homologação), <b className="text-foreground">quem continua</b> (monitoramento) e <b className="text-foreground">o que fazer quando algo sai do padrão</b> (não conformidades).</p>
          <p>O fornecedor passa a acessar a MyTS, ver o que está pendente e enviar o que falta sem ninguém precisar cobrar. <b className="text-accent">A sua equipe só valida.</b></p>
          <p>Antes da formalização, podemos fazer uma conversa rápida para ajustar os detalhes técnicos.</p>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-8 shadow-card">
        <p className="text-[15px] font-bold uppercase text-accent" style={{ letterSpacing: "0.14em" }}>Seus contatos na MyTS</p>
        {[
          ["Comercial", "André Tanzi", "Diretor Comercial", "andre.tanzi@myt-s.com", "(14) 99637-0596", false],
          ["Implantação e suporte", "Felipe Dantas ou Guilherme Aliaga", "", "e-mail a confirmar", "(14) 99671-7173", true],
        ].map(([a, n, r, e, p, tbc]) => (
          <div key={String(a)} className="mt-6 border-t border-border pt-5">
            <Pill>{a}</Pill>
            <p className="mt-3 font-display text-[23px] font-bold text-foreground">{tbc ? <Tbc>{n}</Tbc> : n}</p>
            {r && <p className="text-[16px] text-muted-foreground">{r}</p>}
            <p className="mt-3 flex items-center gap-2 text-[17px] text-foreground"><Mail size={17} className="text-accent" />{tbc ? <Tbc>{e}</Tbc> : e}</p>
            <p className="mt-1 flex items-center gap-2 text-[17px] text-foreground"><Phone size={17} className="text-accent" />{p}</p>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

const S04 = () => (
  <Slide n={4} dark decor={<DarkEcho />}>
    <Header n="—" label="Sumário" dark />
    <div className="grid flex-1 grid-cols-[500px_1fr] items-center gap-16">
      <Title dark size={62}>Uma proposta,<br /><span className="text-accent-glow">sete passos.</span></Title>
      <div className="grid gap-3">
        {["O que entendemos da Catupiry", "O que muda com a MyTS", "Escopo desta proposta", "Quem é a MyTS", "Investimento", "Implantação", "Condições gerais"].map((t, i) => (
          <div key={t} className="flex items-center gap-6 rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.06] px-6 py-3.5">
            <span className="w-12 font-display text-[28px] font-bold text-accent-glow">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[25px] font-semibold text-primary-foreground">{t}</span>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

const S05 = () => (
  <Slide n={5} decor={<LightEcho />}>
    <Header n="01" label="O que entendemos da Catupiry" />
    <Title>Hoje, a conformidade dos fornecedores <span className="text-accent">pesa na sua equipe.</span></Title>
    <div className="grid flex-1 grid-cols-[1fr_540px] items-center gap-12">
      <div className="grid grid-cols-2 gap-4">
        {([[Layers, "Fornecedores em níveis diferentes", "Cada um exige um acompanhamento diferente."], [FileSpreadsheet, "Planilha e e-mail", "Cobrança manual, um por um."], [Clock, "Tempo da equipe", "O monitoramento consome horas que deveriam ir para análise."], [History, "Histórico espalhado", "Quem aprovou, quando e por quê fica difícil de achar."], [TrendingUp, "Crescer custa caro", "Mais fornecedores significa mais gente ou mais risco."]] as const).map(([Icon, t, d], i) => (
          <div key={t} className={`flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-card ${i === 4 ? "col-span-2" : ""}`}>
            <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={24} /></span>
            <div><h3 className="text-[21px] font-bold text-foreground">{t}</h3><p className="mt-1 text-[17px] leading-[1.4] text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </div>
      <div className="relative">
        <Window title="Caixa de entrada · Qualidade">
          {[["Fornecedor A", "RE: RE: Laudo leite cru — vencido?", true], ["Fornecedor B", "Certidão atualizada (versão final 3)", false], ["Você", "Cobrança: alvará sanitário", true], ["Compras", "FW: planilha_fornecedores_v12.xlsx", false], ["Auditoria", "Onde está a aprovação de março?", true]].map(([f, s, u]) => (
            <div key={String(s)} className="flex items-center gap-3 border-b border-border px-5 py-3.5 text-[16px]">
              <Mail size={17} className="shrink-0 text-muted-foreground" /><b className="w-[110px] shrink-0 text-foreground">{String(f)}</b>
              <span className="flex-1 truncate text-muted-foreground">{String(s)}</span>{u && <AlertTriangle size={17} className="shrink-0 text-destructive" />}
            </div>
          ))}
        </Window>
        <div className="absolute -bottom-24 -left-8 max-w-[400px] rounded-lg bg-primary px-6 py-5 shadow-elegant">
          <p className="font-display text-[23px] font-bold leading-[1.25] text-primary-foreground">Isso não é falha da equipe. <span className="text-accent-glow">É o modelo.</span></p>
        </div>
      </div>
    </div>
  </Slide>
);

const S06 = () => (
  <Slide n={6} decor={<LightEcho side="left" />}>
    <Header n="02" label="O que muda com a MyTS" />
    <Title size={48} max={1300}>5 unidades. Uma única visão da <span className="text-accent">Qualidade Corporativa.</span></Title>
    <div className="flex flex-1 flex-col justify-center gap-4">
      <div className="flex items-center gap-6 rounded-lg bg-primary px-7 py-6">
        <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-primary-foreground/10 text-accent-glow"><Layers size={28} /></span>
        <div>
          <h3 className="font-display text-[25px] font-bold text-primary-foreground">Visão corporativa.</h3>
          <p className="mt-1 text-[20px] leading-[1.4] text-primary-foreground/80">As 5 unidades da Catupiry na mesma MyTS, com os mesmos critérios e um painel único.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {([[Clock, "Cada unidade no seu ritmo", "Cada uma opera a própria rotina, e a Qualidade Corporativa acompanha tudo de cima."], [Users, "Um fornecedor, um cadastro", "Quem atende mais de uma unidade envia o documento uma vez só."], [ShieldCheck, "Proteger a marca", "Nenhum fornecedor entra ou continua sem o que foi combinado, em nenhuma unidade."], [Workflow, "Desvio com tratativa", "Toda não conformidade com plano de ação e histórico auditável."]] as const).map(([Icon, t, d]) => (
          <div key={t} className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-card">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={24} /></span>
            <div>
              <h3 className="text-[21px] font-bold text-foreground">{t}</h3>
              <p className="mt-1 text-[17px] leading-[1.4] text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6 rounded-lg border border-accent/25 bg-accent/10 px-7 py-4">
        <span className="flex shrink-0 items-center gap-3 rounded-lg bg-card px-4 py-2.5 text-[15px] text-foreground shadow-card"><BellRing size={18} className="text-accent" /><b>MyTS</b> · Laudo microbiológico vence em 15 dias. <u className="font-bold text-accent">Enviar agora</u></span>
        <p className="font-display text-[21px] font-bold text-foreground">Seu fornecedor não precisa que você cobre. <span className="text-accent">Ele já sabe o que está pendente.</span></p>
      </div>
    </div>
  </Slide>
);

const S07 = () => (
  <Slide n={7} decor={<LightEcho />}>
    <Header n="03" label="Escopo desta proposta" />
    <Title>O que está incluso.</Title>
    <div className="grid flex-1 grid-cols-2 items-center gap-10">
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-6 shadow-card">
          <Pill>Meus Fornecedores</Pill>
          {([[BellRing, "Monitoramento", "Pendências, prazos e alertas por requisito, para até 240 fornecedores."], [ClipboardCheck, "Homologação", "Critérios e etapas padronizados para cada novo fornecedor."], [Workflow, "RNC de Fornecedores", "Abertura, tratativa e encerramento com o próprio fornecedor."]] as const).map(([Icon, t, d]) => (
            <p key={t} className="mt-4 flex items-start gap-3 text-[18px]"><Icon size={22} className="mt-0.5 shrink-0 text-accent" /><span><b className="text-foreground">{t}.</b> <span className="text-muted-foreground">{d}</span></span></p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-card"><Pill>Meus Processos</Pill><p className="mt-4 text-[17px]"><b className="text-foreground">RNC Internas.</b> <span className="text-muted-foreground">Não conformidades da operação, começando por um piloto de 60 dias.</span></p></div>
          <div className="rounded-lg bg-primary p-6">
            <Pill dark>Acessos</Pill>
            <p className="mt-4 flex gap-2 text-[17px] text-primary-foreground"><CheckCircle2 size={20} className="shrink-0 text-accent-glow" />3 usuários extras para a equipe Catupiry</p>
            <p className="mt-2 flex gap-2 text-[17px] text-primary-foreground"><CheckCircle2 size={20} className="shrink-0 text-accent-glow" />Acesso gratuito para todos os fornecedores</p>
          </div>
        </div>
      </div>
      <Window title="MyTS · Meus Fornecedores">
        <div className="p-6">
          <div className="grid grid-cols-3 gap-3">{[["240", "fornecedores"], ["18", "vencem em 30 dias"], ["3", "RNC abertas"]].map(([v, l], i) => <div key={l} className={`rounded-lg px-4 py-3 ${i === 1 ? "bg-accent/10" : "bg-secondary"}`}><strong className="block text-[30px] leading-none text-foreground">{v}</strong><span className="mt-2 block text-[14px] text-muted-foreground">{l}</span></div>)}</div>
          <div className="mt-4">
            {([["Laticínio Vale Verde", "Leite cru", 100, "Em dia", "success"], ["Embalagens Paulista", "Bisnaga", 78, "Pendente", "accent"], ["Amido Brasil", "Ingrediente", 92, "Homologando", "accent"], ["Transportes Serra", "Logística", 55, "RNC aberta", "destructive"]] as const).map(([n, c, v, s, tone]) => (
              <div key={n} className="grid grid-cols-[1fr_130px_120px] items-center gap-3 border-b border-border py-3">
                <div><p className="text-[16px] font-bold text-foreground">{n}</p><p className="text-[13px] text-muted-foreground">{c}</p></div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className={`h-full ${tone === "success" ? "bg-success" : tone === "destructive" ? "bg-destructive" : "bg-accent"}`} style={{ width: `${v}%` }} /></div>
                <span className={`justify-self-end rounded-full px-3 py-1 text-[13px] font-bold ${tone === "success" ? "bg-success/10 text-success" : tone === "destructive" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"}`}>{s}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-muted-foreground">Tela ilustrativa · nomes fictícios</p>
        </div>
      </Window>
    </div>
  </Slide>
);

const S08 = () => (
  <Slide n={8} decor={<LightEcho />}>
    <Header n="04" label="Quem é a MyTS" />
    <div className="mt-2 grid flex-1 grid-cols-[1fr_540px] items-center gap-14">
      <div>
        <Title size={52}>My Trusted Source.<br /><span className="text-accent">Nascemos na indústria de alimentos.</span></Title>
        <p className="mt-5 max-w-[760px] text-[21px] leading-[1.5] text-foreground/75">A MyTS nasceu para resolver o que planilha e e-mail nunca deram conta: <b className="text-foreground">provar, todos os dias, que cada fornecedor está em dia.</b></p>
        <div className="mt-6 flex flex-wrap gap-3">{([[MapPin, "Botucatu (BR) e Charlotte (EUA)"], [Globe2, "Presença em +20 países"], [GraduationCap, "Implantação guiada por especialistas"]] as const).map(([Icon, t]) => <span key={t} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[16px] font-semibold text-foreground"><Icon size={18} className="text-accent" />{t}</span>)}</div>
        <p className="mt-8 text-[15px] font-bold uppercase text-accent" style={{ letterSpacing: "0.14em" }}>Quem confia na MyTS</p>
        <div className="mt-4 grid grid-cols-6 gap-3">{commercialClients.slice(0, 6).map((c) => <div key={c.name} className="flex h-[72px] items-center justify-center rounded-lg border border-border bg-card px-3"><img src={c.src} alt={c.name} loading="eager" className="max-h-[44px] max-w-full object-contain" /></div>)}</div>
      </div>
      <div className="relative">
        <img src={labImg} alt="Especialista avaliando queijo em laboratório de qualidade" loading="eager" width={1280} height={960} className="h-[400px] w-full rounded-3xl object-cover" />
        <div className="absolute -bottom-12 -left-10 right-10 rounded-lg border-l-4 border-accent bg-card px-6 py-5 shadow-elegant">
          <p className="font-display text-[20px] font-semibold leading-[1.35] text-foreground">“<Tbc>frase exata da Larissa</Tbc>”</p>
          <p className="mt-2 text-[15px] text-muted-foreground"><b className="text-foreground">Larissa Garcia</b> · Qualidade, Augusta Alimentos</p>
        </div>
      </div>
    </div>
  </Slide>
);

const S09 = () => {
  const rows = [["Monitoramento de Fornecedores (121 a 240)", "R$ 1.140,00"], ["Homologação de Fornecedores", "R$ 570,00"], ["RNC de Fornecedores", "R$ 570,00"], ["3 usuários extras", "R$ 90,00"]];
  return (
    <Slide n={9} decor={<LightEcho />}>
      <Header n="05" label="Investimento" />
      <Title>Investimento.</Title>
      <div className="grid flex-1 grid-cols-[1fr_460px] items-center gap-8">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <div className="grid grid-cols-[1fr_220px] bg-primary px-7 py-3.5 text-[14px] font-bold uppercase text-primary-foreground" style={{ letterSpacing: "0.14em" }}><span>Item</span><span className="text-right">Valor mensal</span></div>
          {rows.map(([i, v]) => <div key={i} className="grid grid-cols-[1fr_220px] border-b border-border px-7 py-4 text-[20px] text-foreground"><span>{i}</span><span className="text-right font-bold">{v}</span></div>)}
          <div className="grid grid-cols-[1fr_220px] items-center bg-accent/10 px-7 py-4"><b className="font-display text-[22px] text-foreground">Mensalidade</b><b className="text-right font-display text-[30px] text-accent">R$ 2.370,00</b></div>
          <div className="grid grid-cols-[1fr_340px] items-center px-7 py-4 text-[18px]">
            <span className="flex items-center gap-3 text-foreground"><Sparkles size={20} className="text-accent" /><b>RNC Internas:</b> piloto de 60 dias sem custo</span>
            <span className="text-right text-muted-foreground">após o piloto: R$ 570,00 <Tbc>a confirmar</Tbc></span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg bg-primary p-7"><p className="text-[15px] font-bold uppercase text-accent-glow" style={{ letterSpacing: "0.14em" }}>Implantação · pagamento único</p><p className="mt-2 font-display text-[50px] font-bold text-primary-foreground">R$ 4.740,00</p></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-5 shadow-card"><CalendarCheck className="text-accent" /><p className="mt-2 text-[14px] text-muted-foreground">Faturamento a partir de</p><p className="font-display text-[24px] font-bold text-foreground">05/01/2027</p></div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-card"><Clock className="text-accent" /><p className="mt-2 text-[14px] text-muted-foreground">Validade da proposta</p><p className="font-display text-[22px] font-bold text-foreground"><Tbc>7 ou 30</Tbc> dias</p></div>
          </div>
          <p className="text-[15px] leading-[1.5] text-muted-foreground">O piloto de 60 dias vale só para RNC Internas e serve para testar o processo de não conformidades internas da Catupiry. As demais frentes são ativadas ao mesmo tempo, já em operação.</p>
        </div>
      </div>
    </Slide>
  );
};

const S10 = () => (
  <Slide n={10} dark decor={<DarkEcho pos="-bottom-56 -right-32" size={520} />}>
    <Header n="06" label="Implantação" dark />
    <Title dark>Do aceite à operação, <span className="text-accent-glow">em 5 etapas.</span></Title>
    <div className="flex flex-1 items-center">
      <div className="relative w-full">
        <div aria-hidden className="absolute left-[120px] right-[120px] top-[44px] h-1 rounded-full bg-gradient-accent" />
        <div className="grid grid-cols-5 gap-5">
        {([[Rocket, "Kickoff", "Objetivo, escopo, quem decide o quê e a cadência."], [Layers, "Setup", "Requisitos, critérios e fluxos de homologação, monitoramento e RNC."], [GraduationCap, "Treinamento", "A equipe Catupiry aprende a solicitar, revisar e aprovar."], [Send, "Ativação", "Fornecedores são convidados, entram e começam a enviar documentos."], [TrendingUp, "Operação assistida", "Ajustamos a jornada com base no uso real."]] as const).map(([Icon, t, d], i) => (
          <div key={t} className="flex flex-col items-center text-center">
            <span className={`relative grid size-[92px] place-items-center rounded-full ring-8 ring-primary ${i === 4 ? "bg-accent text-accent-foreground" : "bg-card text-accent"}`}><Icon size={36} /></span>
            <p className="mt-5 text-[14px] font-bold text-accent-glow" style={{ letterSpacing: "0.16em" }}>ETAPA {i + 1}</p>
            <h3 className="mt-1 font-display text-[25px] font-bold text-primary-foreground">{t}</h3>
            <p className="mt-3 rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.06] px-4 py-3 text-[17px] leading-[1.45] text-primary-foreground/75">{d}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  </Slide>
);

const S11 = () => (
  <Slide n={11} decor={<LightEcho />}>
    <Header n="07" label="Condições gerais" />
    <Title>Condições gerais.</Title>
    <div className="grid flex-1 grid-cols-[560px_1fr] items-center gap-10">
      <div className="rounded-lg border border-border bg-card p-8 shadow-card">
        <div className="flex items-center gap-4">
          <span className="grid h-20 w-16 place-items-center rounded-lg bg-accent/10 text-accent"><FileText size={34} /></span>
          <div><Pill>CT04</Pill><h3 className="mt-2 font-display text-[22px] font-bold text-foreground">Termo de Aceite e Condições de Uso da MyTS</h3></div>
        </div>
        <p className="mt-5 text-[18px] leading-[1.5] text-muted-foreground">As cláusulas de pagamento, acesso, proteção de dados e uso estão no CT04, que faz parte desta proposta.</p>
        <div className="mt-5 flex flex-wrap gap-2">{["Pagamento", "Acesso", "Proteção de dados", "Uso"].map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 text-[14px] font-bold text-foreground">{t}</span>)}</div>
      </div>
      <div>
        <h3 className="font-display text-[26px] font-bold text-foreground">Logo após o aceite, a MyTS envia:</h3>
        <div className="mt-5 space-y-4">
          {["Cronograma de treinamento da equipe", "Estrutura dos requisitos na MyTS", "Próximos passos para o acesso dos fornecedores"].map((t, i) => (
            <div key={t} className="flex items-center gap-5 rounded-lg border border-border bg-card px-6 py-5 shadow-card">
              <span className="grid size-12 place-items-center rounded-full bg-accent font-display text-[20px] font-bold text-accent-foreground">{i + 1}</span>
              <span className="text-[22px] font-semibold text-foreground">{t}</span>
              <CheckCircle2 size={26} className="ml-auto text-success" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Slide>
);

const S12 = () => (
  <Slide n={12} dark decor={<><Grid dark /><Glyph size={760} tone="light" opacity={0.05} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" /></>}>
    <div className="flex items-center justify-between"><img src={mytsLogo} alt="MyTS" className="h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} /><Pill dark><Handshake size={18} className="mr-2" />Próximo passo</Pill></div>
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <ClientSeal size={96} />
      <h2 className="mt-8 max-w-[1200px] font-display text-[56px] font-bold leading-[1.08] text-primary-foreground">Fornecedor em dia, equipe livre para decidir<br /><span className="text-accent-glow">e uma marca protegida.</span></h2>
      <p className="mt-5 text-[24px] text-primary-foreground/75">É isso que queremos construir com a Catupiry.</p>
      <div className="mt-10 flex gap-4">
        <a href="mailto:andre.tanzi@myt-s.com" className="flex items-center gap-3 rounded-xl bg-accent px-6 py-4 text-[21px] font-bold text-accent-foreground"><Mail size={23} />andre.tanzi@myt-s.com</a>
        <span className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[21px] font-bold text-primary-foreground"><Phone size={23} />(14) 99637-0596</span>
        <a href="https://myt-s.com" className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[21px] font-bold text-primary-foreground"><Globe2 size={23} />myt-s.com</a>
      </div>
    </div>
  </Slide>
);

const PropostaCatupiry = () => {
  const print = usePrintMode();
  return (
    <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 32, overflowX: "hidden" }}>
      <Helmet><title>Proposta Catupiry · MyTS</title><meta name="description" content="Proposta comercial e técnica MyTS para a Catupiry." /></Helmet>
      <style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>
      {!print && <Button onClick={() => window.open(`${window.location.pathname}?print`, "_blank")} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download />Baixar PDF</Button>}
      {[S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12].map((C, i) => <C key={i} />)}
    </main>
  );
};

export default PropostaCatupiry;
