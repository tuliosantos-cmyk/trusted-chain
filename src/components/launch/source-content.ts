import { launchSlides } from './content';

function plainText(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
}

/** Read the supplied phase definitions directly; the original remains the source of truth. */
export function getPhaseFoundation(id: number) {
  const slide = launchSlides.find(item => item.id === id);
  if (!slide || slide.label !== 'Fundamentos da etapa') return null;
  const rows = slide.original.split('\n')
    .filter(line => line.startsWith('|'))
    .map(line => line.split('|').slice(1, -1).map(plainText))
    .filter(row => row[0] && !/^[-\s]+$/.test(row[0]));
  const values = new Map(rows.map(row => [row[0], row[1] ?? '']));
  return {
    what: values.get('O que é') ?? '',
    why: values.get('Por que importa') ?? '',
    clarity: (values.get('Precisamos ter clareza sobre') ?? '').split(' · ').filter(Boolean),
    done: (values.get('Está concluída quando') ?? '').split(' · ').filter(Boolean),
  };
}