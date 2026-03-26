<script lang="ts">
  import type { GlossaryEntry } from '../../types/glossary';

  interface Props {
    terms: GlossaryEntry[];
  }

  let { terms }: Props = $props();

  let deck = $state([...terms]);
  let index = $state(0);
  let flipped = $state(false);

  const current = $derived(deck[index]);
  const total = $derived(deck.length);

  function next() {
    flipped = false;
    setTimeout(() => {
      index = (index + 1) % total;
    }, 150);
  }

  function prev() {
    flipped = false;
    setTimeout(() => {
      index = (index - 1 + total) % total;
    }, 150);
  }

  function flip() {
    flipped = !flipped;
  }

  function shuffle() {
    flipped = false;
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    deck = shuffled;
    index = 0;
  }
</script>

<div class="flex flex-col items-center gap-6">
  <!-- Progress indicator -->
  <p class="text-base-content/60 font-sans text-sm">Card {index + 1} of {total}</p>

  <!-- Flashcard -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="flashcard-scene w-full max-w-xl cursor-pointer"
    style="perspective: 1000px; height: 260px;"
    onclick={flip}
    role="button"
    tabindex="0"
    aria-label={flipped ? 'Show term (click to flip)' : 'Show definition (click to flip)'}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    }}
  >
    <div
      class="flashcard-inner relative w-full h-full"
      style="transform-style: preserve-3d; transition: transform 0.45s ease; transform: {flipped
        ? 'rotateY(180deg)'
        : 'rotateY(0deg)'};"
    >
      <!-- Front: term -->
      <div
        class="card bg-base-100 shadow-lg absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
        style="backface-visibility: hidden;"
      >
        <p class="text-xs uppercase tracking-widest text-base-content/40 mb-3 font-sans">Term</p>
        <h2 class="text-2xl font-bold text-base-content">{current.term}</h2>
        {#if current.fullForm && current.fullForm !== current.term}
          <p class="mt-2 text-sm text-base-content/60 font-sans">{current.fullForm}</p>
        {/if}
        <p class="mt-6 text-xs text-base-content/40 font-sans">Click to reveal definition</p>
      </div>

      <!-- Back: definition + related terms -->
      <div
        class="card bg-primary text-primary-content shadow-lg absolute inset-0 flex flex-col items-start justify-center p-8 overflow-y-auto"
        style="backface-visibility: hidden; transform: rotateY(180deg);"
      >
        <p class="text-xs uppercase tracking-widest opacity-60 mb-3 font-sans">Definition</p>
        <p class="leading-relaxed text-sm">{current.definition}</p>
        {#if current.relatedTerms && current.relatedTerms.length > 0}
          <div class="mt-4 flex flex-wrap gap-1">
            {#each current.relatedTerms as rel}
              <span class="badge badge-outline badge-sm opacity-80">{rel}</span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Navigation & Shuffle -->
  <div class="flex items-center gap-3 font-sans">
    <button class="btn btn-soft btn-primary btn-sm gap-2 font-sans" onclick={prev} aria-label="Previous card">
      ← Previous
    </button>
    <button class="btn btn-primary btn-sm gap-2 font-sans" onclick={shuffle} aria-label="Shuffle deck">
      🔀 Shuffle
    </button>
    <button class="btn btn-soft btn-primary btn-sm gap-2 font-sans" onclick={next} aria-label="Next card">
      Next →
    </button>
  </div>
</div>
