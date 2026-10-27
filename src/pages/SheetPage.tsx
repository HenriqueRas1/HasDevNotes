import { useParams } from 'react-router'
import { SheetCard } from '@/components/cards/SheetCard'
import { CodeBlock } from '@/components/sheet/CodeBlock'
import { SheetSection } from '@/components/sheet/SheetSection'
import { TipList } from '@/components/sheet/TipList'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InlineCode } from '@/components/ui/InlineCode'
import { PageHeader } from '@/components/ui/PageHeader'
import { Tag } from '@/components/ui/Tag'
import {
  getCategoryBySlug,
  getCategoryPath,
  getRelatedSheets,
  getSheetBySlug,
  getTechnologyBySlug,
  getTechnologyPath,
} from '@/data/library'
import { FavoriteButton } from '@/features/favorites/FavoriteButton'
import { NotesPanel } from '@/features/notes/NotesPanel'
import { NotFoundPage } from './NotFoundPage'

export function SheetPage() {
  const { techSlug = '', categorySlug = '', sheetSlug = '' } = useParams()
  const technology = getTechnologyBySlug(techSlug)
  const category = technology && getCategoryBySlug(technology.id, categorySlug)
  const sheet = category && getSheetBySlug(category.id, sheetSlug)

  if (!technology || !category || !sheet) return <NotFoundPage />

  const relatedSheets = getRelatedSheets(sheet)

  return (
    <article className="max-w-3xl">
      <title>{`${sheet.title} · ${technology.name} · HasDevNotes`}</title>

      <Breadcrumbs
        items={[
          { label: 'Início', to: '/' },
          { label: technology.name, to: getTechnologyPath(technology) },
          { label: category.name, to: getCategoryPath(category) },
          { label: sheet.title },
        ]}
      />
      <PageHeader
        title={sheet.title}
        description={sheet.description}
        accentColor={technology.color}
        actions={<FavoriteButton sheetId={sheet.id} variant="labeled" />}
      />

      <div className="space-y-10">
        <SheetSection id="when" title="Quando usar">
          <p className="rounded-r-lg border-l-2 border-accent bg-surface px-4 py-3 text-[15px] leading-relaxed">
            <InlineCode text={sheet.whenToUse} />
          </p>
        </SheetSection>

        <SheetSection id="syntax" title="Sintaxe">
          <CodeBlock code={sheet.syntax} language={technology.language} />
        </SheetSection>

        {sheet.examples.length > 0 && (
          <SheetSection id="examples" title={sheet.examples.length > 1 ? 'Exemplos' : 'Exemplo'}>
            <div className="space-y-4">
              {sheet.examples.map((example) => (
                <CodeBlock
                  key={example.code}
                  code={example.code}
                  // Cada exemplo pode ter linguagem própria; senão, usa a da tecnologia.
                  language={example.language ?? technology.language}
                  title={example.caption}
                  output={example.output}
                />
              ))}
            </div>
          </SheetSection>
        )}

        {sheet.tips.length > 0 && (
          <SheetSection id="tips" title="Dicas, cuidados e erros comuns">
            <TipList tips={sheet.tips} />
          </SheetSection>
        )}

        <SheetSection id="notes" title="Minhas anotações">
          {/* key: ao ir para outra ficha (ex.: um Relacionado), o React recria o
              painel do zero. Sem isso, um editor aberto "vazaria" para a outra ficha. */}
          <NotesPanel key={sheet.id} sheetId={sheet.id} />
        </SheetSection>

        {sheet.tags.length > 0 && (
          <SheetSection id="tags" title="Tags">
            <div className="flex flex-wrap gap-2">
              {sheet.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </SheetSection>
        )}

        {relatedSheets.length > 0 && (
          <SheetSection id="related" title="Relacionados">
            <ul className="grid gap-4 sm:grid-cols-2">
              {relatedSheets.map((related) => (
                <li key={related.id}>
                  <SheetCard sheet={related} />
                </li>
              ))}
            </ul>
          </SheetSection>
        )}
      </div>
    </article>
  )
}
