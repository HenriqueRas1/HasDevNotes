import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const funcoes: CategoryContent = {
  category: {
    id: 'js-funcoes',
    slug: 'funcoes',
    technologyId: 'javascript',
    name: 'Funções',
    description: 'Declarações, arrow functions, callbacks, escopo, closures e this.',
  },

  sheets: [
    {
      id: 'js-funcoes-callbacks',
      slug: 'funcoes-e-callbacks',
      technologyId: 'javascript',
      categoryId: 'js-funcoes',
      title: 'Funções e callbacks',
      description:
        'Funções são valores: podem ser guardadas em variáveis, passadas para outras funções e retornadas. Uma função passada para outra é chamada de callback.',
      whenToUse: 'Para reutilizar lógica, dar nome a uma operação e personalizar o comportamento de outra função.',
      syntax: code`
function nome(param = 'padrão') {   // declaração
  return resultado
}

const somar = function (a, b) {     // expressão
  return a + b
}

const dobro = (n) => n * 2          // arrow: retorno implícito
const criar = (nome) => ({ nome })  // objeto: envolva em ()
const total = (...nums) => {}       // rest: junta os argumentos num array
`,
      examples: [
        {
          caption: 'Parâmetro padrão e arrow function',
          code: code`
function saudar(nome = 'pessoa') {
  return \`Olá, \${nome}!\`
}

const criar = (nome) => ({ nome, ativo: true })

console.log(saudar())
console.log(criar('Maya'))
`,
          output: "Olá, pessoa!\n{ nome: 'Maya', ativo: true }",
        },
        {
          caption: 'Callback: uma função entregue a outra',
          code: code`
const aplicar = (valor, fn) => fn(valor)
const dobro = (n) => n * 2

console.log(aplicar(3, dobro))
console.log(aplicar('oi', (t) => t.toUpperCase()))
`,
          output: '6\nOI',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Sem `return`, a função devolve `undefined`.' },
        { kind: 'tip', text: 'O parâmetro padrão só entra quando o argumento é `undefined`.' },
        { kind: 'tip', text: 'Com `...nums` (rest), a função aceita quantos argumentos vierem, e eles chegam como um array.' },
        {
          kind: 'warning',
          text: 'Arrow functions não têm `this` próprio (veja "this, call, apply e bind"). Para métodos de objetos, prefira a forma comum.',
        },
        {
          kind: 'mistake',
          text: 'Arrow com chaves sem `return`: `(n) => { n * 2 }` devolve `undefined`. E `() => { id: 1 }` não devolve objeto; use `() => ({ id: 1 })`.',
        },
      ],
      tags: ['função', 'arrow function', 'callback', 'parâmetros'],
      relatedIds: ['js-escopo-hoisting', 'js-closures', 'js-this', 'js-array-transformar'],
    },
    {
      id: 'js-escopo-hoisting',
      slug: 'escopo-e-hoisting',
      technologyId: 'javascript',
      categoryId: 'js-funcoes',
      title: 'Escopo e hoisting',
      description:
        'Escopo define onde uma variável existe. Hoisting é o comportamento que permite usar declarações de função antes da linha em que aparecem.',
      whenToUse:
        'Para entender por que uma variável "não existe" num trecho, por que uma chamada funciona antes da definição e como evitar conflitos de nomes.',
      syntax: code`
// let/const: escopo de bloco { }
// var: escopo de função (evite)

somar(1, 2)              // ✅ declaração de função: disponível antes
function somar(a, b) { return a + b }

console.log(v)           // undefined (var é inicializado com undefined)
var v = 3

console.log(y)           // ❌ ReferenceError: let não pode ser usado antes
let y = 4
`,
      examples: [
        {
          caption: 'Mesmo nome, variáveis diferentes',
          code: code`
let x = 1
{
  let x = 2 // nova variável, só existe dentro deste bloco
  console.log(x)
}
console.log(x)
`,
          output: '2\n1',
        },
        {
          caption: 'Funções internas enxergam as externas',
          code: code`
const taxa = 0.1

function calcular(valor) {
  const desconto = valor * taxa
  function final() {
    return valor - desconto
  }
  return final()
}

console.log(calcular(200))
`,
          output: '180',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'O que uma função enxerga depende de onde ela foi escrita no código, não de onde ela é chamada.',
        },
        {
          kind: 'tip',
          text: 'Hoisting não move o código de lugar. `let`, `const` e `class` não podem ser usados antes da linha em que são declarados.',
        },
        {
          kind: 'warning',
          text: 'Expressões de função e arrow functions guardadas em `const` não podem ser chamadas antes da definição.',
        },
        {
          kind: 'mistake',
          text: 'Criar uma variável interna com o mesmo nome de uma externa e alterar a errada sem perceber. Isso se chama shadowing ("sombra").',
        },
      ],
      tags: ['escopo', 'hoisting', 'tdz', 'var'],
      relatedIds: ['js-closures', 'js-variaveis-tipos', 'js-funcoes-callbacks'],
    },
    {
      id: 'js-closures',
      slug: 'closures',
      technologyId: 'javascript',
      categoryId: 'js-funcoes',
      title: 'Closures',
      description:
        'Uma função continua acessando as variáveis do lugar onde nasceu, mesmo depois que a função externa terminou.',
      whenToUse: 'Para criar estado privado, fábricas de funções configuradas e callbacks que precisam de dados do contexto.',
      syntax: code`
function externa() {
  let estado = 0
  return () => {
    estado++          // continua acessível
    return estado
  }
}

const fn = externa()
fn() // 1
fn() // 2
`,
      examples: [
        {
          caption: 'Contadores independentes',
          code: code`
function criarContador(inicio = 0) {
  let n = inicio
  return () => ++n
}

const proximo = criarContador()
const outro = criarContador(10)

console.log(proximo(), proximo(), outro())
`,
          output: '1 2 11',
        },
        {
          caption: 'let no for cria uma variável por volta',
          code: code`
const funcoes = []
for (let i = 0; i < 3; i++) {
  funcoes.push(() => i)
}

console.log(funcoes[0](), funcoes[1](), funcoes[2]())
`,
          output: '0 1 2',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'A closure guarda acesso às variáveis, não uma foto dos valores: se a variável mudar, a função vê o valor novo.',
        },
        { kind: 'tip', text: 'Hooks do React dependem de closures: cada renderização captura os valores daquele momento.' },
        {
          kind: 'mistake',
          text: 'Usar `var` no `for`: todas as funções compartilham a mesma variável e o exemplo acima mostraria `3 3 3`.',
        },
      ],
      tags: ['closure', 'escopo', 'estado privado'],
      relatedIds: ['js-escopo-hoisting', 'js-funcoes-callbacks'],
    },
    {
      id: 'js-this',
      slug: 'this',
      technologyId: 'javascript',
      categoryId: 'js-funcoes',
      title: 'this, call, apply e bind',
      description:
        'Em funções comuns, o `this` depende de como a função é chamada. `call`, `apply` e `bind` definem o `this` manualmente.',
      whenToUse:
        'Em métodos de objetos e classes, e ao passar um método como callback (eventos, timers) sem perder o objeto.',
      syntax: code`
obj.metodo()                  // this = obj
const solta = obj.metodo
solta()                       // this = undefined (perdeu o objeto)

fn.call(ctx, a, b)            // chama com this = ctx
fn.apply(ctx, [a, b])         // igual, argumentos em array
const fixa = fn.bind(ctx)     // nova função com this fixo
`,
      examples: [
        {
          caption: 'O this vem da chamada',
          code: code`
const user = {
  nome: 'Maya',
  ler() {
    return this.nome
  },
}

const fixa = user.ler.bind(user)

console.log(user.ler())
console.log(fixa())
console.log(user.ler.call({ nome: 'Leo' }))
`,
          output: 'Maya\nMaya\nLeo',
        },
        {
          caption: 'Arrow function herda o this de fora',
          code: code`
const timer = {
  segundos: 0,
  avancar() {
    ;[1, 2, 3].forEach(() => {
      this.segundos++ // this = timer
    })
    return this.segundos
  },
}

console.log(timer.avancar())
`,
          output: '3',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Com `new Classe()`, o `this` é o novo objeto que está sendo criado.' },
        {
          kind: 'warning',
          text: 'Não use arrow function como método que precisa do objeto: `{ ler: () => this.nome }` não enxerga o objeto.',
        },
        {
          kind: 'mistake',
          text: 'Passar `obj.metodo` como callback (ex.: `setTimeout(obj.metodo)`): o `this` se perde. Use `obj.metodo.bind(obj)` ou `() => obj.metodo()`.',
        },
      ],
      tags: ['this', 'bind', 'call', 'apply'],
      relatedIds: ['js-funcoes-callbacks', 'js-classes-encapsulamento'],
    },
  ],
}
