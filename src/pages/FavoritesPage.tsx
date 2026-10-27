import { Star } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'

// Provisória: o sistema de favoritos chega na Etapa 6.
export function FavoritesPage() {
  return (
    <>
      <title>Favoritos · HasDevNotes</title>
      <PageHeader title="Favoritos" description="Os cheat sheets que você marcou para consultar rápido." />
      <EmptyState
        icon={<Star className="size-6" />}
        title="Nenhum favorito ainda"
        description="Em breve você poderá marcar cheat sheets com a estrela e encontrá-los aqui."
      />
    </>
  )
}
