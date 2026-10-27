import { Star } from 'lucide-react'
import { Link } from 'react-router'
import { SheetCard } from '@/components/cards/SheetCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { useFavoriteSheets } from '@/features/favorites/useFavoriteSheets'
import { useFavorites } from '@/features/favorites/useFavorites'

export function FavoritesPage() {
  const { loading } = useFavorites()
  const sheets = useFavoriteSheets()

  return (
    <>
      <title>Favoritos · HasDevNotes</title>
      <PageHeader
        title="Favoritos"
        description="Os cheat sheets que você marcou para consultar rápido, do mais recente ao mais antigo."
        meta={loading ? undefined : `${sheets.length} ${sheets.length === 1 ? 'favorito' : 'favoritos'}`}
      />

      {/* Enquanto carrega, não mostra nada: evita piscar "nenhum favorito" à toa. */}
      {loading ? null : sheets.length === 0 ? (
        <EmptyState
          icon={<Star className="size-6" />}
          title="Nenhum favorito ainda"
          description="Toque na estrela de um cheat sheet para guardá-lo aqui."
          action={
            <Link
              to="/"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Explorar a biblioteca
            </Link>
          }
        />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {sheets.map((sheet) => (
            <li key={sheet.id}>
              <SheetCard sheet={sheet} showContext />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
