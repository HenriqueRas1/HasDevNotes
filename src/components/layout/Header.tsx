import { Menu, Search } from 'lucide-react'

interface HeaderProps {
  sidebarOpen: boolean
  onOpenSidebar: () => void
}

export function Header({ sidebarOpen, onOpenSidebar }: HeaderProps) {
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

      {/* Visual da busca. Ela passa a funcionar na Etapa 8. */}
      <button
        type="button"
        className="flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-muted transition-colors hover:border-muted/50"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 text-left">Buscar cheat sheets…</span>
        <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] sm:inline">
          Ctrl K
        </kbd>
      </button>
    </header>
  )
}
