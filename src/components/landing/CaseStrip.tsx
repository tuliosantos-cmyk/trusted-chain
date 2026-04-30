const CaseStrip = () => (
  <section className="relative bg-primary py-16 border-y border-primary-foreground/10">
    <div className="container">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-accent-glow font-medium">Case C.Vale — resultado real</span>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          ["−90%", "Custo com autoavaliação de fornecedores"],
          ["−50%", "Gasto com auditorias de 2ª parte"],
          ["100%", "Equipe de qualidade focada em análise, não em cobrança"],
        ].map(([k, v]) => (
          <div key={k} className="text-center md:text-left">
            <div className="font-display font-bold text-6xl md:text-7xl text-gradient leading-none">{k}</div>
            <div className="mt-3 text-primary-foreground/70 text-sm md:text-base max-w-xs mx-auto md:mx-0">{v}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default CaseStrip;
