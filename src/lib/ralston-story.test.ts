import { expect, it } from 'vitest';
import { ralstonStory as s } from './ralston-story';
it('keeps the supplied workload estimate separate from the pilot', () => {
  expect(s.estimatedSuppliers).toBe(80); expect(s.averageDocuments).toBe(15);
  expect(s.estimatedDocuments).toBe(1200); expect(s.estimatedSuppliers * s.averageDocuments).toBe(s.estimatedDocuments);
  expect(s.manualSteps).toBe(7); expect(s.estimatedDocuments * s.manualSteps).toBe(8400);
  expect(s.estimatedTasks).toBe(8400);
});
it('records the three Ralston participants and the no-cost 30-day test', () => {
  expect(s.participants).toBe(3); expect(s.days).toBe(30); expect(s.cost).toBe(0);
});
