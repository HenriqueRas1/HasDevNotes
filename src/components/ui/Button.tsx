import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-accent text-bg hover:opacity-90',
  secondary: 'border border-border text-text hover:bg-surface-2',
  ghost: 'text-muted hover:bg-surface-2 hover:text-text',
  danger: 'bg-danger text-bg hover:opacity-90',
}

/**
 * ComponentProps<'button'> inclui todas as props de um <button> nativo
 * (onClick, disabled, type…). Assim o Button aceita tudo que um botão
 * comum aceita, mais a prop `variant`.
 */
interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof variants
}

export function Button({ variant = 'secondary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
