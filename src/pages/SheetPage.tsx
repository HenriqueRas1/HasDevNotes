import { Construction } from 'lucide-react'
import { useParams } from 'react-router'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import {
  getCategoryBySlug,
  getCategoryPath,
  getSheetBySlug,
  getTechnologyBySlug,
  getTechnologyPath,
} from '@/data/library'
import { NotFoundPage } from './NotFoundPage'

// Provisória: a visualização completa (código, dicas, relacionados) chega na Etapa 5.
export function SheetPage() {
  const { techSlug = '', categorySlug = '', sheetSlug = '' } = useParams()
  const technology = getTechnologyBySlug(techSlug)
  const category = technology && getCategoryBySlug(technology.id, categorySlug)
  const sheet = category && getSheetBySlug(category.id, sheetSlug)

  if (!technology || !category || !sheet) return <NotFoundPage />

  return (
    <>
      <title>{`${sheet.title} · ${technology.name} · HasDevNotes`}</title>

      <Breadcrumbs
        items={[
          { label: 'Início', to: '/' },
          { label: technology.name, to: getTechnologyPath(technology) },
          { label: category.name, to: getCategoryPath(category) },
          { label: sheet.title },
        ]}
      />
      <PageHeader title={sheet.title} description={sheet.description} accentColor={technology.color} />
      <EmptyState
        icon={<Construction className="size-6" />}
        title="Em construção"
        description="A visualização completa, com sintaxe, exemplos com destaque de código e dicas, chega na próxima etapa."
      />
    </>
  )
}
