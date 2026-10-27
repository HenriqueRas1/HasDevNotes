/**
 * Modelo do CONTEÚDO da biblioteca (somente leitura).
 *
 * Hierarquia: Technology → Category → CheatSheet.
 * As relações são feitas por ID (ex.: `categoryId`), como em tabelas de um
 * banco de dados, e não com objetos aninhados.
 */

/** Identificador único e estável. Nunca muda, mesmo que o título mude. */
export type ID = string

/**
 * Trecho legível usado na URL, ex.: "arrays" em /javascript/arrays.
 * Só precisa ser único dentro do "pai" (a categoria dentro da tecnologia).
 */
export type Slug = string

/** Linguagens que o syntax highlighting vai suportar. */
export type CodeLanguage =
  | 'javascript'
  | 'typescript'
  | 'jsx'
  | 'tsx'
  | 'html'
  | 'css'
  | 'json'
  | 'sql'
  | 'bash'
  | 'python'

export interface Technology {
  id: ID
  slug: Slug
  name: string
  description: string
  /** Cor de destaque da tecnologia na interface (hex). */
  color: string
  /** Linguagem padrão dos exemplos desta tecnologia. */
  language: CodeLanguage
}

export interface Category {
  id: ID
  slug: Slug
  technologyId: ID
  name: string
  description: string
  /** Posição na listagem (menor aparece primeiro). */
  order: number
}

export interface CodeExample {
  code: string
  /** Se omitido, usa a linguagem padrão da tecnologia. */
  language?: CodeLanguage
  /** Legenda curta acima do código. */
  caption?: string
  /** Resultado esperado ao executar o exemplo. */
  output?: string
}

/** tip = dica · warning = cuidado · mistake = erro comum */
export type TipKind = 'tip' | 'warning' | 'mistake'

export interface Tip {
  kind: TipKind
  text: string
}

/**
 * Em `description`, `whenToUse` e no texto das dicas, trechos entre crases
 * viram código na tela. Ex.: "Use `git pull` antes de começar."
 */
export interface CheatSheet {
  id: ID
  slug: Slug
  technologyId: ID
  categoryId: ID
  title: string
  /** Descrição objetiva do conceito (1–2 frases). */
  description: string
  /** Quando utilizar. */
  whenToUse: string
  /** Sintaxe principal, em forma de "molde". */
  syntax: string
  examples: CodeExample[]
  tips: Tip[]
  tags: string[]
  /** IDs de outros Cheat Sheets relacionados. */
  relatedIds: ID[]
}

/** Formato de cada arquivo em src/data/content: uma tecnologia completa. */
export interface TechnologyContent {
  technology: Technology
  categories: Category[]
  sheets: CheatSheet[]
}
