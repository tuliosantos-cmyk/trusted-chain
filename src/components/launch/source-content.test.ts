import { describe, expect, it } from 'vitest';
import { getPhaseFoundation, launchPresentationSlides } from './source-content';

describe('Source-linked presentation structure', () => {
  it('keeps all 36 source slides in order with two readable continuations', () => {
    expect(launchPresentationSlides).toHaveLength(38);
    expect(launchPresentationSlides.filter(slide => Number.isInteger(slide.id)).map(slide => slide.id))
      .toEqual(Array.from({ length: 36 }, (_, i) => i + 1));
    expect(launchPresentationSlides.filter(slide => !Number.isInteger(slide.id)).map(slide => slide.id)).toEqual([23.5, 27.5]);
  });
  it('does not apply phase definitions to ordinary slides', () => {
    expect(getPhaseFoundation(7)).toBeNull();
    expect(getPhaseFoundation(99)).toBeNull();
  });
  it('restores every phase with a definition, rationale and individual clarity/completion criteria', () => {
    for (const id of [8, 13, 17, 21, 25, 30]) {
      const phase = getPhaseFoundation(id);
      expect(phase?.what.length).toBeGreaterThan(80);
      expect(phase?.why.length).toBeGreaterThan(80);
      expect(phase?.clarity.length).toBeGreaterThanOrEqual(4);
      expect(phase?.done.length).toBeGreaterThanOrEqual(4);
    }
  });
});