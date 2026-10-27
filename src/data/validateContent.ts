import type { Category, CheatSheet, Technology } from '@/types'

interface ContentTables {
  technologies: Technology[]
  categories: Category[]
  sheets: CheatSheet[]
}

/**
 * Confere a integridade do conteúdo, como as restrições de um banco de dados:
 * IDs únicos, slugs únicos dentro do "pai" e relações apontando para algo que
 * existe. Retorna a lista de problemas encontrados (vazia = tudo certo).
 */
export function validateContent({ technologies, categories, sheets }: ContentTables): string[] {
  const errors: string[] = []

  const findDuplicates = (keys: string[], label: string) => {
    const seen = new Set<string>()
    for (const key of keys) {
      if (seen.has(key)) errors.push(`${label} duplicado: "${key}"`)
      seen.add(key)
    }
  }

  findDuplicates(technologies.map((t) => t.id), 'ID de tecnologia')
  findDuplicates(technologies.map((t) => t.slug), 'Slug de tecnologia')
  findDuplicates(categories.map((c) => c.id), 'ID de categoria')
  findDuplicates(categories.map((c) => `${c.technologyId}/${c.slug}`), 'Slug de categoria')
  findDuplicates(sheets.map((s) => s.id), 'ID de cheat sheet')
  findDuplicates(sheets.map((s) => `${s.categoryId}/${s.slug}`), 'Slug de cheat sheet')

  const technologyIds = new Set(technologies.map((t) => t.id))
  const categoriesById = new Map(categories.map((c) => [c.id, c]))
  const sheetIds = new Set(sheets.map((s) => s.id))

  for (const category of categories) {
    if (!technologyIds.has(category.technologyId)) {
      errors.push(`Categoria "${category.id}" aponta para tecnologia inexistente "${category.technologyId}"`)
    }
  }

  for (const sheet of sheets) {
    const category = categoriesById.get(sheet.categoryId)
    if (!category) {
      errors.push(`Cheat sheet "${sheet.id}" aponta para categoria inexistente "${sheet.categoryId}"`)
    } else if (category.technologyId !== sheet.technologyId) {
      errors.push(`Cheat sheet "${sheet.id}": a categoria "${category.id}" é de outra tecnologia`)
    }

    for (const relatedId of sheet.relatedIds) {
      if (!sheetIds.has(relatedId)) {
        errors.push(`Cheat sheet "${sheet.id}" relaciona "${relatedId}", que não existe`)
      }
    }
  }

  return errors
}
