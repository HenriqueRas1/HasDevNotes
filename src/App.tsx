// Tela provisória da Etapa 1: serve só para validar o Tailwind, os tokens de
// cor e as fontes. Será substituída pelo layout real na Etapa 3.
const tokens = [
  { name: 'bg', className: 'bg-bg' },
  { name: 'surface', className: 'bg-surface' },
  { name: 'surface-2', className: 'bg-surface-2' },
  { name: 'border', className: 'bg-border' },
  { name: 'muted', className: 'bg-muted' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'accent-2', className: 'bg-accent-2' },
  { name: 'success', className: 'bg-success' },
  { name: 'warning', className: 'bg-warning' },
  { name: 'danger', className: 'bg-danger' },
]

function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-4 py-12">
      <header className="space-y-2">
        <p className="font-mono text-sm text-accent">// etapa 1 concluída</p>
        <h1 className="text-4xl font-bold tracking-tight">
          Has<span className="text-accent">Dev</span>Notes
        </h1>
        <p className="text-muted">Sua biblioteca pessoal de cheat sheets de programação.</p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Tokens de cor
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {tokens.map((token) => (
            <li key={token.name} className="space-y-1.5">
              <div className={`h-10 rounded-md border border-border ${token.className}`} />
              <code className="font-mono text-xs text-muted">{token.name}</code>
            </li>
          ))}
        </ul>
      </section>

      <pre className="overflow-x-auto rounded-xl border border-border bg-surface-2 p-5 font-mono text-sm">
        <code>
          <span className="text-accent-2">const</span> stack = [
          <span className="text-success">'React'</span>, <span className="text-success">'TypeScript'</span>,{' '}
          <span className="text-success">'Vite'</span>, <span className="text-success">'Tailwind'</span>]
        </code>
      </pre>
    </main>
  )
}

export default App
