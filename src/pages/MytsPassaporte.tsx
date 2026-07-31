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
   Primitivos
   ============================================================ */
const PartnerLogo = ({
  src,
  alt,
  className = "h-8",
  variant = "light",
}: {
  src: string;
  alt: string;
  className?: string;
  variant?: "light" | "dark";
}) =>
  variant === "light" ? (
    <img
      src={src}
      alt={alt}
      className={`${className} w-auto object-contain`}
      style={{ filter: "brightness(0) invert(1)" }}
    />
  ) : (
    <img src={src} alt={alt} className={`${className} w-auto object-contain`} />
  );

const Chip = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span
    className={`inline-flex items-center gap-3 rounded-full border px-6 py-2.5 text-base font-semibold tracking-[0.18em] uppercase ${
      light
        ? "border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/80 backdrop-blur"
        : "border-accent/25 bg-accent/5 text-accent"
    }`}
  >
    {children}
  </span>
);

const SectionLabel = ({
  n,
  label,
  light = false,
}: {
  n: string;
  label: string;
  light?: boolean;
}) => (
  <div
    className={`flex items-center gap-4 text-base font-semibold uppercase tracking-[0.22em] ${
      light ? "text-accent-glow" : "text-accent"
    }`}
  >
    <span className="font-mono">{n}</span>
    <span className={`h-px w-16 ${light ? "bg-accent-glow/60" : "bg-accent/50"}`} />
    {label}
  </div>
);

const Slide = ({
  bg = "bg-background",
  className = "",
  children,
  decor,
  pad = "p-10 md:p-14",
}: {
  bg?: string;
  className?: string;
  children: React.ReactNode;
  decor?: React.ReactNode;
  pad?: string;
}) => (
  <section
    className={`${bg} relative ${className} slide-frame`}
    style={{
      width: "min(100%, calc((100vh - 64px) * 16 / 9))",
      aspectRatio: "16 / 9",
      margin: "0 auto",
      padding: 0,
      overflow: "hidden",
      borderRadius: 16,
      boxShadow: "0 30px 80px -20px rgba(0,0,0,0.55)",
      scrollSnapAlign: "center",
    }}
  >
    <div className="relative h-full w-full slide-inner">
      {decor}
      <div className={`relative h-full w-full flex flex-col ${pad}`}>{children}</div>
    </div>
  </section>
);

const MytsWatermark = ({ className = "" }: { className?: string }) => (
  <img
    src={mytsMark}
    alt=""
    aria-hidden
    className={`pointer-events-none select-none absolute opacity-[0.06] ${className}`}
  />
);

/* Slot de foto — recebe a imagem quando existir, senão mostra moldura tracejada */
const PhotoSlot = ({
  src,
  alt,
  caption,
  hint,
  className = "",
  imgClassName = "",
  light = false,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  hint?: string;
  className?: string;
  imgClassName?: string;
  light?: boolean;
}) => (
  <figure className={`relative overflow-hidden rounded-3xl ${className}`}>
    {src ? (
      <>
        <img src={src} alt={alt ?? ""} className={`h-full w-full object-cover ${imgClassName}`} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
      </>
    ) : (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl border-2 border-dashed p-3 ${
          light
            ? "border-primary-foreground/25 bg-primary-foreground/5"
            : "border-accent/30 bg-accent/5"
        }`}
      >
        <Camera
          className={`size-[clamp(18px,2vw,36px)] shrink-0 ${light ? "text-primary-foreground/50" : "text-accent/60"}`}
        />
        <span
          className={`text-center text-[clamp(9px,0.8vw,13px)] font-mono uppercase leading-tight tracking-[0.16em] ${
            light ? "text-primary-foreground/50" : "text-accent/70"
          }`}
        >
          {hint ?? "Foto a enviar"}
        </span>
      </div>

    )}
    {src && caption && (
      <figcaption className="absolute inset-x-0 bottom-0 p-6">
        <span className="text-lg font-display font-bold text-primary-foreground drop-shadow">
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
const GapDiagram = () => (
  <div className="relative flex h-full min-h-0 items-stretch gap-0">
    {/* margem esquerda */}
    <div className="flex min-w-0 flex-1 flex-col justify-center rounded-3xl border border-border bg-card p-[4%] shadow-card">
      <div className="flex items-center gap-3 text-accent">
        <Sprout className="size-[clamp(16px,1.5vw,26px)]" />
        <span className="text-[clamp(10px,0.85vw,13px)] font-mono uppercase tracking-[0.2em]">
          Quem produz
        </span>
      </div>
      <p className="mt-3 text-[clamp(13px,1.2vw,19px)] font-display font-bold leading-tight text-primary">
        Produtores, cooperativas e associações
      </p>
      <ul className="mt-3 space-y-1.5 text-[clamp(11px,0.95vw,15px)] leading-snug text-muted-foreground">
        <li>· Boas práticas já existentes</li>
        <li>· Sem comprovação de origem</li>
        <li>· Sem histórico organizado</li>
      </ul>
    </div>

    {/* vão */}
    <div className="relative w-[14%] min-w-[84px] shrink-0">
      <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-destructive/40" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-center">
        <span className="block text-[clamp(9px,0.8vw,12px)] font-mono uppercase tracking-[0.16em] text-destructive">
          Gap
        </span>
        <span className="block text-[clamp(9px,0.8vw,12px)] font-semibold text-destructive/80">
          estrutural
        </span>
      </div>
    </div>

    {/* margem direita */}
    <div className="flex min-w-0 flex-1 flex-col justify-center rounded-3xl border border-border bg-card p-[4%] shadow-card">
      <div className="flex items-center gap-3 text-accent">
        <Building2 className="size-[clamp(16px,1.5vw,26px)]" />
        <span className="text-[clamp(10px,0.85vw,13px)] font-mono uppercase tracking-[0.2em]">
          Quem compra
        </span>
      </div>
      <p className="mt-3 text-[clamp(13px,1.2vw,19px)] font-display font-bold leading-tight text-primary">
        Empresas, varejo e mercados exigentes
      </p>
      <ul className="mt-3 space-y-1.5 text-[clamp(11px,0.95vw,15px)] leading-snug text-muted-foreground">
        <li>· Pressão regulatória crescente</li>
        <li>· Precisam de rastreabilidade real</li>
        <li>· Não enxergam a base da cadeia</li>
      </ul>
    </div>
  </div>
);


/* Slide 04 — ciclo virtuoso */
const CicloVirtuoso = () => {
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
  const cx = 480;
  const cy = 360;
  const r = 250;
  return (
    <svg
      viewBox="0 0 960 720"
      className="h-full w-full"
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

      <circle cx={cx} cy={cy} r={r + 60} fill="url(#coreGlow)" />
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

      {/* núcleo */}
      <circle cx={cx} cy={cy} r="120" fill="hsl(222 65% 14%)" stroke="hsl(214 95% 54%)" strokeWidth="3" />
      <text
        x={cx}
        y={cy - 18}
        textAnchor="middle"
        fill="hsl(199 95% 60%)"
        fontSize="15"
        fontWeight="700"
        letterSpacing="3"
        fontFamily="Rubik, sans-serif"
      >
        CENTRO
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#fff" fontSize="27" fontWeight="800" fontFamily="Rubik, sans-serif">
        Valor
      </text>
      <text x={cx} y={cy + 46} textAnchor="middle" fill="#fff" fontSize="25" fontWeight="800" fontFamily="Rubik, sans-serif">
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
        return (
          <g key={n}>
            <circle cx={x} cy={y} r="16" fill="hsl(214 95% 54%)" stroke="#fff" strokeWidth="4" />
            <text
              x={x}
              y={y - 26 - (lines.length - 1) * 20}
              textAnchor="middle"
              fill="hsl(222 65% 14%)"
              fontSize="19"
              fontWeight="700"
              fontFamily="Rubik, sans-serif"
            >
              {lines.map((l, li) => (
                <tspan key={l} x={x} dy={li === 0 ? 0 : 22}>
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

/* ---------- 01 · Abertura ---------- */
const S01Abertura = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <MytsWatermark className="-right-24 -bottom-24 w-[420px]" />
      </>
    }
  >
    <div className="flex h-full min-h-0 items-stretch gap-10">
      <div className="flex min-h-0 flex-[1.35] flex-col justify-between py-1">
        <div className="flex items-center gap-6">
          <img src={mytsLogo} alt="MyTS" className="h-10 [filter:brightness(0)_invert(1)]" />
          <span className="h-7 w-px bg-primary-foreground/20" />
          <span className="text-xs font-mono uppercase tracking-[0.24em] text-primary-foreground/60">
            Groundd · RAMO
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[clamp(38px,3.6vw,58px)] font-black leading-[1.02] tracking-tight text-primary-foreground">
            O impacto já existe.
            <br />
            <span className="text-gradient">O reconhecimento ainda não.</span>
          </h1>

          <div className="flex flex-col gap-3">
            <p className="max-w-[760px] text-[clamp(13px,1.15vw,17px)] leading-relaxed text-primary-foreground/75">
              Existem milhares de produtores, cooperativas e comunidades tradicionais que já fazem o
              trabalho certo. Preservam territórios. Produzem alimentos. Mantêm conhecimentos que
              sustentam cadeias inteiras.
            </p>
            <p className="max-w-[760px] text-[clamp(13px,1.15vw,17px)] leading-relaxed text-primary-foreground/75">
              O que falta não é capacidade. Falta uma{" "}
              <strong className="font-bold text-primary-foreground">infraestrutura</strong> que
              transforme esse impacto em reconhecimento, acesso ao mercado e geração de valor.
            </p>
          </div>

          <p className="border-l-4 border-accent-glow pl-5 font-display text-[clamp(15px,1.5vw,22px)] italic leading-snug text-accent-glow">
            É essa infraestrutura que conecta quem produz valor a quem busca gerar impacto.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Chip light>Produtores</Chip>
          <Chip light>Cooperativas</Chip>
          <Chip light>Comunidades tradicionais</Chip>
        </div>
      </div>

      <PhotoSlot
        src={produtorImg}
        alt="Produtor em seu território"
        caption="Quem sustenta as cadeias"
        light
        className="h-full w-[32%] shrink-0 self-stretch border border-primary-foreground/10"
      />
    </div>

  </Slide>
);

/* ---------- 02 · O problema ---------- */
const S02Problema = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-left-20 -bottom-20 w-[320px]" />}>
    <div className="flex h-full min-h-0 flex-col gap-[2.2%]">
      <SectionLabel n="02" label="O PROBLEMA" />

      <div className="flex items-start gap-8">
        <h2 className="max-w-[60%] font-display text-[clamp(24px,2.6vw,42px)] font-black leading-[1.05] tracking-tight text-primary">
          O mercado já reconhece o valor da floresta.{" "}
          <span className="text-gradient">Ainda falta reconhecer o valor de quem a mantém em pé.</span>
        </h2>
        <div className="flex-1 space-y-3 text-[clamp(12px,1.05vw,16px)] leading-relaxed text-muted-foreground">
          <p>
            Os produtores não precisam aprender a produzir melhor — eles já sabem. O que falta é a
            estrutura que permite ao mercado enxergar, comprovar e remunerar esse valor.
          </p>
          <p>
            Sem comprovação de origem, sem documentação, sem histórico organizado, produtores,
            cooperativas e associações ficam fora das cadeias que mais pagam — enquanto empresas
            enfrentam pressão regulatória crescente por rastreabilidade real.
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-stretch gap-6">
        <PhotoSlot hint="Foto de produtor" className="w-[20%] shrink-0" />

        <div className="min-w-0 flex-1">
          <GapDiagram />
        </div>

        <div className="flex w-[19%] shrink-0 flex-col justify-center rounded-3xl bg-primary p-6 text-primary-foreground shadow-elegant">
          <div className="font-display text-[clamp(40px,4.6vw,72px)] font-black leading-none text-accent-glow">
            77%
          </div>
          <p className="mt-3 text-[clamp(12px,1.05vw,16px)] font-semibold leading-snug">
            dos estabelecimentos rurais brasileiros pertencem à agricultura familiar.
          </p>
          <span className="mt-2 text-[clamp(10px,0.85vw,13px)] text-primary-foreground/50">
            Censo Agropecuário IBGE
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-accent/25 bg-accent/5 px-7 py-[1.6%]">
        <p className="font-display text-[clamp(15px,1.55vw,24px)] font-bold leading-snug text-primary">
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
      logo: grounddAsset.url,
      nome: "Groundd",
      texto: "Mobiliza pessoas, fortalece comunidades e desenvolve capacidades no território.",
    },
    {
      icon: Satellite,
      logo: ramoAsset.url,
      nome: "RAMO",
      texto: "Transforma o território em evidências verificáveis por meio de inteligência geoespacial.",
    },
    {
      icon: Network,
      logo: null,
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
          <MytsWatermark className="-right-20 top-10 w-[340px]" />
        </>
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-[2.2%]">
        <SectionLabel n="03" label="O QUE É" light />

        <div className="flex items-start gap-8">
          <h2 className="max-w-[52%] font-display text-[clamp(24px,2.6vw,42px)] font-black leading-[1.05] tracking-tight text-primary-foreground">
            A infraestrutura <span className="text-gradient">invisível</span> das cadeias
            sustentáveis
          </h2>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2">
              {["Não é um software", "Não é uma consultoria", "Não é uma auditoria"].map((t) => (
                <span
                  key={t}
                  className="whitespace-nowrap rounded-full border border-primary-foreground/15 px-4 py-1.5 text-[clamp(11px,0.95vw,15px)] font-semibold text-primary-foreground/45 line-through decoration-destructive/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[clamp(12px,1.05vw,17px)] leading-relaxed text-primary-foreground/75">
              É a infraestrutura que ninguém vê, mas que permite que produtores, cooperativas,
              empresas e investidores confiem nas mesmas informações — e gerem valor a partir delas.
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-stretch gap-6">
          <div className="relative flex min-w-0 flex-[1.4] flex-col justify-between gap-[2%]">
            <div className="absolute left-[5%] top-[8%] bottom-[26%] w-px bg-gradient-to-b from-accent-glow/60 to-accent/10" />
            {camadas.map((c) => (
              <div
                key={c.nome}
                className="relative flex min-h-0 flex-1 items-center gap-5 rounded-2xl border border-primary-foreground/12 bg-primary-foreground/[0.06] px-5 py-[2%] backdrop-blur"
              >
                <div className="grid aspect-square w-[clamp(44px,4.4vw,72px)] shrink-0 place-items-center rounded-2xl bg-gradient-accent shadow-glow">
                  <c.icon className="size-[clamp(20px,2vw,34px)] text-accent-foreground" />
                </div>
                <div className="min-w-0">
                  <span className="font-display text-[clamp(17px,1.7vw,27px)] font-black text-primary-foreground">
                    {c.nome}
                  </span>
                  <p className="mt-1 text-[clamp(11px,1vw,16px)] leading-snug text-primary-foreground/70">
                    {c.texto}
                  </p>
                </div>
              </div>
            ))}
            <p className="relative rounded-2xl bg-gradient-accent px-6 py-[1.8%] font-display text-[clamp(13px,1.35vw,21px)] font-bold leading-snug text-accent-foreground">
              Juntas, essas capacidades transformam impacto local em oportunidades de mercado.
            </p>
          </div>

          <div className="flex w-[34%] shrink-0 flex-col rounded-3xl border border-accent-glow/30 bg-primary-foreground/[0.07] p-[3%] backdrop-blur">
            <div className="flex items-center gap-3 text-accent-glow">
              <ShieldCheck className="size-[clamp(16px,1.5vw,26px)] shrink-0" />
              <span className="text-[clamp(10px,0.85vw,13px)] font-mono uppercase tracking-[0.2em]">
                O que sua organização viabiliza
              </span>
            </div>
            <ul className="mt-[4%] flex min-h-0 flex-1 flex-col justify-center gap-[4%]">
              {viabiliza.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-[clamp(20px,1.9vw,30px)] shrink-0 place-items-center rounded-full bg-accent-glow/15">
                    <Check className="size-[clamp(12px,1.1vw,18px)] text-accent-glow" />
                  </span>
                  <span className="text-[clamp(12px,1.15vw,18px)] font-semibold leading-snug text-primary-foreground">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
            <PhotoSlot
              hint="Foto de cooperativa"
              light
              className="mt-[4%] h-[18%] min-h-[64px] w-full shrink-0"
            />
          </div>
        </div>
      </div>

    </Slide>
  );
};

/* ---------- 04 · Ciclo virtuoso ---------- */
const S04Ciclo = () => (
  <Slide bg="bg-background" decor={<MytsWatermark className="-left-24 -top-16 w-[320px]" />}>
    <div className="flex h-full min-h-0 flex-col">
      <SectionLabel n="04" label="O CICLO VIRTUOSO" />

      <div className="mt-[2%] flex min-h-0 flex-1 items-stretch gap-[3%]">
        <div className="flex min-h-0 flex-[1.4] items-center justify-center">
          <CicloVirtuoso />
        </div>

        <div className="flex w-[34%] min-h-0 shrink-0 flex-col justify-between gap-[4%] py-[1%]">
          <h2 className="font-display text-[clamp(20px,2.2vw,38px)] font-black leading-[1.06] tracking-tight text-primary">
            Impacto social, conservação e desenvolvimento econômico{" "}
            <span className="text-gradient">deixam de competir e passam a crescer juntos.</span>
          </h2>

          <div className="flex flex-col gap-[3%]">
            {[
              { icon: Sprout, t: "Produtor fortalecido gera mais renda" },
              { icon: TreePine, t: "Renda sustenta territórios preservados" },
              { icon: Coins, t: "Confiança atrai novos investimentos" },
            ].map((i) => (
              <div
                key={i.t}
                className="flex items-center gap-[3%] rounded-2xl border border-border bg-card px-[5%] py-[3%] shadow-card"
              >
                <i.icon className="size-[clamp(16px,1.6vw,28px)] shrink-0 text-accent" />
                <span className="text-[clamp(11px,1.1vw,17px)] font-semibold leading-snug text-primary">{i.t}</span>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-primary p-[5%]">
            <span className="text-[clamp(9px,0.8vw,13px)] font-mono uppercase tracking-[0.2em] text-accent-glow">
              Modelo já validado
            </span>
            <div className="mt-[6%] flex items-center gap-[8%]">
              <PartnerLogo src={korinAsset.url} alt="Korin" className="h-[clamp(20px,2vw,36px)]" />
              <PartnerLogo src={carrefourAsset.url} alt="Carrefour" className="h-[clamp(20px,2vw,36px)]" />
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
          <MytsWatermark className="-right-24 -bottom-20 w-[380px]" />
        </>
      }
    >
      <div className="flex h-full flex-col">
        <SectionLabel n="05" label="POR QUE É ESTRATÉGICO" light />

        <h2 className="mt-6 max-w-[78%] font-display text-[44px] font-black leading-[1.04] tracking-tight text-primary-foreground">
          Investir nessa infraestrutura significa{" "}
          <span className="text-gradient">fortalecer todos os elos da cadeia ao mesmo tempo.</span>
        </h2>

        <div className="mt-8 grid flex-1 grid-cols-4 gap-5">
          {blocos.map((b) => (
            <div
              key={b.titulo}
              className="flex flex-col justify-center rounded-3xl border border-primary-foreground/12 bg-primary-foreground/[0.06] p-8 backdrop-blur"
            >
              <div className="grid size-[76px] place-items-center rounded-2xl bg-gradient-accent shadow-glow">
                <b.icon className="size-9 text-accent-foreground" />
              </div>
              <h3 className="mt-6 font-display text-[27px] font-black leading-tight text-primary-foreground">
                {b.titulo}
              </h3>
              <ul className="mt-5 space-y-4">
                {b.itens.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-1 size-6 shrink-0 text-accent-glow" />
                    <span className="text-[19px] leading-snug text-primary-foreground/80">{i}</span>
                  </li>
                ))}

              </ul>
            </div>
          ))}
        </div>

        <div className="relative mt-7 overflow-hidden rounded-3xl border border-accent-glow/25">
          <img
            src={territorioImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary/75" />
          <div className="relative flex items-center gap-10 px-9 py-7">
            <span className="font-display text-[62px] font-black leading-none text-accent-glow">
              US$ 1,5 tri
            </span>
            <div className="h-14 w-px bg-primary-foreground/20" />
            <p className="max-w-[720px] text-[19px] font-semibold leading-snug text-primary-foreground">
              em fundos de impacto já exigem evidências verificáveis para investir.
              <span className="ml-3 font-normal text-primary-foreground/50">GIIN, 2024</span>
            </p>
            <TrendingUp className="ml-auto size-12 text-accent-glow/60" />
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
        <MytsWatermark className="-left-24 -bottom-24 w-[420px]" />
      </>
    }
  >
    <div className="flex h-full items-stretch gap-12">
      <div className="flex flex-[1.5] flex-col">
        <SectionLabel n="06" label="CONVITE" light />

        <h2 className="mt-auto font-display text-[58px] font-black leading-[1.0] tracking-tight text-primary-foreground">
          Transformar impacto invisível em{" "}
          <span className="text-gradient">valor reconhecido</span> é o primeiro passo para construir
          as cadeias que o futuro exige.
        </h2>

        <p className="mt-8 max-w-[860px] text-[21px] leading-relaxed text-primary-foreground/75">
          Os produtores, cooperativas e comunidades já fazem sua parte. O próximo passo depende de
          organizações dispostas a investir na ponte que falta.
        </p>

        <div className="mt-8 inline-flex w-fit items-center gap-4 rounded-full bg-gradient-accent px-9 py-5 shadow-cta">
          <Handshake className="size-7 text-accent-foreground" />
          <span className="font-display text-[24px] font-black text-accent-foreground">
            Vamos construir essa transformação juntos.
          </span>
          <ArrowRight className="size-6 text-accent-foreground" />
        </div>

        <div className="mt-auto flex items-center gap-8">
          <a
            href="mailto:valmir@myt-s.com"
            className="flex items-center gap-3 text-[19px] font-semibold text-primary-foreground/85 hover:text-primary-foreground"
          >
            <Mail className="size-6 text-accent-glow" /> valmir@myt-s.com
          </a>
          <span className="h-6 w-px bg-primary-foreground/20" />
          <a
            href="https://myt-s.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[19px] font-semibold text-primary-foreground/85 hover:text-primary-foreground"
          >
            <Globe className="size-6 text-accent-glow" /> myt-s.com
          </a>
        </div>
      </div>

      <div className="flex w-[32%] shrink-0 flex-col gap-6">
        <PhotoSlot
          hint="Foto de comunidade · vertical"
          light
          className="flex-1"
        />
        <div className="rounded-3xl border border-primary-foreground/12 bg-primary-foreground/[0.06] p-7 backdrop-blur">
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-primary-foreground/50">
            Consórcio
          </span>
          <div className="mt-5 flex items-center gap-7">
            <img src={mytsLogo} alt="MyTS" className="h-7 [filter:brightness(0)_invert(1)]" />
            <PartnerLogo src={grounddAsset.url} alt="Groundd" className="h-7" />
            <PartnerLogo src={ramoAsset.url} alt="RAMO" className="h-7" />
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ============================================================
   Página
   ============================================================ */
const MytsPassaporte = () => (
  <main
    className="bg-[#0a0e1a]"
    style={{
      margin: 0,
      padding: "32px 0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      overflowX: "hidden",
    }}
  >
    <style>{`
      html,body,#root{margin:0;padding:0;background:#0a0e1a}
      html{scroll-snap-type:y proximity}
      .slide-frame{container-type:inline-size;container-name:slide}
      .slide-inner{overflow:hidden}
    `}</style>
    <Helmet>
      <title>MyTS — O impacto já existe. O reconhecimento ainda não.</title>
      <meta
        name="description"
        content="A infraestrutura que transforma o impacto de produtores, cooperativas e comunidades em reconhecimento, acesso ao mercado e geração de valor — MyTS, Groundd e RAMO."
      />
    </Helmet>
    <S01Abertura />
    <S02Problema />
    <S03Infraestrutura />
    <S04Ciclo />
    <S05Oportunidade />
    <S06Convite />
  </main>
);

export default MytsPassaporte;
