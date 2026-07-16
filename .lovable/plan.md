## Diagnóstico

Cada `Slide` é 16:9 (~1600×900 no preview atual), mas eu estou dimensionando os elementos como se fossem uma seção de landing page normal. Resultado: títulos `text-5xl`, cards `p-6`, gaps `gap-5`, ícones `size-6`, corpo `text-[13-15px]` — tudo pequeno para uma tela inteira. O olho vê "componentes flutuando em vazio".

Raiz do problema:
1. **Padding do Slide muito frouxo**: `p-12 md:p-16` come 128px de cada lado sem devolver densidade
2. **Escalas tipográficas subdimensionadas**: títulos deveriam ser 72-96px, não 48px
3. **Cards pequenos** com padding tímido (`p-5/6/7`) e ícones `size-6`
4. **Gaps entre elementos** (`gap-3/4/5`) somados ao padding do slide criam "ilhas" isoladas
5. **Diagramas SVG limitados** por `max-h-[380-560px]` — poderiam usar 100% do espaço vertical
6. **Corpo de texto 13-15px** parece pequeno numa tela grande de apresentação

## Estratégia

Reescala global e proporcional em `src/pages/MytsPassaporte.tsx`, sem mudar copy, estrutura, cores, ordem dos slides nem tokens do design system.

### 1. Padding do Slide
- `pad` padrão: `p-12 md:p-16` → **`p-10 md:p-14`** (recupera ~30-50px de área útil por lado)

### 2. Escala tipográfica (todos os slides)

| Elemento | Antes | Depois |
|---|---|---|
| H1 capa (S01) | `text-6xl md:text-7xl` | `text-7xl md:text-8xl` |
| H2 slides internos | `text-5xl md:text-6xl` | `text-6xl md:text-7xl` |
| Assinatura S05 "jornada" | `text-[64px]` | `text-[88px] md:text-[104px]` (essa é a frase-assinatura do deck) |
| Subtítulos/lead | `text-lg/xl` | `text-xl/2xl` |
| Corpo em cards | `text-[13-15px]` | `text-[16-18px]` |
| KPIs numéricos (S01) | `text-2xl` (compactos) | `text-4xl` (voltar ao formato grande) |

### 3. Cards, ícones e gaps
- Ícones principais: `size-6` → `size-8/10`; ícone-container `size-11/12` → `size-14/16`
- Padding cards: `p-6/7` → `p-8/10`
- Gap entre cards: `gap-4/5` → `gap-6/8`
- Radius: manter `rounded-2xl` (consistente)

### 4. Diagramas SVG
- `InitiativeHub` (S03): remover `max-h-[380px]`, deixar preencher o container (flex-1)
- `JourneySteps` (S04): aumentar círculos `size-24` → `size-32`; label `text-[22px]` → `text-[26px]`; pill parceiro `text-[10px]` → `text-[12px]`
- `VirtuousCycle` (S08): remover `max-h-[560px]`; aumentar raio/nós; fonte dos labels 13→16
- `ChallengeFlow` (S02): nós `size-20` → `size-28`; ícone `size-8` → `size-11`; label `text-[15px]` → `text-[17px]`

### 5. Ajustes por slide

**S01 (Potencial)** — voltar KPIs para o formato "big number + descrição empilhada" (não linha compacta), foto do produtor maior; grid `12` mantido, mas col-span da foto puxa mais peso visual.

**S02 (Desafio)** — flow com nós maiores; grid de dados `grid-cols-3` já bom, cada card com número gigante em destaque.

**S03 (Abordagem)** — hub SVG preenchendo 100% do col-span; cards MyTS/Groundd/RAMO com padding maior, logo/ícone maior.

**S04 (Jornada)** — timeline preenchendo a largura, círculos maiores; frase-âncora `text-2xl` → `text-3xl`.

**S05 (Entregamos)** — a linha "Não vendemos software. Entregamos jornada." vira o herói tipográfico do slide (~96-104px). Cards de entrega maiores.

**S06 (Antes → Depois)** — retrato do José maior (col-span 3 → coluna mais alta); listas Antes/Depois com texto 15→17px, spacing generoso.

**S07 (Diferencial)** — manifesto 60→72px; cards diferencial e cases maiores.

**S08 (Impacto)** — coluna esquerda ganha `text-3xl` na lista de propósito; ciclo virtuoso ocupa 100% do col-span 7.

**S09 (Quem somos)** — fotos do time maiores (`size-16` → `size-24`), cards das 3 orgs com padding maior.

### 6. Regra geral de densidade
- Nenhum `flex-1` órfão gerando ar; usar `justify-between` ou `gap` proporcional
- Substituir `mt-auto` "solto" por distribuição explícita
- Onde há espaço vertical sobrando, aumentar tamanho do elemento visual dominante do slide (diagrama, foto, número)

## Não vou fazer

- Não mudar copy, ordem de slides, cores, tokens ou fontes
- Não trocar componentes (mesmo `Slide`, `SectionLabel`, `Chip`)
- Não mexer em outras rotas
- Não usar cores hardcoded

## Validação

- Build limpo (`bun run build`)
- Playwright headless 1920×1080, screenshot dos 9 slides em `/tmp/browser/passaporte/`, revisão visual comparando "densidade antes/depois"
- Checklist por slide: título domina ≥ 25% da altura útil ou o hero visual domina; nenhum card com mais de 40% de padding interno vazio; diagramas encostam nas bordas do container.
