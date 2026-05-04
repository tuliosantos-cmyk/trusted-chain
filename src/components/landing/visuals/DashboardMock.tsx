// Mockup SVG inline da plataforma MyTS — leve, escala perfeito, replicável como bloco HTML na RD
const DashboardMock = () => (
  <svg
    viewBox="0 0 560 420"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    role="img"
    aria-label="Dashboard MyTS — visão de fornecedores e documentos"
  >
    <defs>
      <linearGradient id="dashBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(214 95% 54%)" />
        <stop offset="100%" stopColor="hsl(199 95% 60%)" />
      </linearGradient>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(214 95% 54%)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(214 95% 54%)" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Window */}
    <rect x="0" y="0" width="560" height="420" rx="18" fill="url(#dashBg)" />
    <rect x="0" y="0" width="560" height="34" rx="18" fill="#0f172a" />
    <rect x="0" y="20" width="560" height="14" fill="#0f172a" />
    <circle cx="18" cy="17" r="5" fill="#ef4444" />
    <circle cx="36" cy="17" r="5" fill="#f59e0b" />
    <circle cx="54" cy="17" r="5" fill="#22c55e" />
    <text x="280" y="22" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Manrope, sans-serif">
      app.myt-s.com / fornecedores
    </text>

    {/* Sidebar */}
    <rect x="14" y="48" width="120" height="358" rx="12" fill="#0f172a" />
    <rect x="26" y="62" width="22" height="22" rx="6" fill="url(#accentGrad)" />
    <text x="56" y="77" fill="#fff" fontSize="9" fontWeight="700" fontFamily="Sora, sans-serif">MyTS</text>
    {["Visão geral", "Fornecedores", "Documentos", "Auditorias", "Alertas"].map((label, i) => (
      <g key={label}>
        <rect x="22" y={102 + i * 32} width="104" height="24" rx="6" fill={i === 1 ? "hsl(214 95% 54% / 0.18)" : "transparent"} />
        <circle cx="32" cy={114 + i * 32} r="2.5" fill={i === 1 ? "hsl(199 95% 60%)" : "#475569"} />
        <text x="42" y={117 + i * 32} fill={i === 1 ? "#fff" : "#94a3b8"} fontSize="9" fontFamily="Manrope, sans-serif" fontWeight={i === 1 ? 600 : 400}>
          {label}
        </text>
      </g>
    ))}

    {/* KPIs row */}
    {[
      { k: "3.247", v: "Fornecedores", c: "#0f172a" },
      { k: "98%", v: "Conformidade", c: "hsl(152 65% 40%)" },
      { k: "12", v: "A vencer 30d", c: "hsl(38 95% 50%)" },
    ].map((kpi, i) => (
      <g key={kpi.v} transform={`translate(${146 + i * 134}, 56)`}>
        <rect width="124" height="64" rx="10" fill="#fff" stroke="#e2e8f0" />
        <text x="12" y="22" fill="#94a3b8" fontSize="8" fontFamily="Manrope, sans-serif" fontWeight="600" letterSpacing="1">
          {kpi.v.toUpperCase()}
        </text>
        <text x="12" y="48" fill={kpi.c} fontSize="22" fontWeight="700" fontFamily="Sora, sans-serif">
          {kpi.k}
        </text>
        {/* tiny sparkline */}
        <polyline
          points={`70,52 80,46 90,48 100,40 110,42`}
          fill="none"
          stroke={kpi.c}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    ))}

    {/* Chart card */}
    <g transform="translate(146, 132)">
      <rect width="258" height="148" rx="10" fill="#fff" stroke="#e2e8f0" />
      <text x="14" y="22" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Sora, sans-serif">
        Conformidade da cadeia
      </text>
      <text x="14" y="36" fill="#94a3b8" fontSize="8" fontFamily="Manrope, sans-serif">
        Últimos 6 meses
      </text>
      {/* grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="14" x2="244" y1={56 + i * 22} y2={56 + i * 22} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {/* area */}
      <path
        d="M 20 110 L 60 96 L 100 100 L 140 80 L 180 70 L 220 56 L 240 50 L 240 130 L 20 130 Z"
        fill="url(#areaGrad)"
      />
      <path
        d="M 20 110 L 60 96 L 100 100 L 140 80 L 180 70 L 220 56 L 240 50"
        fill="none"
        stroke="url(#accentGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {[20, 60, 100, 140, 180, 220, 240].map((x, i) => {
        const ys = [110, 96, 100, 80, 70, 56, 50];
        return <circle key={i} cx={x} cy={ys[i]} r="2.5" fill="#fff" stroke="hsl(214 95% 54%)" strokeWidth="1.5" />;
      })}
    </g>

    {/* Right column: alerts */}
    <g transform="translate(414, 132)">
      <rect width="132" height="148" rx="10" fill="#fff" stroke="#e2e8f0" />
      <text x="12" y="22" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Sora, sans-serif">Alertas</text>
      {[
        { c: "#ef4444", t: "FSSC vencido", s: "Fornec. #214" },
        { c: "#f59e0b", t: "Vence em 7d", s: "Fornec. #082" },
        { c: "hsl(152 65% 40%)", t: "Renovado", s: "Fornec. #311" },
      ].map((a, i) => (
        <g key={i} transform={`translate(0, ${36 + i * 36})`}>
          <rect x="8" y="0" width="116" height="30" rx="6" fill="#f8fafc" />
          <circle cx="18" cy="15" r="4" fill={a.c} />
          <text x="28" y="13" fill="#0f172a" fontSize="8" fontWeight="600" fontFamily="Manrope, sans-serif">{a.t}</text>
          <text x="28" y="24" fill="#94a3b8" fontSize="7" fontFamily="Manrope, sans-serif">{a.s}</text>
        </g>
      ))}
    </g>

    {/* Suppliers table */}
    <g transform="translate(146, 292)">
      <rect width="400" height="114" rx="10" fill="#fff" stroke="#e2e8f0" />
      <text x="14" y="22" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Sora, sans-serif">
        Fornecedores recentes
      </text>
      {[
        { n: "Agro Boa Vista", d: "FSSC 22000", st: "ok", c: "hsl(152 65% 40%)" },
        { n: "Frigorífico Sul", d: "BRCGS — vence 12d", st: "warn", c: "#f59e0b" },
        { n: "Nutri Ingredients", d: "ISO 9001", st: "ok", c: "hsl(152 65% 40%)" },
      ].map((row, i) => (
        <g key={row.n} transform={`translate(14, ${36 + i * 24})`}>
          <circle cx="6" cy="9" r="6" fill="#e2e8f0" />
          <text x="20" y="12" fill="#0f172a" fontSize="9" fontWeight="600" fontFamily="Manrope, sans-serif">{row.n}</text>
          <text x="160" y="12" fill="#64748b" fontSize="8" fontFamily="Manrope, sans-serif">{row.d}</text>
          <rect x="320" y="2" width="58" height="14" rx="7" fill={`${row.c}`} fillOpacity="0.15" />
          <circle cx="330" cy="9" r="2.5" fill={row.c} />
          <text x="338" y="12" fill={row.c} fontSize="7" fontWeight="700" fontFamily="Manrope, sans-serif">
            {row.st === "ok" ? "CONFORME" : "ATENÇÃO"}
          </text>
        </g>
      ))}
    </g>
  </svg>
);

export default DashboardMock;
