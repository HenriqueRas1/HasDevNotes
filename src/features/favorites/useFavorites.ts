import { use } from 'react'
import { FavoritesContext } from './FavoritesContext'

/**
 * Acesso aos favoritos em qualquer componente:
 *
 *   const { isFavorite, toggleFavorite } = useFavorites()
 */
export function useFavorites() {
  const context = use(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites precisa estar dentro de <FavoritesProvider>.')
  }
  return context
}
