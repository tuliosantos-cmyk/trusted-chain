## Ajuste — Slide 03 (Benefícios para todo o ecossistema)

**Problema:** os itens com check da terceira coluna estão estourando o card e/ou avançando sobre a faixa de rodapé "O MyTS 360 fortalece toda a cadeia…". A coluna com mais bullets não cabe na altura disponível porque os tokens atuais (`p-8`, `text-xl`, ícone `size-6` + `size-16` no header, `gap` largo e faixa final `py-4 text-xl`) consomem mais altura do que os 1080px do slide comportam após o título.

## O que mudar em `src/pages/MyTS360.tsx` (bloco do `EcossistemaBeneficios`, linhas ~396–438)

1. **Título mais compacto:** `text-5xl` → `text-4xl`, `mt-5` → `mt-4`.
2. **Grid dos cards:** `mt-10 gap-6` → `mt-6 gap-5`, manter `min-h-0` e adicionar `overflow-hidden` em cada card para garantir contenção.
3. **Cards:** padding `p-8` → `p-6`, header com ícone `size-16` → `size-14` e ícone interno `size-8` → `size-7`, eyebrow `text-sm` mantido mas com `tracking-wider`.
4. **Lista de bullets:** trocar `justify-around gap-2` por `justify-start gap-3`, reduzir texto `text-xl` → `text-base leading-snug`, check `size-6` → `size-5`, `mt-7` do wrapper → `mt-5`.
5. **Faixa de rodapé:** `mt-6 py-4 text-xl` → `mt-5 py-3 text-base`, mantendo o destaque do span em `text-accent-glow`.

Resultado esperado: as três colunas terminam acima da faixa final, sem corte nem sobreposição, mantendo a hierarquia visual e o gradiente premium.

## Validação

Capturar screenshot do `/myts-360` no viewport 1338×813 via Playwright após a edição para confirmar que nenhum item escapa do card e a faixa final permanece visível.
