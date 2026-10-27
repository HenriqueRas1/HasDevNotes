import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { InlineCode } from '@/components/ui/InlineCode'
import { formatDateTime } from '@/lib/formatDate'
import type { Note } from '@/types'

interface NoteItemProps {
  note: Note
  onEdit: () => void
  onDelete: () => Promise<void>
}

export function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  // Excluir pede confirmação na própria anotação, sem janela do navegador.
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const edited = note.updatedAt !== note.createdAt

  async function handleDelete() {
    setDeleting(true)
    try {
      await onDelete()
    } catch {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      {/* whitespace-pre-wrap mantém as quebras de linha digitadas. */}
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
        <InlineCode text={note.content} />
      </p>

      <footer className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <p className="text-xs text-muted">
          <time dateTime={note.createdAt}>{formatDateTime(note.createdAt)}</time>
          {edited && (
            <>
              {' · editada em '}
              <time dateTime={note.updatedAt}>{formatDateTime(note.updatedAt)}</time>
            </>
          )}
        </p>

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-danger">Excluir esta anotação?</span>
            <Button variant="ghost" onClick={() => setConfirming(false)} disabled={deleting}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Excluindo…' : 'Excluir'}
            </Button>
          </div>
        ) : (
          <div className="flex gap-1">
            <Button variant="ghost" onClick={onEdit}>
              <Pencil className="size-3.5" />
              Editar
            </Button>
            <Button variant="ghost" onClick={() => setConfirming(true)} className="hover:text-danger">
              <Trash2 className="size-3.5" />
              Excluir
            </Button>
          </div>
        )}
      </footer>
    </article>
  )
}
