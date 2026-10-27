import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

export interface BreadcrumbItem {
  label: string
  /** Sem `to`, o item é a página atual e não vira link. */
  to?: string
}

/** Trilha de navegação: Início › JavaScript › Arrays */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight aria-hidden="true" className="size-3.5" />}
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-text">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-text">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
