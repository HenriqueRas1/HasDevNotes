import type { ID } from './content'

/**
 * Modelo dos DADOS DO USUÁRIO (leitura e escrita).
 *
 * Fica separado do conteúdo porque pertence a quem usa a aplicação e será
 * persistido (localStorage hoje, banco de dados no futuro).
 */

export interface Favorite {
  sheetId: ID
  /** Data em formato ISO 8601. Permite ordenar do mais recente ao mais antigo. */
  addedAt: string
}

export interface Note {
  id: string
  sheetId: ID
  content: string
  /** Datas em formato ISO 8601, ex.: "2026-10-27T14:30:00.000Z". */
  createdAt: string
  updatedAt: string
}

/** Dados necessários para criar uma anotação; o resto é gerado. */
export type NewNote = Pick<Note, 'sheetId' | 'content'>

export type Theme = 'dark' | 'light'

export interface Preferences {
  theme: Theme
  sidebarCollapsed: boolean
}
