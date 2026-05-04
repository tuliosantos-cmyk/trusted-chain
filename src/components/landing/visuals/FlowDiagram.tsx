// Diagrama de fluxo: Fornecedores → MyTS (centro) → Auditoria
const FlowDiagram = () => (
  <svg
    viewBox="0 0 900 320"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    role="img"
    aria-label="Fluxo: fornecedores enviam documentos, MyTS processa e audita"
  >
    <defs>
      <linearGradient id="flowAccent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(214 95% 54%)" />
        <stop offset="100%" stopColor="hsl(199 95% 60%)" />
      </linearGradient>
      <radialGradient id="centerGlow">
        <stop offset="0%" stopColor="hsl(199 95% 60%)" stopOpacity="0.45" />
        <stop offset="100%" stopColor="hsl(214 95% 54%)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* connecting lines (animated dashed) */}
    {[80, 140, 200].map((y, i) => (
      <path
        key={`l-${i}`}
        d={`M 180 ${y} Q 320 ${y} 430 160`}
        fill="none"
        stroke="url(#flowAccent)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.5"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
      </path>
    ))}
    {[120, 180, 240].map((y, i) => (
      <path
        key={`r-${i}`}
        d={`M 470 160 Q 580 ${y} 720 ${y}`}
        fill="none"
        stroke="url(#flowAccent)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.5"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
      </path>
    ))}

    {/* Left: Fornecedores */}
    <text x="90" y="32" textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">
      FORNECEDORES
    </text>
    {[
      { y: 60, label: "Agro Boa Vista", tag: "FSSC" },
      { y: 120, label: "Frigorífico Sul", tag: "BRCGS" },
      { y: 180, label: "Nutri Ingredients", tag: "ISO" },
    ].map((s) => (
      <g key={s.y}>
        <rect x="14" y={s.y} width="160" height="40" rx="8" fill="#fff" stroke="#e2e8f0" />
        <circle cx="32" cy={s.y + 20} r="10" fill="hsl(214 95% 54% / 0.12)" />
        <path
          d={`M 27 ${s.y + 18} L 31 ${s.y + 22} L 37 ${s.y + 16}`}
          stroke="hsl(214 95% 54%)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="50" y={s.y + 18} fill="#0f172a" fontSize="11" fontWeight="600" fontFamily="Lato, sans-serif">
          {s.label}
        </text>
        <text x="50" y={s.y + 31} fill="#64748b" fontSize="9" fontFamily="Lato, sans-serif">
          envia certificado
        </text>
        <rect x="130" y={s.y + 12} width="34" height="16" rx="8" fill="hsl(199 95% 60% / 0.18)" />
        <text x="147" y={s.y + 23} textAnchor="middle" fill="hsl(214 95% 40%)" fontSize="8" fontWeight="700" fontFamily="Rubik, sans-serif">
          {s.tag}
        </text>
      </g>
    ))}

    {/* Center: MyTS hub */}
    <circle cx="450" cy="160" r="120" fill="url(#centerGlow)" />
    <circle cx="450" cy="160" r="70" fill="#0f172a" stroke="hsl(214 95% 54%)" strokeWidth="2" />
    <circle cx="450" cy="160" r="84" fill="none" stroke="hsl(199 95% 60%)" strokeWidth="1" strokeDasharray="2 6" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" from="0 450 160" to="360 450 160" dur="20s" repeatCount="indefinite" />
    </circle>
    <text x="450" y="148" textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="9" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">
      PLATAFORMA
    </text>
    <text x="450" y="172" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily="Rubik, sans-serif">
      MyTS
    </text>
    <text x="450" y="188" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Lato, sans-serif">
      centraliza · valida · alerta
    </text>

    {/* Mini icons orbiting hub */}
    {[
      { x: 380, y: 100, label: "DOC" },
      { x: 520, y: 100, label: "✓" },
      { x: 380, y: 220, label: "🔔" },
      { x: 520, y: 220, label: "📊" },
    ].map((o, i) => (
      <g key={i}>
        <circle cx={o.x} cy={o.y} r="14" fill="#fff" stroke="hsl(214 95% 54%)" strokeWidth="1.5" />
        <text x={o.x} y={o.y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(214 95% 40%)" fontFamily="Rubik, sans-serif">
          {o.label}
        </text>
      </g>
    ))}

    {/* Right: Auditoria / Você */}
    <text x="800" y="32" textAnchor="middle" fill="hsl(199 95% 60%)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Rubik, sans-serif">
      VOCÊ · AUDITORIA
    </text>
    {[
      { y: 80, t: "Dashboard em tempo real", s: "visão da cadeia inteira" },
      { y: 140, t: "Audit-ready", s: "evidências organizadas" },
      { y: 200, t: "Equipe focada em análise", s: "não em cobrança" },
    ].map((s) => (
      <g key={s.y}>
        <rect x="720" y={s.y} width="170" height="44" rx="8" fill="#0f172a" stroke="hsl(214 95% 54% / 0.4)" />
        <rect x="730" y={s.y + 12} width="3" height="20" rx="1.5" fill="hsl(199 95% 60%)" />
        <text x="742" y={s.y + 20} fill="#fff" fontSize="11" fontWeight="600" fontFamily="Lato, sans-serif">
          {s.t}
        </text>
        <text x="742" y={s.y + 33} fill="#94a3b8" fontSize="8.5" fontFamily="Lato, sans-serif">
          {s.s}
        </text>
      </g>
    ))}
  </svg>
);

export default FlowDiagram;
