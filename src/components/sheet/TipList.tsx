import { CircleX, Lightbulb, type LucideIcon, TriangleAlert } from 'lucide-react'
import { InlineCode } from '@/components/ui/InlineCode'
import { cn } from '@/lib/cn'
import type { Tip, TipKind } from '@/types'

/**
 * Aparência de cada tipo de dica. Por ser um Record<TipKind, ...>, o
 * TypeScript acusa erro se um novo TipKind for criado e esquecido aqui.
 */
const tipStyles: Record<TipKind, { label: string; icon: LucideIcon; className: string }> = {
  tip: { label: 'Dica', icon: Lightbulb, className: 'border-success/30 bg-success/5 text-success' },
  warning: { label: 'Cuidado', icon: TriangleAlert, className: 'border-warning/30 bg-warning/5 text-warning' },
  mistake: { label: 'Erro comum', icon: CircleX, className: 'border-danger/30 bg-danger/5 text-danger' },
}

/** Ordem de exibição: dicas, depois cuidados, depois erros comuns. */
const kindOrder: TipKind[] = ['tip', 'warning', 'mistake']

export function TipList({ tips }: { tips: Tip[] }) {
  const sortedTips = [...tips].sort((a, b) => kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind))

  return (
    <ul className="space-y-2">
      {sortedTips.map((tip) => {
        const { label, icon: Icon, className } = tipStyles[tip.kind]
        return (
          <li key={tip.text} className={cn('flex gap-3 rounded-lg border px-4 py-3', className)}>
            <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p className="text-sm text-text">
              <span className="font-semibold">{label}: </span>
              <InlineCode text={tip.text} />
            </p>
          </li>
        )
      })}
    </ul>
  )
}
