import { Check, Copy, X } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { cn } from '@/lib/cn'

const feedback = {
  idle: { label: 'Copiar', icon: Copy, className: 'text-accent hover:text-accent-2' },
  copied: { label: 'Copiado!', icon: Check, className: 'text-success' },
  error: { label: 'Falhou', icon: X, className: 'text-danger' },
}

export function CopyButton({ text }: { text: string }) {
  const { status, copy } = useCopyToClipboard()
  const { label, icon: Icon, className } = feedback[status]

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={cn(
        'flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs transition-colors hover:bg-surface-2',
        className,
      )}
    >
      <Icon className="size-3.5" />
      {/* aria-live faz o leitor de tela anunciar quando o texto muda para "Copiado!". */}
      <span aria-live="polite">{label}</span>
    </button>
  )
}
