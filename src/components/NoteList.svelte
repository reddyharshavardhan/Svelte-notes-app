<script>
  import NoteItem from './NoteItem.svelte';
  export let notes = [];
  export let loading = false;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

{#if notes.length === 0 && !loading}
  <div class="text-gray-500 text-center flex flex-col items-center mb-5">
    <svg class="w-16 h-16 mb-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M3 8l7.89-4.26a2 2 0 0 1 1.78 0L21 8M5 19V8m14 11V8M5 19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"></path></svg>
    <div>No notes yet. Create your first one!</div>
  </div>
{:else if loading}
  <div class="text-gray-400 text-center my-5">Loading...</div>
{:else}
  <div class="flex flex-col gap-3">
    {#each notes as note (note.id)}
      <NoteItem
        {note}
        on:editNote={e => dispatch("editNote", e.detail)}
        on:removeNote={e => dispatch("removeNote", e.detail)}
      />
    {/each}
  </div>
{/if}