const LpNav = () => (
  <header className="absolute top-0 left-0 right-0 z-50">
    <div className="container flex items-center justify-between py-6">
      <a href="#topo" className="flex items-center gap-2 text-primary-foreground">
        <div className="size-8 rounded-lg bg-gradient-accent shadow-glow grid place-items-center font-display font-bold text-accent-foreground">
          M
        </div>
        <span className="font-display font-semibold text-lg tracking-tight">MyTS</span>
      </a>
      <a
        href="#teste"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-cta hover:brightness-110 transition"
      >
        Testar grátis
      </a>
    </div>
  </header>
);

export default LpNav;
