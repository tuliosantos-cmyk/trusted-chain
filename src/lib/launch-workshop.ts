export const launchRules = {
  workshopMinutes: 150,
  conceptMinutes: 20,
  phasesMinutes: 115,
  closingMinutes: 15,
  preparationWeeks: 8,
  postLaunchWeeks: 12,
  founderMin: 3,
  founderMax: 5,
  feedbackConversations: 2,
  abmOneToOneMin: 5,
  abmOneToOneMax: 10,
  abmFewMin: 15,
  abmFewMax: 30,
  csSessionMinutes: 30,
} as const;

export const launchPhases = [
  { number: 0, title: 'Fundamentos', timing: 'D−8 a D−6 semanas', output: 'Mensagem central', start: 8 },
  { number: 1, title: 'Clientes fundadores', timing: 'D−6 a D−2 semanas', output: 'Provas reais', start: 13 },
  { number: 2, title: 'Lançamento interno', timing: 'D−3 a D−1 semanas', output: 'Time pronto', start: 17 },
  { number: 3, title: 'Ativos', timing: 'D−5 a D−1 semanas', output: 'Materiais prontos', start: 21 },
  { number: 4, title: 'Lançamento externo', timing: 'Semana D até D+3', output: 'Atenção + reuniões', start: 25 },
  { number: 5, title: 'Pós-lançamento', timing: 'Até D+12 semanas', output: 'Uso + expansão', start: 30 },
] as const;

export type DecisionRecord = Record<string, string>;
export type WorkshopDecisions = Record<string, DecisionRecord[]>;
export const decisionTopics = [
  'Mensagem central da 2.0', 'Clientes fundadores', 'Kit interno e ensaio',
  'Peças prioritárias', 'Contas, semana e vozes', 'Métricas e retrospectiva',
];

/** Accept only simple, bounded records; imported JSON never becomes HTML. */
export function parseWorkshopDecisions(text: string): WorkshopDecisions | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    const container = parsed as Record<string, unknown>;
    const input = container.decisions ?? container;
    if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
    const entries = Object.entries(input);
    if (entries.length > 20) return null;
    const result: WorkshopDecisions = {};
    for (const [key, rows] of entries) {
      if (!/^\d{1,2}$/.test(key) || !Array.isArray(rows) || rows.length > 20) return null;
      const records: DecisionRecord[] = [];
      for (const row of rows) {
        if (!row || typeof row !== 'object' || Array.isArray(row)) return null;
        const values = Object.entries(row);
        if (values.length > 12) return null;
        const record: DecisionRecord = {};
        for (const [field, value] of values) {
          if (typeof value !== 'string' || value.length > 3000 || field.length > 80 || ['__proto__', 'constructor', 'prototype'].includes(field)) return null;
          record[field] = value;
        }
        records.push(record);
      }
      result[key] = records;
    }
    return result;
  } catch { return null; }
}

export function clampLaunchSlide(value: string | null, total = 36): number {
  const n = Number(value || 1);
  return Number.isFinite(n) ? Math.min(total, Math.max(1, Math.trunc(n))) : 1;
}