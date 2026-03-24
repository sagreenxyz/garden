<script lang="ts">
  import type { GlossaryEntry } from '../../types/glossary';

  interface Props {
    entries: GlossaryEntry[];
    base?: string;
  }

  let { entries, base = '/' }: Props = $props();
  let query = $state('');

  const filtered = $derived(
    query.trim() === ''
      ? entries
      : entries.filter(
          (e) =>
            e.term.toLowerCase().includes(query.toLowerCase()) ||
            e.definition.toLowerCase().includes(query.toLowerCase()) ||
            (e.fullForm ?? '').toLowerCase().includes(query.toLowerCase())
        )
  );
</script>

<div class="space-y-4">
  <label class="input w-full max-w-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 opacity-50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
    <input
      type="search"
      bind:value={query}
      placeholder="Search terms and definitions…"
      class="grow"
      aria-label="Search glossary"
    />
  </label>

  {#if filtered.length === 0}
    <p class="text-base-content/60 italic">No terms match your search.</p>
  {:else}
    <dl class="space-y-6">
      {#each filtered as entry (entry.slug)}
        <div id={entry.slug} class="border-b border-base-300 pb-4">
          <dt class="text-lg font-semibold">
            {entry.term}
            {#if entry.fullForm && entry.fullForm !== entry.term}
              <span class="text-sm font-normal text-base-content/60 ml-1">({entry.fullForm})</span>
            {/if}
          </dt>
          <dd class="mt-1 text-base-content/80 leading-relaxed">{entry.definition}</dd>
          {#if entry.relatedTerms && entry.relatedTerms.length > 0}
            <div class="mt-2 flex flex-wrap gap-1">
              {#each entry.relatedTerms as rel}
                <span class="badge badge-outline badge-sm">{rel}</span>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </dl>
  {/if}
</div>
