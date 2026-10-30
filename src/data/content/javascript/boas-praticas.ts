import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const boasPraticas: CategoryContent = {
  category: {
    id: 'js-boas-praticas',
    slug: 'boas-praticas',
    technologyId: 'javascript',
    name: 'Boas práticas',
    description: 'Armadilhas comuns, debugging e hábitos de código moderno.',
  },

  sheets: [
    {
      id: 'js-armadilhas',
      slug: 'armadilhas',
      technologyId: 'javascript',
      categoryId: 'js-boas-praticas',
      title: 'Armadilhas frequentes',
      description: 'Comportamentos da linguagem que surpreendem e causam bugs: ordenação, ponto flutuante, NaN, comparação de objetos e mais.',
      whenToUse: 'Para revisar código e entender resultados que parecem errados.',
      syntax: code`
[10, 2, 1].sort()              // [1, 10, 2] (ordena como texto)
0.1 + 0.2 === 0.3              // false
NaN === NaN                    // false -> use Number.isNaN
[] === []                      // false (referências diferentes)
['1', '2', '3'].map(parseInt)  // [1, NaN, NaN]
`,
      examples: [
        {
          caption: 'Ordenação, flutuante e NaN',
          code: code`
console.log([10, 2, 1].sort())
console.log([10, 2, 1].sort((a, b) => a - b))
console.log(0.1 + 0.2)
console.log(NaN === NaN, Number.isNaN(NaN))
`,
          output: '[1, 10, 2]\n[1, 2, 10]\n0.30000000000000004\nfalse true',
        },
        {
          caption: 'map(parseInt) e return quebrado',
          code: code`
console.log(['1', '2', '3'].map(parseInt))
console.log(['1', '2', '3'].map(Number))

function f() {
  return
  { ok: true }
}
console.log(f())
`,
          output: '[1, NaN, NaN]\n[1, 2, 3]\nundefined',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Para dinheiro, trabalhe com centavos inteiros (`1050` em vez de `10.5`) e formate só na exibição.',
        },
        { kind: 'warning', text: '`sort` e `reverse` alteram o array original.' },
        {
          kind: 'mistake',
          text: '`map(parseInt)` passa o índice como segundo argumento, que o `parseInt` usa como base numérica.',
        },
        { kind: 'mistake', text: 'Confundir `=` (atribuição) com `===` (comparação) dentro de um `if`.' },
        {
          kind: 'mistake',
          text: 'Quebrar a linha logo depois do `return`: o JavaScript insere `;` e a função devolve `undefined`.',
        },
      ],
      tags: ['armadilhas', 'bugs', 'sort', 'nan'],
      relatedIds: ['js-coercao-numeros', 'js-array-sem-mutacao', 'js-referencias-copias'],
    },
    {
      id: 'js-debugging',
      slug: 'debugging',
      technologyId: 'javascript',
      categoryId: 'js-boas-praticas',
      title: 'Debugging prático',
      description: 'Métodos do `console`, a instrução `debugger` e as abas do DevTools para encontrar a origem de um problema.',
      whenToUse: 'Quando algo não funciona como esperado e você precisa ver os valores reais durante a execução.',
      syntax: code`
console.log({ variavel })        // mostra nome e valor
console.table(lista)             // lista de objetos em tabela
console.error('falhou')          // destaque de erro (vermelho)
console.warn('cuidado')          // destaque de aviso (amarelo)
console.trace('aqui')            // mostra quais funções chamaram até aqui
console.assert(condicao, 'msg')  // loga só se for falso
console.time('x')                // inicia um cronômetro
console.timeEnd('x')             // mostra o tempo desde o time('x')
debugger                         // pausa (com DevTools aberto)
`,
      examples: [
        {
          caption: 'Log com nome e medição de tempo',
          code: code`
const itens = [{ id: 1, preco: 12 }, { id: 2, preco: 30 }]
const total = itens.reduce((s, i) => s + i.preco, 0)

console.log({ total })                          // { total: 42 }
console.assert(itens.length > 0, 'Lista vazia') // não mostra nada: a condição é verdadeira
console.time('processo')
// ... trabalho a medir ...
console.timeEnd('processo')                     // ex.: processo: 0.05 ms
`,
        },
        {
          caption: 'Foto do valor no momento do log',
          code: code`
const user = { nome: 'Maya' }
console.log(structuredClone(user)) // { nome: 'Maya' }, mesmo depois da mudança abaixo
user.nome = 'Leo'
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Aba Sources: breakpoints, execução passo a passo e inspeção de variáveis. Ative a pausa em exceções para parar no erro.',
        },
        {
          kind: 'tip',
          text: 'Aba Network: confira URL, método, status, cabeçalhos, corpo e tempo de cada requisição.',
        },
        {
          kind: 'tip',
          text: 'Reduza o problema a um exemplo mínimo e confira os tipos com `typeof` e `Array.isArray`.',
        },
        {
          kind: 'warning',
          text: 'O console mostra objetos "ao vivo": ao expandir, você pode ver valores alterados depois do log.',
        },
        { kind: 'mistake', text: 'Publicar o código com `console.log` de dados sensíveis ou com `debugger` esquecido.' },
      ],
      tags: ['debug', 'console', 'devtools'],
      relatedIds: ['js-executar', 'js-erros'],
    },
    {
      id: 'js-praticas-modernas',
      slug: 'praticas-modernas',
      technologyId: 'javascript',
      categoryId: 'js-boas-praticas',
      title: 'Práticas modernas úteis',
      description:
        'Hábitos que deixam o código claro e confiável: nomes descritivos, funções pequenas, criar cópias em vez de alterar dados (imutabilidade) e limpar o que não serve mais.',
      whenToUse: 'Em todo código novo e em revisões.',
      syntax: code`
// Clareza
// - const por padrão, let só quando precisar reatribuir
// - nomes descritivos: precoTotal, não pt
// - funções pequenas, com uma tarefa cada
// - retorno antecipado em vez de if aninhado
// - === sempre, nunca ==

// Confiabilidade
// - validar entradas do usuário e respostas da API
// - tratar erros onde dá para avisar o usuário
// - remover listeners e timers que não servem mais
`,
      examples: [
        {
          caption: 'Atualizar um item sem alterar a lista original',
          code: code`
const itens = [
  { id: 1, ok: false },
  { id: 2, ok: false },
]

const novos = itens.map((item) => (item.id === 1 ? { ...item, ok: true } : item))
console.log(novos[0].ok, itens[0].ok)
`,
          output: 'true false',
        },
        {
          caption: 'Limpar listeners com AbortController',
          code: code`
const controller = new AbortController()

window.addEventListener('resize', () => console.log(window.innerWidth), {
  signal: controller.signal,
})
window.addEventListener('keydown', (e) => console.log(e.key), {
  signal: controller.signal,
})

// ao sair da tela: remove os dois de uma vez
controller.abort()
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Use um linter (como oxlint ou ESLint) e testes para os comportamentos importantes.' },
        { kind: 'tip', text: 'Comentários devem explicar o porquê e os limites, não repetir o que o código já diz.' },
        {
          kind: 'warning',
          text: 'Nunca coloque chaves privadas de API no front-end: qualquer pessoa pode ler o código no navegador.',
        },
        { kind: 'mistake', text: 'Usar `eval` ou colocar HTML vindo de fora em `innerHTML`.' },
        {
          kind: 'mistake',
          text: 'Esquecer que `input.value` é sempre string: converta com `Number(...)` antes de fazer contas.',
        },
      ],
      tags: ['boas práticas', 'imutabilidade', 'clean code'],
      relatedIds: ['js-referencias-copias', 'js-eventos', 'js-armadilhas'],
    },
  ],
}
