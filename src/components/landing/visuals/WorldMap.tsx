// Mapa focado no Brasil — hub em Botucatu com cobertura nacional + conexões internacionais
const WorldMap = () => {
  // Silhueta simplificada do Brasil em paths (estilizada, leve, replicável)
  // Coordenadas aproximadas em viewBox 540x420
  const brazilPath =
    "M 245 70 L 270 65 L 295 72 L 320 85 L 345 95 L 365 115 L 380 140 L 395 165 L 405 195 L 410 225 L 400 255 L 385 280 L 365 300 L 340 318 L 310 328 L 280 332 L 250 328 L 225 315 L 210 295 L 200 270 L 195 245 L 200 220 L 210 195 L 215 170 L 220 145 L 225 120 L 235 95 Z";

  // Hub principal — Botucatu (interior de SP)
  const hub = { x: 305, y: 270, label: "Botucatu · SP" };

  // Cidades brasileiras que recebem cobertura (expansão a partir do hub)
  const brCities = [
    { x: 320, y: 250, label: "São Paulo", delay: 0.0 },
    { x: 335, y: 240, label: "Rio de Janeiro", delay: 0.3 },
    { x: 345, y: 215, label: "Belo Horizonte", delay: 0.6 },
    { x: 360, y: 175, label: "Salvador", delay: 0.9 },
    { x: 365, y: 135, label: "Fortaleza", delay: 1.2 },
    { x: 290, y: 165, label: "Manaus", delay: 1.5 },
    { x: 280, y: 235, label: "Cuiabá", delay: 1.8 },
    { x: 295, y: 290, label: "Curitiba", delay: 2.1 },
    { x: 285, y: 315, label: "Porto Alegre", delay: 2.4 },
    { x: 320, y: 195, label: "Brasília", delay: 0.45 },
  ];

  // Conexões internacionais (pinos pequenos nos cantos)
  const intl = [
    { x: 90, y: 110, label: "EUA" },
    { x: 60, y: 200, label: "México" },
    { x: 460, y: 90, label: "Europa" },
    { x: 490, y: 160, label: "África" },
    { x: 510, y: 230, label: "Ásia" },
  ];

  return (
    <svg
      viewBox="0 0 540 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="Cobertura MyTS no Brasil com expansão internacional"
    >
      <defs>
        <radialGradient id="hubGlow">
          <stop offset="0%" stopColor="hsl(199 95% 60%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(199 95% 60%)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="brFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(214 95% 54%)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(199 95% 60%)" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Background dots scattered (subtle world hint) */}
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (i * 37) % 540;
        const y = 30 + ((i * 53) % 360);
        return <circle key={`bg-${i}`} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.08" />;
      })}

      {/* Brazil silhouette — focal */}
      <path
        d={brazilPath}
        fill="url(#brFill)"
        stroke="hsl(199 95% 60%)"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />

      {/* Internal grid texture inside Brazil */}
      <path
        d={brazilPath}
        fill="none"
        stroke="hsl(199 95% 60%)"
        strokeWidth="0.5"
        strokeDasharray="2 4"
        opacity="0.3"
      />

      {/* International pins (small, in corners) */}
      {intl.map((p, i) => (
        <g key={`i-${i}`}>
          <line
            x1={hub.x}
            y1={hub.y}
            x2={p.x}
            y2={p.y}
            stroke="hsl(199 95% 60%)"
            strokeWidth="0.8"
            strokeDasharray="2 5"
            opacity="0.35"
          />
          <circle cx={p.x} cy={p.y} r="3" fill="hsl(199 95% 60%)" opacity="0.6" />
          <circle cx={p.x} cy={p.y} r="3" fill="none" stroke="hsl(199 95% 60%)" strokeWidth="0.8" opacity="0.4">
            <animate attributeName="r" from="3" to="9" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.5" to="0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text
            x={p.x}
            y={p.y - 8}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="8"
            fontWeight="600"
            fontFamily="Sora, sans-serif"
          >
            {p.label}
          </text>
        </g>
      ))}

      {/* Connections from hub → BR cities (curves) */}
      {brCities.map((c, i) => {
        const mx = (hub.x + c.x) / 2;
        const my = (hub.y + c.y) / 2 - 12;
        return (
          <path
            key={`c-${i}`}
            d={`M ${hub.x} ${hub.y} Q ${mx} ${my} ${c.x} ${c.y}`}
            fill="none"
            stroke="hsl(199 95% 60%)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-12"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </path>
        );
      })}

      {/* BR city pins (expanding pulses) */}
      {brCities.map((c, i) => (
        <g key={`b-${i}`}>
          <circle cx={c.x} cy={c.y} r="14" fill="none" stroke="hsl(199 95% 60%)" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" from="3" to="16" dur="2.4s" begin={`${c.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2.4s" begin={`${c.delay}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={c.x} cy={c.y} r="3.5" fill="hsl(199 95% 60%)" stroke="#fff" strokeWidth="1" />
          <text
            x={c.x + 7}
            y={c.y + 3}
            fill="#cbd5e1"
            fontSize="8"
            fontWeight="600"
            fontFamily="Sora, sans-serif"
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* HUB — Botucatu */}
      <g>
        <circle cx={hub.x} cy={hub.y} r="34" fill="url(#hubGlow)" />
        <circle cx={hub.x} cy={hub.y} r="22" fill="none" stroke="hsl(199 95% 60%)" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" from="10" to="32" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx={hub.x} cy={hub.y} r="8" fill="hsl(199 95% 60%)" stroke="#fff" strokeWidth="2" />
        <rect
          x={hub.x + 14}
          y={hub.y - 10}
          width={hub.label.length * 5.5 + 14}
          height="20"
          rx="10"
          fill="#0f172a"
          stroke="hsl(199 95% 60% / 0.6)"
        />
        <text
          x={hub.x + 21}
          y={hub.y + 4}
          fill="#fff"
          fontSize="9"
          fontWeight="700"
          fontFamily="Sora, sans-serif"
        >
          {hub.label}
        </text>
      </g>

      {/* Legend */}
      <g transform="translate(20, 380)">
        <circle cx="6" cy="0" r="4" fill="hsl(199 95% 60%)" stroke="#fff" strokeWidth="1" />
        <text x="16" y="3" fill="#cbd5e1" fontSize="8" fontWeight="600" fontFamily="Sora, sans-serif">
          Hub MyTS
        </text>
        <circle cx="86" cy="0" r="3" fill="hsl(199 95% 60%)" />
        <text x="94" y="3" fill="#cbd5e1" fontSize="8" fontWeight="600" fontFamily="Sora, sans-serif">
          Auditor local
        </text>
        <line x1="180" y1="0" x2="200" y2="0" stroke="hsl(199 95% 60%)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        <text x="206" y="3" fill="#cbd5e1" fontSize="8" fontWeight="600" fontFamily="Sora, sans-serif">
          Conexão internacional
        </text>
      </g>
    </svg>
  );
};

export default WorldMap;
