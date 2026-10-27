import { createContext } from 'react'
import type { Favorite, ID } from '@/types'

export interface FavoritesContextValue {
  /** Do mais recente ao mais antigo. */
  favorites: Favorite[]
  /** true enquanto a lista inicial ainda está sendo carregada. */
  loading: boolean
  isFavorite: (sheetId: ID) => boolean
  toggleFavorite: (sheetId: ID) => Promise<void>
}

/**
 * Context permite que qualquer componente da árvore leia os favoritos sem
 * receber props de pai para filho em cada nível ("prop drilling").
 * O valor `null` indica que o componente está fora do FavoritesProvider.
 */
export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
