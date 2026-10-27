import type { ReactNode } from 'react'

interface SheetSectionProps {
  /** Usado no id do título, para o aria-labelledby. */
  id: string
  title: string
  children: ReactNode
}

/** Bloco com título dentro da página de um Cheat Sheet. */
export function SheetSection({ id, title, children }: SheetSectionProps) {
  const headingId = `section-${id}`

  return (
    <section aria-labelledby={headingId} className="space-y-3">
      <h2 id={headingId} className="text-sm font-semibold uppercase tracking-wider text-muted">
        {title}
      </h2>
      {children}
    </section>
  )
}
