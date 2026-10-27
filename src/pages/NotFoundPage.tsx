import { FileQuestion } from 'lucide-react'
import { Link } from 'react-router'
import { EmptyState } from '@/components/ui/EmptyState'

export function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada · HasDevNotes</title>
      <EmptyState
        icon={<FileQuestion className="size-6" />}
        title="Página não encontrada"
        titleAs="h1"
        description="O endereço não corresponde a nenhuma tecnologia, categoria ou cheat sheet da biblioteca."
        action={
          <Link
            to="/"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Voltar ao início
          </Link>
        }
      />
    </>
  )
}
