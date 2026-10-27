import { useEffect } from 'react'

/** true se o usuário está digitando num campo (aí "/" é só uma barra). */
function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

/**
 * Atalhos globais para abrir a busca:
 * - Ctrl+K (ou Cmd+K no Mac), em qualquer lugar;
 * - "/", quando o foco não está num campo de texto.
 */
export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isModK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'
      const isSlash = event.key === '/' && !isTypingTarget(event.target)

      if (isModK || isSlash) {
        // Impede o atalho padrão do navegador (Ctrl+K foca a barra de pesquisa).
        event.preventDefault()
        onOpen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onOpen])
}
