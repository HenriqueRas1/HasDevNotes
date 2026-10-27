/**
 * Intl.DateTimeFormat formata datas no padrão de cada idioma.
 * Criado uma vez só, porque montar o formatador tem um custo.
 */
const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

/** "2026-10-27T14:18:42.577Z" → "27/10/2026, 11:18" (no fuso do usuário) */
export function formatDateTime(isoDate: string): string {
  return dateTimeFormatter.format(new Date(isoDate))
}
