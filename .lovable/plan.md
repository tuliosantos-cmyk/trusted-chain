## Nova rota: `/korin-360`

Criar página de apresentação no mesmo padrão visual da `FsscV7.tsx` (slides 16:9, navy + azul elétrico, logo MyTS no rodapé, chips, `SectionLabel`, `Slide` wrapper) com o conteúdo do projeto Korin 360.

### Estrutura de slides

1. **Capa** — "KORIN 360 — Transparência que aproxima consumidores da origem dos alimentos". Logo Korin + selo "by MyTS", kicker, subtítulo, pílulas (Origem · Sustentabilidade · Bem-estar animal · Transparência).

2. **Sobre o Projeto** — "Tornando visível aquilo que sempre esteve na essência da Korin". Texto introdutório enxuto + destaque "+30 anos de Agricultura Natural".

3. **Como o projeto foi construído** — Esquema visual horizontal em 3 etapas com setas: **Coleta → Consolidação → Conexão**. Cada etapa com ícone (ClipboardCheck / Layers / LinkIcon), título e descrição curta. Faixa final: "O Korin 360 não cria um novo posicionamento. Ele torna visível aquilo que a Korin já faz há mais de 30 anos."

4. **Estratégia de Posicionamento** — "Do campo à mesa". Grid 2×2 de canais: **Embalagem (QR Code) · Website · Assessoria de Imprensa · Redes Sociais**, cada um com ícone (Package, Globe, MessageSquare, Network) e descrição.

5. **Resultados** — Dashboard com 4 stat cards grandes: **9,7 mil acessos · 83% mobile · 2min11s navegação · 25–44 anos / Sudeste**. Abaixo, card "Principal aprendizado" listando o que o consumidor quer saber (4 bullets).

6. **Benchmark — O mercado** — 2 colunas: "O que o mercado está fazendo" (5 bullets) vs "Oportunidade Korin" (6 checks). Frase de fechamento em destaque.

7. **Benchmark de marcas (NOVO — cards do mercado)** — Grid de 8 cards (4×2) com cada marca: bandeira + nome, categoria (pill), o que fizeram (1 linha), resultado (1 linha em destaque). Marcas: Vital Farms 🇺🇸, Carrefour Garantia de Origem 🇫🇷, Frigol 🇧🇷, Carrefour Bio 🇫🇷, Fazenda da Toca 🇧🇷, Mowi 🇳🇴, Salmones Camanchaca 🇨🇱, Netuno 🇧🇷. Texto enxuto para caber sem poluir. Posicionado **logo após o slide 6 de Benchmark** porque é o "melhor lugar" — ilustra concretamente o que foi dito sobre o mercado.

8. **Próxima Fase — Pilares** — Grid 3×2 com 6 pilares (ícones + bullets curtos): Fortalecer comunicação · Potencializar digitais · Explorar PDV · Influenciadores · Relacionamento direto (CRM) · Expandir modelo (novas categorias).

9. **Mensagem Final** — Slide fundo navy, frase grande de fechamento + CTA "Quer levar essa metodologia para sua marca?" (mesmo quadrinho-CTA reutilizado da FsscV7 para coesão).

### Implementação técnica

- Novo arquivo `src/pages/Korin360.tsx` reutilizando os helpers visuais (`Chip`, `SectionLabel`, `Slide`, watermark MyTS) copiados/adaptados de `FsscV7.tsx`.
- Registrar rota `/korin-360` em `src/App.tsx`.
- Usar `logoKorin` (já existe em `src/assets/logos/korin.png`) e `mytsLogo` / `mytsMark`.
- Bandeiras dos países como emoji para evitar imports.
- Ícones lucide já disponíveis no projeto.
- Sem alterações em backend, design tokens ou outras páginas.

### Pendente (não bloqueante)

Você mencionou que vai mandar prints dos exemplos de marcas depois — vou deixar os cards com texto + emoji-bandeira primeiro; quando os prints chegarem, troco por imagens reais.
