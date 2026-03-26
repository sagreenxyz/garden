<script lang="ts">
  import type { Case, ModeAResult, ModeBResult } from '../../lib/infection-control/types';
  import { getGrade, getGradeLabel } from '../../lib/infection-control/scoring';
  import { getMicrobeById } from '../../lib/infection-control/microbes';
  import { CHAIN_LINKS } from '../../lib/infection-control/jobAids';

  interface Props {
    c: Case;
    modeAResult?: ModeAResult;
    modeBResult?: ModeBResult;
    onPlayAgain: () => void;
    onGoBack: () => void;
  }

  let { c, modeAResult, modeBResult, onPlayAgain, onGoBack }: Props = $props();

  const microbe = $derived(getMicrobeById(c.microbeId));

  const overallPercentage = $derived(() => {
    if (modeAResult && modeBResult) {
      return Math.round((modeAResult.percentage + modeBResult.percentage) / 2);
    }
    if (modeAResult) return modeAResult.percentage;
    if (modeBResult) return modeBResult.percentage;
    return 0;
  });

  const grade = $derived(getGrade(overallPercentage()));
  const gradeLabel = $derived(getGradeLabel(grade));

  const GRADE_COLOR: Record<ReturnType<typeof getGrade>, string> = {
    excellent: 'text-success',
    proficient: 'text-info',
    developing: 'text-warning',
    beginning: 'text-error',
  };
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center gap-2">
    <button class="btn btn-soft btn-primary btn-sm font-sans gap-1" onclick={onGoBack}>← All Cases</button>
    <h2 class="text-lg font-bold">Debrief — {c.title}</h2>
  </div>

  <!-- Grade -->
  <div class="card bg-base-200 shadow text-center">
    <div class="card-body py-6">
      <p class="text-5xl font-extrabold {GRADE_COLOR[grade]}">{overallPercentage()}%</p>
      <p class="text-xl font-semibold mt-1">{gradeLabel}</p>
      <div class="flex justify-center gap-4 mt-3 text-sm">
        {#if modeAResult}
          <span>Mode A: <strong>{modeAResult.percentage}%</strong></span>
        {/if}
        {#if modeBResult}
          <span>Mode B: <strong>{modeBResult.percentage}%</strong></span>
        {/if}
      </div>
    </div>
  </div>

  <!-- Correct precaution -->
  <div class="alert alert-success">
    <div>
      <p class="font-bold">
        ✅ Correct Precaution: {c.debrief.correctPrecaution.charAt(0).toUpperCase() +
          c.debrief.correctPrecaution.slice(1)} Precautions
      </p>
      <p class="text-sm mt-1">{c.debrief.rationale}</p>
    </div>
  </div>

  <!-- Chain of Infection Summary -->
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h3 class="card-title text-base">🔗 Chain of Infection for This Case</h3>
      <p class="text-sm opacity-80">{c.debrief.chainOfInfectionSummary}</p>
      {#if microbe}
        <div class="divider text-xs">Key Chain Breakers</div>
        <ul class="list-disc list-inside text-sm space-y-1">
          {#each microbe.keyChainBreakers as kb}
            <li>{kb}</li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>

  <!-- Key lessons -->
  <div class="card bg-info/10 shadow">
    <div class="card-body">
      <h3 class="card-title text-base">📚 Key Lessons</h3>
      <ul class="list-disc list-inside text-sm space-y-1">
        {#each c.debrief.keyLessons as lesson}
          <li>{lesson}</li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Common errors -->
  <div class="card bg-error/10 shadow">
    <div class="card-body">
      <h3 class="card-title text-base">⚠️ Common Errors</h3>
      <ul class="list-disc list-inside text-sm space-y-1">
        {#each c.debrief.commonErrors as err}
          <li>{err}</li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- NCLEX Pearl -->
  {#if c.debrief.nclexPearl}
    <div class="alert alert-warning text-sm">
      <span>💎</span>
      <span><strong>NCLEX Pearl:</strong> {c.debrief.nclexPearl}</span>
    </div>
  {/if}

  <!-- Microbe Background -->
  {#if microbe}
    <details class="collapse collapse-arrow bg-base-200">
      <summary class="collapse-title font-semibold text-sm"
        >🦠 About {microbe.commonName ?? microbe.name}</summary
      >
      <div class="collapse-content text-sm space-y-2">
        <p><strong>Virulence:</strong> {microbe.background.virulence}</p>
        <p>
          <strong>Environmental Persistence:</strong>
          {microbe.background.environmentalPersistence}
        </p>
        <p><strong>Incubation Period:</strong> {microbe.background.incubationPeriod}</p>
        <div>
          <p class="font-semibold">Typical Syndromes:</p>
          <ul class="list-disc list-inside">
            {#each microbe.background.typicalSyndromes as s}
              <li>{s}</li>
            {/each}
          </ul>
        </div>
        <div>
          <p class="font-semibold">High-Risk Hosts:</p>
          <ul class="list-disc list-inside">
            {#each microbe.background.highRiskHosts as h}
              <li>{h}</li>
            {/each}
          </ul>
        </div>
        <div>
          <p class="font-semibold">Common Nursing Pitfalls:</p>
          <ul class="list-disc list-inside">
            {#each microbe.background.commonNursingPitfalls as p}
              <li>{p}</li>
            {/each}
          </ul>
        </div>
      </div>
    </details>
  {/if}

  <!-- Actions -->
  <div class="flex flex-wrap gap-2 justify-center">
    <button class="btn btn-soft btn-primary btn-sm font-sans" onclick={onGoBack}>← Case Lobby</button>
    <button class="btn btn-primary btn-sm font-sans" onclick={onPlayAgain}>🔄 Play Again</button>
  </div>
</div>
