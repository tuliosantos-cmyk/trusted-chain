const Nav = () => (
  <header className="absolute top-0 left-0 right-0 z-50">
    <div className="container flex items-center justify-between py-6">
      <a href="#" className="flex items-center gap-2 text-primary-foreground">
        <div className="size-8 rounded-lg bg-gradient-accent shadow-glow grid place-items-center font-display font-bold text-accent-foreground">M</div>
        <span className="font-display font-semibold text-lg tracking-tight">MyTS</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/70">
        <a href="#problema" className="hover:text-primary-foreground transition-colors">Problema</a>
        <a href="#funciona" className="hover:text-primary-foreground transition-colors">Como funciona</a>
        <a href="#resultados" className="hover:text-primary-foreground transition-colors">Resultados</a>
        <a href="#rede" className="hover:text-primary-foreground transition-colors">Rede</a>
      </nav>
      <a href="#agendar" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-cta hover:brightness-110 transition">
        Agendar conversa
      </a>
    </div>
  </header>
);
export default Nav;
