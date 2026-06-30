## Exportar `/myts-360` como apresentação .pptx

Dado o nível de detalhe visual (gradientes, ícones Lucide, mockups, bandeiras, brilhos), a rota mais fiel é renderizar cada slide via Playwright em 1920×1080 e embutir como imagem em um `.pptx` 16:9. Resultado: pixel-perfect idêntico ao deck atual, pronto para apresentar no PowerPoint/Keynote ou subir no Google Drive/Canva.

## Passos

1. **Captura** — script Playwright headless no `http://localhost:8080/myts-360`, viewport 1920×1080, espera de fontes/imagens, e screenshot de cada `<section data-slide>` (8 slides). PNGs em `/tmp/myts360/slide-XX.png`.
2. **Montagem** — script Node com `pptxgenjs`:
   - Layout `LAYOUT_WIDE` (13.33×7.5in, 16:9).
   - 1 slide por PNG, `addImage` full-bleed (`x:0, y:0, w:13.33, h:7.5`), embedado em base64.
   - Notas do apresentador opcionais (título do slide).
3. **QA visual** — converter o .pptx para PDF via LibreOffice e inspecionar todas as 8 páginas como JPG para garantir que nada ficou cortado/borrado.
4. **Entrega** — salvar em `/mnt/documents/MyTS360.pptx` e emitir `<presentation-artifact>` para download direto no chat.

## Trade-off (transparência)

Textos não ficam editáveis nativamente — cada slide é uma imagem. Em troca, fidelidade visual é 100% do que está no preview. Se você precisar editar texto depois, dá pra: (a) editar na página `/myts-360` e re-exportar, ou (b) eu gerar uma segunda versão "editável" reconstruindo com formas/textos do pptxgenjs (perde gradientes complexos e ícones).
