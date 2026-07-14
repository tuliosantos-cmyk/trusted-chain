## Objetivo

Revisar o deck `/myts-passaporte` (arquivo `src/pages/MytsPassaporte.tsx`, 16 slides) do início ao fim depois das últimas remoções (bloco "20+/1.000+/8", "Consórcio de execução" no Slide 12, "Diretor Comercial" no Slide 16, troca de e-mail, logos dos parceiros em cor original nas capas) e aplicar polimento de layout onde estiver inconsistente.

## Como vou auditar

Para cada slide, rodo Playwright em Full HD e comparo contra 6 checklists:

1. **Repetição de conteúdo** — mesma frase/dado aparecendo em 2+ slides sem intenção (ex.: manifesto duplicado, tagline "Infraestrutura Digital de Confiança" repetida, KPIs órfãos).
2. **Numeração e labels** — `SectionLabel` numerado corretamente (hoje vai de 01 a 15 + capa; conferir se algum "N" ficou fora de ordem depois das remoções).
3. **Hierarquia tipográfica** — títulos, subtítulos, kickers e body usando as mesmas escalas entre slides equivalentes (ex.: todos os títulos de seção clara em `text-5xl`, todos os manifestos em navy no mesmo tamanho).
4. **Grid e alinhamento** — cards da mesma linha com mesma altura, gaps consistentes (gap-5 vs gap-6), padding externo do slide (`p-10/p-12/p-16`) padronizado por tipo de slide (hero navy vs conteúdo claro).
5. **Logos e parceiros** — MyTS + Groundd + RAMO renderizados com a mesma variante em cada contexto (capa/encerramento coloridos; slides internos conforme decisão anterior), sem chip branco solto onde não deveria.
6. **Overflow / respiro** — nenhum bloco cortado no 16:9, footer/rodapé com respiro mínimo, parágrafos sem 5+ linhas.

Cada achado vira uma linha num relatório interno curto: `Slide NN — problema — correção`.

## Correções que vou aplicar (polimento de layout)

Depois da auditoria, aplico só o que for inconsistência real. Escopo esperado:

- **Padronizar padding dos slides** por família (hero navy vs conteúdo claro) para não haver um slide "apertado" e outro "folgado" lado a lado.
- **Igualar escalas tipográficas** dos títulos de seção e kickers entre slides do mesmo tipo.
- **Alinhar grids** (mesma altura mínima em cards da mesma linha, mesmo `gap`, mesmo `rounded`).
- **Remover textos órfãos** — qualquer sobra das seções que já foram tiradas (ex.: subtítulo/rodapé que ficou fazendo referência a algo que não existe mais).
- **Consolidar repetições** — se o manifesto "Existimos para transformar..." aparecer em mais de um slide, deixo só no Slide 12 e reescrevo o outro com foco próprio.
- **Rechecar Slide 12 (Quem somos) e Slide 16 (Encerramento)** — que foram os mais mexidos recentemente — garantindo que nada quebrou depois das últimas edições.
- **Renumerar `SectionLabel`** se algum número tiver ficado fora de sequência.

## O que NÃO vou fazer

- Não redesenho slides que estão OK.
- Não mudo paleta, fontes nem identidade visual.
- Não adiciono conteúdo novo (dados, cases, logos) que o usuário não pediu.
- Não mexo em nenhum outro arquivo/rota do projeto.

## Entregáveis

1. Relatório curto no chat: lista `Slide NN — o que estava errado — o que foi ajustado`.
2. Commit único no `src/pages/MytsPassaporte.tsx` com o polimento.
3. Screenshots Full HD dos slides que sofreram ajuste, para validação visual antes de fechar.

## Detalhes técnicos

- Arquivo único: `src/pages/MytsPassaporte.tsx`.
- Validação: `bun run build` + Playwright headless em `1920×1080` navegando pela rota `/myts-passaporte` e capturando cada slide via `scroll_into_view_if_needed`.
- Tokens: continuar usando os semantic tokens já definidos (`bg-hero`, `text-primary-foreground`, `text-accent-glow`, `text-gradient`, `bg-gradient-card`, etc.) — nada de cor hardcoded.
