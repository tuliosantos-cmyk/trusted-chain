import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck,
  Scale,
  Eye,
  Lock,
  UserCheck,
  FileSearch,
  AlertTriangle,
  Target,
  Layers,
  Users,
  Wallet,
  MonitorSmartphone,
  Database,
  Compass,
  ClipboardList,
  Radar,
  Repeat,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Globe,
  Building2,
  Award,
  BookOpen,
  Brain,
  Handshake,
  Gauge,
  MapPin,
  Phone,
  Mail,
  Link2,
} from "lucide-react";
import anneLogo from "@/assets/anne-logo.png.asset.json";

/* ============================================================
   CANVAS FIXO 1600 x 900 — tudo em px reais, escalado por transform
   ============================================================ */
const CANVAS_W = 1600;
const CANVAS_H = 900;
const PAD = 64;

const T = {
  hero: 80,
  title: 56,
  subtitle: 36,
  lead: 27,
  body: 22,
  small: 19,
  label: 16,
} as const;

/* Identidade visual — Anne Dezan
   Direção: verde institucional dominante sobre papel quente.
   Latão, ardósia e terracota entram apenas como apoio dessaturado. */
const C = {
  ink: "#173B31",
  inkDeep: "#0E2A23",
  blue: "#33596B",
  blueSoft: "#E9EFF2",
  yellow: "#B08535",
  yellowSoft: "#F4EEE1",
  green: "#1F6B52",
  greenSoft: "#E6EEE9",
  red: "#A0523E",
  redSoft: "#F2E7E2",
  paper: "#F7F5EF",
  white: "#FFFFFF",
  line: "#E3DFD4",
  text: "#1C2A25",
  mute: "#6C7A73",
  sand: "#D8BA80",
};


const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => {
    setPrint(new URLSearchParams(window.location.search).has("print"));
  }, []);
  return print;
};

/* ============================================================
   Primitivos
   ============================================================ */
const Slide = ({
  bg = C.paper,
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
      className="relative slide-frame"
      style={
        printMode
          ? {
              background: bg,
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
              background: bg,
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
        className="absolute left-0 top-0"
        style={{
          background: bg,
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

/* faixa de cores da identidade */
const ColorBar = ({ vertical = false }: { vertical?: boolean }) => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      ...(vertical
        ? { left: 0, top: 0, bottom: 0, width: 10 }
        : { left: 0, right: 0, top: 0, height: 10 }),
    }}
  >
    {[
      { c: C.green, f: 5 },
      { c: C.blue, f: 2 },
      { c: C.yellow, f: 1 },
    ].map(({ c, f }) => (
      <div key={c} style={{ flex: f, background: c }} />
    ))}
  </div>
);

/* ============================================================
   Elementos derivados da marca Anne Dezan
   (escudo, espigas de trigo, monograma AD)
   ============================================================ */

const Logo = ({ size = 84, opacity = 1 }: { size?: number; opacity?: number }) => (
  <img
    src={anneLogo.url}
    alt="Marca Anne Dezan"
    style={{ width: size * (450 / 476), height: size, objectFit: "contain", opacity, display: "block" }}
  />
);

/* Contorno do escudo da marca, usado como marca d'água / moldura */
const ShieldOutline = ({
  size = 520,
  color = C.sand,
  opacity = 0.18,
  strokeWidth = 1.5,
  fill = "none",
}: {
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  fill?: string;
}) => (
  <svg viewBox="0 0 100 112" width={size * (100 / 112)} height={size} style={{ opacity, display: "block" }} aria-hidden>
    <path
      d="M50 3 C68 12 82 15 96 16 V58 C96 86 76 102 50 109 C24 102 4 86 4 58 V16 C18 15 32 12 50 3 Z"
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M50 11 C66 19 78 22 90 23 V58 C90 82 72 96 50 102 C28 96 10 82 10 58 V23 C22 22 34 19 50 11 Z"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      opacity={0.6}
      strokeLinejoin="round"
    />
  </svg>
);

/* Espiga de trigo da marca */
const Wheat = ({
  size = 120,
  color = C.sand,
  opacity = 1,
  flip = false,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  flip?: boolean;
}) => (
  <svg
    viewBox="0 0 60 160"
    width={size * (60 / 160)}
    height={size}
    style={{ opacity, transform: flip ? "scaleX(-1)" : undefined, display: "block" }}
    aria-hidden
  >
    <path d="M46 158 C34 122 26 78 30 8" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const y = 26 + i * 21;
      const x = 30 + i * 1.6;
      return (
        <g key={i}>
          <ellipse cx={x - 12} cy={y} rx={7.5} ry={12} fill={color} transform={`rotate(-32 ${x - 12} ${y})`} />
          <path
            d={`M${x - 17} ${y - 12} C${x - 30} ${y - 22} ${x - 34} ${y - 30} ${x - 33} ${y - 40}`}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.75}
          />
        </g>
      );
    })}
    <ellipse cx={30} cy={10} rx={7} ry={12} fill={color} />
  </svg>
);

/* Par de espigas cruzadas — assinatura da marca */
const WheatCrest = ({ size = 200, color = C.sand, opacity = 0.16 }: { size?: number; color?: string; opacity?: number }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.12, opacity }}>
    <Wheat size={size} color={color} />
    <Wheat size={size} color={color} flip />
  </div>
);

/* Régua dourada com monograma — separador editorial */
const Monogram = ({ size = 34, color = C.sand }: { size?: number; color?: string }) => (
  <span
    style={{
      fontSize: size,
      fontWeight: 700,
      letterSpacing: "0.04em",
      color,
      fontFamily: "Georgia, 'Times New Roman', serif",
      lineHeight: 1,
    }}
  >
    AD
  </span>
);

const Eyebrow = ({ label, color = C.blue }: { label: string; color?: string }) => (
  <div
    className="flex items-center gap-4 font-semibold uppercase"
    style={{ fontSize: T.label, letterSpacing: "0.22em", color, height: 22 }}
  >
    <span style={{ width: 34, height: 3, background: color, borderRadius: 2 }} />
    {label}
  </div>
);

const Head = ({
  eyebrow,
  title,
  accent = C.blue,
  dark = false,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: string;
  dark?: boolean;
  sub?: string;
}) => (
  <div style={{ marginBottom: 26 }}>
    <Eyebrow label={eyebrow} color={dark ? C.sand : accent} />
    <h2
      style={{
        marginTop: 12,
        fontSize: T.title,
        lineHeight: 1.08,
        letterSpacing: "-0.02em",
        fontWeight: 800,
        color: dark ? C.white : C.ink,
        maxWidth: 1250,
      }}
    >
      {title}
    </h2>
    {sub && (
      <p style={{ marginTop: 12, fontSize: T.lead, lineHeight: 1.4, color: dark ? "rgba(255,255,255,.72)" : C.mute, maxWidth: 1100 }}>
        {sub}
      </p>
    )}
  </div>
);

const Foot = ({ n, dark = false }: { n: string; dark?: boolean }) => (
  <div
    className="flex items-center justify-between"
    style={{
      position: "absolute",
      left: PAD,
      right: PAD,
      bottom: 26,
      fontSize: T.label,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,.45)" : C.mute,
      fontWeight: 600,
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Logo size={32} opacity={dark ? 0.9 : 1} />
      <span>Fundamentos da ISO 19011:2026 · Anne Dezan</span>
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 26, height: 3, background: dark ? C.sand : C.green, borderRadius: 2 }} />
      {n}
    </span>
  </div>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 flex flex-col" style={{ paddingBottom: 44, gap: 20 }}>
    {children}
  </div>
);

const Card = ({
  color = C.blue,
  title,
  children,
  icon: Icon,
  tint,
  compact = false,
}: {
  color?: string;
  title?: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  tint?: string;
  compact?: boolean;
}) => (
  <div
    style={{
      background: tint ?? C.white,
      border: `1px solid ${C.line}`,
      borderTop: `4px solid ${color}`,
      borderRadius: 14,
      padding: compact ? "22px 24px" : "28px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 12,
      minWidth: 0,
    }}
  >
    {(Icon || title) && (
      <div className="flex items-center gap-12" style={{ gap: 12 }}>
        {Icon && (
          <span
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: `${color}1A`,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={28} color={color} strokeWidth={2.2} />
          </span>
        )}
        {title && (
          <h3 style={{ fontSize: 27, fontWeight: 800, color: C.ink, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            {title}
          </h3>
        )}
      </div>
    )}
    {children && (
      <div style={{ fontSize: T.body, lineHeight: 1.45, color: C.mute }}>{children}</div>
    )}
  </div>
);

const Note = ({
  color = C.yellow,
  title,
  children,
  icon: Icon = AlertTriangle,
  dark = false,
}: {
  color?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  dark?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      gap: 16,
      alignItems: "flex-start",
      background: dark ? "rgba(255,255,255,.06)" : `${color}14`,
      border: `1px solid ${color}55`,
      borderRadius: 14,
      padding: "22px 26px",
    }}
  >
    <Icon size={30} color={color} strokeWidth={2.2} style={{ flexShrink: 0, marginTop: 2 }} />
    <div>
      <div style={{ fontSize: T.small, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? C.white : C.ink }}>
        {title}
      </div>
      <div style={{ fontSize: T.body, lineHeight: 1.45, color: dark ? "rgba(255,255,255,.78)" : C.text, marginTop: 6 }}>
        {children}
      </div>
    </div>
  </div>
);

const Bullet = ({ color = C.green, children }: { color?: string; children: React.ReactNode }) => (
  <li className="flex items-start" style={{ gap: 14 }}>
    <CheckCircle2 size={28} color={color} strokeWidth={2.4} style={{ flexShrink: 0, marginTop: 2 }} />
    <span style={{ fontSize: T.lead, lineHeight: 1.4, color: C.text }}>{children}</span>
  </li>
);

/* Divisor de módulo */
const Divider = ({
  n,
  modulo,
  title,
  sub,
  items,
  accent = C.yellow,
}: {
  n: string;
  modulo: string;
  title: string;
  sub: string;
  items: [string, string][];
  accent?: string;
}) => (
  <Slide
    bg={C.ink}
    decor={
      <>
        <ColorBar />
        {/* escudo da marca como marca d'água */}
        <div style={{ position: "absolute", right: 40, top: 90, opacity: 1 }}>
          <ShieldOutline size={640} color={C.sand} opacity={0.16} strokeWidth={1.4} />
        </div>
        {/* monograma dentro do escudo */}
        <div
          style={{
            position: "absolute",
            right: 190,
            top: 330,
            color: "rgba(255,255,255,.07)",
            fontSize: 190,
            fontWeight: 700,
            fontFamily: "Georgia, 'Times New Roman', serif",
            lineHeight: 1,
          }}
        >
          AD
        </div>
        {/* espigas cruzadas na base */}
        <div style={{ position: "absolute", right: 130, bottom: -34 }}>
          <WheatCrest size={230} color={accent} opacity={0.28} />
        </div>
      </>
    }
  >
    <Body>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1200 }}>
        <Eyebrow label={modulo} color={accent} />
        <h2 style={{ marginTop: 16, fontSize: 74, fontWeight: 800, color: C.white, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          {title}
        </h2>
        <p style={{ marginTop: 16, fontSize: 28, color: "rgba(255,255,255,.72)", maxWidth: 900, lineHeight: 1.4 }}>{sub}</p>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {items.map(([k, v], i) => {
            const cols = [C.blue, C.green, C.yellow, C.red];
            return (
              <div
                key={k}
                style={{
                  borderTop: `4px solid ${cols[i % 4]}`,
                  background: "rgba(255,255,255,.05)",
                  borderRadius: 12,
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 800, color: cols[i % 4] }}>{k}</div>
                <div style={{ marginTop: 8, fontSize: T.body, lineHeight: 1.4, color: "rgba(255,255,255,.75)" }}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Body>
    <Foot n={n} dark />
  </Slide>
);

/* Exercício comentado */
const Exercicio = ({
  n,
  numero,
  titulo,
  cenario,
  esperado,
  destaque,
  destaqueTitulo,
  erro,
}: {
  n: string;
  numero: string;
  titulo: string;
  cenario: string;
  esperado: string;
  destaque: string;
  destaqueTitulo: string;
  erro?: string;
}) => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow={`Exercício comentado · ${numero}`} title={titulo} accent={C.red} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card color={C.blue} title="Cenário" icon={FileSearch}>
            {cenario}
          </Card>
          <Card color={C.green} title="Decisão esperada" icon={CheckCircle2}>
            {esperado}
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Note color={C.yellow} title={destaqueTitulo} icon={Compass}>
            {destaque}
          </Note>
          {erro && (
            <Note color={C.red} title="Erro a evitar" icon={XCircle}>
              {erro}
            </Note>
          )}
        </div>
      </div>
    </Body>
    <Foot n={n} />
  </Slide>
);

/* ============================================================
   Slides
   ============================================================ */

const S00Capa = () => (
  <Slide
    bg={C.inkDeep}
    decor={
      <>
        <ColorBar />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1000px 560px at 78% 12%, rgba(31,107,82,.45), transparent 68%), radial-gradient(760px 500px at 12% 96%, rgba(216,186,128,.12), transparent 66%)",
          }}
        />
        {/* halo do escudo */}
        <div style={{ position: "absolute", right: 108, top: 128 }}>
          <ShieldOutline size={660} color={C.sand} opacity={0.22} strokeWidth={1.2} />
        </div>
      </>
    }
  >
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1050 }}>
      <div className="flex items-center" style={{ gap: 14 }}>
        {[
          { c: C.sand, w: 74 },
          { c: "rgba(255,255,255,.35)", w: 30 },
          { c: "rgba(255,255,255,.18)", w: 16 },
        ].map(({ c, w }) => (
          <span key={c} style={{ width: w, height: 5, background: c, borderRadius: 3 }} />
        ))}
      </div>
      <div
        style={{
          marginTop: 26,
          fontSize: T.label,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.6)",
          fontWeight: 700,
        }}
      >
        Treinamento · Auditoria de sistemas de gestão
      </div>
      <h1
        style={{
          marginTop: 20,
          fontSize: 100,
          lineHeight: 0.98,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          color: C.white,
        }}
      >
        Fundamentos da
        <br />
        <span style={{ color: C.sand }}>ISO 19011</span>
        <span style={{ color: "rgba(255,255,255,.45)" }}>:2026</span>
      </h1>
      <p style={{ marginTop: 22, fontSize: 33, color: "rgba(255,255,255,.78)", maxWidth: 760, lineHeight: 1.35 }}>
        Diretrizes para auditorias de sistemas de gestão — do princípio à decisão.
      </p>

      <div style={{ marginTop: 46, display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ width: 3, height: 66, background: C.sand, borderRadius: 2 }} />
        <div>
          <div style={{ fontSize: 38, fontWeight: 800, color: C.white, letterSpacing: "-0.01em" }}>Anne Dezan</div>
          <div style={{ fontSize: T.body, color: "rgba(255,255,255,.65)", marginTop: 4 }}>
            Bióloga · Consultora · Auditora Líder · Perita técnica em alimentos
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const S01Organizacao = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head
        eyebrow="Visão geral"
        title="Como o curso está organizado"
        sub="Quatro blocos encadeados: da base conceitual à avaliação de competência."
      />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignContent: "stretch" }}>
        {([
          [BookOpen, C.blue, "01", "Introdução, escopo e princípios", "Base conceitual e linguagem comum."],
          [ClipboardList, C.green, "02", "Gestão do programa", "Objetivos, riscos, métodos e registros."],
          [Radar, C.yellow, "03", "Condução da auditoria", "Planejamento, evidências e relatório."],
          [Award, C.red, "04", "Competência e avaliação", "Critérios, métodos e desenvolvimento."],
        ] as [React.ElementType, string, string, string, string][]).map(([Icon, col, num, title, desc]) => (
          <div
            key={num}
            style={{
              background: C.paper,
              border: `1px solid ${C.line}`,
              borderTop: `5px solid ${col}`,
              borderRadius: 16,
              padding: "26px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ width: 46, height: 46, borderRadius: 12, background: `${col}1F`, display: "grid", placeItems: "center" }}>
                <Icon size={30} color={col} strokeWidth={2.2} />
              </span>
              <span style={{ fontSize: 44, fontWeight: 800, color: `${col}55` }}>{num}</span>
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: C.ink, lineHeight: 1.15 }}>{title}</h3>
            <p style={{ fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>{desc}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          background: C.ink,
          borderRadius: 16,
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: T.small, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.sand }}>
          Formato de cada bloco
        </span>
        {["Conceito", "Aplicação prática", "Documentos de suporte", "Exemplo comentado", "Erros comuns"].map((s, i, arr) => (
          <span key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: T.lead, color: C.white, fontWeight: 600 }}>{s}</span>
            {i < arr.length - 1 && <ArrowRight size={22} color={C.sand} />}
          </span>
        ))}
      </div>
    </Body>
    <Foot n="02" />
  </Slide>
);

const S02Objetivos = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Objetivos de aprendizagem" title="O que você será capaz de fazer ao final" accent={C.green} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 34 }}>
        <ul style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 4 }}>
          <Bullet>Interpretar a ISO 19011:2026 como diretriz aplicada — não como checklist.</Bullet>
          <Bullet>Planejar programas e auditorias com abordagem baseada em riscos.</Bullet>
          <Bullet>Selecionar métodos presenciais, remotos ou híbridos conforme objetivo e evidência.</Bullet>
          <Bullet>Coletar evidências suficientes, gerar constatações claras e relatar limitações.</Bullet>
          <Bullet>Definir e avaliar competência de auditores de forma objetiva.</Bullet>
        </ul>

        <div
          style={{
            background: C.white,
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            padding: "26px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div className="flex items-center" style={{ gap: 12 }}>
            <span style={{ width: 42, height: 42, borderRadius: 11, background: `${C.yellow}22`, display: "grid", placeItems: "center" }}>
              <ClipboardList size={28} color={C.yellow} strokeWidth={2.3} />
            </span>
            <h3 style={{ fontSize: 31, fontWeight: 800, color: C.ink }}>Material de apoio</h3>
          </div>
          <p style={{ fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>
            Ao longo do curso serão indicados modelos prontos para uso:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["Programa trienal", "Plano de auditoria", "Relatório", "RNC", "Matriz de competência", "Checklist remoto"].map((m, i) => {
              const cols = [C.blue, C.green, C.yellow, C.red];
              return (
                <span
                  key={m}
                  style={{
                    fontSize: T.small,
                    fontWeight: 700,
                    color: C.ink,
                    background: `${cols[i % 4]}14`,
                    border: `1px solid ${cols[i % 4]}44`,
                    borderRadius: 10,
                    padding: "10px 12px",
                  }}
                >
                  {m}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Body>
    <Foot n="03" />
  </Slide>
);

const S03Modulo1 = () => (
  <Divider
    n="04"
    modulo="Módulo 01"
    title="Introdução, escopo e princípios"
    sub="A base conceitual da auditoria de sistemas de gestão."
    items={[
      ["O que é a norma", "Diretriz para planejar, conduzir e avaliar auditorias."],
      ["Onde se aplica", "Primeira, segunda e terceira parte, com limites específicos."],
      ["Conceitos-chave", "Critério, evidência, constatação, conclusão e programa."],
      ["Princípios", "A base para julgamento, conduta e confiabilidade."],
    ]}
  />
);

const S04Contexto = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Introdução" title="A ISO 19011:2026 no contexto das auditorias" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>
        <div>
          <div
            style={{
              background: C.ink,
              borderRadius: 16,
              padding: "26px 28px",
              color: C.white,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 800 }}>ISO 19011:2026</div>
            <div style={{ fontSize: T.body, color: "rgba(255,255,255,.7)", marginTop: 6 }}>
              Diretrizes gerais para auditorias de sistemas de gestão
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 60, marginTop: 4 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 2, height: 34, background: C.line }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {([
              [C.blue, "1ª parte", "Auditoria interna", Building2],
              [C.green, "2ª parte", "Fornecedor", Handshake],
              [C.yellow, "3ª parte", "Certificação", Award],
            ] as [string, string, string, React.ElementType][]).map(([col, t, d, Icon]) => (
              <div
                key={t}
                style={{
                  background: `${col}12`,
                  border: `1px solid ${col}55`,
                  borderRadius: 14,
                  padding: "20px 18px",
                  textAlign: "center",
                }}
              >
                <Icon size={32} color={col} strokeWidth={2.2} style={{ margin: "0 auto" }} />
                <div style={{ marginTop: 10, fontSize: 26, fontWeight: 800, color: C.ink }}>{t}</div>
                <div style={{ fontSize: T.small, color: C.mute, marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card color={C.red} title="Regras específicas podem somar exigências" icon={Layers}>
            ISO/IEC 17021-1, requisitos de acreditação, regras de esquemas e critérios internos adicionam requisitos sobre a
            diretriz geral.
          </Card>
          <Note color={C.blue} title="Leitura correta" icon={Compass}>
            A ISO 19011 orienta <strong>como decidir</strong>. Os esquemas e normas de acreditação definem <strong>o que é
            obrigatório</strong> em cada contexto de auditoria.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="05" />
  </Slide>
);

const S05Conceitos = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Conceitos essenciais" title="A linguagem comum da auditoria" accent={C.green} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, alignItems: "stretch" }}>
          {([
            [C.blue, "Critério", "Requisito usado como referência.", Scale],
            [C.green, "Evidência", "Informação verificável e relevante.", FileSearch],
            [C.yellow, "Constatação", "Resultado da avaliação da evidência contra o critério.", Target],
            [C.red, "Conclusão", "Resultado da auditoria, considerando objetivos e constatações.", CheckCircle2],
          ] as [string, string, string, React.ElementType][]).map(([col, t, d, Icon], i) => (
            <div key={t} style={{ display: "flex", alignItems: "stretch" }}>
              <div
                style={{
                  flex: 1,
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  borderTop: `5px solid ${col}`,
                  borderRadius: 14,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span style={{ width: 44, height: 44, borderRadius: 12, background: `${col}1C`, display: "grid", placeItems: "center" }}>
                  <Icon size={29} color={col} strokeWidth={2.2} />
                </span>
                <div style={{ fontSize: 31, fontWeight: 800, color: C.ink }}>{t}</div>
                <div style={{ fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>{d}</div>
              </div>
              {i < 3 && (
                <div style={{ width: 44, display: "grid", placeItems: "center" }}>
                  <ArrowRight size={32} color={C.ink} strokeWidth={2.4} />
                </div>
              )}
            </div>
          ))}
        </div>

        <Note color={C.yellow} title="Documentos de apoio" icon={ClipboardList}>
          Glossário interno · guia de redação de constatações · modelo de relatório · exemplos de evidência aceitável.
        </Note>
      </div>
    </Body>
    <Foot n="06" />
  </Slide>
);

const S06Principios = () => {
  const principios: [React.ElementType, string, string][] = [
    [ShieldCheck, "Integridade", C.blue],
    [Scale, "Apresentação justa", C.green],
    [Eye, "Cuidado profissional", C.yellow],
    [Lock, "Confidencialidade", C.red],
    [UserCheck, "Independência", C.blue],
    [FileSearch, "Baseada em evidência", C.green],
    [Gauge, "Baseada em risco", C.yellow],
  ];
  return (
    <Slide bg={C.white} decor={<ColorBar vertical />}>
      <Body>
        <Head eyebrow="Cláusula 4" title="Sete princípios que sustentam a auditoria" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {principios.map(([Icon, nome, col], i) => (
              <div
                key={nome}
                style={{
                  background: C.paper,
                  border: `1px solid ${C.line}`,
                  borderLeft: `5px solid ${col}`,
                  borderRadius: 14,
                  padding: "22px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  gridColumn: i === 6 ? "span 1" : undefined,
                }}
              >
                <span style={{ width: 44, height: 44, borderRadius: 12, background: `${col}1C`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Icon size={29} color={col} strokeWidth={2.2} />
                </span>
                <span style={{ fontSize: 24, fontWeight: 800, color: C.ink, lineHeight: 1.15 }}>{nome}</span>
              </div>
            ))}
            <div
              style={{
                background: C.ink,
                borderRadius: 14,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 51, fontWeight: 800, color: C.yellow, lineHeight: 1 }}>7</span>
              <span style={{ fontSize: T.small, color: "rgba(255,255,255,.7)", marginTop: 6 }}>
                princípios · uma única base de julgamento
              </span>
            </div>
          </div>

          <Note color={C.green} title="Aplicação prática" icon={Compass}>
            Quando houver pressão, evidência fraca, conflito de interesse ou limitação de método, o auditor volta aos princípios
            para decidir.
          </Note>
        </div>
      </Body>
      <Foot n="07" />
    </Slide>
  );
};

const S07PrincipioDecisao = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Do princípio à decisão" title="Cada princípio vira uma ação concreta" accent={C.yellow} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              background: C.ink,
              color: C.white,
              fontSize: T.small,
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "14px 24px",
            }}
          >
            <span>Princípio</span>
            <span>Ação do auditor</span>
          </div>
          {([
            [C.yellow, "Risco", "Selecionar processos críticos, ampliar amostra e ajustar o método."],
            [C.green, "Evidência", "Não concluir por impressão: verificar fonte, suficiência e confiabilidade."],
            [C.blue, "Independência", "Evitar conflito de interesse e não recomendar solução como consultoria."],
            [C.red, "Confidencialidade", "Proteger informação obtida, controlar acesso, registros e compartilhamento."],
            [C.green, "Apresentação justa", "Relatar limitações, divergências e conclusões com clareza."],
          ] as [string, string, string][]).map(([col, p, a], i) => (
            <div
              key={p}
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                alignItems: "center",
                padding: "17px 24px",
                borderTop: `1px solid ${C.line}`,
                background: i % 2 ? C.paper : C.white,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, fontWeight: 800, color: C.ink }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: col }} />
                {p}
              </span>
              <span style={{ fontSize: T.body, color: C.mute, lineHeight: 1.4 }}>{a}</span>
            </div>
          ))}
        </div>

        <Note color={C.red} title="Para avaliação" icon={HelpCircle}>
          Qual princípio é mais afetado quando o auditor aceita apenas os documentos selecionados pelo auditado?
        </Note>
      </div>
    </Body>
    <Foot n="08" />
  </Slide>
);

const S08Ex1 = () => (
  <Exercicio
    n="09"
    numero="Exemplo prático 1"
    titulo="Evidência filtrada"
    cenario='O auditado envia previamente uma pasta com registros "prontos". Nas entrevistas surgem indícios de que registros críticos ficaram fora da amostra.'
    esperado="Solicitar fonte primária, ampliar amostra, registrar limitação se houver restrição e manter a conclusão baseada em evidência verificável."
    destaqueTitulo="Princípios acionados"
    destaque="Devido cuidado profissional · abordagem baseada em evidências · abordagem baseada em riscos · apresentação justa."
    erro="Aceitar a pasta do auditado como universo da amostra, sem avaliar representatividade, fonte e confiabilidade."
  />
);

const S09Modulo2 = () => (
  <Divider
    n="10"
    modulo="Módulo 02"
    title="Gestão do programa de auditoria"
    sub="O programa como sistema: planejar, implementar, monitorar e melhorar."
    items={[
      ["5.1 a 5.3", "Objetivos, contexto, riscos e oportunidades."],
      ["5.4", "Estrutura: responsabilidades, competência, escopo e recursos."],
      ["5.5", "Implementação: métodos, equipes, registros e resultados."],
      ["5.6 e 5.7", "Monitoramento, revisão e melhoria do programa."],
    ]}
    accent={C.green}
  />
);

const S10PDCA = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Cláusula 5" title="Programa de auditoria: mais que uma agenda" accent={C.green} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {([
            [C.blue, "PLAN", "5.2 · 5.3 · 5.4", "Objetivos, riscos, estrutura e recursos."],
            [C.green, "DO", "5.5", "Implementar auditorias, equipes e registros."],
            [C.yellow, "CHECK", "5.6", "Monitorar desempenho e resultados."],
            [C.red, "ACT", "5.7", "Revisar e melhorar o programa."],
          ] as [string, string, string, string][]).map(([col, t, cl, d]) => (
            <div
              key={t}
              style={{
                background: `${col}10`,
                border: `1px solid ${col}55`,
                borderRadius: 16,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 44, fontWeight: 800, color: col, letterSpacing: "-0.02em" }}>{t}</div>
              <div style={{ fontSize: T.small, fontWeight: 800, color: C.ink, letterSpacing: "0.1em" }}>{cl}</div>
              <div style={{ fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Note color={C.green} title="Resultado esperado" icon={CheckCircle2}>
            Um conjunto de auditorias planejadas para um período, com objetivos, riscos, métodos, recursos, critérios e registros.
          </Note>
          <Note color={C.red} title="Atenção" icon={AlertTriangle}>
            Agenda sem análise de risco, método e competência não demonstra gestão robusta do programa.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="11" />
  </Slide>
);

const S11Objetivos = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="5.2" title="Objetivos do programa: das entradas às intenções" accent={C.blue} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 90px 1fr", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontSize: T.small, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mute, marginBottom: 14 }}>
            Entradas a considerar
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Contexto", "Partes interessadas", "Riscos e oportunidades", "Desempenho", "Auditorias anteriores", "Mudanças relevantes"].map(
              (e) => (
                <div
                  key={e}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.line}`,
                    borderLeft: `4px solid ${C.blue}`,
                    borderRadius: 12,
                    padding: "16px 16px",
                    fontSize: T.body,
                    fontWeight: 700,
                    color: C.ink,
                  }}
                >
                  {e}
                </div>
              )
            )}
          </div>
        </div>

        <div style={{ display: "grid", placeItems: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.yellow, display: "grid", placeItems: "center" }}>
            <ArrowRight size={38} color={C.ink} strokeWidth={2.6} />
          </div>
        </div>

        <div>
          <div style={{ fontSize: T.small, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mute, marginBottom: 14 }}>
            Objetivos do programa
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Conformidade", "Eficácia", "Maturidade", "Melhoria", "Confiança na cadeia", "Redução de risco"].map((e) => (
              <div
                key={e}
                style={{
                  background: `${C.green}12`,
                  border: `1px solid ${C.green}55`,
                  borderRadius: 12,
                  padding: "16px 16px",
                  fontSize: T.body,
                  fontWeight: 700,
                  color: C.ink,
                }}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Note color={C.yellow} title="Comentário" icon={Compass}>
        Objetivo do <strong>programa</strong> é visão de ciclo. Objetivo da <strong>auditoria individual</strong> é o foco de uma
        auditoria específica.
      </Note>
    </Body>
    <Foot n="12" />
  </Slide>
);

const S12Riscos = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="5.3" title="Riscos e oportunidades do programa" accent={C.red} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {([
            [ClipboardList, C.blue, "Planejamento", "Objetivos, duração, frequência e locais inadequados."],
            [Wallet, C.green, "Recursos", "Tempo, treinamento, disponibilidade e tecnologia insuficientes."],
            [Users, C.yellow, "Equipe", "Competência, independência e composição inadequadas."],
            [Compass, C.red, "Método", "Presencial ou remoto sem capacidade de atingir o objetivo."],
            [Database, C.blue, "Informação", "Evidências indisponíveis ou registros mal protegidos."],
            [MonitorSmartphone, C.green, "ICT", "Plataforma insegura ou instável."],
          ] as [React.ElementType, string, string, string][]).map(([Icon, col, t, d]) => (
            <Card key={t} color={col} title={t} icon={Icon} tint={C.paper} compact>
              {d}
            </Card>
          ))}
        </div>

        <Note color={C.yellow} title="O que deve ser avaliado previamente pela equipe auditora" icon={Target}>
          Cada risco deve estar conectado a uma decisão: frequência, duração, amostra, método, competência, plano alternativo e
          monitoramento.
        </Note>
      </div>
    </Body>
    <Foot n="13" />
  </Slide>
);

const S13Decisoes = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="5.4" title="Estabelecendo o programa: 4 decisões críticas" accent={C.green} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignContent: "stretch" }}>
        {([
          [UserCheck, C.blue, "Responsável", "Quem gerencia o programa e protege sua integridade?"],
          [Brain, C.green, "Competência", "Que conhecimento é necessário para gerir riscos, métodos e registros?"],
          [Layers, C.yellow, "Escopo", "Quais locais, processos, funções, requisitos e períodos entram?"],
          [Wallet, C.red, "Recursos", "Que tempo, equipe, tecnologia, acesso e orçamento são necessários?"],
        ] as [React.ElementType, string, string, string][]).map(([Icon, col, t, d], i) => (
          <div
            key={t}
            style={{
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: col }} />
            <div className="flex items-center justify-between">
              <span style={{ width: 48, height: 48, borderRadius: 12, background: `${col}1C`, display: "grid", placeItems: "center" }}>
                <Icon size={31} color={col} strokeWidth={2.2} />
              </span>
              <span style={{ fontSize: 38, fontWeight: 800, color: `${col}44` }}>0{i + 1}</span>
            </div>
            <h3 style={{ fontSize: 31, fontWeight: 800, color: C.ink }}>{t}</h3>
            <p style={{ fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>{d}</p>
          </div>
        ))}
      </div>
      <Note color={C.blue} title="Documentos de suporte" icon={ClipboardList}>
        Procedimento do programa · matriz de riscos · matriz de competência · critérios de seleção de equipe · aprovação do
        programa.
      </Note>
    </Body>
    <Foot n="14" />
  </Slide>
);

const S14Implementacao = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="5.5" title="Implementando o programa: do plano à execução" accent={C.blue} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {["Comunicar programa", "Definir objetivos e escopo", "Selecionar métodos", "Selecionar equipe", "Designar líder", "Gerir resultados", "Manter registros"].map(
            (s, i, arr) => {
              const cols = [C.blue, C.green, C.yellow, C.red];
              const col = cols[i % 4];
              return (
                <div key={s} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                  <div
                    style={{
                      flex: 1,
                      background: C.paper,
                      border: `1px solid ${C.line}`,
                      borderBottom: `4px solid ${col}`,
                      borderRadius: 12,
                      padding: "18px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: col,
                        color: i === 2 ? C.ink : C.white,
                        fontSize: T.small,
                        fontWeight: 800,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: T.body, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>{s}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 22, display: "grid", placeItems: "center" }}>
                      <ArrowRight size={22} color={C.mute} strokeWidth={2.4} />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Note color={C.yellow} title="Decisão crítica · método" icon={Compass}>
            O método deve ser escolhido pela capacidade de alcançar os objetivos — não apenas por custo ou conveniência.
          </Note>
          <Note color={C.green} title="Decisão crítica · equipe" icon={Users}>
            A competência coletiva deve cobrir o escopo. Lacunas precisam ser tratadas com auditor competente ou especialista
            técnico.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="15" />
  </Slide>
);

const S15Metodos = () => {
  const cell = (items: string[], col: string, tint: string) => (
    <div style={{ background: tint, border: `1px solid ${col}44`, borderRadius: 12, padding: "18px 20px" }}>
      <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: T.small, color: C.text, lineHeight: 1.35 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: col, marginTop: 7, flexShrink: 0 }} />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <Slide bg={C.paper} decor={<ColorBar vertical />}>
      <Body>
        <Head eyebrow="Anexo A · Tabela A.1" title="Métodos de auditoria: onde e com quem" accent={C.yellow} />
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "210px 1fr 1fr", gridTemplateRows: "auto 1fr 1fr", gap: 14 }}>
          <div />
          {["Auditor no local (on-site)", "Auditor remoto"].map((h) => (
            <div
              key={h}
              style={{
                background: C.ink,
                color: C.white,
                borderRadius: 10,
                padding: "12px 18px",
                fontSize: T.small,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {h}
            </div>
          ))}

          <div style={{ background: `${C.blue}12`, border: `1px solid ${C.blue}55`, borderRadius: 10, padding: "16px", display: "grid", alignContent: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>Com interação humana</span>
          </div>
          {cell(["Entrevistas", "Observação do trabalho realizado", "Checklists e questionários com o auditado", "Análise documental com o auditado", "Amostragem"], C.blue, C.white)}
          {cell(["Entrevistas por meio interativo", "Observação com guia remoto", "Checklists com participação do auditado", "Análise documental compartilhada", "Amostragem"], C.blue, C.white)}

          <div style={{ background: `${C.green}12`, border: `1px solid ${C.green}55`, borderRadius: 10, padding: "16px", display: "grid", alignContent: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>Sem interação humana</span>
          </div>
          {cell(["Análise de informação documentada", "Observação do trabalho realizado", "Visita ao local", "Preenchimento de checklists", "Amostragem"], C.green, C.white)}
          {cell(["Análise de informação documentada e dados", "Observação por meios de monitoramento", "Análise de dados", "Atenção a requisitos legais e sociais"], C.green, C.white)}
        </div>
        <Note color={C.red} title="Definição" icon={Globe}>
          Atividades remotas são realizadas de qualquer lugar fora do local do auditado — independentemente da distância.
        </Note>
      </Body>
      <Foot n="16" />
    </Slide>
  );
};

const S16Remoto = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="ISO/IEC TS 17012" title="Métodos remotos e híbridos no programa" accent={C.blue} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {([
            [C.blue, "O objetivo é alcançável remotamente?"],
            [C.green, "A evidência é acessível e confiável?"],
            [C.yellow, "O processo exige observação sensorial ou presencial?"],
            [C.red, "Há segurança da informação e plano alternativo?"],
          ] as [string, string][]).map(([col, q]) => (
            <div
              key={q}
              style={{
                background: C.paper,
                border: `1px solid ${C.line}`,
                borderTop: `4px solid ${col}`,
                borderRadius: 14,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <HelpCircle size={38} color={col} strokeWidth={2.2} />
              <span style={{ fontSize: 26, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>{q}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Note color={C.red} title="Regra prática" icon={AlertTriangle}>
            Se a avaliação de risco indicar ameaça inaceitável à eficácia da auditoria, o método remoto não deve ser utilizado —
            ou deve ser combinado/alterado.
          </Note>
          <Note color={C.green} title="Localização virtual" icon={Globe}>
            Não é "uma fábrica auditada por vídeo". É uma localização em que o trabalho ou serviço ocorre em ambiente online.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="17" />
  </Slide>
);

const S17Monitorar = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="5.6 e 5.7" title="Monitorar, revisar e melhorar o programa" accent={C.green} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {([
            [C.blue, "Monitorar", "5.6"],
            [C.green, "Avaliar resultados", "5.6"],
            [C.yellow, "Revisar", "5.7"],
            [C.red, "Melhorar programa", "5.7"],
          ] as [string, string, string][]).map(([col, t, cl], i, arr) => (
            <div key={t} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  borderTop: `4px solid ${col}`,
                  borderRadius: 14,
                  padding: "22px 20px",
                }}
              >
                <div style={{ fontSize: T.label, fontWeight: 800, letterSpacing: "0.18em", color: col }}>{cl}</div>
                <div style={{ fontSize: 29, fontWeight: 800, color: C.ink, marginTop: 8, lineHeight: 1.15 }}>{t}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 46, display: "grid", placeItems: "center" }}>
                  <ArrowRight size={30} color={C.ink} strokeWidth={2.4} />
                </div>
              )}
            </div>
          ))}
          <div style={{ width: 56, display: "grid", placeItems: "center" }}>
            <Repeat size={35} color={C.mute} strokeWidth={2.2} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Card color={C.green} title="Evidências de monitoramento" icon={Gauge}>
            Cumprimento da agenda · desempenho da equipe · feedback · suficiência das informações · alcance dos objetivos.
          </Card>
          <Card color={C.red} title="Gatilhos de revisão" icon={Radar}>
            Mudanças no contexto, requisitos, cadeia, escopo, método, tecnologia, riscos e conflitos de interesse.
          </Card>
        </div>
      </div>
    </Body>
    <Foot n="18" />
  </Slide>
);

const S18Ex2 = () => (
  <Exercicio
    n="19"
    numero="Exemplo prático 2"
    titulo="Programa sem risco"
    cenario="Todos os processos são auditados uma vez por ano, com a mesma duração, independentemente de criticidade, reclamações, mudanças ou desempenho."
    esperado="Definir critérios de risco para frequência, duração, método, competência e amostragem; revisar o programa com base nos resultados."
    destaqueTitulo="Perguntas para discussão"
    destaque="Qual processo deveria receber mais tempo? Que evidências justificam reduzir ou ampliar a frequência?"
    erro="Tratar o programa como calendário fixo, sem conexão com desempenho, incidentes e mudanças do contexto."
  />
);

const S19Modulo3 = () => (
  <Divider
    n="20"
    modulo="Módulo 03"
    title="Condução de uma auditoria"
    sub="Da iniciação ao follow-up: transformar plano em conclusão confiável."
    items={[
      ["6.2", "Iniciar a auditoria e avaliar viabilidade."],
      ["6.3", "Preparar plano, trilhas, amostras e documentos de trabalho."],
      ["6.4", "Conduzir reuniões, entrevistas, coleta e verificação."],
      ["6.5 a 6.7", "Relatar, concluir e acompanhar ações."],
    ]}
    accent={C.yellow}
  />
);

const S20Ciclo = () => {
  const etapas: [string, string, string][] = [
    ["Iniciar", "6.2", C.blue],
    ["Preparar", "6.3", C.green],
    ["Conduzir", "6.4", C.yellow],
    ["Relatar", "6.5", C.red],
    ["Concluir", "6.6", C.blue],
    ["Follow-up", "6.7", C.green],
  ];
  const cx = 330;
  const cy = 268;
  const r = 200;
  return (
    <Slide bg={C.white} decor={<ColorBar vertical />}>
      <Body>
        <Head eyebrow="Cláusula 6" title="O ciclo da auditoria individual" accent={C.yellow} />
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "700px 1fr", gap: 30, alignItems: "center" }}>
          <svg width={700} height={540} viewBox="0 0 700 540">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.line} strokeWidth={2} strokeDasharray="6 8" />
            {etapas.map(([t, cl, col], i) => {
              const a = (-90 + i * 60) * (Math.PI / 180);
              const x = cx + r * Math.cos(a);
              const y = cy + r * Math.sin(a);
              return (
                <g key={t}>
                  <circle cx={x} cy={y} r={54} fill={col} opacity={0.12} />
                  <circle cx={x} cy={y} r={54} fill="none" stroke={col} strokeWidth={3} />
                  <text x={x} y={y - 4} textAnchor="middle" fontSize={17} fontWeight={800} fill={C.ink}>
                    {t}
                  </text>
                  <text x={x} y={y + 18} textAnchor="middle" fontSize={14} fontWeight={700} fill={col}>
                    {cl}
                  </text>
                </g>
              );
            })}
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.ink}>
              Auditoria
            </text>
            <text x={cx} y={cy + 20} textAnchor="middle" fontSize={16} fill={C.mute}>
              individual
            </text>
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Note color={C.blue} title="A conclusão depende do encadeamento" icon={Link2}>
              Objetivo claro → plano adequado → evidência suficiente → constatação consistente → relatório fiel.
            </Note>
            <Card color={C.red} title="Onde a cadeia costuma quebrar" icon={AlertTriangle} tint={C.paper}>
              Objetivo genérico, plano tratado como agenda, amostra fixa e constatação sem critério explícito.
            </Card>
          </div>
        </div>
      </Body>
      <Foot n="21" />
    </Slide>
  );
};

const S21Iniciacao = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="6.2" title="Iniciação e viabilidade: antes de abrir a auditoria" accent={C.blue} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignContent: "stretch" }}>
        {([
          [ShieldCheck, C.blue, "Autoridade", "Há autorização e canal de comunicação definido?"],
          [Target, C.green, "Escopo", "Objetivos, critérios e limites estão claros?"],
          [Database, C.yellow, "Acesso", "Pessoas, locais, sistemas e registros estarão disponíveis?"],
          [AlertTriangle, C.red, "Riscos", "Existem restrições de segurança, confidencialidade ou método?"],
        ] as [React.ElementType, string, string, string][]).map(([Icon, col, t, d]) => (
          <Card key={t} color={col} title={t} icon={Icon}>
            {d}
          </Card>
        ))}
      </div>
      <Note color={C.green} title="Para auditoria remota ou híbrida" icon={MonitorSmartphone}>
        Confirmar plataforma, acesso remoto, consentimentos, segurança da informação, evidências eletrônicas, testes técnicos e
        plano alternativo.
      </Note>
    </Body>
    <Foot n="22" />
  </Slide>
);

const S22Plano = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="6.3" title="Plano de auditoria: não é apenas uma agenda" accent={C.green} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 340px 1fr", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(["Objetivos", "Escopo e critérios", "Processos e locais"] as string[]).map((t, i) => (
            <div
              key={t}
              style={{
                background: C.paper,
                border: `1px solid ${C.line}`,
                borderLeft: `5px solid ${[C.blue, C.green, C.yellow][i]}`,
                borderRadius: 12,
                padding: "18px 20px",
                fontSize: 26,
                fontWeight: 700,
                color: C.ink,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        <div
          style={{
            background: C.ink,
            borderRadius: 20,
            padding: "34px 26px",
            textAlign: "center",
          }}
        >
          <ClipboardList size={48} color={C.yellow} strokeWidth={2.2} style={{ margin: "0 auto" }} />
          <div style={{ marginTop: 14, fontSize: 36, fontWeight: 800, color: C.white, lineHeight: 1.15 }}>
            Plano de auditoria
          </div>
          <div style={{ marginTop: 10, fontSize: T.body, color: "rgba(255,255,255,.7)", lineHeight: 1.4 }}>
            Um documento de decisões — não um cronograma de salas.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(["Métodos", "Amostras e trilhas", "Equipe e papéis"] as string[]).map((t, i) => (
            <div
              key={t}
              style={{
                background: C.paper,
                border: `1px solid ${C.line}`,
                borderRight: `5px solid ${[C.red, C.blue, C.green][i]}`,
                borderRadius: 12,
                padding: "18px 20px",
                fontSize: 26,
                fontWeight: 700,
                color: C.ink,
                textAlign: "right",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <Note color={C.blue} title="Documentos de suporte" icon={ClipboardList}>
        Modelo de plano · checklist de revisão documental · matriz de trilhas · plano de amostragem · plano de contingência
        remoto.
      </Note>
    </Body>
    <Foot n="23" />
  </Slide>
);

const S23Trilha = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Anexo A" title="Trilha e amostragem baseadas em riscos" accent={C.yellow} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 380px", gap: 30, alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {([
            [Database, C.blue, "Registros"],
            [Layers, C.green, "Processos críticos"],
            [Gauge, C.yellow, "Indicadores"],
            [Link2, C.red, "Interfaces"],
            [MessageSquare, C.blue, "Reclamações e incidentes"],
            [Users, C.green, "Pessoas"],
          ] as [React.ElementType, string, string][]).map(([Icon, col, t]) => (
            <div
              key={t}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderTop: `4px solid ${col}`,
                borderRadius: 14,
                padding: "22px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Icon size={32} color={col} strokeWidth={2.2} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 24, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>{t}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            background: C.ink,
            borderRadius: 20,
            padding: "34px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <Target size={45} color={C.yellow} strokeWidth={2.2} />
          <div style={{ fontSize: 33, fontWeight: 800, color: C.white, lineHeight: 1.15 }}>
            Risco e objetivo da auditoria definem a trilha
          </div>
          <div style={{ fontSize: T.body, color: "rgba(255,255,255,.72)", lineHeight: 1.45 }}>
            A amostra não é sorteio: é consequência do que precisa ser demonstrado.
          </div>
        </div>
      </div>
      <Note color={C.green} title="Boa prática" icon={CheckCircle2}>
        A amostra deve ser ajustada durante a auditoria quando surgirem indícios, inconsistências ou risco maior que o previsto.
      </Note>
    </Body>
    <Foot n="24" />
  </Slide>
);

const S24Conducao = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="6.4" title="Condução das atividades: do contato à conclusão" accent={C.blue} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "stretch" }}>
          {["Abertura", "Comunicação", "Acesso à informação", "Coleta e verificação", "Constatações", "Conclusões", "Encerramento"].map(
            (s, i, arr) => {
              const cols = [C.blue, C.green, C.yellow, C.red];
              const col = cols[i % 4];
              return (
                <div key={s} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                  <div
                    style={{
                      flex: 1,
                      background: `${col}0F`,
                      border: `1px solid ${col}44`,
                      borderRadius: 12,
                      padding: "20px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      minWidth: 0,
                    }}
                  >
                    <span style={{ fontSize: T.label, fontWeight: 800, letterSpacing: "0.16em", color: col }}>0{i + 1}</span>
                    <span style={{ fontSize: T.body, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>{s}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 20, display: "grid", placeItems: "center" }}>
                      <ArrowRight size={20} color={C.mute} strokeWidth={2.4} />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Note color={C.yellow} title="Alerta" icon={MessageSquare}>
            Não conformidades devem ser discutidas com o auditado para confirmar a precisão da evidência e a compreensão da
            constatação.
          </Note>
          <Note color={C.red} title="Alerta" icon={AlertTriangle}>
            Divergências não resolvidas e limitações relevantes devem ser registradas no relatório.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="25" />
  </Slide>
);

const S25Triangulacao = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Evidência" title="Triangulação: entrevistas, observação e registros" accent={C.green} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "660px 1fr", gap: 30, alignItems: "center" }}>
        <svg width={660} height={470} viewBox="0 0 660 470">
          <polygon points="330,60 590,410 70,410" fill="none" stroke={C.line} strokeWidth={2} strokeDasharray="6 8" />
          <circle cx={330} cy={235} r={92} fill={C.ink} />
          <text x={330} y={226} textAnchor="middle" fontSize={19} fontWeight={800} fill={C.yellow}>
            Evidência
          </text>
          <text x={330} y={252} textAnchor="middle" fontSize={19} fontWeight={800} fill={C.white}>
            verificável
          </text>
          {([
            [330, 60, C.blue, "Observação"],
            [590, 410, C.green, "Registros e dados"],
            [70, 410, C.yellow, "Entrevistas"],
          ] as [number, number, string, string][]).map(([x, y, col, label]) => (
            <g key={label}>
              <circle cx={x} cy={y} r={62} fill={col} opacity={0.14} />
              <circle cx={x} cy={y} r={62} fill="none" stroke={col} strokeWidth={3} />
              <text x={x} y={y + 6} textAnchor="middle" fontSize={16} fontWeight={800} fill={C.ink}>
                {label.length > 12 ? label.split(" ")[0] : label}
              </text>
              {label.length > 12 && (
                <text x={x} y={y + 26} textAnchor="middle" fontSize={16} fontWeight={800} fill={C.ink}>
                  {label.split(" ").slice(1).join(" ")}
                </text>
              )}
            </g>
          ))}
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Note color={C.red} title="Importante" icon={AlertTriangle}>
            Entrevista sozinha raramente é suficiente para concluir.
          </Note>
          <Card color={C.green} title="O que o auditor busca" icon={Eye}>
            Coerência entre <strong>fala</strong>, <strong>prática</strong>, <strong>registro</strong> e <strong>resultado</strong>.
            Quando um dos vértices contradiz os demais, a amostra precisa crescer.
          </Card>
        </div>
      </div>
    </Body>
    <Foot n="26" />
  </Slide>
);

const S26Constatacao = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="6.4.8 e A.18" title="Constatação robusta: critério → evidência → conclusão" accent={C.yellow} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "stretch" }}>
          {([
            [C.blue, "Critério", "O requisito de referência."],
            [C.green, "Evidência", "O fato verificável coletado."],
            [C.yellow, "Avaliação", "Comparação objetiva entre os dois."],
            [C.red, "Constatação", "O resultado, classificado e redigido."],
          ] as [string, string, string][]).map(([col, t, d], i, arr) => (
            <div key={t} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  background: C.paper,
                  border: `1px solid ${C.line}`,
                  borderBottom: `5px solid ${col}`,
                  borderRadius: 14,
                  padding: "26px 22px",
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 800, color: C.ink }}>{t}</div>
                <div style={{ marginTop: 10, fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>{d}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 44, display: "grid", placeItems: "center" }}>
                  <ArrowRight size={30} color={C.ink} strokeWidth={2.4} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Note color={C.green} title="Boa redação" icon={CheckCircle2}>
            Critério claro + evidência objetiva + impacto ou risco, quando aplicável + classificação conforme critério definido.
          </Note>
          <Note color={C.red} title="Erro comum" icon={XCircle}>
            "O processo precisa melhorar" não é constatação. Sem critério e evidência, vira opinião.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="27" />
  </Slide>
);

const S27Relatorio = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="6.5 a 6.7" title="Relatório e follow-up" accent={C.blue} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignContent: "stretch" }}>
        {([
          [UserCheck, C.blue, "Identificação", "Auditado, equipe, datas, locais físicos e virtuais."],
          [Target, C.green, "Base da auditoria", "Objetivos, escopo, critérios e métodos."],
          [FileSearch, C.yellow, "Resultados", "Constatações, NCs, evidências e conclusões."],
          [Eye, C.red, "Transparência", "Limitações, desvios, divergências e follow-up."],
        ] as [React.ElementType, string, string, string][]).map(([Icon, col, t, d]) => (
          <Card key={t} color={col} title={t} icon={Icon}>
            {d}
          </Card>
        ))}
      </div>
      <Note color={C.red} title="Alerta de imparcialidade" icon={Scale}>
        Em auditorias de terceira parte, recomendações devem ser tratadas com cuidado para não caracterizar consultoria.
      </Note>
    </Body>
    <Foot n="28" />
  </Slide>
);

const S28Ex3 = () => (
  <Exercicio
    n="29"
    numero="Exemplo prático 3"
    titulo="Evidência remota insuficiente"
    cenario="Em auditoria remota, o auditado apresenta registros em pasta compartilhada. Indicadores e reclamações sugerem falha operacional, mas o auditor não acessa o sistema de origem."
    esperado="Solicitar acesso à fonte primária, ampliar amostra, registrar limitações, ajustar o método se necessário e evitar conclusão com evidência fraca."
    destaqueTitulo="Na prática"
    destaque='"O que você faria se o cliente negasse acesso ao sistema?"'
    erro="Concluir conformidade a partir de arquivos exportados, sem verificar integridade, origem e período dos dados."
  />
);

const S29Modulo4 = () => (
  <Divider
    n="30"
    modulo="Módulo 04"
    title="Competência e avaliação de auditores"
    sub="Competência demonstrada, mantida e coerente com o escopo auditado."
    items={[
      ["7.1 e 7.2", "Determinar a competência necessária."],
      ["Comportamento", "Atributos pessoais que sustentam os princípios."],
      ["7.3 a 7.5", "Critérios, métodos e condução da avaliação."],
      ["7.6", "Manutenção e melhoria contínua da competência."],
    ]}
    accent={C.red}
  />
);

const S30Camadas = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="7.2" title="Competência: camadas que precisam se combinar" accent={C.blue} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
        {([
          [C.red, "Tecnologia, ICT, IA e métodos remotos", 100],
          [C.yellow, "Setor, processo e requisitos legais", 88],
          [C.green, "Disciplina do sistema de gestão", 76],
          [C.blue, "Conhecimento de auditoria e métodos", 64],
          [C.ink, "Comportamento profissional", 52],
        ] as [string, string, number][]).map(([col, t, w]) => (
          <div key={t} style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: `${w}%`,
                background: col === C.ink ? C.ink : `${col}18`,
                border: `1px solid ${col}66`,
                borderRadius: 12,
                padding: "20px 26px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span style={{ width: 12, height: 12, borderRadius: 4, background: col === C.ink ? C.yellow : col }} />
              <span style={{ fontSize: 27, fontWeight: 700, color: col === C.ink ? C.white : C.ink }}>{t}</span>
            </div>
          </div>
        ))}
      </div>
      <Note color={C.red} title="Atenção" icon={AlertTriangle}>
        Treinamento ajuda a adquirir competência, mas não substitui a avaliação de aplicação prática, experiência, julgamento e
        desempenho.
      </Note>
    </Body>
    <Foot n="31" />
  </Slide>
);

const S31QuemDefine = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Dúvida comum" title="Quem define os critérios de competência?" accent={C.yellow} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, alignContent: "stretch" }}>
        {([
          [Building2, C.blue, "1ª parte", "A própria organização, conforme processos, riscos, normas e objetivos internos."],
          [Handshake, C.green, "2ª parte", "O cliente da auditoria ou gestor do programa, considerando cadeia, contrato e criticidade."],
          [Award, C.red, "3ª parte", "O organismo de certificação, com ISO/IEC 17021-1, esquema, acreditação e escopo técnico."],
        ] as [React.ElementType, string, string, string][]).map(([Icon, col, t, d]) => (
          <div
            key={t}
            style={{
              background: C.white,
              border: `1px solid ${C.line}`,
              borderTop: `5px solid ${col}`,
              borderRadius: 16,
              padding: "30px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <span style={{ width: 52, height: 52, borderRadius: 13, background: `${col}1C`, display: "grid", placeItems: "center" }}>
              <Icon size={34} color={col} strokeWidth={2.2} />
            </span>
            <h3 style={{ fontSize: 35, fontWeight: 800, color: C.ink }}>{t}</h3>
            <p style={{ fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>{d}</p>
          </div>
        ))}
      </div>
      <Note color={C.blue} title="Síntese" icon={Compass}>
        A ISO 19011 estabelece diretrizes de competência; organizações e organismos podem exigir competências adicionais para
        normas, setores, riscos, tecnologia e métodos.
      </Note>
    </Body>
    <Foot n="32" />
  </Slide>
);

const S32Comportamentos = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="7.2.2 e 7.2.3" title="Comportamentos e habilidades do auditor" accent={C.green} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {([
            [Scale, C.blue, "Ética e imparcialidade"],
            [Compass, C.green, "Decisão e julgamento"],
            [Handshake, C.yellow, "Mente aberta e diplomacia"],
            [MessageSquare, C.red, "Comunicação e colaboração"],
            [Eye, C.blue, "Observação e percepção"],
            [Brain, C.green, "Aprendizado e tecnologia"],
          ] as [React.ElementType, string, string][]).map(([Icon, col, t]) => (
            <div
              key={t}
              style={{
                background: C.paper,
                border: `1px solid ${C.line}`,
                borderLeft: `5px solid ${col}`,
                borderRadius: 14,
                padding: "22px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span style={{ width: 46, height: 46, borderRadius: 12, background: `${col}1C`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon size={30} color={col} strokeWidth={2.2} />
              </span>
              <span style={{ fontSize: 26, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Note color={C.red} title="Avaliação prática" icon={AlertTriangle}>
            Um auditor tecnicamente forte pode comprometer a auditoria se não souber conduzir entrevistas, lidar com conflito ou
            reconhecer limites de competência.
          </Note>
          <Note color={C.blue} title="Métodos remotos" icon={MonitorSmartphone}>
            Somam paciência, domínio de ferramentas, atenção à privacidade, verificação de integridade de dados e reação a falhas
            tecnológicas.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="33" />
  </Slide>
);

const S33Avaliacao = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="7.3 a 7.5" title="Avaliação de auditores: critérios e métodos" accent={C.red} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <div style={{ display: "flex", alignItems: "stretch" }}>
          {([
            [C.blue, "Critérios", "Qualitativos e quantitativos, definidos antes."],
            [C.green, "Métodos", "Duas ou mais fontes de informação."],
            [C.yellow, "Comparação", "Confronto entre desempenho e critérios."],
            [C.red, "Decisão", "Aprovação, restrição ou plano de desenvolvimento."],
          ] as [string, string, string][]).map(([col, t, d], i, arr) => (
            <div key={t} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  borderTop: `5px solid ${col}`,
                  borderRadius: 14,
                  padding: "24px 22px",
                }}
              >
                <div style={{ fontSize: 31, fontWeight: 800, color: C.ink }}>{t}</div>
                <div style={{ marginTop: 10, fontSize: T.body, color: C.mute, lineHeight: 1.45 }}>{d}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 40, display: "grid", placeItems: "center" }}>
                  <ArrowRight size={28} color={C.ink} strokeWidth={2.4} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Card color={C.green} title="Métodos possíveis" icon={ClipboardList}>
            Análise de registros · feedback · entrevista · observação · testes · análise pós-auditoria.
          </Card>
          <Card color={C.blue} title="Para auditoria remota" icon={MonitorSmartphone}>
            Teste de plataforma, observação remota, revisão de gravações, simulação e avaliação de proteção de dados.
          </Card>
        </div>
      </div>
    </Body>
    <Foot n="34" />
  </Slide>
);

const S34Manutencao = () => (
  <Slide bg={C.white} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="7.6" title="Manutenção da competência" accent={C.green} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {([
            [C.blue, "Treinar"],
            [C.green, "Aplicar"],
            [C.yellow, "Avaliar"],
            [C.red, "Melhorar"],
          ] as [string, string][]).map(([col, t], i, arr) => (
            <div key={t} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  background: `${col}12`,
                  border: `1px solid ${col}55`,
                  borderRadius: 16,
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 38, fontWeight: 800, color: C.ink }}>{t}</div>
              </div>
              {i < arr.length - 1 ? (
                <div style={{ width: 52, display: "grid", placeItems: "center" }}>
                  <ArrowRight size={32} color={C.ink} strokeWidth={2.4} />
                </div>
              ) : (
                <div style={{ width: 52, display: "grid", placeItems: "center" }}>
                  <Repeat size={32} color={C.mute} strokeWidth={2.2} />
                </div>
              )}
            </div>
          ))}
        </div>

        <Note color={C.yellow} title="Evidências de manutenção" icon={ClipboardList}>
          Auditorias realizadas · testemunhas · análise de relatório · feedback · calibração técnica · estudo de revisões
          normativas.
        </Note>
      </div>
    </Body>
    <Foot n="35" />
  </Slide>
);

const S35Mensagens = () => (
  <Slide
    bg={C.ink}
    decor={
      <>
        <ColorBar />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(800px 500px at 85% 20%, rgba(247,195,37,.16), transparent 65%)",
          }}
        />
      </>
    }
  >
    <Body>
      <Head eyebrow="Mensagens finais" title="O que levar deste treinamento" dark />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignContent: "stretch" }}>
        {([
          [C.blue, "A norma orienta decisões", "A ISO 19011 orienta decisões de auditoria — não apenas documentação."],
          [C.green, "Risco atravessa tudo", "Risco deve influenciar programa, plano, método, amostra, trilha e relatório."],
          [C.yellow, "Remoto exige preparo", "Métodos remotos e híbridos exigem competência, segurança e avaliação de viabilidade."],
          [C.red, "Competência se comprova", "Competência precisa ser definida, demonstrada, avaliada e mantida."],
        ] as [string, string, string][]).map(([col, t, d]) => (
          <div
            key={t}
            style={{
              background: "rgba(255,255,255,.05)",
              border: `1px solid rgba(255,255,255,.12)`,
              borderLeft: `5px solid ${col}`,
              borderRadius: 14,
              padding: "26px 26px",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 800, color: C.white }}>{t}</div>
            <div style={{ marginTop: 10, fontSize: T.lead, color: "rgba(255,255,255,.72)", lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </div>
    </Body>
    <Foot n="36" dark />
  </Slide>
);

const S36Encerramento = () => (
  <Slide
    bg={C.inkDeep}
    decor={
      <>
        <ColorBar />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(760px 460px at 20% 20%, rgba(45,125,210,.22), transparent 65%), radial-gradient(700px 460px at 85% 90%, rgba(23,166,115,.18), transparent 65%)",
          }}
        />
        <div style={{ position: "absolute", right: 96, top: 150 }}>
          <ShieldOutline size={520} color={C.sand} opacity={0.2} strokeWidth={1.2} />
        </div>
        <div style={{ position: "absolute", right: 152, top: 216 }}>
          <Logo size={330} />
        </div>
        <div style={{ position: "absolute", right: 40, bottom: -50 }}>
          <WheatCrest size={220} color={C.sand} opacity={0.13} />
        </div>
      </>
    }
  >
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="flex items-center" style={{ gap: 16 }}>
        <Monogram size={40} />
        <span style={{ width: 74, height: 4, background: C.sand, borderRadius: 2 }} />
        <span style={{ width: 30, height: 4, background: "rgba(255,255,255,.3)", borderRadius: 2 }} />
      </div>
      <h2 style={{ marginTop: 26, fontSize: 74, fontWeight: 800, color: C.white, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 940 }}>
        Obrigada. <span style={{ color: C.sand }}>Vamos auditar com critério.</span>
      </h2>
      <p style={{ marginTop: 18, fontSize: 28, color: "rgba(255,255,255,.72)", maxWidth: 820, lineHeight: 1.4 }}>
        Dúvidas, aprofundamento e aplicação prática na sua organização.
      </p>

      <div style={{ marginTop: 42, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, maxWidth: 980 }}>
        {([
          [MapPin, C.blue, "Endereço", "Av. Fagundes Filho, 145 — Conj. 31/32, São Paulo/SP"],
          [Phone, C.green, "Telefone", "(11) 2771-8515 · (11) 2628-6095"],
          [Mail, C.yellow, "E-mail", "contato@qmsbrasil.com.br"],
          [Globe, C.red, "Site", "www.qmsbrasil.com.br"],
        ] as [React.ElementType, string, string, string][]).map(([Icon, col, t, d]) => (
          <div
            key={t}
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
              borderTop: `4px solid ${col}`,
              borderRadius: 14,
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Icon size={30} color={col} strokeWidth={2.2} />
            <div style={{ fontSize: T.label, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
              {t}
            </div>
            <div style={{ fontSize: T.body, color: C.white, lineHeight: 1.35 }}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 4, height: 52, background: C.yellow, borderRadius: 2 }} />
        <div>
          <div style={{ fontSize: 31, fontWeight: 800, color: C.white }}>Anne Dezan</div>
          <div style={{ fontSize: T.small, color: "rgba(255,255,255,.6)", marginTop: 2 }}>
            Auditora Líder · Consultora em sistemas de gestão
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ============================================================
   Página
   ============================================================ */
const Iso19011 = () => {
  const printMode = usePrintMode();
  return (
    <main
      style={{
        background: C.inkDeep,
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
        html,body,#root{margin:0;padding:0;background:${C.inkDeep}}
        ${printMode ? "" : "html{scroll-snap-type:y proximity}"}
        *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        @page{size:1600px 900px landscape;margin:0}
        @media print{
          html,body,#root{background:#fff}
          .no-print{display:none !important}
          .slide-frame{box-shadow:none !important;border-radius:0 !important;break-after:page;page-break-after:always}
          .slide-frame *{backdrop-filter:none !important;-webkit-backdrop-filter:none !important;mix-blend-mode:normal !important}
        }
      `}</style>
      <Helmet>
        <title>Fundamentos da ISO 19011:2026 | Treinamento com Anne Dezan</title>
        <meta
          name="description"
          content="Treinamento Fundamentos da ISO 19011:2026 com Anne Dezan: princípios, gestão do programa, condução da auditoria, métodos remotos e competência de auditores."
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

      <S00Capa />
      <S01Organizacao />
      <S02Objetivos />
      <S03Modulo1 />
      <S04Contexto />
      <S05Conceitos />
      <S06Principios />
      <S07PrincipioDecisao />
      <S08Ex1 />
      <S09Modulo2 />
      <S10PDCA />
      <S11Objetivos />
      <S12Riscos />
      <S13Decisoes />
      <S14Implementacao />
      <S15Metodos />
      <S16Remoto />
      <S17Monitorar />
      <S18Ex2 />
      <S19Modulo3 />
      <S20Ciclo />
      <S21Iniciacao />
      <S22Plano />
      <S23Trilha />
      <S24Conducao />
      <S25Triangulacao />
      <S26Constatacao />
      <S27Relatorio />
      <S28Ex3 />
      <S29Modulo4 />
      <S30Camadas />
      <S31QuemDefine />
      <S32Comportamentos />
      <S33Avaliacao />
      <S34Manutencao />
      <S35Mensagens />
      <S36Encerramento />
    </main>
  );
};

export default Iso19011;
