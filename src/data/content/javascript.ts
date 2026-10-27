import { code } from '@/lib/code'
import type { TechnologyContent } from '@/types'

export const javascript: TechnologyContent = {
  technology: {
    id: 'javascript',
    slug: 'javascript',
    name: 'JavaScript',
    description: 'A linguagem da web: roda no navegador e, com Node.js, no servidor.',
    color: '#f7df1e',
    language: 'javascript',
  },

  categories: [
    {
      id: 'js-arrays',
      slug: 'arrays',
      technologyId: 'javascript',
      name: 'Arrays',
      description: 'Métodos para transformar, filtrar e resumir listas.',
      order: 1,
    },
    {
      id: 'js-async',
      slug: 'async',
      technologyId: 'javascript',
      name: 'Assíncrono',
      description: 'Promises, async/await e requisições HTTP.',
      order: 2,
    },
    {
      id: 'js-strings',
      slug: 'strings',
      technologyId: 'javascript',
      name: 'Strings',
      description: 'Criação e manipulação de textos.',
      order: 3,
    },
  ],

  sheets: [
    {
      id: 'js-array-map',
      slug: 'map',
      technologyId: 'javascript',
      categoryId: 'js-arrays',
      title: 'Array.map()',
      description: 'Cria um novo array aplicando uma função a cada item do array original.',
      whenToUse:
        'Quando você precisa transformar todos os itens de uma lista, mantendo a mesma quantidade de itens. Ex.: extrair nomes de uma lista de usuários.',
      syntax: code`
const novoArray = array.map((item, index, array) => {
  return novoValor
})
`,
      examples: [
        {
          caption: 'Dobrar números',
          code: code`
const numeros = [1, 2, 3]
const dobrados = numeros.map((n) => n * 2)

console.log(dobrados)
`,
          output: '[2, 4, 6]',
        },
        {
          caption: 'Extrair uma propriedade de objetos',
          code: code`
const usuarios = [
  { nome: 'Ana', idade: 28 },
  { nome: 'Bruno', idade: 34 },
]

const nomes = usuarios.map((u) => u.nome)
console.log(nomes)
`,
          output: "['Ana', 'Bruno']",
        },
      ],
      tips: [
        { kind: 'tip', text: '`map` não altera o array original: ele sempre retorna um array novo.' },
        {
          kind: 'mistake',
          text: 'Esquecer o `return` ao usar chaves `{ }` na arrow function. Sem ele, o novo array fica cheio de `undefined`.',
        },
        {
          kind: 'warning',
          text: 'Se você não vai usar o array retornado, use `forEach`. `map` serve para criar uma lista nova.',
        },
      ],
      tags: ['array', 'transformação', 'imutabilidade'],
      relatedIds: ['js-array-filter', 'js-array-reduce'],
    },
    {
      id: 'js-array-filter',
      slug: 'filter',
      technologyId: 'javascript',
      categoryId: 'js-arrays',
      title: 'Array.filter()',
      description: 'Cria um novo array apenas com os itens que passam em um teste.',
      whenToUse: 'Quando você quer remover itens de uma lista com base em uma condição, sem alterar a lista original.',
      syntax: code`
const filtrado = array.filter((item, index, array) => {
  return condicao // true mantém, false descarta
})
`,
      examples: [
        {
          caption: 'Manter apenas números pares',
          code: code`
const numeros = [1, 2, 3, 4, 5, 6]
const pares = numeros.filter((n) => n % 2 === 0)

console.log(pares)
`,
          output: '[2, 4, 6]',
        },
        {
          caption: 'Filtrar objetos por propriedade',
          code: code`
const tarefas = [
  { titulo: 'Estudar React', feita: true },
  { titulo: 'Revisar Git', feita: false },
]

const pendentes = tarefas.filter((t) => !t.feita)
console.log(pendentes.length)
`,
          output: '1',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Se nenhum item passar no teste, o resultado é um array vazio `[]`, nunca `undefined`.' },
        {
          kind: 'tip',
          text: 'Para encontrar só o primeiro item que satisfaz a condição, use `find()`: ele retorna o item, não um array.',
        },
        {
          kind: 'mistake',
          text: 'Retornar algo que não é booleano por engano. Valores como `0` e `""` são tratados como `false` e descartam o item.',
        },
      ],
      tags: ['array', 'filtragem', 'imutabilidade'],
      relatedIds: ['js-array-map', 'js-array-reduce'],
    },
    {
      id: 'js-array-reduce',
      slug: 'reduce',
      technologyId: 'javascript',
      categoryId: 'js-arrays',
      title: 'Array.reduce()',
      description: 'Percorre o array acumulando um único valor final: um número, um objeto, outro array…',
      whenToUse: 'Quando você precisa resumir uma lista: somar valores, contar ocorrências ou agrupar itens.',
      syntax: code`
const resultado = array.reduce((acumulador, item) => {
  return novoAcumulador
}, valorInicial)
`,
      examples: [
        {
          caption: 'Somar valores',
          code: code`
const precos = [10, 25, 15]
const total = precos.reduce((soma, preco) => soma + preco, 0)

console.log(total)
`,
          output: '50',
        },
        {
          caption: 'Contar ocorrências',
          code: code`
const frutas = ['maçã', 'banana', 'maçã']

const contagem = frutas.reduce((acc, fruta) => {
  acc[fruta] = (acc[fruta] ?? 0) + 1
  return acc
}, {})

console.log(contagem)
`,
          output: "{ 'maçã': 2, banana: 1 }",
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: 'Omitir o valor inicial. Em array vazio isso lança `TypeError`, e o primeiro item vira o acumulador.',
        },
        { kind: 'mistake', text: 'Esquecer de retornar o acumulador dentro da função.' },
        {
          kind: 'tip',
          text: 'Se o `reduce` ficou difícil de ler, um laço `for...of` ou uma combinação de `filter` + `map` costuma ser mais clara.',
        },
      ],
      tags: ['array', 'agregação', 'soma'],
      relatedIds: ['js-array-map', 'js-array-filter'],
    },
    {
      id: 'js-async-await',
      slug: 'async-await',
      technologyId: 'javascript',
      categoryId: 'js-async',
      title: 'async / await',
      description: 'Sintaxe para escrever código assíncrono (baseado em Promises) com cara de código sequencial.',
      whenToUse:
        'Sempre que for esperar algo que demora: requisições HTTP, leitura de arquivos, timers. Deixa o código mais legível que encadear `.then()`.',
      syntax: code`
async function nomeDaFuncao() {
  try {
    const resultado = await algumaPromise
  } catch (erro) {
    // trata o erro
  }
}
`,
      examples: [
        {
          caption: 'Esperar uma Promise',
          code: code`
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function executar() {
  console.log('Início')
  await esperar(1000)
  console.log('Depois de 1 segundo')
}

executar()
`,
          output: 'Início\nDepois de 1 segundo',
        },
        {
          caption: 'Executar em paralelo com Promise.all',
          code: code`
async function carregarTudo() {
  const [usuarios, posts] = await Promise.all([
    buscarUsuarios(),
    buscarPosts(),
  ])
  return { usuarios, posts }
}
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Uma função `async` sempre retorna uma Promise, mesmo que você retorne um valor comum.' },
        {
          kind: 'warning',
          text: '`await` em sequência executa uma coisa de cada vez. Para tarefas independentes, use `Promise.all` e ganhe tempo.',
        },
        {
          kind: 'mistake',
          text: 'Esquecer o `await`: você recebe a Promise pendente em vez do valor.',
        },
      ],
      tags: ['async', 'promise', 'assíncrono'],
      relatedIds: ['js-fetch'],
    },
    {
      id: 'js-fetch',
      slug: 'fetch',
      technologyId: 'javascript',
      categoryId: 'js-async',
      title: 'fetch()',
      description: 'API nativa para fazer requisições HTTP. Retorna uma Promise com a resposta.',
      whenToUse: 'Para buscar ou enviar dados a uma API a partir do navegador ou do Node.js 18+.',
      syntax: code`
const resposta = await fetch(url, {
  method: 'GET', // POST, PUT, DELETE...
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dados), // só em POST/PUT
})
const json = await resposta.json()
`,
      examples: [
        {
          caption: 'GET com tratamento de erro',
          code: code`
async function buscarUsuario(id) {
  const resposta = await fetch(\`https://api.exemplo.com/users/\${id}\`)

  if (!resposta.ok) {
    throw new Error(\`Erro HTTP \${resposta.status}\`)
  }

  return resposta.json()
}
`,
        },
        {
          caption: 'POST enviando JSON',
          code: code`
await fetch('https://api.exemplo.com/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ titulo: 'Nova nota' }),
})
`,
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: 'Achar que `fetch` rejeita em erros 404 ou 500. Ele só rejeita em falha de rede: sempre confira `resposta.ok`.',
        },
        { kind: 'tip', text: '`resposta.json()` também é assíncrono e precisa de `await`.' },
        { kind: 'warning', text: 'Ao enviar JSON, não esqueça o header `Content-Type` e o `JSON.stringify` no `body`.' },
      ],
      tags: ['http', 'api', 'requisição'],
      relatedIds: ['js-async-await'],
    },
    {
      id: 'js-template-literals',
      slug: 'template-literals',
      technologyId: 'javascript',
      categoryId: 'js-strings',
      title: 'Template literals',
      description: 'Strings delimitadas por crases que aceitam variáveis embutidas e múltiplas linhas.',
      whenToUse: 'Sempre que precisar montar textos com valores dinâmicos, em vez de concatenar com `+`.',
      syntax: code`
const texto = \`Texto fixo \${expressao} mais texto\`
`,
      examples: [
        {
          caption: 'Interpolação de variáveis e expressões',
          code: code`
const nome = 'Ana'
const itens = 3

console.log(\`Olá, \${nome}! Você tem \${itens * 2} pontos.\`)
`,
          output: 'Olá, Ana! Você tem 6 pontos.',
        },
        {
          caption: 'Texto em várias linhas',
          code: code`
const html = \`
  <ul>
    <li>Item 1</li>
  </ul>
\`
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Dentro de `${ }` cabe qualquer expressão: contas, chamadas de função, ternários.' },
        { kind: 'mistake', text: "Usar aspas simples ou duplas: `'${nome}'` é impresso literalmente, sem interpolar." },
      ],
      tags: ['string', 'interpolação'],
      relatedIds: [],
    },
  ],
}
