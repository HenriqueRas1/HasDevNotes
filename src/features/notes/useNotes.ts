import { useCallback, useEffect, useState } from 'react'
import { type NotesRepository, notesRepository } from '@/data/repositories'
import type { ID, Note } from '@/types'

/**
 * Anotações de UM Cheat Sheet, com as operações de criar, editar e excluir.
 *
 * Diferente dos favoritos, as anotações só aparecem na página da ficha, então
 * não precisam de Context: cada página carrega as suas.
 *
 * Aqui a atualização é "pessimista": espera o repositório confirmar e só então
 * muda a tela. Se salvar falhar, a função lança o erro e o editor continua
 * aberto com o texto, assim nada do que foi digitado se perde.
 */
export function useNotes(sheetId: ID, repository: NotesRepository = notesRepository) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    repository
      .listBySheet(sheetId)
      .then((items) => {
        if (!cancelled) setNotes(items)
      })
      .catch((error) => console.error('[HasDevNotes] Falha ao carregar anotações:', error))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [sheetId, repository])

  const createNote = useCallback(
    async (content: string) => {
      const note = await repository.create({ sheetId, content })
      setNotes((current) => [note, ...current])
    },
    [sheetId, repository],
  )

  const updateNote = useCallback(
    async (id: string, content: string) => {
      const updated = await repository.update(id, content)
      setNotes((current) => current.map((note) => (note.id === id ? updated : note)))
    },
    [repository],
  )

  const deleteNote = useCallback(
    async (id: string) => {
      await repository.remove(id)
      setNotes((current) => current.filter((note) => note.id !== id))
    },
    [repository],
  )

  return { notes, loading, createNote, updateNote, deleteNote }
}
