import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

/**
 * Estrutura fixa de todas as telas: Sidebar à esquerda, Header no topo e o
 * conteúdo da página (children) no meio.
 *
 * Abaixo de lg (1024px) a Sidebar vira um drawer controlado pelo estado
 * `sidebarOpen`.
 */
export function AppLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        <Header sidebarOpen={sidebarOpen} onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
