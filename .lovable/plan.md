## Slide 06 (Oportunidade) — ajuste de layout

Mesmo viewport real do usuário (1338×813) que causou cortes nos slides 02 e 04 está cortando o 06: título em 2 linhas grandes, seções "Hoje" e "Novo" empurradas pra baixo, faixa de rodapé sobreposta.

### Mudanças em `src/pages/MyTS360.tsx` › `Oportunidade`

1. **Padding do Slide** → de padrão para `p-10 md:p-12`.
2. **Título**: `text-5xl` → `text-4xl`, `mt-4` → `mt-3`.
3. **Espaçamento do grid principal**: `mt-9` → `mt-6`, `gap-6` → `gap-5`.
4. **Coluna "Hoje"**:
   - Padding card: `p-7` → `p-5`.
   - Itens: `py-4 px-5` → `py-2.5 px-4`, ícone `size-6` → `size-5`, texto `text-xl` → `text-base`.
   - `gap-3` → `gap-2`.
5. **Bloco "+" central**:
   - Círculo `size-20` → `size-14`, "+" `text-5xl` → `text-3xl`.
6. **Coluna "Novo"**:
   - Padding card: `p-7` → `p-5`.
   - Itens: `px-4 py-3.5` → `px-3 py-2.5`, container ícone `size-11` → `size-9`, ícone `size-5` → `size-4`, texto `text-lg` → `text-sm`.
   - `gap-3` → `gap-2.5`.
7. **Faixa de rodapé**:
   - `mt-6 px-7 py-4` → `mt-4 px-6 py-3`, texto `text-xl` → `text-base`.

Resultado esperado: título em 1 linha, as duas colunas com altura confortável, faixa de rodapé visível com folga acima do footer do slide, sem sobreposição.