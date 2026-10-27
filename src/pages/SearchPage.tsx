import { Search, SearchX } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { SheetCard } from '@/components/cards/SheetCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { searchSheets } from '@/features/search/searchSheets'

export function SearchPage() {
  // A busca fica na URL (?q=...): dá para recarregar, voltar e compartilhar o link.
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const results = useMemo(() => searchSheets(query), [query])
  const hasQuery = query.trim().length > 0

  return (
    <>
      <title>{hasQuery ? `“${query.trim()}” · Busca · HasDevNotes` : 'Busca · HasDevNotes'}</title>

      <PageHeader
        title="Busca"
        meta={hasQuery ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}` : undefined}
      />

      <label className="mb-8 flex h-11 items-center gap-3 rounded-lg border border-border bg-surface px-3 focus-within:border-accent">
        <Search className="size-4 shrink-0 text-muted" />
        <input
          type="search"
          value={query}
          // replace: digitar não cria uma entrada nova no histórico a cada letra.
          onChange={(event) => setSearchParams({ q: event.target.value }, { replace: true })}
          placeholder="Buscar por título, tag ou tecnologia…"
          aria-label="Buscar cheat sheets"
          autoFocus
          className="flex-1 bg-transparent text-[15px] placeholder:text-muted focus:outline-none"
        />
      </label>

      {!hasQuery ? (
        <EmptyState
          icon={<Search className="size-6" />}
          title="O que você procura?"
          description="Busque por título, tag, tecnologia ou trecho de código. Dica: use Ctrl+K em qualquer página."
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon={<SearchX className="size-6" />}
          title="Nenhum resultado"
          description={`Nada encontrado para “${query.trim()}”. Tente outra palavra ou menos termos.`}
        />
      ) : (
        <>
          <h2 className="sr-only">Resultados</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {results.map(({ sheet }) => (
              <li key={sheet.id}>
                <SheetCard sheet={sheet} showContext />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
