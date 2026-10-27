import { useCallback, useEffect, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'error'

/**
 * Copia texto para a área de transferência e informa o resultado.
 * Depois de `resetAfterMs`, o status volta para 'idle' sozinho.
 *
 *   const { status, copy } = useCopyToClipboard()
 *   <button onClick={() => copy('texto')}>{status === 'copied' ? 'Copiado!' : 'Copiar'}</button>
 */
export function useCopyToClipboard(resetAfterMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const timeoutId = setTimeout(() => setStatus('idle'), resetAfterMs)
    // Se o componente sair da tela antes do tempo, cancela o timer.
    return () => clearTimeout(timeoutId)
  }, [status, resetAfterMs])

  const copy = useCallback(async (text: string) => {
    try {
      // A Clipboard API só funciona em HTTPS ou localhost, e é assíncrona.
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }, [])

  return { status, copy }
}
