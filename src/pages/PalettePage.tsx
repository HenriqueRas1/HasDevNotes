import { Highlight } from 'prism-react-renderer'
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { InlineCode } from '@/components/ui/InlineCode'
import { getAllSheets, getSheetPath, getTechnologies, getTechnologyById } from '@/data/library'
import { useFavorites } from '@/features/favorites/useFavorites'
import { searchSheets } from '@/features/search/searchSheets'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { cn } from '@/lib/cn'
import { codeTheme, toPrismLanguage } from '@/lib/highlight'
import type { ID } from '@/types'

/** No Mac os atalhos usam Command (⌘) em vez de Ctrl. */
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)
const mod = isMac ? '⌘' : 'Ctrl '

const copyFeedback = {
  idle: { label: 'Copiar ↵', className: 'text-accent' },
  copied: { label: 'Copiado ✓', className: 'text-success' },
  error: { label: 'Falhou ✕', className: 'text-danger' },
}

/** Valor do chip "Todos": sem filtro de tecnologia. */
const ALL = 'all'

/**
 * Tela principal no layout "Palette" do Claude Design (docs/design/):
 * busca no topo, chips de tecnologia, lista à esquerda e detalhe à direita.
 *
 * Tudo funciona pelo teclado:
 *   Ctrl+K foca a busca · ↑↓ muda o item · Enter copia o código
 *   Ctrl+E abre o Cheat Sheet completo (com anotações) · Ctrl+P fixa nos favoritos
 */
export function PalettePage() {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { status, copy } = useCopyToClipboard(1200)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState('')
  const [technologyId, setTechnologyId] = useState<ID>(ALL)
  const [activeIndex, setActiveIndex] = useState(0)

  // Busca vazia mostra tudo; com texto, usa o ranking da busca global.
  const list = useMemo(() => {
    const sheets = query.trim() ? searchSheets(query).map((r) => r.sheet) : getAllSheets()
    return technologyId === ALL ? sheets : sheets.filter((s) => s.technologyId === technologyId)
  }, [query, technologyId])

  const index = Math.min(activeIndex, Math.max(0, list.length - 1))
  const current = list[index]

  // Atalhos globais da tela (valem mesmo com o foco fora da busca).
  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey)) return
      const key = event.key.toLowerCase()
      if (key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      } else if (key === 'e' && current) {
        event.preventDefault()
        // O ScrollRestoration do AppLayout rola até o elemento com esse id.
        navigate(`${getSheetPath(current)}#section-notes`)
      } else if (key === 'p' && current) {
        event.preventDefault() // impede a janela de impressão do navegador
        toggleFavorite(current.id)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, navigate, toggleFavorite])

  // Mantém o item ativo visível ao navegar com as setas.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(Math.min(index + 1, list.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && current) {
      copy(current.syntax)
    }
  }

  const chips = [{ id: ALL, name: 'Todos' }, ...getTechnologies()]
  const pinned = current ? isFavorite(current.id) : false

  return (
    <div className="flex min-h-screen flex-col items-center bg-bg px-4 py-10 text-text sm:px-6 sm:py-[72px]">
      <title>HasDevNotes</title>

      <div className="flex w-full max-w-[1074px] flex-col gap-[18px]">
        {/* Busca */}
        <div className="flex items-center gap-3.5 rounded-xl border border-border bg-field px-5 sm:px-6">
          <span aria-hidden="true" className="font-mono text-lg font-medium text-accent">
            ›
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="O que você precisa? ex.: desfazer commit"
            aria-label="Buscar cheat sheets"
            aria-controls="palette-list"
            aria-activedescendant={current ? `palette-${current.id}` : undefined}
            autoFocus
            className="min-w-0 flex-1 bg-transparent py-5 text-lg text-text placeholder:text-text/45 focus:outline-none sm:py-6 sm:text-[22px]"
          />
          {/* Maior que o <Kbd> padrão, como no design. */}
          <kbd className="hidden rounded border border-border px-[7px] py-[3px] font-mono text-[13px] text-muted sm:inline">
            {isMac ? '⌘K' : 'Ctrl K'}
          </kbd>
        </div>

        {/* Chips de tecnologia */}
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filtrar por tecnologia">
          {chips.map((chip) => {
            const selected = chip.id === technologyId
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setTechnologyId(chip.id)
                  setActiveIndex(0)
                }}
                className={cn(
                  'rounded-[20px] border px-[13px] py-1.5 font-mono text-[15px] transition-colors hover:text-text',
                  selected ? 'border-accent text-text' : 'border-border text-muted',
                )}
              >
                {chip.name}
              </button>
            )
          })}
        </div>

        {/* Lista + detalhe */}
        <div className="grid gap-[18px] md:h-[550px] md:grid-cols-[minmax(0,425px)_minmax(0,1fr)]">
          <div
            ref={listRef}
            id="palette-list"
            role="listbox"
            aria-label="Cheat sheets"
            className="flex max-h-[45vh] flex-col gap-0.5 overflow-auto md:max-h-none"
          >
            {list.map((sheet, i) => {
              const active = i === index
              return (
                <div
                  key={sheet.id}
                  id={`palette-${sheet.id}`}
                  role="option"
                  aria-selected={active}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'flex flex-none cursor-pointer items-center justify-between gap-3 rounded-[9px] px-[15px] py-[13px]',
                    active ? 'bg-surface-3' : 'hover:bg-surface-2',
                  )}
                >
                  <span className={cn('text-[17px]', active ? 'text-white' : 'text-text/85')}>{sheet.title}</span>
                  <span className="flex-none font-mono text-[13px] text-muted">
                    {getTechnologyById(sheet.technologyId)?.name}
                  </span>
                </div>
              )
            })}
            {list.length === 0 && <div className="p-[15px] text-[15px] text-muted">Nada encontrado.</div>}
          </div>

          <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-border-subtle bg-surface p-[26px]">
            {current && (
              <>
                <div className="text-[22px] font-semibold">{current.title}</div>
                <div className="text-[15px] leading-normal text-subtle">
                  <InlineCode text={current.description} />
                </div>
                {/* Mesmo highlighting do CodeBlock: cores por tipo de token, como num editor. */}
                <Highlight
                  code={current.syntax}
                  language={toPrismLanguage(getTechnologyById(current.technologyId)?.language ?? 'javascript')}
                  theme={codeTheme}
                >
                  {({ tokens, getLineProps, getTokenProps, style }) => (
                    <pre
                      className="m-0 min-h-24 flex-1 overflow-auto font-mono text-[15px] leading-[1.7] whitespace-pre-wrap sm:text-[17px]"
                      style={style}
                    >
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
                <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-4 font-mono text-[15px] text-muted">
                  <span className="hidden sm:inline">
                    ↵ copiar · {mod}E editar · {mod}P {pinned ? 'desafixar' : 'fixar'}
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(current.syntax)}
                    className={cn('ml-auto', copyFeedback[status].className)}
                  >
                    {/* aria-live anuncia "Copiado" para leitores de tela. */}
                    <span aria-live="polite">{copyFeedback[status].label}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
