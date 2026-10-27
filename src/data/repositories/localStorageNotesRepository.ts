import { readJSON, writeJSON } from '@/lib/storage'
import type { ID, NewNote, Note } from '@/types'
import type { NotesRepository } from './NotesRepository'

const STORAGE_KEY = 'notes:v1'

/** Type guard: confere se um valor salvo tem o formato de Note. */
function isNote(value: unknown): value is Note {
  if (typeof value !== 'object' || value === null) return false
  const note = value as Note
  return (
    typeof note.id === 'string' &&
    typeof note.sheetId === 'string' &&
    typeof note.content === 'string' &&
    typeof note.createdAt === 'string' &&
    typeof note.updatedAt === 'string'
  )
}

function load(): Note[] {
  const stored = readJSON(STORAGE_KEY)
  return Array.isArray(stored) ? stored.filter(isNote) : []
}

function save(notes: Note[]): void {
  writeJSON(STORAGE_KEY, notes)
}

export function createLocalStorageNotesRepository(): NotesRepository {
  return {
    async listBySheet(sheetId: ID) {
      return load()
        .filter((note) => note.sheetId === sheetId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    },

    async create({ sheetId, content }: NewNote) {
      const now = new Date().toISOString()
      const note: Note = {
        // Identificador aleatório e único, gerado pelo próprio navegador.
        id: crypto.randomUUID(),
        sheetId,
        content,
        createdAt: now,
        updatedAt: now,
      }
      save([...load(), note])
      return note
    },

    async update(id: string, content: string) {
      const notes = load()
      const current = notes.find((note) => note.id === id)
      if (!current) throw new Error(`Anotação "${id}" não encontrada`)

      const updated: Note = { ...current, content, updatedAt: new Date().toISOString() }
      save(notes.map((note) => (note.id === id ? updated : note)))
      return updated
    },

    async remove(id: string) {
      save(load().filter((note) => note.id !== id))
    },
  }
}
