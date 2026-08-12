# LP de conversão — Gestão de Fornecedores e Conformidade

Nova landing page em `/gestao-de-fornecedores`, usando o mesmo sistema visual da home (navy + azul elétrico, Rubik/Lato, cards com gradiente, glow, animações CSS).

## Estrutura da página (ordem)

1. **Nav enxuta** — logo MyTS + único CTA "Testar grátis". Sem menu longo (LP de anúncio não deve ter fuga).
2. **Hero** — H1 "Documento vencido, fornecedor sumido, checklist de véspera...", subheadline com as normas, CTA "Testar grátis por 30 dias" + microcopy "sem cartão". À direita, mock visual da plataforma (cards Meus Fornecedores / Meus Processos / Meus Documentos com status e alerta de vencimento animado).
3. **O problema — "22h da véspera"** — bloco escuro cinematográfico com relógio 22:00, timeline de e-mails/WhatsApp e 4 sintomas em cards. Fecha com "Isso não é falha da equipe. É o modelo."
4. **A virada** — comparativo Antes → Depois (duas colunas) + os três módulos (Meus Fornecedores, Meus Processos, Meus Documentos) com ícones e microvisual próprio para cada.
5. **DNA: Homologar · Monitorar · Desenvolver** — diagrama circular/tríade em SVG.
6. **Implementação em 5 passos** — timeline horizontal (Kickoff → Setup → Integração → Coleta → Manutenção contínua), com marcador "começa na primeira semana".
7. **Bônus: consultoria incluída** — 4 cards de serviços + destaque da Sessão Estratégica de Conformidade (2h grátis) em bloco de alto contraste.
8. **Prova social** — depoimentos Daiane (MMFoods) e Jéssica França (empresa a confirmar — publico sem nome de empresa) + faixa de logos já usada na home.
9. **Para quem é / não é** — duas colunas com check e x.
10. **O que você vê no teste grátis** — lista com 4 entregas + tira "30 dias · sem custo · sem cartão".
11. **Formulário** — Nome, E-mail corporativo, Empresa, Cargo (opcional). Botão "Começar meu teste grátis". Mesmo padrão do `CTAForm`, com estado de sucesso.
12. **Sobre a MyTS + CTA final** — fecha com "22h na véspera da auditoria não precisa ser a cena de novo."
13. **Footer** reaproveitado.

## Variantes de H1 por cluster de anúncio

O H1 troca por parâmetro de URL (`?c=fssc`, `?c=fornecedores`, `?c=brcgs`, `?c=iso9001`, `?c=haccp`, `?c=anvisa`), mantendo o resto da página igual — assim um único destino atende todos os grupos de anúncio com message match. Sem parâmetro, usa o H1 padrão.

## SEO

- Title: "Gestão de fornecedores e conformidade para alimentos | MyTS"
- Meta description conforme a copy (158 caracteres), via `react-helmet-async` (já instalado).
- H1 único, HTML semântico, JSON-LD de SoftwareApplication/Organization, canonical.

## Detalhes técnicos

- Nova página `src/pages/GestaoFornecedores.tsx` + rota em `App.tsx`.
- Componentes em `src/components/lp/` (Hero, Problema, Virada, DNA, Implementação, Consultoria, ProvaSocial, ParaQuem, Teste, Form, Sobre).
- Gráficos e mockups como SVG/CSS inline (sem libs novas), no estilo dos `visuals/` existentes — nada de imagem gerada pesada, exceto se algo pedir textura.
- Somente tokens semânticos do `index.css`; sem cores hardcoded.
- Formulário mantém o comportamento atual da home (validação + toast + estado de sucesso), sem backend novo.

## Fora do escopo

- OG image (produção com o Guto), integração com CRM/RD Station e disparo real do trial.
