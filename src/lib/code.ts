/**
 * Tag para escrever trechos de código no conteúdo de forma legível:
 *
 *   code`
 *   const x = 1
 *   `
 *
 * Remove a quebra de linha inicial e os espaços finais, para que o código
 * possa começar na linha de baixo da crase.
 */
export function code(strings: TemplateStringsArray, ...values: unknown[]): string {
  const raw = strings.reduce((acc, str, i) => acc + str + (i < values.length ? String(values[i]) : ''), '')
  return raw.replace(/^\r?\n/, '').trimEnd()
}
