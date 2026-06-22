## Objetivo
Gerar um arquivo `.pptx` 16:9 com todas as seções da página `/fssc-v7`, mantendo exatamente o visual atual (cores, ícones, layout, logo MyTS, foto da Anne, tabelas, timeline etc.) e disponibilizar para download no chat.

## Abordagem
Como as seções já são montadas no formato `Slide` (16:9) com componentes ricos (SVG, gradientes, ícones Lucide), a forma mais fiel de exportar para PowerPoint é **capturar cada seção como imagem em alta resolução** e montar o PPTX com uma imagem por slide ocupando 100% do slide. Isso garante 1:1 com o que está na tela, sem risco de quebrar tipografia ou layout no Office.

## Passos

1. **Renderizar a página em alta resolução**
   - Subir um script Playwright apontando para `http://localhost:8080/fssc-v7`.
   - Viewport 1920×1080, `deviceScaleFactor: 2` (export em ~3840×2160 por seção, ótimo para projeção).
   - Aguardar fontes e imagens carregarem (`document.fonts.ready` + espera de `img` decodificados).

2. **Capturar cada `Slide` individualmente**
   - Selecionar cada `<section>` da página na ordem em que aparecem.
   - Para cada seção: rolar até ela, forçar `aspect-ratio 16/9` em 1920×1080, e tirar screenshot só daquele elemento (`element.screenshot`).
   - Salvar como `slide-01.png`, `slide-02.png`, … em `/tmp/fssc-v7-export/`.

3. **Montar o PPTX 16:9**
   - Usar `python-pptx` com `SlideWidth=13.333"` e `SlideHeight=7.5"` (widescreen padrão).
   - Para cada PNG: criar slide em branco + `add_picture` cobrindo o slide inteiro (x=0, y=0, w=13.333, h=7.5).
   - Definir título do arquivo: `FSSC-22000-V7-Anne-Dezan-MyTS.pptx`.

4. **QA visual obrigatório**
   - Converter o PPTX gerado em PDF via LibreOffice e renderizar cada página com `pdftoppm`.
   - Inspecionar todos os slides procurando: corte de conteúdo, faltando ícone, foto da Anne ausente onde deveria estar, tabela cortada, etc.
   - Se algum slide vier com defeito, ajustar a captura (espera adicional, scroll, fontes) e regerar antes de entregar.

5. **Entrega**
   - Salvar o arquivo final em `/mnt/documents/FSSC-22000-V7.pptx`.
   - Enviar via `<presentation-artifact>` no chat para download direto.

## Detalhes técnicos
- O PPTX será essencialmente "imagens em slides" — não terá textos editáveis dentro do PowerPoint. Isso é o trade-off para manter 100% da fidelidade visual (gradientes, SVGs, ícones Lucide, MyTS watermark). Se você quiser texto editável depois, dá pra fazer numa segunda passada reconstruindo cada slide nativo no python-pptx, mas é um trabalho bem maior e o visual perde fidelidade.
- Arquivo final tende a ficar entre 8-20 MB dependendo da quantidade de slides (≈ 20 seções @ 2x).
- Não vou alterar nenhum código da página `/fssc-v7` — só gerar o export.

Se estiver de acordo, é só aprovar que eu gero o `.pptx` e mando aqui.