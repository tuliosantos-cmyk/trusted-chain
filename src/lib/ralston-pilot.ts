export const ralstonPilot = {
  date: "08/10/2026", start: "10/09/2026", end: "10/10/2026", discount: 5,
  initialSuppliers: 4, suppliers: 8, requirements: 132,
  accepted: 44, rejected: 4, awaitingApproval: 1, pending: 83,
  respondingSuppliers: 4, assessmentSubmissions: 8, assessmentResponses: 1, assessmentApproved: 0,
};
export const ralstonSuppliers = [
  { name: "Parnaplast", category: "Embalagem", accepted: 12, total: 12, note: "Completo", state: "complete" },
  { name: "Adel Coco", category: "Insumo", accepted: 18, total: 18, note: "Completo · resposta em ~8 dias", state: "complete" },
  { name: "Grespan", category: "Embalagem", accepted: 11, total: 12, note: "1 ficha técnica recusada", state: "attention" },
  { name: "OXQuim", category: "Insumo", accepted: 3, total: 18, note: "3 recusados · 1 em aprovação · 11 pendentes", state: "attention" },
  { name: "Sococo", category: "Insumo", accepted: 0, total: 18, note: "Sem resposta há 14 dias", state: "pending" },
  { name: "Original Chemicals", category: "Insumo", accepted: 0, total: 18, note: "Sem resposta há 15 dias", state: "pending" },
  { name: "Chão Preto", category: "Insumo", accepted: 0, total: 18, note: "Sem resposta há ~2 meses", state: "pending" },
  { name: "Adripan", category: "Insumo", accepted: 0, total: 18, note: "Sem resposta há ~2 meses", state: "pending" },
] as const;