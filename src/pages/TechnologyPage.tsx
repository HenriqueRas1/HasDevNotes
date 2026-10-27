import { useParams } from 'react-router'
import { CategoryCard } from '@/components/cards/CategoryCard'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { getCategoriesByTechnology, getSheetsByTechnology, getTechnologyBySlug } from '@/data/library'
import { NotFoundPage } from './NotFoundPage'

export function TechnologyPage() {
  // Lê o parâmetro :techSlug da URL. Em /javascript, techSlug = "javascript".
  const { techSlug = '' } = useParams()
  const technology = getTechnologyBySlug(techSlug)

  if (!technology) return <NotFoundPage />

  const categories = getCategoriesByTechnology(technology.id)
  const sheetCount = getSheetsByTechnology(technology.id).length

  return (
    <>
      <title>{`${technology.name} · HasDevNotes`}</title>

      <Breadcrumbs items={[{ label: 'Início', to: '/' }, { label: technology.name }]} />
      <PageHeader
        title={technology.name}
        description={technology.description}
        accentColor={technology.color}
        meta={`${categories.length} categorias · ${sheetCount} cheat sheets`}
      />

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </>
  )
}
