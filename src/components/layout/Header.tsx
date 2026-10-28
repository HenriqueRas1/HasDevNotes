import { Menu } from 'lucide-react'
import { Kbd } from '@/components/ui/Kbd'

/** No Mac o atalho usa a tecla Command (⌘) em vez de Ctrl. */
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)

interface HeaderProps {
  sidebarOpen: boolean
  onOpenSidebar: () => void
  onOpenSearch: () => void
}

export function Header({ sidebarOpen, onOpenSidebar, onOpenSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-bg/80 px-4 backdrop-blur sm:px-6 lg:px-10">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menu"
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        className="-ml-1.5 rounded-md p-1.5 text-muted hover:bg-surface-2 hover:text-text lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <button
        type="button"
        onClick={onOpenSearch}
        aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
        className="flex h-10 w-full max-w-md items-center gap-3 rounded-xl border border-border bg-surface px-4 text-sm text-muted transition-colors hover:border-muted/50 hover:text-text"
      >
        {/* O "›" lembra um prompt de terminal, como no design. */}
        <span aria-hidden="true" className="font-mono text-base font-medium text-accent">
          ›
        </span>
        <span className="flex-1 text-left">Buscar cheat sheets…</span>
        <Kbd className="hidden sm:inline">{isMac ? '⌘K' : 'Ctrl K'}</Kbd>
      </button>
    </header>
  )
}
