import { Prism, type PrismTheme } from 'prism-react-renderer'
import type { CodeLanguage } from '@/types'

/**
 * Configuração do syntax highlighting (Prism).
 *
 * O Prism quebra o código em "tokens" (palavra-chave, string, comentário…)
 * usando expressões regulares. Cada tipo de token recebe uma cor do tema.
 */

// ── Gramática de bash ──────────────────────────────────────────────────────
// O prism-react-renderer não inclui bash, então registramos uma gramática
// simples, suficiente para os comandos de terminal dos Cheat Sheets.
// A ordem importa: tokens anteriores "consomem" o texto primeiro.
Prism.languages.bash = {
  comment: { pattern: /(^|\s)#.*/, lookbehind: true, greedy: true },
  string: { pattern: /"(?:\\.|[^"\\])*"|'[^']*'/, greedy: true },
  // Marcadores dos moldes de sintaxe: <arquivo>, <branch>
  placeholder: /<[\w-][^<>\n]*>/,
  variable: /\$\w+|\$\{[^}]+\}/,
  // Opções: -m, -u, --oneline
  flag: { pattern: /(^|\s)--?[\w-]+/, lookbehind: true },
  // Comando no início da linha ou depois de ; | &&
  function: {
    pattern: /(^|[;|&]\s*)(?:git|npm|npx|node|cd|ls|mkdir|rm|cp|mv|echo|cat|touch)\b/m,
    lookbehind: true,
  },
  operator: /&&|\|\||[|;]/,
}

// ── Linguagens ─────────────────────────────────────────────────────────────

/** Nome que o Prism usa para cada linguagem do nosso modelo. */
const prismLanguageByCodeLanguage: Record<CodeLanguage, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  html: 'markup',
  css: 'css',
  json: 'json',
  sql: 'sql',
  bash: 'bash',
  python: 'python',
}

export function toPrismLanguage(language: CodeLanguage): string {
  return prismLanguageByCodeLanguage[language]
}

/** Rótulo curto exibido no topo do bloco de código. */
export const languageLabel: Record<CodeLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  sql: 'SQL',
  bash: 'Terminal',
  python: 'Python',
}

// ── Tema ───────────────────────────────────────────────────────────────────
// As cores vêm das variáveis --syntax-* do index.css. Assim um tema claro
// futuro troca também as cores do código, sem mexer aqui.

const color = (name: string) => `var(--syntax-${name})`

export const codeTheme: PrismTheme = {
  plain: { color: 'var(--text)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: color('comment'), fontStyle: 'italic' } },
    { types: ['keyword', 'atrule', 'important', 'selector'], style: { color: color('keyword') } },
    { types: ['string', 'char', 'attr-value', 'regex', 'inserted'], style: { color: color('string') } },
    { types: ['function', 'class-name', 'builtin'], style: { color: color('function') } },
    { types: ['number', 'boolean', 'constant', 'symbol'], style: { color: color('number') } },
    { types: ['property', 'attr-name', 'flag'], style: { color: color('property') } },
    { types: ['tag', 'deleted'], style: { color: color('tag') } },
    { types: ['variable', 'placeholder'], style: { color: color('variable') } },
    { types: ['operator', 'entity', 'url'], style: { color: color('operator') } },
    { types: ['punctuation'], style: { color: color('punctuation') } },
  ],
}
