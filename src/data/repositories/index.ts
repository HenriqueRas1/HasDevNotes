import { createLocalStorageFavoritesRepository } from './localStorageFavoritesRepository'
import { createLocalStorageNotesRepository } from './localStorageNotesRepository'

/**
 * Ponto único de escolha das implementações.
 * Para usar uma API no futuro, troque só estas linhas:
 *
 *   export const favoritesRepository = createApiFavoritesRepository()
 */
export const favoritesRepository = createLocalStorageFavoritesRepository()
export const notesRepository = createLocalStorageNotesRepository()

export type { FavoritesRepository } from './FavoritesRepository'
export type { NotesRepository } from './NotesRepository'
