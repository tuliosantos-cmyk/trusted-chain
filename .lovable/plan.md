## Objetivo

Substituir o deck atual de `/myts-passaporte` (11 slides) por um deck enxuto de **6 slides**, com o copy novo, esquemas visuais fortes e espaços preparados para fotos reais de produtores.

## Estrutura nova

**S1 — Abertura** (fundo navy)
Split 60/40: à esquerda o título "O impacto já existe. O reconhecimento ainda não.", parágrafo e a frase-assinatura em itálico com destaque em gradiente. À direita, **foto hero do produtor** em moldura vertical grande com overlay navy e legenda flutuante. Chips na base: Produtores · Cooperativas · Comunidades tradicionais.

**S2 — O problema** (fundo claro)
Título grande + dois parágrafos curtos. Abaixo, faixa de 3 elementos:
- Bloco de dado gigante **77%** com fonte IBGE
- Diagrama de "gap estrutural": duas margens (Quem produz / Quem compra) separadas por um vão tracejado, mostrando o que falta em cada lado
- **Slot de foto** (retrato de produtor, formato quadrado) ancorando a coluna
Encerramento em faixa destacada: "É um gap estrutural dos dois lados…"

**S3 — A infraestrutura invisível** (fundo navy)
Linha de negação no topo ("Não é software / consultoria / auditoria" em chips riscados). Três cards em camadas empilhadas — Groundd (pessoas), RAMO (território/geoespacial), MyTS (infraestrutura digital) — cada um com ícone, logo e uma linha de descrição, conectados por um trilho vertical que converge para a frase "Juntas, essas capacidades transformam impacto local em oportunidades de mercado."
À direita, o **box "O que sua organização viabiliza"** em card de destaque com os 4 itens em lista com check.

**S4 — O ciclo virtuoso** (fundo claro)
Diagrama SVG circular ocupando ~65% da largura: 8 nós ao redor (Produtor fortalecido → Maior renda → Cooperativas mais fortes → Territórios preservados → Cadeias resilientes → Mercados confiáveis → Novos investimentos → Mais produtores fortalecidos), setas animadas fechando o ciclo, centro "Valor compartilhado".
Coluna direita: frase-conclusão em tamanho grande + selo "Modelo já validado" com logos Korin e Carrefour (já existem no projeto).

**S5 — Oportunidade estratégica** (fundo navy)
Título + 4 cards em grid 2×2 (Para quem produz / Para o território / Para sua empresa / Para investidores), cada um com ícone, título e as três frases curtas em lista.
Faixa inferior full-width com o dado **US$ 1,5 trilhão** em número gigante + fonte GIIN 2024, com **slot de foto** em faixa panorâmica de fundo (produtor/território) em baixa opacidade.

**S6 — Convite** (fundo navy)
Frase-manifesto como herói tipográfico (~90-104px), parágrafo de apoio, CTA "Vamos construir essa transformação juntos.", contato `valmir@myt-s.com · myt-s.com` e logos MyTS + Groundd + RAMO no rodapé.

## Slots de foto (5 no total)

Todos apontam para arquivos em `src/assets/passaporte/` com placeholders visuais claros (moldura tracejada + label "foto a enviar") quando a imagem ainda não existe:
1. `produtor-hero.jpg` — retrato vertical (S1)
2. `produtor-retrato.jpg` — quadrado (S2)
3. `cooperativa.jpg` — grupo/cooperativa (S4, opcional no selo de validação)
4. `territorio.jpg` — panorâmica de território (S5, fundo da faixa)
5. `comunidade.jpg` — cena de comunidade (S6, faixa lateral discreta)

Enquanto as fotos reais não chegarem, uso as imagens já existentes (`produtor.jpg`, `geolocalizacao.jpg`) nos slots compatíveis e placeholders nos demais — troca depois é só substituir o arquivo.

## Detalhes técnicos

- Trabalho concentrado em `src/pages/MytsPassaporte.tsx`; mantenho os componentes-base `Slide`, `SectionLabel`, `Chip` e os tokens do design system (nada de cor hardcoded).
- Dois diagramas SVG novos: `GapDiagram` (S2) e `CicloVirtuoso` reescrito (S4, viewBox amplo para não cortar labels).
- Escala de tipografia do deck: títulos 72-96px, corpo 18-20px, números-destaque 120px+, respeitando a densidade já calibrada nos slides atuais.
- Componentes/diagramas dos slides removidos que não forem reaproveitados são apagados para não deixar código órfão.
- Validação: build limpo + Playwright 1920×1080 capturando os 6 slides para conferir que nada estoura nem sobra vazio.

## Não vou fazer

- Não altero outras rotas (`/korin-360`, `/fssc-v7`, etc.).
- Não invento dados novos além dos dois citados (IBGE 77%, GIIN US$ 1,5 tri).
- Não gero fotos de produtor por IA — deixo os slots prontos para as suas imagens reais.
