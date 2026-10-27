import { useMemo } from 'react'
import { getSheetById } from '@/data/library'
import type { CheatSheet } from '@/types'
import { useFavorites } from './useFavorites'

/**
 * Os Cheat Sheets favoritados, do mais recente ao mais antigo.
 *
 * Um favorito cuja ficha não existe mais no conteúdo (removida ou renomeada)
 * é ignorado. Por isso Sidebar, Home e página de Favoritos usam este hook:
 * assim todos mostram a mesma contagem.
 */
export function useFavoriteSheets(): CheatSheet[] {
  const { favorites } = useFavorites()

  return useMemo(
    () =>
      favorites
        .map((favorite) => getSheetById(favorite.sheetId))
        .filter((sheet): sheet is CheatSheet => sheet !== undefined),
    [favorites],
  )
}
