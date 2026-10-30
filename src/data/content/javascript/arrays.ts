import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const arrays: CategoryContent = {
  category: {
    id: 'js-arrays',
    slug: 'arrays',
    technologyId: 'javascript',
    name: 'Arrays',
    description: 'Acessar, editar, transformar, buscar e ordenar listas.',
  },

  sheets: [
    {
      id: 'js-array-acesso',
      slug: 'acesso-e-edicao',
      technologyId: 'javascript',
      categoryId: 'js-arrays',
      title: 'Acessar e editar arrays',
      description: 'Ler posições, adicionar e remover itens do início, do fim ou do meio de uma lista.',
      whenToUse: 'Para montar listas aos poucos, ler o primeiro ou o último item e remover itens por posição.',
      syntax: code`
lista.length
lista[0]               // primeiro
lista.at(-1)           // último
lista.push(item)       // adiciona no fim     (altera a lista)
lista.pop()            // remove do fim       (altera a lista)
lista.unshift(item)    // adiciona no início  (altera a lista)
lista.shift()          // remove do início    (altera a lista)
lista.splice(i, qtd, ...novos)  // remove/insere no meio (altera a lista)
lista.slice(inicio, fim)        // copia um trecho (não altera)
lista.includes(x)      // true se x estiver na lista
lista.indexOf(x)       // posição de x, ou -1
`,
      examples: [
        {
          caption: 'Ler e adicionar',
          code: code`
const nums = [10, 20, 30]
console.log(nums.length, nums[0], nums.at(-1))

nums.push(40)
nums.unshift(5)
console.log(nums)
`,
          output: '3 10 30\n[5, 10, 20, 30, 40]',
        },
        {
          caption: 'splice x slice',
          code: code`
const nums = [10, 20, 30, 40]
const trecho = nums.slice(1, 3)         // não altera nums
const removidos = nums.splice(1, 1, 99) // altera nums

console.log(trecho, removidos, nums)
console.log(nums.includes(99), nums.indexOf(99))
`,
          output: '[20, 30] [20] [10, 99, 30, 40]\ntrue 1',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Alteram o array original (isso se chama mutação): `push`, `pop`, `shift`, `unshift` e `splice`. O `slice` não altera: devolve uma cópia.',
        },
        { kind: 'tip', text: '`push` e `unshift` devolvem o novo tamanho; `pop` e `shift` devolvem o item removido.' },
        { kind: 'tip', text: 'Índices começam em zero. `indexOf` devolve `-1` quando não encontra.' },
        {
          kind: 'mistake',
          text: 'Usar `delete lista[i]`: a posição fica vazia e o tamanho não muda. Use `splice` ou `filter`.',
        },
      ],
      tags: ['array', 'push', 'splice', 'slice'],
      relatedIds: ['js-array-transformar', 'js-array-sem-mutacao'],
    },
    {
      id: 'js-array-transformar',
      slug: 'transformar-e-buscar',
      technologyId: 'javascript',
      categoryId: 'js-arrays',
      title: 'Transformar e buscar (map, filter, find…)',
      description:
        'Métodos que recebem um callback (uma função que roda para cada item) para transformar, filtrar ou buscar sem escrever loops.',
      whenToUse:
        'Para transformar todos os itens (`map`), ficar só com alguns (`filter`), achar um (`find`) ou testar a lista (`some`/`every`).',
      syntax: code`
lista.map((item, indice, array) => novoValor)  // array do mesmo tamanho
lista.filter((item) => condicao)               // só os aprovados
lista.find((item) => condicao)                 // primeiro item ou undefined
lista.findIndex((item) => condicao)            // índice ou -1
lista.some((item) => condicao)                 // algum passa?
lista.every((item) => condicao)                // todos passam?
lista.forEach((item) => { /* efeito */ })      // retorna undefined
`,
      examples: [
        {
          caption: 'Os principais métodos',
          code: code`
const nums = [1, 2, 3, 4]
console.log(nums.map((n) => n * 2))
console.log(nums.filter((n) => n > 2))
console.log(nums.find((n) => n > 2), nums.findIndex((n) => n > 2))
console.log(nums.some((n) => n > 3), nums.every((n) => n > 0))
`,
          output: '[2, 4, 6, 8]\n[3, 4]\n3 2\ntrue true',
        },
        {
          caption: 'Encadeando com objetos',
          code: code`
const tarefas = [
  { titulo: 'Estudar JS', feita: true },
  { titulo: 'Revisar Git', feita: false },
  { titulo: 'Ler MDN', feita: false },
]

const pendentes = tarefas.filter((t) => !t.feita).map((t) => t.titulo)
console.log(pendentes)
`,
          output: "['Revisar Git', 'Ler MDN']",
        },
      ],
      tips: [
        { kind: 'tip', text: '`map` e `filter` sempre devolvem um array novo; `filter` sem aprovados devolve `[]`.' },
        { kind: 'tip', text: '`find` devolve o item; `filter` devolve um array, mesmo com um único item.' },
        {
          kind: 'warning',
          text: 'Os métodos não mudam o array, mas o callback pode alterar os objetos dentro dele. Para mudar um item, devolva uma cópia: `{ ...t, feita: true }` (veja Destructuring, spread e rest).',
        },
        {
          kind: 'mistake',
          text: 'Esquecer o `return` em arrow function com chaves `{ }`: o `map` devolve um array cheio de `undefined`.',
        },
        {
          kind: 'mistake',
          text: 'Usar `map` só para percorrer, sem usar o retorno. Para efeitos (log, salvar), use `forEach` ou `for...of`.',
        },
      ],
      tags: ['array', 'map', 'filter', 'find', 'callback'],
      relatedIds: ['js-array-reduce', 'js-funcoes-callbacks', 'js-array-sem-mutacao'],
    },
    {
      id: 'js-array-reduce',
      slug: 'reduce',
      technologyId: 'javascript',
      categoryId: 'js-arrays',
      title: 'Acumular valores (reduce)',
      description: 'Percorre o array acumulando um único resultado: um número, um objeto, outro array…',
      whenToUse:
        'Para somar valores, contar ocorrências ou agrupar itens. Se `map` ou `filter` resolverem, prefira-os: são mais legíveis.',
      syntax: code`
const resultado = lista.reduce((acumulador, item) => {
  return novoAcumulador
}, valorInicial)
`,
      examples: [
        {
          caption: 'Somar',
          code: code`
const carrinho = [{ preco: 10 }, { preco: 25 }, { preco: 5 }]
const total = carrinho.reduce((soma, item) => soma + item.preco, 0)
console.log(total)
`,
          output: '40',
        },
        {
          caption: 'Contar ocorrências',
          code: code`
const votos = ['js', 'py', 'js', 'go', 'js']
const contagem = votos.reduce((acc, voto) => {
  acc[voto] = (acc[voto] ?? 0) + 1
  return acc
}, {})

console.log(contagem)
`,
          output: '{ js: 3, py: 1, go: 1 }',
        },
      ],
      tips: [
        { kind: 'tip', text: 'O valor retornado em cada volta vira o acumulador da próxima.' },
        {
          kind: 'warning',
          text: 'Sempre passe o valor inicial. Sem ele, um array vazio lança `TypeError`.',
        },
        { kind: 'mistake', text: 'Esquecer o `return acc` no callback com chaves: o acumulador vira `undefined` na volta seguinte.' },
      ],
      tags: ['array', 'reduce', 'soma', 'agrupar'],
      relatedIds: ['js-array-transformar'],
    },
    {
      id: 'js-array-sem-mutacao',
      slug: 'sem-mutacao',
      technologyId: 'javascript',
      categoryId: 'js-arrays',
      title: 'Ordenar e copiar sem alterar o original',
      description:
        'Versões que devolvem um array novo em vez de alterar o original (`toSorted`, `toReversed`, `toSpliced`, `with`), e utilitários como `flat` e `Array.from`.',
      whenToUse:
        'Quando a lista original não pode mudar, como no estado do React, e para ordenar números e textos corretamente.',
      syntax: code`
lista.toSorted(comparador)   // como sort, mas devolve cópia
lista.toReversed()           // como reverse, mas devolve cópia
lista.toSpliced(i, qtd, x)   // como splice, mas devolve cópia
lista.with(i, valor)         // cópia com uma posição trocada
lista.flat()                 // achata um nível
lista.flatMap(fn)            // map + flat
lista.findLast(fn)           // busca do fim para o início
Array.from({ length: n }, (_, i) => i)  // [0, 1, ..., n-1]

// comparadores
(a, b) => a - b                        // números, crescente
(a, b) => a.localeCompare(b, 'pt-BR')  // textos
`,
      examples: [
        {
          caption: 'Sem alterar o original',
          code: code`
const a = [3, 1, 2]
console.log(a.toSorted((x, y) => x - y))
console.log(a.toReversed())
console.log(a.with(0, 8))
console.log(a)
`,
          output: '[1, 2, 3]\n[2, 1, 3]\n[8, 1, 2]\n[3, 1, 2]',
        },
        {
          caption: 'Achatar e gerar listas',
          code: code`
console.log([[1], [2, 3]].flat())
console.log([1, 2].flatMap((n) => [n, n * 10]))
console.log(Array.from({ length: 3 }, (_, i) => i))
console.log(['Érico', 'ana', 'Bia'].toSorted((a, b) => a.localeCompare(b, 'pt-BR')))
`,
          output: "[1, 2, 3]\n[1, 10, 2, 20]\n[0, 1, 2]\n['ana', 'Bia', 'Érico']",
        },
      ],
      tips: [
        { kind: 'tip', text: 'Alternativa que funciona em qualquer ambiente: `[...lista].sort(comparador)`.' },
        {
          kind: 'tip',
          text: 'O array é novo, mas os objetos dentro dele são os mesmos (cópia rasa). Veja Referências e cópias.',
        },
        {
          kind: 'mistake',
          text: '`[10, 2, 1].sort()` ordena como texto e devolve `[1, 10, 2]`. Para números, passe `(a, b) => a - b`.',
        },
        { kind: 'warning', text: '`sort` e `reverse` alteram o array original. Em estado do React, use as versões `to…`.' },
      ],
      tags: ['array', 'sort', 'imutabilidade', 'flat'],
      relatedIds: ['js-array-acesso', 'js-referencias-copias'],
    },
  ],
}
