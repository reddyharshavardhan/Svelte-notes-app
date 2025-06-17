const BASE_URL = "https://68516bf58612b47a2c0a01c8.mockapi.io/";

export const getNotes = async () =>
  await fetch(`${BASE_URL}/notes`).then(res => res.json());

export const createNote = async (note) =>
  await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    body: JSON.stringify(note),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());

export const updateNote = async (id, note) =>
  await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(note),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());

export const deleteNote = async (id) =>
  await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });