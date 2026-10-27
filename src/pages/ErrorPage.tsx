import { TriangleAlert } from 'lucide-react'
import { useRouteError } from 'react-router'

/**
 * Tela exibida quando um componente lança um erro inesperado durante a
 * renderização. Sem ela, a aplicação inteira ficaria em branco.
 *
 * Fica fora do AppLayout de propósito: se o erro vier do próprio layout,
 * esta tela ainda funciona.
 */
export function ErrorPage() {
  const error = useRouteError()
  const message = error instanceof Error ? error.message : String(error)

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <title>Algo deu errado · HasDevNotes</title>
      <div className="max-w-md rounded-xl border border-border bg-surface p-8 text-center">
        <TriangleAlert className="mx-auto mb-4 size-8 text-warning" />
        <h1 className="text-xl font-semibold">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted">
          Um erro inesperado interrompeu esta tela. Seus favoritos e anotações continuam salvos.
        </p>
        {import.meta.env.DEV && (
          <pre className="mt-4 overflow-x-auto rounded-lg bg-surface-2 p-3 text-left font-mono text-xs text-danger">
            {message}
          </pre>
        )}
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90"
        >
          Recarregar a página inicial
        </a>
      </div>
    </main>
  )
}
