<script lang="ts">
  import type { Case, PrecautionLevel } from '../../lib/infection-control/types';
  import type { ModeAResult } from '../../lib/infection-control/types';
  import { scoreModeA } from '../../lib/infection-control/scoring';

  interface Props {
    c: Case;
    onComplete: (result: ModeAResult) => void;
    onBack: () => void;
  }

  let { c, onComplete, onBack }: Props = $props();

  // ── State ────────────────────────────────────────────────────────────────
  type Phase = 'precaution' | 'actions' | 'escalation' | 'chain' | 'done';
  let phase: Phase = $state('precaution');

  let precautionChoice: PrecautionLevel | null = $state(null);
  let selectedActions: Set<string> = $state(new Set());
  let escalationChoice: PrecautionLevel | null = $state(null);
  let chainAnswers: Record<string, string> = $state({});

  let submitted = $state(false);
  let result: ModeAResult | null = $state(null);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function toggleAction(id: string) {
    const next = new Set(selectedActions);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    selectedActions = next;
  }

  function submitPrecaution() {
    if (!precautionChoice) return;
    submitted = false;
    phase = 'actions';
  }

  function submitActions() {
    submitted = false;
    if (c.modeA.escalationScenario) {
      phase = 'escalation';
    } else if (c.modeA.chainLinkQuestions.length > 0) {
      phase = 'chain';
    } else {
      finalize();
    }
  }

  function submitEscalation() {
    if (!escalationChoice) return;
    if (c.modeA.chainLinkQuestions.length > 0) {
      phase = 'chain';
    } else {
      finalize();
    }
  }

  function submitChain() {
    const allAnswered = c.modeA.chainLinkQuestions.every((q) => chainAnswers[q.id] !== undefined);
    if (!allAnswered) return;
    finalize();
  }

  function finalize() {
    const r = scoreModeA(
      {
        caseId: c.id,
        precautionChoice: precautionChoice!,
        selectedKeyActionIds: [...selectedActions],
        escalationChoice: escalationChoice ?? undefined,
        chainLinkAnswers: chainAnswers,
      },
      c
    );
    result = r;
    phase = 'done';
    onComplete(r);
  }

  const LEVEL_BADGE: Record<PrecautionLevel, string> = {
    standard: 'badge-neutral',
    contact: 'badge-warning',
    droplet: 'badge-info',
    airborne: 'badge-error',
  };
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center gap-2">
    <button class="btn btn-ghost btn-sm font-sans gap-1" onclick={onBack}>← Back</button>
    <h2 class="text-lg font-bold">Mode A — {c.title}</h2>
  </div>

  <!-- Vignette -->
  <div class="alert alert-info text-sm">
    <span>📋</span>
    <span>{c.vignette}</span>
  </div>

  <!-- Progress steps -->
  <ul class="steps steps-horizontal w-full text-xs">
    <li
      class="step {['precaution', 'actions', 'escalation', 'chain', 'done'].indexOf(phase) >= 0
        ? 'step-primary'
        : ''}"
    >
      Precautions
    </li>
    <li
      class="step {['actions', 'escalation', 'chain', 'done'].indexOf(phase) >= 0
        ? 'step-primary'
        : ''}"
    >
      Key Actions
    </li>
    {#if c.modeA.escalationScenario}
      <li class="step {['escalation', 'chain', 'done'].indexOf(phase) >= 0 ? 'step-primary' : ''}">
        Escalation
      </li>
    {/if}
    <li class="step {['chain', 'done'].indexOf(phase) >= 0 ? 'step-primary' : ''}">Chain Links</li>
    <li class="step {phase === 'done' ? 'step-primary' : ''}">Results</li>
  </ul>

  <!-- Phase: Precaution choice -->
  {#if phase === 'precaution'}
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h3 class="card-title text-base">{c.modeA.precautionQuestion}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {#each c.modeA.precautionOptions as opt}
            <label
              class="card border-2 cursor-pointer transition-all {precautionChoice === opt.level
                ? 'border-primary bg-primary/10'
                : 'border-base-300 hover:border-primary/50'}"
            >
              <div class="card-body p-3 gap-1">
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    name="precaution"
                    class="radio radio-primary radio-sm"
                    bind:group={precautionChoice}
                    value={opt.level}
                  />
                  <span class="font-semibold text-sm">{opt.label}</span>
                  <span class="badge {LEVEL_BADGE[opt.level]} badge-sm ml-auto">{opt.level}</span>
                </div>
                <p class="text-xs opacity-70 pl-6">{opt.description}</p>
              </div>
            </label>
          {/each}
        </div>
        <div class="card-actions justify-end mt-4">
          <button
            class="btn btn-primary font-sans"
            disabled={!precautionChoice}
            onclick={submitPrecaution}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Phase: Key actions -->
  {#if phase === 'actions'}
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h3 class="card-title text-base">{c.modeA.keyActionsInstruction}</h3>
        <div class="space-y-2 mt-2">
          {#each c.modeA.keyActions as action}
            <label
              class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all {selectedActions.has(
                action.id
              )
                ? 'border-primary bg-primary/10'
                : 'border-base-300 hover:border-primary/40'}"
            >
              <input
                type="checkbox"
                class="checkbox checkbox-primary mt-0.5"
                checked={selectedActions.has(action.id)}
                onchange={() => toggleAction(action.id)}
              />
              <span class="text-sm">{action.text}</span>
            </label>
          {/each}
        </div>
        <div class="card-actions justify-between mt-4">
          <button class="btn btn-ghost btn-sm font-sans" onclick={() => (phase = 'precaution')}
            >← Back</button
          >
          <button class="btn btn-primary font-sans" onclick={submitActions}>Next →</button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Phase: Escalation -->
  {#if phase === 'escalation' && c.modeA.escalationScenario}
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <div class="alert alert-warning mb-4 text-sm">
          <span>⚠️</span>
          <span><strong>New information:</strong> {c.modeA.escalationScenario.trigger}</span>
        </div>
        <h3 class="card-title text-base">Should you escalate precautions? If so, to what level?</h3>
        <div class="grid grid-cols-2 gap-2 mt-2">
          {#each c.modeA.precautionOptions as opt}
            <label
              class="card border-2 cursor-pointer {escalationChoice === opt.level
                ? 'border-warning bg-warning/10'
                : 'border-base-300'}"
            >
              <div class="card-body p-3">
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    name="escalation"
                    class="radio radio-warning radio-sm"
                    bind:group={escalationChoice}
                    value={opt.level}
                  />
                  <span class="text-sm font-semibold">{opt.label}</span>
                </div>
              </div>
            </label>
          {/each}
        </div>
        <div class="card-actions justify-between mt-4">
          <button class="btn btn-ghost btn-sm font-sans" onclick={() => (phase = 'actions')}
            >← Back</button
          >
          <button
            class="btn btn-primary font-sans"
            disabled={!escalationChoice}
            onclick={submitEscalation}>Next →</button
          >
        </div>
      </div>
    </div>
  {/if}

  <!-- Phase: Chain link questions -->
  {#if phase === 'chain'}
    <div class="card bg-base-100 shadow">
      <div class="card-body gap-4">
        <h3 class="card-title text-base">🔗 Chain of Infection Questions</h3>
        {#each c.modeA.chainLinkQuestions as q}
          <div class="space-y-2">
            <p class="text-sm font-semibold">{q.prompt}</p>
            <div class="space-y-1">
              {#each q.options as opt}
                <label
                  class="flex items-start gap-3 p-2 rounded-lg border cursor-pointer {chainAnswers[
                    q.id
                  ] === opt.text
                    ? 'border-primary bg-primary/10'
                    : 'border-base-300 hover:border-primary/40'}"
                >
                  <input
                    type="radio"
                    name="chain-{q.id}"
                    class="radio radio-primary radio-sm mt-0.5"
                    checked={chainAnswers[q.id] === opt.text}
                    onchange={() => {
                      chainAnswers = { ...chainAnswers, [q.id]: opt.text };
                    }}
                  />
                  <span class="text-sm">{opt.text}</span>
                </label>
              {/each}
            </div>
          </div>
        {/each}
        <div class="card-actions justify-between">
          <button
            class="btn btn-ghost btn-sm font-sans"
            onclick={() => (phase = c.modeA.escalationScenario ? 'escalation' : 'actions')}
            >← Back</button
          >
          <button
            class="btn btn-primary font-sans"
            disabled={!c.modeA.chainLinkQuestions.every((q) => chainAnswers[q.id])}
            onclick={submitChain}
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Phase: Done (summary shown by parent via ResultsDebrief) -->
  {#if phase === 'done' && result}
    <div class="alert alert-success">
      <span>✅</span>
      <span
        >Mode A complete! Score: <strong>{result.totalPoints} / {result.maxPoints}</strong>
        ({result.percentage}%)</span
      >
    </div>
    <div class="card bg-base-100 shadow">
      <div class="card-body gap-2">
        <h3 class="font-bold">Answer Feedback</h3>

        <!-- Precaution feedback -->
        <div class="text-sm">
          <p class="font-semibold">Precaution Choice</p>
          {#each c.modeA.precautionOptions as opt}
            {#if opt.level === result.precautionChoice}
              <div class="alert {opt.points > 0 ? 'alert-success' : 'alert-error'} text-xs mt-1">
                <span>{opt.points > 0 ? '✅' : '❌'}</span>
                <span>{opt.feedback}</span>
              </div>
            {/if}
          {/each}
        </div>

        <!-- Key action feedback -->
        <div class="text-sm mt-2">
          <p class="font-semibold">Key Actions</p>
          {#each c.modeA.keyActions as action}
            {#if result.keyActionIds.includes(action.id) || action.correct}
              <div class="flex items-start gap-2 text-xs py-1">
                <span
                  >{result.keyActionIds.includes(action.id)
                    ? action.correct
                      ? '✅'
                      : '❌'
                    : action.correct
                      ? '⬜'
                      : ''}</span
                >
                <span>{action.text}</span>
              </div>
              {#if result.keyActionIds.includes(action.id)}
                <p class="text-xs opacity-70 ml-5 italic">{action.feedback}</p>
              {/if}
            {/if}
          {/each}
        </div>

        <!-- Chain link feedback -->
        {#if c.modeA.chainLinkQuestions.length > 0}
          <div class="text-sm mt-2">
            <p class="font-semibold">Chain of Infection</p>
            {#each c.modeA.chainLinkQuestions as q}
              {@const chosen = result.chainLinkAnswers[q.id]}
              {@const chosenOpt = q.options.find((o) => o.text === chosen)}
              {#if chosenOpt}
                <div
                  class="alert {chosenOpt.correct ? 'alert-success' : 'alert-warning'} text-xs mt-1"
                >
                  <span>{chosenOpt.correct ? '✅' : '❌'}</span>
                  <span>{chosenOpt.feedback}</span>
                </div>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
