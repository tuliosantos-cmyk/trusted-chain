import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck,
  FlaskConical,
  FileSearch,
  AlertTriangle,
  Target,
  Layers,
  Users,
  Building2,
  ClipboardList,
  Repeat,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calendar,
  Bug,
  Trash2,
  Wrench,
  Truck,
  Droplets,
  SprayCan,
  HandHeart,
  Tag,
  Boxes,
  Recycle,
  Thermometer,
  BookOpen,
  Award,
  Globe,
  Leaf,
  Scale,
  Sparkles,
  Lock,
  Info,
} from "lucide-react";

/* ============================================================
   CANVAS FIXO 1600 x 900 — tudo em px reais, escalado por transform
   ============================================================ */
const CANVAS_W = 1600;
const CANVAS_H = 900;
const PAD = 64;

const T = {
  hero: 80,
  title: 54,
  subtitle: 36,
  lead: 26,
  body: 21,
  small: 18,
  label: 16,
} as const;

/* Identidade visual — Food Solution Consultoria e Treinamento
   Verde profundo (indústria de alimentos) + verde folha da marca,
   âmbar como sinalização e azul técnico como apoio. */
const C = {
  ink: "#0B3B2E",
  inkDeep: "#062419",
  green: "#12805C",
  greenSoft: "#D7F0E4",
  leaf: "#7DB63A",
  leafSoft: "#EBF5DC",
  blue: "#2C6E8F",
  blueSoft: "#E6EEF3",
  yellow: "#D98A06",
  yellowSoft: "#FCEFD5",
  red: "#A2453A",
  redSoft: "#F5E7E4",
  paper: "#F7F6F1",
  white: "#FFFFFF",
  line: "#E2DFD5",
  text: "#0B3B2E",
  mute: "#6B7A72",
  sand: "#E9A93C",
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

const ColorBar = ({ vertical = false }: { vertical?: boolean }) => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      ...(vertical ? { left: 0, top: 0, bottom: 0, width: 10 } : { left: 0, right: 0, top: 0, height: 10 }),
    }}
  >
    {[
      { c: C.green, f: 5 },
      { c: C.leaf, f: 2 },
      { c: C.yellow, f: 1 },
    ].map(({ c, f }) => (
      <div key={c} style={{ flex: f, background: c }} />
    ))}
  </div>
);

/* ============================================================
   Elementos de marca — escudo + espigas + monograma AD (Anne Dezan)
   ============================================================ */
const HexOutline = ({
  size = 520,
  color = C.sand,
  opacity = 0.18,
  strokeWidth = 1.5,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) => (
  <svg viewBox="0 0 100 112" width={size * (100 / 112)} height={size} style={{ opacity, display: "block" }} aria-hidden>
    <path
      d="M50 3 C68 12 82 15 96 16 V58 C96 86 76 102 50 109 C24 102 4 86 4 58 V16 C18 15 32 12 50 3 Z"
      fill="none"
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

/* Espiga da marca */
const Wheat = ({ size = 120, color = C.sand, opacity = 1, flip = false }: { size?: number; color?: string; opacity?: number; flip?: boolean }) => (
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

const WheatCrest = ({ size = 200, color = C.sand, opacity = 0.16 }: { size?: number; color?: string; opacity?: number }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.12, opacity }}>
    <Wheat size={size} color={color} />
    <Wheat size={size} color={color} flip />
  </div>
);

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

const BrandDecor = ({ accent = C.sand }: { accent?: string }) => (
  <>
    <ColorBar />
    <div style={{ position: "absolute", right: 60, top: 100 }}>
      <HexOutline size={620} color={accent} opacity={0.16} strokeWidth={1.4} />
    </div>
    <div
      style={{
        position: "absolute",
        right: 218,
        top: 350,
        color: "rgba(255,255,255,.07)",
        fontSize: 175,
        fontWeight: 700,
        fontFamily: "Georgia, 'Times New Roman', serif",
        lineHeight: 1,
      }}
    >
      AD
    </div>
    <div style={{ position: "absolute", right: 130, bottom: -30 }}>
      <WheatCrest size={220} color={accent} opacity={0.26} />
    </div>
  </>
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
  accent = C.green,
  dark = false,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: string;
  dark?: boolean;
  sub?: string;
}) => (
  <div style={{ marginBottom: 22 }}>
    <Eyebrow label={eyebrow} color={dark ? C.sand : accent} />
    <h2
      style={{
        marginTop: 12,
        fontSize: T.title,
        lineHeight: 1.08,
        letterSpacing: "-0.02em",
        fontWeight: 800,
        color: dark ? C.white : C.ink,
        maxWidth: 1300,
      }}
    >
      {title}
    </h2>
    {sub && (
      <p style={{ marginTop: 10, fontSize: T.lead, lineHeight: 1.4, color: dark ? "rgba(255,255,255,.72)" : C.mute, maxWidth: 1150 }}>
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
      bottom: 24,
      fontSize: T.label,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,.45)" : C.mute,
      fontWeight: 600,
    }}
  >
    <span>Atualização FSSC 22000 · Versão 7 · Food Solution</span>
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 26, height: 3, background: dark ? C.sand : C.green, borderRadius: 2 }} />
      {n}
    </span>
  </div>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 flex flex-col" style={{ paddingBottom: 42, gap: 18 }}>
    {children}
  </div>
);

const Card = ({
  color = C.green,
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
      padding: compact ? "18px 22px" : "24px 28px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
      minWidth: 0,
    }}
  >
    {(Icon || title) && (
      <div className="flex items-center" style={{ gap: 12 }}>
        {Icon && (
          <span
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: `${color}1A`,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={26} color={color} strokeWidth={2.2} />
          </span>
        )}
        {title && (
          <h3 style={{ fontSize: 25, fontWeight: 800, color: C.ink, lineHeight: 1.15, letterSpacing: "-0.01em" }}>{title}</h3>
        )}
      </div>
    )}
    {children && <div style={{ fontSize: T.body, lineHeight: 1.45, color: C.mute }}>{children}</div>}
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
      padding: "20px 24px",
    }}
  >
    <Icon size={28} color={color} strokeWidth={2.2} style={{ flexShrink: 0, marginTop: 2 }} />
    <div>
      <div
        style={{
          fontSize: T.small,
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: dark ? C.white : C.ink,
        }}
      >
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
    <CheckCircle2 size={26} color={color} strokeWidth={2.4} style={{ flexShrink: 0, marginTop: 2 }} />
    <span style={{ fontSize: T.lead, lineHeight: 1.38, color: C.text }}>{children}</span>
  </li>
);

/* Tabela editorial */
const Table = ({
  head,
  rows,
  widths,
  fontSize = 19,
  accent = C.green,
  dense = false,
}: {
  head: string[];
  rows: React.ReactNode[][];
  widths?: string[];
  fontSize?: number;
  accent?: string;
  dense?: boolean;
}) => (
  <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden", background: C.white }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: widths ? widths.join(" ") : `repeat(${head.length}, 1fr)`,
        background: accent,
      }}
    >
      {head.map((h, i) => (
        <div
          key={i}
          style={{
            padding: dense ? "8px 14px" : "12px 16px",
            color: C.white,
            fontSize: T.label,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {h}
        </div>
      ))}
    </div>
    {rows.map((r, ri) => (
      <div
        key={ri}
        style={{
          display: "grid",
          gridTemplateColumns: widths ? widths.join(" ") : `repeat(${head.length}, 1fr)`,
          borderTop: `1px solid ${C.line}`,
          background: ri % 2 ? C.paper : C.white,
        }}
      >
        {r.map((cell, ci) => (
          <div key={ci} style={{ padding: dense ? "6.5px 14px" : "11px 16px", fontSize, lineHeight: 1.25, color: ci === 0 ? C.ink : C.text, fontWeight: ci === 0 ? 700 : 400 }}>
            {cell}
          </div>
        ))}
      </div>
    ))}
  </div>
);

/* Divisor de módulo */
const Divider = ({
  n,
  modulo,
  title,
  sub,
  items,
  accent = C.sand,
}: {
  n: string;
  modulo: string;
  title: string;
  sub: string;
  items: [string, string][];
  accent?: string;
}) => (
  <Slide bg={C.ink} decor={<BrandDecor accent={accent} />}>
    <Body>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1220 }}>
        <Eyebrow label={modulo} color={accent} />
        <h2 style={{ marginTop: 16, fontSize: 70, fontWeight: 800, color: C.white, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
          {title}
        </h2>
        <p style={{ marginTop: 16, fontSize: 27, color: "rgba(255,255,255,.72)", maxWidth: 900, lineHeight: 1.4 }}>{sub}</p>

        <div style={{ marginTop: 42, display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 18 }}>
          {items.map(([k, v], i) => {
            const cols = [C.leaf, C.blue, C.yellow, C.greenSoft];
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
                <div style={{ fontSize: 24, fontWeight: 800, color: cols[i % 4] }}>{k}</div>
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

/* Slide de cláusula de PPR: título da seção + índice + destaques */
const Clause = ({
  n,
  numero,
  titulo,
  icon,
  indice,
  destaques,
  nota,
  fonte,
}: {
  n: string;
  numero: string;
  titulo: string;
  icon: React.ElementType;
  indice: string[];
  destaques: [string, string][];
  nota?: string;
  fonte?: string;
}) => {
  const Icon = icon;
  return (
    <Slide bg={C.paper} decor={<ColorBar vertical />}>
      <Body>
        <div className="flex items-start" style={{ gap: 20, marginBottom: 18 }}>
          <span
            style={{
              width: 74,
              height: 74,
              borderRadius: 18,
              background: `${C.green}14`,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={40} color={C.green} strokeWidth={2.1} />
          </span>
          <div>
            <Eyebrow label={`ISO 22002-100:2025 · Cláusula ${numero}`} color={C.blue} />
            <h2 style={{ marginTop: 10, fontSize: 46, fontWeight: 800, color: C.ink, lineHeight: 1.06, letterSpacing: "-0.02em", maxWidth: 1250 }}>
              {titulo}
            </h2>
          </div>
        </div>

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "330px 1fr", gap: 24 }}>
          <div
            style={{
              background: C.white,
              border: `1px solid ${C.line}`,
              borderTop: `4px solid ${C.leaf}`,
              borderRadius: 14,
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: T.label, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: C.mute }}>
              Estrutura da cláusula
            </div>
            {indice.map((i) => (
              <div key={i} className="flex items-start" style={{ gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: C.leaf, marginTop: 9, flexShrink: 0 }} />
                <span style={{ fontSize: T.body, lineHeight: 1.35, color: C.text }}>{i}</span>
              </div>
            ))}
            {fonte && (
              <div style={{ marginTop: "auto", fontSize: T.small, color: C.mute, lineHeight: 1.35 }}>
                <strong style={{ color: C.green }}>*** </strong>
                {fonte}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {destaques.map(([t, d], i) => (
              <div
                key={t}
                style={{
                  flex: 1,
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  borderLeft: `5px solid ${[C.green, C.blue, C.yellow][i % 3]}`,
                  borderRadius: 12,
                  padding: "18px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <div style={{ fontSize: 23, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>{t}</div>
                <div style={{ fontSize: T.body, lineHeight: 1.42, color: C.mute }}>{d}</div>
              </div>
            ))}
            {nota && (
              <Note color={C.yellow} title="Atenção" icon={AlertTriangle}>
                {nota}
              </Note>
            )}
          </div>
        </div>
      </Body>
      <Foot n={n} />
    </Slide>
  );
};

/* ============================================================
   Slides
   ============================================================ */

const S00Capa = () => (
  <Slide bg={C.inkDeep} decor={<BrandDecor accent={C.sand} />}>
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
        Treinamento · Segurança de alimentos
      </div>
      <h1 style={{ marginTop: 20, fontSize: 96, lineHeight: 0.98, fontWeight: 800, letterSpacing: "-0.035em", color: C.white }}>
        Atualização
        <br />
        <span style={{ color: C.sand }}>FSSC 22000</span>
        <span style={{ color: "rgba(255,255,255,.45)" }}> v7</span>
      </h1>
      <p style={{ marginTop: 22, fontSize: 31, color: "rgba(255,255,255,.78)", maxWidth: 800, lineHeight: 1.35 }}>
        O que muda com a nova série ISO 22002-X e os Requisitos Adicionais v7. Publicação: maio/2026.
      </p>

      <div style={{ marginTop: 46, display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ width: 3, height: 66, background: C.sand, borderRadius: 2 }} />
        <div>
          <div style={{ fontSize: 36, fontWeight: 800, color: C.white, letterSpacing: "-0.01em" }}>Lívia L. Rodrigues</div>
          <div style={{ fontSize: T.body, color: "rgba(255,255,255,.65)", marginTop: 4 }}>
            Food Solution · Consultoria e Treinamento · Auditora Líder FSSC 22000
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const S01Quem = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Quem sou eu" title="Lívia L. Rodrigues — muito prazer!" sub="Mais de 13 anos dedicados à indústria de alimentos." />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "1fr 1fr", gap: 20 }}>
        <Card color={C.green} title="Engenheira de Alimentos" icon={Award}>
          Formada pela Universidade Federal de Goiás (UFG).
        </Card>
        <Card color={C.blue} title="Auditora Líder" icon={ShieldCheck}>
          Auditora Líder FSSC 22000, atuando em toda a cadeia de alimentos.
        </Card>
        <Card color={C.yellow} title="Professora de MBA" icon={BookOpen}>
          Docente acadêmica em programas de MBA do IPOG.
        </Card>
        <Card color={C.leaf} title="Especialista" icon={FlaskConical}>
          Controle de Qualidade e Gerenciamento da Produção de Alimentos — UFG.
        </Card>
        <Card color={C.green} title="Propósito" icon={HandHeart}>
          Deus em primeiro lugar na minha vida e na da minha família.
        </Card>
        <Card color={C.blue} title="#FoodSafetyLover" icon={Sparkles} tint={C.greenSoft}>
          Segurança de alimentos é cultura — e cultura se constrói com gente.
        </Card>
      </div>
    </Body>
    <Foot n="01" />
  </Slide>
);

const S02Conteudo = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Conteúdo geral" title="O caminho do treinamento" sub="Do contexto do esquema até cláusula por cláusula da nova série de PPRs." />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {[
          ["01", "Contexto FSSC 22000", "Esquema, estrutura atual, BoS e transição.", C.green, Globe],
          ["02", "Fatores da versão 7", "Por que a v7 existe e o que ela persegue.", C.blue, Target],
          ["03", "Programas de pré-requisitos", "ISO 22002-100 e ISO 22002-1:2025.", C.yellow, Layers],
          ["04", "Requisitos Adicionais v7", "2.5.1 a 2.5.18 — o que mudou.", C.leaf, ClipboardList],
        ].map(([k, t, d, col, Ico]) => {
          const Icon = Ico as React.ElementType;
          return (
            <div
              key={k as string}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderTop: `4px solid ${col as string}`,
                borderRadius: 14,
                padding: "28px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                justifyContent: "center",
              }}
            >
              <Icon size={44} color={col as string} strokeWidth={2} />
              <div style={{ fontSize: 44, fontWeight: 800, color: `${col as string}`, lineHeight: 1 }}>{k as string}</div>
              <div style={{ fontSize: 27, fontWeight: 800, color: C.ink, lineHeight: 1.15 }}>{t as string}</div>
              <div style={{ fontSize: T.body, lineHeight: 1.4, color: C.mute }}>{d as string}</div>
            </div>
          );
        })}
      </div>
    </Body>
    <Foot n="02" />
  </Slide>
);

const S03Mod1 = () => (
  <Divider
    n="03"
    modulo="Módulo 1"
    title="Contexto do FSSC 22000"
    sub="O que é o esquema, como ele está estruturado e quem decide sobre ele."
    items={[
      ["Esquema", "Requisitos para auditoria e certificação de SGSA."],
      ["Estrutura", "ISO 22000 + PPRs + Requisitos Adicionais."],
      ["BoS", "Conselho das Partes Interessadas e suas decisões."],
      ["Transição", "Publicação maio/2026 · auditorias maio/2027."],
    ]}
  />
);

const S04Contexto = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Contexto" title="O que é o esquema FSSC 22000" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 26, alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card color={C.green} title="Definição" icon={BookOpen}>
            O esquema de certificação FSSC 22000 descreve os requisitos para a <strong>auditoria e certificação</strong> dos Sistemas de
            Gestão de Segurança de Alimentos (SGSA) das organizações na cadeia de abastecimento de alimentos.
          </Card>
          <Card color={C.blue} title="O que o certificado atesta" icon={ShieldCheck}>
            Confirma que o sistema de gestão da organização está em <strong>conformidade com os requisitos do Esquema</strong> — não
            apenas com a norma isolada.
          </Card>
          <Note color={C.yellow} title="Reconhecimento" icon={Globe}>
            Esquema reconhecido pela GFSI — a v7 se alinha aos requisitos de benchmarking GFSI 2024.
          </Note>
        </div>

        <div
          style={{
            background: C.ink,
            borderRadius: 18,
            padding: 34,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div style={{ fontSize: T.label, letterSpacing: "0.24em", textTransform: "uppercase", color: C.sand, fontWeight: 800 }}>
            Estrutura atual
          </div>
          {[
            ["ISO 22000:2018", "Sistema de gestão de segurança de alimentos", C.leaf],
            ["ISO 22002-X", "Programas de pré-requisitos (PPRs)", C.sand],
            ["Requisitos Adicionais", "Esquema FSSC · v7 + BoS + artigos de interpretação", C.white],
          ].map(([t, d, col], i) => (
            <div key={t as string}>
              <div
                style={{
                  background: "rgba(255,255,255,.06)",
                  borderLeft: `5px solid ${col as string}`,
                  borderRadius: 12,
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 800, color: col as string }}>{t as string}</div>
                <div style={{ fontSize: T.body, color: "rgba(255,255,255,.72)", marginTop: 4, lineHeight: 1.35 }}>{d as string}</div>
              </div>
              {i < 2 && (
                <div style={{ display: "grid", placeItems: "center", height: 22 }}>
                  <span style={{ color: "rgba(255,255,255,.35)", fontSize: 22 }}>+</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Body>
    <Foot n="04" />
  </Slide>
);

const S05Bos = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head
        eyebrow="Board of Stakeholders"
        title="Conselho das Partes Interessadas (BoS)"
        sub="Quem aprova o conteúdo do esquema e publica decisões de aplicação obrigatória."
      />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr 1fr", gap: 20 }}>
        <Card color={C.green} title="Composição" icon={Users}>
          Formado por representantes dos setores da cadeia de alimentos.
        </Card>
        <Card color={C.blue} title="Responsabilidade" icon={ShieldCheck}>
          Aprova o conteúdo e o funcionamento do esquema FSSC 22000.
        </Card>
        <Card color={C.yellow} title="Lista de decisões" icon={ClipboardList}>
          Documento que reúne decisões aplicáveis ao esquema — anulam ou clarificam regras existentes e devem ser aplicadas no
          período definido.
        </Card>
        <Card color={C.leaf} title="Natureza dinâmica" icon={Repeat}>
          A lista pode ser ajustada pelo BoS sempre que considerado necessário — acompanhar é parte da manutenção da certificação.
        </Card>
      </div>
    </Body>
    <Foot n="05" />
  </Slide>
);

const S06BosTabela = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="BoS v7.0 · Maio 2026" title="Decisão #1 — Processo de upgrade para a Versão 7" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
        <Table
          head={["Nº", "Referência", "Descrição", "Natureza", "Decisão", "Vigência", "Transição"]}
          widths={["70px", "1.1fr", "2.2fr", "0.8fr", "0.8fr", "0.8fr", "0.8fr"]}
          rows={[
            [
              "#1",
              "Requisitos para o processo de upgrade da Versão 7",
              "Define os requisitos para OCs e OAs quanto ao processo de transição, incluindo como migrar as organizações da Versão 6 para a Versão 7.",
              "Obrigatória",
              "12 nov 2025",
              "01 mai 2027",
              "12 meses",
            ],
          ]}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, flex: 1 }}>
          <Card color={C.green} title="Quem executa" icon={Building2} compact>
            Organismos de Certificação e de Acreditação conduzem o processo de upgrade.
          </Card>
          <Card color={C.blue} title="Quem se prepara" icon={ClipboardList} compact>
            A organização certificada — diagnóstico de gap, plano e evidências antes da auditoria.
          </Card>
          <Card color={C.yellow} title="Janela" icon={Calendar} compact>
            12 meses de transição a partir de 01/05/2027.
          </Card>
        </div>
      </div>
    </Body>
    <Foot n="06" />
  </Slide>
);

const S07V6V7 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Comparativo" title="O que compõe a certificação: V6 → V7" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 90px 1fr", gap: 16, alignItems: "center" }}>
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.line}`,
            borderTop: `4px solid ${C.mute}`,
            borderRadius: 16,
            padding: "30px 32px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: T.label, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mute, fontWeight: 800 }}>
            Antes · Versão 6
          </div>
          {["ISO 22000:2018", "ISO/TS 22002-1", "Requisitos Adicionais v6"].map((t) => (
            <div key={t} style={{ background: C.paper, borderRadius: 12, padding: "18px 22px", fontSize: 28, fontWeight: 700, color: C.mute }}>
              {t}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", placeItems: "center" }}>
          <span style={{ width: 62, height: 62, borderRadius: 31, background: C.green, display: "grid", placeItems: "center" }}>
            <ArrowRight size={32} color={C.white} strokeWidth={2.6} />
          </span>
        </div>

        <div
          style={{
            background: C.ink,
            borderRadius: 16,
            padding: "30px 32px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: T.label, letterSpacing: "0.2em", textTransform: "uppercase", color: C.sand, fontWeight: 800 }}>
            Agora · Versão 7
          </div>
          {[
            ["ISO 22000:2018", "mantida"],
            ["ISO 22002-100:2025", "PPR comum a todas as categorias"],
            ["ISO 22002-1:2025", "PPR setorial conforme a categoria"],
            ["Requisitos Adicionais v7", "com decisões do BoS incorporadas"],
          ].map(([t, d]) => (
            <div key={t} style={{ background: "rgba(255,255,255,.07)", borderRadius: 12, padding: "16px 22px" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.white }}>{t}</div>
              <div style={{ fontSize: T.small, color: "rgba(255,255,255,.65)", marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </Body>
    <Foot n="07" />
  </Slide>
);

const S08PorQue = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Motivos" title="Por que o esquema foi alterado?" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "1fr 1fr", gap: 20 }}>
        <Card color={C.green} title="Nova série ISO 22002-X" icon={Layers}>
          Incorporação da nova série de normas para programas de pré-requisitos.
        </Card>
        <Card color={C.blue} title="Benchmarking GFSI 2024" icon={Award}>
          Alinhamento do esquema aos requisitos de benchmarking da GFSI.
        </Card>
        <Card color={C.yellow} title="Categorias mais claras" icon={Boxes}>
          Estrutura mais definida para a divisão das (sub)categorias da cadeia de alimentos.
        </Card>
        <Card color={C.leaf} title="Agenda ODS" icon={Leaf}>
          Fortalecimento de requisitos que apoiam a contribuição das organizações aos Objetivos de Desenvolvimento Sustentável.
        </Card>
        <Card color={C.green} title="Melhoria contínua" icon={Repeat}>
          Alterações editoriais e modificações decorrentes da melhoria contínua do esquema.
        </Card>
        <div
          style={{
            background: C.ink,
            borderRadius: 14,
            padding: "26px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Target size={38} color={C.sand} strokeWidth={2} />
          <div style={{ fontSize: 25, fontWeight: 800, color: C.white, lineHeight: 1.2 }}>Leitura de fundo</div>
          <div style={{ fontSize: T.body, color: "rgba(255,255,255,.72)", lineHeight: 1.4 }}>
            Menos duplicidade entre esquema e PPR, expectativas de auditoria mais claras e sustentabilidade dentro do sistema de
            gestão.
          </div>
        </div>
      </div>
    </Body>
    <Foot n="08" />
  </Slide>
);

const S09Transicao = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Transição" title="A linha do tempo que organiza o seu plano" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34 }}>
        <div style={{ position: "relative", padding: "0 40px" }}>
          <div style={{ position: "absolute", left: 40, right: 40, top: 46, height: 6, background: C.line, borderRadius: 3 }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              ["Maio 2026", "Publicação da Versão 7", C.green],
              ["Até 30 abr 2027", "Últimas auditorias na Versão 6", C.yellow],
              ["Mai 2027 → abr 2028", "Auditorias de upgrade na Versão 7", C.blue],
            ].map(([t, d, col]) => (
              <div key={t as string} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    background: col as string,
                    border: `6px solid ${C.paper}`,
                    marginTop: 32,
                  }}
                />
                <div style={{ fontSize: 30, fontWeight: 800, color: col as string }}>{t as string}</div>
                <div style={{ fontSize: T.lead, color: C.mute, lineHeight: 1.35, maxWidth: 340 }}>{d as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Note color={C.red} title="Prazo duro" icon={AlertTriangle}>
            Auditorias FSSC 22000 Versão 6 só poderão ser realizadas <strong>até 30 de abril de 2027</strong>.
          </Note>
          <Note color={C.green} title="Janela de upgrade" icon={CheckCircle2}>
            Auditorias de upgrade contra a Versão 7 devem ocorrer de <strong>1º de maio de 2027 a 30 de abril de 2028</strong>.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="09" />
  </Slide>
);

const S10Mod2 = () => (
  <Divider
    n="10"
    modulo="Módulo 2"
    title="Requisitos Adicionais v7"
    sub="Cinco partes, dois apêndices e cinco anexos — e o que efetivamente mudou para a organização auditada."
    items={[
      ["Parte 1", "Visão geral do esquema."],
      ["Parte 2", "Requisitos para as organizações."],
      ["Parte 3", "Processo de certificação."],
      ["Partes 4 e 5", "Organismos de certificação e de acreditação."],
    ]}
  />
);

const S11Estrutura = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Documento do esquema" title="Como os Requisitos Adicionais estão organizados" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {[
          ["Parte 1", "Visão geral do esquema", C.green],
          ["Parte 2", "Requisitos para as organizações a serem auditadas", C.blue],
          ["Parte 3", "Requisitos para o processo de certificação", C.yellow],
          ["Parte 4", "Requisitos para os organismos de certificação", C.leaf],
          ["Parte 5", "Requisitos para os organismos de acreditação", C.mute],
        ].map(([t, d, col]) => (
          <div
            key={t as string}
            style={{
              background: C.white,
              border: `1px solid ${C.line}`,
              borderTop: `4px solid ${col as string}`,
              borderRadius: 14,
              padding: "26px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 800, color: col as string }}>{t as string}</div>
            <div style={{ fontSize: 23, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>{d as string}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card color={C.green} title="Apêndice 1 — Definições" icon={BookOpen} compact />
        <Card color={C.blue} title="Apêndice 2 — Referências normativas" icon={FileSearch} compact />
      </div>
    </Body>
    <Foot n="11" />
  </Slide>
);

const S12Parte1 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Parte 1" title="Visão geral — o que ficou e o que mudou" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 24 }}>
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.line}`,
            borderTop: `4px solid ${C.mute}`,
            borderRadius: 16,
            padding: "28px 30px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: T.label, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mute, fontWeight: 800 }}>
            Sem alterações
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Bullet color={C.mute}>Estrutura do esquema: 5 partes, 2 apêndices e 5 anexos.</Bullet>
            <Bullet color={C.mute}>Âmbito, cobertura e escopo do esquema.</Bullet>
          </ul>
        </div>

        <div
          style={{
            background: C.white,
            border: `1px solid ${C.line}`,
            borderTop: `4px solid ${C.green}`,
            borderRadius: 16,
            padding: "28px 30px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: T.label, letterSpacing: "0.2em", textTransform: "uppercase", color: C.green, fontWeight: 800 }}>
            Alterações
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Bullet>
              Inclusão da série <strong>ISO 22002-X</strong> como documentos normativos, substituindo a série ISO/TS 22002-X e a PAS
              221 (varejo).
            </Bullet>
            <Bullet>
              Adição da <strong>Tabela 1.1 — Classificação de sub(sub)categorias</strong>, ligada à competência dos auditores por
              produto/escopo.
            </Bullet>
            <Bullet>Alterações editoriais, esclarecimentos e emendas de melhoria contínua.</Bullet>
          </ul>
        </div>
      </div>
    </Body>
    <Foot n="12" />
  </Slide>
);

const S13Tabela11 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Tabela 1.1" title="Classificação de sub(sub)categorias" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Table
          fontSize={17}
          widths={["90px", "1fr"]}
          head={["Cat.", "Sub(sub)categoria"]}
          rows={[
            ["C0-1", "Bovinos, ovinos e caprinos, suínos, aves e caça"],
            ["C0-2", "Peixes, moluscos e crustáceos"],
            ["CI-1", "Carne vermelha e branca"],
            ["CI-2", "Peixes, moluscos e crustáceos"],
            ["CI-3", "Laticínios"],
            ["CI-4", "Ovos e derivados"],
            ["CIV-1", "Processados térmicos e/ou sob pressão (UHT, conservas, autoclave, HPP)"],
            ["CIV-2", "Alimentos secos e ingredientes (açúcar, sal, especiarias, farinha)"],
          ]}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Table
            fontSize={17}
            widths={["90px", "1fr"]}
            head={["Cat.", "Sub(sub)categoria"]}
            rows={[
              ["CIV-3", "Conservados/autopreservados (alta acidez, baixa Aw, alto brix, conservantes)"],
              ["CIV-4", "Extrusados, panificação e confeitaria"],
              ["CIV-5", "Gorduras e óleos vegetais ou animais"],
              ["CIV-6", "Bebidas, incluindo alcoólicas"],
              ["I-1 a I-5", "Plásticos, papel e cartão, metal, vidro e outros (madeira, tinta, etc.)"],
              ["K-1", "Auxiliares, aditivos, corantes, aromas, gases, vitaminas, suplementos"],
              ["K-2", "Bioculturas e enzimas"],
            ]}
          />
          <Note color={C.yellow} title="Observação" icon={Info}>
            Não existem sub(sub)categorias para <strong>BIII, CII, CIII, D, E, FI, FII e G</strong>.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="13" />
  </Slide>
);

const S14Parte2Lista = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head
        eyebrow="Parte 2 · Requisitos Adicionais v7"
        title="Os 18 requisitos — referências atualizadas para a série ISO 22002-X"
      />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignContent: "start" }}>
        {[
          ["2.5.1", "Gestão de serviços e materiais comprados", true],
          ["2.5.2", "Rotulagem de produtos e materiais impressos", true],
          ["2.5.3", "Defesa de alimentos", true],
          ["2.5.4", "Mitigação de fraude de alimentos", true],
          ["2.5.5", "Uso de logotipo", false],
          ["2.5.6", "Gestão de alérgenos", true],
          ["2.5.7", "Monitoramento ambiental", false],
          ["2.5.8", "Cultura de segurança de alimentos e qualidade", true],
          ["2.5.9", "Controle de qualidade", false],
          ["2.5.10", "Transporte, armazenamento e estocagem", false],
          ["2.5.11", "Controle de perigos e contaminação cruzada", false],
          ["2.5.12", "Verificação do PPR (agora também E e FI)", true],
          ["2.5.13", "Design e desenvolvimento de produto", true],
          ["2.5.14", "Rastreabilidade (rastreabilidade de abate — C0)", true],
          ["2.5.15", "Gestão de equipamentos", false],
          ["2.5.16", "Perda e desperdício de alimentos", true],
          ["2.5.17", "Requisitos de comunicação", false],
          ["2.5.18", "Certificação multissite (inclui BIII)", true],
        ].map(([k, t, hot]) => (
          <div
            key={k as string}
            style={{
              background: hot ? C.white : "transparent",
              border: `1px solid ${hot ? C.line : "transparent"}`,
              borderLeft: `4px solid ${hot ? C.green : C.line}`,
              borderRadius: 10,
              padding: "12px 16px",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 800, color: hot ? C.green : C.mute, minWidth: 62 }}>{k as string}</span>
            <span style={{ fontSize: 19, lineHeight: 1.25, color: hot ? C.ink : C.mute, fontWeight: hot ? 700 : 400 }}>
              {t as string}
            </span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: T.small, color: C.mute, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 16, height: 4, background: C.green, borderRadius: 2 }} /> destacados = itens com alteração relevante
        na v7
      </div>
    </Body>
    <Foot n="14" />
  </Slide>
);

const S15Req251 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Requisito 2.5.1" title="Gestão de serviços e materiais comprados" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.green} title="a) Análise laboratorial" icon={FlaskConical}>
            Além da cláusula 7.1.6 da ISO 22000:2018, quando análises forem usadas para verificar/validar{" "}
            <strong>parâmetros críticos de segurança de alimentos</strong>, elas devem ser realizadas por laboratório competente —
            interno ou externo.
          </Card>
          <Note color={C.blue} title="Competência do laboratório" icon={Award}>
            Resultados precisos e reprodutíveis, métodos validados e boas práticas (proficiência, programas regulamentares ou
            acreditação ISO/IEC 17025). Análises conforme os requisitos aplicáveis da ISO/IEC 17025.
          </Note>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.yellow} title="d) Especificações" icon={ClipboardList}>
            Para BIII, C, D, I, FII, G e K: estabelecer, implementar e manter um <strong>processo de análise de especificações</strong>{" "}
            de produto acabado e matéria-prima, assegurando cumprimento contínuo de requisitos de segurança, qualidade, legais e do
            cliente.
          </Card>
          <Note color={C.red} title="Requisito específico GFSI" icon={Scale}>
            Especificações microbiológicas, físicas, químicas e alergênicas usadas para segurança de alimentos devem basear-se em
            princípios científicos adequados sempre que não houver legislação pertinente.
          </Note>
          <Note color={C.green} title="Origem da mudança" icon={Info}>
            Inclusão das decisões do BoS da v6 dentro do texto do esquema.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="15" />
  </Slide>
);

const S16Req252 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head
        eyebrow="Requisito 2.5.2"
        title="Rotulagem de produtos e materiais impressos"
        sub="Aplicável a todas as organizações que imprimem etiquetas e/ou materiais — não apenas à Categoria I."
      />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "1fr 1fr", gap: 18 }}>
        {[
          ["i", "Aprovação do padrão de arte ou amostra mestre", Tag],
          ["ii", "Gestão de alterações de arte e de materiais obsoletos", Repeat],
          ["iii", "Aprovação de cada tiragem contra o padrão acordado", CheckCircle2],
          ["iv", "Detecção e identificação de erros durante a execução", FileSearch],
          ["v", "Segregação efetiva de diferentes variantes de impressão", Layers],
          ["vi", "Prestação de contas de todo material impresso não utilizado", ClipboardList],
        ].map(([k, t, Ico], i) => {
          const Icon = Ico as React.ElementType;
          const col = [C.green, C.blue, C.yellow, C.leaf, C.red, C.green][i];
          return (
            <div
              key={k as string}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderTop: `4px solid ${col}`,
                borderRadius: 14,
                padding: "22px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <div className="flex items-center" style={{ gap: 12 }}>
                <Icon size={32} color={col} strokeWidth={2.1} />
                <span style={{ fontSize: 26, fontWeight: 800, color: col }}>{k as string}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>{t as string}</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: T.small, color: C.mute }}>
        Procedimentos de gestão e controle de impressão de artes devem ser estabelecidos e implementados para garantir cumprimento
        de requisitos legais e do cliente — os itens acima são o mínimo.
      </div>
    </Body>
    <Foot n="16" />
  </Slide>
);

const S17DefesaFraude = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Requisitos 2.5.3 e 2.5.4" title="Defesa dos alimentos e mitigação de fraude" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.green} title="2.5.3 Defesa dos alimentos" icon={Lock}>
            a) Assegurar que a <strong>avaliação de ameaças</strong> e o <strong>plano de defesa dos alimentos</strong> sejam
            desenvolvidos e mantidos por pessoal com conhecimento e competência adequados.
          </Card>
          <Card color={C.blue} title="2.5.4 Fraude de alimentos" icon={ShieldCheck}>
            a) Assegurar que a <strong>avaliação de vulnerabilidade</strong> e o <strong>plano de mitigação de fraude</strong> sejam
            desenvolvidos e mantidos por pessoal com conhecimento e competência adequados.
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Note color={C.yellow} title="Requisitos específicos GFSI" icon={Award}>
            Ambos os requisitos permanecem como exigência de benchmarking da GFSI — competência é o ponto auditável central.
          </Note>
          <Note color={C.green} title="Por que o texto encurtou" icon={Info}>
            Requisitos reduzidos no esquema devido à <strong>inclusão da ISO 22002-100:2025</strong>, que passa a detalhar defesa e
            fraude na cláusula 16.
          </Note>
          <Note color={C.red} title="Erro comum" icon={XCircle}>
            Plano assinado por quem não participou da avaliação. Competência precisa estar evidenciada, não presumida.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="17" />
  </Slide>
);

const S18AlergenosCultura = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Requisitos 2.5.6 e 2.5.8" title="Alérgenos e cultura de segurança e qualidade" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.yellow} title="2.5.6 h) Gestão de alérgenos" icon={AlertTriangle}>
            Acrescentado que o requisito <strong>pode não ser aplicável a pet food</strong> quando não houver legislação de alérgenos
            no país de venda — a menos que exista declaração sobre o status de alérgenos.
          </Card>
          <Card color={C.green} title="2.5.8 a) Objetivos de cultura" icon={Users}>
            A alta direção deve estabelecer, implementar e manter <strong>objetivos de cultura</strong> de segurança de alimentos e
            qualidade como parte do sistema de gestão, com recursos suficientes.
          </Card>
          <Note color={C.blue} title="2.5.8 c) · GFSI" icon={HandHeart}>
            Deve haver compromisso demonstrável de <strong>todo o pessoal</strong> com a produção e o manuseio seguro dos alimentos.
          </Note>
        </div>

        <div
          style={{
            background: C.ink,
            borderRadius: 16,
            padding: "28px 30px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: T.label, letterSpacing: "0.22em", textTransform: "uppercase", color: C.sand, fontWeight: 800 }}>
            Dimensões da cultura auditadas
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              "Liderança",
              "Comunicação",
              "Conhecimento",
              "Treinamento",
              "Dimensionamento",
              "Capacidade",
              "Consciência",
              "Ferramentas / TI",
              "Qualidade documental",
              "Intenção",
              "Foco regulatório",
              "Sistemas de qualidade",
            ].map((t, i) => (
              <div
                key={t}
                style={{
                  background: "rgba(255,255,255,.06)",
                  borderTop: `3px solid ${[C.leaf, C.sand, C.blueSoft][i % 3]}`,
                  borderRadius: 10,
                  padding: "14px 14px",
                  fontSize: 19,
                  fontWeight: 700,
                  color: "rgba(255,255,255,.86)",
                  lineHeight: 1.25,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Body>
    <Foot n="18" />
  </Slide>
);

const S19PprDesign = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Requisitos 2.5.12, 2.5.13 e 2.5.14" title="Verificação de PPR, design de produto e rastreabilidade" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.green} title="2.5.12 Verificação do PPR" icon={ClipboardList}>
            Passa a aplicar-se também a <strong>Catering / Serviço de Alimentação (E)</strong> e <strong>Varejo/Atacado (FI)</strong>.
          </Card>
          <Note color={C.blue} title="Na prática" icon={Info}>
            Programa de verificação em campo: água, resíduos, limpeza, alérgenos, pragas, calibração, temperatura, treinamento e
            fornecedores.
          </Note>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.yellow} title="2.5.13 e) Vida útil" icon={Thermometer}>
            A exigência de <strong>validação de vida útil e verificação contínua</strong> aplica-se a BIII, C, D e K.
          </Card>
          <Card color={C.leaf} title="2.5.13 g) Embalagem" icon={Boxes}>
            Ao projetar embalagens primárias: contenção e proteção do produto; preservação e extensão da vida útil; minimização de
            perda e desperdício; comunicação clara ao consumidor — sem impacto negativo na segurança.
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.blue} title="2.5.14 Rastreabilidade" icon={FileSearch}>
            O antigo vínculo com controle do estado de saúde foi <strong>incorporado à ISO 22002-100</strong>.
          </Card>
          <Note color={C.green} title="Inclusão do BoS" icon={CheckCircle2}>
            <strong>Rastreabilidade de abate</strong> — aplicável apenas à categoria C0.
          </Note>
          <Note color={C.yellow} title="2.5.18 Multissite" icon={Building2}>
            Aplicabilidade ampliada: adicionou-se <strong>BIII</strong>.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="19" />
  </Slide>
);

const S20Flw = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Requisito 2.5.16" title="Perda e desperdício de alimentos entra na estratégia" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.green} title="a) Política e objetivos" icon={Leaf}>
            Ter política e objetivos documentados, detalhando a estratégia para reduzir perda e desperdício de alimentos{" "}
            <strong>na organização e na cadeia de abastecimento relacionada</strong>.
          </Card>
          <Note color={C.yellow} title="O que a v7 acrescentou" icon={Target}>
            Os objetivos devem ser apoiados por <strong>metas claras, mensuráveis e com prazos definidos</strong>. Intenção sem
            indicador não é mais suficiente.
          </Note>
          <Note color={C.blue} title="Conexão ODS" icon={Globe}>
            Requisito diretamente ligado ao fortalecimento da contribuição das organizações aos Objetivos de Desenvolvimento
            Sustentável.
          </Note>
        </div>

        <div
          style={{
            background: C.ink,
            borderRadius: 16,
            padding: "30px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: T.label, letterSpacing: "0.22em", textTransform: "uppercase", color: C.sand, fontWeight: 800 }}>
            Roteiro mínimo de evidência
          </div>
          {[
            ["1", "Política de FLW aprovada pela alta direção"],
            ["2", "Linha de base de perdas por processo"],
            ["3", "Metas com prazo e responsável"],
            ["4", "Indicadores monitorados na análise crítica"],
            ["5", "Ações na cadeia (fornecedores e clientes)"],
          ].map(([k, t]) => (
            <div key={k} className="flex items-center" style={{ gap: 16 }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: C.sand,
                  color: C.inkDeep,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {k}
              </span>
              <span style={{ fontSize: 22, color: "rgba(255,255,255,.85)", lineHeight: 1.3 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </Body>
    <Foot n="20" />
  </Slide>
);

const S21Parte3 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Parte 3" title="Processo de certificação — o que muda para os OCs" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
          <ul style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Bullet>Flexibilização do tempo mínimo de auditoria conforme planos APPCC e número de funcionários.</Bullet>
            <Bullet color={C.blue}>Categorias C, D e K: duração mínima de 2 dias (exigência GFSI).</Bullet>
            <Bullet color={C.yellow}>Máximo de 2 auditorias totalmente remotas consecutivas.</Bullet>
            <Bullet color={C.leaf}>Atividades off-site passam a compor o tempo de auditoria.</Bullet>
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, justifyContent: "center" }}>
          <Table
            head={["Funcionários (FTE)", "Estudos APPCC", "Tempo T-FSSC"]}
            rows={[
              ["< 100 FTE", "Máximo 2 estudos", "0,5 dia auditor (4 h)"],
              ["≥ 100 e < 250 FTE", "Máximo 2 estudos", "1,0 dia auditor (8 h)"],
              ["≥ 250 FTE", "ou ≥ 3 estudos", "1,5 dia auditor (12 h)"],
            ]}
          />
          <Note color={C.blue} title="Leitura para a indústria" icon={Info}>
            Mais tempo de auditoria em plantas complexas e menos margem para auditorias integralmente remotas em sequência.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="21" />
  </Slide>
);

const S22Mod3 = () => (
  <Divider
    n="22"
    modulo="Módulo 3"
    title="Nova série ISO 22002-X:2025"
    sub="Um PPR comum para toda a cadeia, com partes setoriais específicas por categoria."
    items={[
      ["22002-100", "PPR comum a todas as categorias."],
      ["Setoriais", "22002-1, -2, -4, -5, -6 e -7."],
      ["Objetivo", "Apoiar a cláusula 8.2 da ISO 22000."],
      ["Efeito", "Expectativas de auditoria mais claras."],
    ]}
  />
);

const S23Estrutura22002 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Nova estrutura" title="ISO 22002-100 + parte setorial, conforme a categoria" />
      <div style={{ flex: 1 }}>
        <Table
          fontSize={19}
          widths={["1.2fr", "120px", "1.6fr"]}
          head={["PPR setorial específico", "Categoria", "Descrição da categoria"]}
          rows={[
            ["ISO 22002-1 · Fabricação de alimentos", "BIII", "Manuseio pré-processamento de produtos vegetais"],
            ["", "C", "Alimentos, ingredientes e processamento de alimentos para pet"],
            ["", "K", "Químicos e bioquímicos"],
            ["ISO 22002-2 · Catering", "E", "Catering / serviços de alimentação"],
            ["ISO 22002-4 · Embalagens para alimentos", "I", "Produção de materiais de embalagem"],
            ["ISO 22002-5 · Transporte e estocagem", "G", "Serviços de estocagem e transporte"],
            ["ISO 22002-6 · Rações e alimentos para animais", "D", "Processamento de ração e alimentos para animais"],
            ["ISO 22002-7 · Varejo e atacado", "FI", "Varejo e atacado"],
            ["Sem requisito setorial adicional", "FII · H · J", "Brokering/trading, serviços e equipamentos"],
          ]}
        />
      </div>
      <Note color={C.green} title="Regra de leitura" icon={Layers}>
        Toda organização aplica a <strong>ISO 22002-100:2025</strong>. A parte setorial se soma conforme a categoria da cadeia.
      </Note>
    </Body>
    <Foot n="23" />
  </Slide>
);

const S24Impacto = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Impacto da mudança" title="O que a nova série significa na prática" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr 1fr", gap: 20 }}>
        <Card color={C.green} title="Substituição normativa" icon={Repeat}>
          As normas <strong>ISO 22002-X</strong>, publicadas em julho/2025, <strong>substituem</strong> a série ISO/TS 22002-X para as
          organizações certificadas FSSC 22000, como parte da V7.
        </Card>
        <Card color={C.blue} title="Padrão comum + setorial" icon={Layers}>
          Um PPR comum a toda a cadeia, com partes adicionais específicas de setor — menos sobreposição, mais coerência.
        </Card>
        <Card color={C.yellow} title="Auditoria mais previsível" icon={FileSearch}>
          Estruturas de PPR mais padronizadas e expectativas de auditoria mais claras entre organismos e auditores.
        </Card>
        <Card color={C.red} title="Atenção ao esforço" icon={AlertTriangle}>
          Para alguns setores, a mudança <strong>pode resultar em aumento de requisitos</strong> — o diagnóstico de gap precisa ser
          feito por categoria.
        </Card>
      </div>
      <Note color={C.blue} title="Objetivo da série" icon={Target}>
        Definir e padronizar requisitos para estabelecer, implementar e manter PPRs em toda a cadeia de alimentos, rações e
        embalagens, auxiliando o controle de riscos junto à cláusula 8.2 da ISO 22000:2018.
      </Note>
    </Body>
    <Foot n="24" />
  </Slide>
);

const S25DePara = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="De → para" title="ISO/TS 22002-1:2009 → ISO 22002-1 e 22002-100:2025" />
      <div style={{ flex: 1 }}>
        <Table
          dense
          fontSize={16}
          widths={["58px", "1fr", "58px", "1fr"]}
          head={["Nº", "ISO/TS 22002-1:2009", "Nº", "ISO 22002-1:2025 e 22002-100:2025"]}
          rows={[
            ["4", "Construção e layout das edificações", "4", "Construção e layout de edifícios"],
            ["5", "Layout das instalações e área de trabalho", "5", "Projeto e leiaute de instalações e áreas de trabalho"],
            ["6", "Utilidades — ar, água e energia", "6", "Utilidades"],
            ["7", "Descarte de resíduos", "8", "Gestão de resíduos, perdas e desperdício de alimentos (FLW) e reciclagem"],
            ["8", "Adequação, limpeza e manutenção de equipamentos", "9", "Adequação e manutenção de equipamentos"],
            ["9", "Gestão de materiais adquiridos", "10", "Gestão de materiais adquiridos"],
            ["10", "Medidas para prevenção da contaminação cruzada", "12", "Medidas para prevenção de contaminação"],
            ["11", "Limpeza e sanitização", "13", "Limpeza e desinfecção"],
            ["12", "Controle de pragas", "7", "Controle de pragas"],
            ["13", "Higiene pessoal e instalação para funcionários", "14", "Higiene pessoal e instalações de trabalhadores"],
            ["14", "Retrabalho", "17", "Produto reprocessado (22002-1) · uso de material para reprocesso (22002-4)"],
            ["15", "Recolhimento", "—", "Requisito da ISO 22000, item 8.9.5"],
            ["16", "Armazenamento", "11", "Armazenamento, incluindo estocagem em armazém e transporte"],
            ["17", "Informação do produto e alerta ao consumidor", "15", "Informação sobre produtos ao consumidor"],
            ["18", "Defesa do alimento, biovigilância e bioterrorismo", "16", "Defesa dos alimentos e fraude de alimentos"],
          ]}
        />
      </div>
    </Body>
    <Foot n="25" />
  </Slide>
);

const S26Termos = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head
        eyebrow="Atenção"
        title="Termos e definições: leia antes de auditar"
        sub="Melhoria na redação dos requisitos começa pela clareza dos termos."
      />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, alignContent: "start" }}>
        {[
          "Contaminação cruzada",
          "Declaração de conformidade",
          "Perda e desperdício de alimentos",
          "Embalagem de alimentos",
          "Lavagem das mãos",
          "Produto intermediário",
          "Unidade logística",
          "Reciclagem",
          "Reutilização",
          "Armazenamento",
          "Transporte",
          "Resíduo",
        ].map((t, i) => (
          <div
            key={t}
            style={{
              background: C.white,
              border: `1px solid ${C.line}`,
              borderLeft: `4px solid ${[C.green, C.blue, C.yellow, C.leaf][i % 4]}`,
              borderRadius: 12,
              padding: "22px 20px",
              fontSize: 23,
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.25,
              display: "flex",
              alignItems: "center",
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <Note color={C.yellow} title="Por que isso importa" icon={Info}>
        Boa parte das não conformidades da transição vem de interpretação de termo — “resíduo”, “reutilização” e “unidade logística”
        mudaram de alcance.
      </Note>
    </Body>
    <Foot n="26" />
  </Slide>
);

const S27Mod4 = () => (
  <Divider
    n="27"
    modulo="Módulo 4"
    title="PPRs cláusula a cláusula"
    sub="O que efetivamente muda na rotina da planta — do limite do terreno ao reprocesso."
    items={[
      ["4 a 6", "Edificações, leiaute e utilidades."],
      ["7 a 9", "Pragas, resíduos/FLW e equipamentos."],
      ["10 a 12", "Materiais, armazenamento e contaminação."],
      ["13 a 17", "Higiene, informação, defesa e reprocesso."],
    ]}
  />
);

const S28C4 = () => (
  <Clause
    n="28"
    numero="4"
    titulo="Construção e layout das edificações"
    icon={Building2}
    indice={["4.1 Limites do local/instalação", "4.2 Ambiente ***", "4.3 Construção e leiaute"]}
    fonte="Cláusulas com alteração relevante em relação à ISO/TS 22002-1:2009."
    destaques={[
      [
        "4.2 Localização longe de fontes de contaminação",
        "Áreas poluídas e atividades industriais que possam contaminar; áreas sujeitas a inundações; áreas propensas a infestação por pragas; áreas onde resíduos sólidos ou líquidos não possam ser removidos de forma eficaz.",
      ],
      [
        "Medidas eficazes de proteção",
        "Quando o entorno oferecer risco, devem ser implementadas medidas eficazes para proteger os produtos e/ou mitigar a contaminação proveniente do ambiente.",
      ],
    ]}
  />
);

const S29C5 = () => (
  <Clause
    n="29"
    numero="5"
    titulo="Projeto e disposição das instalações e espaços de trabalho"
    icon={Layers}
    indice={[
      "5.1 Geral ***",
      "5.2 Estruturas internas e acessórios ***",
      "5.3 Localização dos equipamentos",
      "5.4 Armazenamento de alimentos, embalagens, ingredientes e químicos",
    ]}
    destaques={[
      ["5.1 Zoneamento", "O zoneamento pode contribuir para alcançar os objetivos das alíneas a) a c) da cláusula."],
      [
        "5.2 Quando não for viável",
        "Se as medidas previstas não forem possíveis ou viáveis, devem ser adotadas medidas alternativas para proteger os produtos da contaminação.",
      ],
      [
        "Equipamentos cobertos",
        "Devem ser cobertos onde a limpeza rotineira de instalações e acessórios suspensos não seja viável e haja potencial de introdução de contaminantes.",
      ],
    ]}
  />
);

const S30C6 = () => (
  <Clause
    n="30"
    numero="6"
    titulo="Utilidades"
    icon={Droplets}
    indice={[
      "6.1 Geral ***",
      "6.2 Água, gelo e vapor",
      "6.3 Ar e ventilação",
      "6.4 Ar comprimido e outros gases",
      "6.5 Iluminação",
      "6.6 Produtos químicos para caldeiras (ISO 22002-1)",
    ]}
    destaques={[
      [
        "Controle e monitoramento da qualidade",
        "Devem ser estabelecidas medidas de controle e monitoramento da qualidade das utilidades, apropriadas à operação, para minimizar a contaminação do produto.",
      ],
      [
        "Manutenção sob controle",
        "As atividades de manutenção e serviço associadas às utilidades devem ser estabelecidas e monitoradas para garantir que a segurança dos alimentos não seja comprometida.",
      ],
    ]}
  />
);

const S31C7 = () => (
  <Clause
    n="31"
    numero="7"
    titulo="Controle de pragas"
    icon={Bug}
    indice={[
      "7.1 Geral",
      "7.2 Programas de controle de pragas",
      "7.3 Prevenção de acesso",
      "7.4 Abrigos e infestações",
      "7.5 Monitoramento e detecção ***",
      "7.6 Controle e erradicação ***",
    ]}
    destaques={[
      [
        "7.5 Terceirização não transfere responsabilidade",
        "Quando o monitoramento e a detecção forem terceirizados, a organização é responsável por revisar os relatórios e garantir que ações corretivas sejam tomadas.",
      ],
      [
        "7.6 Ao observar pragas",
        "Remover as pragas, prevenir a recorrência e reduzir a ocorrência a nível que não comprometa a segurança. Tratamentos mecânicos, biológicos ou químicos aprovados, aplicados por pessoa qualificada ou treinada.",
      ],
      [
        "Produtos afetados",
        "Isolar produtos e áreas afetadas, tratar como potencialmente inseguros, verificar a eficácia da erradicação, registrar e identificar a causa raiz.",
      ],
    ]}
    nota="Informações documentadas do uso de pesticidas devem identificar: tipo, quantidade e concentração; por quem, onde, quando e como foram aplicados; a praga-alvo; o resultado; e o manuseio de produtos afetados."
  />
);

const S32C8 = () => (
  <Clause
    n="32"
    numero="8"
    titulo="Gestão de resíduos, perdas e desperdício de alimentos (FLW) e reciclagem"
    icon={Trash2}
    indice={["8.1 Geral ***", "8.2 Reciclagem e/ou reutilização de materiais ***", "8.3 Recipientes para resíduos (maior detalhamento)"]}
    destaques={[
      [
        "8.1 Programa de gerenciamento de resíduos",
        "Identificar resíduos, incluindo resíduos de alimentos quando apropriado; coletar, conter, remover e descartar (inclusive águas residuais). Área separada e designada para armazenamento de resíduos e, quando aplicável, de FLW.",
      ],
      [
        "Marca protegida no descarte",
        "Materiais rotulados, produtos ou embalagens impressas destinados a resíduo devem ser descaracterizados ou destruídos por empresas de descarte aprovadas, com informação documentada retida.",
      ],
      [
        "8.3 Recipientes",
        "Quantidade e capacidade adequadas, esvaziados em frequência apropriada, projetados para evitar infestação, identificados, higienizáveis e vedados quando houver risco de contaminação.",
      ],
    ]}
  />
);

const S33C8b = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Cláusula 8.2" title="Reciclagem e reutilização sem contaminar o produto final" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.green} title="Condição a)" icon={Recycle}>
            Materiais destinados à reciclagem ou reutilização devem ser <strong>identificados e armazenados separadamente</strong> de
            outros produtos, materiais e resíduos.
          </Card>
          <Card color={C.blue} title="Condição b)" icon={Boxes}>
            Áreas de armazenamento devem estar <strong>identificadas e mantidas</strong> com nível adequado de limpeza.
          </Card>
          <Note color={C.yellow} title="Projeto do sistema" icon={AlertTriangle}>
            Sistemas de reciclagem e/ou reutilização devem ser projetados de modo a prevenir a contaminação dos produtos finais.
          </Note>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.leaf} title="Antes de reutilizar" icon={SprayCan}>
            Inspeção e limpeza adequadas. Se o material não puder ser limpo ou reparado conforme padrão documentado — por exemplo um
            pallet de madeira — deve ser classificado como <strong>resíduo</strong>.
          </Card>
          <Card color={C.green} title="Finalidade e rastreabilidade" icon={FileSearch}>
            A reutilização deve ser para finalidade apropriada e previamente especificada, mantendo nível adequado de{" "}
            <strong>rastreabilidade</strong> desses materiais.
          </Card>
          <Note color={C.blue} title="Áreas de armazenamento de resíduos" icon={Info}>
            Devem ser mantidas limpas e organizadas; sistemas de remoção com capacidade compatível ao volume e adequadamente mantidos.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="33" />
  </Slide>
);

const S34C9 = () => (
  <Clause
    n="34"
    numero="9"
    titulo="Adequação e manutenção de equipamentos"
    icon={Wrench}
    indice={["9.1 Geral ***", "9.2 Capacidade do equipamento", "9.3 Manutenção ***"]}
    destaques={[
      [
        "9.1 Instalação e uso",
        "Instalar e utilizar conforme condições do fabricante ou, na ausência, conforme práticas técnicas e de higiene adequadas; manter nível adequado de higiene, prevenir contaminação cruzada e minimizar contaminação vinda do equipamento (vazamento de óleo, emissão de gases).",
      ],
      [
        "Inspeção e correção",
        "Inspecionar os equipamentos em frequência apropriada e implementar ações corretivas adequadas em caso de falhas.",
      ],
      [
        "9.3 Manutenção documentada",
        "Programas de manutenção preventiva e corretiva devem ser documentados. O procedimento de liberação deve prever a remoção de contaminantes potenciais das máquinas, equipamentos e do ambiente direto após os trabalhos.",
      ],
    ]}
  />
);

const S35C10 = () => (
  <Clause
    n="35"
    numero="10"
    titulo="Gestão de materiais adquiridos"
    icon={Truck}
    indice={["10.1 Geral", "10.2 Seleção e gestão de fornecedores", "10.3 Materiais recebidos ***"]}
    fonte="Link com ISO 22000 (7.1.6) e com Requisitos Adicionais v7 (2.5.1)."
    destaques={[
      ["Registros de temperatura", "A existência de registros de temperatura deve ser mantida como informação documentada."],
      [
        "ISO 22002-4 · selos e origens sensíveis",
        "Selos invioláveis exigem processo de verificação. Matérias-primas de fontes recicladas, nanomateriais ou base vegetal exigem medidas adequadas de verificação de segurança e rastreabilidade antes da aceitação.",
      ],
      [
        "Não conformes e granel",
        "Matérias-primas fora de especificação seguem procedimento documentado que impeça uso não intencional. Pontos de acesso a linhas de recebimento a granel identificados, tampados e protegidos — descarga só após verificação e aprovação.",
      ],
    ]}
  />
);

const S36C11 = () => (
  <Clause
    n="36"
    numero="11"
    titulo="Armazenamento, incluindo estocagem em armazém e transporte"
    icon={Boxes}
    indice={["11.1 Armazenamento e estocagem ***", "11.2 Expedição ***", "11.3 Transporte ***"]}
    fonte="Link com Requisitos Adicionais v7 (2.5.10)."
    destaques={[
      [
        "11.1 Segregação de não conformes",
        "Área específica ou outro meio (por exemplo, sistema eletrônico) para segregar materiais e produtos não conformes, prevenindo uso indevido ou não intencional.",
      ],
      [
        "11.2 Inspeção antes da expedição",
        "Unidades logísticas inspecionadas quanto a limpeza, conservação, adequação ao uso e ausência de odores, pragas ou condições que impactem os produtos. Carregamento planejado para manter a integridade.",
      ],
      [
        "11.3 Veículos e contêineres",
        "Proteção contra danos e contaminação; conservação, limpeza e funcionamento adequados; informação documentada de condições de transporte, inspeção e limpeza; histórico de cargas em contêineres a granel quando houver risco.",
      ],
    ]}
  />
);

const S37C12 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head
        eyebrow="Cláusula 12"
        title="Medidas para prevenção da contaminação"
        sub="ISO 22002-1: microbiológica, alérgenos, física e química · ISO 22002-4: química, física e migração."
      />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr 1fr", gap: 18 }}>
        <Card color={C.yellow} title="12.3 Controle de alérgenos ***" icon={AlertTriangle}>
          Proteger produtos de contatos alergênicos não intencionais: controle do fluxo de ar; roupas protetivas adicionais;
          ferramentas e equipamentos dedicados; controle da alimentação no local, incluindo máquinas de venda automática.
        </Card>
        <Card color={C.blue} title="12.5 Contaminação química ***" icon={FlaskConical}>
          Químicos aprovados por autoridades competentes; aplicados conforme instruções (concentração e método) e por pessoal
          competente; rotulados; armazenados separadamente dos alimentos e em locais trancados ou área protegida.
        </Card>
        <Card color={C.green} title="Pesticidas e lubrificantes" icon={SprayCan}>
          Pesticidas armazenados em áreas segregadas de materiais de limpeza e desinfetantes. Equipamentos de aplicação de
          pesticidas e lubrificantes de grau não alimentício devem ser dedicados e identificados.
        </Card>
        <Card color={C.red} title="Contaminação física e migração" icon={XCircle}>
          Vidro e quebradiços evitados sempre que possível, com inspeção periódica e procedimento em caso de quebra. Objetos
          cortantes sob procedimento formal; estiletes com lâmina destacável proibidos. Migração controlada em embalagens e
          materiais impressos/revestidos.
        </Card>
      </div>
      <Note color={C.blue} title="Se ocorrer contaminação química" icon={Info}>
        Funcionários devem tomar correções e ações corretivas, <strong>incluindo comunicação</strong>.
      </Note>
    </Body>
    <Foot n="37" />
  </Slide>
);

const S38C1314 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Cláusulas 13 e 14" title="Limpeza e desinfecção · Higiene pessoal e instalações" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.green} title="13.1 Programas documentados ***" icon={SprayCan}>
            Programas de limpeza e/ou desinfecção que mantenham a limpeza em nível compatível com a avaliação de segurança
            aplicável: a) áreas especificadas; b) equipamentos, incluindo contêineres de transporte; c) ambiente de trabalho.
          </Card>
          <Note color={C.blue} title="Círculo de Sinner" icon={Info}>
            Temperatura, ação química, tempo de ação e ação mecânica — o equilíbrio entre eles define a eficácia. 13.4 trata de CIP
            (ISO 22002-1).
          </Note>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card color={C.yellow} title="14.6 Higiene pessoal ***" icon={HandHeart} compact>
            Lavar e, quando apropriado, desinfetar as mãos: antes de manusear produtos ou embalagens; após o banheiro; após manuseio
            de material contaminado; após fumar; após comer ou beber; antes de colocar ou trocar luvas.
          </Card>
          <Card color={C.red} title="14.7 Comportamento pessoal ***" icon={Users} compact>
            Documentar e implementar restrições: fumar/vaporizar, comer e mastigar; cuspir; itens pessoais (medicamentos, joias,
            relógios, piercings); esmaltes e unhas/cílios postiços; tocar boca e nariz; espirrar ou tossir sobre produtos; guarda de
            itens pessoais.
          </Card>
          <Card color={C.blue} title="14.8 Visitantes e terceiros ***" icon={ShieldCheck} compact>
            Seguem os requisitos documentados de higiene; quando necessário, instruídos e supervisionados e com roupas de proteção;
            orientados antes do acesso e incentivados a relatar doenças ou lesões.
          </Card>
        </div>
      </div>
    </Body>
    <Foot n="38" />
  </Slide>
);

const S39C1516 = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Cláusulas 15, 16 e 17" title="Informação ao consumidor, defesa e fraude, reprocesso" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.green} title="15. Informação sobre produtos ao consumidor" icon={Tag}>
            Rotulagem e comunicação ao consumidor, com link direto ao Requisito Adicional v7 <strong>2.5.2</strong>.
          </Card>
          <Card color={C.leaf} title="17. Produto reprocessado" icon={Repeat}>
            22002-1: requisito geral; armazenamento, identificação e rastreabilidade; uso do produto reprocessado.
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.blue} title="16.1 e 16.2 Defesa dos alimentos" icon={Lock}>
            Proteger produtos contra atos intencionais: sabotagem e terrorismo; rotulagem incorreta, falsificação e adulteração;
            vandalismo e roubo. Metodologia, avaliação de ameaças, plano documentado e implementação com treinamento, comunicação e
            revisão periódica.
          </Card>
          <Note color={C.yellow} title="Anexo A" icon={Info}>
            Traz exemplos de medidas de defesa dos alimentos: infraestrutura, verificação de referências, controle de informação
            confidencial, segurança de áreas, transporte e garantia de fornecedores.
          </Note>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card color={C.red} title="16.3 Prevenção à fraude" icon={ShieldCheck}>
            Metodologia de significância, avaliação de vulnerabilidade, medidas de mitigação proporcionais, plano documentado e
            implementação com treinamento, comunicação e revisão periódica.
          </Card>
          <Note color={C.blue} title="Fatores de vulnerabilidade" icon={Scale}>
            Vulnerabilidade econômica, dados históricos, facilidade de detecção, acesso a matérias-primas e produtos na cadeia,
            relacionamento e garantia de fornecedores, complexidade da cadeia. <strong>Anexo B</strong> traz exemplos de mitigação.
          </Note>
        </div>
      </div>
    </Body>
    <Foot n="39" />
  </Slide>
);

const S40Reprocesso = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Cláusula 17 · ISO 22002-4" title="Uso de material para reprocesso em embalagens" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <Card color={C.green} title="Especificar antes de reincorporar" icon={ClipboardList}>
          Quando o material for reincorporado ao processo produtivo, devem ser especificados a <strong>quantidade</strong>, o{" "}
          <strong>tipo</strong> e as <strong>condições aceitáveis de uso</strong>. O método de adição, incluindo etapas de
          pré-processamento necessárias, deve ser determinado.
        </Card>
        <Card color={C.yellow} title="Barreira de contaminação" icon={AlertTriangle}>
          Medidas devem impedir que o reprocesso permita que matérias-primas, produtos intermediários ou embalagens para alimentos
          sejam contaminados com <strong>materiais não destinados ao contato com alimentos</strong>.
        </Card>
        <Card color={C.blue} title="Evidência documentada" icon={FileSearch}>
          Informações documentadas devem ser retidas para demonstrar que a conformidade com requisitos regulamentares e de clientes
          é mantida ao seguir o reprocesso especificado.
        </Card>
      </div>
      <Note color={C.green} title="Comparativo" icon={Repeat}>
        Na ISO 22002-1:2025 o tema aparece como <strong>17. Produto reprocessado</strong> (geral, armazenamento/identificação/
        rastreabilidade e uso). Na ISO 22002-100 não há cláusula 17 correspondente.
      </Note>
    </Body>
    <Foot n="40" />
  </Slide>
);

const S41Plano = () => (
  <Slide bg={C.paper} decor={<ColorBar vertical />}>
    <Body>
      <Head eyebrow="Aplicação" title="Plano de transição em 6 passos" sub="O que fazer ao voltar para a planta na segunda-feira." />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "1fr 1fr", gap: 18 }}>
        {[
          ["01", "Definir a sua categoria", "Confirme (sub)categoria e qual parte setorial da ISO 22002-X se aplica ao seu escopo.", C.green, Boxes],
          ["02", "Diagnóstico de gap", "Compare cláusula a cláusula: ISO/TS 22002-1:2009 → 22002-100 + parte setorial.", C.blue, FileSearch],
          ["03", "Requisitos Adicionais v7", "Reveja 2.5.1, 2.5.2, 2.5.3/4, 2.5.6, 2.5.8, 2.5.12, 2.5.13, 2.5.14, 2.5.16 e 2.5.18.", C.yellow, ClipboardList],
          ["04", "Documentos e registros", "Atualize procedimentos, especificações, planos de defesa/fraude e política de FLW.", C.leaf, BookOpen],
          ["05", "Treinar e comunicar", "Cultura, higiene pessoal e comportamento: o texto novo é mais explícito e auditável.", C.red, Users],
          ["06", "Verificar antes do OC", "Auditoria interna e verificação de PPR na nova estrutura antes da auditoria de upgrade.", C.green, ShieldCheck],
        ].map(([k, t, d, col, Ico]) => {
          const Icon = Ico as React.ElementType;
          return (
            <div
              key={k as string}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderTop: `4px solid ${col as string}`,
                borderRadius: 14,
                padding: "22px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <div className="flex items-center" style={{ gap: 12 }}>
                <Icon size={30} color={col as string} strokeWidth={2.1} />
                <span style={{ fontSize: 30, fontWeight: 800, color: col as string, lineHeight: 1 }}>{k as string}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>{t as string}</div>
              <div style={{ fontSize: T.body, color: C.mute, lineHeight: 1.4 }}>{d as string}</div>
            </div>
          );
        })}
      </div>
    </Body>
    <Foot n="41" />
  </Slide>
);

const S42Encerramento = () => (
  <Slide bg={C.inkDeep} decor={<BrandDecor accent={C.sand} />}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1020 }}>
      <div className="flex items-center" style={{ gap: 18 }}>
        <Monogram size={40} />
        <span style={{ width: 74, height: 4, background: C.sand, borderRadius: 2 }} />
        <span style={{ width: 30, height: 4, background: "rgba(255,255,255,.3)", borderRadius: 2 }} />
      </div>
      <h2 style={{ marginTop: 26, fontSize: 72, fontWeight: 800, color: C.white, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 960 }}>
        Agradecemos pela <span style={{ color: C.sand }}>confiança.</span>
      </h2>
      <p style={{ marginTop: 18, fontSize: 27, color: "rgba(255,255,255,.72)", maxWidth: 820, lineHeight: 1.4 }}>
        Dúvidas, diagnóstico de gap e preparação para a auditoria de upgrade na Versão 7.
      </p>

      <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 4, height: 58, background: C.leaf, borderRadius: 2 }} />
        <div>
          <div style={{ fontSize: 31, fontWeight: 800, color: C.white }}>Food Solution · Consultoria e Treinamento</div>
          <div style={{ fontSize: T.small, color: "rgba(255,255,255,.6)", marginTop: 4 }}>
            Lívia L. Rodrigues · Auditora Líder FSSC 22000 · (62) 98113-0665
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ============================================================
   Página
   ============================================================ */
const Fssc22000V7 = () => {
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
        <title>Atualização FSSC 22000 v7 | Treinamento Food Solution</title>
        <meta
          name="description"
          content="Treinamento de atualização FSSC 22000 Versão 7: contexto do esquema, decisões do BoS, transição, Requisitos Adicionais v7 e a nova série ISO 22002-X:2025 cláusula a cláusula."
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
      <S01Quem />
      <S02Conteudo />
      <S03Mod1 />
      <S04Contexto />
      <S05Bos />
      <S06BosTabela />
      <S07V6V7 />
      <S08PorQue />
      <S09Transicao />
      <S10Mod2 />
      <S11Estrutura />
      <S12Parte1 />
      <S13Tabela11 />
      <S14Parte2Lista />
      <S15Req251 />
      <S16Req252 />
      <S17DefesaFraude />
      <S18AlergenosCultura />
      <S19PprDesign />
      <S20Flw />
      <S21Parte3 />
      <S22Mod3 />
      <S23Estrutura22002 />
      <S24Impacto />
      <S25DePara />
      <S26Termos />
      <S27Mod4 />
      <S28C4 />
      <S29C5 />
      <S30C6 />
      <S31C7 />
      <S32C8 />
      <S33C8b />
      <S34C9 />
      <S35C10 />
      <S36C11 />
      <S37C12 />
      <S38C1314 />
      <S39C1516 />
      <S40Reprocesso />
      <S41Plano />
      <S42Encerramento />
    </main>
  );
};

export default Fssc22000V7;
