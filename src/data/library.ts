import type { Category, CheatSheet, ID, Slug, Technology } from '@/types'
import { contentModules } from './content'
import { validateContent } from './validateContent'

/**
 * Camada de acesso ao conteúdo da biblioteca.
 *
 * Os componentes nunca importam os arquivos de conteúdo diretamente: eles
 * chamam estas funções. Se um dia o conteúdo vier de uma API, só este arquivo
 * muda.
 */

// "Tabelas" planas, montadas a partir dos módulos de cada tecnologia.
const technologies: Technology[] = contentModules.map((m) => m.technology)
const categories: Category[] = contentModules
  .flatMap((m) => m.categories)
  .sort((a, b) => a.order - b.order)
const sheets: CheatSheet[] = contentModules.flatMap((m) => m.sheets)

// Índices por ID para buscas rápidas: Map.get é instantâneo, já Array.find
// percorre a lista inteira.
const technologyById = new Map(technologies.map((t) => [t.id, t]))
const categoryById = new Map(categories.map((c) => [c.id, c]))
const sheetById = new Map(sheets.map((s) => [s.id, s]))

// Em desenvolvimento, avisa no console se o conteúdo tiver erros de integridade.
if (import.meta.env.DEV) {
  const errors = validateContent({ technologies, categories, sheets })
  if (errors.length > 0) {
    console.error(`[HasDevNotes] ${errors.length} problema(s) no conteúdo:\n- ${errors.join('\n- ')}`)
  }
}

// ── Tecnologias ────────────────────────────────────────────────────────────

export function getTechnologies(): Technology[] {
  return technologies
}

export function getTechnologyById(id: ID): Technology | undefined {
  return technologyById.get(id)
}

export function getTechnologyBySlug(slug: Slug): Technology | undefined {
  return technologies.find((t) => t.slug === slug)
}

// ── Categorias ─────────────────────────────────────────────────────────────

export function getCategoryById(id: ID): Category | undefined {
  return categoryById.get(id)
}

export function getCategoriesByTechnology(technologyId: ID): Category[] {
  return categories.filter((c) => c.technologyId === technologyId)
}

export function getCategoryBySlug(technologyId: ID, slug: Slug): Category | undefined {
  return categories.find((c) => c.technologyId === technologyId && c.slug === slug)
}

// ── Cheat Sheets ───────────────────────────────────────────────────────────

export function getAllSheets(): CheatSheet[] {
  return sheets
}

export function getSheetById(id: ID): CheatSheet | undefined {
  return sheetById.get(id)
}

export function getSheetsByCategory(categoryId: ID): CheatSheet[] {
  return sheets.filter((s) => s.categoryId === categoryId)
}

export function getSheetsByTechnology(technologyId: ID): CheatSheet[] {
  return sheets.filter((s) => s.technologyId === technologyId)
}

export function getSheetBySlug(categoryId: ID, slug: Slug): CheatSheet | undefined {
  return sheets.find((s) => s.categoryId === categoryId && s.slug === slug)
}

export function getRelatedSheets(sheet: CheatSheet): CheatSheet[] {
  return sheet.relatedIds
    .map((id) => sheetById.get(id))
    .filter((s): s is CheatSheet => s !== undefined)
}

// ── URLs ───────────────────────────────────────────────────────────────────
// Ficam centralizadas aqui: se o formato das rotas mudar, só este trecho muda.

/** /javascript */
export function getTechnologyPath(technology: Technology): string {
  return `/${technology.slug}`
}

/** /javascript/arrays */
export function getCategoryPath(category: Category): string {
  const technology = technologyById.get(category.technologyId)
  return `/${technology?.slug}/${category.slug}`
}

/** /javascript/arrays/map */
export function getSheetPath(sheet: CheatSheet): string {
  const category = categoryById.get(sheet.categoryId)
  return category ? `${getCategoryPath(category)}/${sheet.slug}` : '/'
}

// ── Estatísticas ───────────────────────────────────────────────────────────

export function getLibraryStats() {
  return {
    technologies: technologies.length,
    categories: categories.length,
    sheets: sheets.length,
  }
}
