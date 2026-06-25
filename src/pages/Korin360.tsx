import { Helmet } from "react-helmet-async";
import {
  Sparkles,
  ArrowRight,
  ClipboardCheck,
  Layers,
  Link as LinkIcon,
  Package,
  Globe,
  MessageSquare,
  Newspaper,
  Smartphone,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2,
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Megaphone,
  Store,
  UserPlus,
  Mail,
  Boxes,
  QrCode,
  Eye,
} from "lucide-react";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import logoKorin from "@/assets/logos/korin.png.asset.json";
import imgVital from "@/assets/bench/vital.png.asset.json";
import imgCarrefourBC from "@/assets/bench/carrefour-blockchain.webp.asset.json";
import imgFrigol from "@/assets/bench/frigol.png.asset.json";
import imgCarrefourSabor from "@/assets/bench/carrefour-sabor.jpg.asset.json";
import imgMowi from "@/assets/bench/mowi.webp.asset.json";
import imgRewe from "@/assets/bench/rewe.webp.asset.json";
import imgLlet from "@/assets/bench/llet-nostra.jpg.asset.json";

/* -----------------------------------------------------------
   KORIN 360 — Transparência que aproxima — slides 16:9
   ----------------------------------------------------------- */

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/80">
    {children}
  </span>
);

const SectionLabel = ({ n, label, light = false }: { n: string; label: string; light?: boolean }) => (
  <div className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-accent-glow" : "text-accent"}`}>
    <span className="font-mono">{n}</span>
    <span className={`h-px w-10 ${light ? "bg-accent-glow/60" : "bg-accent/50"}`} />
    {label}
  </div>
);

const Slide = ({
  bg = "bg-background",
  className = "",
  children,
  decor,
  pad = "p-8 md:p-14",
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

/* ---------- 01 · HERO ---------- */
const Hero = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-glow opacity-60 pointer-events-none blur-3xl rounded-full" />
        <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
      </>
    }
  >
    <div className="flex h-full items-center gap-10">
      <div className="flex-1 min-w-0">
        <Chip>
          <Leaf className="size-3.5 text-accent-glow" />
          Case · Korin × MyTS
        </Chip>

        <h1 className="mt-6 font-display font-bold text-6xl md:text-8xl leading-[0.95] tracking-tight text-primary-foreground">
          Korin <span className="text-gradient">360</span>
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-primary-foreground/80 max-w-2xl leading-snug">
          Transparência que aproxima consumidores da{" "}
          <span className="text-accent-glow font-semibold">origem dos alimentos</span>.
        </p>

        <div className="mt-10 flex flex-wrap gap-2.5">
          {["Origem", "Sustentabilidade", "Bem-estar animal", "Transparência"].map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-5">
          <img src={logoKorin.url} alt="Korin" className="h-12 bg-white rounded-lg p-2" />
          <div className="h-10 w-px bg-primary-foreground/15" />
          <div className="text-primary-foreground/70 text-xs uppercase tracking-widest">
            Metodologia
          </div>
          <img src={mytsLogo} alt="MyTS" className="h-8 opacity-90" />
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 02 · SOBRE O PROJETO ---------- */
const Sobre = () => (
  <Slide
    bg="bg-background"
    decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
  >
    <SectionLabel n="01" label="Sobre o Projeto" />

    <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-[1.05] max-w-4xl">
      Tornando visível aquilo que sempre esteve na{" "}
      <span className="text-gradient">essência da Korin</span>
    </h2>

    <div className="mt-8 grid md:grid-cols-[1.4fr_1fr] gap-8 flex-1">
      <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        <p>
          Desde <span className="font-semibold text-primary">1994</span>, a Korin constrói uma cadeia produtiva baseada na
          Agricultura Natural, no respeito à natureza, no bem-estar animal e na valorização das pessoas que produzem os alimentos.
        </p>
        <p>
          O <span className="font-semibold text-primary">Projeto Korin 360</span> nasceu para transformar esses valores em uma
          experiência de transparência, permitindo que o consumidor conheça, de forma simples e confiável, a origem dos alimentos
          que chegam à sua mesa.
        </p>
        <p>
          Por meio da metodologia <span className="font-semibold text-primary">MyTS 360</span>, práticas que antes estavam presentes
          apenas no dia a dia da operação passaram a ser organizadas, validadas e comunicadas.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-accent opacity-15 blur-2xl rounded-full" />
        <div className="relative rounded-3xl border border-border bg-gradient-card shadow-elegant p-8 h-full flex flex-col justify-center">
          <Sparkles className="size-7 text-accent" />
          <div className="mt-4 font-display font-bold text-7xl text-primary leading-none">+30</div>
          <div className="mt-2 text-lg font-semibold text-primary">anos de Agricultura Natural</div>
          <div className="mt-3 text-sm text-muted-foreground">
            Uma história genuína que o Korin 360 traduz para a linguagem do consumidor.
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- 03 · COMO FOI CONSTRUÍDO ---------- */
const ComoFoiConstruido = () => {
  const etapas = [
    {
      icon: ClipboardCheck,
      n: "1",
      t: "Coleta",
      d: "Aplicação de um questionário ESG da MyTS, adaptado à realidade do produtor rural, para levantar práticas produtivas, sociais e ambientais.",
    },
    {
      icon: Layers,
      n: "2",
      t: "Consolidação",
      d: "Análise e organização dos dados, identificação de boas práticas e produção de conteúdos, vídeos, fotos e materiais de divulgação.",
    },
    {
      icon: LinkIcon,
      n: "3",
      t: "Conexão",
      d: "Disponibilização das informações ao consumidor via QR Code, transformando os produtores em protagonistas da experiência de consumo.",
    },
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute -bottom-32 right-1/4 size-[600px] bg-glow opacity-50 blur-3xl rounded-full" />
          <MytsWatermark className="-left-16 -top-16 w-[360px]" />
        </>
      }
    >
      <SectionLabel n="02" label="Como o projeto foi construído" light />

      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl leading-[1.05] max-w-4xl text-primary-foreground">
        Três etapas para transformar prática em <span className="text-gradient">experiência</span>
      </h2>

      <div className="mt-10 flex-1 grid md:grid-cols-3 gap-5 items-stretch">
        {etapas.map((e, i) => (
          <div key={e.t} className="relative">
            <div className="h-full rounded-2xl border-2 border-accent-glow/30 bg-primary/40 backdrop-blur-sm p-7 shadow-elegant hover:border-accent-glow/60 transition-colors flex flex-col">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                  <e.icon className="size-6 text-accent-foreground" />
                </div>
                <div className="font-mono text-accent-glow text-sm">0{e.n}</div>
              </div>
              <div className="mt-5 font-display font-bold text-3xl text-primary-foreground">{e.t}</div>
              <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">{e.d}</p>
            </div>
            {i < 2 && (
              <ArrowRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 size-6 text-accent-glow z-10" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-accent-glow/30 bg-accent-glow/10 px-6 py-4 text-center">
        <p className="text-primary-foreground text-base md:text-lg">
          O Korin 360 não cria um novo posicionamento.{" "}
          <span className="text-accent-glow font-semibold">
            Ele torna visível aquilo que a Korin já faz há mais de 30 anos.
          </span>
        </p>
      </div>
    </Slide>
  );
};

/* ---------- 04 · ESTRATÉGIA DE POSICIONAMENTO ---------- */
const Estrategia = () => {
  const canais = [
    {
      icon: Package,
      t: "Embalagem",
      d: "Principal ponto de conexão entre consumidor e história. Folheto com QR Code apresenta as famílias produtoras e os diferenciais Korin.",
    },
    {
      icon: Globe,
      t: "Website",
      d: "Ambiente digital com histórias dos produtores, princípios da Agricultura Natural e práticas que tornam os alimentos Korin diferentes.",
    },
    {
      icon: Newspaper,
      t: "Assessoria de Imprensa",
      d: "Divulgação em veículos nacionais, fortalecendo o posicionamento institucional em transparência, sustentabilidade e confiança.",
    },
    {
      icon: MessageSquare,
      t: "Redes Sociais",
      d: "Conteúdos nos canais Korin e MyTS apresentando o projeto, histórias dos produtores e ampliando o alcance da iniciativa.",
    },
  ];
  return (
    <Slide
      bg="bg-background"
      decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="03" label="Estratégia de Posicionamento" />

      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-[1.05] max-w-4xl">
        Do <span className="text-gradient">campo à mesa</span>: uma experiência de transparência e confiança
      </h2>

      <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl">
        Quatro frentes que reforçam o que diferencia a Korin: garantia de origem, respeito ao meio ambiente,
        valorização do produtor e bem-estar animal.
      </p>

      <div className="mt-6 flex-1 grid md:grid-cols-2 gap-4">
        {canais.map((c) => (
          <div
            key={c.t}
            className="rounded-2xl border border-border bg-gradient-card shadow-card p-6 flex gap-5 hover:shadow-elegant transition-shadow"
          >
            <div className="size-14 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
              <c.icon className="size-7 text-accent-foreground" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-2xl text-primary">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
};

/* ---------- 05 · RESULTADOS ---------- */
const Resultados = () => {
  const stats = [
    { icon: TrendingUp, v: "9,7 mil", l: "acessos ao ambiente digital" },
    { icon: Smartphone, v: "83%", l: "dos acessos via mobile" },
    { icon: Clock, v: "2min11s", l: "de tempo médio de navegação" },
    { icon: Users, v: "25–44", l: "anos · concentração no Sudeste" },
  ];
  const aprend = [
    "Quem produz seus alimentos",
    "Como eles são produzidos",
    "Quais práticas sustentáveis estão por trás da marca",
    "Qual o impacto positivo de suas escolhas de consumo",
  ];
  return (
    <Slide
      bg="bg-background"
      decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="04" label="Resultados e Aprendizados" />

      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-[1.05] max-w-4xl">
        Existe interesse do consumidor pela{" "}
        <span className="text-gradient">origem dos alimentos</span>
      </h2>

      <p className="mt-3 text-base text-muted-foreground max-w-3xl">
        Mesmo com investimento limitado em divulgação e tendo a embalagem como principal canal de acesso,
        o projeto demonstrou que o consumidor valoriza informações sobre origem, pessoas e propósito.
      </p>

      <div className="mt-6 grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-gradient-card shadow-card p-5">
            <s.icon className="size-6 text-accent" />
            <div className="mt-3 font-display font-bold text-3xl md:text-4xl text-primary leading-none">{s.v}</div>
            <div className="mt-2 text-xs text-muted-foreground leading-snug">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex-1 rounded-2xl border-2 border-accent/30 bg-accent/5 p-6">
        <div className="flex items-center gap-2 text-accent font-semibold uppercase text-xs tracking-widest">
          <Eye className="size-4" /> Principal aprendizado
        </div>
        <div className="mt-3 font-display font-semibold text-xl text-primary">
          Existe um público interessado em conhecer:
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-x-6 gap-y-2">
          {aprend.map((a) => (
            <div key={a} className="flex items-start gap-2 text-sm text-primary">
              <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
              <span>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

/* ---------- 06 · BENCHMARK · MERCADO vs KORIN ---------- */
const BenchmarkMercado = () => {
  const mercado = [
    "Experiências digitais via QR Code",
    "Storytelling sobre produtores e origem",
    "Forte presença no ponto de venda",
    "Estratégias contínuas de conteúdo",
    "Sustentabilidade como diferencial competitivo",
  ];
  const korin = [
    "Garantia de origem",
    "Agricultura Natural",
    "Bem-estar animal",
    "Valorização do produtor rural",
    "Relação de confiança com consumidores",
    "Uma história genuína para contar",
  ];
  return (
    <Slide
      bg="bg-background"
      decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="05" label="Benchmark e Oportunidades" />

      <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-primary leading-[1.05] max-w-4xl">
        O mercado está transformando <span className="text-gradient">origem em diferenciação</span>
      </h2>

      <div className="mt-6 grid md:grid-cols-2 gap-5 flex-1">
        <div className="rounded-2xl border border-border bg-gradient-card shadow-card p-6 flex flex-col">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            <TrendingUp className="size-4" /> O que o mercado está fazendo
          </div>
          <div className="mt-4 space-y-3">
            {mercado.map((m) => (
              <div key={m} className="flex items-start gap-3 text-sm text-primary">
                <span className="mt-1.5 size-1.5 rounded-full bg-muted-foreground shrink-0" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-accent-glow/5 shadow-elegant p-6 flex flex-col">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-accent">
            <ShieldCheck className="size-4" /> Oportunidade Korin
          </div>
          <div className="mt-4 space-y-3">
            {korin.map((k) => (
              <div key={k} className="flex items-start gap-3 text-sm text-primary font-medium">
                <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                <span>{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-center text-sm md:text-base">
        Poucas marcas têm uma história tão autêntica.{" "}
        <span className="text-accent-glow font-semibold">
          O desafio não é criar um posicionamento — é amplificar o que já existe.
        </span>
      </div>
    </Slide>
  );
};

/* ---------- 07 · BENCHMARK DE MARCAS ---------- */
const BenchmarkMarcas = () => {
  const marcas = [
    {
      flag: "us",
      nome: "Vital Farms",
      cat: "Ovos",
      img: imgVital.url,
      imgPosition: "object-top",
      o: "Nome do produtor na embalagem + QR Code + vídeos das fazendas",
      r: "Listada na Nasdaq, em +23 mil lojas, próxima de US$ 1bi/ano",
    },
    {
      flag: "fr",
      nome: "Carrefour · Garantia de Origem",
      cat: "Carnes, leite, frutas",
      img: imgCarrefourSabor.url,
      o: "QR Code, rastreabilidade, produtor e informações da cadeia",
      r: "Principal diferencial de marca própria e referência em transparência",
    },
    {
      flag: "br",
      nome: "Frigol",
      cat: "Carne bovina",
      img: imgFrigol.url,
      o: "QR Code com fazenda, bioma e conformidade socioambiental",
      r: "100% dos fornecedores diretos monitorados",
    },
    {
      flag: "fr",
      nome: "Carrefour Bio",
      cat: "Orgânicos",
      img: imgCarrefourBC.url,
      o: "Blockchain e QR Code com origem, certificações e produtor",
      r: "Reforço em alimentação saudável e sustentável",
    },
    {
      flag: "it",
      nome: "Barilla",
      cat: "Molhos e ingredientes",
      o: "QR Code com rastreabilidade do manjericão, identificação dos agricultores, data de colheita e origem dos ingredientes",
      r: "Expansão da iniciativa para novos produtos após o sucesso do lançamento inicial",
    },
    {
      flag: "no",
      nome: "Mowi",
      cat: "Salmão",
      img: imgMowi.url,
      o: "QR Code e rastreabilidade completa da cadeia do pescado",
      r: "Liderança global em pescados sustentáveis",
    },
    {
      flag: "de",
      nome: "REWE Bio",
      cat: "Carnes e laticínios",
      img: imgRewe.url,
      o: "QR Code nas embalagens: fazenda de origem, etapas da produção, sustentabilidade, regionalidade e produtores",
      r: "REWE afirma que origem e procedência são fatores decisivos de compra — mesma tese da Korin",
    },
    {
      flag: "es",
      nome: "Llet Nostra",
      cat: "Leite",
      img: imgLlet.url,
      o: "QR Code com fazenda, data da ordenha, cadeia validada e destaque para +100 fazendas familiares",
      r: "Marco no mercado catalão: transformou produtores familiares em protagonistas da marca",
    },
  ];
  return (
    <Slide
      bg="bg-primary text-primary-foreground"
      decor={
        <>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <MytsWatermark className="-right-16 -bottom-16 w-[360px]" />
        </>
      }
    >
      <SectionLabel n="06" label="Benchmark · Marcas que já fazem" light />

      <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl leading-[1.05] max-w-4xl text-primary-foreground">
        Quem está transformando origem em <span className="text-gradient">vantagem competitiva</span>
      </h2>

      <div className="mt-4 flex-1 grid grid-cols-4 grid-rows-2 gap-2.5 min-h-0">
        {marcas.map((m) => (
          <div
            key={m.nome}
            className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur overflow-hidden flex flex-col hover:border-accent-glow/50 transition-colors min-h-0"
          >
            {m.img ? (
              <div className="h-16 w-full overflow-hidden bg-primary-foreground/5 shrink-0">
                <img
                  src={m.img}
                  alt={m.nome}
                  className={`w-full h-full object-cover ${m.imgPosition || "object-center"}`}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="h-16 w-full bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/[0.02] flex items-center justify-center shrink-0">
                <QrCode className="size-7 text-primary-foreground/30" />
              </div>
            )}
            <div className="p-2.5 flex flex-col flex-1 min-h-0">
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/w40/${m.flag}.png`}
                  alt={m.flag.toUpperCase()}
                  className="h-4 w-auto rounded shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-display font-bold text-[12.5px] leading-tight text-primary-foreground truncate">
                    {m.nome}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-accent-glow truncate">{m.cat}</div>
                </div>
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-primary-foreground/75">{m.o}</p>
              <div className="mt-auto pt-1.5 border-t border-primary-foreground/10">
                <div className="text-[9.5px] uppercase tracking-widest text-accent-glow/80 font-semibold">
                  Resultado
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-primary-foreground font-medium">{m.r}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
};

/* ---------- 08 · PRÓXIMA FASE ---------- */
const ProximaFase = () => {
  const pilares = [
    {
      icon: Megaphone,
      t: "Fortalecer a comunicação",
      d: ["Maior atuação de assessoria de imprensa", "Lançamentos em veículos relevantes", "Conteúdo institucional contínuo"],
    },
    {
      icon: Globe,
      t: "Potencializar canais digitais",
      d: ["Protagonismo para os produtores", "Calendário permanente de conteúdo", "Campanhas sobre origem e sustentabilidade"],
    },
    {
      icon: Store,
      t: "Explorar o ponto de venda",
      d: ["Materiais de gôndola", "Destaque visual para o QR Code", "Reforço dos diferenciais Korin"],
    },
    {
      icon: UserPlus,
      t: "Estratégia com influenciadores",
      d: ["Alimentação saudável", "Sustentabilidade e consumo consciente", "Agronegócio"],
    },
    {
      icon: Mail,
      t: "Relacionamento direto",
      d: ["Captação de e-mails e newsletter", "CRM", "Campanhas de relacionamento"],
    },
    {
      icon: Boxes,
      t: "Expandir o modelo",
      d: ["Aplicar a metodologia Korin 360", "Novas categorias: carnes, pescados", "Demais produtos do portfólio"],
    },
  ];
  return (
    <Slide
      bg="bg-background"
      decor={<MytsWatermark className="-right-16 -bottom-16 w-[360px] [filter:invert(1)] opacity-[0.04]" />}
    >
      <SectionLabel n="07" label="Próxima Fase do Korin 360" />

      <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-primary leading-[1.05] max-w-5xl">
        De projeto de transparência para uma{" "}
        <span className="text-gradient">plataforma de marca</span>
      </h2>

      <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl">
        O Korin 360 demonstrou que existe valor em conectar consumidores à origem. O próximo passo é torná-lo
        uma plataforma permanente de diferenciação, relacionamento e fortalecimento da marca.
      </p>

      <div className="mt-5 flex-1 grid grid-cols-3 grid-rows-2 gap-3.5">
        {pilares.map((p) => (
          <div
            key={p.t}
            className="rounded-2xl border border-border bg-gradient-card shadow-card p-4 flex flex-col hover:shadow-elegant hover:border-accent/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                <p.icon className="size-5 text-accent-foreground" />
              </div>
              <div className="font-display font-bold text-base text-primary leading-tight">{p.t}</div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {p.d.map((x) => (
                <li key={x} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1 size-1 rounded-full bg-accent shrink-0" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
};

/* ---------- 09 · MENSAGEM FINAL ---------- */
const MensagemFinal = () => (
  <Slide
    bg="bg-hero"
    decor={
      <>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute -top-32 left-1/3 size-[700px] bg-glow opacity-60 blur-3xl rounded-full" />
        <MytsWatermark className="-right-20 -bottom-20 w-[420px]" />
      </>
    }
  >
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <Chip>
        <HeartHandshake className="size-3.5 text-accent-glow" />
        Mensagem final
      </Chip>

      <h2 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-[1.02] tracking-tight text-primary-foreground max-w-5xl">
        Uma história extraordinária,{" "}
        <span className="text-gradient">acessível ao consumidor.</span>
      </h2>

      <p className="mt-6 text-base md:text-xl text-primary-foreground/75 max-w-3xl leading-relaxed">
        O Korin 360 materializa a essência da Korin: produzir alimentos saudáveis em harmonia com a natureza,
        valorizando quem produz e oferecendo transparência a quem consome.
      </p>

      <div className="mt-10 w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.04] backdrop-blur-xl p-7 md:p-8">
          <div className="absolute -right-24 -top-24 size-72 bg-glow opacity-50 blur-3xl rounded-full" />
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-accent" />

          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-7 items-center text-left">
            <div>
              <div className="flex items-center gap-3">
                <img src={mytsLogo} alt="MyTS" className="h-5 opacity-90" />
                <span className="h-px w-8 bg-primary-foreground/25" />
                <span className="text-[13.5px] uppercase tracking-[0.2em] font-semibold text-accent-glow">
                  Próximo passo
                </span>
              </div>
              <p className="mt-4 font-display font-semibold text-2xl md:text-[26px] leading-[1.15] text-primary-foreground">
                Quer entender como isso se aplica à <span className="text-gradient">sua operação?</span>
              </p>
              <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
                Agende uma conversa com{" "}
                <span className="font-semibold text-primary-foreground">André Tanzi</span>,
                Diretor Comercial da MyTS.
              </p>
            </div>

            <div className="md:border-l md:border-primary-foreground/10 md:pl-7 space-y-2.5">
              <a
                href="mailto:andre.tanzi@myt-s.com"
                className="group flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3.5 py-2.5 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
              >
                <div className="size-8 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                  <Mail className="size-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] uppercase tracking-widest text-primary-foreground/50">E-mail</div>
                  <div className="font-mono text-xs text-primary-foreground truncate">andre.tanzi@myt-s.com</div>
                </div>
                <ArrowRight className="size-4 text-accent-glow group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3.5 py-2.5 hover:bg-primary-foreground/10 hover:border-accent-glow/40 transition-all"
              >
                <div className="size-8 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                  <LinkIcon className="size-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] uppercase tracking-widest text-primary-foreground/50">LinkedIn</div>
                  <div className="text-xs text-primary-foreground truncate">André Tanzi</div>
                </div>
                <ArrowRight className="size-4 text-accent-glow group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

/* ---------- PAGE ---------- */
const Korin360 = () => (
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
      <title>Korin 360 — Transparência que aproxima · MyTS</title>
      <meta
        name="description"
        content="Korin 360: case da metodologia MyTS 360 que aproxima consumidores da origem dos alimentos por meio da transparência."
      />
    </Helmet>
    <Hero />
    <Sobre />
    <ComoFoiConstruido />
    <Estrategia />
    <Resultados />
    <BenchmarkMercado />
    <BenchmarkMarcas />
    <ProximaFase />
    <MensagemFinal />
  </main>
);

export default Korin360;
