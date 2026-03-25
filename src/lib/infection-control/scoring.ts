// ─── Infection-Control Scoring Engine ───────────────────────────────────────

import type { Case, ModeAResult, ModeBResult, PrecautionLevel } from './types';

// ── Mode A Scoring ───────────────────────────────────────────────────────────

export interface ModeAInput {
  caseId: string;
  precautionChoice: PrecautionLevel;
  selectedKeyActionIds: string[];
  escalationChoice?: PrecautionLevel;
  chainLinkAnswers: Record<string, string>; // questionId -> option text
}

export function scoreModeA(input: ModeAInput, c: Case): ModeAResult {
  // Precaution points
  const precautionOption = c.modeA.precautionOptions.find(
    (o) => o.level === input.precautionChoice
  );
  const precautionPoints = precautionOption?.points ?? 0;

  // Key action points
  let keyActionPoints = 0;
  for (const id of input.selectedKeyActionIds) {
    const action = c.modeA.keyActions.find((a) => a.id === id);
    if (action) keyActionPoints += action.points;
  }
  // Clamp to 0 minimum
  keyActionPoints = Math.max(0, keyActionPoints);

  // Escalation points
  let escalationPoints = 0;
  if (c.modeA.escalationScenario && input.escalationChoice) {
    escalationPoints =
      input.escalationChoice === c.modeA.escalationScenario.correctUpgrade
        ? c.modeA.escalationScenario.points
        : 0;
  }

  // Chain link points
  let chainLinkPoints = 0;
  for (const question of c.modeA.chainLinkQuestions) {
    const selectedText = input.chainLinkAnswers[question.id];
    if (selectedText !== undefined) {
      const option = question.options.find((o) => o.text === selectedText);
      if (option) chainLinkPoints += option.points;
    }
  }

  const totalPoints = precautionPoints + keyActionPoints + escalationPoints + chainLinkPoints;
  const maxPoints = c.modeA.maxScore;
  const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  return {
    caseId: input.caseId,
    precautionChoice: input.precautionChoice,
    precautionPoints,
    keyActionIds: input.selectedKeyActionIds,
    keyActionPoints,
    escalationChoice: input.escalationChoice,
    escalationPoints,
    chainLinkAnswers: input.chainLinkAnswers,
    chainLinkPoints,
    totalPoints,
    maxPoints,
    percentage,
    completedAt: new Date().toISOString(),
  };
}

// ── Mode B Scoring ───────────────────────────────────────────────────────────

export interface ModeBInput {
  caseId: string;
  stepChoices: Record<string, string>; // stepId -> chosenOptionId
}

export function scoreModeB(input: ModeBInput, c: Case): ModeBResult {
  const stepResults: ModeBResult['stepResults'] = [];
  const contaminations: string[] = [];

  for (const step of c.modeB.steps) {
    const chosenOptionId = input.stepChoices[step.id];
    if (!chosenOptionId) continue;

    const option = step.options.find((o) => o.id === chosenOptionId);
    if (!option) continue;

    const stepResult = {
      stepId: step.id,
      chosenOptionId,
      points: option.points,
      contaminationEvent: option.contaminationEvent,
    };
    stepResults.push(stepResult);

    if (option.contaminationEvent) {
      contaminations.push(option.contaminationEvent);
    }
  }

  const totalPoints = stepResults.reduce((sum, r) => sum + r.points, 0);
  const maxPoints = c.modeB.maxScore;
  const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  return {
    caseId: input.caseId,
    stepResults,
    totalPoints,
    maxPoints,
    percentage,
    contaminations,
    completedAt: new Date().toISOString(),
  };
}

// ── Grade / Badge helpers ────────────────────────────────────────────────────

export type PerformanceGrade = 'excellent' | 'proficient' | 'developing' | 'beginning';

export function getGrade(percentage: number): PerformanceGrade {
  if (percentage >= 90) return 'excellent';
  if (percentage >= 75) return 'proficient';
  if (percentage >= 60) return 'developing';
  return 'beginning';
}

export function getGradeLabel(grade: PerformanceGrade): string {
  const labels: Record<PerformanceGrade, string> = {
    excellent: '🏆 Excellent',
    proficient: '✅ Proficient',
    developing: '📈 Developing',
    beginning: '🔄 Beginning',
  };
  return labels[grade];
}

export function getBadgeForCase(
  caseId: string,
  modeAPercentage: number,
  modeBPercentage: number
): string | null {
  const avg = (modeAPercentage + modeBPercentage) / 2;
  if (avg >= 90) return `ic-master-${caseId}`;
  if (avg >= 75) return `ic-proficient-${caseId}`;
  return null;
}
