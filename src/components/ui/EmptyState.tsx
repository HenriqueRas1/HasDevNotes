import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  /**
   * Nível do título. Use 'h1' quando o EmptyState é o conteúdo principal da
   * página (ex.: 404), para a página não ficar sem título principal.
   */
  titleAs?: 'h1' | 'h2'
}

/** Mensagem para telas sem conteúdo: lista vazia, página não encontrada… */
export function EmptyState({ icon, title, description, action, titleAs: Title = 'h2' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-surface-2 p-3 text-muted">{icon}</div>
      <Title className="text-lg font-semibold">{title}</Title>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
