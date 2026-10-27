import { type FormEvent, type KeyboardEvent, useState } from 'react'
import { Button } from '@/components/ui/Button'

/** Limite de caracteres por anotação. */
export const NOTE_MAX_LENGTH = 5000

interface NoteEditorProps {
  initialContent?: string
  submitLabel: string
  /** Deve lançar erro se não conseguir salvar; o editor mostra a mensagem. */
  onSubmit: (content: string) => Promise<void>
  onCancel: () => void
}

/** Formulário usado tanto para criar quanto para editar uma anotação. */
export function NoteEditor({ initialContent = '', submitLabel, onSubmit, onCancel }: NoteEditorProps) {
  // Componente controlado: o React guarda o texto e o textarea só exibe.
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const trimmed = content.trim()
  const canSubmit = trimmed.length > 0 && trimmed !== initialContent.trim() && !saving

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Impede o comportamento padrão do formulário, que recarregaria a página.
    event.preventDefault()
    if (!canSubmit) return

    setSaving(true)
    setError(null)
    try {
      await onSubmit(trimmed)
    } catch {
      setError('Não foi possível salvar. Seu texto continua aqui; tente de novo.')
    } finally {
      setSaving(false)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl+Enter (ou Cmd+Enter no Mac) salva; Esc cancela.
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 rounded-xl border border-accent/40 bg-surface p-3">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Texto da anotação"
        placeholder="O que você aprendeu ou quer lembrar? Use `crases` para destacar código."
        maxLength={NOTE_MAX_LENGTH}
        autoFocus
        className="field-sizing-content block max-h-96 min-h-28 w-full resize-y rounded-lg border border-border bg-bg px-3 py-2 text-sm leading-relaxed placeholder:text-muted/70 focus:border-accent focus:outline-none"
      />

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-muted">
          {content.length}/{NOTE_MAX_LENGTH}
          {/* Atalhos de teclado só fazem sentido em telas com teclado físico. */}
          <span className="hidden sm:inline">
            {' · '}
            <kbd>Ctrl</kbd>+<kbd>Enter</kbd> salva · <kbd>Esc</kbd> cancela
          </span>
        </span>
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" onClick={onCancel} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={!canSubmit}>
            {saving ? 'Salvando…' : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}
