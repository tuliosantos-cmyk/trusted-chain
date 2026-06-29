## Diagnóstico (slide 04 · "Um modelo validado")

Mesmo padrão do slide 02: no viewport real (1338×813) o título `text-5xl` quebra em 3 linhas, empurra o grid de stats, comprime a faixa "O que foi entregue" e a frase azul de rodapé colide com os 7 cards de entregas (ícones cortados, labels sobrepostas pela faixa).

## Solução — densidade ajustada, só neste slide

`src/pages/MyTS360.tsx`, componente `ModeloValidado` (≈ linhas 460–513):

1. **Slide**: passar `pad="p-10 md:p-12"` (libera ~64px verticais).
2. **Título h2**: `text-5xl` → `text-4xl`; `mt-5` → `mt-3`.
3. **Grid de stats** (`mt-8` → `mt-5`, `gap-5` → `gap-4`):
   - card `p-6` → `p-4`
   - ícone `size-8` → `size-7`, margem `mt-3` → `mt-2`
   - valor `text-4xl` → `text-3xl`
   - label `text-base` → `text-sm`, `mt-3` → `mt-1.5`
4. **Bloco "O que foi entregue"** (`mt-7` → `mt-4`, `p-7` → `p-4`):
   - grid interno `mt-5` → `mt-3`, `gap-4` → `gap-3`
   - cards de entrega `p-4` → `p-2.5`, `gap-3` → `gap-2`
   - caixa do ícone `size-14` → `size-10`, ícone `size-7` → `size-5`
   - label `text-base` → `text-xs`
5. **Faixa azul inferior**: `mt-5` → `mt-3`, `px-7 py-4` → `px-6 py-3`, `text-xl` → `text-base`.

Resultado: stats em uma linha sem aperto, os 7 cards de entrega ficam visíveis por inteiro com ícones e labels, e a faixa de rodapé fica abaixo deles sem sobreposição — válido em 1338×813 e ainda equilibrado em 1920×1080.