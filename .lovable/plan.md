## Diagnóstico
O problema no PPTX atual veio da forma como capturei a página: forcei cada slide a 1920×1080 via CSS, mas o componente `Slide` foi desenhado para `maxHeight: 92vh` (≈ 993px) — sobrou ~90px de espaço vazio no rodapé de muitos slides, e em outros o `flex justify-center` não preencheu o frame inflado. Resultado: layout "solto", conteúdo desalinhado, sensação de mal diagramado.

## Plano de correção

1. **Refazer as capturas com renderização nativa**
   - Subir o Playwright com viewport `1920 × 1175` (assim `92vh` = ~1081, que casa naturalmente com o aspect-ratio 16/9 = 1080).
   - **Remover** o CSS que forçava altura fixa. Manter só:
     - Esconder scrollbars
     - Largura do `container` em 1920px
     - Zerar paddings externos do `<section>`
   - Deixar o componente `Slide` desenhar do jeito original — frame interno fica 1920×1080 sem espaço residual.

2. **Garantir conteúdo completo em cada slide**
   - Esperar `document.fonts.ready` + todos `<img>` carregados.
   - Para cada slide, antes do screenshot: rolar até ele, esperar 250ms, verificar `boundingBox` ≈ 1920×1080. Se não bater, logar e re-tentar.
   - Screenshot só do frame interno (`section .container > div`), 2x DPR → 3840×2160.

3. **Ajustes pontuais via CSS de export (apenas se necessário)**
   - Aumentar levemente alguns gaps em slides muito densos (ex.: timeline seção 06) só durante o export, para evitar elementos colados na borda.
   - Forçar `image-rendering: -webkit-optimize-contrast` para SVGs (logo MyTS) ficarem nítidos.

4. **Reconstruir o PPTX**
   - 13.333" × 7.5" (16:9 widescreen).
   - 1 imagem por slide cobrindo 100% do slide.
   - Salvar como `FSSC-22000-V7_v2.pptx` em `/mnt/documents/`.

5. **QA visual obrigatório, slide a slide**
   - Converter para PDF via LibreOffice e gerar JPGs.
   - Inspecionar **cada um dos 20 slides** procurando: corte de conteúdo, espaço vazio anormal, ícone faltando, texto sobreposto, foto da Anne ausente onde deveria estar.
   - Listar problemas encontrados e corrigir antes de entregar — não entregar na primeira passada sem revisão.

6. **Entrega**
   - Mandar `FSSC-22000-V7_v2.pptx` aqui no chat via `<presentation-artifact>`.

## Observação importante
Esse caminho continua gerando o PPTX como **imagens** (1 imagem por slide) para preservar 100% do visual da página (gradientes, SVGs, ícones Lucide, watermark MyTS). Texto não vai ser editável no PowerPoint.

Se você quiser **texto editável** dentro do PowerPoint (poder mudar uma palavra, ajustar cor de uma célula da tabela, etc.), aí o caminho é outro: reconstruir cada slide nativamente com formas e caixas de texto via `python-pptx`. Funciona, mas:
- demora bem mais (cada slide precisa ser remontado à mão)
- alguns elementos ricos (gradientes complexos, SVG da logo, watermark, hexágonos da Cultura de Qualidade) ficam mais simples que na página original
- exige outra rodada de QA

**Me confirma qual versão você quer:**
- **(A)** Refazer como imagens, arrumadinho (rápido — esse plano acima)
- **(B)** Refazer nativo editável no PowerPoint (mais demorado, visual um pouco mais simples)
- **(C)** Fazer as duas e te entregar os dois arquivos