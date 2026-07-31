## O problema real

Hoje cada slide é montado com medidas fluidas (`clamp`, `%`, `vh`) dentro de um quadro que muda de tamanho conforme a tela. Isso significa que eu estou "adivinhando" o tamanho de cada texto e card em vez de trabalhar num espaço com medida fixa. Resultado: elemento grande demais, texto estourando a moldura, sobra branca aleatória — e eu só descubro depois que você vê.

## A solução: canvas fixo + escala

Trocar o modelo do componente `Slide` por um **palco de tamanho fixo 1600×900 px** que é reduzido/ampliado inteiro por `transform: scale()` para caber no espaço disponível da tela.

```text
+---------------------- tela (qualquer tamanho) ----------------------+
|      +------------- wrapper 16:9 (scale automático) -------------+  |
|      |   CANVAS FIXO 1600 x 900 px  (tudo em px absolutos)       |  |
|      |   título 72px, corpo 20px, card 380x220, gap 32px...      |  |
|      +------------------------------------------------------------+ |
+---------------------------------------------------------------------+
```

O que isso muda na prática:
- Eu passo a diagramar como se fosse um slide de PowerPoint: **um espaço de medida conhecida e imutável**. Se um bloco tem 1600px de largura e eu uso 3 cards de 480px + 2 gaps de 40px, eu sei matematicamente que cabe.
- Nada mais de `clamp()`, `vh`, `min()` espalhado. Tipografia e espaçamento viram uma **escala fixa** (títulos 80/64/48, corpo 22/18, labels 14) usada em todo o deck.
- Em qualquer resolução — seu notebook, o projetor, o celular — o slide fica **exatamente igual**, só menor ou maior. O que estiver certo uma vez fica certo para sempre.

## Regras de diagramação que passo a seguir

1. Todo slide tem **padding fixo de 72px** e uma grade interna de 12 colunas.
2. Altura útil = 900 − 144 = **756px**. Cada slide declara a altura de cada faixa (header / corpo / rodapé) e a soma tem que fechar 756.
3. Texto nunca "cabe por sorte": cada bloco de texto tem largura máxima definida (ex.: 620px) e número de linhas previsto.
4. Diagramas SVG com `viewBox` fixo e tamanho declarado em px — sem depender do contêiner.
5. Nenhuma cor hardcoded (mantém os tokens do design system atuais).

## Verificação automática (o ponto que faltava)

Depois de cada slide eu rodo um script Playwright que:
- abre o deck em 1920×1080,
- percorre **todos os slides** e mede cada elemento contra as bordas do canvas,
- lista qualquer elemento que **transborde** (scrollWidth/Height > contêiner) ou que deixe **mais de 15% de área vazia** no bloco,
- tira print de cada slide.

Só te entrego depois que esse relatório voltar limpo. É isso que evita o "olha, estourou de novo".

## Execução

1. Reescrever o componente `Slide` para o modelo canvas fixo + auto-scale (afeta os 6 slides de uma vez).
2. Criar os tokens de escala do deck (tamanhos de fonte, gaps, alturas de faixa) num objeto único no topo do arquivo.
3. Re-diagramar os 6 slides existentes nessa grade, mantendo o conteúdo e os visuais atuais (gap diagram, ciclo virtuoso, slots de foto).
4. Rodar o auditor de overflow + prints dos 6 slides e corrigir o que aparecer.

## Não vou fazer

- Não mudo o copy nem a estrutura narrativa dos 6 slides.
- Não mexo em outras rotas (`/korin-360`, `/fssc-v7`, etc.).
- Não troco a paleta nem as fontes.

## Detalhes técnicos

O `Slide` usa um wrapper com `aspect-ratio: 16/9` e `ResizeObserver` calculando `scale = larguraDisponível / 1600`, aplicado com `transform: scale(s); transform-origin: top left` sobre um filho de `width:1600px; height:900px`. Isso é o mesmo mecanismo que Figma/Canva usam para preview de slide, e garante fidelidade pixel-perfect em qualquer viewport.
