import { useCallback, useEffect, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { SearchDialog } from '@/features/search/SearchDialog'
import { useSearchShortcut } from '@/features/search/useSearchShortcut'
import { cn } from '@/lib/cn'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

/**
 * Rota de layout: estrutura fixa de todas as telas. A página da URL atual é
 * desenhada no lugar do <Outlet />.
 *
 * Abaixo de lg (1024px) a Sidebar vira um drawer controlado pelo estado
 * `sidebarOpen`.
 */
export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // useCallback mantém a mesma função entre renderizações, para o hook do
  // atalho não precisar refazer o addEventListener a cada render.
  const openSearch = useCallback(() => setSearchOpen(true), [])
  useSearchShortcut(openSearch)

  // Fecha o drawer a cada navegação. `location.key` muda a cada clique em um
  // link, inclusive quando o destino é a página atual.
  //
  // Isto é um "ajuste de estado durante a renderização": compara o valor
  // atual com o anterior e corrige o estado na hora, sem esperar um useEffect.
  const location = useLocation()
  const [lastLocationKey, setLastLocationKey] = useState(location.key)
  if (location.key !== lastLocationKey) {
    setLastLocationKey(location.key)
    setSidebarOpen(false)
  }

  // Com o drawer aberto: Esc fecha e a página de trás não rola.
  useEffect(() => {
    if (!sidebarOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Função de limpeza: roda quando o drawer fecha ou o componente sai da tela.
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Fundo escurecido atrás do drawer; clicar nele fecha o menu. */}
      <div
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'fixed inset-0 z-30 bg-black/60 transition-opacity duration-200 lg:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div className="flex min-w-0 flex-col">
        <Header
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenSearch={openSearch}
        />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Volta ao topo ao abrir uma página nova e restaura a posição no "voltar". */}
      <ScrollRestoration />
    </div>
  )
}
