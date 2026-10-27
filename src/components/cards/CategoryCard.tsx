import { ArrowRight } from 'lucide-react'
import { CardLink } from '@/components/ui/CardLink'
import { getCategoryPath, getSheetsByCategory } from '@/data/library'
import type { Category } from '@/types'

/** Quantos títulos de Cheat Sheets aparecem como prévia no card. */
const PREVIEW_LIMIT = 3

export function CategoryCard({ category }: { category: Category }) {
  const sheets = getSheetsByCategory(category.id)
  const remaining = sheets.length - PREVIEW_LIMIT

  return (
    <CardLink to={getCategoryPath(category)}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{category.name}</h3>
        <span className="shrink-0 rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-muted">
          {sheets.length}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">{category.description}</p>

      <ul className="mt-4 flex-1 space-y-1 border-t border-border pt-3">
        {sheets.slice(0, PREVIEW_LIMIT).map((sheet) => (
          <li key={sheet.id} className="truncate font-mono text-xs text-muted">
            {sheet.title}
          </li>
        ))}
        {remaining > 0 && <li className="font-mono text-xs text-muted">+{remaining} mais</li>}
      </ul>

      <span className="mt-4 flex items-center gap-1 text-sm text-accent">
        Ver categoria
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </CardLink>
  )
}
