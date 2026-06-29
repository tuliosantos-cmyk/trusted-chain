## Revisões editoriais — `src/pages/MyTS360.tsx`

Aplicar todas as sugestões aceitas, com des-eco vocabular incluído na mesma rodada.

### Slide 01 — Por que MyTS 360
Enxugar de 3 parágrafos pesados para 2 + adicionar o gancho de dor (estilo pain-led).
- Manter 1º parágrafo institucional curto sobre a Produtor do Bem.
- Fundir 2º+3º num parágrafo único que nomeia o **custo da invisibilidade**: "Quando esse valor não chega ao consumidor, o produto certificado compete no preço como qualquer outro — e a lealdade que a boa prática mereceria nunca se forma."
- Card lateral "Não substituímos a certificação" permanece intacto (é o tom certo, validado).

### Slide 03 — Benefícios / Ecossistema
Reordenar a coluna **"Para a Produtor do Bem"** para puxar o argumento comercial pro topo:
1. **"Torna a certificação mais atraente para novas empresas"** (era 4º, vira 1º + reescrito)
2. Fortalece o reconhecimento da certificação
3. Amplia a visibilidade do trabalho
4. Aproxima consumidores da missão

Des-eco: tirar "Cria experiência digital para consumidores" da coluna das empresas certificadas (já dito no slide 1 e 5) → trocar por algo mais B2B-comercial tipo **"Justifica preço premium no PDV"**.

### Slide 04 — Modelo validado
Trocar labels das métricas para algo defensável (mantendo os números):
- "+9.700" → label: **"sessões registradas no ambiente digital"** (era "acessos") — não promete humano único.
- "83% mobile" → mantém.
- "+2min" → label: **"tempo médio por sessão"** (era "tempo médio de navegação") — termo padrão de analytics.
- "milhares" → label fica como está.

### Slide 05 — Mercado (logos + práticas)
**Lista "práticas":** trocar "Rastreabilidade" → **"Origem dos alimentos"** (alinha com regra fixada no Korin: rastreabilidade é vocabulário de cadeia, não de consumidor).

Des-eco: remover "Transparência" (repete com o tom geral do deck) → substituir por **"Bem-estar animal"** ou **"Conteúdo do produtor"** (mais concreto, menos abstrato).

**Logos:** os 6 atuais foram verificados e todos têm QR/origem real ao consumidor — Vital Farms (cartons com nome da fazenda + vídeo 360°), Carrefour Garantia de Origem (blockchain + QR), Minerva, NatureSweet ("Hearts Behind the Harvest" QR labels), Mowi (QR egg-to-plate), Llet Nostra (traçabilitat digital auditada no envàs). Confirmar que o array está com esses 6; remover qualquer Barilla/Tesco se ainda houver.

### Slide 06 — Oportunidade
Cortar a lista "passa a entregar também" de 8 → 5 itens. Manter os de maior valor de pitch:
1. Storytelling
2. Transparência
3. Experiência digital
4. Diferenciação no PDV
5. Relacionamento com consumidores

Removidos: "Valorização dos produtores" (já está implícito em storytelling + repete slide 1), "Conteúdo para marketing" (B2B vago), **"Inteligência para a cadeia"** (vago + tom destoa, conforme crítica).

### Não mexer
- Slide 02 (jornada hoje vs MyTS 360) — validado como melhor frame.
- Slide 07 (encerramento) — fecho "experiências de confiança" é proposital.
- Hero e estrutura geral.

### Técnico
Edições pontuais em arrays de strings e parágrafos JSX. Sem novos componentes, sem mudança de layout, sem novos assets. Total: ~8-10 `line_replace` em um único arquivo.

### Fora do escopo desta rodada
- Reescrita completa do slide 1 numa versão alternativa "pain-led extrema" — posso fazer numa segunda rodada se quiser.
- Slide novo de "modelo / próximo passo" que o crítico mencionou — se quiser, abre como pedido separado.
