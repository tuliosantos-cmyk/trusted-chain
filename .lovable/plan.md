## Redesign do Slide 12 — "Quem somos"

### Diagnóstico
Hoje o slide 12 empilha 5 blocos competindo por atenção: header institucional, manifesto, 3 pilares, ecossistema (5 badges), card "Posicionamento", card "Por que a MyTS" (3 diferenciais) e rodapé de parceiros. Resultado: nenhuma hierarquia clara, o olho não sabe onde começar, e há muita redundância entre "pilares" e "diferenciais" (ambos dizem tecnologia + método + rede/dados).

### Nova proposta — 3 zonas simples, 1 ideia por zona

```text
┌──────────────────────────────────────────────────────────────┐
│ 12 · QUEM SOMOS                                              │
│                                                              │
│ [MyTS logo]  MANIFESTO GRANDE (1 frase forte, 2 linhas)      │
│              destacando "confiança, acesso a mercado e valor"│
│                                                              │
├───────────────────────────┬──────────────────────────────────┤
│                           │                                  │
│  3 PILARES (o que somos)  │  CARD DESTAQUE                   │
│  ┌────┐ ┌────┐ ┌────┐     │  "Uma infraestrutura.            │
│  │icon│ │icon│ │icon│     │   Múltiplas aplicações."         │
│  │Tec │ │Mét │ │Rede│     │                                  │
│  └────┘ └────┘ └────┘     │  + 1 parágrafo curto             │
│                           │                                  │
├───────────────────────────┴──────────────────────────────────┤
│ CONSÓRCIO DE EXECUÇÃO                                        │
│ [MyTS mark] × [Groundd logo] × [RAMO logo]                   │
└──────────────────────────────────────────────────────────────┘
```

### O que muda concretamente

**Removido (reduz ruído):**
- Bloco "Ecossistema conectado" (5 badges Produtores/Compradores/Consumidores/Investidores/Parceiros) — essa mensagem já aparece nos slides 07 e 09, aqui polui.
- Card "Por que a MyTS" com os 3 diferenciais numerados — é uma repetição dos 3 pilares em outras palavras.
- Subtítulo "Infraestrutura digital de confiança · desde 2020" — enxuga o header.

**Mantido e reforçado:**
- Header MyTS enxuto (logo + label "My Trusted Source").
- Manifesto vira o herói do slide (fonte maior, ocupa faixa superior inteira, com destaque em gradient na frase-chave).
- 3 pilares (Tecnologia · Metodologia · Rede) — únicos "o que somos", com ícones e cards maiores/mais respirados.
- Card lateral "Posicionamento" mantido como âncora visual à direita.
- Rodapé de consórcio mantido, mas incluindo a marca MyTS junto a Groundd e RAMO para reforçar o trio.

### Layout técnico
- Faixa superior full-width: header + manifesto (≈ 30% da altura útil).
- Faixa central grid `1.3fr / 0.85fr`: pilares à esquerda, card Posicionamento à direita (≈ 50%).
- Rodapé consórcio full-width (≈ 20%).
- Tipografia respeitando tokens: manifesto `text-[44px]`, pilares título `text-xl`, corpo `text-base`, tudo com `text-primary-foreground` e acentos via `text-accent-glow`/`text-gradient`.
- Sem alterar tokens globais nem outros slides.

### Fora de escopo
- Substituir fotos/nomes reais (slide 13 do time).
- Ajustes de outros slides.
