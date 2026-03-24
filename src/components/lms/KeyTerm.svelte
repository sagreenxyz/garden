<script lang="ts">
  import type { GlossaryEntry } from '../../types/glossary';

  interface Props {
    entry: GlossaryEntry;
    base?: string;
  }

  let { entry, base = '/' }: Props = $props();
  let open = $state(false);

  function toggle() {
    open = !open;
  }

  function closeTooltip(e: MouseEvent) {
    e.stopPropagation();
    open = false;
  }
</script>

<span class="relative inline-block">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span
    class="key-term border-b border-dotted border-current cursor-help"
    onclick={toggle}
    aria-describedby={open ? `tooltip-${entry.slug}` : undefined}
  >
    {entry.term}
  </span>

  {#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span
      id="tooltip-{entry.slug}"
      role="tooltip"
      class="absolute z-50 bottom-full left-0 mb-2 w-72 rounded-lg border border-base-300 bg-base-100 p-3 shadow-lg text-sm text-base-content"
      onclick={closeTooltip}
    >
      <strong class="block font-semibold text-base mb-1">{entry.term}</strong>
      {#if entry.fullForm && entry.fullForm !== entry.term}
        <em class="block text-xs text-base-content/60 mb-1">{entry.fullForm}</em>
      {/if}
      <p class="leading-snug">{entry.definition}</p>
      <a
        href="{base}glossary/#{entry.slug}"
        class="mt-2 inline-block text-xs text-primary underline"
        onclick={closeTooltip}
      >
        Full entry →
      </a>
    </span>
  {/if}
</span>
