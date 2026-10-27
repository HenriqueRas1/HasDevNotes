import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { type FavoritesRepository, favoritesRepository } from '@/data/repositories'
import type { Favorite, ID } from '@/types'
import { FavoritesContext, type FavoritesContextValue } from './FavoritesContext'

interface FavoritesProviderProps {
  children: ReactNode
  /** Permite injetar outra implementação (ex.: uma falsa em testes). */
  repository?: FavoritesRepository
}

/** Carrega os favoritos uma vez e os compartilha com toda a aplicação. */
export function FavoritesProvider({ children, repository = favoritesRepository }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Evita atualizar o estado se o componente sair da tela antes da resposta.
    let cancelled = false

    repository
      .list()
      .then((items) => {
        if (!cancelled) setFavorites(items)
      })
      .catch((error) => console.error('[HasDevNotes] Falha ao carregar favoritos:', error))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [repository])

  // Set deixa a pergunta "é favorito?" instantânea, mesmo com muitos itens.
  // useMemo só recria o Set quando a lista muda.
  const favoriteIds = useMemo(() => new Set(favorites.map((f) => f.sheetId)), [favorites])

  const isFavorite = useCallback((sheetId: ID) => favoriteIds.has(sheetId), [favoriteIds])

  /**
   * Atualização otimista: muda a tela na hora e só depois salva. Se salvar
   * falhar, desfaz a mudança. A interface fica instantânea mesmo quando,
   * no futuro, o salvamento for uma requisição lenta.
   */
  const toggleFavorite = useCallback(
    async (sheetId: ID) => {
      const existing = favorites.find((f) => f.sheetId === sheetId)

      if (existing) {
        setFavorites((current) => current.filter((f) => f.sheetId !== sheetId))
        try {
          await repository.remove(sheetId)
        } catch (error) {
          console.error('[HasDevNotes] Falha ao remover favorito:', error)
          setFavorites((current) => [existing, ...current])
        }
        return
      }

      const optimistic: Favorite = { sheetId, addedAt: new Date().toISOString() }
      setFavorites((current) => [optimistic, ...current])
      try {
        const saved = await repository.add(sheetId)
        setFavorites((current) => current.map((f) => (f.sheetId === sheetId ? saved : f)))
      } catch (error) {
        console.error('[HasDevNotes] Falha ao salvar favorito:', error)
        setFavorites((current) => current.filter((f) => f.sheetId !== sheetId))
      }
    },
    [favorites, repository],
  )

  const value = useMemo<FavoritesContextValue>(
    () => ({ favorites, loading, isFavorite, toggleFavorite }),
    [favorites, loading, isFavorite, toggleFavorite],
  )

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
