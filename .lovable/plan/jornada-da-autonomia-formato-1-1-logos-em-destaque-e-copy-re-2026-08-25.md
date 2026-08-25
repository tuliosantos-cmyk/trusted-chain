# Jornada da Autonomia — formato 1:1, logos em destaque e copy revisada

## 1. Formato quadrado 1080×1080

- Trocar o canvas de 1080×1920 para 1080×1080 (formato principal).
- Recalibrar todos os layouts para a área quadrada: títulos com menos linhas, blocos de texto mais altos no eixo vertical, lockup de logos com respiro real na base.
- Ajustar preview (cards e modal) e GIF para 1:1 (GIF em 720×720, 12 fps).
- MP4 continua em resolução real, agora 1080×1080.

## 2. Logos com destaque e contraste

Hoje as logos são desenhadas pequenas, todas na mesma linha e sempre com a mesma opacidade — o Carrefour (azul/vermelho) perde força sobre o verde escuro.

Mudanças:
- **Placa branca de assinatura**: faixa clara arredondada na base, com as logos originais em cima. Isso garante contraste correto do Carrefour e da MyTS em qualquer fundo, sem precisar de versões dessaturadas.
- Logos maiores (altura ~2x a atual) e com separadores verticais discretos entre as marcas.
- Abertura: logo "Jornada da Autonomia" em destaque grande no topo, não só no rodapé.
- Uso de cor mais intencional: verde escuro (#577550) para abertura, verde médio (#3c8b59) para contexto, quase-preto (#231f20) só na tela de peso, branco no contato — mantendo a paleta, mas com contraste claro entre telas consecutivas.

## 3. Sugestões de copy

Tom mantido: aviso direto, sem urgência artificial.

**Vídeo A — Curta**
1. "Jornada da Autonomia"
2. "Um programa do Carrefour com a MyTS."
3. "Participação obrigatória para fornecedores."
4. "Dúvidas? Ricardo Machado, MyTS — (14) 9 9844-5410"

**Vídeo B — Com o porquê**
1. "Jornada da Autonomia"
2. "Carrefour e MyTS acompanham o desenvolvimento da sua empresa." (frase mais curta que a atual, que hoje ocupa 4 linhas)
3. "Agora esse acompanhamento tem um caminho claro."
4. "Participação obrigatória."
5. Contato.

**Vídeo C — Reforço**
1. "Jornada da Autonomia"
2. "É rápido. É gratuito. É obrigatório."
3. "Seu acesso já está liberado."
4. "Falta só entrar."
5. Contato.

Ganho principal: frases mais curtas leem melhor em 1:1 e no WhatsApp, e a revelação palavra por palavra fica mais ritmada.

## Detalhes técnicos

- `src/lib/jornada/engine.ts`: `CANVAS = { w: 1080, h: 1080 }`, `drawLockup` reescrito com placa de fundo, altura e gap maiores, separadores.
- `src/lib/jornada/videos.ts`: reescala de tamanhos de fonte e posições verticais das cenas; ajustes de copy.
- `src/components/jornada/JCanvas.tsx` e `src/pages/VideosJornada.tsx`: `aspectRatio: "1 / 1"`, textos de resolução atualizados.
- `src/lib/jornada/export.ts`: GIF em 720×720.
