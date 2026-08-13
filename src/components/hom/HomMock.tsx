import { AlertTriangle, CheckCircle2, ClipboardCheck, FileText, Users } from "lucide-react";

const rows = [
  { name: "Laticínios Vale Norte", status: "ok", label: "Homologado" },
  { name: "Embalagens Prisma", status: "warn", label: "Alvará vence em 12 dias" },
  { name: "Aromas Sul", status: "self", label: "Autodeclaração enviada" },
  { name: "Transporte Frio BR", status: "pending", label: "Em homologação · 2 pendências" },
];

const dot = {
  ok: "bg-success",
  warn: "bg-accent",
  self: "bg-accent/60",
  pending: "bg-muted-foreground/40",
} as const;

const HomMock = () => (
  <div className="bg-card text-foreground">
    <div className="flex items-center gap-2 border-b border-border px-5 py-3">
      <span className="size-2.5 rounded-full bg-destructive/60" />
      <span className="size-2.5 rounded-full bg-accent/50" />
      <span className="size-2.5 rounded-full bg-success/60" />
      <span className="ml-3 text-xs text-muted-foreground">plataforma.myt-s.com · homologação</span>
    </div>

    <div className="p-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, t: "Meus Fornecedores e Insumos", v: "128" },
          { icon: ClipboardCheck, t: "Meus Processos", v: "24" },
          { icon: FileText, t: "Meus Documentos", v: "1.043" },
        ].map(({ icon: Icon, t, v }) => (
          <div key={t} className="rounded-xl border border-border bg-gradient-card p-3">
            <Icon className="size-4 text-accent" />
            <div className="mt-2 font-display font-bold text-xl text-primary leading-none">{v}</div>
            <div className="mt-1 text-[10px] leading-tight text-muted-foreground">{t}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-border bg-secondary/50 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Fornecedores homologados</span>
          <span className="font-semibold text-primary">92%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full bg-gradient-accent" style={{ width: "92%" }} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`size-2 rounded-full shrink-0 ${dot[r.status as keyof typeof dot]}`} />
              <span className="text-xs font-medium text-primary truncate">{r.name}</span>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{r.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-3">
        <AlertTriangle className="size-4 text-accent shrink-0 mt-0.5" />
        <div className="text-[11px] leading-snug text-primary">
          <strong>Insumo:</strong> laudo microbiológico da Embalagens Prisma vence em 12 dias. Solicitação automática
          enviada ao fornecedor.
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
        <CheckCircle2 className="size-3.5 text-success" />
        O fornecedor se autodeclara. Sua equipe só valida.
      </div>
    </div>
  </div>
);

export default HomMock;
