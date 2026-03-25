<script lang="ts">
  import { PRECAUTION_GUIDES, CHAIN_LINKS } from '../../lib/infection-control/jobAids';
  import type { PrecautionLevel } from '../../lib/infection-control/types';

  type Tab = 'precautions' | 'chain';
  let activeTab: Tab = $state('precautions');
  let activeLevel: PrecautionLevel = $state('standard');

  const LEVEL_COLORS: Record<PrecautionLevel, string> = {
    standard: 'badge-neutral',
    contact: 'badge-warning',
    droplet: 'badge-info',
    airborne: 'badge-error',
  };

  const guide = $derived(PRECAUTION_GUIDES.find((g) => g.level === activeLevel));
  const chainLinks = Object.values(CHAIN_LINKS);
</script>

<div class="card bg-base-200 shadow-md">
  <div class="card-body p-4">
    <h3 class="card-title text-base">📋 Quick Reference</h3>

    <!-- Tab bar -->
    <div role="tablist" class="tabs tabs-boxed tabs-sm mb-3">
      <button
        role="tab"
        class="tab {activeTab === 'precautions' ? 'tab-active' : ''}"
        onclick={() => (activeTab = 'precautions')}
      >
        Precautions
      </button>
      <button
        role="tab"
        class="tab {activeTab === 'chain' ? 'tab-active' : ''}"
        onclick={() => (activeTab = 'chain')}
      >
        Chain of Infection
      </button>
    </div>

    <!-- Precautions tab -->
    {#if activeTab === 'precautions'}
      <div class="flex flex-wrap gap-1 mb-3">
        {#each PRECAUTION_GUIDES as g}
          <button
            class="badge {LEVEL_COLORS[g.level]} cursor-pointer {activeLevel === g.level
              ? 'badge-lg font-bold'
              : 'badge-md'}"
            onclick={() => (activeLevel = g.level)}
          >
            {g.label}
          </button>
        {/each}
      </div>

      {#if guide}
        <div class="space-y-2 text-sm">
          <div>
            <p class="font-semibold text-xs uppercase tracking-wide opacity-60">PPE Required</p>
            <ul class="list-disc list-inside space-y-0.5">
              {#each guide.ppe as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
          <div>
            <p class="font-semibold text-xs uppercase tracking-wide opacity-60">
              Room Requirements
            </p>
            <ul class="list-disc list-inside space-y-0.5">
              {#each guide.roomRequirements as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
          <div>
            <p class="font-semibold text-xs uppercase tracking-wide opacity-60">When to Use</p>
            <ul class="list-disc list-inside space-y-0.5">
              {#each guide.when as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}
    {/if}

    <!-- Chain of Infection tab -->
    {#if activeTab === 'chain'}
      <div class="space-y-2 text-sm">
        {#each chainLinks as link, i}
          <div class="flex gap-2 items-start">
            <span class="badge badge-primary badge-sm mt-0.5 shrink-0">{i + 1}</span>
            <div>
              <p class="font-semibold">{link.name}</p>
              <p class="text-xs opacity-70">{link.description}</p>
            </div>
          </div>
          {#if i < chainLinks.length - 1}
            <div class="text-center text-xs opacity-40">↓</div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>
