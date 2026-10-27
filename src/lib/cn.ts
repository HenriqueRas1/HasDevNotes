/**
 * Junta classes CSS ignorando valores "falsos", para aplicar classes
 * condicionalmente sem montar strings na mão:
 *
 *   cn('px-2', isActive && 'text-accent', isOpen ? 'block' : 'hidden')
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
