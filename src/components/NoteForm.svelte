<script>
  import { createEventDispatcher } from 'svelte';
  export let disabled = false;
  const dispatch = createEventDispatcher();
  let title = '';
  let content = '';
  let errorMsg = '';

  function submit() {
    if (!title.trim() || !content.trim()) {
      errorMsg = "Both fields are required!";
      setTimeout(() => errorMsg = '', 2000);
      return;
    }
    dispatch('addNote', { title, content, createdAt: new Date().toISOString() });
    title = '';
    content = '';
    errorMsg = '';
  }
</script>

<form on:submit|preventDefault={submit} class="mb-2 flex gap-2 flex-col sm:flex-row">
  <input
    class="border p-2 rounded flex-1"
    placeholder="Title"
    bind:value={title}
    required
    disabled={disabled}
  />
  <input
    class="border p-2 rounded flex-1"
    placeholder="Content"
    bind:value={content}
    required
    disabled={disabled}
  />
  <button type="submit" class="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-60" disabled={disabled}>
    Add
  </button>
</form>
{#if errorMsg}
  <div class="mb-3 text-red-500 text-center">{errorMsg}</div>
{/if}