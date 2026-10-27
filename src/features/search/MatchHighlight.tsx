import { normalizeText } from '@/lib/normalizeText'

interface MatchHighlightProps {
  text: string
  /** Termos já normalizados (saída de toSearchTerms). */
  terms: string[]
}

/**
 * Destaca com <mark> os trechos do texto que correspondem aos termos,
 * ignorando acentos: o termo "juncao" destaca "Junção".
 */
export function MatchHighlight({ text, terms }: MatchHighlightProps) {
  const normalized = normalizeText(text)

  // As posições só batem se a normalização não mudou o tamanho do texto.
  if (normalized.length !== text.length || terms.length === 0) return <>{text}</>

  // Marca cada caractere que faz parte de algum termo encontrado.
  const marked = new Array<boolean>(text.length).fill(false)
  for (const term of terms) {
    let start = normalized.indexOf(term)
    while (start !== -1) {
      marked.fill(true, start, start + term.length)
      start = normalized.indexOf(term, start + term.length)
    }
  }

  // Agrupa caracteres vizinhos com a mesma marcação em pedaços.
  const pieces: { text: string; match: boolean }[] = []
  for (let i = 0; i < text.length; i++) {
    const last = pieces.at(-1)
    if (last && last.match === marked[i]) last.text += text[i]
    else pieces.push({ text: text[i], match: marked[i] })
  }

  return (
    <>
      {pieces.map((piece, i) =>
        piece.match ? (
          <mark key={i} className="rounded-sm bg-accent/20 text-accent">
            {piece.text}
          </mark>
        ) : (
          piece.text
        ),
      )}
    </>
  )
}
