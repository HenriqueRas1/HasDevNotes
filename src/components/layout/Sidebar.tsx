import { ChevronRight, Home, Star, X } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import {
  getCategoriesByTechnology,
  getCategoryPath,
  getLibraryStats,
  getSheetsByCategory,
  getSheetsByTechnology,
  getTechnologies,
} from '@/data/library'
import { useFavoriteSheets } from '@/features/favorites/useFavoriteSheets'
import { cn } from '@/lib/cn'
import type { Technology } from '@/types'
import { Logo } from './Logo'

interface SidebarProps {
  /** Só tem efeito abaixo de lg: no desktop a sidebar fica sempre visível. */
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const stats = getLibraryStats()
  const favoriteCount = useFavoriteSheets().length

  // O primeiro trecho da URL diz qual tecnologia está aberta: /javascript/arrays → "javascript".
  const { pathname } = useLocation()
  const activeTechSlug = pathname.split('/')[1]

  return (
    <aside
      id="sidebar"
      aria-label="Navegação principal"
      className={cn(
        // Celular/tablet: painel fixo que desliza da esquerda (drawer).
        'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-surface',
        'transition-[translate,visibility] duration-200 ease-out',
        // Desktop: coluna fixa ao lado do conteúdo, sempre visível.
        'lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-auto lg:translate-x-0',
        // "invisible" também tira os links fechados da ordem do Tab.
        !open && 'max-lg:invisible max-lg:-translate-x-full',
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="rounded-md p-1.5 text-muted hover:bg-surface-2 hover:text-text lg:hidden"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          <li>
            <SidebarLink to="/" icon={<Home className="size-4" />}>
              Início
            </SidebarLink>
          </li>
          <li>
            <SidebarLink to="/favorites" icon={<Star className="size-4" />} badge={favoriteCount || undefined}>
              Favoritos
            </SidebarLink>
          </li>
        </ul>

        <div>
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted">Tecnologias</h2>
          <ul className="space-y-0.5">
            {getTechnologies().map((technology) => (
              <TechnologyItem
                key={technology.id}
                technology={technology}
                active={technology.slug === activeTechSlug}
              />
            ))}
          </ul>
        </div>
      </nav>

      <p className="shrink-0 border-t border-border px-5 py-3 font-mono text-xs text-muted">
        {stats.sheets} cheat sheets · {stats.technologies} tecnologias
      </p>
    </aside>
  )
}

interface SidebarLinkProps {
  to: string
  icon: ReactNode
  /** Número à direita (ex.: quantidade de favoritos). */
  badge?: number
  children: ReactNode
}

function SidebarLink({ to, icon, badge, children }: SidebarLinkProps) {
  return (
    // NavLink sabe se a URL atual é a dele e passa `isActive` para o className.
    // `end` faz "/" ficar ativo só na página inicial, e não em toda URL que começa com "/".
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-2',
          isActive ? 'bg-surface-2 text-text' : 'text-muted hover:text-text',
        )
      }
    >
      {icon}
      <span className="flex-1">{children}</span>
      {badge !== undefined && <span className="font-mono text-xs text-muted">{badge}</span>}
    </NavLink>
  )
}

interface TechnologyItemProps {
  technology: Technology
  /** true quando a URL atual está dentro desta tecnologia. */
  active: boolean
}

/** Uma tecnologia que expande para mostrar suas categorias. */
function TechnologyItem({ technology, active }: TechnologyItemProps) {
  // null = o usuário ainda não clicou na seta, então segue a URL (abre se estiver ativa).
  // true/false = o usuário escolheu, e a escolha dele vale.
  const [userExpanded, setUserExpanded] = useState<boolean | null>(null)
  const expanded = userExpanded ?? active

  const categories = getCategoriesByTechnology(technology.id)
  const listId = `sidebar-${technology.id}`

  return (
    <li>
      <button
        type="button"
        onClick={() => setUserExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={listId}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-2',
          active ? 'text-text' : 'text-muted hover:text-text',
        )}
      >
        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: technology.color }} />
        <span className="flex-1 text-left">{technology.name}</span>
        <span className="font-mono text-xs text-muted">{getSheetsByTechnology(technology.id).length}</span>
        <ChevronRight className={cn('size-4 text-muted transition-transform', expanded && 'rotate-90')} />
      </button>

      {expanded && (
        <ul id={listId} className="mt-0.5 mb-1 ml-[1.15rem] space-y-0.5 border-l border-border pl-2">
          <li>
            <SubLink to={`/${technology.slug}`} end>
              Visão geral
            </SubLink>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <SubLink to={getCategoryPath(category)}>
                {category.name}
                <span className="shrink-0 font-mono text-xs text-muted">{getSheetsByCategory(category.id).length}</span>
              </SubLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

interface SubLinkProps {
  to: string
  end?: boolean
  children: ReactNode
}

/** Link de segundo nível (dentro de uma tecnologia). */
function SubLink({ to, end, children }: SubLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between gap-2 rounded-md px-2 py-1 text-sm transition-colors hover:bg-surface-2',
          isActive ? 'font-medium text-accent' : 'text-muted hover:text-text',
        )
      }
    >
      {children}
    </NavLink>
  )
}
