import type { Favorite, ID } from '@/types'

/**
 * Contrato de acesso aos favoritos. Define O QUE dá para fazer, não COMO.
 *
 * Hoje a implementação usa localStorage; amanhã pode ser uma API. Como os
 * componentes só conhecem esta interface, trocar a implementação não muda
 * nenhum componente.
 *
 * Os métodos retornam Promise mesmo com o localStorage sendo síncrono,
 * porque uma API real será assíncrona.
 */
export interface FavoritesRepository {
  /** Todos os favoritos, do mais recente ao mais antigo. */
  list(): Promise<Favorite[]>
  /** Marca como favorito. Se já for, retorna o registro existente. */
  add(sheetId: ID): Promise<Favorite>
  remove(sheetId: ID): Promise<void>
}
