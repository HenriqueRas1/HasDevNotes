import { createLocalStorageFavoritesRepository } from './localStorageFavoritesRepository'

/**
 * Ponto único de escolha das implementações.
 * Para usar uma API no futuro, troque só esta linha:
 *
 *   export const favoritesRepository = createApiFavoritesRepository()
 */
export const favoritesRepository = createLocalStorageFavoritesRepository()

export type { FavoritesRepository } from './FavoritesRepository'
