// Mini visuais SVG para cada card do Problem — "showing, not telling"

export const DocExpiredThumb = () => (
  <svg viewBox="0 0 200 90" className="w-full h-auto" aria-hidden="true">
    <rect x="0" y="0" width="200" height="90" rx="10" fill="hsl(214 32% 96%)" />
    <rect x="14" y="14" width="120" height="62" rx="6" fill="#fff" stroke="#e2e8f0" />
    <rect x="22" y="22" width="50" height="6" rx="3" fill="#cbd5e1" />
    <rect x="22" y="34" width="80" height="4" rx="2" fill="#e2e8f0" />
    <rect x="22" y="44" width="60" height="4" rx="2" fill="#e2e8f0" />
    <rect x="22" y="54" width="70" height="4" rx="2" fill="#e2e8f0" />
    {/* expired stamp */}
    <g transform="translate(110, 36) rotate(-12)">
      <rect x="-4" y="-10" width="56" height="22" rx="3" fill="none" stroke="#ef4444" strokeWidth="2" />
      <text x="24" y="5" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800" fontFamily="Rubik, sans-serif">VENCIDO</text>
    </g>
    {/* alert badge */}
    <g transform="translate(150, 16)">
      <circle cx="18" cy="18" r="18" fill="#ef4444" />
      <text x="18" y="23" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800" fontFamily="Rubik, sans-serif">!</text>
    </g>
  </svg>
);

export const ChasingEmailsThumb = () => (
  <svg viewBox="0 0 200 90" className="w-full h-auto" aria-hidden="true">
    <rect x="0" y="0" width="200" height="90" rx="10" fill="hsl(214 32% 96%)" />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${14 + i * 8}, ${12 + i * 10})`}>
        <rect width="160" height="32" rx="6" fill="#fff" stroke="#e2e8f0" />
        <circle cx="14" cy="16" r="6" fill="hsl(214 95% 54% / 0.2)" />
        <rect x="26" y="9" width="60" height="5" rx="2" fill="#0f172a" />
        <rect x="26" y="19" width="100" height="4" rx="2" fill="#cbd5e1" />
        <text x="148" y="20" fill="#94a3b8" fontSize="7" fontFamily="Lato, sans-serif">
          {i === 0 ? "Re: Re: Re:" : i === 1 ? "Re: Re:" : "Cobrança #4"}
        </text>
      </g>
    ))}
  </svg>
);

export const ScatteredEvidenceThumb = () => (
  <svg viewBox="0 0 200 90" className="w-full h-auto" aria-hidden="true">
    <rect x="0" y="0" width="200" height="90" rx="10" fill="hsl(214 32% 96%)" />
    {[
      { x: 16, y: 16, r: -8 },
      { x: 70, y: 12, r: 5 },
      { x: 124, y: 20, r: -3 },
      { x: 30, y: 50, r: 4 },
      { x: 90, y: 52, r: -6 },
      { x: 148, y: 48, r: 8 },
    ].map((p, i) => (
      <g key={i} transform={`translate(${p.x}, ${p.y}) rotate(${p.r})`}>
        <rect width="40" height="30" rx="3" fill="#fff" stroke="#cbd5e1" />
        <rect x="4" y="5" width="20" height="3" rx="1" fill="#cbd5e1" />
        <rect x="4" y="11" width="32" height="2" rx="1" fill="#e2e8f0" />
        <rect x="4" y="16" width="28" height="2" rx="1" fill="#e2e8f0" />
        <rect x="4" y="21" width="22" height="2" rx="1" fill="#e2e8f0" />
      </g>
    ))}
    {/* magnifier */}
    <g transform="translate(140, 50)">
      <circle cx="0" cy="0" r="14" fill="none" stroke="hsl(214 95% 54%)" strokeWidth="3" />
      <line x1="10" y1="10" x2="20" y2="20" stroke="hsl(214 95% 54%)" strokeWidth="3" strokeLinecap="round" />
      <text x="0" y="3" textAnchor="middle" fill="hsl(214 95% 54%)" fontSize="12" fontWeight="800" fontFamily="Rubik, sans-serif">?</text>
    </g>
  </svg>
);

export const RiskMeterThumb = () => (
  <svg viewBox="0 0 200 90" className="w-full h-auto" aria-hidden="true">
    <rect x="0" y="0" width="200" height="90" rx="10" fill="hsl(214 32% 96%)" />
    {/* gauge arc */}
    <g transform="translate(100, 70)">
      <path d="M -60 0 A 60 60 0 0 1 60 0" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
      <path d="M -60 0 A 60 60 0 0 1 45 -40" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" />
      {/* needle */}
      <line x1="0" y1="0" x2="42" y2="-38" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="0" cy="0" r="5" fill="#0f172a" />
    </g>
    <text x="100" y="38" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="800" fontFamily="Rubik, sans-serif">
      RISCO ALTO
    </text>
    <text x="40" y="84" fill="#94a3b8" fontSize="7" fontFamily="Lato, sans-serif">baixo</text>
    <text x="160" y="84" fill="#94a3b8" fontSize="7" fontFamily="Lato, sans-serif">alto</text>
  </svg>
);
