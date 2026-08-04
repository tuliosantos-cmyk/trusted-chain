# O que ainda vale adaptar do institucional

Do PDF, já usamos os números (Korin, Carrefour, AVAL) e as cadeias de valor. O que ficou de fora — e é o que mais falta no deck hoje — são três coisas: **como o trabalho acontece na prática**, **o que exatamente estamos pedindo** e **onde o próximo projeto pode acontecer**.

Hoje o deck explica o porquê e prova que funciona, mas nunca mostra o método. Um investidor sai sem saber o que a MyTS de fato faz com o produtor da semana 1 à semana 52.

## 1. Novo slide "Como trabalhamos" (entra como 04, deck vai a 9 slides)

Os 4 passos do institucional, em trilho horizontal numerado:

1. **Mapear e avaliar** — mapeamento de produtores e autoavaliação na plataforma para entender o ponto de partida.
2. **Construir trilhas** — com especialistas de cada cadeia: qualidade, social e ambiental, com formação online e vídeo.
3. **Acompanhar com transparência** — progresso do produtor nas três trilhas, compartilhado automaticamente com o consumidor.
4. **Conectar ao mercado** — leitura de demanda, parcerias e conexão com novas oportunidades comerciais.

Visual: trilho com conector em gradiente, ícones (mapa, livro, gráfico, aperto de mão) e as três trilhas (qualidade · social · ambiental) como pills recorrentes. Rodapé do slide leva a faixa de cadeias de valor por região, que hoje está no slide de resultados — assim o "como" e o "onde" ficam juntos.

## 2. Trilhas como taxonomia fixa do deck

"Qualidade · Social · Ambiental" aparece hoje só dentro do card do Carrefour. Passa a ser o vocabulário repetido: no slide 04 (método), no card Korin/Carrefour (05) e no ciclo virtuoso. Reforça o eixo social/ambiental que o Valmir pediu, sem texto novo.

## 3. Fechar com o menu do próximo projeto (slide 08 · Convite)

Substituir a frase genérica de convite pelas quatro frentes concretas do institucional, em cards curtos:

- **Cooperativas, agroecologia e SAFs** — valorizando conhecimento ecológico tradicional passado entre gerações.
- **Visibilidade da sociobiodiversidade**
- **Produção responsável e bem-estar animal**
- **Rastreabilidade e acesso a mercado** — cadeias livres de desmatamento.

E o pedido explícito, que hoje não existe em lugar nenhum: **"Buscamos empresas, financiadores, cooperativas e parceiros técnicos para novos pilotos. Se sua organização tem um território, uma cadeia ou um desafio — definimos juntos."** Essa é a linha mais forte do institucional e é exatamente o call to action que falta.

## 4. Ajustes menores de copy

- Abertura (01): incorporar o eixo "informação que todo mundo pode usar" — hoje o deck fala de infraestrutura invisível, mas nunca diz que a informação serve para os dois lados da cadeia.
- Resultados (05): amarrar os 13.000 acessos QR ao consumidor final escaneando o produto na gôndola — é a prova de que o elo fecha até o consumidor, não só até o comprador.

## O que não vou fazer

- Não invento número: só o que está no PDF institucional.
- Não mexo em paleta, tipografia, nem no canvas fixo 1600×900.
- Não traduzo o deck; segue em português (o institucional está em inglês).
- Groundd segue sem métrica até você ter os dados da África.

## Detalhes técnicos

- Tudo em `src/pages/MytsPassaporte.tsx`: novo componente `S04ComoTrabalhamos` com trilho SVG/flex, renumeração de `S04`→`S05` até `S07`→`S08` e atualização do array de slides.
- Reuso dos primitivos existentes (`Slide`, `SectionLabel`, `T`, `PhotoSlot`); a faixa de cadeias sai de `S04Resultados` e vai para o novo slide.
- Após aprovar, gero de novo os PNGs e o PDF com o pipeline já existente.
