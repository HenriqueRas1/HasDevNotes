import {
  getCategoriesByTechnology,
  getLibraryStats,
  getSheetPath,
  getSheetsByCategory,
  getTechnologies,
} from '@/data/library'

// Tela provisória da Etapa 2: lista todo o conteúdo para validar o modelo de
// dados e a camada de acesso. Será substituída pelo layout real na Etapa 3.
function App() {
  const stats = getLibraryStats()

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2">
        <p className="font-mono text-sm text-accent">// etapa 2 · tipos e conteúdo</p>
        <h1 className="text-4xl font-bold tracking-tight">
          Has<span className="text-accent">Dev</span>Notes
        </h1>
        <p className="text-muted">
          {stats.technologies} tecnologias · {stats.categories} categorias · {stats.sheets} cheat sheets
        </p>
      </header>

      {getTechnologies().map((technology) => (
        <section key={technology.id} className="rounded-xl border border-border bg-surface p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: technology.color }} />
            {technology.name}
          </h2>
          <p className="mb-4 text-sm text-muted">{technology.description}</p>

          <div className="space-y-4">
            {getCategoriesByTechnology(technology.id).map((category) => (
              <div key={category.id}>
                <h3 className="text-sm font-medium">{category.name}</h3>
                <ul className="mt-1 space-y-1">
                  {getSheetsByCategory(category.id).map((sheet) => (
                    <li key={sheet.id} className="flex flex-wrap items-baseline gap-x-3 text-sm">
                      <span>{sheet.title}</span>
                      <code className="font-mono text-xs text-muted">{getSheetPath(sheet)}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default App
