import type { ReactNode } from 'react'
import { InlineCode } from './InlineCode'

interface PageHeaderProps {
  title: string
  description?: string
  /** Cor da barrinha acima do título (ex.: a cor da tecnologia). */
  accentColor?: string
  /** Informação extra abaixo da descrição, como contagens. */
  meta?: ReactNode
  /** Botões ao lado do título (ex.: favoritar). */
  actions?: ReactNode
}

export function PageHeader({ title, description, accentColor, meta, actions }: PageHeaderProps) {
  return (
    <header className="mb-8 space-y-2">
      {accentColor && <span className="mb-3 block h-1 w-12 rounded-full" style={{ backgroundColor: accentColor }} />}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {actions && <div className="flex shrink-0 items-center gap-2 sm:mt-1.5">{actions}</div>}
      </div>
      {description && (
        <p className="max-w-2xl text-muted">
          <InlineCode text={description} />
        </p>
      )}
      {meta && <p className="font-mono text-xs text-muted">{meta}</p>}
    </header>
  )
}
