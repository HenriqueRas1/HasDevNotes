import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Tecla de atalho (ex.: "Ctrl K", "Esc"), no estilo do design: só borda, fonte mono. */
export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd className={cn('rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted', className)}>
      {children}
    </kbd>
  )
}
