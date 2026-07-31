## Objetivo

Exportar os 7 slides do `/myts-passaporte` em um PDF idêntico ao que aparece na tela — mesmo layout, mesmas cores, mesma tipografia — sem redesenhar nada.

## Como funciona

O deck já é desenhado num canvas fixo de 1600×900 px que é escalado por `transform: scale()`. Isso é exatamente o que precisa para um PDF fiel: basta renderizar cada slide no tamanho nativo, um por página, em páginas de 1600×900 (16:9, formato de apresentação).

## O que vou fazer

1. **Modo impressão na própria página** — `/myts-passaporte?print`
   - Cada slide renderiza em 1600×900 sem sombra, sem borda arredondada, sem espaçamento entre eles.
   - CSS `@page { size: 1600px 900px landscape; margin: 0 }` e quebra de página após cada slide.
   - Com isso você mesmo pode fazer `Cmd/Ctrl + P → Salvar como PDF` a qualquer momento e sai igual à tela.

2. **Botão "Baixar PDF"** discreto no topo do deck (some no modo impressão e na apresentação), que abre a rota de impressão e dispara a caixa de impressão.

3. **PDF gerado agora** — rodo o deck em modo impressão via Chromium headless e entrego o arquivo pronto (`myts-passaporte.pdf`, 7 páginas 16:9) para você baixar aqui mesmo.

4. **QA visual obrigatório** — converto todas as páginas do PDF em imagem e confiro uma a uma: nada cortado, sem página em branco, fotos e SVGs presentes, fundos escuros renderizados, ordem correta. Corrijo e regero até passar limpo.

## Detalhes técnicos

- No modo `print`, o componente `Slide` ignora o `ResizeObserver` e fixa `scale = 1`, com o `<section>` em 1600×900 exatos.
- `print-color-adjust: exact` para os fundos escuros e gradientes não serem descartados na impressão.
- O `ScrollSnap` e o padding do `<main>` são desativados nessa rota.
- Geração do arquivo com Playwright `page.pdf({ width: 1600, height: 900, printBackground: true })`.

## Não vou fazer

- Não mudo copy, cores, fontes nem posicionamento de nenhum slide.
- Não mexo em outras rotas do projeto.
