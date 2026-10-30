import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const fluxo: CategoryContent = {
  category: {
    id: 'js-fluxo',
    slug: 'controle-de-fluxo',
    technologyId: 'javascript',
    name: 'Controle de fluxo',
    description: 'Condicionais, loops e tratamento de erros.',
  },

  sheets: [
    {
      id: 'js-condicionais',
      slug: 'condicionais',
      technologyId: 'javascript',
      categoryId: 'js-fluxo',
      title: 'Condicionais',
      description: '`if`/`else` escolhe um caminho, o ternário escolhe um valor e o `switch` compara um valor com vários casos.',
      whenToUse: 'Sempre que o código precisa reagir de forma diferente conforme uma condição.',
      syntax: code`
if (condicao) {
  // ...
} else if (outra) {
  // ...
} else {
  // ...
}

const valor = condicao ? seVerdadeiro : seFalso

switch (expressao) {
  case 'a':
    // ...
    break
  default:
    // ...
}
`,
      examples: [
        {
          caption: 'if / else if e ternário',
          code: code`
const nota = 82
if (nota >= 90) {
  console.log('A')
} else if (nota >= 80) {
  console.log('B')
} else {
  console.log('C')
}

const status = nota >= 60 ? 'aprovado' : 'rever'
console.log(status)
`,
          output: 'B\naprovado',
        },
        {
          caption: 'Retorno antecipado em vez de aninhar',
          code: code`
function saudar(user) {
  if (!user) return 'Faça login'
  if (!user.nome) return 'Complete seu perfil'
  return 'Olá, ' + user.nome
}

console.log(saudar(null))
console.log(saudar({ nome: 'Maya' }))
`,
          output: 'Faça login\nOlá, Maya',
        },
        {
          caption: 'switch',
          code: code`
const acao = 'salvar'
switch (acao) {
  case 'salvar':
    console.log('Salvo')
    break
  case 'excluir':
    console.log('Excluído')
    break
  default:
    console.log('Ação desconhecida')
}
`,
          output: 'Salvo',
        },
      ],
      tips: [
        { kind: 'tip', text: 'O `switch` compara com igualdade estrita (`===`).' },
        { kind: 'tip', text: 'Para mapear valores fixos, um objeto costuma ser mais limpo que um `switch`: `const icones = { ok: "✓", erro: "✕" }`.' },
        { kind: 'warning', text: 'Evite ternários encadeados ou longos: viram difíceis de ler. Use `if` ou retorno antecipado.' },
        { kind: 'mistake', text: 'Esquecer o `break` no `switch`: a execução continua no `case` seguinte.' },
      ],
      tags: ['if', 'ternário', 'switch'],
      relatedIds: ['js-operadores', 'js-loops'],
    },
    {
      id: 'js-loops',
      slug: 'loops',
      technologyId: 'javascript',
      categoryId: 'js-fluxo',
      title: 'Loops e iteração',
      description: '`for...of` percorre valores, `for` clássico controla o índice, `while` repete enquanto uma condição for verdadeira.',
      whenToUse: 'Para repetir uma ação. Em arrays, comece por `for...of` ou pelos métodos `map`/`filter`.',
      syntax: code`
for (const item of lista) { }           // valores de arrays, strings, Map, Set
for (let i = 0; i < n; i++) { }         // com índice
for (const [k, v] of Object.entries(obj)) { }
while (condicao) { }
do { } while (condicao)                 // roda pelo menos uma vez

break      // encerra o loop
continue   // pula para a próxima volta
`,
      examples: [
        {
          caption: 'for...of e for clássico',
          code: code`
for (const nome of ['Maya', 'Leo']) {
  console.log(nome)
}

for (let i = 0; i < 4; i++) {
  if (i === 1) continue
  if (i === 3) break
  console.log(i)
}
`,
          output: 'Maya\nLeo\n0\n2',
        },
        {
          caption: 'Percorrer um objeto e usar o índice',
          code: code`
const user = { nome: 'Maya', idade: 28 }
for (const [chave, valor] of Object.entries(user)) {
  console.log(chave, valor)
}

for (const [i, cor] of ['azul', 'verde'].entries()) {
  console.log(i, cor)
}
`,
          output: 'nome Maya\nidade 28\n0 azul\n1 verde',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Para esperar uma tarefa demorada (como uma requisição) antes da próxima, use `for...of` com `await` dentro. O `forEach` não espera. Veja a categoria Assíncrono.',
        },
        {
          kind: 'warning',
          text: '`for...in` percorre os nomes das chaves, não os valores. Evite em arrays.',
        },
        { kind: 'mistake', text: 'Esquecer de atualizar a variável da condição no `while`: o loop nunca termina.' },
      ],
      tags: ['loop', 'for', 'while', 'iteração'],
      relatedIds: ['js-array-transformar', 'js-promises-async'],
    },
    {
      id: 'js-erros',
      slug: 'tratamento-de-erros',
      technologyId: 'javascript',
      categoryId: 'js-fluxo',
      title: 'Tratamento de erros',
      description:
        '`try`/`catch` captura erros, `finally` roda sempre e `throw` lança um erro com uma mensagem e, opcionalmente, a causa.',
      whenToUse:
        'Ao ler dados externos (JSON, APIs, armazenamento), validar entradas e quando for possível se recuperar ou avisar o usuário.',
      syntax: code`
try {
  // código que pode falhar
} catch (erro) {
  // trata o erro
} finally {
  // roda sempre (limpeza)
}

throw new Error('Mensagem', { cause: erroOriginal })
`,
      examples: [
        {
          caption: 'Capturar e acrescentar contexto',
          code: code`
function lerJSON(texto) {
  try {
    return JSON.parse(texto)
  } catch (cause) {
    throw new Error('JSON inválido', { cause })
  }
}

try {
  lerJSON('{erro}')
} catch (erro) {
  console.log(erro.message)
  console.log(erro.cause.name)
}
`,
          output: 'JSON inválido\nSyntaxError',
        },
        {
          caption: 'finally roda nos dois casos',
          code: code`
function tentar(valor) {
  try {
    if (valor < 0) throw new RangeError('Negativo')
    return 'ok'
  } catch (erro) {
    return erro.name
  } finally {
    console.log('fim', valor)
  }
}

console.log(tentar(1))
console.log(tentar(-1))
`,
          output: 'fim 1\nok\nfim -1\nRangeError',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Tipos comuns: `TypeError` (operação no tipo errado), `ReferenceError` (nome inexistente), `SyntaxError` e `RangeError` (valor fora da faixa).',
        },
        {
          kind: 'tip',
          text: 'Lance sempre `new Error(...)` (ou tipos como `TypeError`), não strings: o erro registra o caminho de chamadas até a linha que falhou, o que ajuda a depurar.',
        },
        {
          kind: 'warning',
          text: 'Em código assíncrono, o `try`/`catch` só captura o erro se você usar `await`. Veja a categoria Assíncrono.',
        },
        { kind: 'mistake', text: 'Deixar o `catch` vazio: o erro some e o bug fica escondido. No mínimo, registre com `console.error`.' },
      ],
      tags: ['erro', 'try', 'catch', 'throw'],
      relatedIds: ['js-promises-async', 'js-fetch', 'js-json-storage'],
    },
  ],
}
