import { CardLink } from '@/components/ui/CardLink'
import { Tag } from '@/components/ui/Tag'
import { getSheetPath } from '@/data/library'
import type { CheatSheet } from '@/types'

/** Quantas tags aparecem no card (o resto fica na página do Cheat Sheet). */
const TAG_LIMIT = 3

export function SheetCard({ sheet }: { sheet: CheatSheet }) {
  return (
    <CardLink to={getSheetPath(sheet)}>
      <h3 className="font-mono text-[15px] font-medium transition-colors group-hover:text-accent">{sheet.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{sheet.description}</p>
      {sheet.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {sheet.tags.slice(0, TAG_LIMIT).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </CardLink>
  )
}
