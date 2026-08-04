## Resposta ao feedback

Concordo com os dois pontos. O deck hoje sustenta o argumento no conceito (infraestrutura, ciclo virtuoso, oportunidade) e só mostra logo de Korin e Carrefour num quadradinho pequeno do slide 04 — sem um único número de resultado. E a RAMO aparece como uma das três camadas centrais do slide 03, com o mesmo peso da MyTS e da Groundd, o que dá evidência demais para ela.

O anexo institucional resolve exatamente a primeira lacuna: a página 4 tem os números reais que faltavam.

## O que vou fazer

**1. Novo slide dedicado de resultados (entra como 04, deck passa a 8 slides)**

Título na linha de "Isto não é conceito. Já está rodando." Quatro painéis de prova, todos com dados do anexo:

- **Plataforma MyTS** — 2.115 empresas ativas na plataforma
- **Korin · Sustentabilidade 360** — 8 → 38 fornecedores de ovos no programa; 13.000 acessos via QR code às páginas de origem
- **Carrefour Brasil · Jornada da Autonomia** — trilhas social, ambiental e qualidade mapeando e desenvolvendo a cadeia de FLV além do fornecedor direto
- **AVAL Caipira · Qualificação digital** — 16 empresas, 13 autoavaliações

Visual: o card da Korin ganha um mini-gráfico de barras 8→38 (SVG inline, mesmo padrão do deck); Carrefour ganha as três trilhas em pills; números grandes em `text-gradient` sobre fundo escuro, logos em cores originais como já fazemos.

**2. Cadeias de valor como segunda prova**

Faixa no rodapé do novo slide com as cadeias já em construção (Amazônia: açaí, guaraná, cupuaçu · Nordeste: ovos · Mato Grosso: baru · Bahia: cacau, licuri, umbu, acerola · Sudeste: ovos) — mostra alcance territorial real, não promessa.

**3. Groundd sem números**

Não temos dados dos projetos na África. A Groundd continua como camada de mobilização/território no slide 03, com o texto atual, sem inventar métrica. Deixo marcado no código onde entram os números quando você tiver (`[GROUNDD — inserir números África]`), pra ser só preencher.

**4. Remoção total da RAMO**

- Slide 03: a camada "RAMO · inteligência geoespacial" sai; o slide passa a ter duas camadas (Groundd e MyTS), com os cards maiores e mais respiro. A capacidade geoespacial vira uma linha dentro do card da MyTS ("evidências de território via parceiros técnicos"), sem citar nome.
- Capa (slide 00) e abertura (01): o crédito "Groundd · RAMO" vira só "Groundd".
- Fechamento: logo da RAMO removida do rodapé.
- Meta description da página atualizada.

**5. Reforço pontual de prova nos slides existentes**

- Slide 04 (Ciclo virtuoso): o box "Modelo já validado" com logos pequenas é substituído por dois números fortes (38 fornecedores desenvolvidos · 13 mil acessos de origem) com as logos Korin e Carrefour maiores abaixo.
- Slide 05 (Oportunidade): mantém o dado GIIN, sem mudança.

## Detalhes técnicos

- Tudo em `src/pages/MytsPassaporte.tsx`, dentro do canvas fixo 1600×900 já existente (`Slide` + `transform: scale`).
- Novo componente `S04Resultados` + mini-gráfico SVG `KorinRamp`, seguindo os primitivos atuais (`SectionLabel`, `PartnerLogo`, `PhotoSlot`, escala tipográfica `T`).
- Remoção do import de `ramoAsset` e do arquivo pointer `src/assets/logos/ramo.png.asset.json`.
- Renumeração das seções (00 → 07) e do array de slides.

## Não vou fazer

- Não invento número nenhum: só uso o que está no PDF institucional anexo.
- Não mexo em paleta, tipografia ou no sistema de canvas fixo.
- Não traduzo o deck; segue em português.
