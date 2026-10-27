import type { ID, NewNote, Note } from '@/types'

/**
 * Contrato de acesso às anotações pessoais (CRUD: criar, ler, atualizar,
 * excluir). Mesma ideia do FavoritesRepository: os componentes só conhecem
 * esta interface, nunca o localStorage.
 */
export interface NotesRepository {
  /** Anotações de um Cheat Sheet, da mais recente à mais antiga. */
  listBySheet(sheetId: ID): Promise<Note[]>
  /** Cria a anotação e gera id e datas. */
  create(data: NewNote): Promise<Note>
  /** Troca o conteúdo e atualiza `updatedAt`. Rejeita se o id não existir. */
  update(id: string, content: string): Promise<Note>
  remove(id: string): Promise<void>
}
