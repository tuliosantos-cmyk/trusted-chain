import { Globe2 } from "lucide-react";
import WorldMap from "./visuals/WorldMap";

const Network = () => (
  <section id="rede" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-30" />
    <div className="absolute top-0 left-1/3 size-[600px] bg-glow opacity-60" />

    <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-glow font-semibold">
          <Globe2 className="size-4" /> Rede global
        </span>
        <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl leading-tight">
          20 anos de experiência. <br />
          <span className="text-gradient">Auditores locais</span> em todo lugar.
        </h2>
        <p className="mt-6 text-lg text-primary-foreground/70 max-w-xl leading-relaxed">
          +100 auditores no Brasil e no exterior. Atendimento regional, rápido e com profundo conhecimento técnico — gerando até <strong className="text-primary-foreground">50% de economia</strong> em relação ao modelo tradicional.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
          {[
            ["Brasil", "Sede Botucatu"],
            ["EUA", "Charlotte, NC"],
            ["+20 países", "Cobertura ativa"],
            ["+100", "Auditores certificados"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-gradient-dark-card border border-primary-foreground/10 p-5 backdrop-blur">
              <div className="font-display font-bold text-xl">{k}</div>
              <div className="mt-1 text-xs text-primary-foreground/60">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-8 bg-glow opacity-40 blur-3xl" />
        <div className="relative rounded-3xl border border-primary-foreground/10 bg-gradient-dark-card backdrop-blur p-6 md:p-8">
          <WorldMap />
          <div className="mt-4 flex items-center justify-between text-xs text-primary-foreground/60">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent-glow animate-pulse" />
              Auditor ativo
            </span>
            <span>Atualizado em tempo real</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default Network;
