## Ajustes no `/myts-passaporte`

Duas frentes:

### 1. Logos reais dos parceiros (Groundd + RAMO)

- Subir `user-uploads://groundd.png` e `user-uploads://ramo.png` como Lovable Assets (`src/assets/logos/groundd.png.asset.json` e `ramo.png.asset.json`), sem copiar binário pro repo.
- Substituir os chips de texto "Groundd" e "RAMO" por `<img>` reais em:
  - Slide 01 (Capa) — faixa "em parceria com"
  - Slide 09 (Ecossistema de competências) — cards laterais Groundd e RAMO ganham a logo no topo do card
  - Slide 16 (Encerramento) — assinatura tripla MyTS · Groundd · RAMO
- Como as logos vêm em preto/verde escuro sobre fundo branco e os slides são navy, envolver cada `<img>` em um "chip" branco com padding (rounded, `bg-background`, sombra suave) pra garantir legibilidade — mesma tratativa dada aos logos Korin/Carrefour no slide 11.

### 2. Proporção do conteúdo dentro dos boxes

Diagnóstico: os cards em si estão bem dimensionados, mas o conteúdo interno (ícones, títulos, bullets, números) está subdimensionado pro tamanho projetado. Vou aumentar tipografia e ícones dentro dos cards, sem mexer no tamanho externo dos boxes.

Ajustes por slide:

| Slide | O que aumenta |
|---|---|
| 02 O mercado mudou (4 cards) | ícone 28→40px, título do card 18→24px, corpo 14→18px, mais padding interno |
| 04 A consequência (2×2 numerado) | numeral "01–04" 32→56px, título 20→26px, corpo 14→18px |
| 07 Muito além da rastreabilidade (3×2) | ícone 24→36px, título 18→22px, corpo 14→17px |
| 09 Ecossistema (3 colunas) | logo/ícone do parceiro maior, título 22→28px, bullets 14→17px, card central MyTS ainda mais destacado |
| 11 Experiência em projetos | logos ampliadas (~1.4×), placeholders com tipografia maior |
| 12 O valor (2×2 perfis) | ícone do perfil 28→40px, título 22→28px, bullets 15→18px, mais respiro entre bullets |
| 13 Quem somos (mini-stats) | número da stat 36→64px, label 14→18px |
| 14 Nosso time (5 avatares) | avatar circular 64→96px, nome 16→22px, cargo 12→16px, bio 12→15px |
| 15 Próximos passos (timeline) | numeral do marco 20→32px, título 18→24px, descrição 14→17px |

Slides 01, 03, 05, 06, 08, 10, 16 já têm hierarquia dominante correta — mantidos.

Regra: nada é hardcoded em px no JSX; uso classes Tailwind (`text-2xl`, `text-lg`, `p-8`, `gap-6`, `w-10 h-10` nos ícones Lucide) mantendo os design tokens semânticos do `index.css`. Sem alterar layout externo dos cards nem quebrar responsividade da tela 16:9.

### Verificação

Após o build, Playwright captura os 16 slides em 1600×900 e eu revejo visualmente pra confirmar que:
- logos dos parceiros aparecem nítidas nos slides 01/09/16
- não sobra card "vazio" nem quebra de linha esquisita depois do aumento tipográfico
- densidade continua respirando (nenhum slide estoura os 1080px verticais)

### Fora de escopo

- Trocar fotos placeholder do time por fotos reais (aguardando material)
- Exportar para .pptx
