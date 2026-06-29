## Diagnóstico

Reproduzi no viewport real (1338×813). Confirmado: o slide é escalado pela altura (`min(100%, calc((100vh-64px)*16/9))`) → ~1332×749px no preview do usuário. Mas o conteúdo é dimensionado com tamanhos fixos do Tailwind pensados pra 1080p, então sobra altura insuficiente quando a janela é mais baixa.

Evidência visual:
- Coluna "Hoje": **"Fim da jornada"** corta na metade.
- Coluna "Com MyTS 360": **"Compartilhe e fortaleça a confiança"** cortado e o card "Experiência digital" sobrepõe.
- Faixa azul inferior também é empurrada para fora do slide.

Não é o box direito que está estourando — são **título + paddings + cards** consumindo altura demais para este viewport.

## Solução

Ajuste cirúrgico só no slide 02 (`DaCertificacao`), sem mexer no `Slide` global nem nos outros slides:

1. **Padding do slide**: trocar `pad` para `p-10 md:p-12` (menos generoso que o default `p-12 md:p-16`) → libera ~64px verticais.
2. **Título h2**: `text-5xl` → `text-4xl`, `mt-5` → `mt-3`, `leading-[1.05]` mantido.
3. **Gap acima do grid**: `mt-8` → `mt-5`; `gap-8` → `gap-6`.
4. **Coluna "Hoje"** (`p-7` → `p-5`):
   - cabeçalho `mt-5` → `mt-3`
   - itens: `px-5 py-4` → `px-4 py-2.5`, ícone `size-6` → `size-5`, texto `text-xl` → `text-base`
5. **Coluna "Com MyTS 360"** (`p-6` → `p-5`):
   - cabeçalho `mt-4` → `mt-3`, `gap-3` → `gap-2.5`
   - tiles da linha 1: `py-2.5` → `py-2`, ícone `size-8` → `size-7`, texto `text-base` → `text-sm`
   - QR (gatilho): `py-3` → `py-2.5`, ícone `size-11` → `size-9` / interno `size-6` → `size-5`, título `text-lg` → `text-base`
   - sub-card "Experiência digital": `p-3.5` → `p-3`, `space-y-1.5` → `space-y-1`, ícones inline `size-4` → `size-3.5`, texto `text-sm` mantido
   - CTA "Compartilhe": `py-3` → `py-2.5`, ícone `size-5` → `size-4`, texto `text-base` mantido
6. **Faixa de rodapé** (frase "Cada produto passa a mostrar…"): `mt-6` → `mt-4`, `px-7 py-4` → `px-6 py-3`, `text-xl` → `text-base`.

Resultado esperado: no viewport 1338×813 todos os elementos cabem dentro do retângulo do slide com folga, mantendo a hierarquia visual (QR Code continua em destaque, paralelo entre "Hoje" e "Com MyTS 360" preservado). Em 1920×1080 o slide ainda fica equilibrado, só um pouco mais respirado.

## Arquivos

- `src/pages/MyTS360.tsx` — componente `DaCertificacao` (≈ linhas 211–340) e prop `pad` do `Slide`.