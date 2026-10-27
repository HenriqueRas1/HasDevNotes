import { AppLayout } from '@/components/layout/AppLayout'
import {
  getCategoriesByTechnology,
  getLibraryStats,
  getSheetsByTechnology,
  getTechnologies,
} from '@/data/library'

// Conteúdo provisório da Etapa 3, só para preencher o layout. Na Etapa 4 cada
// tela vira uma página própria em src/pages.
function App() {
  const stats = getLibraryStats()

  return (
    <AppLayout>
      <header className="mb-8 space-y-2">
        <p className="font-mono text-sm text-accent">// etapa 3 · layout</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sua biblioteca</h1>
        <p className="text-muted">
          {stats.sheets} cheat sheets em {stats.categories} categorias de {stats.technologies} tecnologias.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {getTechnologies().map((technology) => (
          <li key={technology.id}>
            <a
              href={`/${technology.slug}`}
              className="block h-full rounded-xl border border-border bg-surface p-5 transition-colors hover:border-muted/50 hover:bg-surface-2"
            >
              <span className="mb-3 block h-1 w-10 rounded-full" style={{ backgroundColor: technology.color }} />
              <h2 className="font-semibold">{technology.name}</h2>
              <p className="mt-1 text-sm text-muted">{technology.description}</p>
              <p className="mt-4 font-mono text-xs text-muted">
                {getCategoriesByTechnology(technology.id).length} categorias ·{' '}
                {getSheetsByTechnology(technology.id).length} sheets
              </p>
            </a>
          </li>
        ))}
      </ul>
    </AppLayout>
  )
}

export default App
