// Mini-charts SVG para Results e CaseStrip

// Sparkline configurável (downward or upward)
export const Sparkline = ({
  direction = "down",
  color = "hsl(214 95% 54%)",
}: {
  direction?: "down" | "up" | "flat-up";
  color?: string;
}) => {
  const points =
    direction === "down"
      ? "0,8 15,14 30,18 45,28 60,36 75,46 90,52 105,58 120,62"
      : direction === "up"
      ? "0,58 15,52 30,48 45,40 60,32 75,24 90,18 105,12 120,8"
      : "0,40 15,38 30,34 45,30 60,26 75,22 90,18 105,14 120,10";

  return (
    <svg viewBox="0 0 120 64" className="w-full h-12" aria-hidden="true">
      <defs>
        <linearGradient id={`sparkFill-${direction}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`${points} 120,64 0,64`}
        fill={`url(#sparkFill-${direction})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="120"
        cy={direction === "down" ? 62 : 8}
        r="3"
        fill={color}
        stroke="#fff"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// Case C.Vale — evolução de conformidade
export const ComplianceChart = () => (
  <svg viewBox="0 0 280 120" className="w-full h-auto" aria-label="Evolução de conformidade C.Vale">
    <defs>
      <linearGradient id="cvGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(214 95% 54%)" />
        <stop offset="100%" stopColor="hsl(199 95% 60%)" />
      </linearGradient>
      <linearGradient id="cvFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(214 95% 54%)" stopOpacity="0.2" />
        <stop offset="100%" stopColor="hsl(214 95% 54%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* axis */}
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1="20" x2="270" y1={20 + i * 22} y2={20 + i * 22} stroke="hsl(214 32% 91%)" strokeDasharray="2 4" />
    ))}
    {/* data */}
    <path d="M 20 90 L 60 78 L 100 70 L 140 50 L 180 38 L 220 26 L 260 18 L 260 110 L 20 110 Z" fill="url(#cvFill)" />
    <path d="M 20 90 L 60 78 L 100 70 L 140 50 L 180 38 L 220 26 L 260 18" fill="none" stroke="url(#cvGrad)" strokeWidth="2.5" strokeLinecap="round" />
    {[20, 60, 100, 140, 180, 220, 260].map((x, i) => {
      const ys = [90, 78, 70, 50, 38, 26, 18];
      return <circle key={i} cx={x} cy={ys[i]} r="3" fill="#fff" stroke="hsl(214 95% 54%)" strokeWidth="2" />;
    })}
    {/* labels */}
    {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"].map((m, i) => (
      <text key={m} x={20 + i * 40} y="118" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="Manrope, sans-serif">
        {m}
      </text>
    ))}
    <text x="20" y="14" fill="#0f172a" fontSize="9" fontWeight="700" fontFamily="Sora, sans-serif">
      Conformidade da carteira (%)
    </text>
    <text x="270" y="14" fill="hsl(152 65% 40%)" fontSize="9" fontWeight="700" textAnchor="end" fontFamily="Sora, sans-serif">
      ↑ +34pp
    </text>
  </svg>
);

// Case Carrefour — mapa de cadeia (donut + legend)
export const SupplyDonut = () => {
  const segments = [
    { label: "Conforme", value: 72, color: "hsl(152 65% 40%)" },
    { label: "Em desenvolvimento", value: 20, color: "hsl(214 95% 54%)" },
    { label: "Pendente", value: 8, color: "hsl(38 95% 50%)" },
  ];
  let cumulative = 0;
  const radius = 38;
  const cx = 70;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 280 120" className="w-full h-auto" aria-label="Diagnóstico de cadeia Carrefour">
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="hsl(214 32% 91%)" strokeWidth="14" />
      {segments.map((s, i) => {
        const dash = (s.value / 100) * circumference;
        const offset = -((cumulative / 100) * circumference);
        cumulative += s.value;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth="14"
            strokeDasharray={`${dash} ${circumference}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
      })}
      <text x={cx} y={cy - 2} textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="800" fontFamily="Sora, sans-serif">
        72%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="Manrope, sans-serif">
        conforme
      </text>

      {/* legend */}
      {segments.map((s, i) => (
        <g key={s.label} transform={`translate(140, ${28 + i * 24})`}>
          <rect width="10" height="10" rx="2" fill={s.color} />
          <text x="18" y="9" fill="#0f172a" fontSize="10" fontWeight="600" fontFamily="Manrope, sans-serif">
            {s.label}
          </text>
          <text x="125" y="9" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="Sora, sans-serif" fontWeight="700">
            {s.value}%
          </text>
        </g>
      ))}
    </svg>
  );
};
