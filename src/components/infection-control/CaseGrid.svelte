<script lang="ts">
  import type { Case } from '../../lib/infection-control/types';
  import type { CaseProgress } from '../../lib/infection-control/types';
  import { MICROBES } from '../../lib/infection-control/microbes';

  interface Props {
    cases: Case[];
    progress: Record<string, CaseProgress>;
    onSelect: (c: Case) => void;
  }

  let { cases, progress, onSelect }: Props = $props();

  const DIFFICULTY_BADGE: Record<string, string> = {
    basic: 'badge-success',
    intermediate: 'badge-warning',
    advanced: 'badge-error',
  };

  const PRECAUTION_EMOJI: Record<string, string> = {
    standard: '🟢',
    contact: '🟡',
    droplet: '🔵',
    airborne: '🔴',
  };

  function getMicrobe(microbeId: string) {
    return MICROBES.find((m) => m.id === microbeId);
  }

  function getProgress(caseId: string) {
    return progress[caseId];
  }

  function isFullyComplete(caseId: string) {
    const p = getProgress(caseId);
    return p?.modeACompleted && p?.modeBCompleted;
  }

  function getBestScore(caseId: string): number | null {
    const p = getProgress(caseId);
    if (!p) return null;
    const scores = [p.modeAResult?.percentage, p.modeBResult?.percentage].filter(
      (s) => s !== undefined
    ) as number[];
    if (scores.length === 0) return null;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {#each cases as c}
    {@const microbe = getMicrobe(c.microbeId)}
    {@const p = getProgress(c.id)}
    {@const score = getBestScore(c.id)}
    {@const complete = isFullyComplete(c.id)}

    <button
      class="card bg-base-100 shadow hover:shadow-lg border-2 transition-all text-left cursor-pointer
        {complete ? 'border-success' : p ? 'border-primary/40' : 'border-base-300'}
        hover:border-primary/60"
      onclick={() => onSelect(c)}
    >
      <div class="card-body gap-2 p-4">
        <!-- Microbe + precaution -->
        <div class="flex items-center gap-2">
          <span class="text-xl">{PRECAUTION_EMOJI[microbe?.primaryPrecaution ?? 'standard']}</span>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-sm truncate">
              {microbe?.commonName ?? microbe?.name ?? c.microbeId}
            </p>
            <p class="text-xs opacity-60 capitalize">{microbe?.primaryPrecaution} precautions</p>
          </div>
          {#if complete}
            <span class="badge badge-success badge-sm">✓ Done</span>
          {:else if p}
            <span class="badge badge-primary badge-sm">In Progress</span>
          {/if}
        </div>

        <!-- Case title -->
        <p class="text-sm font-semibold leading-tight">{c.title}</p>

        <!-- Vignette preview -->
        <p class="text-xs opacity-60 line-clamp-2">{c.vignette.slice(0, 100)}…</p>

        <!-- Footer row -->
        <div class="flex flex-wrap gap-1 mt-1 items-center">
          <span class="badge {DIFFICULTY_BADGE[c.difficulty]} badge-sm">{c.difficulty}</span>
          <span class="badge badge-ghost badge-sm">{c.setting}</span>
          {#if score !== null}
            <span class="badge badge-outline badge-sm ml-auto">{score}% avg</span>
          {/if}
        </div>
      </div>
    </button>
  {/each}
</div>
