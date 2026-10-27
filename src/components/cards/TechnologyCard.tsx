import { CardLink } from '@/components/ui/CardLink'
import { getCategoriesByTechnology, getSheetsByTechnology, getTechnologyPath } from '@/data/library'
import type { Technology } from '@/types'

export function TechnologyCard({ technology }: { technology: Technology }) {
  const categoryCount = getCategoriesByTechnology(technology.id).length
  const sheetCount = getSheetsByTechnology(technology.id).length

  return (
    <CardLink to={getTechnologyPath(technology)}>
      <span className="mb-4 block h-1 w-10 rounded-full" style={{ backgroundColor: technology.color }} />
      <h3 className="font-semibold">{technology.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{technology.description}</p>
      <p className="mt-4 font-mono text-xs text-muted">
        {categoryCount} categorias · {sheetCount} sheets
      </p>
    </CardLink>
  )
}
