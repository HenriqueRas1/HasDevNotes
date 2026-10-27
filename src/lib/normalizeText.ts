/**
 * Deixa um texto "comparável": minúsculas e sem acentos.
 *
 *   normalizeText('Junções')  →  'juncoes'
 *
 * Como funciona: normalize('NFD') separa cada letra do seu acento
 * ("ç" vira "c" + "¸"); a regex remove os acentos soltos
 * (\p{Diacritic} = qualquer sinal diacrítico Unicode); e normalize('NFC')
 * junta de volta o que tiver sobrado separado.
 *
 * Em textos em português, cada caractere vira exatamente um caractere, então
 * as posições do texto normalizado batem com as do original. O destaque dos
 * resultados da busca usa isso (e confere antes de confiar).
 */
export function normalizeText(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').normalize('NFC')
}

/** Quebra a busca em termos: "  Array  MAP " → ['array', 'map'] */
export function toSearchTerms(query: string): string[] {
  return normalizeText(query).split(/\s+/).filter(Boolean)
}
