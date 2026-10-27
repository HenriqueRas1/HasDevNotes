import { Link } from 'react-router'
import { InlineCode } from '@/components/ui/InlineCode'
import { Tag } from '@/components/ui/Tag'
import { getCategoryById, getSheetPath, getTechnologyById } from '@/data/library'
import { FavoriteButton } from '@/features/favorites/FavoriteButton'
import type { CheatSheet } from '@/types'

/** Quantas tags aparecem no card (o resto fica na página do Cheat Sheet). */
const TAG_LIMIT = 3

interface SheetCardProps {
  sheet: CheatSheet
  /** Mostra "Tecnologia · Categoria" no topo. Útil em listas que misturam tecnologias. */
  showContext?: boolean
}

/**
 * Card de Cheat Sheet com botão de favorito.
 *
 * Um <button> não pode ficar dentro de um <a>, então o card não é um link
 * inteiro. Usamos o padrão "link esticado": o ::after do link do título cobre
 * o card todo (absolute inset-0), e o botão fica por cima dele (relative z-10).
 */
export function SheetCard({ sheet, showContext = false }: SheetCardProps) {
  const technology = getTechnologyById(sheet.technologyId)
  const category = getCategoryById(sheet.categoryId)

  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-muted/50 hover:bg-surface-2 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent">
      {showContext && technology && category && (
        <p className="mb-2 flex items-center gap-1.5 text-xs text-muted">
          <span className="size-1.5 rounded-full" style={{ backgroundColor: technology.color }} />
          {technology.name} · {category.name}
        </p>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-[15px] font-medium transition-colors group-hover:text-accent">
          <Link to={getSheetPath(sheet)} className="outline-none after:absolute after:inset-0 after:rounded-xl">
            {sheet.title}
          </Link>
        </h3>
        <FavoriteButton sheetId={sheet.id} className="relative z-10 -mt-1.5 -mr-1.5" />
      </div>

      <p className="mt-2 flex-1 text-sm text-muted">
        <InlineCode text={sheet.description} />
      </p>

      {sheet.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {sheet.tags.slice(0, TAG_LIMIT).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </div>
  )
}
