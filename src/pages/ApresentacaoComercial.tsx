import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Search,
  Route as RouteIcon,
  Activity,
  FileStack,
  Building2,
  ListChecks,
  Workflow,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Zap,
  Eye,
  ArrowRight,
  Check,
  X,
  Users,
  Globe,
  FileText,
  Layers,
  MessageSquare,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import carrefourAsset from "@/assets/logos/carrefour.png.asset.json";
import korinAsset from "@/assets/logos/korin.png.asset.json";
import cvaleAsset from "@/assets/logos/cvale.webp.asset.json";
import atakarejoAsset from "@/assets/logos/atakarejo.webp.asset.json";
import martinsAsset from "@/assets/logos/martins.jpg.asset.json";
import avalAsset from "@/assets/logos/aval.png.asset.json";

/* ============================================================
   CANVAS FIXO 1600x900 — mesmo sistema do deck MytsPassaporte
   ============================================================ */
const CANVAS_W = 1600;
const CANVAS_H = 900;
const PAD = 64;

const T = {
  hero: 68,
  title: 48,
  subtitle: 32,
  lead: 24,
  body: 21,
  small: 18,
  label: 15,
  mono: 14,
} as const;

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => {
    setPrint(new URLSearchParams(window.location.search).has("print"));
  }, []);
  return print;
};

const Slide = ({
  bg = "bg-background",
  children,
  decor,
  pad = PAD,
}: {
  bg?: string;
  children: React.ReactNode;
  decor?: React.ReactNode;
  pad?: number;
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

  useEffect(() => {
    if (printMode) return;
    const onResize = () => {
      const el = frameRef.current;
      if (el) setScale(el.clientWidth / CANVAS_W);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [printMode]);

  const effScale = printMode ? 1 : scale;

  return (
    <section
      ref={frameRef}
      className={`${bg} relative slide-frame`}
      style={
        printMode
          ? {
              width: CANVAS_W,
              height: CANVAS_H,
              margin: 0,
              overflow: "hidden",
              borderRadius: 0,
              boxShadow: "none",
              breakAfter: "page",
              pageBreakAfter: "always",
            }
          : {
              width: "min(100%, calc((100vh - 64px) * 16 / 9))",
              aspectRatio: "16 / 9",
              margin: "0 auto",
              overflow: "hidden",
              borderRadius: 16,
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.55)",
              scrollSnapAlign: "center",
            }
      }
    >
      <div
        className={`${bg} absolute left-0 top-0`}
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${effScale})`,
          transformOrigin: "top left",
          visibility: effScale ? "visible" : "hidden",
          overflow: "hidden",
        }}
      >
        {decor}
        <div className="relative flex flex-col" style={{ width: CANVAS_W, height: CANVAS_H, padding: pad }}>
          {children}
        </div>
      </div>
    </section>
  );
};

const Watermark = ({ style }: { style?: React.CSSProperties }) => (
  <img src={mytsMark} alt="" aria-hidden className="pointer-events-none absolute select-none opacity-[0.06]" style={style} />
);

const Grade = ({ light = false }: { light?: boolean }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: light
        ? "linear-gradient(hsl(var(--accent)/0.10) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--accent)/0.10) 1px,transparent 1px)"
        : "linear-gradient(hsl(var(--accent)/0.16) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--accent)/0.16) 1px,transparent 1px)",
      backgroundSize: "80px 80px",
      maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 78%)",
      WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 78%)",
    }}
  />
);

const SectionLabel = ({ n, label, light = false }: { n: string; label: string; light?: boolean }) => (
  <div
    className={`flex items-center gap-4 font-semibold uppercase ${light ? "text-accent-glow" : "text-accent"}`}
    style={{ fontSize: T.label, letterSpacing: "0.22em", height: 24 }}
  >
    <span className="font-mono">{n}</span>
    <span className={`h-px ${light ? "bg-accent-glow/60" : "bg-accent/50"}`} style={{ width: 56 }} />
    {label}
  </div>
);

const Logo = ({ src, alt, height = 34, invert = false }: { src: string; alt: string; height?: number; invert?: boolean }) => (
  <img
    src={src}
    alt={alt}
    className="w-auto object-contain"
    style={{ height, filter: invert ? "brightness(0) invert(1)" : undefined }}
  />
);

/* ============================================================
   01 — Abertura
   ============================================================ */
const S01Abertura = () => (
  <Slide
    bg="bg-primary"
    decor={
      <>
        <Grade />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{ width: 900, height: 900, left: -260, top: -300, background: "hsl(var(--accent)/0.20)", filter: "blur(150px)" }}
        />
        <Watermark style={{ width: 620, right: -120, bottom: -160 }} />
      </>
    }
  >
    <div className="flex items-center justify-between">
      <Logo src={mytsLogo} alt="MyTS" height={40} invert />
      <span
        className="rounded-full border border-primary-foreground/20 font-semibold uppercase text-primary-foreground/70"
        style={{ fontSize: T.label, letterSpacing: "0.2em", padding: "10px 22px" }}
      >
        Apresentação comercial
      </span>
    </div>

    <div className="flex flex-1 flex-col justify-center" style={{ maxWidth: 1180 }}>
      <h1 className="font-display font-bold leading-[1.02] text-primary-foreground" style={{ fontSize: T.hero }}>
        Gestão inteligente
        <br />
        de <span className="text-accent-glow">fornecedores</span>.
      </h1>
      <p className="text-primary-foreground/75" style={{ fontSize: T.subtitle, marginTop: 34, maxWidth: 980, lineHeight: 1.3 }}>
        Transforme a gestão de fornecedores em uma jornada contínua de conformidade, desenvolvimento e performance.
      </p>
      <div className="h-1.5 rounded-full bg-accent" style={{ width: 200, marginTop: 44 }} />
    </div>

    <div className="flex items-center" style={{ gap: 44, opacity: 0.85 }}>
      <Logo src={carrefourAsset.url} alt="Carrefour" height={26} invert />
      <Logo src={korinAsset.url} alt="Korin" height={30} invert />
      <Logo src={cvaleAsset.url} alt="C.Vale" height={26} invert />
      <Logo src={atakarejoAsset.url} alt="Atakarejo" height={26} invert />
      <Logo src={martinsAsset.url} alt="Rede Martins" height={26} invert />
      <Logo src={avalAsset.url} alt="AVAL" height={28} invert />
    </div>
  </Slide>
);

/* ============================================================
   02 — O problema
   ============================================================ */
const DorCard = ({ icon: Icon, titulo, texto }: { icon: typeof Search; titulo: string; texto: string }) => (
  <div className="flex flex-1 flex-col justify-center rounded-3xl border border-border bg-card shadow-card" style={{ padding: 34 }}>
    <div className="grid place-items-center rounded-2xl bg-destructive/10 text-destructive" style={{ width: 60, height: 60 }}>
      <Icon style={{ width: 30, height: 30 }} />
    </div>
    <h3 className="font-display font-bold text-foreground" style={{ fontSize: 28, marginTop: 24, lineHeight: 1.2 }}>
      {titulo}
    </h3>
    <p className="text-foreground/80" style={{ fontSize: 22, marginTop: 12, lineHeight: 1.5 }}>
      {texto}
    </p>
  </div>
);

const S02Problema = () => (
  <Slide>
    <SectionLabel n="02" label="O problema" />
    <h2 className="font-display font-bold text-foreground" style={{ fontSize: T.title, marginTop: 22, maxWidth: 1100, lineHeight: 1.1 }}>
      Sua cadeia de fornecedores está realmente sob controle?
    </h2>

    <div className="flex flex-1 items-stretch" style={{ gap: 24, marginTop: 34 }}>
      <DorCard icon={FileStack} titulo="Informações espalhadas" texto="Documentos em e-mail, planilha, drive e pastas — sem base única nem histórico confiável." />
      <DorCard icon={ListChecks} titulo="Processos manuais" texto="Homologação e avaliação conduzidas na base da cobrança, do anexo e do retrabalho." />
      <DorCard icon={Gauge} titulo="Sem visão de risco" texto="Pendências, vencimentos e não conformidades aparecem tarde demais — quase sempre na auditoria." />
    </div>

    <div
      className="flex items-center rounded-3xl bg-primary"
      style={{ gap: 26, marginTop: 30, padding: "30px 38px" }}
    >
      <span className="h-full w-1.5 rounded-full bg-accent" style={{ minHeight: 56 }} />
      <p className="font-display font-bold text-primary-foreground" style={{ fontSize: 30, lineHeight: 1.25 }}>
        O problema não é ter dados dos fornecedores. É conseguir transformar esses dados em gestão.
      </p>
    </div>
  </Slide>
);

/* ============================================================
   03 — Mudança de paradigma
   ============================================================ */
const Etapa = ({ label, tone }: { label: string; tone: "old" | "new" }) => (
  <div
    className={`flex items-center justify-center rounded-2xl border font-semibold ${
      tone === "old"
        ? "border-border bg-muted text-foreground/70"
        : "border-accent/30 bg-accent/10 text-accent"
    }`}
    style={{ fontSize: 21, padding: "20px 10px", flex: 1, textAlign: "center" }}
  >
    {label}
  </div>
);

const S03Paradigma = () => (
  <Slide>
    <SectionLabel n="03" label="Mudança de paradigma" />
    <h2 className="font-display font-bold text-foreground" style={{ fontSize: T.title, marginTop: 22, maxWidth: 1100, lineHeight: 1.1 }}>
      De uma gestão reativa para uma gestão contínua.
    </h2>

    <div className="flex flex-1 flex-col justify-center" style={{ gap: 30, marginTop: 20 }}>
      <div className="rounded-3xl border border-border bg-card shadow-card" style={{ padding: 34 }}>
        <div className="flex items-center gap-3">
          <span className="grid place-items-center rounded-xl bg-destructive/10 text-destructive" style={{ width: 40, height: 40 }}>
            <X style={{ width: 22, height: 22 }} />
          </span>
          <span className="font-mono uppercase text-muted-foreground" style={{ fontSize: T.mono, letterSpacing: "0.22em" }}>
            Modelo tradicional
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 12, marginTop: 22 }}>
          {["Homologa", "Arquiva", "Cobra", "Reage"].map((e, i, a) => (
            <Fragment key={e}>
              <Etapa label={e} tone="old" />
              {i < a.length - 1 && <ArrowRight className="text-muted-foreground/50" style={{ width: 22, height: 22, flexShrink: 0 }} />}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-accent/30 bg-primary shadow-elegant" style={{ padding: 34 }}>
        <div className="flex items-center gap-3">
          <span className="grid place-items-center rounded-xl bg-accent/20 text-accent-glow" style={{ width: 40, height: 40 }}>
            <Check style={{ width: 22, height: 22 }} />
          </span>
          <span className="font-mono uppercase text-primary-foreground/70" style={{ fontSize: T.mono, letterSpacing: "0.22em" }}>
            Com MyTS
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 12, marginTop: 22 }}>
          {["Conhece", "Homologa", "Monitora", "Desenvolve", "Evolui"].map((e, i, a) => (
            <Fragment key={e}>
              <div
                className="flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/15 font-semibold text-primary-foreground"
                style={{ fontSize: 21, padding: "20px 10px", flex: 1, textAlign: "center" }}
              >
                {e}
              </div>
              {i < a.length - 1 && <ArrowRight className="text-accent-glow" style={{ width: 22, height: 22, flexShrink: 0 }} />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>

    <p className="text-muted-foreground" style={{ fontSize: T.lead, marginTop: 22 }}>
      MyTS não é um repositório de documentos. É a plataforma que sustenta o ciclo inteiro da relação com o fornecedor.
    </p>
  </Slide>
);

/* ============================================================
   04 — O que é a MyTS (3 pilares)
   ============================================================ */
const S04Pilares = () => (
  <Slide
    bg="bg-primary"
    decor={
      <>
        <Grade />
        <Watermark style={{ width: 520, left: -120, bottom: -140 }} />
      </>
    }
  >
    <SectionLabel n="04" label="O que é a MyTS" light />
    <h2 className="font-display font-bold text-primary-foreground" style={{ fontSize: T.title, marginTop: 22, maxWidth: 1150, lineHeight: 1.1 }}>
      Uma plataforma para centralizar e conectar a gestão da sua cadeia.
    </h2>

    <div className="relative flex flex-1 items-center justify-center" style={{ marginTop: 20 }}>
      <div className="flex w-full items-stretch" style={{ gap: 22 }}>
        {[
          { icon: Search, k: "Homologação", d: "Conheça e qualifique seus fornecedores com critérios próprios e evidências verificadas." },
          { icon: Activity, k: "Monitoramento", d: "Acompanhe documentos, requisitos, não conformidades e processos em tempo real." },
          { icon: TrendingUp, k: "Desenvolvimento", d: "Identifique oportunidades e conduza seus fornecedores à evolução contínua." },
        ].map(({ icon: Icon, k, d }) => (
          <div
            key={k}
            className="flex flex-1 flex-col rounded-3xl border border-primary-foreground/12 bg-primary-foreground/[0.06] backdrop-blur"
            style={{ padding: 36 }}
          >
            <span className="grid place-items-center rounded-2xl bg-accent/20 text-accent-glow" style={{ width: 64, height: 64 }}>
              <Icon style={{ width: 32, height: 32 }} />
            </span>
            <h3 className="font-display font-bold uppercase text-primary-foreground" style={{ fontSize: 27, marginTop: 26, letterSpacing: "0.04em" }}>
              {k}
            </h3>
            <p className="text-primary-foreground/85" style={{ fontSize: 21, marginTop: 14, lineHeight: 1.55 }}>
              {d}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-center" style={{ gap: 18, marginTop: 24 }}>
      <span className="h-px flex-1 bg-primary-foreground/15" />
      <Logo src={mytsLogo} alt="MyTS" height={30} invert />
      <span className="h-px flex-1 bg-primary-foreground/15" />
    </div>
  </Slide>
);

/* ============================================================
   05 — Como funciona: MyTS 360
   ============================================================ */
const MockCol = ({ titulo, linhas, destaque }: { titulo: string; linhas: string[]; destaque?: string }) => (
  <div className="flex flex-1 flex-col rounded-2xl border border-border bg-background" style={{ padding: 18 }}>
    <span className="font-mono uppercase text-muted-foreground" style={{ fontSize: T.mono, letterSpacing: "0.18em" }}>
      {titulo}
    </span>
    <div className="flex flex-col" style={{ gap: 8, marginTop: 14 }}>
      {linhas.map((l) => (
        <div key={l} className="flex items-center justify-between rounded-xl border border-border/70 bg-card" style={{ padding: "14px 16px" }}>
          <span className="font-medium text-foreground" style={{ fontSize: 20 }}>
            {l}
          </span>
          <span className="rounded-full bg-accent/15 text-accent" style={{ fontSize: 14, padding: "4px 12px", fontWeight: 700 }}>
            OK
          </span>
        </div>
      ))}
    </div>
    {destaque && (
      <span className="mt-auto text-muted-foreground" style={{ fontSize: T.small, paddingTop: 14 }}>
        {destaque}
      </span>
    )}
  </div>
);

const S05Comofunciona = () => (
  <Slide>
    <SectionLabel n="05" label="Como funciona — MyTS 360" />
    <h2 className="font-display font-bold text-foreground" style={{ fontSize: T.title, marginTop: 20, maxWidth: 1150, lineHeight: 1.1 }}>
      Find <span className="text-accent">→</span> Journey <span className="text-accent">→</span> Monitoramento
    </h2>

    <div className="flex flex-1" style={{ gap: 24, marginTop: 28 }}>
      {[
        { icon: Search, k: "Find", d: "Entenda quem são seus fornecedores e tenha uma visão estruturada da cadeia.", linhas: ["Laticínios Vale", "Embalagens Prisma", "Aromas Sul", "Insumos Bela Vista", "Grãos Ipê"] },
        { icon: RouteIcon, k: "Journey", d: "Crie jornadas de avaliação, homologação e desenvolvimento.", linhas: ["Autoavaliação", "Documentos", "Plano de ação", "Auditoria remota", "Reavaliação"] },
        { icon: Activity, k: "Monitoramento", d: "Acompanhe documentos, requisitos, processos e indicadores continuamente.", linhas: ["Certificados", "Requisitos", "Não conformidades", "Vencimentos", "Indicadores"] },
      ].map(({ icon: Icon, k, d, linhas }, i) => (
        <div key={k} className="flex flex-1 flex-col rounded-3xl border border-border bg-card shadow-card" style={{ padding: 26 }}>
          <div className="flex items-center gap-3">
            <span className="grid place-items-center rounded-xl bg-accent/12 text-accent" style={{ width: 46, height: 46 }}>
              <Icon style={{ width: 24, height: 24 }} />
            </span>
            <div>
              <span className="font-mono uppercase text-accent" style={{ fontSize: T.mono, letterSpacing: "0.2em" }}>
                Etapa {i + 1}
              </span>
              <h3 className="font-display font-bold uppercase text-foreground" style={{ fontSize: 24, lineHeight: 1.1 }}>
                {k}
              </h3>
            </div>
          </div>
          <p className="text-foreground/80" style={{ fontSize: 21, marginTop: 14, lineHeight: 1.5, minHeight: 90 }}>
            {d}
          </p>
          <div className="flex flex-1" style={{ marginTop: 6 }}>
            <MockCol titulo={k} linhas={linhas} />
          </div>
        </div>
      ))}
    </div>
  </Slide>
);

/* ============================================================
   06 — Ecossistema
   ============================================================ */
const ModCard = ({ icon: Icon, nome, itens }: { icon: typeof Search; nome: string; itens: string[] }) => (
  <div className="flex flex-col rounded-2xl border border-border bg-card shadow-card" style={{ padding: 24 }}>
    <div className="flex items-center gap-3">
      <span className="grid place-items-center rounded-xl bg-accent/12 text-accent" style={{ width: 44, height: 44 }}>
        <Icon style={{ width: 23, height: 23 }} />
      </span>
      <h3 className="font-display font-bold text-foreground" style={{ fontSize: 22 }}>
        {nome}
      </h3>
    </div>
    <ul className="flex flex-col" style={{ gap: 7, marginTop: 16 }}>
      {itens.map((i) => (
        <li key={i} className="flex items-center gap-2.5 text-foreground/80" style={{ fontSize: 19 }}>
          <span className="rounded-full bg-accent" style={{ width: 6, height: 6, flexShrink: 0 }} />
          {i}
        </li>
      ))}
    </ul>
  </div>
);

const S06Ecossistema = () => (
  <Slide>
    <SectionLabel n="06" label="Ecossistema MyTS" />
    <h2 className="font-display font-bold text-foreground" style={{ fontSize: T.title, marginTop: 18, maxWidth: 1150, lineHeight: 1.1 }}>
      Módulos que trabalham sobre a mesma base de dados.
    </h2>

    <div className="grid flex-1 grid-cols-3" style={{ gap: 20, marginTop: 26 }}>
      <ModCard icon={Layers} nome="MyTS 360" itens={["Find", "Journey", "Monitoramento"]} />
      <ModCard icon={ShieldCheck} nome="MyQMS" itens={["Gestão da qualidade", "RNCs", "Tratativas"]} />
      <ModCard icon={FileText} nome="Meus Documentos" itens={["Centralização", "OCR", "Controle documental"]} />
      <ModCard icon={Building2} nome="Meus Fornecedores" itens={["Cadastro", "Perfil", "Gestão da base"]} />
      <ModCard icon={ListChecks} nome="Meus Requisitos" itens={["Requisitos", "Conformidade", "Pendências"]} />
      <ModCard icon={Workflow} nome="Meus Processos" itens={["Fluxos", "Aprovações", "Gestão operacional"]} />
    </div>
  </Slide>
);

/* ============================================================
   07 — Ganho para a empresa
   ============================================================ */
const S07Ganhos = () => (
  <Slide
    bg="bg-primary"
    decor={
      <>
        <Grade />
        <Watermark style={{ width: 560, right: -140, top: -120 }} />
      </>
    }
  >
    <SectionLabel n="07" label="O ganho para a empresa" light />
    <h2 className="font-display font-bold text-primary-foreground" style={{ fontSize: T.title, marginTop: 22, maxWidth: 1150, lineHeight: 1.1 }}>
      Mais do que organizar fornecedores. Gerar inteligência para decisão.
    </h2>

    <div className="grid flex-1 grid-cols-2" style={{ gap: 22, marginTop: 30 }}>
      {[
        { icon: Eye, k: "Visibilidade", d: "Uma visão única da cadeia — quem são, em que status estão e o que falta." },
        { icon: Zap, k: "Eficiência", d: "Menos trabalho operacional, menos cobrança manual, menos planilha paralela." },
        { icon: ShieldCheck, k: "Controle de riscos", d: "Pendências, vencimentos e não conformidades identificados antes da auditoria." },
        { icon: TrendingUp, k: "Desenvolvimento", d: "Acompanhamento da evolução de cada fornecedor ao longo do tempo." },
      ].map(({ icon: Icon, k, d }) => (
        <div
          key={k}
          className="flex items-center rounded-3xl border border-primary-foreground/12 bg-primary-foreground/[0.06] backdrop-blur"
          style={{ padding: 30, gap: 24 }}
        >
          <span className="grid shrink-0 place-items-center rounded-2xl bg-accent/20 text-accent-glow" style={{ width: 66, height: 66 }}>
            <Icon style={{ width: 32, height: 32 }} />
          </span>
          <div>
            <h3 className="font-display font-bold text-primary-foreground" style={{ fontSize: 26 }}>
              {k}
            </h3>
            <p className="text-primary-foreground/85" style={{ fontSize: 21, marginTop: 8, lineHeight: 1.5 }}>
              {d}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Slide>
);

/* ============================================================
   08 — E para o fornecedor?
   ============================================================ */
const S08Fornecedor = () => (
  <Slide>
    <SectionLabel n="08" label="E para o fornecedor?" />
    <h2 className="font-display font-bold text-foreground" style={{ fontSize: T.title, marginTop: 22, maxWidth: 1150, lineHeight: 1.1 }}>
      Uma plataforma que também melhora a experiência de quem fornece.
    </h2>

    <div className="flex flex-1 items-stretch" style={{ gap: 28, marginTop: 26 }}>
      <div className="flex flex-1 flex-col justify-center rounded-3xl border border-border bg-muted" style={{ padding: 44 }}>
        <span className="font-mono uppercase text-muted-foreground" style={{ fontSize: T.mono, letterSpacing: "0.2em" }}>
          Hoje
        </span>
        <MessageSquare className="text-muted-foreground" style={{ width: 38, height: 38, marginTop: 20 }} />
        <p className="font-display font-semibold text-foreground/75" style={{ fontSize: 30, marginTop: 18, lineHeight: 1.3 }}>
          “A empresa está sempre me cobrando documentos.”
        </p>
      </div>

      <ArrowRight className="text-accent" style={{ width: 42, height: 42, flexShrink: 0 }} />

      <div className="flex flex-1 flex-col justify-center rounded-3xl border border-accent/30 bg-primary shadow-elegant" style={{ padding: 44 }}>
        <span className="font-mono uppercase text-accent-glow" style={{ fontSize: T.mono, letterSpacing: "0.2em" }}>
          Com MyTS
        </span>
        <MessageSquare className="text-accent-glow" style={{ width: 38, height: 38, marginTop: 20 }} />
        <p className="font-display font-semibold text-primary-foreground" style={{ fontSize: 30, marginTop: 18, lineHeight: 1.3 }}>
          “Eu sei o que preciso fazer, qual é o meu status e como posso evoluir.”
        </p>
      </div>
    </div>

    <div className="flex items-center rounded-3xl border border-border bg-card" style={{ gap: 20, marginTop: 26, padding: "24px 32px" }}>
      <span className="rounded-full bg-accent/12 font-mono font-bold uppercase text-accent" style={{ fontSize: T.mono, letterSpacing: "0.2em", padding: "8px 16px" }}>
        B2B2B
      </span>
      <p className="text-foreground" style={{ fontSize: T.lead }}>
        A MyTS conecta empresa e fornecedor no mesmo ambiente — reduzindo atrito de um lado e retrabalho do outro.
      </p>
    </div>
  </Slide>
);

/* ============================================================
   09 — Cases
   ============================================================ */
const CaseCard = ({
  logo,
  alt,
  titulo,
  desc,
  metricas,
}: {
  logo?: string;
  alt: string;
  titulo?: string;
  desc: string;
  metricas: { v: string; l: string }[];
}) => (
  <div className="flex flex-1 flex-col rounded-3xl border border-border bg-card shadow-card" style={{ padding: 28 }}>
    <div className="flex items-center" style={{ height: 44 }}>
      {logo ? (
        <Logo src={logo} alt={alt} height={30} />
      ) : (
        <span className="font-display font-bold uppercase text-foreground" style={{ fontSize: 26, letterSpacing: "0.04em" }}>
          {alt}
        </span>
      )}
    </div>
    {titulo && (
      <h3 className="font-display font-bold text-foreground" style={{ fontSize: 21, marginTop: 16, lineHeight: 1.25 }}>
        {titulo}
      </h3>
    )}
    <p className="text-foreground/80" style={{ fontSize: 19, marginTop: 10, lineHeight: 1.5 }}>
      {desc}
    </p>
    <div className="mt-auto flex flex-col" style={{ gap: 10, paddingTop: 20 }}>
      {metricas.map((m) => (
        <div key={m.l} className="flex items-baseline gap-3 rounded-2xl bg-accent/8 border border-accent/20" style={{ padding: "12px 16px" }}>
          <span className="font-display font-bold text-accent" style={{ fontSize: 28, lineHeight: 1 }}>
            {m.v}
          </span>
          <span className="text-foreground/70" style={{ fontSize: 18 }}>
            {m.l}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const S09Cases = () => (
  <Slide>
    <SectionLabel n="09" label="Cases" />
    <h2 className="font-display font-bold text-foreground" style={{ fontSize: T.title, marginTop: 18, maxWidth: 1150, lineHeight: 1.1 }}>
      Já está rodando em cadeias reais.
    </h2>

    <div className="flex flex-1" style={{ gap: 22, marginTop: 26 }}>
      <CaseCard
        logo={carrefourAsset.url}
        alt="Carrefour"
        titulo="Jornada de desenvolvimento de fornecedores"
        desc="Programa de acompanhamento e evolução da base de fornecedores da rede."
        metricas={[
          { v: "97", l: "empresas na fase atual" },
          { v: "130+", l: "previstas na fase 2" },
        ]}
      />
      <CaseCard
        logo={korinAsset.url}
        alt="Korin"
        titulo="Avaliação e desenvolvimento da cadeia de produtores"
        desc="Estruturação da relação com produtores e evidências de origem."
        metricas={[
          { v: "9", l: "produtores avaliados" },
          { v: "30", l: "produtores em entrada" },
        ]}
      />
      <CaseCard
        alt="Takasago"
        titulo="Gestão e estruturação da cadeia de fornecedores"
        desc="Centralização documental e requisitos de conformidade por fornecedor."
        metricas={[
          { v: "180+", l: "autoavaliações concluídas (AVAL)" },
          { v: "13", l: "empresas associadas" },
        ]}
      />
    </div>

    <div className="flex items-center justify-center" style={{ gap: 40, marginTop: 24, opacity: 0.7 }}>
      <Logo src={cvaleAsset.url} alt="C.Vale" height={24} />
      <Logo src={atakarejoAsset.url} alt="Atakarejo" height={24} />
      <Logo src={martinsAsset.url} alt="Rede Martins" height={24} />
      <Logo src={avalAsset.url} alt="AVAL" height={26} />
    </div>
  </Slide>
);

/* ============================================================
   10 — MyTS em números
   ============================================================ */
const S10Numeros = () => (
  <Slide
    bg="bg-primary"
    decor={
      <>
        <Grade />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{ width: 1000, height: 1000, left: "50%", top: "45%", transform: "translate(-50%,-50%)", background: "hsl(var(--accent)/0.16)", filter: "blur(160px)" }}
        />
      </>
    }
  >
    <SectionLabel n="10" label="MyTS em números" light />
    <h2 className="font-display font-bold text-primary-foreground" style={{ fontSize: T.title, marginTop: 22, maxWidth: 1000, lineHeight: 1.1 }}>
      Isso já está rodando em escala.
    </h2>

    <div className="flex flex-1 items-center" style={{ marginTop: 20 }}>
      <div className="grid w-full grid-cols-3" style={{ gap: 22 }}>
        {[
          { icon: Users, v: "2.148+", l: "usuários" },
          { icon: Building2, v: "1.700+", l: "empresas" },
          { icon: FileText, v: "50 mil+", l: "documentos" },
          { icon: Workflow, v: "200+", l: "processos ativos" },
          { icon: Globe, v: "20+", l: "países" },
          { icon: ShieldCheck, v: "100%", l: "evidências rastreáveis" },
        ].map(({ icon: Icon, v, l }) => (
          <div
            key={l}
            className="flex flex-col rounded-3xl border border-primary-foreground/12 bg-primary-foreground/[0.06] backdrop-blur"
            style={{ padding: 30 }}
          >
            <Icon className="text-accent-glow" style={{ width: 28, height: 28 }} />
            <span className="font-display font-bold text-primary-foreground" style={{ fontSize: 54, marginTop: 16, lineHeight: 1 }}>
              {v}
            </span>
            <span className="text-primary-foreground/80" style={{ fontSize: 20, marginTop: 8 }}>
              {l}
            </span>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

/* ============================================================
   11 — O que podemos construir juntos
   ============================================================ */
const S11Juntos = () => (
  <Slide>
    <SectionLabel n="11" label="Próximos passos" />
    <h2 className="font-display font-bold text-foreground" style={{ fontSize: T.title, marginTop: 20, maxWidth: 1150, lineHeight: 1.1 }}>
      Onde a MyTS pode gerar valor na sua operação?
    </h2>

    <div className="grid flex-1 grid-cols-4 grid-rows-2" style={{ gap: 18, marginTop: 26 }}>
      {[
        "Mapear sua cadeia",
        "Estruturar homologação",
        "Digitalizar avaliações",
        "Centralizar documentos",
        "Monitorar conformidade",
        "Desenvolver fornecedores",
        "Gerar indicadores para decisão",
      ].map((t, i) => (
        <div key={t} className="flex flex-col rounded-2xl border border-border bg-card shadow-card" style={{ padding: 28 }}>
          <span className="font-display font-bold text-accent" style={{ fontSize: 38, lineHeight: 1 }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-display font-semibold text-foreground" style={{ marginTop: 16, fontSize: 24, lineHeight: 1.25 }}>
            {t}
          </span>
        </div>
      ))}
      <div className="flex flex-col justify-center rounded-2xl border border-accent/30 bg-accent/8" style={{ padding: 28 }}>
        <p className="text-foreground" style={{ fontSize: T.lead, lineHeight: 1.45 }}>
          Escolhemos juntos por onde começar — e desenhamos a jornada a partir da sua realidade.
        </p>
      </div>
    </div>
  </Slide>
);

/* ============================================================
   12 — Fechamento
   ============================================================ */
const S12Fechamento = () => (
  <Slide
    bg="bg-primary"
    decor={
      <>
        <Grade />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{ width: 1100, height: 1100, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "hsl(var(--accent)/0.18)", filter: "blur(170px)" }}
        />
        <Watermark style={{ width: 700, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
      </>
    }
  >
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h2 className="font-display font-bold leading-[1.05] text-primary-foreground" style={{ fontSize: 56, maxWidth: 1240 }}>
        Sua cadeia de fornecedores não precisa ser apenas gerenciada.
        <br />
        <span className="text-accent-glow">Ela pode evoluir.</span>
      </h2>
      <div className="h-1.5 rounded-full bg-accent" style={{ width: 160, marginTop: 40 }} />
      <Logo src={mytsLogo} alt="MyTS" height={44} invert />
      <p className="text-primary-foreground/85" style={{ fontSize: T.lead, marginTop: 14 }}>
        Gestão inteligente de fornecedores.
      </p>
    </div>

    <div className="flex items-center justify-between border-t border-primary-foreground/12" style={{ paddingTop: 24 }}>
      <span className="text-primary-foreground/80" style={{ fontSize: T.small }}>
        myt-s.com
      </span>
      <span className="font-display font-semibold text-primary-foreground" style={{ fontSize: T.lead }}>
        “Quero entender melhor como vocês fazem isso hoje.”
      </span>
    </div>
  </Slide>
);

/* ============================================================
   Página
   ============================================================ */
const ApresentacaoComercial = () => {
  const printMode = usePrintMode();
  return (
    <main
      className="bg-[#0a0e1a]"
      style={{
        margin: 0,
        padding: printMode ? 0 : "32px 0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: printMode ? 0 : 32,
        overflowX: "hidden",
      }}
    >
      <style>{`
        html,body,#root{margin:0;padding:0;background:#0a0e1a}
        ${printMode ? "" : "html{scroll-snap-type:y proximity}"}
        *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        @page{size:1600px 900px landscape;margin:0}
        @media print{
          html,body,#root{background:#fff}
          .no-print{display:none !important}
          .slide-frame{box-shadow:none !important;border-radius:0 !important;break-after:page;page-break-after:always}
          .slide-frame *{backdrop-filter:none !important;-webkit-backdrop-filter:none !important;mix-blend-mode:normal !important}
          .slide-frame .shadow-glow,
          .slide-frame .shadow-cta,
          .slide-frame .shadow-elegant,
          .slide-frame .shadow-card{box-shadow:none !important}
        }
      `}</style>
      <Helmet>
        <title>MyTS — Gestão inteligente de fornecedores | Apresentação comercial</title>
        <meta
          name="description"
          content="Apresentação comercial MyTS: da gestão reativa à jornada contínua de homologação, monitoramento e desenvolvimento de fornecedores."
        />
      </Helmet>

      {!printMode && (
        <button
          type="button"
          onClick={() => window.open(`${window.location.pathname}?print`, "_blank")}
          className="no-print fixed right-6 top-6 z-50 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
        >
          Baixar PDF
        </button>
      )}

      <S01Abertura />
      <S02Problema />
      <S03Paradigma />
      <S04Pilares />
      <S05Comofunciona />
      <S06Ecossistema />
      <S07Ganhos />
      <S08Fornecedor />
      <S09Cases />
      <S10Numeros />
      <S11Juntos />
      <S12Fechamento />
    </main>
  );
};

export default ApresentacaoComercial;
