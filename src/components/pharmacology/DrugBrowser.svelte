<script lang="ts">
  interface Drug {
    slug: string;
    title: string;
    genericName: string;
    brandNames: string[];
    drugClass: string;
    tags: string[];
  }

  let { drugs, classDescriptions = {} }: { drugs: Drug[]; classDescriptions?: Record<string, string> } = $props();

  let query = $state('');
  let selectedClass = $state('');

  const allClasses = $derived([...new Set(drugs.map((d) => d.drugClass))].sort());

  const filtered = $derived(
    drugs.filter((d) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.genericName.toLowerCase().includes(q) ||
        d.brandNames.some((b) => b.toLowerCase().includes(q)) ||
        d.drugClass.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q));
      const matchesClass = !selectedClass || d.drugClass === selectedClass;
      return matchesQuery && matchesClass;
    })
  );

  const selectedClassDescription = $derived(
    selectedClass ? (classDescriptions[selectedClass] ?? null) : null
  );

  const base = typeof window !== 'undefined' ? (window as any).__ASTRO_BASE__ || '' : '';
</script>

<div class="space-y-4">
  <div class="flex flex-col sm:flex-row gap-3">
    <input
      type="search"
      placeholder="Search drugs by name, class, or tag…"
      bind:value={query}
      class="input input-bordered flex-1"
    />
    <select bind:value={selectedClass} class="select select-bordered w-full sm:w-64">
      <option value="">All drug classes</option>
      {#each allClasses as cls}
        <option value={cls}>{cls}</option>
      {/each}
    </select>
  </div>

  <p class="text-sm text-base-content/60 font-sans">
    Showing {filtered.length} of {drugs.length} drugs
  </p>

  {#if selectedClassDescription}
    <div class="bg-base-200 border border-base-300 rounded-xl px-5 py-4 text-sm text-base-content/80 leading-relaxed">
      <p class="font-semibold text-base-content mb-1">{selectedClass}</p>
      <p>{selectedClassDescription}</p>
    </div>
  {/if}

  {#if filtered.length === 0}
    <div class="alert">
      <span>No drugs match your search. Try different keywords.</span>
    </div>
  {:else}
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each filtered as drug}
        <li>
          <a
            href={`${base}pharmacology/${drug.slug}/`}
            class="card bg-white border border-base-300 hover:shadow-md transition-shadow block no-underline rounded-xl h-full"
          >
            <div class="card-body py-4 px-5">
              <h2 class="card-title text-sm font-bold" style="color:#1a1a2e;">{drug.title}</h2>
              <p class="text-xs text-base-content/60">{drug.drugClass}</p>
              {#if drug.brandNames.length}
                <p class="text-xs text-base-content/50 italic">{drug.brandNames.join(', ')}</p>
              {/if}
              {#if drug.tags.length}
                <div class="flex flex-wrap gap-1 mt-1">
                  {#each drug.tags.slice(0, 4) as tag}
                    <span class="badge badge-outline badge-xs">{tag}</span>
                  {/each}
                </div>
              {/if}
            </div>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>
