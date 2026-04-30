import heroImg from "@/assets/hero-dashboard.jpg";
import { ArrowRight, Calendar, ShieldCheck } from "lucide-react";

const Hero = () => (
  <section className="relative bg-hero overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 noise">
    <div className="absolute inset-0 grid-pattern opacity-40" />
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-glow opacity-70 pointer-events-none" />

    <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 text-primary-foreground animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground/80">
          <ShieldCheck className="size-3.5 text-accent-glow" />
          Indústrias de alimentos
        </span>

        <h1 className="mt-6 font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
          A falha começa <br className="hidden md:block" />
          <span className="text-gradient">antes da fábrica.</span><br className="hidden md:block" />
          Pare de ser pego <br className="hidden md:block" />
          de surpresa.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed">
          Documento vencido, fornecedor sem certificado, não conformidade sem rastreio.
          <span className="block mt-3 text-primary-foreground/55">
            20 anos de experiência em supply chain transformados numa plataforma que faz o operacional para você.
          </span>
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#agendar" className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-4 font-medium text-accent-foreground shadow-cta hover:shadow-glow transition-all">
            <Calendar className="size-4" />
            Agendar conversa de 30 min
          </a>
          <a href="#funciona" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-7 py-4 font-medium text-primary-foreground hover:bg-primary-foreground/5 transition">
            Ver como funciona
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
          {[
            ["+3.000", "Empresas ativas"],
            ["50K", "Documentos"],
            ["+20", "Países"],
            ["+1K", "Auditorias"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-display font-bold text-2xl text-primary-foreground">{k}</div>
              <div className="text-xs text-primary-foreground/55 mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-accent opacity-30 blur-3xl rounded-3xl" />
          <img
            src={heroImg}
            alt="Plataforma MyTS de gestão de supply chain para indústrias de alimentos"
            width={1536}
            height={1024}
            className="relative rounded-2xl border border-primary-foreground/10 shadow-elegant animate-float"
          />
        </div>
      </div>
    </div>
  </section>
);
export default Hero;
