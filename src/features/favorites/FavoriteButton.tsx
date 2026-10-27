import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ID } from '@/types'
import { useFavorites } from './useFavorites'

interface FavoriteButtonProps {
  sheetId: ID
  /** "icon": só a estrela (cards) · "labeled": estrela + texto (página do sheet) */
  variant?: 'icon' | 'labeled'
  className?: string
}

export function FavoriteButton({ sheetId, variant = 'icon', className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(sheetId)
  const label = active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(sheetId)}
      // aria-pressed informa a leitores de tela que é um botão liga/desliga.
      aria-pressed={active}
      aria-label={variant === 'icon' ? label : undefined}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-lg transition-colors',
        variant === 'icon'
          ? 'p-1.5 hover:bg-surface'
          : 'border border-border px-3 py-1.5 text-sm hover:bg-surface-2',
        active ? 'text-warning' : 'text-muted hover:text-text',
        className,
      )}
    >
      <Star className={cn('size-4', active && 'fill-current')} />
      {variant === 'labeled' && <span>{active ? 'Favorito' : 'Favoritar'}</span>}
    </button>
  )
}
