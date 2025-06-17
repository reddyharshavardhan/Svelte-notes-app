<script>
  import NoteList from './components/NoteList.svelte';
  import NoteForm from './components/NoteForm.svelte';
  // @ts-ignore
  import { getNotes, createNote, updateNote, deleteNote } from './api.js';
  let notes = [];
  let loading = false;

  async function loadNotes() {
    loading = true;
    notes = await getNotes();
    loading = false;
  }
  async function addNote(note) {
    loading = true;
    await createNote(note); 
    await loadNotes();
    loading = false;
  }
  async function editNote(id, note) {
    loading = true;
    await updateNote(id, note); 
    await loadNotes();
    loading = false;
  }
  async function removeNote(id) {
    loading = true;
    await deleteNote(id); 
    await loadNotes();
    loading = false;
  }

  loadNotes();
</script>

<main class="max-w-3xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
    📝 My Notes 
    {#if loading}
      <span class="ml-2 w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin inline-block"></span>
    {/if}
  </h1>
  <NoteForm on:addNote={e => addNote(e.detail)} disabled={loading} />
  <NoteList {notes} {loading}
    on:editNote={e => editNote(e.detail.id, e.detail)}
    on:removeNote={e => removeNote(e.detail)}
  />
</main>