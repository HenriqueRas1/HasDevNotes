import { useParams } from 'react-router'
import { SheetCard } from '@/components/cards/SheetCard'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { getCategoryBySlug, getSheetsByCategory, getTechnologyBySlug, getTechnologyPath } from '@/data/library'
import { NotFoundPage } from './NotFoundPage'

export function CategoryPage() {
  const { techSlug = '', categorySlug = '' } = useParams()
  const technology = getTechnologyBySlug(techSlug)
  const category = technology && getCategoryBySlug(technology.id, categorySlug)

  if (!technology || !category) return <NotFoundPage />

  const sheets = getSheetsByCategory(category.id)

  return (
    <>
      <title>{`${category.name} · ${technology.name} · HasDevNotes`}</title>

      <Breadcrumbs
        items={[
          { label: 'Início', to: '/' },
          { label: technology.name, to: getTechnologyPath(technology) },
          { label: category.name },
        ]}
      />
      <PageHeader
        title={category.name}
        description={category.description}
        accentColor={technology.color}
        meta={`${sheets.length} cheat sheets`}
      />

      <ul className="grid gap-4 md:grid-cols-2">
        {sheets.map((sheet) => (
          <li key={sheet.id}>
            <SheetCard sheet={sheet} />
          </li>
        ))}
      </ul>
    </>
  )
}
