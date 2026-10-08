import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Building2,
  Check,
  ClipboardCheck,
  CloudUpload,
  FileCheck2,
  FileText,
  Globe2,
  LayoutDashboard,
  Mail,
  MapPin,
  Network,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mytsLogo from "@/assets/myts-logo.svg";

const W = 1600;
const H = 900;
const TOTAL = 10;

type SlideProps = { number: number; dark?: boolean; children: React.ReactNode };

const Brand = ({ dark = false }: { dark?: boolean }) => (
  <img className={dark ? "premium-logo premium-logo-light" : "premium-logo"} src={mytsLogo} alt="MyTS" />
);

const Slide = ({ number, dark = false, children }: SlideProps) => (
  <section className={`premium-slide ${dark ? "premium-dark" : "premium-light"}`}>
    <div className="premium-grid" />
    <div className="premium-content">{children}</div>
    <footer className="premium-footer">
      <Brand dark={dark} />
      <span>MY TRUSTED SOURCE</span>
      <span>{String(number).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
    </footer>
  </section>
);

const Header = ({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) => (
  <header className="premium-header">
    <span className="premium-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {lead && <p>{lead}</p>}
  </header>
);

const IconBox = ({ children }: { children: React.ReactNode }) => <span className="premium-icon">{children}</span>;

const S01 = () => (
  <Slide number={1} dark>
    <div className="premium-cover-copy">
      <div className="premium-kicker"><Sparkles size={20} /> Plataforma inteligente para cadeias confiáveis</div>
      <h1>Empresas, fornecedores<br />e processos em uma<br /><em>única fonte confiável.</em></h1>
      <p>Compras, Qualidade, P&amp;D, ESG e Compliance conectados em uma jornada contínua.</p>
    </div>
    <div className="premium-cover-visual" aria-hidden="true">
      <div className="network-orbit orbit-a"><span /></div>
      <div className="network-orbit orbit-b"><span /></div>
      <div className="network-center"><Network size={72} /></div>
      <div className="network-node node-a"><Building2 /><small>Empresa</small></div>
      <div className="network-node node-b"><Users /><small>Fornecedor</small></div>
      <div className="network-node node-c"><ClipboardCheck /><small>Processos</small></div>
    </div>
    <div className="premium-stats">
      {[["+ 1.500", "empresas ativas"], ["50K +", "documentos"], ["+ 200", "processos ativos"], ["+ 20", "países"]].map(([value, label]) => (
        <div key={label}><strong>{value}</strong><span>{label}</span></div>
      ))}
    </div>
  </Slide>
);

const S02 = () => (
  <Slide number={2}>
    <div className="about-layout">
      <div className="about-copy">
        <span className="premium-eyebrow">Sobre a MyTS</span>
        <h2>My Trusted Source.<br /><em>O nome já diz o que somos.</em></h2>
        <p className="about-lead">Uma plataforma que nasceu dentro da indústria de alimentos para resolver o que planilha e e-mail nunca deram conta: reunir empresas, fornecedores e processos em uma única base confiável.</p>
        <div className="about-proof">
          {[
            [<ShieldCheck />, "Base única de verdade", "Documentos, fornecedores e processos no mesmo lugar."],
            [<ClipboardCheck />, "Fluxos auditáveis", "Cada aprovação, nota e plano de ação com histórico."],
            [<Network />, "Rede de campo", "100+ auditores e visitas técnicas no Brasil e exterior."],
          ].map(([icon, title, text]) => (
            <div key={title as string}><IconBox>{icon}</IconBox><div><strong>{title}</strong><span>{text}</span></div></div>
          ))}
        </div>
      </div>
      <aside className="about-panel">
        <div className="panel-head"><Brand dark /><span>MY TRUSTED SOURCE</span></div>
        <p className="panel-def">Tecnologia e conhecimento técnico trabalhando juntos para centralizar dados, integrar fluxos e acelerar decisões em toda a cadeia de suprimentos.</p>
        <div className="panel-block">
          <small>ONDE ESTAMOS</small>
          <div className="panel-hub"><MapPin /><div><b>Botucatu</b><span>SP · Brasil</span></div></div>
          <div className="panel-hub"><MapPin /><div><b>Charlotte</b><span>NC · EUA</span></div></div>
          <div className="panel-reach"><Globe2 /><b>+20</b><span>países alcançados pela rede</span></div>
        </div>
        <div className="panel-block">
          <small>ATUAÇÃO</small>
          <div className="panel-pills"><span>Compras</span><span>Qualidade</span><span>P&amp;D</span><span>ESG</span><span>Compliance</span></div>
        </div>
      </aside>
    </div>
  </Slide>
);

const S03 = () => (
  <Slide number={3}>
    <Header eyebrow="Metodologia de gestão" title={<>Uma jornada contínua.<br /><em>Não uma checagem pontual.</em></>} lead="A MyTS conecta descoberta, qualificação e acompanhamento em um mesmo ciclo de confiança." />
    <div className="journey-flow">
      {[
        { n: "01", title: "Prospecção inteligente", text: "Conectar a fornecedores e especialistas qualificados.", icon: <Search /> },
        { n: "02", title: "Homologação personalizada", text: "Aplicar critérios técnicos, sanitários e regulatórios.", icon: <ShieldCheck /> },
        { n: "03", title: "Monitoramento contínuo", text: "Antecipar riscos com alertas, evidências e relatórios.", icon: <BellRing /> },
      ].map((item, index) => (
        <div className="journey-step" key={item.n}>
          <div className="journey-number">{item.n}</div>
          <IconBox>{item.icon}</IconBox>
          <h3>{item.title}</h3><p>{item.text}</p>
          {index < 2 && <ArrowRight className="journey-arrow" />}
        </div>
      ))}
    </div>
    <div className="premium-takeaway"><span>RESULTADO</span><strong>Uma base qualificada que continua evoluindo depois da homologação.</strong></div>
  </Slide>
);

const S04 = () => (
  <Slide number={4} dark>
    <Header eyebrow="Ecossistema integrado" title={<>Tudo se conecta ao redor<br />de uma <em>base única.</em></>} />
    <div className="ecosystem">
      <div className="ecosystem-core"><Brand dark /><strong>Uma fonte<br />confiável</strong><span>Dados • evidências • decisões</span></div>
      {[
        ["eco-a", <ShieldCheck />, "Homologação", "Critérios e aprovações"],
        ["eco-b", <FileText />, "Documentos", "Lista mestra e validades"],
        ["eco-c", <BellRing />, "Monitoramento", "Risco e alertas"],
        ["eco-d", <ClipboardCheck />, "Autoavaliação", "Checklists e notas"],
        ["eco-e", <Network />, "RNC & processos", "Planos de ação"],
        ["eco-f", <FileCheck2 />, "Auditorias", "Prontidão e evidências"],
      ].map(([cls, icon, title, text]) => (
        <div className={`eco-node ${cls}`} key={title as string}><IconBox>{icon}</IconBox><div><strong>{title}</strong><span>{text}</span></div></div>
      ))}
      <svg viewBox="0 0 1200 520" className="eco-lines" aria-hidden="true"><path d="M600 260 L190 95 M600 260 L600 70 M600 260 L1010 95 M600 260 L190 430 M600 260 L600 455 M600 260 L1010 430" /></svg>
    </div>
  </Slide>
);

const MiniNav = ({ active }: { active: number }) => (
  <aside className="mock-nav">
    <Brand />
    {[LayoutDashboard, FileText, Users, ClipboardCheck].map((I, i) => <span className={active === i ? "active" : ""} key={i}><I size={23} /></span>)}
  </aside>
);

const S05 = () => (
  <Slide number={5}>
    <Header eyebrow="Módulo 01 · Meus documentos" title={<>Do arquivo disperso<br />à <em>lista mestra viva.</em></>} lead="Procedimentos, políticas e evidências centralizados com responsáveis, versões, aprovações e vencimentos." />
    <div className="mock-window documents-mock">
      <MiniNav active={1} />
      <div className="mock-main">
        <div className="mock-top"><div><small>MEUS DOCUMENTOS</small><strong>Lista mestra</strong></div><span><CloudUpload size={20} /> Novo documento</span></div>
        <div className="doc-kpis"><div><b>128</b><small>documentos ativos</small></div><div><b>07</b><small>para revisar</small></div><div><b>96%</b><small>em conformidade</small></div></div>
        <div className="doc-table">
          {["POP · Recebimento de matérias-primas", "Política · Qualificação de fornecedores", "IT · Controle de alergênicos", "Registro · Monitoramento de temperatura"].map((name, i) => (
            <div key={name}><FileText /><span><b>{name}</b><small>{["Qualidade", "Compras", "P&D", "Operações"][i]} · versão {i + 2}.0</small></span><i className={i === 1 ? "warning" : "ok"}>{i === 1 ? "Revisar" : "Aprovado"}</i></div>
          ))}
        </div>
      </div>
    </div>
    <div className="side-notes"><div><Check /> versão e histórico</div><div><Check /> validade e responsável</div><div><Check /> aprovação rastreável</div></div>
  </Slide>
);

const S06 = () => (
  <Slide number={6} dark>
    <Header eyebrow="Módulo 02 · Meus fornecedores" title={<>Cada fornecedor com<br />uma <em>visão 360°.</em></>} lead="Qualificação, documentos, risco e histórico em um único painel para Compras e Qualidade." />
    <div className="supplier-stage">
      <div className="mock-window supplier-mock">
        <MiniNav active={2} />
        <div className="mock-main">
          <div className="supplier-head"><div className="company-avatar">AL</div><div><small>FORNECEDOR</small><strong>Alimentos Litoral</strong><span>Ingredientes · São Paulo, Brasil</span></div><i><Check /> Homologado</i></div>
          <div className="supplier-score"><div className="score-ring"><b>92</b><small>IQF</small></div><div><small>RISCO ATUAL</small><strong>Baixo risco</strong><span>Última avaliação: 18 set 2026</span></div></div>
          <div className="supplier-tabs"><span className="active">Visão geral</span><span>Documentos</span><span>Processos</span><span>Histórico</span></div>
          <div className="supplier-panels"><div><b>18 / 20</b><small>documentos válidos</small></div><div><b>4.7</b><small>desempenho</small></div><div><b>0</b><small>RNCs críticas</small></div></div>
        </div>
      </div>
      <div className="radar-card"><span>MATRIZ DE RISCO</span><svg className="radar" viewBox="0 0 240 240" role="img" aria-label="Perfil de risco: qualidade, entrega, documentação e ESG"><g className="radar-grid"><path d="M120 16 224 120 120 224 16 120Z M120 42 198 120 120 198 42 120Z M120 68 172 120 120 172 68 120Z M120 94 146 120 120 146 94 120Z" /><path d="M120 16V224 M16 120H224" /></g><polygon className="radar-profile" points="120,43 188,120 120,176 64,120" /><g className="radar-points"><circle cx="120" cy="43" r="5"/><circle cx="188" cy="120" r="5"/><circle cx="120" cy="176" r="5"/><circle cx="64" cy="120" r="5"/></g></svg><div className="radar-legend"><span>Qualidade</span><span>Entrega</span><span>Documentação</span><span>ESG</span></div></div>
    </div>
  </Slide>
);

const S07 = () => (
  <Slide number={7}>
    <Header eyebrow="Módulo 03 · Processos e autoavaliação" title={<>Da pergunta ao plano de ação.<br /><em>Todo o fluxo rastreável.</em></>} />
    <div className="process-flow">
      {[
        ["01", <ClipboardCheck />, "Checklist", "Questionário personalizado"],
        ["02", <Users />, "Resposta", "Fornecedor envia evidências"],
        ["03", <LayoutDashboard />, "Nota IQF", "Cálculo e matriz de risco"],
        ["04", <ShieldCheck />, "RNC", "Desvio registrado e priorizado"],
        ["05", <Check />, "Plano de ação", "Responsável, prazo e validação"],
      ].map(([n, icon, title, text], i) => <div className="process-step" key={n as string}><span>{n}</span><IconBox>{icon}</IconBox><strong>{title}</strong><small>{text}</small>{i < 4 && <ArrowRight />}</div>)}
    </div>
    <div className="assessment-board">
      <div className="assessment-copy"><small>AUTOAVALIAÇÃO EM ANDAMENTO</small><strong>Boas Práticas de Fabricação</strong><span>32 de 40 respostas concluídas</span><div><i /></div></div>
      <div className="assessment-score"><small>NOTA PARCIAL</small><strong>84</strong><span>de 100 pontos</span></div>
      <div className="action-list"><small>PLANO DE AÇÃO</small><div><span className="critical" /> Controle de alergênicos <b>12 out</b></div><div><span className="attention" /> Calibração de instrumentos <b>18 out</b></div><div><span className="done" /> Treinamento de BPF <b>Concluído</b></div></div>
    </div>
  </Slide>
);

const S08 = () => (
  <Slide number={8} dark>
    <Header eyebrow="Prontidão para auditorias" title={<>A evidência certa.<br />No momento em que <em>ela é pedida.</em></>} lead="A plataforma organiza requisitos, documentos, responsáveis e status para auditorias de 2ª parte, FSSC 22000, ISO e conformidade sanitária." />
    <div className="audit-visual">
      <div className="audit-ring"><ShieldCheck /><strong>PRONTO</strong><span>para auditoria</span></div>
      <div className="audit-checks">
        {[["Documentação", "100%"], ["Fornecedores críticos", "96%"], ["Planos de ação", "91%"], ["Evidências", "98%"]].map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b><i><em style={{ width: value }} /></i></div>)}
      </div>
      <div className="audit-stack">{["FSSC 22000", "ISO", "2ª PARTE", "SANITÁRIO"].map((x) => <span key={x}>{x}<FileCheck2 /></span>)}</div>
    </div>
  </Slide>
);

const S09 = () => (
  <Slide number={9}>
    <Header eyebrow="Serviços especializados" title={<>Tecnologia conectada<br />a uma <em>rede de campo.</em></>} lead="Quando a decisão exige presença física, a MyTS coordena especialistas, avaliações e evidências na mesma jornada." />
    <div className="world-network">
      <Globe2 className="world-icon" />
      <svg viewBox="0 0 900 450" aria-hidden="true"><path d="M105 260 C260 60 530 95 780 220 M130 290 C340 420 610 380 770 220 M250 120 C360 250 580 260 690 355" /><circle cx="105" cy="260" r="8"/><circle cx="250" cy="120" r="8"/><circle cx="450" cy="210" r="11"/><circle cx="690" cy="355" r="8"/><circle cx="780" cy="220" r="8"/></svg>
      <div className="world-center"><strong>100+</strong><span>auditores<br />no Brasil e exterior</span></div>
    </div>
    <div className="service-strip">
      {[[<Users />, "Rede internacional", "Atendimento regional qualificado"], [<MapPin />, "Visitas in-site", "Verificação de instalações e BPF"], [<ShieldCheck />, "Auditorias de 2ª parte", "Critérios específicos da empresa"], [<ClipboardCheck />, "Autoavaliação customizada", "Diagnósticos internos e externos"]].map(([icon, title, text]) => <div key={title as string}><IconBox>{icon}</IconBox><strong>{title}</strong><span>{text}</span></div>)}
    </div>
  </Slide>
);

const S10 = () => (
  <Slide number={10} dark>
    <div className="closing-copy">
      <span className="premium-eyebrow">Próximo passo</span>
      <h2>Transforme sua cadeia<br />em uma <em>fonte confiável.</em></h2>
      <p>Visibilidade total, controle completo e conformidade para sua empresa.</p>
      <Brand dark />
    </div>
    <div className="closing-contact">
      <span>FALE COM A MYTS</span>
      <a href="tel:+5514996823691"><Phone /> +55 14 9 9682-3691</a>
      <a href="mailto:ricardo.machado@myt-s.com"><Mail /> ricardo.machado@myt-s.com</a>
      <a href="https://myt-s.com"><Globe2 /> myt-s.com</a>
      <div><MapPin /> Botucatu · SP · Brasil <i /> Charlotte · NC · EUA</div>
    </div>
    <div className="closing-orbit"><span /><span /><span /></div>
  </Slide>
);

const slides = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10];

const ApresentacaoMytsPremium = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const printMode = new URLSearchParams(location.search).has("print");
  const initial = Math.min(TOTAL, Math.max(1, Number(new URLSearchParams(location.search).get("slide")) || 1));
  const [current, setCurrent] = useState(initial);
  const [scale, setScale] = useState(1);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    const value = Math.min(TOTAL, Math.max(1, next));
    setCurrent(value);
    navigate(`${location.pathname}?slide=${value}`, { replace: true });
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (printMode) return;
    const resize = () => setScale(Math.min(window.innerWidth / W, (window.innerHeight - 84) / H));
    resize(); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize);
  }, [printMode]);

  useEffect(() => {
    if (printMode) return;
    const key = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) go(current + 1);
      if (["ArrowLeft", "PageUp"].includes(event.key)) go(current - 1);
    };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, [current, go, printMode]);

  const CurrentSlide = useMemo(() => slides[current - 1], [current]);

  return (
    <main className={`premium-deck ${printMode ? "is-print" : ""}`} onTouchStart={(e) => { touchStart.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={(e) => { const end = e.changedTouches[0]?.clientX; if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 50) go(current + (end < touchStart.current ? 1 : -1)); }}>
      <Helmet><title>{`${current}/${TOTAL} — MyTS · Uma fonte confiável`}</title><meta name="description" content="Apresentação visual da plataforma MyTS, sua metodologia, módulos e serviços especializados." /></Helmet>
      <style>{premiumCss}</style>
      {printMode ? slides.map((Component, index) => <Component key={index} />) : (
        <div className="premium-viewport"><div className="premium-stage" style={{ transform: `scale(${scale})` }}><CurrentSlide /></div></div>
      )}
      {!printMode && <nav className="premium-controls" aria-label="Navegação da apresentação"><Button variant="outline" size="icon" onClick={() => go(current - 1)} disabled={current === 1} aria-label="Slide anterior"><ArrowLeft /></Button><span>{String(current).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span><Button variant="outline" size="icon" onClick={() => go(current + 1)} disabled={current === TOTAL} aria-label="Próximo slide"><ArrowRight /></Button><Button onClick={() => window.open(`${location.pathname}?print`, "_blank")}>Baixar PDF</Button></nav>}
    </main>
  );
};

const premiumCss = `
  :root{--premium-navy:hsl(var(--primary));--premium-blue:hsl(var(--accent));--premium-cyan:hsl(var(--accent-glow));--premium-paper:hsl(var(--background));--premium-ink:hsl(var(--foreground));--premium-muted:hsl(var(--muted-foreground));--premium-line:hsl(var(--border));--premium-card:hsl(var(--card));--premium-good:hsl(var(--success));--premium-warn:hsl(38 92% 50%)}
  *{box-sizing:border-box}.premium-deck{min-height:100vh;background:var(--premium-navy);font-family:var(--font-body,Manrope,sans-serif);overflow:hidden}.premium-viewport{position:fixed;inset:0 0 84px;overflow:hidden}.premium-stage{position:absolute;left:50%;top:50%;width:${W}px;height:${H}px;margin-left:-${W/2}px;margin-top:-${H/2}px;transform-origin:center}.premium-slide{position:relative;width:${W}px;height:${H}px;overflow:hidden;padding:62px 78px 54px;color:var(--premium-ink);background:var(--premium-paper)}.premium-dark{color:hsl(var(--primary-foreground));background:var(--premium-navy)}.premium-grid{position:absolute;inset:0;opacity:.45;background-image:linear-gradient(hsl(var(--accent)/.06) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--accent)/.06) 1px,transparent 1px);background-size:64px 64px}.premium-dark .premium-grid{opacity:.7}.premium-content{position:relative;z-index:2;height:750px}.premium-logo{width:102px;height:auto}.premium-logo-light{filter:brightness(0) invert(1)}.premium-footer{position:absolute;z-index:3;left:78px;right:78px;bottom:25px;height:28px;border-top:1px solid var(--premium-line);padding-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;color:var(--premium-muted);font-size:14px;letter-spacing:.12em}.premium-dark .premium-footer{border-color:hsl(var(--primary-foreground)/.16);color:hsl(var(--primary-foreground)/.55)}.premium-footer span:nth-child(2){text-align:center}.premium-footer span:last-child{text-align:right}.premium-header{max-width:1160px}.premium-header h2,.premium-cover-copy h1,.closing-copy h2{font-family:var(--font-display,Sora,sans-serif)}.premium-eyebrow{display:inline-flex;color:var(--premium-blue);font-size:16px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.premium-dark .premium-eyebrow{color:var(--premium-cyan)}.premium-header h2,.closing-copy h2{font-size:54px;line-height:1.04;letter-spacing:0;margin:16px 0 13px;font-weight:750}.premium-header h2 em,.closing-copy h2 em{font-style:normal;color:var(--premium-blue)}.premium-dark .premium-header h2 em,.premium-dark .closing-copy h2 em{color:var(--premium-cyan)}.premium-header p{font-size:22px;line-height:1.45;color:var(--premium-muted);max-width:880px;margin:0}.premium-dark .premium-header p{color:hsl(var(--primary-foreground)/.8)}.premium-icon{width:52px;height:52px;flex:0 0 52px;border-radius:12px;display:grid;place-items:center;background:hsl(var(--accent)/.11);color:var(--premium-blue)}.premium-icon svg{width:27px;height:27px}.premium-dark .premium-icon{background:hsl(var(--accent)/.2);color:var(--premium-cyan)}
  .premium-cover-copy{position:absolute;left:0;top:46px;width:820px}.premium-kicker{display:inline-flex;align-items:center;gap:10px;color:var(--premium-cyan);font-size:17px;font-weight:750;letter-spacing:.08em;text-transform:uppercase}.premium-cover-copy h1{font-size:68px;line-height:1.01;letter-spacing:0;margin:26px 0 25px;font-weight:780}.premium-cover-copy h1 em{font-style:normal;color:var(--premium-cyan)}.premium-cover-copy p{font-size:23px;line-height:1.48;color:hsl(var(--primary-foreground)/.7);width:690px}.premium-cover-visual{position:absolute;width:560px;height:560px;right:-6px;top:-20px}.network-orbit{position:absolute;border:1px solid hsl(var(--accent-glow)/.34);border-radius:50%;inset:80px}.orbit-b{inset:18px;border-style:dashed;opacity:.6}.network-orbit span{position:absolute;width:13px;height:13px;border-radius:50%;background:var(--premium-cyan);left:50%;top:-7px;box-shadow:0 0 22px hsl(var(--accent-glow)/.7)}.network-center{position:absolute;left:215px;top:215px;width:130px;height:130px;border-radius:50%;display:grid;place-items:center;background:hsl(var(--accent)/.18);border:1px solid hsl(var(--accent-glow)/.38);color:var(--premium-cyan)}.network-node{position:absolute;width:148px;height:92px;border:1px solid hsl(var(--primary-foreground)/.18);background:hsl(var(--primary)/.82);display:flex;align-items:center;justify-content:center;gap:10px;color:hsl(var(--primary-foreground));border-radius:12px}.network-node svg{color:var(--premium-cyan)}.network-node small{font-size:16px}.node-a{left:6px;top:83px}.node-b{right:2px;top:128px}.node-c{right:52px;bottom:35px}.premium-stats{position:absolute;left:0;right:0;bottom:6px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.premium-stats div{height:125px;padding:23px 28px;border:1px solid hsl(var(--primary-foreground)/.18);background:hsl(var(--primary-foreground)/.045);border-radius:8px}.premium-stats strong{display:block;font-size:31px;color:var(--premium-cyan)}.premium-stats span{display:block;margin-top:9px;font-size:16px;color:hsl(var(--primary-foreground)/.62);text-transform:uppercase;letter-spacing:.1em}
  .journey-flow{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:50px}.journey-step{position:relative;min-height:340px;padding:32px;border:1px solid var(--premium-line);background:var(--premium-card);box-shadow:var(--shadow-card);border-radius:8px}.journey-number{position:absolute;right:24px;top:18px;font-size:54px;font-weight:800;color:hsl(var(--accent)/.1)}.journey-step h3{font-size:27px;line-height:1.15;margin:48px 0 14px}.journey-step p{font-size:19px;line-height:1.45;color:var(--premium-muted);max-width:310px}.journey-arrow{position:absolute;right:-26px;top:145px;z-index:4;color:var(--premium-blue);width:22px}.premium-takeaway{margin-top:24px;height:86px;background:var(--premium-navy);color:hsl(var(--primary-foreground));display:flex;align-items:center;padding:0 30px;border-radius:8px;gap:26px}.premium-takeaway span{color:var(--premium-cyan);font-size:14px;letter-spacing:.14em;font-weight:800}.premium-takeaway strong{font-size:21px}
  .ecosystem{position:absolute;left:45px;right:45px;top:225px;height:490px}.ecosystem-core{position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);width:260px;height:260px;border:2px solid var(--premium-cyan);background:var(--premium-navy);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.ecosystem-core .premium-logo{width:72px;margin-bottom:13px}.ecosystem-core strong{font-size:28px;line-height:1.08}.ecosystem-core span{font-size:14px;color:hsl(var(--primary-foreground)/.85);margin-top:10px}.eco-node{position:absolute;z-index:3;width:300px;height:100px;border:1px solid hsl(var(--primary-foreground)/.28);background:var(--premium-navy);border-radius:8px;padding:20px;display:flex;gap:16px;align-items:center}.eco-node strong,.eco-node>div>span{display:block}.eco-node strong{font-size:20px}.eco-node>div>span{font-size:14px;color:hsl(var(--primary-foreground)/.8);margin-top:6px}.eco-node .premium-icon{display:grid;margin:0}.eco-a{left:0;top:0}.eco-b{left:50%;top:0;transform:translateX(-50%)}.eco-c{right:0;top:0}.eco-d{left:0;bottom:0}.eco-e{left:50%;bottom:0;transform:translateX(-50%)}.eco-f{right:0;bottom:0}.eco-lines{position:absolute;inset:0;width:100%;height:100%;z-index:1;overflow:visible}.eco-lines path{stroke:hsl(var(--accent-glow)/.45);stroke-width:2;fill:none;stroke-dasharray:8 9}
  .mock-window{color:var(--premium-ink);border:1px solid var(--premium-line);background:var(--premium-card);border-radius:9px;box-shadow:var(--shadow-elegant);overflow:hidden;display:flex}.mock-nav{width:80px;background:hsl(var(--primary));padding:27px 14px;display:flex;align-items:center;flex-direction:column;gap:25px}.mock-nav .premium-logo{width:52px;filter:brightness(0) invert(1);margin-bottom:24px}.mock-nav span{width:45px;height:45px;display:grid;place-items:center;color:hsl(var(--primary-foreground)/.45);border-radius:9px}.mock-nav span.active{background:hsl(var(--accent)/.22);color:var(--premium-cyan)}.mock-main{flex:1;padding:29px 34px}.documents-mock{position:absolute;left:0;top:270px;width:1110px;height:480px}.mock-top{display:flex;justify-content:space-between;align-items:center}.mock-top small,.supplier-head small{display:block;color:var(--premium-blue);font-size:12px;font-weight:800;letter-spacing:.15em}.mock-top strong{display:block;font-size:27px;margin-top:5px}.mock-top>span{display:flex;gap:9px;align-items:center;background:var(--premium-blue);color:hsl(var(--accent-foreground));font-size:15px;font-weight:700;padding:13px 18px;border-radius:7px}.doc-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:25px 0 20px}.doc-kpis div{background:hsl(var(--muted)/.65);padding:17px 20px;border-radius:7px}.doc-kpis b,.doc-kpis small{display:block}.doc-kpis b{font-size:24px}.doc-kpis small{font-size:13px;color:var(--premium-muted);margin-top:3px}.doc-table{border:1px solid var(--premium-line);border-radius:7px;overflow:hidden}.doc-table>div{display:flex;align-items:center;height:62px;padding:0 16px;border-bottom:1px solid var(--premium-line);gap:14px}.doc-table>div:last-child{border:0}.doc-table svg{color:var(--premium-blue)}.doc-table span{flex:1}.doc-table b,.doc-table small{display:block}.doc-table b{font-size:15px}.doc-table small{font-size:12px;color:var(--premium-muted);margin-top:3px}.doc-table i{font-style:normal;font-size:12px;font-weight:750;padding:7px 10px;border-radius:20px}.doc-table i.ok{color:var(--premium-good);background:hsl(var(--success)/.1)}.doc-table i.warning{color:hsl(32 90% 35%);background:hsl(38 92% 50%/.14)}.side-notes{position:absolute;right:0;top:316px;width:300px;display:flex;flex-direction:column;gap:17px}.side-notes div{border-left:3px solid var(--premium-blue);background:var(--premium-card);box-shadow:var(--shadow-card);padding:22px 20px;font-size:17px;font-weight:700;display:flex;align-items:center;gap:12px}.side-notes svg{color:var(--premium-good)}
  .supplier-stage{position:absolute;left:0;right:0;top:270px;height:470px;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:34px;align-items:center}.supplier-mock{width:100%;height:470px}.supplier-head{display:flex;align-items:center;border-bottom:1px solid var(--premium-line);padding-bottom:22px}.company-avatar{width:62px;height:62px;border-radius:9px;display:grid;place-items:center;background:hsl(var(--accent)/.14);color:var(--premium-blue);font-size:22px;font-weight:800;margin-right:18px}.supplier-head strong,.supplier-head span{display:block}.supplier-head strong{font-size:23px;margin:5px 0}.supplier-head span{font-size:13px;color:var(--premium-muted)}.supplier-head i{margin-left:auto;font-style:normal;padding:10px 13px;color:var(--premium-good);background:hsl(var(--success)/.1);border-radius:20px;font-size:13px;font-weight:750;display:flex;gap:7px}.supplier-score{display:flex;align-items:center;gap:18px;padding:21px 0}.score-ring{width:86px;height:86px;border-radius:50%;border:8px solid hsl(var(--success)/.22);border-top-color:var(--premium-good);display:flex;flex-direction:column;align-items:center;justify-content:center}.score-ring b{font-size:24px}.score-ring small{font-size:10px}.supplier-score>div:last-child small,.supplier-score>div:last-child strong,.supplier-score>div:last-child span{display:block}.supplier-score>div:last-child small{font-size:10px;letter-spacing:.12em;color:var(--premium-muted)}.supplier-score>div:last-child strong{font-size:19px;color:var(--premium-good);margin:5px 0}.supplier-score>div:last-child span{font-size:12px;color:var(--premium-muted)}.supplier-tabs{display:flex;border-bottom:1px solid var(--premium-line);gap:28px}.supplier-tabs span{padding:10px 0;font-size:13px;color:var(--premium-muted)}.supplier-tabs span.active{color:var(--premium-blue);font-weight:750;border-bottom:2px solid var(--premium-blue)}.supplier-panels{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:19px}.supplier-panels div{padding:19px;background:hsl(var(--muted)/.72);border-radius:7px}.supplier-panels b,.supplier-panels small{display:block}.supplier-panels b{font-size:22px}.supplier-panels small{font-size:12px;color:var(--premium-muted);margin-top:5px}.radar-card{width:340px;height:410px;background:var(--premium-card);color:var(--premium-ink);border:1px solid var(--premium-line);border-radius:8px;padding:24px}.radar-card>span{font-size:15px;font-weight:800;letter-spacing:0;color:var(--premium-blue)}.radar{display:block;width:240px;height:240px;margin:22px auto;color:var(--premium-blue)}.radar-grid{fill:none;stroke:var(--premium-line);stroke-width:2}.radar-profile{fill:hsl(var(--accent)/.24);stroke:var(--premium-blue);stroke-width:3;stroke-linejoin:round}.radar-points{fill:var(--premium-blue);stroke:var(--premium-card);stroke-width:2}.radar-legend{display:grid;grid-template-columns:1fr 1fr;gap:9px}.radar-legend span{font-size:14px;color:var(--premium-ink)}
  .process-flow{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;margin-top:39px}.process-step{position:relative;height:185px;padding:20px;border:1px solid var(--premium-line);background:var(--premium-card);border-radius:8px}.process-step>span:not(.premium-icon){position:absolute;right:14px;top:10px;color:hsl(var(--accent)/.15);font-size:34px;font-weight:800}.process-step strong,.process-step small{display:block}.process-step strong{font-size:19px;margin-top:16px}.process-step small{font-size:13px;line-height:1.35;color:var(--premium-muted);margin-top:7px}.process-step>svg{position:absolute;right:-20px;top:79px;width:18px;color:var(--premium-blue);z-index:4}.assessment-board{height:255px;margin-top:24px;background:var(--premium-navy);border-radius:9px;color:hsl(var(--primary-foreground));padding:30px;display:grid;grid-template-columns:1.35fr .55fr 1.25fr;gap:30px}.assessment-board small{font-size:11px;letter-spacing:.12em;color:var(--premium-cyan);font-weight:750}.assessment-copy strong,.assessment-copy span{display:block}.assessment-copy strong{font-size:24px;margin:14px 0 10px}.assessment-copy span{font-size:14px;color:hsl(var(--primary-foreground)/.6)}.assessment-copy>div{height:10px;background:hsl(var(--primary-foreground)/.11);margin-top:30px;border-radius:8px;overflow:hidden}.assessment-copy i{display:block;width:80%;height:100%;background:var(--premium-blue)}.assessment-score{border-left:1px solid hsl(var(--primary-foreground)/.13);border-right:1px solid hsl(var(--primary-foreground)/.13);text-align:center;padding:10px 25px}.assessment-score strong,.assessment-score span{display:block}.assessment-score strong{font-size:72px;line-height:1;color:var(--premium-cyan);margin-top:25px}.assessment-score span{font-size:12px;color:hsl(var(--primary-foreground)/.55);margin-top:8px}.action-list>div{height:49px;display:flex;align-items:center;border-bottom:1px solid hsl(var(--primary-foreground)/.1);gap:10px;font-size:13px}.action-list>div span{width:8px;height:8px;border-radius:50%}.action-list>div b{margin-left:auto;font-size:11px}.critical{background:hsl(var(--destructive))}.attention{background:var(--premium-warn)}.done{background:var(--premium-good)}
  .audit-visual{position:absolute;left:0;right:0;top:275px;height:440px;display:grid;grid-template-columns:.75fr 1.15fr 1fr;align-items:center;gap:58px}.audit-ring{width:270px;height:270px;border-radius:50%;border:2px solid hsl(var(--accent-glow)/.45);box-shadow:inset 0 0 0 20px hsl(var(--accent)/.07),0 0 70px hsl(var(--accent)/.15);display:flex;align-items:center;justify-content:center;flex-direction:column}.audit-ring svg{width:62px;height:62px;color:var(--premium-cyan)}.audit-ring strong{font-size:29px;margin-top:17px}.audit-ring span{font-size:14px;color:hsl(var(--primary-foreground)/.55)}.audit-checks{display:flex;flex-direction:column;gap:27px}.audit-checks div{display:grid;grid-template-columns:1fr auto;gap:9px}.audit-checks span{font-size:16px}.audit-checks b{font-size:16px;color:var(--premium-cyan)}.audit-checks i{grid-column:1/3;height:8px;background:hsl(var(--primary-foreground)/.1);border-radius:8px;overflow:hidden}.audit-checks em{display:block;height:100%;background:var(--premium-blue)}.audit-stack{position:relative;height:320px;display:grid;grid-template-rows:repeat(4,1fr);gap:14px}.audit-stack span{position:relative;transform:none!important;border:1px solid hsl(var(--primary-foreground)/.18);background:hsl(var(--primary)/.92);box-shadow:0 18px 35px hsl(var(--primary)/.45);padding:18px 22px;font-size:16px;font-weight:800;letter-spacing:0;color:var(--premium-cyan);display:flex;align-items:center;justify-content:space-between}.audit-stack svg{color:hsl(var(--primary-foreground)/.7)}
  .world-network{position:absolute;left:0;top:270px;width:900px;height:450px}.world-icon{position:absolute;left:260px;top:42px;width:390px;height:390px;stroke-width:.55;color:hsl(var(--accent)/.11)}.world-network>svg:not(.world-icon){position:absolute;inset:0;width:100%;height:100%}.world-network>svg:not(.world-icon) path{fill:none;stroke:hsl(var(--accent)/.48);stroke-width:2;stroke-dasharray:7 8}.world-network>svg:not(.world-icon) circle{fill:var(--premium-blue)}.world-center{position:absolute;left:340px;top:170px;width:220px;height:135px;border:1px solid var(--premium-line);background:var(--premium-card);box-shadow:var(--shadow-elegant);display:flex;align-items:center;justify-content:center;gap:15px;border-radius:8px}.world-center strong{font-size:42px;color:var(--premium-blue)}.world-center span{font-size:15px;line-height:1.3;color:var(--premium-muted)}.service-strip{position:absolute;right:0;top:270px;width:500px;display:grid;grid-template-columns:1fr 1fr;gap:16px}.service-strip>div{min-height:190px;border:1px solid var(--premium-line);background:var(--premium-card);padding:21px;border-radius:8px}.service-strip strong,.service-strip>div>span:last-child{display:block}.service-strip strong{font-size:17px;line-height:1.15;margin:18px 0 9px}.service-strip>div>span:last-child{font-size:13px;line-height:1.35;color:var(--premium-muted)}
  .closing-copy{position:absolute;left:0;top:105px;width:770px}.closing-copy h2{font-size:64px;margin:23px 0}.closing-copy p{font-size:21px;line-height:1.45;color:hsl(var(--primary-foreground)/.64);width:620px}.closing-copy .premium-logo{width:160px;margin-top:72px}.closing-contact{position:absolute;right:0;top:115px;width:505px;height:470px;border:1px solid hsl(var(--primary-foreground)/.17);background:hsl(var(--primary-foreground)/.055);border-radius:9px;padding:42px}.closing-contact>span{font-size:15px;font-weight:800;letter-spacing:.16em;color:var(--premium-cyan)}.closing-contact a{height:70px;color:hsl(var(--primary-foreground));text-decoration:none;border-bottom:1px solid hsl(var(--primary-foreground)/.12);display:flex;align-items:center;gap:17px;font-size:18px}.closing-contact a svg,.closing-contact>div svg{color:var(--premium-cyan)}.closing-contact>div{display:flex;align-items:center;gap:13px;font-size:14px;color:hsl(var(--primary-foreground)/.62);margin-top:30px}.closing-contact>div i{width:4px;height:4px;background:var(--premium-cyan);border-radius:50%}.closing-orbit{position:absolute;left:860px;top:165px;width:120px;height:440px;border-left:1px solid hsl(var(--accent-glow)/.3)}.closing-orbit span{position:absolute;left:-6px;width:11px;height:11px;background:var(--premium-cyan);border-radius:50%}.closing-orbit span:nth-child(1){top:0}.closing-orbit span:nth-child(2){top:50%}.closing-orbit span:nth-child(3){bottom:0}
  .premium-controls{position:fixed;z-index:20;left:50%;bottom:22px;transform:translateX(-50%);display:flex;align-items:center;gap:10px;padding:8px;background:hsl(var(--card)/.96);border:1px solid var(--premium-line);box-shadow:var(--shadow-elegant);border-radius:8px}.premium-controls>span{font-size:13px;font-weight:700;color:var(--premium-muted);padding:0 8px}.premium-controls button{border-radius:6px}.is-print{overflow:visible;background:var(--premium-paper)}.is-print .premium-slide{break-after:page;page-break-after:always}
  @page{size:1600px 900px landscape;margin:0}@media print{html,body,#root{margin:0;padding:0;background:var(--premium-paper)}.premium-slide{break-after:page;page-break-after:always}.premium-slide:last-child{break-after:auto;page-break-after:auto}}
  .about-layout{position:absolute;left:0;right:0;top:150px;height:600px;display:grid;grid-template-columns:minmax(0,1fr) 560px;gap:58px;align-items:start}
  .about-copy h2{font-family:var(--font-display,Sora,sans-serif);font-size:52px;line-height:1.06;letter-spacing:0;margin:16px 0 14px;font-weight:750}.about-copy h2 em{font-style:normal;color:var(--premium-blue)}
  .about-lead{font-size:21px;line-height:1.5;color:var(--premium-muted);max-width:770px;margin:0}
  .about-proof{margin-top:30px;display:flex;flex-direction:column;gap:15px}.about-proof>div{display:flex;align-items:center;gap:18px;border-left:3px solid hsl(var(--accent)/.3);padding-left:20px}.about-proof strong{display:block;font-size:19px}.about-proof span{display:block;font-size:15px;color:var(--premium-muted);margin-top:4px}
  .about-panel{height:600px;background:var(--premium-navy);color:hsl(var(--primary-foreground));border-radius:10px;padding:32px 34px;display:flex;flex-direction:column;box-shadow:var(--shadow-elegant)}
  .panel-head{display:flex;align-items:center;justify-content:space-between;padding-bottom:18px;border-bottom:1px solid hsl(var(--primary-foreground)/.16)}.panel-head .premium-logo{width:100px}.panel-head span{font-size:12px;font-weight:800;letter-spacing:.2em;color:var(--premium-cyan)}
  .panel-def{font-size:17px;line-height:1.5;color:hsl(var(--primary-foreground)/.8);margin:22px 0 0}
  .panel-block{margin-top:24px}.panel-block>small{display:block;font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--premium-cyan);margin-bottom:12px}
  .panel-hub{display:flex;align-items:center;gap:14px;padding:11px 0;border-top:1px solid hsl(var(--primary-foreground)/.1)}.panel-hub:first-of-type{border-top:0}.panel-hub svg{color:var(--premium-cyan)}.panel-hub b{display:block;font-size:18px}.panel-hub span{display:block;font-size:13px;color:hsl(var(--primary-foreground)/.6);margin-top:2px}
  .panel-reach{display:flex;align-items:center;gap:12px;margin-top:14px;padding:13px 16px;border:1px solid hsl(var(--accent-glow)/.32);background:hsl(var(--accent)/.14);border-radius:8px}.panel-reach svg{color:var(--premium-cyan)}.panel-reach b{font-size:21px;color:var(--premium-cyan)}.panel-reach span{font-size:13px;color:hsl(var(--primary-foreground)/.7)}
  .panel-pills{display:flex;flex-wrap:wrap;gap:9px}.panel-pills span{font-size:14px;font-weight:700;padding:9px 14px;border:1px solid hsl(var(--primary-foreground)/.2);border-radius:20px;color:hsl(var(--primary-foreground)/.85)}
  @media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
`;

export default ApresentacaoMytsPremium;