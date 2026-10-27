import { readJSON, writeJSON } from '@/lib/storage'
import type { Favorite, ID } from '@/types'
import type { FavoritesRepository } from './FavoritesRepository'

/** O "v1" permite mudar o formato no futuro sem confundir com dados antigos. */
const STORAGE_KEY = 'favorites:v1'

/**
 * Type guard: confere em tempo de execução se um valor tem o formato de
 * Favorite. Se retornar true, o TypeScript passa a tratá-lo como Favorite.
 */
function isFavorite(value: unknown): value is Favorite {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Favorite).sheetId === 'string' &&
    typeof (value as Favorite).addedAt === 'string'
  )
}

/** Lê os favoritos salvos, descartando qualquer item em formato inválido. */
function load(): Favorite[] {
  const stored = readJSON(STORAGE_KEY)
  return Array.isArray(stored) ? stored.filter(isFavorite) : []
}

function save(favorites: Favorite[]): void {
  writeJSON(STORAGE_KEY, favorites)
}

export function createLocalStorageFavoritesRepository(): FavoritesRepository {
  return {
    async list() {
      return load().sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    },

    async add(sheetId: ID) {
      const favorites = load()
      const existing = favorites.find((f) => f.sheetId === sheetId)
      if (existing) return existing

      const favorite: Favorite = { sheetId, addedAt: new Date().toISOString() }
      save([...favorites, favorite])
      return favorite
    },

    async remove(sheetId: ID) {
      save(load().filter((f) => f.sheetId !== sheetId))
    },
  }
}
