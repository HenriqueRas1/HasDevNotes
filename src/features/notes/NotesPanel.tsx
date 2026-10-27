import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { ID } from '@/types'
import { NoteEditor } from './NoteEditor'
import { NoteItem } from './NoteItem'
import { useNotes } from './useNotes'

/**
 * O que está aberto para edição: nada, uma anotação nova ou uma existente
 * (pelo id). Um único estado garante que só um editor aparece por vez.
 */
type EditingState = null | 'new' | string

export function NotesPanel({ sheetId }: { sheetId: ID }) {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes(sheetId)
  const [editing, setEditing] = useState<EditingState>(null)

  if (loading) return null

  return (
    <div className="space-y-3">
      {editing === 'new' ? (
        <NoteEditor
          submitLabel="Salvar anotação"
          onSubmit={async (content) => {
            await createNote(content)
            setEditing(null)
          }}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <Button onClick={() => setEditing('new')} className="w-full border-dashed py-2.5 text-muted hover:text-text">
          <Plus className="size-4" />
          Nova anotação
        </Button>
      )}

      {notes.length === 0 && editing !== 'new' && (
        <p className="text-center text-sm text-muted">
          Nenhuma anotação ainda. Registre dúvidas, exemplos próprios ou onde você usou isso.
        </p>
      )}

      {notes.map((note) =>
        editing === note.id ? (
          <NoteEditor
            key={note.id}
            initialContent={note.content}
            submitLabel="Salvar alterações"
            onSubmit={async (content) => {
              await updateNote(note.id, content)
              setEditing(null)
            }}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={() => setEditing(note.id)}
            onDelete={() => deleteNote(note.id)}
          />
        ),
      )}
    </div>
  )
}
