import { describe, expect, it } from 'vitest';
import { clampLaunchSlide, launchRules, parseWorkshopDecisions } from './launch-workshop';

describe('Launch workshop rules from the supplied brief', () => {
  it('allocates 150 minutes to the 20/115/15 minute sections', () => {
    expect(launchRules.workshopMinutes).toBe(150);
    expect([launchRules.conceptMinutes, launchRules.phasesMinutes, launchRules.closingMinutes]).toEqual([20, 115, 15]);
  });
  it('uses eight preparation weeks and up to twelve follow-up weeks', () => {
    expect(launchRules.preparationWeeks).toBe(8);
    expect(launchRules.postLaunchWeeks).toBe(12);
  });
  it('invites three to five founders for two feedback conversations', () => {
    expect([launchRules.founderMin, launchRules.founderMax]).toEqual([3, 5]);
    expect(launchRules.feedbackConversations).toBe(2);
  });
  it('uses five to ten 1:1 accounts and fifteen to thirty 1:few accounts', () => {
    expect([launchRules.abmOneToOneMin, launchRules.abmOneToOneMax]).toEqual([5, 10]);
    expect([launchRules.abmFewMin, launchRules.abmFewMax]).toEqual([15, 30]);
  });
  it('uses 30-minute sessions with active customers', () => expect(launchRules.csSessionMinutes).toBe(30));
});

describe('Portable workshop inputs', () => {
  it('reads real decisions back from an exported structure', () => {
    const decisions = { '1': [{ Resposta: 'Fornecedor ativo', Responsável: 'Ricardo' }] };
    expect(parseWorkshopDecisions(JSON.stringify({ version: 1, decisions }))).toEqual(decisions);
  });
  it('rejects invalid rows and non-text values', () => {
    expect(parseWorkshopDecisions('{"1":[{"Resposta":3}]}')).toBeNull();
    expect(parseWorkshopDecisions('[]')).toBeNull();
    expect(parseWorkshopDecisions('{"1":[null]}')).toBeNull();
  });
  it('keeps slide navigation in bounds and integer-valued', () => {
    expect(clampLaunchSlide('999')).toBe(36);
    expect(clampLaunchSlide('-1')).toBe(1);
    expect(clampLaunchSlide('3.7')).toBe(3);
    expect(clampLaunchSlide('invalid')).toBe(1);
  });
});