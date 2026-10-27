import { ArrowRight, CornerDownLeft, Search } from 'lucide-react'
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { getCategoryById, getSheetPath, getTechnologyById } from '@/data/library'
import { cn } from '@/lib/cn'
import { toSearchTerms } from '@/lib/normalizeText'
import { MatchHighlight } from './MatchHighlight'
import { searchSheets } from './searchSheets'

/** Quantos resultados cabem na paleta; o resto fica na página /search. */
const MAX_RESULTS = 8

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

/**
 * Paleta de busca aberta com Ctrl+K.
 *
 * Usa o elemento nativo <dialog>. Com showModal(), o navegador já cuida de:
 * deixar o resto da página inerte, prender o foco dentro da janela, fechar
 * com Esc e desenhar o fundo escurecido (::backdrop).
 */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Sincroniza o estado do React com a API imperativa do <dialog>.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-label="Buscar cheat sheets"
      // "close" dispara quando o navegador fecha o diálogo (ex.: Esc).
      onClose={onClose}
      // Clique fora da caixa: o alvo é o próprio <dialog> (a área do backdrop).
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-xl border border-border bg-surface p-0 text-text shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {/* Montado só quando aberto: ao fechar, a busca digitada é descartada. */}
      {open && <SearchPalette onClose={onClose} />}
    </dialog>
  )
}

function SearchPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const terms = useMemo(() => toSearchTerms(query), [query])
  const allResults = useMemo(() => searchSheets(query), [query])
  const results = allResults.slice(0, MAX_RESULTS)

  // Mantém o item ativo visível ao navegar com as setas.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function goTo(path: string) {
    onClose()
    navigate(path)
  }

  function openAllResults() {
    goTo(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const active = results[activeIndex]
      if (active) goTo(getSheetPath(active.sheet))
    }
  }

  const activeId = results[activeIndex] ? `search-option-${results[activeIndex].sheet.id}` : undefined

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-4 shrink-0 text-muted" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0) // nova busca: volta para o primeiro resultado
          }}
          onKeyDown={handleKeyDown}
          placeholder="Buscar por título, tag ou tecnologia…"
          autoFocus
          // Padrão "combobox": o leitor de tela anuncia o item ativo da lista
          // sem que o foco saia do campo de texto.
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          className="h-14 flex-1 bg-transparent text-[15px] placeholder:text-muted focus:outline-none"
        />
        <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-muted sm:inline">
          Esc
        </kbd>
      </div>

      {terms.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted">
          Digite para buscar. Use o nome de uma tecnologia para filtrar: <code className="font-mono">git branch</code>
        </p>
      ) : results.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted">Nenhum resultado para “{query.trim()}”.</p>
      ) : (
        <ul ref={listRef} id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.map(({ sheet }, index) => {
            const technology = getTechnologyById(sheet.technologyId)
            const category = getCategoryById(sheet.categoryId)
            const active = index === activeIndex

            return (
              <li
                key={sheet.id}
                id={`search-option-${sheet.id}`}
                role="option"
                aria-selected={active}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => goTo(getSheetPath(sheet))}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5',
                  active && 'bg-surface-2',
                )}
              >
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: technology?.color }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm">
                    <MatchHighlight text={sheet.title} terms={terms} />
                  </p>
                  <p className="truncate text-xs text-muted">
                    {technology?.name} · {category?.name}
                  </p>
                </div>
                {active && <CornerDownLeft aria-hidden="true" className="size-4 shrink-0 text-muted" />}
              </li>
            )
          })}
        </ul>
      )}

      {allResults.length > 0 && (
        <button
          type="button"
          onClick={openAllResults}
          className="flex w-full items-center justify-center gap-1.5 border-t border-border px-4 py-2.5 text-sm text-accent hover:bg-surface-2"
        >
          {allResults.length === 1 ? 'Ver resultado em cards' : `Ver os ${allResults.length} resultados em cards`}
          <ArrowRight className="size-4" />
        </button>
      )}
    </div>
  )
}
