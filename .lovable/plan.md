## Objetivo

Reescrever `/myts-passaporte` (`src/pages/MytsPassaporte.tsx`) do formato atual (16 slides) para uma **narrativa enxuta de 8 slides** sintetizando o melhor das duas versões (Claude + GPT): estrutura objetiva do Claude + força narrativa/visual do GPT, com o produtor como protagonista desde o slide 1 e diagramas substituindo blocos de texto sempre que possível.

Foco: deck de 10–15 min para fundos/financiadores, cada slide respondendo a **uma pergunta clara**.

## Nova estrutura (8 slides)

```text
01 — O potencial já existe. O reconhecimento ainda não.   [Por que isso importa?]
02 — O desafio                                            [Qual é o problema?]
03 — Nossa iniciativa                                     [O que é?]
04 — Como funciona                                        [A jornada]
05 — O que entregamos                                     [Desenvolvimento · Evidências · Mercado]
06 — Por que funciona (MyTS + Groundd + RAMO + cases)     [Por que somos diferentes?]
07 — O impacto                                            [Ciclo virtuoso]
08 — Quem somos                                           [Time + contato]
```

## Copy final (síntese Claude + GPT)

### Slide 01 — O potencial já existe. O reconhecimento ainda não.
Narrativa curta primeiro, dados depois (3 números, não mais). Fecha com a linha-manifesto "O impacto já existe. O reconhecimento ainda não." KPIs: 77% agricultura familiar · R$ 170 bi sociobiodiversidade até 2040 · territórios indígenas entre as áreas mais preservadas.

### Slide 02 — O desafio
Praticamente sem texto corrido. Um **fluxo vertical/horizontal**: Produtor → planilhas → WhatsApp → papel → certificados → ninguém vê → não acessa mercado → recebe menos. Ao lado, 3 chips curtos com os efeitos em Empresas / Consumidores / Investidores. Uma stat de reforço (62% dos consumidores trocariam de marca — Deloitte/GS1).

### Slide 03 — Nossa iniciativa
Título "Como transformamos impacto em acesso a mercado." Diagrama central: **MyTS no núcleo**, Groundd e RAMO orbitando como camadas complementares. Abaixo, fluxo linear enxuto: Território → Capacitação → Organização → Evidências → Passaporte → Mercado.

### Slide 04 — Como funciona
Só o fluxo, sem parágrafos: Diagnóstico → Capacitação → Organização → Validação → Passaporte Digital → Mercado. Uma frase-âncora embaixo: "Cada etapa fortalece capacidades que permanecem no território."

### Slide 05 — O que entregamos
Reorganizado **por entrega, não por público** (mudança do GPT):
- **Desenvolvimento** — diagnóstico, capacitação, trilhas, acompanhamento
- **Evidências** — documentos, indicadores, conformidade, rastreabilidade, governança
- **Conexão com mercado** — Passaporte Digital, QR Code, história, transparência, reconhecimento

Layout: 3 colunas com ícones grandes.

### Slide 06 — Por que funciona
Manifesto curto: "Não fazemos apenas auditorias. Não entregamos apenas tecnologia. Não realizamos apenas capacitações. Integramos tudo numa jornada contínua."
Abaixo, 3 cards MyTS / Groundd / RAMO (1 linha cada) + faixa de cases reduzida:
- **Korin** — Passaporte Digital para consumidores
- **Carrefour** — Jornada da Autonomia, desenvolvimento de fornecedores

### Slide 07 — O impacto
Diagrama circular (ciclo virtuoso): Produtores preparados → Evidências → Reconhecimento → Acesso a mercado → Renda → Comunidades fortalecidas → Territórios conservados → Confiança na cadeia → (volta). Uma frase de fechamento.

### Slide 08 — Quem somos
3 cards de time (Valmir · Marisa · Federico) com bios curtas (placeholder marcado onde faltar dado) + contato (`valmir@myt-s.com · myt-s.com`) + logos MyTS / Groundd / RAMO coloridos.

## Diagramas novos (SVG inline, mesmos tokens do sistema visual atual)

1. **`ChallengeFlow`** (Slide 2) — cadeia horizontal com nós Produtor → planilha → WhatsApp → papel → certificado → invisível → sem mercado → menos renda. Linhas tracejadas animadas, ícones Lucide dentro de nós circulares, cor `--muted` esmaecendo à direita para reforçar "perda de valor".
2. **`InitiativeHub`** (Slide 3) — evolução do `FlowDiagram` atual: núcleo MyTS + satélites Groundd e RAMO + anel externo com as 6 etapas da jornada. Reaproveita gradientes `--gradient-accent` / `centerGlow`.
3. **`JourneySteps`** (Slide 4) — timeline horizontal de 6 marcos, numerados 01–06, com conector gradient e ícone por etapa. Nada de texto extra.
4. **`VirtuousCycle`** (Slide 7) — círculo com 8 nós ligados por setas curvas (SVG), ícones pequenos e labels curtas. Substitui a lista textual atual.

Todos os SVGs em `src/components/landing/visuals/` seguindo o padrão de `FlowDiagram.tsx` / `DashboardMock.tsx` (viewBox, HSL tokens diretos, sem cores hardcoded fora do padrão já usado).

## Padrão visual (mantido)

- Alternância `bg-hero` (navy, slides emocionais 01 · 03 · 06 · 08 capa/encerramento) vs `bg-background` (claro, slides de estrutura/dados 02 · 04 · 05 · 07).
- `SectionLabel` renumerado 01→08.
- Tipografia: Rubik display / Lato body, escalas já definidas.
- Tokens semânticos apenas (`text-accent`, `text-accent-glow`, `text-gradient`, `bg-gradient-card`, `bg-gradient-dark-card`, `shadow-elegant`, `shadow-cta`). Zero cor hardcoded.
- Logos MyTS + Groundd + RAMO coloridos na capa e no slide 8; monocromo/branco quando sobre navy nos slides internos.

## O que NÃO vou fazer

- Não mexer em outras rotas/arquivos (`Index`, `Korin360`, `MyTS360`, etc.).
- Não mudar paleta, fontes, tokens ou `index.css`.
- Não adicionar dados/cases/clientes que não estão nos textos acima (sem "Mercado Livre", sem "MIDR" no corpo).
- Não recuperar seções removidas anteriormente (bloco "20+/1.000+/8", "Consórcio de execução", "Diretor Comercial").
- Não pluralizar CSDDD como argumento forte — manter só menção leve, ênfase em EUDR (nota do próprio texto do usuário).

## Validação

- `bun run build` limpo.
- Playwright headless 1920×1080 varrendo os 8 slides, screenshots salvos em `/tmp/browser/passaporte/` e revisados um a um: sem overflow, sem colunas com alturas quebradas, diagramas legíveis, sem texto órfão de versões antigas.
- Checklist final: cada slide responde à sua pergunta (importância / problema / o que é / como / entregas / diferencial / impacto / quem), e o produtor aparece como protagonista já no slide 1.

## Entregáveis

1. `src/pages/MytsPassaporte.tsx` reescrito para os 8 slides.
2. 4 novos componentes em `src/components/landing/visuals/` (`ChallengeFlow`, `InitiativeHub`, `JourneySteps`, `VirtuousCycle`).
3. Relatório curto no chat com screenshots dos 8 slides finais.
