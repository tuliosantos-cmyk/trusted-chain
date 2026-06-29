## Problema

No slide 02 ("Da certificação à experiência"), a coluna direita "Com MyTS 360" tem 7 itens empilhados (vs. 5 da coluna "Hoje"), com ícones grandes (size-10), padding generoso (px-5 py-3) e fonte `text-lg`. Resultado: os últimos cards vazam para fora do box.

## Solução proposta

Em vez de só encolher tudo (o que deixaria o lado direito "miúdo" e quebraria o paralelo visual com o lado esquerdo), reagrupar os 7 itens em uma hierarquia narrativa de 4 blocos visuais, ocupando a mesma altura do "Hoje":

```text
┌─ Com MyTS 360 ──────────────── jornada ampliada ┐
│                                                 │
│ [🏢 Empresa certificada] [🏅 Selo Produtor do Bem]  ← linha 1: ponto de partida (2 col)
│                                                 │
│ [📱 QR Code na embalagem]                        ← linha 2: gatilho (destaque, full)
│                                                 │
│ ┌─ Experiência digital ──────────────────────┐  ← linha 3: bloco agrupado
│ │ 🌐 Website personalizado                    │
│ │ 👥 Conheça produtores & fazendas            │
│ │ 📖 Boas práticas + significado do selo      │
│ └────────────────────────────────────────────┘  │
│                                                 │
│ [↗ Compartilhe e fortaleça a confiança]         ← linha 4: resultado (full, accent)
└─────────────────────────────────────────────────┘
```

Isso reduz de 7 caixas soltas para 4 blocos visuais com ritmo claro: ponto de partida → gatilho (QR) → o que acontece dentro (3 itens agrupados num sub-card) → resultado final. Combina com as 5 linhas do "Hoje" sem parecer apertado.

## Mudanças técnicas

Arquivo: `src/pages/MyTS360.tsx`, componente `DaCertificacao` (linhas ~211–304).

- Trocar o array plano `com` por uma estrutura agrupada (partida, gatilho, experiência[], resultado).
- Reescrever apenas o JSX do bloco "COM MyTS 360" (linhas 270–293):
  - Linha 1: grid `grid-cols-2 gap-3` com Empresa + Selo (tile compacto, `py-2.5`, `text-base`, ícone `size-8`).
  - Linha 2: QR Code em destaque (full width, fundo `bg-accent/15`, borda `border-accent/50`, ícone maior).
  - Linha 3: sub-card com header "Experiência digital" + 3 linhas internas compactas (sem ícone grande em caixa, apenas ícone inline `size-4`).
  - Linha 4: CTA full width "Compartilhe…" com gradiente accent.
- Manter `justify-between` no container para distribuir as 4 linhas verticalmente e preencher exatamente a altura do card esquerdo.
- Não mexer na coluna "Hoje" nem no resto do slide.

Resultado: zero overflow, paridade visual entre as duas colunas e leitura narrativa mais forte do "antes vs. depois".