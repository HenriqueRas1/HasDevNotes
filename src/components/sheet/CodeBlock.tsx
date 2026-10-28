import { Highlight } from 'prism-react-renderer'
import { codeTheme, languageLabel, toPrismLanguage } from '@/lib/highlight'
import type { CodeLanguage } from '@/types'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  code: string
  language: CodeLanguage
  /** Texto no topo do bloco. Se omitido, mostra o nome da linguagem. */
  title?: string
  /** Resultado esperado, exibido logo abaixo do código. */
  output?: string
}

export function CodeBlock({ code, language, title, output }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface">
      <figcaption className="flex items-center justify-between gap-3 border-b border-border py-1.5 pr-1.5 pl-4">
        <span className="truncate font-mono text-xs text-muted">{title ?? languageLabel[language]}</span>
        <CopyButton text={code} />
      </figcaption>

      {/* Highlight recebe o código e entrega os tokens já classificados.
          Nós decidimos como desenhar cada linha e cada token (render prop). */}
      <Highlight code={code} language={toPrismLanguage(language)} theme={codeTheme}>
        {({ tokens, getLineProps, getTokenProps, style }) => (
          <pre className="overflow-x-auto px-5 py-4 font-mono text-[13.5px] leading-[1.7]" style={style}>
            <code>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>

      {output && (
        <div className="border-t border-border bg-bg/40 px-4 py-3">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">Resultado</p>
          <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-success">{output}</pre>
        </div>
      )}
    </figure>
  )
}
