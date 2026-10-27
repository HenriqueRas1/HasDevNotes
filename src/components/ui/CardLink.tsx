import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

interface CardLinkProps {
  to: string
  children: ReactNode
  className?: string
}

/** Card inteiro clicável. É a base visual de todos os cards da biblioteca. */
export function CardLink({ to, children, className }: CardLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group flex h-full flex-col rounded-xl border border-border bg-surface p-5',
        'transition-colors hover:border-muted/50 hover:bg-surface-2',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      )}
    >
      {children}
    </Link>
  )
}
