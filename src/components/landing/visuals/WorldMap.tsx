// Mapa-múndi estilizado em dots (não geográfico realista — leve e replicável)
const WorldMap = () => {
  // Pinos principais (Botucatu, Charlotte) e dots de cobertura
  const dots: { x: number; y: number; o?: number }[] = [];
  // Distribuição em grid esparso simulando continentes
  const grid = [
    [3, 4, 5, 6, 7, 8, 9],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [4, 5, 6, 7, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    [6, 7, 8, 9, 14, 15, 16, 17, 18, 19, 20],
    [7, 8, 9, 10, 15, 16, 17, 18],
    [9, 10, 11, 16, 17],
  ];
  grid.forEach((row, y) => {
    row.forEach((x) => {
      dots.push({ x: x * 22 + 30, y: y * 26 + 40, o: 0.18 + Math.random() * 0.25 });
    });
  });

  const pins = [
    { x: 200, y: 160, label: "Botucatu · BR" },
    { x: 158, y: 96, label: "Charlotte · EUA" },
  ];

  // Spread coverage dots highlighted
  const highlighted = [
    { x: 130, y: 80 }, { x: 350, y: 90 }, { x: 400, y: 110 }, { x: 440, y: 130 },
    { x: 380, y: 170 }, { x: 460, y: 180 }, { x: 240, y: 200 }, { x: 180, y: 200 },
    { x: 320, y: 140 }, { x: 280, y: 70 },
  ];

  return (
    <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Cobertura global MyTS">
      <defs>
        <radialGradient id="mapGlow">
          <stop offset="0%" stopColor="hsl(199 95% 60%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(199 95% 60%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* base dots */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2" fill="#fff" opacity={d.o} />
      ))}

      {/* highlighted coverage dots */}
      {highlighted.map((d, i) => (
        <g key={`h-${i}`}>
          <circle cx={d.x} cy={d.y} r="3" fill="hsl(199 95% 60%)" opacity="0.9" />
          <circle cx={d.x} cy={d.y} r="6" fill="none" stroke="hsl(199 95% 60%)" strokeWidth="1" opacity="0.4">
            <animate attributeName="r" from="3" to="10" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* connection between BR and US */}
      <path
        d={`M ${pins[0].x} ${pins[0].y} Q ${(pins[0].x + pins[1].x) / 2} ${pins[0].y - 60} ${pins[1].x} ${pins[1].y}`}
        fill="none"
        stroke="hsl(199 95% 60%)"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        opacity="0.7"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.5s" repeatCount="indefinite" />
      </path>

      {/* main pins */}
      {pins.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="22" fill="url(#mapGlow)" />
          <circle cx={p.x} cy={p.y} r="6" fill="hsl(199 95% 60%)" stroke="#fff" strokeWidth="2" />
          <rect x={p.x + 12} y={p.y - 14} width={p.label.length * 5.5 + 14} height="20" rx="10" fill="#0f172a" stroke="hsl(199 95% 60% / 0.5)" />
          <text x={p.x + 19} y={p.y} fill="#fff" fontSize="9" fontWeight="700" fontFamily="Sora, sans-serif">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default WorldMap;
