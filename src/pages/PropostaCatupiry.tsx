import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle, ArrowRight, BellRing, Building2, CalendarCheck, Check, CheckCircle2, ChevronLeft, ChevronRight,
  ClipboardCheck, Clock, Download, FileSpreadsheet, FileText, GraduationCap, History, Layers, Mail, MapPin,
  Phone, Rocket, Send, ShieldCheck, Sparkles, TrendingUp, Users, Workflow,
} from "lucide-react";
import { commercialClients } from "@/lib/commercial-proof";
import mytsLogo from "@/assets/myts-logo.svg";
import catupiryLogo from "@/assets/catupiry/catupiry-logo.png";
import labImg from "@/assets/catupiry/laticinio-qualidade.jpg";

const W = 1600, H = 900, TOTAL = 11;

const css = `
.cp{--red:#D7262E;--blue:#1B4B9B;--navy:#0D2550;--cream:#FBF6EC;--sand:#F1E7D3;--gold:#D9A441;--ink:#1A2236;--mute:#5B6478;--ok:#1F9D6B;font-family:Manrope,system-ui,sans-serif;color:var(--ink)}
.cp h1,.cp h2,.cp h3,.cp .disp{font-family:Sora,system-ui,sans-serif}
.cp-canvas{position:absolute;inset:0;width:${W}px;height:${H}px;overflow:hidden;background:var(--cream)}
.cp-canvas.dark{background:var(--navy);color:#fff}
.cp-pad{position:relative;height:100%;display:flex;flex-direction:column;padding:64px 72px 36px}
.cp-kick{display:flex;align-items:center;gap:14px;font-size:16px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--red)}
.cp-kick i{width:48px;height:2px;background:var(--red);opacity:.5}
.dark .cp-kick{color:var(--gold)} .dark .cp-kick i{background:var(--gold)}
.cp-title{font-size:52px;font-weight:700;line-height:1.08;margin-top:18px;max-width:1200px;letter-spacing:-.01em}
.cp-foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding-top:14px;font-size:14px;font-weight:700;color:var(--mute)}
.dark .cp-foot{color:rgba(255,255,255,.6)}
.cp-foot .lk{display:flex;align-items:center;gap:14px}
.cp-card{background:#fff;border:1px solid #E7DCC6;border-radius:22px;box-shadow:0 18px 40px -24px rgba(13,37,80,.35)}
.cp-ribbon{position:absolute;left:0;right:0;bottom:0;height:8px;background:linear-gradient(90deg,var(--red) 0 50%,var(--blue) 50% 100%)}
.cp-scallop{position:absolute;pointer-events:none;border-radius:50%;border:2px dashed currentColor}
.cp-ph{background:#FFF1C9;color:#8A5A00;border-radius:6px;padding:0 6px;font-weight:700}
.cp-win{overflow:hidden;border-radius:18px;background:#fff;border:1px solid #E3E7EF;box-shadow:0 30px 60px -30px rgba(13,37,80,.45)}
.cp-win-bar{height:42px;display:flex;align-items:center;gap:7px;padding:0 16px;background:#F3F5F9;border-bottom:1px solid #E3E7EF;font-size:14px;color:var(--mute)}
.cp-win-bar b{width:10px;height:10px;border-radius:50%}
.cp-tag{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:3px 11px;font-size:13px;font-weight:800}
@media print{@page{size:${W}px ${H}px;margin:0}.no-print{display:none!important}body{background:#fff}}
`;

const usePrint = () => {
  const [p, setP] = useState(false);
  useLayoutEffect(() => setP(new URLSearchParams(location.search).has("print")), []);
  return p;
};

const Frame = ({ children, print }: { children: React.ReactNode; print: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);
  useLayoutEffect(() => {
    if (print || !ref.current) return;
    const el = ref.current, up = () => setS(el.clientWidth / W);
    up(); const ro = new ResizeObserver(up); ro.observe(el); return () => ro.disconnect();
  }, [print]);
  if (print) return <section style={{ position: "relative", width: W, height: H, overflow: "hidden", breakAfter: "page" }}>{children}</section>;
  return (
    <div ref={ref} style={{ position: "relative", width: "min(100%, calc((100vh - 120px) * 16 / 9))", aspectRatio: "16/9", overflow: "hidden", borderRadius: 18, boxShadow: "0 30px 80px -30px rgba(0,0,0,.6)" }}>
      <div style={{ position: "absolute", inset: 0, width: W, height: H, transform: `scale(${s})`, transformOrigin: "top left", visibility: s ? "visible" : "hidden" }}>{children}</div>
    </div>
  );
};

const Slide = ({ n, dark, decor, children }: { n: number; dark?: boolean; decor?: React.ReactNode; children: React.ReactNode }) => (
  <div className={`cp-canvas ${dark ? "dark" : ""}`}>
    {decor}
    <div className="cp-pad">
      {children}
      <div className="cp-foot">
        <span className="lk">
          <img src={mytsLogo} alt="MyTS" style={{ height: 20, filter: dark ? "brightness(0) invert(1)" : "brightness(0)", opacity: dark ? .85 : 1 }} />
          <span style={{ opacity: .4 }}>×</span>
          <img src={catupiryLogo} alt="Catupiry" style={{ height: 26 }} />
        </span>
        <span>Proposta Comercial e Técnica · {String(n).padStart(2, "0")} / {TOTAL}</span>
      </div>
    </div>
    <div className="cp-ribbon" />
  </div>
);

const Kick = ({ n, t }: { n: string; t: string }) => <div className="cp-kick"><span>{n}</span><i />{t}</div>;
const Rings = ({ color = "var(--red)", style }: { color?: string; style?: React.CSSProperties }) => (
  <div aria-hidden style={{ position: "absolute", color, opacity: .14, ...style }}>
    {[0, 60, 120].map((d) => <div key={d} className="cp-scallop" style={{ inset: d, width: undefined }} />)}
  </div>
);

/* ---------------- Slides ---------------- */
const S1 = () => (
  <Slide n={1} dark decor={<>
    <div aria-hidden style={{ position: "absolute", right: -260, top: -120, width: 1000, height: 1000, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, #2B5CB5 0%, #16387A 45%, transparent 70%)" }} />
    <div aria-hidden style={{ position: "absolute", right: 120, top: 150, width: 540, height: 540, borderRadius: "50%", background: "var(--red)", boxShadow: "0 0 0 18px #F3E3C3, 0 0 0 30px var(--blue), 0 50px 120px -20px rgba(0,0,0,.6)" }} />
    <img src={catupiryLogo} alt="Catupiry" style={{ position: "absolute", right: 150, top: 180, width: 480, height: 480 }} />
    <Rings color="#F3E3C3" style={{ right: 20, top: 50, width: 740, height: 740 }} />
  </>}>
    <div className="flex items-center gap-4">
      <img src={mytsLogo} alt="MyTS" style={{ height: 40, filter: "brightness(0) invert(1)" }} />
      <span className="cp-tag" style={{ background: "rgba(255,255,255,.1)", color: "#F3E3C3", border: "1px solid rgba(255,255,255,.2)" }}>Versão 4.0 · 04/11/2026</span>
    </div>
    <div className="flex flex-1 flex-col justify-center" style={{ maxWidth: 820 }}>
      <p className="disp" style={{ fontSize: 20, letterSpacing: ".2em", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase" }}>Proposta Comercial e Técnica</p>
      <h1 style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, marginTop: 22, letterSpacing: "-.02em" }}>Catupiry <span style={{ color: "var(--gold)", fontWeight: 300 }}>×</span> MyTS</h1>
      <p style={{ fontSize: 30, lineHeight: 1.35, marginTop: 28, color: "rgba(255,255,255,.85)" }}>Gestão de fornecedores, homologação e não conformidades.</p>
      <div style={{ marginTop: 48, display: "flex", gap: 14, alignItems: "center", fontSize: 18, color: "rgba(255,255,255,.75)" }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--red)", display: "grid", placeItems: "center", fontWeight: 800, color: "#fff" }}>AT</span>
        <span><b style={{ color: "#fff" }}>André Tanzi</b> · andre.tanzi@myt-s.com</span>
      </div>
    </div>
  </Slide>
);

const S2 = () => (
  <Slide n={2} decor={<Rings style={{ right: -240, bottom: -260, width: 700, height: 700 }} />}>
    <Kick n="Carta" t="Para a equipe da Catupiry" />
    <div className="grid flex-1 items-center gap-14" style={{ gridTemplateColumns: "1fr 480px" }}>
      <div>
        <h2 className="cp-title" style={{ fontSize: 46 }}>Uma marca como a Catupiry não pode depender de <span style={{ color: "var(--red)" }}>planilha, e-mail e memória</span> para saber se os fornecedores estão em dia.</h2>
        <div style={{ marginTop: 30, fontSize: 21, lineHeight: 1.55, color: "var(--mute)", maxWidth: 860 }} className="space-y-4">
          <p>Esta proposta organiza isso em um lugar só: <b style={{ color: "var(--ink)" }}>quem entra</b> (homologação), <b style={{ color: "var(--ink)" }}>quem continua</b> (monitoramento) e <b style={{ color: "var(--ink)" }}>o que fazer quando algo sai do padrão</b> (não conformidades).</p>
          <p>E muda uma coisa importante: o fornecedor passa a acessar a MyTS, ver o que está pendente e enviar o que falta sem ninguém precisar cobrar. <b style={{ color: "var(--blue)" }}>A sua equipe só valida.</b></p>
          <p>Antes da formalização, podemos fazer uma conversa rápida para ajustar os detalhes técnicos.</p>
        </div>
      </div>
      <div className="cp-card" style={{ padding: 34 }}>
        <p className="disp" style={{ fontSize: 15, fontWeight: 800, letterSpacing: ".16em", color: "var(--red)", textTransform: "uppercase" }}>Seus contatos na MyTS</p>
        {[
          ["Comercial", "André Tanzi", "Diretor Comercial", "andre.tanzi@myt-s.com", "(14) 99637-0596", false],
          ["Implantação e suporte", "Felipe Dantas ou Guilherme Aliaga", "", "e-mail a confirmar", "(14) 99671-7173", true],
        ].map(([a, n, r, e, p, ph]) => (
          <div key={String(a)} style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid #EFE6D3" }}>
            <span className="cp-tag" style={{ background: "#EEF3FB", color: "var(--blue)" }}>{a}</span>
            <p className="disp" style={{ fontSize: 23, fontWeight: 700, marginTop: 10 }}>{ph ? <span className="cp-ph">{n}</span> : n}</p>
            {r && <p style={{ fontSize: 16, color: "var(--mute)" }}>{r}</p>}
            <p style={{ fontSize: 17, marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}><Mail size={17} color="var(--red)" />{ph ? <span className="cp-ph">{e}</span> : e}</p>
            <p style={{ fontSize: 17, marginTop: 4, display: "flex", gap: 8, alignItems: "center" }}><Phone size={17} color="var(--red)" />{p}</p>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

const S3 = () => {
  const items = ["O que entendemos da Catupiry", "O que muda com a MyTS", "Escopo desta proposta", "Quem é a MyTS", "Investimento", "Implantação", "Condições gerais"];
  return (
    <Slide n={3} dark decor={<div aria-hidden style={{ position: "absolute", left: -200, top: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(215,38,46,.35), transparent 65%)" }} />}>
      <Kick n="Sumário" t="O que você vai ver" />
      <div className="grid flex-1 items-center gap-16" style={{ gridTemplateColumns: "520px 1fr" }}>
        <h2 className="cp-title" style={{ fontSize: 64 }}>Uma proposta, <span style={{ color: "var(--gold)" }}>sete passos.</span></h2>
        <div className="grid gap-3">
          {items.map((t, i) => (
            <div key={t} className="flex items-center gap-6" style={{ padding: "14px 24px", borderRadius: 16, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
              <span className="disp" style={{ fontSize: 30, fontWeight: 800, color: i % 2 ? "#7FA6E8" : "#FF7A7F", width: 52 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 26, fontWeight: 600 }}>{t}</span>
              <ArrowRight size={22} style={{ marginLeft: "auto", opacity: .4 }} />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

const S4 = () => {
  const pains = [
    [Layers, "Fornecedores em níveis diferentes", "Cada um exige um acompanhamento diferente."],
    [FileSpreadsheet, "Planilha e e-mail", "Cobrança manual, um por um."],
    [Clock, "Tempo da equipe", "O monitoramento consome horas que deveriam ir para análise."],
    [History, "Histórico espalhado", "Quem aprovou, quando e por quê fica difícil de achar."],
    [TrendingUp, "Crescer custa caro", "Mais fornecedores significa mais gente ou mais risco."],
  ] as const;
  return (
    <Slide n={4}>
      <Kick n="01" t="O que entendemos da Catupiry" />
      <h2 className="cp-title">Hoje, a conformidade dos fornecedores <span style={{ color: "var(--red)" }}>pesa na sua equipe.</span></h2>
      <div className="grid flex-1 items-center gap-10" style={{ gridTemplateColumns: "1fr 520px" }}>
        <div className="grid grid-cols-2 gap-4">
          {pains.map(([I, t, d], i) => (
            <div key={t} className="cp-card flex gap-4" style={{ padding: "20px 22px", gridColumn: i === 4 ? "span 2" : undefined }}>
              <span style={{ width: 50, height: 50, borderRadius: 14, background: "#FDECEC", color: "var(--red)", display: "grid", placeItems: "center", flexShrink: 0 }}><I size={25} /></span>
              <div><p className="disp" style={{ fontSize: 21, fontWeight: 700 }}>{t}</p><p style={{ fontSize: 17, color: "var(--mute)", marginTop: 4 }}>{d}</p></div>
            </div>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          {/* inbox caótica */}
          <div className="cp-win" style={{ transform: "rotate(-2deg)" }}>
            <div className="cp-win-bar"><b style={{ background: "#F06A6A" }} /><b style={{ background: "#F3C04C" }} /><b style={{ background: "#5CC48C" }} /><span style={{ marginLeft: 10 }}>Caixa de entrada · Qualidade</span></div>
            {[["RE: RE: Laudo leite cru — vencido?", "Fornecedor A", "!"], ["Certidão atualizada (versão final 3)", "Fornecedor B", ""], ["Cobrança: alvará sanitário", "Você", "!"], ["FW: planilha_fornecedores_v12.xlsx", "Compras", ""], ["Onde está a aprovação de março?", "Auditoria", "!"]].map(([s, f, u]) => (
              <div key={s} className="flex items-center gap-3" style={{ padding: "13px 18px", borderBottom: "1px solid #F0F2F6", fontSize: 15 }}>
                <Mail size={16} color="#98A2B3" /><b style={{ width: 110, color: "var(--ink)" }}>{f}</b><span style={{ color: "var(--mute)", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s}</span>
                {u && <AlertTriangle size={16} color="var(--red)" />}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: -30, bottom: -110, background: "var(--navy)", color: "#fff", borderRadius: 18, padding: "20px 26px", maxWidth: 400, boxShadow: "0 20px 40px -20px rgba(0,0,0,.5)" }}>
            <p className="disp" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.25 }}>Isso não é falha da equipe. <span style={{ color: "var(--gold)" }}>É o modelo.</span></p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

const S5 = () => {
  const gains = [
    [ShieldCheck, "Proteger a marca", "Nenhum fornecedor entra ou continua sem o que foi combinado."],
    [Layers, "Tudo em um lugar só", "Fornecedores, documentos e evidências."],
    [ClipboardCheck, "Entrada com critério", "Homologação padronizada por categoria."],
    [BellRing, "Manutenção sem correria", "A MyTS avisa antes de vencer."],
    [Workflow, "Desvio com tratativa", "RNC registrada, com plano de ação e histórico auditável."],
    [Users, "Fornecedor com apoio", "Suporte da MyTS aos fornecedores durante a jornada."],
  ] as const;
  return (
    <Slide n={5} decor={<Rings color="var(--blue)" style={{ left: -300, top: -300, width: 640, height: 640 }} />}>
      <Kick n="02" t="O que muda com a MyTS" />
      <h2 className="cp-title">O que esta proposta resolve.</h2>
      <div className="grid flex-1 content-center gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {gains.map(([I, t, d], i) => (
          <div key={t} className="cp-card" style={{ padding: 24 }}>
            <span style={{ width: 52, height: 52, borderRadius: 14, background: i % 2 ? "#EEF3FB" : "#FDECEC", color: i % 2 ? "var(--blue)" : "var(--red)", display: "grid", placeItems: "center" }}><I size={26} /></span>
            <p className="disp" style={{ fontSize: 22, fontWeight: 700, marginTop: 14 }}>{t}</p>
            <p style={{ fontSize: 17, color: "var(--mute)", marginTop: 6, lineHeight: 1.45 }}>{d}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6" style={{ background: "var(--blue)", color: "#fff", borderRadius: 20, padding: "20px 28px", marginTop: 8 }}>
        <span style={{ background: "#fff", borderRadius: 14, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center", color: "var(--ink)", fontSize: 15, whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 10px 20px -10px rgba(0,0,0,.4)" }}>
          <BellRing size={18} color="var(--red)" /><b>MyTS</b> · Laudo microbiológico vence em 15 dias. <u style={{ color: "var(--blue)" }}>Enviar agora</u>
        </span>
        <p className="disp" style={{ fontSize: 24, fontWeight: 700 }}>Seu fornecedor não precisa que você cobre. <span style={{ color: "#FFD27A" }}>Ele já sabe o que está pendente.</span></p>
      </div>
    </Slide>
  );
};

const Bar = ({ v, c }: { v: number; c: string }) => <div style={{ height: 8, borderRadius: 9, background: "#EEF1F6", overflow: "hidden" }}><div style={{ width: `${v}%`, height: "100%", background: c }} /></div>;

const S6 = () => (
  <Slide n={6}>
    <Kick n="03" t="Escopo desta proposta" />
    <h2 className="cp-title">O que está incluso.</h2>
    <div className="grid flex-1 items-center gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <div className="grid gap-4">
        <div className="cp-card" style={{ padding: 24 }}>
          <span className="cp-tag" style={{ background: "var(--red)", color: "#fff" }}>Meus Fornecedores</span>
          {[[BellRing, "Monitoramento", "Pendências, prazos e alertas por requisito, para até 240 fornecedores."], [ClipboardCheck, "Homologação", "Critérios e etapas padronizados para cada novo fornecedor."], [Workflow, "RNC de Fornecedores", "Abertura, tratativa e encerramento com o próprio fornecedor."]].map(([I, t, d]) => {
            const Icon = I as typeof BellRing;
            return <div key={String(t)} className="flex gap-4" style={{ marginTop: 16 }}><Icon size={24} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} /><p style={{ fontSize: 18 }}><b className="disp">{String(t)}.</b> <span style={{ color: "var(--mute)" }}>{String(d)}</span></p></div>;
          })}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="cp-card" style={{ padding: 22 }}>
            <span className="cp-tag" style={{ background: "var(--blue)", color: "#fff" }}>Meus Processos</span>
            <p style={{ fontSize: 17, marginTop: 14 }}><b className="disp">RNC Internas.</b> <span style={{ color: "var(--mute)" }}>Não conformidades da operação, começando por um piloto de 60 dias.</span></p>
          </div>
          <div className="cp-card" style={{ padding: 22, background: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }}>
            <span className="cp-tag" style={{ background: "var(--gold)", color: "var(--navy)" }}>Acessos</span>
            <p style={{ fontSize: 17, marginTop: 14, display: "flex", gap: 8 }}><Check size={20} color="var(--gold)" />3 usuários extras para a equipe Catupiry</p>
            <p style={{ fontSize: 17, marginTop: 8, display: "flex", gap: 8 }}><Check size={20} color="var(--gold)" />Acesso gratuito para todos os fornecedores</p>
          </div>
        </div>
      </div>
      {/* Mockup painel */}
      <div className="cp-win">
        <div className="cp-win-bar"><b style={{ background: "#F06A6A" }} /><b style={{ background: "#F3C04C" }} /><b style={{ background: "#5CC48C" }} /><span style={{ marginLeft: 10 }}>MyTS · Meus Fornecedores · Catupiry</span></div>
        <div style={{ padding: 22 }}>
          <div className="grid grid-cols-3 gap-3">
            {[["240", "fornecedores", "var(--blue)"], ["18", "vencem em 30 dias", "var(--gold)"], ["3", "RNC abertas", "var(--red)"]].map(([v, l, c]) => (
              <div key={l} style={{ borderRadius: 14, background: "#F7F8FB", padding: "14px 16px" }}><p className="disp" style={{ fontSize: 30, fontWeight: 800, color: c }}>{v}</p><p style={{ fontSize: 13, color: "var(--mute)" }}>{l}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            {[["Laticínio Vale Verde", "Leite cru", 100, "Em dia", "var(--ok)"], ["Embalagens Paulista", "Bisnaga", 78, "Pendente", "var(--gold)"], ["Amido Brasil", "Ingrediente", 92, "Homologando", "var(--blue)"], ["Transportes Serra", "Logística", 55, "RNC aberta", "var(--red)"]].map(([n, c, v, s, col]) => (
              <div key={String(n)} className="grid items-center gap-3" style={{ gridTemplateColumns: "1fr 130px 110px", padding: "11px 4px", borderBottom: "1px solid #F0F2F6" }}>
                <div><p style={{ fontSize: 15, fontWeight: 700 }}>{n}</p><p style={{ fontSize: 12, color: "var(--mute)" }}>{c}</p></div>
                <Bar v={Number(v)} c={String(col)} />
                <span className="cp-tag" style={{ background: "#F5F6F9", color: String(col), justifySelf: "end" }}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#98A2B3", marginTop: 12 }}>Tela ilustrativa · nomes fictícios</p>
        </div>
      </div>
    </div>
  </Slide>
);

const S7 = () => {
  const logos = commercialClients.slice(0, 6);
  return (
    <Slide n={7} decor={<Rings style={{ right: -280, top: -280, width: 700, height: 700 }} />}>
      <Kick n="04" t="Quem é a MyTS" />
      <div className="grid flex-1 items-center gap-12" style={{ gridTemplateColumns: "1fr 560px" }}>
        <div>
          <h2 className="cp-title" style={{ fontSize: 56 }}>Nascemos na <span style={{ color: "var(--red)" }}>indústria de alimentos.</span></h2>
          <p style={{ fontSize: 21, lineHeight: 1.5, color: "var(--mute)", marginTop: 20, maxWidth: 760 }}>A MyTS cuida da gestão de fornecedores, processos e documentos para alimentos, bebidas, cosméticos e bens de consumo. Dois pontos fortes: <b style={{ color: "var(--ink)" }}>a tecnologia</b> e <b style={{ color: "var(--ink)" }}>um time técnico que acompanha a implantação.</b></p>
          <div className="flex flex-wrap gap-3" style={{ marginTop: 24 }}>
            {[[MapPin, "Botucatu (BR) e Charlotte (EUA)"], [Building2, "Presença em mais de 20 países"], [GraduationCap, "Implantação guiada por especialistas"]].map(([I, t]) => {
              const Icon = I as typeof MapPin;
              return <span key={String(t)} className="cp-tag" style={{ background: "#fff", border: "1px solid #E7DCC6", color: "var(--ink)", fontSize: 16, padding: "9px 16px" }}><Icon size={18} color="var(--blue)" />{String(t)}</span>;
            })}
          </div>
          <div className="grid grid-cols-6 items-center gap-5" style={{ marginTop: 32 }}>
            {logos.map((c) => <img key={c.name} src={c.src} alt={c.name} style={{ maxHeight: 46, maxWidth: "100%", objectFit: "contain", margin: "0 auto" }} />)}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img src={labImg} alt="Especialista avaliando queijo em laboratório de qualidade" width={1280} height={960} style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 24 }} />
          <div className="cp-card" style={{ position: "absolute", left: -40, bottom: -50, right: 40, padding: "22px 26px", borderLeft: "6px solid var(--red)" }}>
            <p className="disp" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.35 }}>“<span className="cp-ph">frase exata da Larissa</span>”</p>
            <p style={{ fontSize: 15, color: "var(--mute)", marginTop: 8 }}><b style={{ color: "var(--ink)" }}>Larissa Garcia</b> · Qualidade, Augusta Alimentos</p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

const S8 = () => {
  const rows = [["Monitoramento de Fornecedores (121 a 240)", "R$ 1.140,00"], ["Homologação de Fornecedores", "R$ 570,00"], ["RNC de Fornecedores", "R$ 570,00"], ["3 usuários extras", "R$ 90,00"]];
  return (
    <Slide n={8}>
      <Kick n="05" t="Investimento" />
      <h2 className="cp-title">Investimento.</h2>
      <div className="grid flex-1 items-center gap-8" style={{ gridTemplateColumns: "1fr 470px" }}>
        <div className="cp-card" style={{ overflow: "hidden" }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 220px", padding: "14px 28px", background: "var(--navy)", color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}><span>Item</span><span style={{ textAlign: "right" }}>Valor mensal</span></div>
          {rows.map(([i, v]) => <div key={i} className="grid" style={{ gridTemplateColumns: "1fr 220px", padding: "16px 28px", borderBottom: "1px solid #F1E9D8", fontSize: 20 }}><span>{i}</span><span className="disp" style={{ textAlign: "right", fontWeight: 700 }}>{v}</span></div>)}
          <div className="grid items-center" style={{ gridTemplateColumns: "1fr 220px", padding: "18px 28px", background: "#FDECEC" }}><b className="disp" style={{ fontSize: 22 }}>Mensalidade</b><b className="disp" style={{ textAlign: "right", fontSize: 30, color: "var(--red)" }}>R$ 2.370,00</b></div>
          <div className="grid items-center" style={{ gridTemplateColumns: "1fr 260px", padding: "16px 28px", fontSize: 18 }}>
            <span className="flex items-center gap-3"><Sparkles size={20} color="var(--blue)" /><b>RNC Internas:</b> piloto de 60 dias sem custo</span>
            <span style={{ textAlign: "right", color: "var(--mute)" }}>após o piloto: R$ 570,00 <span className="cp-ph">a confirmar</span></span>
          </div>
        </div>
        <div className="grid gap-4">
          <div style={{ background: "var(--blue)", color: "#fff", borderRadius: 22, padding: 28 }}>
            <p style={{ fontSize: 15, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", opacity: .8 }}>Implantação · pagamento único</p>
            <p className="disp" style={{ fontSize: 50, fontWeight: 800, marginTop: 6 }}>R$ 4.740,00</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="cp-card" style={{ padding: 20 }}><CalendarCheck color="var(--red)" /><p style={{ fontSize: 14, color: "var(--mute)", marginTop: 8 }}>Faturamento a partir de</p><p className="disp" style={{ fontSize: 24, fontWeight: 800 }}>05/01/2027</p></div>
            <div className="cp-card" style={{ padding: 20 }}><Clock color="var(--red)" /><p style={{ fontSize: 14, color: "var(--mute)", marginTop: 8 }}>Validade da proposta</p><p className="disp" style={{ fontSize: 22, fontWeight: 800 }}><span className="cp-ph">7 ou 30</span> dias</p></div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--mute)" }}>O piloto de 60 dias vale só para RNC Internas e serve para testar e simular o processo de não conformidades internas da Catupiry. As demais frentes são ativadas ao mesmo tempo, já em operação.</p>
        </div>
      </div>
    </Slide>
  );
};

const S9 = () => {
  const steps = [[Rocket, "Kickoff", "Objetivo, escopo, quem decide o quê e a cadência."], [Layers, "Setup", "Requisitos, critérios e fluxos de homologação, monitoramento e RNC. Base de fornecedores organizada."], [GraduationCap, "Treinamento", "A equipe Catupiry aprende a solicitar, revisar e aprovar."], [Send, "Ativação", "Fornecedores são convidados, entram e começam a enviar documentos."], [TrendingUp, "Operação assistida", "Ajustamos a jornada com base no uso real."]] as const;
  return (
    <Slide n={9} dark decor={<div aria-hidden style={{ position: "absolute", right: -200, bottom: -300, width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(43,92,181,.5), transparent 65%)" }} />}>
      <Kick n="06" t="Implantação" />
      <h2 className="cp-title">Do aceite à operação, <span style={{ color: "var(--gold)" }}>em 5 etapas.</span></h2>
      <div className="relative flex-1" style={{ marginTop: 40 }}>
        <div aria-hidden style={{ position: "absolute", left: 60, right: 60, top: 46, height: 4, borderRadius: 4, background: "linear-gradient(90deg, var(--red), var(--gold), #7FA6E8)" }} />
        <div className="grid grid-cols-5 gap-5">
          {steps.map(([I, t, d], i) => (
            <div key={t} className="flex flex-col items-center text-center">
              <span style={{ width: 96, height: 96, borderRadius: "50%", background: i === 4 ? "var(--gold)" : "#fff", color: i === 4 ? "var(--navy)" : "var(--red)", display: "grid", placeItems: "center", position: "relative", boxShadow: "0 0 0 8px var(--navy), 0 0 0 10px rgba(255,255,255,.2)" }}><I size={38} /></span>
              <p style={{ marginTop: 22, fontSize: 14, fontWeight: 800, letterSpacing: ".16em", color: "var(--gold)" }}>ETAPA {i + 1}</p>
              <p className="disp" style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>{t}</p>
              <p style={{ fontSize: 17, lineHeight: 1.45, color: "rgba(255,255,255,.72)", marginTop: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "14px 16px" }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

const S10 = () => (
  <Slide n={10} decor={<Rings color="var(--blue)" style={{ left: -260, bottom: -300, width: 640, height: 640 }} />}>
    <Kick n="07" t="Condições gerais" />
    <h2 className="cp-title">Condições gerais.</h2>
    <div className="grid flex-1 items-center gap-10" style={{ gridTemplateColumns: "560px 1fr" }}>
      <div className="cp-card" style={{ padding: 32, position: "relative" }}>
        <div className="flex items-center gap-4">
          <span style={{ width: 64, height: 80, borderRadius: 10, background: "#EEF3FB", display: "grid", placeItems: "center", color: "var(--blue)" }}><FileText size={34} /></span>
          <div><span className="cp-tag" style={{ background: "var(--blue)", color: "#fff" }}>CT04</span><p className="disp" style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>Termo de Aceite e Condições de Uso da MyTS</p></div>
        </div>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--mute)", marginTop: 20 }}>As cláusulas de pagamento, acesso, proteção de dados e uso estão no CT04, que faz parte desta proposta.</p>
        <div className="flex gap-2" style={{ marginTop: 18 }}>{["Pagamento", "Acesso", "Proteção de dados", "Uso"].map((t) => <span key={t} className="cp-tag" style={{ background: "#F5EFE2", color: "var(--ink)" }}>{t}</span>)}</div>
      </div>
      <div>
        <p className="disp" style={{ fontSize: 26, fontWeight: 700 }}>Logo após o aceite, a MyTS envia:</p>
        <div className="grid gap-4" style={{ marginTop: 20 }}>
          {["Cronograma de treinamento da equipe", "Estrutura dos requisitos na MyTS", "Próximos passos para o acesso dos fornecedores"].map((t, i) => (
            <div key={t} className="cp-card flex items-center gap-5" style={{ padding: "20px 24px" }}>
              <span className="disp" style={{ width: 48, height: 48, borderRadius: "50%", background: i === 1 ? "var(--blue)" : "var(--red)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 20 }}>{i + 1}</span>
              <span style={{ fontSize: 22, fontWeight: 600 }}>{t}</span>
              <CheckCircle2 size={26} color="var(--ok)" style={{ marginLeft: "auto" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Slide>
);

const S11 = () => (
  <Slide n={11} dark decor={<>
    <div aria-hidden style={{ position: "absolute", left: "50%", top: 170, transform: "translateX(-50%)", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(215,38,46,.35), transparent 60%)" }} />
    <Rings color="#F3E3C3" style={{ left: "50%", top: 60, width: 760, height: 760, transform: "translateX(-50%)" }} />
  </>}>
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="flex items-center gap-8">
        <img src={mytsLogo} alt="MyTS" style={{ height: 48, filter: "brightness(0) invert(1)" }} />
        <span style={{ fontSize: 40, color: "var(--gold)", fontWeight: 300 }}>×</span>
        <img src={catupiryLogo} alt="Catupiry" style={{ height: 120 }} />
      </div>
      <h2 className="disp" style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.1, marginTop: 40, maxWidth: 1200 }}>Fornecedor em dia, equipe livre para decidir e <span style={{ color: "var(--gold)" }}>uma marca protegida.</span></h2>
      <p style={{ fontSize: 26, marginTop: 20, color: "rgba(255,255,255,.8)" }}>É isso que queremos construir com a Catupiry.</p>
      <div className="flex items-center gap-8" style={{ marginTop: 44, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 20, padding: "18px 30px", fontSize: 19 }}>
        <span><b>André Tanzi</b> · Diretor Comercial | MyTS</span>
        <span className="flex items-center gap-2"><Mail size={18} color="var(--gold)" />andre.tanzi@myt-s.com</span>
        <span className="flex items-center gap-2"><Phone size={18} color="var(--gold)" />(14) 99637-0596</span>
        <span style={{ color: "var(--gold)", fontWeight: 700 }}>myt-s.com</span>
      </div>
    </div>
  </Slide>
);

const slides = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11];

export default function PropostaCatupiry() {
  const print = usePrint();
  const [i, setI] = useState(() => Math.min(TOTAL - 1, Math.max(0, Number(new URLSearchParams(location.search).get("slide") || 1) - 1)));
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") setI((x) => Math.min(TOTAL - 1, x + 1)); if (e.key === "ArrowLeft") setI((x) => Math.max(0, x - 1)); };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);
  useEffect(() => { if (!print) history.replaceState(null, "", `?slide=${i + 1}`); }, [i, print]);
  const Cur = slides[i];
  return (
    <div className="cp">
      <Helmet><title>Proposta Catupiry × MyTS</title><meta name="description" content="Proposta comercial e técnica MyTS para a Catupiry." /></Helmet>
      <style>{css}</style>
      {print ? slides.map((S, k) => <Frame key={k} print><S /></Frame>) : (
        <div style={{ minHeight: "100vh", background: "#0A1A3A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 20 }}>
          <Frame print={false}><Cur /></Frame>
          <div className="no-print flex items-center gap-3" style={{ color: "#fff" }}>
            <button aria-label="Anterior" onClick={() => setI(Math.max(0, i - 1))} style={{ padding: 10, borderRadius: 999, background: "rgba(255,255,255,.1)" }}><ChevronLeft /></button>
            <span style={{ fontSize: 14, minWidth: 70, textAlign: "center" }}>{i + 1} / {TOTAL}</span>
            <button aria-label="Próximo" onClick={() => setI(Math.min(TOTAL - 1, i + 1))} style={{ padding: 10, borderRadius: 999, background: "rgba(255,255,255,.1)" }}><ChevronRight /></button>
            <a href="?print" target="_blank" rel="noreferrer" className="flex items-center gap-2" style={{ marginLeft: 12, padding: "8px 16px", borderRadius: 999, background: "#D7262E", fontSize: 14, fontWeight: 700 }}><Download size={16} />Versão PDF</a>
          </div>
        </div>
      )}
    </div>
  );
}
