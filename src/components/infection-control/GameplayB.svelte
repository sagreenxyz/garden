<script lang="ts">
  import type { Case } from '../../lib/infection-control/types';
  import type { ModeBResult } from '../../lib/infection-control/types';
  import { scoreModeB } from '../../lib/infection-control/scoring';

  interface Props {
    c: Case;
    onComplete: (result: ModeBResult) => void;
    onBack: () => void;
  }

  let { c, onComplete, onBack }: Props = $props();

  // ── State ────────────────────────────────────────────────────────────────
  let currentStepIndex: number = $state(0);
  let stepChoices: Record<string, string> = $state({});
  let lastFeedback: { correct: boolean; text: string; contamination?: string } | null =
    $state(null);
  let done = $state(false);
  let result: ModeBResult | null = $state(null);

  const steps = c.modeB.steps;
  const currentStep = $derived(steps[currentStepIndex]);
  const totalSteps = steps.length;

  function chooseOption(optionId: string) {
    if (stepChoices[currentStep.id]) return; // already chosen

    stepChoices = { ...stepChoices, [currentStep.id]: optionId };

    const option = currentStep.options.find((o) => o.id === optionId);
    if (option) {
      lastFeedback = {
        correct: option.correct,
        text: option.feedback,
        contamination: option.contaminationEvent,
      };
    }
  }

  function nextStep() {
    lastFeedback = null;
    if (currentStepIndex < totalSteps - 1) {
      currentStepIndex++;
    } else {
      finalize();
    }
  }

  function finalize() {
    const r = scoreModeB({ caseId: c.id, stepChoices }, c);
    result = r;
    done = true;
    onComplete(r);
  }

  const currentPhaseLabel = $derived(
    c.modeB.phases.find((p) => p.phase === currentStep?.phase)?.label ?? ''
  );
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center gap-2">
    <button class="btn btn-soft btn-primary btn-sm font-sans gap-1" onclick={onBack}>← Back</button>
    <h2 class="text-lg font-bold">Mode B — {c.title}</h2>
  </div>

  <!-- Vignette -->
  <div class="alert alert-info text-sm">
    <span>📋</span>
    <span>{c.vignette}</span>
  </div>

  {#if !done}
    <!-- Progress -->
    <div class="flex items-center justify-between text-xs opacity-60">
      <span>Step {currentStepIndex + 1} of {totalSteps}</span>
      <span class="badge badge-ghost">{currentPhaseLabel}</span>
    </div>
    <progress class="progress progress-primary w-full" value={currentStepIndex} max={totalSteps}
    ></progress>

    <!-- Current step card -->
    <div class="card bg-base-100 shadow">
      <div class="card-body gap-3">
        <div class="flex items-center gap-2">
          <span class="badge badge-primary badge-sm">{currentPhaseLabel}</span>
          <h3 class="font-bold text-base">{currentStep.title}</h3>
        </div>
        <p class="text-sm opacity-80 italic">{currentStep.narrative}</p>
        <p class="font-semibold text-sm">{currentStep.prompt}</p>

        <!-- Options -->
        <div class="space-y-2 mt-1">
          {#each currentStep.options as opt}
            {@const chosen = stepChoices[currentStep.id]}
            {@const isChosen = chosen === opt.id}
            {@const revealed = !!chosen}
            <button
              class="w-full text-left p-3 rounded-lg border text-sm transition-all
                {!revealed
                ? 'border-base-300 hover:border-primary/50 hover:bg-base-200 cursor-pointer'
                : 'cursor-default'}
                {isChosen && opt.correct ? 'border-success bg-success/10' : ''}
                {isChosen && !opt.correct ? 'border-error bg-error/10' : ''}
                {!isChosen && revealed && opt.correct ? 'border-success/40 bg-success/5' : ''}"
              disabled={!!chosen}
              onclick={() => chooseOption(opt.id)}
            >
              <span class="mr-2">
                {#if isChosen}
                  {opt.correct ? '✅' : '❌'}
                {:else if revealed && opt.correct}
                  ✓
                {:else}
                  ○
                {/if}
              </span>
              {opt.text}
            </button>
          {/each}
        </div>

        <!-- Feedback -->
        {#if lastFeedback}
          <div class="alert {lastFeedback.correct ? 'alert-success' : 'alert-warning'} text-sm">
            <span>{lastFeedback.correct ? '✅' : '⚠️'}</span>
            <span>{lastFeedback.text}</span>
          </div>
          {#if lastFeedback.contamination}
            <div class="alert alert-error text-sm">
              <span>☣️</span>
              <span><strong>Contamination Event:</strong> {lastFeedback.contamination}</span>
            </div>
          {/if}
          <div class="card-actions justify-end">
            <button class="btn btn-primary font-sans btn-sm" onclick={nextStep}>
              {currentStepIndex < totalSteps - 1 ? 'Next Step →' : 'Finish'}
            </button>
          </div>
        {/if}

        <!-- Hint -->
        {#if currentStep.hint && !stepChoices[currentStep.id]}
          <details class="text-xs opacity-60">
            <summary class="cursor-pointer">💡 Hint</summary>
            <p class="mt-1 pl-3 border-l-2 border-primary/40">{currentStep.hint}</p>
          </details>
        {/if}
      </div>
    </div>
  {:else if result}
    <!-- Results summary -->
    <div class="alert alert-success">
      <span>✅</span>
      <span
        >Mode B complete! Score: <strong>{result.totalPoints} / {result.maxPoints}</strong>
        ({result.percentage}%)</span
      >
    </div>

    {#if result.contaminations.length > 0}
      <div class="alert alert-error text-sm">
        <div>
          <p class="font-bold">☣️ Contamination Events This Run</p>
          <ul class="list-disc list-inside mt-1 space-y-0.5">
            {#each result.contaminations as evt}
              <li>{evt}</li>
            {/each}
          </ul>
        </div>
      </div>
    {:else}
      <div class="alert alert-info text-sm">
        <span>🎉</span>
        <span>No contamination events! Excellent technique.</span>
      </div>
    {/if}

    <!-- Step-by-step breakdown -->
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h3 class="font-bold">Step Breakdown</h3>
        <div class="space-y-2 mt-1">
          {#each steps as step, i}
            {@const sr = result.stepResults.find((r) => r.stepId === step.id)}
            {@const chosenOpt = sr ? step.options.find((o) => o.id === sr.chosenOptionId) : null}
            <div class="flex items-start gap-2 text-sm">
              <span
                class="badge badge-sm mt-0.5 {sr && chosenOpt?.correct
                  ? 'badge-success'
                  : 'badge-error'}">{i + 1}</span
              >
              <div>
                <p class="font-semibold">{step.title}</p>
                {#if chosenOpt}
                  <p class="text-xs opacity-70 italic">{chosenOpt.text}</p>
                  <p class="text-xs">{chosenOpt.feedback}</p>
                {/if}
              </div>
              {#if sr}
                <span class="ml-auto badge badge-outline badge-sm">+{sr.points}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
