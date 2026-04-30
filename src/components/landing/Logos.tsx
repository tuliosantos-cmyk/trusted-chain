const logos = ["Carrefour", "C.Vale", "Korin", "AVAL", "Redes Martins", "Atakarejo"];

const Logos = () => (
  <section className="py-16 bg-background border-b border-border">
    <div className="container">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-medium mb-8">
        Confiam na MyTS
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
        {logos.map((l) => (
          <span key={l} className="font-display font-semibold text-xl md:text-2xl text-muted-foreground/60 hover:text-primary transition-colors">
            {l}
          </span>
        ))}
      </div>
    </div>
  </section>
);
export default Logos;
