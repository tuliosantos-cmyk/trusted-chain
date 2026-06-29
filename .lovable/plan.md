## Slide 06 — aplicar direção "Premium Evolution"

Refazer `Oportunidade` em `src/pages/MyTS360.tsx` seguindo o protótipo escolhido (v1).

### Estrutura nova

```
┌──────────────────────────────────────────────────────────┐
│ 06 · OPORTUNIDADE PARA A PRODUTOR DO BEM                 │
│ Um novo benefício para todas as empresas certificadas    │
│                                                          │
│  HOJE A PDB ENTREGA   │  + │  COM MYTS 360 [NOVO]        │
│  ┌───────────────┐    │ ●  │  ┌────┐┌────┐┌────┐         │
│  │ • Protocolos  │    │ │  │  │ ST ││ TR ││ EX │  (col-2)│
│  │ • Auditorias  │    │ +  │  └────┘└────┘└────┘         │
│  │ • Certificaç. │    │ │  │  ┌──────┐┌──────┐           │
│  │ • Credibilid. │    │ ●  │  │  PDV ││ REL  │   (col-3) │
│  └───────────────┘    │    │  └──────┘└──────┘           │
├──────────────────────────────────────────────────────────┤
│ Cada certificação… Cada consumidor passa a entender…     │
└──────────────────────────────────────────────────────────┘
```

### Mudanças

- `Slide` com `pad="p-0"` para permitir faixa de rodapé full-bleed.
- Header próprio (sem `SectionLabel`): label `06 · …` em `text-[11px] tracking-[0.3em]` + título `text-[44px] extrabold` em 1 linha.
- Coluna **Hoje** estreita (22% da largura): 4 pílulas com bullet pequeno (`size-1.5`).
- Conector central: linha vertical fina com gradiente → círculo `size-14` `bg-gradient-accent` `shadow-glow` com "+" → linha vertical.
- Coluna **Novo** flexível: 5 cards em grid `grid-cols-6 gap-3.5`:
  - 3 cards `col-span-2` na linha 1 (Storytelling, Transparência, Experiência digital)
  - 2 cards `col-span-3` na linha 2 (PDV, Relacionamento)
- Cards com `bg-gradient-to-br from-primary-foreground/10 to-transparent`, ícone Lucide `size-6 text-accent-glow` acima do label `text-base font-semibold`, hover `border-accent-glow/40`.
- Badge "Novo" inline ao lado do subtítulo, `bg-gradient-accent` com `shadow-cta`.
- Faixa de fechamento full-bleed: borda superior, `bg-primary-foreground/5`, copy mantida (não-itálica), com destaque `text-accent-glow` na frase final.

### Tokens

Tudo via tokens do projeto (`bg-hero`, `bg-gradient-accent`, `accent-glow`, `primary-foreground`, `shadow-glow`, `shadow-cta`, `text-gradient`). Zero cores hardcoded.

Resultado: encaixe perfeito sem buracos, 5 itens organizados em pirâmide invertida 3+2, hierarquia clara "Hoje → + → Novo", rodapé ancorado.