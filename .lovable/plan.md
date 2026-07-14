## Nova apresentação: `/myts-passaporte`

Deck institucional MyTS "Infraestrutura Digital de Confiança" com 16 slides 16:9, no mesmo padrão visual/tipográfico do `/myts-360` (navy + azul elétrico, Rubik/Lato, chips, `SectionLabel`, cards `bg-gradient-dark-card`, decor sutil com grid/glow).

Cliente da capa fica como placeholder editável **(Cliente)** — trocado manualmente antes de cada apresentação.

## Estrutura dos 16 slides

Cada slide é uma `Slide` (mesmo componente do MyTS360) 16:9, com decor próprio, ícones Lucide e uma peça visual distinta — sem repetir layouts.

| # | Slide | Peça visual principal |
|---|-------|----------------------|
| 01 | **Capa** — MyTS · Infraestrutura Digital de Confiança · em parceria com Groundd e RAMO · Apresentação para (Cliente) | Hero navy com grid pattern, glow radial, marca MyTS grande, chips dos parceiros |
| 02 | **O mercado mudou** — confiança virou exigência (consumidores/compradores/investidores/reguladores) | 4 cards em grid com ícones (Users, ShoppingBag, TrendingUp, Scale) + linha do "novo contrato de mercado" |
| 03 | **O desafio** — patrimônio invisível disperso em docs/planilhas/certificados | Ilustração SVG "caos → ordem": documentos flutuantes desorganizados de um lado, migrando para um hub central |
| 04 | **A consequência** — 4 custos numerados (acesso a mercado, risco regulatório, baixa valorização, processos lentos) | Grid 2×2 numerado 01–04 com barra lateral em accent-glow, tagline final "A cadeia produz valor. O mercado não enxerga." |
| 05 | **A resposta: MyTS** — Infraestrutura Digital de Confiança | Slide manifesto navy, tipografia grande, "uma infraestrutura · múltiplas aplicações" com halo |
| 06 | **Como funciona** — diagrama do fluxo Diagnóstico → Desenvolvimento → Organização → Evidências → Inteligência Territorial → Passaporte Digital → Mercado | SVG vertical/horizontal com 7 nós conectados, mercado final se ramificando em 4 destinos (Consumidores, Compradores, Investidores, Instituições Financeiras). Estilo herdado do `FlowDiagram` |
| 07 | **Muito além da rastreabilidade** — 6 capacidades da plataforma | Grid 3×2 de cards com ícones (Users=Fornecedores, FileCheck=Documental, Route=Rastreabilidade, Sprout=Socioambiental, QrCode=Passaporte, BarChart=Analítica) |
| 08 | **Passaporte Digital** — tornando a confiança visível | Split: à esquerda copy + bullets; à direita mockup de smartphone com QR Code e tela do Passaporte (produto, origem, produtor, evidências) — SVG estilo mockup do MyTS360 |
| 09 | **Ecossistema de competências** — MyTS + Groundd + RAMO | 3 colunas com card destacado MyTS ao centro (maior, accent), Groundd e RAMO nas laterais. Ícones (Database, Sprout, Satellite/Map) |
| 10 | **Onde essa solução gera valor** — 9 cadeias/aplicações | Constelação de chips/pills flutuantes (Sociobiodiversidade, Agricultura regenerativa, Bem-estar animal, Cooperativas, Programas de fornecedores, Marketplaces, Grandes compradores, Instituições financeiras, Fundos de impacto) sobre grid, com tagline "Uma plataforma. Diversas aplicações." |
| 11 | **Experiência em projetos reais** — Korin, Carrefour, Damm + placeholders (Cliente) | Strip de logos (reusar assets `korin.png`, `carrefour.png` já no projeto) + 2 cards placeholder editáveis |
| 12 | **O valor** — o que muda para cada participante | Grid 2×2: Produtores / Compradores / Consumidores / Investidores. Cada card com ícone, 4–5 bullets curtos, cor de acento por perfil |
| 13 | **Quem somos** — MyTS / My Trusted Source | Slide institucional: logo grande, tagline, parágrafo + 3 mini-stats placeholder (clientes, fornecedores, setores) prontos para preencher |
| 14 | **Nosso time** — Valmir + 4 placeholders | Grid de 5 cards de pessoa com avatar circular (placeholder monograma), nome, cargo, bio curta editável |
| 15 | **Próximos passos** — como cada projeto é estruturado | Timeline horizontal com 4 marcos (Diagnóstico → Desenho → Implantação → Evolução), copy sobre personalização |
| 16 | **Encerramento** — "Confiança não nasce no ponto de venda" + contatos | Slide navy full-bleed, tipografia dramática, bloco de contato (Valmir, André, email, site), assinatura tripla MyTS · Groundd · RAMO |

## Detalhes técnicos

- **Arquivo:** `src/pages/MytsPassaporte.tsx` (mesmo esqueleto do `MyTS360.tsx` — reuso de `Slide`, `Chip`, `SectionLabel`, `Deck`)
- **Rota:** adicionar `<Route path="/myts-passaporte" element={<MytsPassaporte />} />` em `src/App.tsx`
- **Componentes visuais novos** (locais ao arquivo, para não poluir `components/`):
  - `FluxoInfraestrutura` — SVG do slide 6 (7 nós → 4 saídas), com linhas animadas dashed no estilo `FlowDiagram`
  - `MockupPassaporte` — SVG de smartphone com QR + tela do Passaporte (slide 8)
  - `EcossistemaTri` — layout dos 3 parceiros (slide 9)
  - `AvatarPessoa` — círculo com monograma + gradiente (slide 14)
- **Design tokens:** só usar semantic tokens já definidos em `index.css` (`bg-gradient-dark-card`, `bg-gradient-accent`, `text-accent-glow`, `shadow-glow`, `grid-pattern`). Zero cor hardcoded.
- **SEO / head:** `<Helmet>` com title "MyTS · Infraestrutura Digital de Confiança" e meta description do encerramento.
- **Sem backend, sem novas dependências.** Só React + Tailwind + Lucide, exatamente como o MyTS360.

## Fora de escopo desta entrega

- Exportar para .pptx (podemos fazer depois com o mesmo pipeline Playwright + pptxgenjs que usamos no MyTS360).
- Editor visual dos textos (por enquanto conteúdo é hardcoded — trocar (Cliente) exige editar o arquivo).
- Fotos reais do time (usamos placeholders com monograma até você mandar).
