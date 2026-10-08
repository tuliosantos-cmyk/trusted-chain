import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Building2,
  FileStack,
  Workflow,
  ShieldCheck,
  ListChecks,
  Gauge,
  Users,
  Globe2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Check,
  Search,
  ClipboardCheck,
  Network,
  FileText,
  AlertTriangle,
  Download,
  Factory,
  Handshake,
  Eye,
  BellRing,
  BarChart3,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import carrefourLogo from "@/assets/clientes/Carrefour_logo.png";
import korinLogo from "@/assets/clientes/Korin_logo.png";
import cvaleLogo from "@/assets/clientes/C._Vale_logo.png";
import cfsLogo from "@/assets/clientes/CFS_logo.png";
import carbexLogo from "@/assets/clientes/Carbex_logo.png";
import viskaseLogo from "@/assets/clientes/Viskase_logo.png";

/* ============================================================
   MATERIAL COMERCIAL MYTS — follow-up do SDR
   Canvas fixo 1600x900, mesmo sistema dos decks anteriores
   ============================================================ */
const CANVAS_W = 1600;
const CANVAS_H = 900;
const PAD = 64;
const TOTAL = 9;

const clientLogos = [
  { name: "Carrefour", url: carrefourLogo },
  { name: "Korin", url: korinLogo },
  { name: "C.Vale", url: cvaleLogo },
  { name: "CFS", url: cfsLogo },
  { name: "Carbex", url: carbexLogo },
  { name: "Viskase", url: viskaseLogo },
];

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => {
    setPrint(new URLSearchParams(window.location.search).has("print"));
  }, []);
  return print;
};

const Slide = ({
  tone = "light",
  children,
  decor,
}: {
  tone?: "light" | "dark";
  children: React.ReactNode;
  decor?: React.ReactNode;
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const printMode = usePrintMode();
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    if (printMode) return;
    const el = frameRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / CANVAS_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [printMode]);

  return (
    <section className={`mc-slide-frame ${printMode ? "mc-print-frame" : ""}`}>
      <div
        ref={frameRef}
        className="mc-slide-viewport"
        style={printMode ? { width: CANVAS_W, height: CANVAS_H } : undefined}
      >
        <div
          className={`mc-slide mc-${tone}`}
          style={
            printMode
              ? undefined
              : { transform: `scale(${scale})`, opacity: scale ? 1 : 0 }
          }
        >
          {decor}
          <div className="mc-content">{children}</div>
        </div>
      </div>
    </section>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mc-eyebrow">{children}</p>
);

const Footer = ({ n, dark }: { n: number; dark?: boolean }) => (
  <div className={`mc-footer ${dark ? "mc-footer-dark" : ""}`}>
    <img src={mytsLogo} alt="MyTS" className="mc-footer-logo" />
    <span>
      {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
    </span>
  </div>
);

/* ---------------- Mockups da plataforma ---------------- */

const MockWindow = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mc-mock ${className}`}>
    <div className="mc-mock-bar">
      <span />
      <span />
      <span />
      <em>{title}</em>
    </div>
    <div className="mc-mock-body">{children}</div>
  </div>
);

const DocumentsMock = () => (
  <MockWindow title="MyTS · Meus Documentos" className="mc-mock-docs">
    <div className="mc-mock-kpis">
      <div>
        <strong>128</strong>
        <span>documentos ativos</span>
      </div>
      <div>
        <strong>07</strong>
        <span>vencem em 30 dias</span>
      </div>
      <div>
        <strong>96%</strong>
        <span>lista mestra em dia</span>
      </div>
    </div>
    <div className="mc-mock-rows">
      {[
        ["POP — Higienização de linha", "vigente", true],
        ["Certificado FSSC 22000", "vence em 12 dias", false],
        ["Laudo microbiológico", "vigente", true],
        ["Política de qualidade", "vigente", true],
      ].map(([label, status, ok]) => (
        <div className="mc-mock-row" key={label as string}>
          <FileText size={18} />
          <span className="mc-mock-row-label">{label}</span>
          <span className={`mc-pill ${ok ? "mc-pill-ok" : "mc-pill-warn"}`}>
            {status}
          </span>
        </div>
      ))}
    </div>
  </MockWindow>
);

const SuppliersMock = () => (
  <MockWindow title="MyTS · Meus Fornecedores" className="mc-mock-sup">
    <div className="mc-mock-sup-head">
      <div>
        <strong>Alimentos Litoral Ltda.</strong>
        <span>Homologado · Categoria: ingredientes</span>
      </div>
      <div className="mc-iqf">
        <strong>92</strong>
        <span>IQF</span>
      </div>
    </div>
    <div className="mc-mock-sup-grid">
      {[
        ["Certidões", "12/12", true],
        ["Laudos", "8/8", true],
        ["Autoavaliação", "concluída", true],
        ["RNC abertas", "0", true],
      ].map(([k, v, ok]) => (
        <div className="mc-mock-sup-cell" key={k as string}>
          <span>{k}</span>
          <strong>{v}</strong>
          {ok ? <Check size={16} /> : null}
        </div>
      ))}
    </div>
    <div className="mc-mock-sup-bar">
      <span>Matriz de risco</span>
      <div className="mc-risk-bar">
        <i style={{ width: "18%" }} />
      </div>
      <em>baixo</em>
    </div>
  </MockWindow>
);

/* ---------------- Slides ---------------- */

const S01 = () => (
  <Slide
    tone="dark"
    decor={
      <>
        <div className="mc-glow mc-glow-a" />
        <div className="mc-glow mc-glow-b" />
        <div className="mc-grid-bg" />
      </>
    }
  >
    <div className="mc-cover">
      <img src={mytsLogo} alt="MyTS" className="mc-cover-logo" />
      <p className="mc-cover-tag">MY TRUSTED SOURCE</p>
      <h1>
        Conectando empresas, fornecedores e processos para uma cadeia de
        suprimentos <em>confiável</em>
      </h1>
      <p className="mc-cover-sub">
        Plataforma inteligente para Compras, Qualidade, P&amp;D, ESG e
        Compliance
      </p>
      <div className="mc-cover-stats">
        {[
          ["+ 1.500", "empresas ativas na rede"],
          ["50K +", "documentos gerenciados"],
          ["+ 200", "processos ativos"],
          ["+ 20", "países alcançados"],
        ].map(([v, l]) => (
          <div key={l}>
            <strong>{v}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
    <Footer n={1} dark />
  </Slide>
);

const S02 = () => (
  <Slide tone="light">
    <div className="mc-about">
      <div className="mc-about-copy">
        <Eyebrow>Sobre a MyTS</Eyebrow>
        <h2>
          My Trusted Source.
          <br />
          <em>O nome já diz o que somos.</em>
        </h2>
        <p className="mc-lead">
          Uma plataforma que nasceu dentro da indústria de alimentos para
          resolver o que planilha e e-mail nunca deram conta: reunir empresas,
          fornecedores e processos em uma única base confiável.
        </p>
        <div className="mc-about-proofs">
          {[
            {
              icon: ShieldCheck,
              t: "Base única de verdade",
              d: "Documentos, certidões e histórico de fornecedores centralizados e auditáveis.",
            },
            {
              icon: ClipboardCheck,
              t: "Fluxos auditáveis",
              d: "Homologação, autoavaliação e RNC com etapas, responsáveis e evidências.",
            },
            {
              icon: Network,
              t: "Rede de campo",
              d: "Mais de 100 auditores e especialistas no Brasil e no exterior.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <div className="mc-proof" key={t}>
              <div className="mc-icon">
                <Icon size={26} />
              </div>
              <div>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="mc-about-panel">
        <img src={mytsLogo} alt="MyTS" />
        <p className="mc-panel-def">
          Tecnologia e conhecimento técnico trabalhando juntos para centralizar
          dados, integrar fluxos e acelerar decisões em toda a cadeia de
          suprimentos.
        </p>
        <div className="mc-panel-block">
          <span>ONDE ESTAMOS</span>
          <p>
            <MapPin size={16} /> Botucatu · SP · Brasil
          </p>
          <p>
            <MapPin size={16} /> Charlotte · NC · EUA
          </p>
          <p>
            <Globe2 size={16} /> Operação em +20 países
          </p>
        </div>
        <div className="mc-panel-block">
          <span>ATUAÇÃO</span>
          <div className="mc-panel-pills">
            {["Compras", "Qualidade", "P&D", "ESG", "Compliance"].map((p) => (
              <em key={p}>{p}</em>
            ))}
          </div>
        </div>
      </aside>
    </div>
    <Footer n={2} />
  </Slide>
);

const S03 = () => (
  <Slide tone="dark" decor={<div className="mc-grid-bg" />}>
    <Eyebrow>Metodologia de gestão</Eyebrow>
    <h2 className="mc-h2-dark">
      Uma jornada completa, da prospecção ao monitoramento
    </h2>
    <div className="mc-journey">
      {[
        {
          n: "01",
          icon: Search,
          t: "Prospecção inteligente",
          s: "Desenvolvimento da cadeia",
          d: "Conectamos empresas a fornecedores e especialistas qualificados para expandir e fortalecer a cadeia de suprimentos de forma segura e sustentável.",
        },
        {
          n: "02",
          icon: Workflow,
          t: "Homologação personalizada",
          s: "Critérios técnicos & regulatórios",
          d: "Fluxos customizados por área (Qualidade, Compras, P&D) com etapas auditáveis, critérios sanitários e gestão centralizada de dados.",
        },
        {
          n: "03",
          icon: Eye,
          t: "Monitoramento contínuo",
          s: "Visibilidade & mitigação de risco",
          d: "Acompanhamento ativo da base com alertas automáticos de vencimento, evidências organizadas e relatórios prontos para auditorias.",
        },
      ].map(({ n, icon: Icon, t, s, d }, i) => (
        <div className="mc-journey-step" key={n}>
          <span className="mc-journey-n">{n}</span>
          <div className="mc-icon mc-icon-dark">
            <Icon size={28} />
          </div>
          <strong>{t}</strong>
          <em>{s}</em>
          <p>{d}</p>
          {i < 2 && <ArrowRight className="mc-journey-arrow" size={30} />}
        </div>
      ))}
    </div>
    <Footer n={3} dark />
  </Slide>
);

const S04 = () => (
  <Slide tone="light">
    <Eyebrow>Aplicações e soluções integradas</Eyebrow>
    <h2>Uma plataforma, seis frentes de trabalho</h2>
    <div className="mc-sol-grid">
      {[
        {
          icon: Handshake,
          t: "Homologação de fornecedores",
          d: "Workflow customizado com critérios sanitários, técnicos e regulatórios para qualificação rápida e segura de parceiros.",
        },
        {
          icon: FileStack,
          t: "Gestão documental & lista mestra",
          d: "Centralização de arquivos internos e externos com suporte completo à Lista Mestra para certificações, validades e aprovações.",
        },
        {
          icon: Gauge,
          t: "Monitoramento contínuo B2B",
          d: "Acompanhamento em tempo real com matriz de risco personalizada, gestão de certidões, laudos e status de parceiros.",
        },
        {
          icon: ListChecks,
          t: "Autoavaliação & checklists",
          d: "Formulários interativos (Self-Assessment) para diagnósticos remotos de qualidade, segurança dos alimentos, BPF e critérios ESG.",
        },
        {
          icon: AlertTriangle,
          t: "Gestão de RNC & processos",
          d: "Registro e controle estruturado de Relatórios de Não Conformidade, planos de ação e histórico de desempenho de fornecedores.",
        },
        {
          icon: ShieldCheck,
          t: "Prontidão para auditorias",
          d: "Visibilidade total e painéis intuitivos preparados para auditorias de 2ª parte, FSSC 22000, ISO e conformidade sanitária.",
        },
      ].map(({ icon: Icon, t, d }) => (
        <div className="mc-sol-card" key={t}>
          <div className="mc-icon">
            <Icon size={26} />
          </div>
          <strong>{t}</strong>
          <p>{d}</p>
        </div>
      ))}
    </div>
    <Footer n={4} />
  </Slide>
);

const S05 = () => (
  <Slide tone="light">
    <div className="mc-mock-layout">
      <div className="mc-mock-copy">
        <Eyebrow>Módulo · Meus Documentos</Eyebrow>
        <h2>Gestão documental &amp; lista mestra</h2>
        <p className="mc-lead">
          Centralização de arquivos internos, procedimentos operacionais
          (POPs), políticas e atendimento à exigência de Lista Mestra de
          documentos para normas e certificações.
        </p>
        <ul className="mc-check-list">
          <li>
            <Check size={20} /> Alertas automáticos de vencimento
          </li>
          <li>
            <Check size={20} /> Versionamento e aprovações registradas
          </li>
          <li>
            <Check size={20} /> Evidências organizadas para auditoria
          </li>
        </ul>
      </div>
      <DocumentsMock />
    </div>
    <Footer n={5} />
  </Slide>
);

const S06 = () => (
  <Slide tone="light">
    <div className="mc-mock-layout mc-mock-layout-rev">
      <SuppliersMock />
      <div className="mc-mock-copy">
        <Eyebrow>Módulo · Meus Fornecedores</Eyebrow>
        <h2>Gestão e desenvolvimento B2B</h2>
        <p className="mc-lead">
          Painel completo para qualificar, solicitar certidões e acompanhar
          fornecedores em tempo real, com controle de requisitos e histórico
          centralizado.
        </p>
        <ul className="mc-check-list">
          <li>
            <Check size={20} /> Nota IQF calculada automaticamente
          </li>
          <li>
            <Check size={20} /> Matriz de risco personalizada
          </li>
          <li>
            <Check size={20} /> Status de cada parceiro em tempo real
          </li>
        </ul>
      </div>
    </div>
    <Footer n={6} />
  </Slide>
);

const S07 = () => (
  <Slide tone="dark" decor={<div className="mc-grid-bg" />}>
    <Eyebrow>Módulo · Processos e Autoavaliação</Eyebrow>
    <h2 className="mc-h2-dark">
      Workflows inteligentes, do checklist ao plano de ação
    </h2>
    <div className="mc-flow">
      {[
        {
          icon: ListChecks,
          t: "Checklist de autoavaliação",
          d: "Formulários técnicos aplicados remotamente, internos ou em parceiros.",
        },
        {
          icon: BarChart3,
          t: "Nota calculada (IQF)",
          d: "Pontuação objetiva do fornecedor, comparável ao longo do tempo.",
        },
        {
          icon: AlertTriangle,
          t: "Registro de RNC",
          d: "Não conformidades registradas com evidência e responsável.",
        },
        {
          icon: ClipboardCheck,
          t: "Plano de ação",
          d: "Tratativa acompanhada até o fechamento, com histórico completo.",
        },
      ].map(({ icon: Icon, t, d }, i, arr) => (
        <div className="mc-flow-step" key={t}>
          <div className="mc-icon mc-icon-dark">
            <Icon size={26} />
          </div>
          <strong>{t}</strong>
          <p>{d}</p>
          {i < arr.length - 1 && (
            <ArrowRight className="mc-flow-arrow" size={26} />
          )}
        </div>
      ))}
    </div>
    <div className="mc-flow-note">
      <BellRing size={22} />
      <span>
        Alertas automáticos e relatórios prontos mantêm a base em dia sem
        trabalho manual.
      </span>
    </div>
    <Footer n={7} dark />
  </Slide>
);

const S08 = () => (
  <Slide tone="light">
    <Eyebrow>Serviços especializados &amp; suporte global</Eyebrow>
    <h2>Tecnologia com gente de verdade em campo</h2>
    <div className="mc-serv-layout">
      <div className="mc-serv-hero">
        <strong>100+</strong>
        <span>
          auditores e especialistas no Brasil e no exterior, com presença
          regional e atendimento qualificado
        </span>
        <div className="mc-serv-map">
          <div className="mc-serv-dot mc-serv-dot-a">
            <MapPin size={20} />
            <em>Botucatu · BR</em>
          </div>
          <div className="mc-serv-dot mc-serv-dot-b">
            <MapPin size={20} />
            <em>Charlotte · EUA</em>
          </div>
          <div className="mc-serv-line" />
        </div>
      </div>
      <div className="mc-serv-grid">
        {[
          {
            icon: Users,
            t: "Rede internacional de auditores",
            d: "Atendimento rápido e qualificado, com presença regional.",
          },
          {
            icon: Factory,
            t: "Visitas técnicas in loco",
            d: "Verificação em campo de instalações, BPF e operações.",
          },
          {
            icon: ShieldCheck,
            t: "Auditorias de 2ª parte",
            d: "Avaliação independente de fornecedores segundo os critérios da sua empresa.",
          },
          {
            icon: FileText,
            t: "Autoavaliação customizada",
            d: "Questionários técnicos e diagnósticos aplicados em públicos internos e parceiros.",
          },
        ].map(({ icon: Icon, t, d }) => (
          <div className="mc-serv-card" key={t}>
            <div className="mc-icon">
              <Icon size={24} />
            </div>
            <strong>{t}</strong>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer n={8} />
  </Slide>
);

const S09 = () => (
  <Slide
    tone="dark"
    decor={
      <>
        <div className="mc-glow mc-glow-a" />
        <div className="mc-grid-bg" />
      </>
    }
  >
    <div className="mc-closing">
      <Eyebrow>Quem já confia</Eyebrow>
      <div className="mc-clients">
        {clientLogos.map((c) => (
          <div className="mc-client" key={c.name}>
            <img src={c.url} alt={c.name} />
          </div>
        ))}
      </div>
      <h2>
        Visibilidade total, controle completo e conformidade garantida para a
        sua empresa.
      </h2>
      <div className="mc-contact">
        <div>
          <Phone size={22} />
          <span>+55 14 9 9682-3691</span>
        </div>
        <div>
          <Mail size={22} />
          <span>ricardo.machado@myt-s.com</span>
        </div>
        <div>
          <Globe2 size={22} />
          <span>myt-s.com</span>
        </div>
        <div>
          <Building2 size={22} />
          <span>Botucatu · SP · Brasil &nbsp;|&nbsp; Charlotte · NC · EUA</span>
        </div>
      </div>
    </div>
    <Footer n={9} dark />
  </Slide>
);

const slides = [S01, S02, S03, S04, S05, S06, S07, S08, S09];

/* ---------------- Página ---------------- */

const css = `
.mc-slide-frame{position:relative;width:100%;height:100%;}
.mc-print-frame{page-break-after:always;break-after:page;}
.mc-slide-viewport{position:relative;width:100%;height:100%;overflow:hidden;}
.mc-slide{position:absolute;left:0;top:0;width:${CANVAS_W}px;height:${CANVAS_H}px;transform-origin:top left;overflow:hidden;font-family:Manrope,system-ui,sans-serif;}
.mc-light{background:hsl(220 30% 98%);color:hsl(222 47% 11%);}
.mc-dark{background:hsl(222 47% 8%);color:hsl(210 40% 96%);}
.mc-content{position:relative;z-index:2;padding:${PAD}px;height:100%;display:flex;flex-direction:column;}
.mc-grid-bg{position:absolute;inset:0;background-image:linear-gradient(hsl(217 91% 60% / .06) 1px,transparent 1px),linear-gradient(90deg,hsl(217 91% 60% / .06) 1px,transparent 1px);background-size:64px 64px;}
.mc-glow{position:absolute;border-radius:50%;filter:blur(120px);}
.mc-glow-a{width:700px;height:700px;right:-200px;top:-250px;background:hsl(217 91% 60% / .22);}
.mc-glow-b{width:500px;height:500px;left:-150px;bottom:-200px;background:hsl(190 95% 55% / .12);}
.mc-eyebrow{font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:hsl(217 91% 60%);margin:0 0 14px;}
.mc-light h2,.mc-dark h2{font-family:Sora,Manrope,sans-serif;font-size:52px;line-height:1.08;letter-spacing:-.02em;margin:0 0 18px;font-weight:700;}
.mc-light h2 em,.mc-dark h2 em{font-style:normal;color:hsl(217 91% 60%);}
.mc-h2-dark{color:hsl(210 40% 96%);}
.mc-lead{font-size:24px;line-height:1.45;color:hsl(222 20% 32%);margin:0 0 22px;}
.mc-dark .mc-lead{color:hsl(214 30% 80%);}
.mc-footer{position:absolute;left:${PAD}px;right:${PAD}px;bottom:34px;display:flex;justify-content:space-between;align-items:center;z-index:3;font-size:15px;color:hsl(222 20% 45%);}
.mc-footer-logo{height:26px;width:auto;}
.mc-footer-dark{color:hsl(214 30% 65%);}
.mc-footer-dark .mc-footer-logo{filter:brightness(0) invert(1);}
.mc-icon{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;background:hsl(217 91% 60% / .12);color:hsl(217 91% 55%);flex:none;}
.mc-icon-dark{background:hsl(217 91% 60% / .18);color:hsl(190 95% 65%);}
/* capa */
.mc-cover{display:flex;flex-direction:column;justify-content:center;height:100%;}
.mc-cover-logo{height:64px;width:auto;margin-bottom:26px;filter:brightness(0) invert(1);}
.mc-cover-tag{font-size:16px;letter-spacing:.32em;font-weight:700;color:hsl(190 95% 65%);margin:0 0 22px;}
.mc-cover h1{font-family:Sora,Manrope,sans-serif;font-size:64px;line-height:1.06;letter-spacing:-.025em;font-weight:700;max-width:1150px;margin:0 0 22px;}
.mc-cover h1 em{font-style:normal;color:hsl(190 95% 65%);}
.mc-cover-sub{font-size:26px;color:hsl(214 30% 78%);margin:0 0 46px;}
.mc-cover-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;max-width:1250px;}
.mc-cover-stats div{background:hsl(222 40% 14% / .8);border:1px solid hsl(217 91% 60% / .25);border-radius:20px;padding:26px 28px;}
.mc-cover-stats strong{display:block;font-family:Sora,sans-serif;font-size:44px;color:hsl(190 95% 65%);letter-spacing:-.02em;}
.mc-cover-stats span{font-size:18px;color:hsl(214 30% 75%);}
/* sobre */
.mc-about{display:grid;grid-template-columns:minmax(0,1fr) 560px;gap:58px;margin-top:24px;flex:1;}
.mc-about-proofs{display:flex;flex-direction:column;gap:18px;margin-top:8px;}
.mc-proof{display:flex;gap:18px;align-items:flex-start;background:#fff;border:1px solid hsl(220 20% 90%);border-radius:18px;padding:20px 22px;}
.mc-proof strong{display:block;font-size:21px;margin-bottom:4px;}
.mc-proof span{font-size:18px;color:hsl(222 20% 40%);line-height:1.4;}
.mc-about-panel{background:hsl(222 47% 10%);border-radius:28px;padding:44px 42px;color:hsl(210 40% 94%);display:flex;flex-direction:column;gap:26px;}
.mc-about-panel img{height:44px;width:auto;filter:brightness(0) invert(1);align-self:flex-start;}
.mc-panel-def{font-size:20px;line-height:1.5;color:hsl(214 30% 80%);margin:0;}
.mc-panel-block span{font-size:14px;letter-spacing:.16em;font-weight:700;color:hsl(190 95% 65%);}
.mc-panel-block p{display:flex;align-items:center;gap:10px;font-size:19px;margin:10px 0 0;}
.mc-panel-pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;}
.mc-panel-pills em{font-style:normal;font-size:16px;font-weight:600;padding:8px 16px;border-radius:999px;background:hsl(217 91% 60% / .16);border:1px solid hsl(217 91% 60% / .35);}
/* jornada */
.mc-journey{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:44px;flex:1;}
.mc-journey-step{position:relative;background:hsl(222 40% 13%);border:1px solid hsl(217 91% 60% / .22);border-radius:24px;padding:38px 34px;}
.mc-journey-n{position:absolute;top:26px;right:30px;font-family:Sora,sans-serif;font-size:40px;font-weight:700;color:hsl(217 91% 60% / .35);}
.mc-journey-step strong{display:block;font-family:Sora,sans-serif;font-size:27px;margin:22px 0 6px;}
.mc-journey-step em{display:block;font-style:normal;font-size:17px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:hsl(190 95% 65%);margin-bottom:14px;}
.mc-journey-step p{font-size:19px;line-height:1.5;color:hsl(214 30% 78%);margin:0;}
.mc-journey-arrow{position:absolute;right:-27px;top:50%;transform:translateY(-50%);color:hsl(190 95% 65%);z-index:4;}
/* soluções */
.mc-sol-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:36px;flex:1;}
.mc-sol-card{background:#fff;border:1px solid hsl(220 20% 90%);border-radius:22px;padding:28px 26px;display:flex;flex-direction:column;gap:14px;}
.mc-sol-card strong{font-family:Sora,sans-serif;font-size:22px;line-height:1.2;}
.mc-sol-card p{font-size:17.5px;line-height:1.45;color:hsl(222 20% 38%);margin:0;}
/* mockups */
.mc-mock-layout{display:grid;grid-template-columns:minmax(0,1fr) 640px;gap:60px;align-items:center;flex:1;margin-top:8px;}
.mc-mock-layout-rev{grid-template-columns:640px minmax(0,1fr);}
.mc-check-list{list-style:none;margin:6px 0 0;padding:0;display:flex;flex-direction:column;gap:14px;}
.mc-check-list li{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:600;color:hsl(222 30% 25%);}
.mc-check-list svg{color:hsl(160 84% 39%);flex:none;}
.mc-mock{background:#fff;border:1px solid hsl(220 20% 88%);border-radius:22px;box-shadow:0 30px 60px -30px hsl(222 47% 11% / .25);overflow:hidden;}
.mc-mock-bar{display:flex;align-items:center;gap:8px;padding:14px 18px;background:hsl(222 47% 10%);color:hsl(214 30% 80%);}
.mc-mock-bar span{width:12px;height:12px;border-radius:50%;background:hsl(217 91% 60% / .5);}
.mc-mock-bar em{font-style:normal;font-size:15px;margin-left:10px;letter-spacing:.04em;}
.mc-mock-body{padding:26px 28px;}
.mc-mock-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}
.mc-mock-kpis div{background:hsl(220 30% 96%);border-radius:14px;padding:16px 18px;}
.mc-mock-kpis strong{display:block;font-family:Sora,sans-serif;font-size:32px;color:hsl(217 91% 55%);}
.mc-mock-kpis span{font-size:14.5px;color:hsl(222 15% 45%);}
.mc-mock-rows{display:flex;flex-direction:column;gap:10px;}
.mc-mock-row{display:flex;align-items:center;gap:12px;padding:13px 16px;border:1px solid hsl(220 20% 91%);border-radius:12px;font-size:17px;}
.mc-mock-row svg{color:hsl(217 91% 55%);flex:none;}
.mc-mock-row-label{flex:1;font-weight:600;}
.mc-pill{font-size:13.5px;font-weight:700;padding:5px 12px;border-radius:999px;white-space:nowrap;}
.mc-pill-ok{background:hsl(160 84% 39% / .12);color:hsl(160 84% 30%);}
.mc-pill-warn{background:hsl(38 92% 50% / .15);color:hsl(32 95% 38%);}
.mc-mock-sup-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.mc-mock-sup-head strong{display:block;font-family:Sora,sans-serif;font-size:24px;}
.mc-mock-sup-head span{font-size:15.5px;color:hsl(222 15% 45%);}
.mc-iqf{width:92px;height:92px;border-radius:50%;background:hsl(217 91% 55%);color:#fff;display:grid;place-items:center;text-align:center;flex:none;}
.mc-iqf strong{display:block;font-family:Sora,sans-serif;font-size:34px;line-height:1;}
.mc-iqf span{font-size:13px;font-weight:700;letter-spacing:.1em;}
.mc-mock-sup-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px;}
.mc-mock-sup-cell{display:flex;align-items:center;gap:10px;background:hsl(220 30% 96%);border-radius:12px;padding:14px 16px;font-size:16.5px;}
.mc-mock-sup-cell span{flex:1;color:hsl(222 15% 40%);}
.mc-mock-sup-cell strong{font-weight:700;}
.mc-mock-sup-cell svg{color:hsl(160 84% 39%);}
.mc-mock-sup-bar{display:flex;align-items:center;gap:14px;font-size:15.5px;color:hsl(222 15% 40%);}
.mc-risk-bar{flex:1;height:12px;border-radius:999px;background:linear-gradient(90deg,hsl(160 84% 45%),hsl(38 92% 55%),hsl(0 84% 60%));position:relative;opacity:.35;}
.mc-risk-bar i{position:absolute;top:-4px;bottom:-4px;width:6px;border-radius:4px;background:hsl(222 47% 11%);}
.mc-mock-sup-bar em{font-style:normal;font-weight:700;color:hsl(160 84% 30%);}
/* fluxo */
.mc-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:44px;}
.mc-flow-step{position:relative;background:hsl(222 40% 13%);border:1px solid hsl(217 91% 60% / .22);border-radius:22px;padding:30px 26px;}
.mc-flow-step strong{display:block;font-family:Sora,sans-serif;font-size:21px;margin:18px 0 8px;}
.mc-flow-step p{font-size:16.5px;line-height:1.45;color:hsl(214 30% 78%);margin:0;}
.mc-flow-arrow{position:absolute;right:-25px;top:50%;transform:translateY(-50%);color:hsl(190 95% 65%);z-index:4;}
.mc-flow-note{display:flex;align-items:center;gap:14px;margin-top:36px;background:hsl(217 91% 60% / .12);border:1px solid hsl(217 91% 60% / .3);border-radius:16px;padding:20px 26px;font-size:19px;color:hsl(214 30% 85%);}
.mc-flow-note svg{color:hsl(190 95% 65%);flex:none;}
/* serviços */
.mc-serv-layout{display:grid;grid-template-columns:480px minmax(0,1fr);gap:40px;margin-top:32px;flex:1;}
.mc-serv-hero{background:hsl(222 47% 10%);border-radius:26px;padding:40px 38px;color:hsl(210 40% 94%);display:flex;flex-direction:column;}
.mc-serv-hero strong{font-family:Sora,sans-serif;font-size:88px;line-height:1;color:hsl(190 95% 65%);letter-spacing:-.03em;}
.mc-serv-hero>span{font-size:19px;line-height:1.5;color:hsl(214 30% 80%);margin-top:14px;}
.mc-serv-map{position:relative;flex:1;min-height:180px;margin-top:24px;}
.mc-serv-line{position:absolute;left:60px;right:60px;top:50%;border-top:2px dashed hsl(190 95% 65% / .5);}
.mc-serv-dot{position:absolute;display:flex;flex-direction:column;align-items:center;gap:6px;color:hsl(190 95% 65%);}
.mc-serv-dot em{font-style:normal;font-size:15px;font-weight:700;color:hsl(210 40% 90%);}
.mc-serv-dot-a{left:20px;top:30%;}
.mc-serv-dot-b{right:20px;top:52%;}
.mc-serv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;}
.mc-serv-card{background:#fff;border:1px solid hsl(220 20% 90%);border-radius:20px;padding:24px 24px;display:flex;flex-direction:column;gap:12px;}
.mc-serv-card strong{font-family:Sora,sans-serif;font-size:20.5px;line-height:1.2;}
.mc-serv-card p{font-size:16.5px;line-height:1.45;color:hsl(222 20% 38%);margin:0;}
/* encerramento */
.mc-closing{display:flex;flex-direction:column;justify-content:center;height:100%;}
.mc-clients{display:grid;grid-template-columns:repeat(6,1fr);gap:18px;margin:8px 0 44px;max-width:1250px;}
.mc-client{background:#fff;border-radius:16px;height:92px;display:grid;place-items:center;padding:14px;}
.mc-client img{max-width:100%;max-height:64px;object-fit:contain;}
.mc-closing h2{font-size:46px;max-width:1150px;}
.mc-contact{display:grid;grid-template-columns:repeat(2,minmax(0,auto));gap:18px 56px;margin-top:36px;}
.mc-contact div{display:flex;align-items:center;gap:14px;font-size:22px;font-weight:600;color:hsl(210 40% 92%);}
.mc-contact svg{color:hsl(190 95% 65%);flex:none;}
/* navegação */
.mc-nav{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:50;display:flex;align-items:center;gap:12px;background:hsl(222 47% 10% / .92);border:1px solid hsl(217 91% 60% / .3);border-radius:999px;padding:8px 14px;color:#fff;}
.mc-nav button{display:flex;align-items:center;gap:6px;background:transparent;border:none;color:#fff;font-size:14px;font-weight:600;cursor:pointer;padding:6px 10px;border-radius:999px;}
.mc-nav button:hover{background:hsl(217 91% 60% / .25);}
.mc-nav span{font-size:14px;color:hsl(214 30% 75%);min-width:64px;text-align:center;}
@media print{
  @page{size:${CANVAS_W}px ${CANVAS_H}px;margin:0;}
  html,body{margin:0;padding:0;background:#fff;}
  .mc-nav{display:none!important;}
  .mc-slide{position:relative!important;transform:none!important;opacity:1!important;}
  .mc-slide-viewport{width:${CANVAS_W}px!important;height:${CANVAS_H}px!important;}
}
`;

const MaterialComercial = () => {
  const printMode = usePrintMode();
  const [current, setCurrent] = useState(() => {
    const s = Number(new URLSearchParams(window.location.search).get("slide"));
    return s >= 1 && s <= TOTAL ? s - 1 : 0;
  });

  useEffect(() => {
    if (printMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setCurrent((c) => Math.min(c + 1, TOTAL - 1));
      if (e.key === "ArrowLeft") setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [printMode]);

  useEffect(() => {
    document.title = `Material Comercial MyTS — ${current + 1}/${TOTAL}`;
  }, [current]);

  const Active = slides[current];

  return (
    <div
      className={printMode ? "" : "fixed inset-0"}
      style={printMode ? undefined : { background: "hsl(222 47% 6%)" }}
    >
      <Helmet>
        <title>Material Comercial MyTS</title>
        <meta
          name="description"
          content="MyTS — Conectando empresas, fornecedores e processos para uma cadeia de suprimentos confiável."
        />
      </Helmet>
      <style>{css}</style>
      {printMode ? (
        slides.map((S, i) => <S key={i} />)
      ) : (
        <>
          <Active />
          <div className="mc-nav">
            <button
              onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
              aria-label="Anterior"
            >
              <ArrowLeft size={16} /> Anterior
            </button>
            <span>
              {current + 1} / {TOTAL}
            </span>
            <button
              onClick={() => setCurrent((c) => Math.min(c + 1, TOTAL - 1))}
              aria-label="Próximo"
            >
              Próximo <ArrowRight size={16} />
            </button>
            <button onClick={() => window.print()} aria-label="Baixar PDF">
              <Download size={16} /> Baixar PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialComercial;
