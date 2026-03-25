// ─── Infection-Control Progress Storage ─────────────────────────────────────
// Uses localStorage to persist player progress across sessions.

import type { PlayerProgress, CaseProgress, ModeAResult, ModeBResult } from './types';

const STORAGE_KEY = 'ic_player_progress';
const VERSION = 1;

function defaultProgress(): PlayerProgress {
  return {
    version: VERSION,
    caseProgress: {},
    totalModeAPoints: 0,
    totalModeBPoints: 0,
    badges: [],
    lastPlayed: new Date().toISOString(),
  };
}

export function loadProgress(): PlayerProgress {
  if (typeof localStorage === 'undefined') return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as PlayerProgress;
    if (parsed.version !== VERSION) return defaultProgress();
    return parsed;
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: PlayerProgress): void {
  if (typeof localStorage === 'undefined') return;
  try {
    progress.lastPlayed = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Silently fail — storage may be full or blocked
  }
}

export function saveModeAResult(result: ModeAResult): void {
  const progress = loadProgress();

  const existing = progress.caseProgress[result.caseId] ?? {
    caseId: result.caseId,
    modeACompleted: false,
    modeBCompleted: false,
  };

  const oldPoints = existing.modeAResult?.totalPoints ?? 0;
  const newPoints = result.totalPoints;

  existing.modeAResult = result;
  existing.modeACompleted = true;

  // Update totals by subtracting old and adding new
  progress.totalModeAPoints = progress.totalModeAPoints - oldPoints + newPoints;
  progress.caseProgress[result.caseId] = existing;

  saveProgress(progress);
}

export function saveModeBResult(result: ModeBResult): void {
  const progress = loadProgress();

  const existing = progress.caseProgress[result.caseId] ?? {
    caseId: result.caseId,
    modeACompleted: false,
    modeBCompleted: false,
  };

  const oldPoints = existing.modeBResult?.totalPoints ?? 0;
  const newPoints = result.totalPoints;

  existing.modeBResult = result;
  existing.modeBCompleted = true;

  progress.totalModeBPoints = progress.totalModeBPoints - oldPoints + newPoints;
  progress.caseProgress[result.caseId] = existing;

  saveProgress(progress);
}

export function addBadge(badge: string): void {
  const progress = loadProgress();
  if (!progress.badges.includes(badge)) {
    progress.badges.push(badge);
    saveProgress(progress);
  }
}

export function getCaseProgress(caseId: string): CaseProgress | undefined {
  const progress = loadProgress();
  return progress.caseProgress[caseId];
}

export function resetProgress(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
