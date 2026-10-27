import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { SheetCard } from '@/components/cards/SheetCard'
import { TechnologyCard } from '@/components/cards/TechnologyCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { getLibraryStats, getTechnologies } from '@/data/library'
import { useFavoriteSheets } from '@/features/favorites/useFavoriteSheets'

/** Quantos favoritos aparecem na página inicial. */
const RECENT_FAVORITES_LIMIT = 4

export function HomePage() {
  const stats = getLibraryStats()
  const statItems = [
    { label: 'Tecnologias', value: stats.technologies },
    { label: 'Categorias', value: stats.categories },
    { label: 'Cheat sheets', value: stats.sheets },
  ]

  const recentFavorites = useFavoriteSheets().slice(0, RECENT_FAVORITES_LIMIT)

  return (
    <>
      <title>HasDevNotes</title>

      <PageHeader
        title="Sua biblioteca"
        description="Consulta rápida a conceitos, sintaxes e comandos que você usa no dia a dia. Escolha uma tecnologia para começar."
      />

      <dl className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-surface px-4 py-3 sm:px-5 sm:py-4">
            <dt className="text-xs text-muted sm:text-sm">{item.label}</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold sm:text-3xl">{item.value}</dd>
          </div>
        ))}
      </dl>

      {recentFavorites.length > 0 && (
        <section aria-labelledby="favorites-title" className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 id="favorites-title" className="text-sm font-semibold uppercase tracking-wider text-muted">
              Favoritos recentes
            </h2>
            <Link to="/favorites" className="flex items-center gap-1 text-sm text-accent hover:underline">
              Ver todos
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {recentFavorites.map((sheet) => (
              <li key={sheet.id}>
                <SheetCard sheet={sheet} showContext />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="technologies-title">
        <h2 id="technologies-title" className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Tecnologias
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {getTechnologies().map((technology) => (
            <li key={technology.id}>
              <TechnologyCard technology={technology} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
