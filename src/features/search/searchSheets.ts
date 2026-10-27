import { getAllSheets, getCategoryById, getTechnologies, getTechnologyById } from '@/data/library'
import { normalizeText, toSearchTerms } from '@/lib/normalizeText'
import type { CheatSheet, ID } from '@/types'

/**
 * Busca global nos Cheat Sheets.
 *
 * Ideia: cada ficha é dividida em "campos" com pesos diferentes. Encontrar o
 * termo no título vale mais do que encontrá-lo no meio de um exemplo de
 * código. A soma dos pontos define a ordem dos resultados (o "ranking").
 *
 * Termos que são nomes de tecnologia ("git", "sql") viram FILTRO em vez de
 * pontuar: "git branch" busca "branch" só dentro de Git.
 */

/** Quanto vale encontrar um termo em cada campo. */
const FIELD_WEIGHTS = {
  title: 10,
  tags: 6,
  context: 4, // nome da tecnologia e da categoria
  description: 3,
  body: 1, // quando usar, sintaxe, exemplos e dicas
} as const

type Field = keyof typeof FIELD_WEIGHTS

/** Bônus quando uma palavra do título começa com o termo ("map" em "Array.map()"). */
const TITLE_WORD_PREFIX_BONUS = 5

interface IndexedSheet {
  sheet: CheatSheet
  fields: Record<Field, string>
  /** Palavras do título, para o bônus de prefixo. */
  titleWords: string[]
}

export interface SearchResult {
  sheet: CheatSheet
  score: number
}

// O índice (textos já normalizados) é montado uma vez só, na primeira busca.
// O conteúdo não muda enquanto a aplicação roda, então não precisa refazer.
let index: IndexedSheet[] | null = null

function buildIndex(): IndexedSheet[] {
  return getAllSheets().map((sheet) => {
    const technology = getTechnologyById(sheet.technologyId)
    const category = getCategoryById(sheet.categoryId)
    const title = normalizeText(sheet.title)

    return {
      sheet,
      titleWords: title.split(/[^\p{L}\p{N}]+/u).filter(Boolean),
      fields: {
        title,
        tags: normalizeText(sheet.tags.join(' ')),
        context: normalizeText(`${technology?.name ?? ''} ${category?.name ?? ''}`),
        description: normalizeText(sheet.description),
        body: normalizeText(
          [
            sheet.whenToUse,
            sheet.syntax,
            ...sheet.examples.flatMap((example) => [example.caption ?? '', example.code]),
            ...sheet.tips.map((tip) => tip.text),
          ].join('\n'),
        ),
      },
    }
  })
}

/** Separa os termos que são nome (ou slug) de uma tecnologia dos demais. */
function splitTechnologyFilters(terms: string[]) {
  const technologyIds = new Set<ID>()
  const textTerms: string[] = []

  for (const term of terms) {
    const technology = getTechnologies().find(
      (t) => normalizeText(t.name) === term || normalizeText(t.slug) === term,
    )
    if (technology) technologyIds.add(technology.id)
    else textTerms.push(term)
  }

  return { technologyIds, textTerms }
}

/** Pontos de um termo numa ficha: o campo de maior peso em que ele aparece. */
function scoreTerm(entry: IndexedSheet, term: string): number {
  let best = 0
  for (const field of Object.keys(FIELD_WEIGHTS) as Field[]) {
    if (entry.fields[field].includes(term)) {
      best = Math.max(best, FIELD_WEIGHTS[field])
    }
  }
  if (entry.titleWords.some((word) => word.startsWith(term))) best += TITLE_WORD_PREFIX_BONUS
  return best
}

/**
 * Retorna as fichas que contêm TODOS os termos (em qualquer campo), da mais
 * relevante para a menos relevante. Busca vazia retorna lista vazia.
 */
export function searchSheets(query: string): SearchResult[] {
  const terms = toSearchTerms(query)
  if (terms.length === 0) return []

  index ??= buildIndex()
  const { technologyIds, textTerms } = splitTechnologyFilters(terms)
  const results: SearchResult[] = []

  for (const entry of index) {
    if (technologyIds.size > 0 && !technologyIds.has(entry.sheet.technologyId)) continue

    // Só filtros (ex.: "git"): todas as fichas da tecnologia entram com a mesma nota.
    let score = textTerms.length === 0 ? 1 : 0
    for (const term of textTerms) {
      const termScore = scoreTerm(entry, term)
      if (termScore === 0) {
        score = 0
        break // um termo não encontrado elimina a ficha
      }
      score += termScore
    }
    if (score > 0) results.push({ sheet: entry.sheet, score })
  }

  // Maior pontuação primeiro; empate em ordem alfabética do título.
  return results.sort((a, b) => b.score - a.score || a.sheet.title.localeCompare(b.sheet.title, 'pt-BR'))
}
