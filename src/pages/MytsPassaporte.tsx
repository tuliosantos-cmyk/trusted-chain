import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Sprout,
  Users,
  Building2,
  TrendingUp,
  Coins,
  TreePine,
  ShieldCheck,
  Globe,
  Mail,
  Camera,
  Check,
  ArrowRight,
  Handshake,
  Landmark,
  Satellite,
  Network,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import grounddAsset from "@/assets/logos/groundd.png.asset.json";
import ramoAsset from "@/assets/logos/ramo.png.asset.json";
import korinAsset from "@/assets/logos/korin.png.asset.json";
import carrefourAsset from "@/assets/logos/carrefour.png.asset.json";
import produtorImg from "@/assets/passaporte/produtor.jpg";
import territorioImg from "@/assets/passaporte/geolocalizacao.jpg";

/* ============================================================
   CANVAS FIXO
   Todo slide é desenhado num palco de 1600 x 900 px.
   O palco inteiro é reduzido/ampliado por transform: scale().
   Consequência: nada de clamp/vw — todas as medidas são px reais
   e o que couber uma vez cabe em qualquer resolução.
   ============================================================ */
const CANVAS_W = 1600;
const CANVAS_H = 900;
const PAD = 64;
/* área útil: 1472 x 772 */

/* Escala tipográfica do deck (px) */
const T = {
  hero: 62,
  title: 46,
  subtitle: 32,
  lead: 21,
  body: 18,
  small: 16,
  label: 13,
  mono: 12,
} as const;

/* ============================================================
   Primitivos
   ============================================================ */
const PartnerLogo = ({
  src,
  alt,
  height = 30,
  variant = "light",
}: {
  src: string;
  alt: string;
  height?: number;
  variant?: "light" | "dark";
}) => (
  <img
    src={src}
    alt={alt}
    className="w-auto object-contain"
    style={{
      height,
      filter: variant === "light" ? "brightness(0) invert(1)" : undefined,
    }}
  />
);

const Chip = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span
    className={`inline-flex items-center rounded-full border font-semibold uppercase ${
      light
        ? "border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/80 backdrop-blur"
        : "border-accent/25 bg-accent/5 text-accent"
    }`}
    style={{ fontSize: T.label, letterSpacing: "0.18em", padding: "10px 22px", whiteSpace: "nowrap" }}
  >
    {children}
  </span>
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


const MytsWatermark = ({ style }: { style?: React.CSSProperties }) => (
  <img
    src={mytsMark}
    alt=""
    aria-hidden
    className="pointer-events-none absolute select-none opacity-[0.06]"
    style={style}
  />
);

/* Slot de foto — recebe a imagem quando existir, senão mostra moldura tracejada */
const PhotoSlot = ({
  src,
  alt,
  caption,
  hint,
  style,
  className = "",
  light = false,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  hint?: string;
  style?: React.CSSProperties;
  className?: string;
  light?: boolean;
}) => (
  <figure className={`relative overflow-hidden rounded-3xl ${className}`} style={style}>
    {src ? (
      <>
        <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
      </>
    ) : (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed ${
          light ? "border-primary-foreground/25 bg-primary-foreground/5" : "border-accent/30 bg-accent/5"
        }`}
        style={{ padding: 16 }}
      >
        <Camera
          className={light ? "text-primary-foreground/50" : "text-accent/60"}
          style={{ width: 34, height: 34, flexShrink: 0 }}
        />
        <span
          className={`text-center font-mono uppercase leading-tight ${
            light ? "text-primary-foreground/50" : "text-accent/70"
          }`}
          style={{ fontSize: T.mono, letterSpacing: "0.16em" }}
        >
          {hint ?? "Foto a enviar"}
        </span>
      </div>
    )}
    {src && caption && (
      <figcaption className="absolute inset-x-0 bottom-0" style={{ padding: 24 }}>
        <span
          className="font-display font-bold text-primary-foreground drop-shadow"
          style={{ fontSize: T.lead }}
        >
          {caption}
        </span>
      </figcaption>
    )}
  </figure>
);

/* ============================================================
   Diagramas
   ============================================================ */

/* Slide 02 — o gap estrutural entre quem produz e quem compra */
const GapCard = ({
  icon: Icon,
  kicker,
  titulo,
  itens,
}: {
  icon: typeof Sprout;
  kicker: string;
  titulo: string;
  itens: string[];
}) => (
  <div
    className="flex flex-1 flex-col justify-center rounded-3xl border border-border bg-card shadow-card"
    style={{ padding: 28 }}
  >
    <div className="flex items-center gap-3 text-accent">
      <Icon style={{ width: 24, height: 24 }} />
      <span className="font-mono uppercase" style={{ fontSize: T.mono, letterSpacing: "0.2em" }}>
        {kicker}
      </span>
    </div>
    <p
      className="font-display font-bold leading-tight text-primary"
      style={{ fontSize: 22, marginTop: 14 }}
    >
      {titulo}
    </p>
    <ul className="text-muted-foreground" style={{ fontSize: T.small, marginTop: 14, lineHeight: 1.55 }}>
      {itens.map((i) => (
        <li key={i}>· {i}</li>
      ))}
    </ul>
  </div>
);

const GapDiagram = () => (
  <div className="relative flex h-full items-stretch">
    <GapCard
      icon={Sprout}
      kicker="Quem produz"
      titulo="Produtores, cooperativas e associações"
      itens={["Boas práticas já existentes", "Sem comprovação de origem", "Sem histórico organizado"]}
    />

    <div className="relative shrink-0" style={{ width: 104 }}>
      <div className="absolute left-1/2 -translate-x-1/2 border-l-2 border-dashed border-destructive/40" style={{ top: 24, bottom: 24 }} />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-destructive/40 bg-destructive/10 text-center"
        style={{ padding: "8px 14px", whiteSpace: "nowrap" }}
      >
        <span className="block font-mono uppercase text-destructive" style={{ fontSize: T.mono, letterSpacing: "0.16em" }}>
          Gap
        </span>
        <span className="block font-semibold text-destructive/80" style={{ fontSize: T.mono }}>
          estrutural
        </span>
      </div>
    </div>

    <GapCard
      icon={Building2}
      kicker="Quem compra"
      titulo="Empresas, varejo e mercados exigentes"
      itens={["Pressão regulatória crescente", "Precisam de rastreabilidade real", "Não enxergam a base da cadeia"]}
    />
  </div>
);

/* Slide 04 — ciclo virtuoso (SVG de medida fixa) */
const CicloVirtuoso = ({ width = 740 }: { width?: number }) => {
  const nos = [
    "Produtor fortalecido",
    "Maior renda",
    "Cooperativas mais fortes",
    "Territórios preservados",
    "Cadeias resilientes",
    "Mercados confiáveis",
    "Novos investimentos",
    "Mais produtores fortalecidos",
  ];
  const cx = 450;
  const cy = 330;
  const r = 212;
  return (
    <svg
      viewBox="0 0 900 660"
      width={width}
      height={(width * 660) / 900}
      role="img"
      aria-label="Ciclo virtuoso do valor compartilhado"
    >
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(214 95% 54%)" />
          <stop offset="100%" stopColor="hsl(199 95% 60%)" />
        </linearGradient>
        <radialGradient id="coreGlow">
          <stop offset="0%" stopColor="hsl(199 95% 60%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(214 95% 54%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={r + 55} fill="url(#coreGlow)" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="3"
        strokeDasharray="10 12"
        opacity="0.75"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur="40s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx={cx} cy={cy} r="104" fill="hsl(222 65% 14%)" stroke="hsl(214 95% 54%)" strokeWidth="3" />
      <text
        x={cx}
        y={cy - 18}
        textAnchor="middle"
        fill="hsl(199 95% 60%)"
        fontSize="14"
        fontWeight="700"
        letterSpacing="3"
        fontFamily="Rubik, sans-serif"
      >
        CENTRO
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#fff" fontSize="26" fontWeight="800" fontFamily="Rubik, sans-serif">
        Valor
      </text>
      <text x={cx} y={cy + 42} textAnchor="middle" fill="#fff" fontSize="24" fontWeight="800" fontFamily="Rubik, sans-serif">
        compartilhado
      </text>

      {nos.map((n, i) => {
        const a = (i / nos.length) * 2 * Math.PI - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        const words = n.split(" ");
        const lines: string[] = [];
        let cur = "";
        words.forEach((w) => {
          if ((cur + " " + w).trim().length > 14) {
            lines.push(cur.trim());
            cur = w;
          } else cur = `${cur} ${w}`;
        });
        if (cur.trim()) lines.push(cur.trim());
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const side = Math.abs(cos) > 0.45;
        const lx = cx + (r + (side ? 30 : 14)) * cos;
        const ly = cy + (r + (side ? 8 : 34)) * sin;
        const anchor = side ? (cos > 0 ? "start" : "end") : "middle";
        const baseY = ly - ((lines.length - 1) * 23) / 2 + (side ? 7 : sin > 0 ? 16 : -14);
        return (
          <g key={n}>
            <circle cx={x} cy={y} r="15" fill="hsl(214 95% 54%)" stroke="#fff" strokeWidth="4" />
            <text
              x={lx}
              y={baseY}
              textAnchor={anchor}
              fill="hsl(222 65% 14%)"
              fontSize="21"
              fontWeight="700"
              fontFamily="Rubik, sans-serif"
            >
              {lines.map((l, li) => (
                <tspan key={l} x={lx} dy={li === 0 ? 0 : 23}>
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        );

      })}
    </svg>
  );
};

/* ============================================================
   Slides
   ============================================================ */

/* ---------- 00 · Capa ---------- */
const S00Capa = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, hsl(214 95% 54% / 0.18), transparent 60%)",
          }}
        />
        <MytsWatermark style={{ right: -120, bottom: -120, width: 520 }} />
      </>
    }
  >
    <div className="flex h-full flex-col" style={{ gap: 40 }}>
      {/* topo — marca + parceiros */}
      <div className="flex items-center justify-between" style={{ height: 44 }}>
        <div className="flex items-center gap-5">
          <img src={mytsLogo} alt="MyTS" style={{ height: 38, filter: "brightness(0) invert(1)" }} />
          <span className="bg-primary-foreground/20" style={{ width: 1, height: 28 }} />
          <span
            className="font-mono uppercase text-primary-foreground/60"
            style={{ fontSize: T.mono, letterSpacing: "0.24em" }}
          >
            Groundd · RAMO
          </span>
        </div>
        <span
          className="rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.05] font-mono uppercase text-primary-foreground/55"
          style={{ fontSize: T.mono, letterSpacing: "0.18em", padding: "10px 20px" }}
        >
          Apresentação para investidores
        </span>
      </div>

      {/* corpo — texto + foto */}
      <div className="flex flex-1 items-stretch" style={{ gap: 52, minHeight: 0 }}>
        {/* coluna texto */}
        <div className="flex flex-col justify-center" style={{ width: 820, flexShrink: 0 }}>
          <h1
            className="font-display font-black tracking-tight text-primary-foreground"
            style={{ fontSize: 76, lineHeight: 1.02 }}
          >
            Do território
            <br />
            ao mercado.
            <br />
            <span className="text-gradient">Com o produtor no centro.</span>
          </h1>

          <p
            className="text-primary-foreground/75"
            style={{ fontSize: T.lead, lineHeight: 1.55, marginTop: 32, maxWidth: 720 }}
          >
            Uma infraestrutura de evidência, governança e rastreabilidade que transforma o impacto
            de produtores, cooperativas e comunidades em valor reconhecido.
          </p>

          <div
            className="inline-flex w-fit items-center rounded-full bg-gradient-accent shadow-cta"
            style={{ gap: 14, padding: "18px 32px", marginTop: 40 }}
          >
            <Sprout style={{ width: 26, height: 26 }} className="text-accent-foreground" />
            <span
              className="font-display font-black text-accent-foreground"
              style={{ fontSize: 22, letterSpacing: "0.01em" }}
            >
              MyTS Passaporte Digital
            </span>
          </div>
        </div>

        {/* foto */}
        <PhotoSlot
          src={produtorImg}
          alt="Produtor em seu território"
          caption="Quem sustenta as cadeias"
          light
          className="border border-primary-foreground/10"
          style={{ flex: 1, minWidth: 0, height: "100%" }}
        />
      </div>

      {/* base — pilares */}
      <div className="grid grid-cols-3" style={{ gap: 20, height: 120 }}>
        {[
          { icon: Users, label: "Pessoas", desc: "Produtores e comunidades" },
          { icon: TreePine, label: "Territórios", desc: "Floresta e sociobiodiversidade" },
          { icon: Network, label: "Cadeias", desc: "Rastreabilidade e mercado" },
        ].map((p) => (
          <div
            key={p.label}
            className="flex items-center gap-5 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.05] backdrop-blur"
            style={{ padding: "0 28px" }}
          >
            <div
              className="grid shrink-0 place-items-center rounded-xl bg-gradient-accent shadow-glow"
              style={{ width: 52, height: 52 }}
            >
              <p.icon style={{ width: 26, height: 26 }} className="text-accent-foreground" />
            </div>
            <div>
              <div
                className="font-display font-bold text-primary-foreground"
                style={{ fontSize: 22, lineHeight: 1.2 }}
              >
                {p.label}
              </div>
              <div className="text-primary-foreground/55" style={{ fontSize: T.small, marginTop: 2 }}>
                {p.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Slide>
);

/* ---------- 01 · Abertura ---------- */
const S01Abertura = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <MytsWatermark style={{ right: -96, bottom: -96, width: 420 }} />
      </>
    }
  >
    <div className="flex h-full items-stretch" style={{ gap: 56 }}>
      {/* coluna texto — 908px */}
      <div className="flex flex-col justify-between" style={{ width: 908 }}>
        <div className="flex items-center gap-6" style={{ height: 40 }}>
          <img src={mytsLogo} alt="MyTS" style={{ height: 34, filter: "brightness(0) invert(1)" }} />
          <span className="bg-primary-foreground/20" style={{ width: 1, height: 26 }} />
          <span
            className="font-mono uppercase text-primary-foreground/60"
            style={{ fontSize: T.mono, letterSpacing: "0.24em" }}
          >
            Groundd · RAMO
          </span>
        </div>

        <div>
          <h1
            className="font-display font-black tracking-tight text-primary-foreground"
            style={{ fontSize: T.hero, lineHeight: 1.02 }}
          >
            O impacto já existe.
            <br />
            <span className="text-gradient">O reconhecimento ainda não.</span>
          </h1>

          <p
            className="text-primary-foreground/75"
            style={{ fontSize: T.lead, lineHeight: 1.55, marginTop: 28, maxWidth: 860 }}
          >
            Existem milhares de produtores, cooperativas e comunidades tradicionais que já fazem o
            trabalho certo. Preservam territórios. Produzem alimentos. Mantêm conhecimentos que
            sustentam cadeias inteiras.
          </p>
          <p
            className="text-primary-foreground/75"
            style={{ fontSize: T.lead, lineHeight: 1.55, marginTop: 16, maxWidth: 860 }}
          >
            O que falta não é capacidade. Falta uma{" "}
            <strong className="font-bold text-primary-foreground">infraestrutura</strong> que
            transforme esse impacto em reconhecimento, acesso ao mercado e geração de valor.
          </p>

          <p
            className="border-l-4 border-accent-glow font-display italic text-accent-glow"
            style={{ fontSize: 27, lineHeight: 1.3, paddingLeft: 22, marginTop: 30, maxWidth: 860 }}
          >
            É essa infraestrutura que conecta quem produz valor a quem busca gerar impacto.
          </p>
        </div>

        <div className="flex flex-wrap" style={{ gap: 12 }}>
          <Chip light>Produtores</Chip>
          <Chip light>Cooperativas</Chip>
          <Chip light>Comunidades tradicionais</Chip>
        </div>
      </div>

      {/* foto — 508px */}
      <PhotoSlot
        src={produtorImg}
        alt="Produtor em seu território"
        caption="Quem sustenta as cadeias"
        light
        className="border border-primary-foreground/10"
        style={{ width: 508, height: 772, flexShrink: 0 }}
      />
    </div>
  </Slide>
);

/* ---------- 02 · O problema ---------- */
const S02Problema = () => (
  <Slide bg="bg-background" decor={<MytsWatermark style={{ left: -80, bottom: -80, width: 320 }} />}>
    <div className="flex h-full flex-col">
      <SectionLabel n="02" label="O PROBLEMA" />

      {/* cabeçalho — 168px */}
      <div className="flex items-start" style={{ gap: 48, height: 168, marginTop: 24 }}>
        <h2
          className="font-display font-black tracking-tight text-primary"
          style={{ fontSize: T.title, lineHeight: 1.06, width: 780, flexShrink: 0 }}
        >
          O mercado já reconhece o valor da floresta.{" "}
          <span className="text-gradient">Ainda falta reconhecer o valor de quem a mantém em pé.</span>
        </h2>
        <div className="flex-1 text-muted-foreground" style={{ fontSize: T.small, lineHeight: 1.6 }}>
          <p>
            Os produtores não precisam aprender a produzir melhor — eles já sabem. O que falta é a
            estrutura que permite ao mercado enxergar, comprovar e remunerar esse valor.
          </p>
          <p style={{ marginTop: 12 }}>
            Sem comprovação de origem, sem documentação, sem histórico organizado, produtores,
            cooperativas e associações ficam fora das cadeias que mais pagam — enquanto empresas
            enfrentam pressão regulatória crescente por rastreabilidade real.
          </p>
        </div>
      </div>

      {/* corpo — 396px */}
      <div className="flex items-stretch" style={{ gap: 24, height: 372, marginTop: 28 }}>
        <PhotoSlot hint="Foto de produtor" style={{ width: 240, flexShrink: 0 }} />

        <div className="min-w-0 flex-1">
          <GapDiagram />
        </div>

        <div
          className="flex flex-col justify-center rounded-3xl bg-primary text-primary-foreground shadow-elegant"
          style={{ width: 300, flexShrink: 0, padding: 32 }}
        >
          <div className="font-display font-black text-accent-glow" style={{ fontSize: 86, lineHeight: 1 }}>
            77%
          </div>
          <p className="font-semibold" style={{ fontSize: T.body, lineHeight: 1.4, marginTop: 18 }}>
            dos estabelecimentos rurais brasileiros pertencem à agricultura familiar.
          </p>
          <span className="text-primary-foreground/50" style={{ fontSize: T.mono, marginTop: 12 }}>
            Censo Agropecuário IBGE
          </span>
        </div>
      </div>

      {/* rodapé — 88px */}
      <div
        className="flex items-center rounded-2xl border border-accent/25 bg-accent/5"
        style={{ height: 108, marginTop: 24, padding: "0 36px" }}
      >
        <p className="font-display font-bold text-primary" style={{ fontSize: 26, lineHeight: 1.3 }}>
          É um gap estrutural dos dois lados. E ele não se resolve com boa vontade —{" "}
          <span className="text-accent">se resolve com infraestrutura.</span>
        </p>
      </div>
    </div>
  </Slide>
);

/* ---------- 03 · A infraestrutura invisível ---------- */
const S03Infraestrutura = () => {
  const camadas = [
    {
      icon: Users,
      nome: "Groundd",
      texto: "Mobiliza pessoas, fortalece comunidades e desenvolve capacidades no território.",
    },
    {
      icon: Satellite,
      nome: "RAMO",
      texto: "Transforma o território em evidências verificáveis por meio de inteligência geoespacial.",
    },
    {
      icon: Network,
      nome: "MyTS",
      texto:
        "Conecta pessoas, evidências e mercado em uma infraestrutura digital de confiança, governança e rastreabilidade.",
    },
  ];
  const viabiliza = [
    "Desenvolvimento de produtores, cooperativas e associações",
    "Evidências auditáveis de origem e impacto",
    "Preparação para mercados exigentes",
    "Passaporte Digital e conexão com compradores",
  ];
  return (
    <Slide
      bg="bg-hero"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <MytsWatermark style={{ right: -80, top: 40, width: 340 }} />
        </>
      }
    >
      <div className="flex h-full flex-col">
        <SectionLabel n="03" label="O QUE É" light />

        {/* cabeçalho — 160px */}
        <div className="flex items-start" style={{ gap: 48, height: 160, marginTop: 24 }}>
          <h2
            className="font-display font-black tracking-tight text-primary-foreground"
            style={{ fontSize: T.title, lineHeight: 1.06, width: 700, flexShrink: 0 }}
          >
            A infraestrutura <span className="text-gradient">invisível</span> das cadeias sustentáveis
          </h2>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap" style={{ gap: 10 }}>
              {["Não é um software", "Não é uma consultoria", "Não é uma auditoria"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary-foreground/15 font-semibold text-primary-foreground/45 line-through decoration-destructive/70"
                  style={{ fontSize: T.small, padding: "8px 18px", whiteSpace: "nowrap" }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p
              className="text-primary-foreground/75"
              style={{ fontSize: T.body, lineHeight: 1.55, marginTop: 16 }}
            >
              É a infraestrutura que ninguém vê, mas que permite que produtores, cooperativas,
              empresas e investidores confiem nas mesmas informações — e gerem valor a partir delas.
            </p>
          </div>
        </div>

        {/* corpo — 560px */}
        <div className="flex items-stretch" style={{ gap: 28, height: 560, marginTop: 28 }}>
          <div className="relative flex flex-1 flex-col" style={{ gap: 18 }}>
            <div
              className="absolute bg-gradient-to-b from-accent-glow/60 to-accent/10"
              style={{ left: 46, top: 30, bottom: 130, width: 1 }}
            />
            {camadas.map((c) => (
              <div
                key={c.nome}
                className="relative flex flex-1 items-center rounded-2xl border border-primary-foreground/12 bg-primary-foreground/[0.06] backdrop-blur"
                style={{ gap: 22, padding: "0 26px" }}
              >
                <div
                  className="grid shrink-0 place-items-center rounded-2xl bg-gradient-accent shadow-glow"
                  style={{ width: 72, height: 72 }}
                >
                  <c.icon style={{ width: 34, height: 34 }} className="text-accent-foreground" />
                </div>
                <div className="min-w-0">
                  <span
                    className="font-display font-black text-primary-foreground"
                    style={{ fontSize: 28 }}
                  >
                    {c.nome}
                  </span>
                  <p
                    className="text-primary-foreground/70"
                    style={{ fontSize: T.body, lineHeight: 1.45, marginTop: 6 }}
                  >
                    {c.texto}
                  </p>
                </div>
              </div>
            ))}
            <p
              className="relative flex items-center rounded-2xl bg-gradient-accent font-display font-bold text-accent-foreground"
              style={{ fontSize: 23, lineHeight: 1.3, padding: "0 28px", height: 104, flexShrink: 0 }}
            >
              Juntas, essas capacidades transformam impacto local em oportunidades de mercado.
            </p>
          </div>

          <div
            className="flex flex-col rounded-3xl border border-accent-glow/30 bg-primary-foreground/[0.07] backdrop-blur"
            style={{ width: 470, flexShrink: 0, padding: 32 }}
          >
            <div className="flex items-center gap-3 text-accent-glow">
              <ShieldCheck style={{ width: 24, height: 24, flexShrink: 0 }} />
              <span className="font-mono uppercase" style={{ fontSize: T.mono, letterSpacing: "0.18em" }}>
                O que sua organização viabiliza
              </span>
            </div>
            <ul className="flex flex-1 flex-col justify-center" style={{ gap: 22, marginTop: 24 }}>
              {viabiliza.map((v) => (
                <li key={v} className="flex items-start" style={{ gap: 14 }}>
                  <span
                    className="grid shrink-0 place-items-center rounded-full bg-accent-glow/15"
                    style={{ width: 30, height: 30, marginTop: 2 }}
                  >
                    <Check style={{ width: 18, height: 18 }} className="text-accent-glow" />
                  </span>
                  <span
                    className="font-semibold text-primary-foreground"
                    style={{ fontSize: T.body, lineHeight: 1.4 }}
                  >
                    {v}
                  </span>
                </li>
              ))}
            </ul>
            <PhotoSlot hint="Foto de cooperativa" light style={{ height: 130, marginTop: 24, flexShrink: 0 }} />
          </div>
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 04 · Ciclo virtuoso ---------- */
const S04Ciclo = () => (
  <Slide bg="bg-background" decor={<MytsWatermark style={{ left: -96, top: -64, width: 320 }} />}>
    <div className="flex h-full flex-col">
      <SectionLabel n="04" label="O CICLO VIRTUOSO" />

      <div className="flex items-stretch" style={{ gap: 40, height: 724, marginTop: 24 }}>
        <div className="flex flex-1 items-center justify-center">
          <CicloVirtuoso width={800} />
        </div>

        <div className="flex flex-col justify-between" style={{ width: 500, flexShrink: 0 }}>
          <h2
            className="font-display font-black tracking-tight text-primary"
            style={{ fontSize: 38, lineHeight: 1.08 }}
          >
            Impacto social, conservação e desenvolvimento econômico{" "}
            <span className="text-gradient">deixam de competir e passam a crescer juntos.</span>
          </h2>

          <div className="flex flex-col" style={{ gap: 14 }}>
            {[
              { icon: Sprout, t: "Produtor fortalecido gera mais renda" },
              { icon: TreePine, t: "Renda sustenta territórios preservados" },
              { icon: Coins, t: "Confiança atrai novos investimentos" },
            ].map((i) => (
              <div
                key={i.t}
                className="flex items-center rounded-2xl border border-border bg-card shadow-card"
                style={{ gap: 16, padding: "20px 24px" }}
              >
                <i.icon style={{ width: 28, height: 28, flexShrink: 0 }} className="text-accent" />
                <span className="font-semibold text-primary" style={{ fontSize: T.body, lineHeight: 1.35 }}>
                  {i.t}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-primary" style={{ padding: 28 }}>
            <span
              className="font-mono uppercase text-accent-glow"
              style={{ fontSize: T.mono, letterSpacing: "0.2em" }}
            >
              Modelo já validado
            </span>
            <div className="flex items-center" style={{ gap: 36, marginTop: 18 }}>
              <PartnerLogo src={korinAsset.url} alt="Korin" height={34} />
              <PartnerLogo src={carrefourAsset.url} alt="Carrefour" height={34} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 05 · Oportunidade estratégica ---------- */
const S05Oportunidade = () => {
  const blocos = [
    {
      icon: Sprout,
      titulo: "Para quem produz",
      itens: ["Mais renda", "Mais autonomia", "Mais acesso a oportunidades de mercado"],
    },
    {
      icon: TreePine,
      titulo: "Para o território",
      itens: ["Mais conservação", "Mais desenvolvimento local", "Mais valorização da sociobiodiversidade"],
    },
    {
      icon: Building2,
      titulo: "Para sua empresa",
      itens: ["Fornecedores preparados", "Impacto comprovado", "Menor risco regulatório"],
    },
    {
      icon: Landmark,
      titulo: "Para investidores",
      itens: ["Ecossistema estruturado", "Impacto em métricas verificáveis", "Rastreabilidade auditável"],
    },
  ];
  return (
    <Slide
      bg="bg-hero"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <MytsWatermark style={{ right: -96, bottom: -80, width: 380 }} />
        </>
      }
    >
      <div className="flex h-full flex-col">
        <SectionLabel n="05" label="POR QUE É ESTRATÉGICO" light />

        {/* título — 104px */}
        <h2
          className="font-display font-black tracking-tight text-primary-foreground"
          style={{ fontSize: T.title, lineHeight: 1.08, height: 108, maxWidth: 1180, marginTop: 22 }}
        >
          Investir nessa infraestrutura significa{" "}
          <span className="text-gradient">fortalecer todos os elos da cadeia ao mesmo tempo.</span>
        </h2>

        {/* cards — 384px */}
        <div className="grid grid-cols-4" style={{ gap: 22, height: 430, marginTop: 24 }}>
          {blocos.map((b) => (
            <div
              key={b.titulo}
              className="flex flex-col rounded-3xl border border-primary-foreground/12 bg-primary-foreground/[0.06] backdrop-blur"
              style={{ padding: 28 }}
            >
              <div
                className="grid place-items-center rounded-2xl bg-gradient-accent shadow-glow"
                style={{ width: 64, height: 64 }}
              >
                <b.icon style={{ width: 32, height: 32 }} className="text-accent-foreground" />
              </div>
              <h3
                className="font-display font-black leading-tight text-primary-foreground"
                style={{ fontSize: 25, marginTop: 20 }}
              >
                {b.titulo}
              </h3>
              <ul className="flex flex-1 flex-col justify-evenly" style={{ gap: 12, marginTop: 18 }}>
                {b.itens.map((i) => (
                  <li key={i} className="flex items-start" style={{ gap: 10 }}>
                    <Check style={{ width: 20, height: 20, flexShrink: 0, marginTop: 3 }} className="text-accent-glow" />
                    <span className="text-primary-foreground/80" style={{ fontSize: T.body, lineHeight: 1.4 }}>
                      {i}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* faixa do dado — 128px */}
        <div
          className="relative overflow-hidden rounded-3xl border border-accent-glow/25"
          style={{ height: 132, marginTop: 32 }}
        >
          <img src={territorioImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/75" />
          <div className="relative flex h-full items-center" style={{ gap: 36, padding: "0 36px" }}>
            <span
              className="font-display font-black text-accent-glow"
              style={{ fontSize: 58, lineHeight: 1, whiteSpace: "nowrap" }}
            >
              US$ 1,5 tri
            </span>
            <div className="bg-primary-foreground/20" style={{ width: 1, height: 56 }} />
            <p
              className="font-semibold text-primary-foreground"
              style={{ fontSize: T.lead, lineHeight: 1.4, maxWidth: 780 }}
            >
              em fundos de impacto já exigem evidências verificáveis para investir.
              <span className="font-normal text-primary-foreground/50" style={{ marginLeft: 12 }}>
                GIIN, 2024
              </span>
            </p>
            <TrendingUp style={{ width: 48, height: 48, marginLeft: "auto" }} className="text-accent-glow/60" />
          </div>
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 06 · Convite ---------- */
const S06Convite = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 bg-glow" />
        <MytsWatermark style={{ left: -96, bottom: -96, width: 420 }} />
      </>
    }
  >
    <div className="flex h-full items-stretch" style={{ gap: 56 }}>
      <div className="flex flex-col justify-between" style={{ width: 916 }}>
        <SectionLabel n="06" label="CONVITE" light />

        <div>
          <h2
            className="font-display font-black tracking-tight text-primary-foreground"
            style={{ fontSize: 54, lineHeight: 1.04 }}
          >
            Transformar impacto invisível em <span className="text-gradient">valor reconhecido</span> é
            o primeiro passo para construir as cadeias que o futuro exige.
          </h2>

          <p
            className="text-primary-foreground/75"
            style={{ fontSize: T.lead, lineHeight: 1.55, marginTop: 28, maxWidth: 860 }}
          >
            Os produtores, cooperativas e comunidades já fazem sua parte. O próximo passo depende de
            organizações dispostas a investir na ponte que falta.
          </p>

          <div
            className="inline-flex w-fit items-center rounded-full bg-gradient-accent shadow-cta"
            style={{ gap: 16, padding: "18px 34px", marginTop: 32 }}
          >
            <Handshake style={{ width: 28, height: 28 }} className="text-accent-foreground" />
            <span className="font-display font-black text-accent-foreground" style={{ fontSize: 24 }}>
              Vamos construir essa transformação juntos.
            </span>
            <ArrowRight style={{ width: 24, height: 24 }} className="text-accent-foreground" />
          </div>
        </div>

        <div className="flex items-center" style={{ gap: 32, height: 40 }}>
          <a
            href="mailto:valmir@myt-s.com"
            className="flex items-center gap-3 font-semibold text-primary-foreground/85 hover:text-primary-foreground"
            style={{ fontSize: T.body }}
          >
            <Mail style={{ width: 24, height: 24 }} className="text-accent-glow" /> valmir@myt-s.com
          </a>
          <span className="bg-primary-foreground/20" style={{ width: 1, height: 24 }} />
          <a
            href="https://myt-s.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-semibold text-primary-foreground/85 hover:text-primary-foreground"
            style={{ fontSize: T.body }}
          >
            <Globe style={{ width: 24, height: 24 }} className="text-accent-glow" /> myt-s.com
          </a>
        </div>
      </div>

      <div className="flex flex-col" style={{ width: 500, flexShrink: 0, gap: 24 }}>
        <PhotoSlot hint="Foto de comunidade · vertical" light style={{ height: 592 }} />
        <div
          className="rounded-3xl border border-primary-foreground/12 bg-primary-foreground/[0.06] backdrop-blur"
          style={{ height: 156, padding: 28 }}
        >
          <span
            className="font-mono uppercase text-primary-foreground/50"
            style={{ fontSize: T.mono, letterSpacing: "0.2em" }}
          >
            Consórcio
          </span>
          <div className="flex items-center" style={{ gap: 32, marginTop: 22 }}>
            <img src={mytsLogo} alt="MyTS" style={{ height: 28, filter: "brightness(0) invert(1)" }} />
            <PartnerLogo src={grounddAsset.url} alt="Groundd" height={28} />
            <PartnerLogo src={ramoAsset.url} alt="RAMO" height={28} />
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ============================================================
   Página
   ============================================================ */
const MytsPassaporte = () => {
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
      }
    `}</style>
    <Helmet>
      <title>MyTS — O impacto já existe. O reconhecimento ainda não.</title>
      <meta
        name="description"
        content="A infraestrutura que transforma o impacto de produtores, cooperativas e comunidades em reconhecimento, acesso ao mercado e geração de valor — MyTS, Groundd e RAMO."
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

    <S01Abertura />
    <S02Problema />
    <S03Infraestrutura />
    <S04Ciclo />
    <S05Oportunidade />
    <S06Convite />
  </main>
  );
};

export default MytsPassaporte;
