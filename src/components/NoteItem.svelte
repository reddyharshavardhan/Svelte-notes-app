<script>
  import { createEventDispatcher } from "svelte";
  import dayjs from "dayjs";
  export let note;
  const dispatch = createEventDispatcher();
  let editing = false;
  let confirmDelete = false;
  let title = '';
  let content = '';

  function startEdit() {
    editing = true; title = note.title; content = note.content;
  }
  function saveEdit() {
    if (!title.trim() || !content.trim()) return;
    dispatch('editNote', { ...note, title, content });
    editing = false;
  }
  function askDelete() {
    confirmDelete = true;
  }
  function doDelete() {
    dispatch('removeNote', note.id);
    confirmDelete = false;
  }
  function cancelDelete() {
    confirmDelete = false;
  }
</script>

<div class="relative bg-white dark:bg-gray-800 shadow rounded p-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
  {#if editing}
    <input class="border p-2 rounded mr-2 mb-2" bind:value={title} />
    <input class="border p-2 rounded mr-2 flex-1 mb-2" bind:value={content} />
    <button on:click={saveEdit} class="bg-green-500 hover:bg-green-600 text-white px-2 rounded mb-2">💾</button>
    <button on:click={() => (editing = false)} class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 rounded mb-2">✖️</button>
  {:else}
    <div class="flex-1 min-w-0">
      <div class="font-semibold truncate">{note.title}</div>
      <div class="text-gray-700 dark:text-gray-200 break-words">{note.content}</div>
      <div class="text-xs text-gray-400 mt-1">{dayjs(note.createdAt).format("MMM D, YYYY h:mm A")}</div>
    </div>
    <button on:click={startEdit} class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 rounded">Edit</button>
    <button on:click={askDelete} class="bg-red-500 hover:bg-red-700 text-white px-2 rounded">Delete</button>
  {/if}

  {#if confirmDelete}
    <div class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div class="bg-white p-4 rounded shadow flex flex-col gap-2">
        <span>Are you sure you want to delete?</span>
        <div class="flex gap-2">
          <button on:click={doDelete} class="px-2 py-1 bg-red-500 text-white rounded">Yes</button>
          <button on:click={cancelDelete} class="px-2 py-1 bg-gray-300">Cancel</button>
        </div>
      </div>
    </div>
  {/if}
</div>