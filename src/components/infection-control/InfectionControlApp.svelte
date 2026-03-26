<script lang="ts">
  import type { Case, ModeAResult, ModeBResult } from '../../lib/infection-control/types';
  import { CASES } from '../../lib/infection-control/cases';
  import {
    loadProgress,
    saveModeAResult,
    saveModeBResult,
    addBadge,
  } from '../../lib/infection-control/storage';
  import { getBadgeForCase } from '../../lib/infection-control/scoring';

  import CaseGrid from './CaseGrid.svelte';
  import ModeSelector from './ModeSelector.svelte';
  import GameplayA from './GameplayA.svelte';
  import GameplayB from './GameplayB.svelte';
  import ResultsDebrief from './ResultsDebrief.svelte';
  import JobAidPanel from './JobAidPanel.svelte';

  // ── App-level state machine ──────────────────────────────────────────────
  type Screen = 'lobby' | 'select' | 'play-a' | 'play-b' | 'debrief';

  let screen: Screen = $state('lobby');
  let activeCase: Case | null = $state(null);
  let playerProgress = $state(loadProgress());

  // Derived per-case results for debrief
  let lastModeAResult: ModeAResult | undefined = $state(undefined);
  let lastModeBResult: ModeBResult | undefined = $state(undefined);

  // ── Navigation ────────────────────────────────────────────────────────────
  function selectCase(c: Case) {
    activeCase = c;
    lastModeAResult = playerProgress.caseProgress[c.id]?.modeAResult;
    lastModeBResult = playerProgress.caseProgress[c.id]?.modeBResult;
    screen = 'select';
  }

  function startMode(mode: 'A' | 'B') {
    screen = mode === 'A' ? 'play-a' : 'play-b';
  }

  function handleModeAComplete(result: ModeAResult) {
    saveModeAResult(result);
    playerProgress = loadProgress();
    lastModeAResult = result;
    screen = 'debrief';
    maybeAwardBadge();
  }

  function handleModeBComplete(result: ModeBResult) {
    saveModeBResult(result);
    playerProgress = loadProgress();
    lastModeBResult = result;
    screen = 'debrief';
    maybeAwardBadge();
  }

  function maybeAwardBadge() {
    if (!activeCase) return;
    const mA = lastModeAResult?.percentage ?? 0;
    const mB = lastModeBResult?.percentage ?? 0;
    if (lastModeAResult && lastModeBResult) {
      const badge = getBadgeForCase(activeCase.id, mA, mB);
      if (badge) addBadge(badge);
    }
  }

  function goToLobby() {
    screen = 'lobby';
    activeCase = null;
  }

  function playAgain() {
    if (!activeCase) return;
    lastModeAResult = undefined;
    lastModeBResult = undefined;
    screen = 'select';
  }

  const totalCases = CASES.length;
  const completedCases = $derived(
    Object.values(playerProgress.caseProgress).filter((p) => p.modeACompleted && p.modeBCompleted)
      .length
  );
  const totalPoints = $derived(playerProgress.totalModeAPoints + playerProgress.totalModeBPoints);
</script>

<div class="max-w-4xl mx-auto px-4 py-6 space-y-6">
  <!-- Top banner -->
  {#if screen !== 'debrief'}
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-2xl font-extrabold">🦠 Infection Control Challenge</h1>
        <p class="text-sm opacity-60">
          Master isolation precautions through clinical case simulations
        </p>
      </div>
      <div class="flex gap-3 text-sm">
        <div class="stat bg-base-200 rounded-box px-3 py-1">
          <div class="stat-title text-xs">Cases</div>
          <div class="stat-value text-base">{completedCases}/{totalCases}</div>
        </div>
        <div class="stat bg-base-200 rounded-box px-3 py-1">
          <div class="stat-title text-xs">Points</div>
          <div class="stat-value text-base">{totalPoints}</div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Main content + sidebar -->
  <div class="flex flex-col lg:flex-row gap-6 items-start">
    <!-- Main area -->
    <div class="flex-1 min-w-0 space-y-4">
      {#if screen === 'lobby'}
        <CaseGrid cases={CASES} progress={playerProgress.caseProgress} onSelect={selectCase} />
      {:else if screen === 'select' && activeCase}
        <button class="btn btn-soft btn-primary btn-sm font-sans gap-1 mb-2" onclick={goToLobby}
          >← All Cases</button
        >
        <ModeSelector
          c={activeCase}
          progress={playerProgress.caseProgress[activeCase.id]}
          onSelect={startMode}
        />
      {:else if screen === 'play-a' && activeCase}
        <GameplayA
          c={activeCase}
          onComplete={handleModeAComplete}
          onBack={() => (screen = 'select')}
        />
      {:else if screen === 'play-b' && activeCase}
        <GameplayB
          c={activeCase}
          onComplete={handleModeBComplete}
          onBack={() => (screen = 'select')}
        />
      {:else if screen === 'debrief' && activeCase}
        <ResultsDebrief
          c={activeCase}
          modeAResult={lastModeAResult}
          modeBResult={lastModeBResult}
          onPlayAgain={playAgain}
          onGoBack={goToLobby}
        />
      {/if}
    </div>

    <!-- Sidebar: job aids (hidden in debrief on small screens) -->
    {#if screen !== 'debrief'}
      <aside class="w-full lg:w-72 shrink-0">
        <JobAidPanel />
      </aside>
    {/if}
  </div>
</div>
