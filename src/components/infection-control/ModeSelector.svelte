<script lang="ts">
  import type { Case } from '../../lib/infection-control/types';
  import type { CaseProgress } from '../../lib/infection-control/types';

  interface Props {
    c: Case;
    progress?: CaseProgress;
    onSelect: (mode: 'A' | 'B') => void;
  }

  let { c, progress, onSelect }: Props = $props();

  const modeADone = $derived(progress?.modeACompleted ?? false);
  const modeBDone = $derived(progress?.modeBCompleted ?? false);
  const modeAScore = $derived(progress?.modeAResult?.percentage ?? null);
  const modeBScore = $derived(progress?.modeBResult?.percentage ?? null);
</script>

<div class="card bg-base-100 shadow border border-base-300">
  <div class="card-body gap-4">
    <h2 class="card-title text-lg">{c.title}</h2>
    <p class="text-sm opacity-70 italic">{c.vignette.slice(0, 160)}…</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <!-- Mode A -->
      <div class="bg-primary/10 rounded-xl p-4 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🔬</span>
          <div>
            <p class="font-bold">Mode A</p>
            <p class="text-xs opacity-70">Choose Precautions &amp; Actions</p>
          </div>
          {#if modeADone}
            <span class="badge badge-success ml-auto">{modeAScore}%</span>
          {/if}
        </div>
        <p class="text-xs">
          Identify the correct isolation level, key actions, and chain-of-infection interventions.
        </p>
        <button class="btn btn-primary btn-sm mt-auto font-sans" onclick={() => onSelect('A')}>
          {modeADone ? 'Replay Mode A' : 'Start Mode A'}
        </button>
      </div>

      <!-- Mode B -->
      <div class="bg-secondary/10 rounded-xl p-4 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🚪</span>
          <div>
            <p class="font-bold">Mode B</p>
            <p class="text-xs opacity-70">Room Entry Workflow</p>
          </div>
          {#if modeBDone}
            <span class="badge badge-success ml-auto">{modeBScore}%</span>
          {/if}
        </div>
        <p class="text-xs">
          Walk through a step-by-step patient room workflow — donning, care, and safe doffing.
        </p>
        <button class="btn btn-secondary btn-sm mt-auto font-sans" onclick={() => onSelect('B')}>
          {modeBDone ? 'Replay Mode B' : 'Start Mode B'}
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-1 mt-1">
      <span class="badge badge-outline badge-sm">{c.setting}</span>
      <span class="badge badge-outline badge-sm">{c.difficulty}</span>
      {#each c.tags.slice(0, 3) as tag}
        <span class="badge badge-ghost badge-sm">{tag}</span>
      {/each}
    </div>
  </div>
</div>
