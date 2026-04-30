const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-14 border-t border-primary-foreground/10">
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-accent grid place-items-center font-display font-bold text-accent-foreground">M</div>
            <span className="font-display font-semibold text-lg">MyTS</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/60 max-w-sm">
            My Trusted Source — gestão de risco e conformidade para indústrias de alimentos.
          </p>
        </div>
        <div className="text-sm text-primary-foreground/60">
          <div>myt-s.com</div>
          <div className="mt-1">Botucatu (BR) · Charlotte (EUA)</div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} MyTS. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);
export default Footer;
