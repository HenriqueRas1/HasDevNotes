/**
 * Mostra um texto em que trechos entre crases viram código:
 *
 *   "Use `git pull` antes"  →  Use <code>git pull</code> antes
 *
 * Assim o conteúdo continua sendo texto simples, mas comandos e nomes de
 * funções aparecem em fonte monoespaçada, exatamente como se digita.
 */
export function InlineCode({ text }: { text: string }) {
  // O split com um grupo de captura ( ) mantém os trechos de código no array:
  // as posições ímpares são sempre o que estava entre crases.
  const parts = text.split(/`([^`]+)`/)

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            className="rounded border border-border bg-surface-2 px-1 py-px font-mono text-[0.875em] text-text"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}
