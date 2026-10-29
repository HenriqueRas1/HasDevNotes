import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const objetos: CategoryContent = {
  category: {
    id: 'js-objetos',
    slug: 'objetos',
    technologyId: 'javascript',
    name: 'Objetos e coleções',
    description: 'Objetos, destructuring, spread, cópias, Map e Set.',
  },

  sheets: [
    {
      id: 'js-objetos-acesso',
      slug: 'acesso-seguro',
      technologyId: 'javascript',
      categoryId: 'js-objetos',
      title: 'Objetos e acesso seguro',
      description:
        'Ler e alterar propriedades com ponto ou colchetes, e acessar dados que podem não existir com `?.` e `??`.',
      whenToUse:
        'Ao trabalhar com dados de APIs e formulários, em que algumas propriedades podem estar ausentes.',
      syntax: code`
obj.nome                 // acesso com ponto
obj['nome']              // acesso com colchetes
obj[variavel]            // chave dinâmica
obj.endereco?.cidade     // undefined se endereco for null/undefined
obj.saudar?.()           // chama só se existir
obj.papel ?? 'padrão'    // padrão para null/undefined
delete obj.idade         // remove a propriedade
Object.hasOwn(obj, 'nome')
`,
      examples: [
        {
          caption: 'Ler, alterar e usar chave dinâmica',
          code: code`
const user = { nome: 'Maya', idade: 28 }
user['idade'] = 29

const chave = 'nome'
console.log(user[chave], user.idade)
console.log(Object.keys(user))
`,
          output: "Maya 29\n['nome', 'idade']",
        },
        {
          caption: 'Encadeamento opcional',
          code: code`
const user = { nome: 'Maya' }
console.log(user.endereco?.cidade)
console.log(user.papel ?? 'visitante')
console.log(user.saudar?.())
console.log(Object.hasOwn(user, 'nome'))
`,
          output: 'undefined\nvisitante\nundefined\ntrue',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Use colchetes quando a chave vem de uma variável ou tem espaços e hífens: `obj["data-id"]`.' },
        { kind: 'tip', text: '`??` preserva `0`, `false` e `""`. Só troca `null` e `undefined`.' },
        {
          kind: 'warning',
          text: '`?.` não protege uma variável que nunca foi declarada, e `obj.fn?.()` ainda lança `TypeError` se `fn` existir mas não for função.',
        },
        {
          kind: 'warning',
          text: '`"chave" in obj` também olha a cadeia de protótipos. Para testar só as propriedades do próprio objeto, use `Object.hasOwn`.',
        },
      ],
      tags: ['objeto', 'optional chaining', 'nullish'],
      relatedIds: ['js-object-metodos', 'js-destructuring-spread', 'js-operadores'],
    },
    {
      id: 'js-object-metodos',
      slug: 'metodos-de-object',
      technologyId: 'javascript',
      categoryId: 'js-objetos',
      title: 'Métodos de Object',
      description:
        '`Object.keys`, `values`, `entries` e `fromEntries` convertem objetos em listas e de volta. `assign` e `freeze` copiam e congelam.',
      whenToUse:
        'Para percorrer as propriedades de um objeto, transformar um objeto com `map`/`filter` ou proteger configurações contra alterações.',
      syntax: code`
Object.keys(obj)          // ['chave1', ...]
Object.values(obj)        // [valor1, ...]
Object.entries(obj)       // [['chave1', valor1], ...]
Object.fromEntries(pares) // pares -> objeto
Object.assign(destino, ...origens)
Object.freeze(obj)        // impede qualquer mudança (raso)
Object.seal(obj)          // impede adicionar/remover chaves
`,
      examples: [
        {
          caption: 'Objeto -> lista',
          code: code`
const user = { nome: 'Maya', idade: 28 }
console.log(Object.keys(user))
console.log(Object.values(user))
console.log(Object.entries(user))
`,
          output: "['nome', 'idade']\n['Maya', 28]\n[['nome', 'Maya'], ['idade', 28]]",
        },
        {
          caption: 'Transformar valores de um objeto',
          code: code`
const precos = { cafe: 5, bolo: 12 }
const comAumento = Object.fromEntries(
  Object.entries(precos).map(([item, preco]) => [item, preco * 2]),
)
console.log(comAumento)
`,
          output: '{ cafe: 10, bolo: 24 }',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: '`keys`, `values` e `entries` só trazem propriedades próprias e enumeráveis, com chave string.',
        },
        { kind: 'warning', text: '`Object.assign(destino, origem)` altera o destino. Para uma cópia, use `Object.assign({}, origem)` ou `{ ...origem }`.' },
        { kind: 'warning', text: '`freeze` é raso: objetos dentro do objeto congelado ainda podem mudar.' },
        { kind: 'mistake', text: 'Adicionar métodos em protótipos nativos (`Array.prototype.meuMetodo`). Isso pode quebrar bibliotecas e versões futuras da linguagem.' },
      ],
      tags: ['objeto', 'entries', 'freeze'],
      relatedIds: ['js-objetos-acesso', 'js-loops', 'js-referencias-copias'],
    },
    {
      id: 'js-destructuring-spread',
      slug: 'destructuring-e-spread',
      technologyId: 'javascript',
      categoryId: 'js-objetos',
      title: 'Destructuring, spread e rest',
      description:
        'Destructuring extrai valores de objetos e arrays para variáveis. Spread (`...`) espalha itens; rest (`...`) junta o que sobrou.',
      whenToUse:
        'Para ler várias propriedades de uma vez, receber props no React, copiar e combinar objetos e arrays sem alterar o original.',
      syntax: code`
const { nome, idade } = obj             // extrair
const { nome: apelido } = obj           // renomear
const { papel = 'leitor' } = obj        // valor padrão
const [primeiro, ...resto] = lista      // rest em array

const copia = { ...obj, idade: 29 }     // spread em objeto
const todos = [...lista1, ...lista2]    // spread em array
fn(...lista)                            // spread em argumentos
`,
      examples: [
        {
          caption: 'Extrair valores',
          code: code`
const user = { nome: 'Maya', idade: 28 }
const { nome: apelido, papel = 'leitor' } = user
const [primeiro, ...resto] = [10, 20, 30]

console.log(apelido, papel)
console.log(primeiro, resto)
`,
          output: 'Maya leitor\n10 [20, 30]',
        },
        {
          caption: 'Copiar e combinar',
          code: code`
const user = { nome: 'Maya', idade: 28 }
const atualizado = { ...user, idade: 29 }

function soma(...nums) {
  return nums.reduce((s, n) => s + n, 0)
}

console.log(atualizado, user.idade)
console.log(soma(...[2, 3, 5]))
`,
          output: "{ nome: 'Maya', idade: 29 } 28\n10",
        },
      ],
      tips: [
        { kind: 'tip', text: 'Em objetos, a última chave repetida vence: `{ ...user, idade: 29 }` substitui a idade.' },
        { kind: 'tip', text: 'Para um objeto que pode faltar: `const { nome } = user ?? {}`.' },
        { kind: 'warning', text: 'O valor padrão só substitui `undefined`, não `null`.' },
        {
          kind: 'warning',
          text: 'Spread faz cópia rasa: objetos internos continuam compartilhados com o original.',
        },
        { kind: 'mistake', text: 'Colocar o rest antes de outro item: `const [...resto, ultimo] = lista` é erro de sintaxe.' },
      ],
      tags: ['destructuring', 'spread', 'rest'],
      relatedIds: ['js-referencias-copias', 'js-funcoes-callbacks'],
    },
    {
      id: 'js-referencias-copias',
      slug: 'referencias-e-copias',
      technologyId: 'javascript',
      categoryId: 'js-objetos',
      title: 'Referências e cópias',
      description:
        'Variáveis com objetos guardam uma referência: atribuir não copia. Spread faz cópia rasa; `structuredClone` faz cópia profunda.',
      whenToUse:
        'Sempre que for alterar um objeto ou array que outra parte do código também usa, como o estado no React.',
      syntax: code`
const b = a                      // mesma referência (não copia)
const rasa = { ...a }            // novo objeto, filhos compartilhados
const lista2 = [...lista]        // cópia rasa de array
const profunda = structuredClone(a)  // cópia completa

// atualizar um nível interno sem mutar
const novo = { ...a, perfil: { ...a.perfil, nome: 'Bia' } }
`,
      examples: [
        {
          caption: 'Cópia rasa compartilha os objetos internos',
          code: code`
const a = { perfil: { nome: 'Maya' } }
const rasa = { ...a }
rasa.perfil.nome = 'Leo'

console.log(a.perfil.nome)
`,
          output: 'Leo',
        },
        {
          caption: 'Cópia profunda é independente',
          code: code`
const a = { perfil: { nome: 'Maya' }, tags: ['js'] }
const profunda = structuredClone(a)
profunda.perfil.nome = 'Ana'
profunda.tags.push('css')

console.log(a.perfil.nome, a.tags)
console.log({} === {}, a === a)
`,
          output: "Maya ['js']\nfalse true",
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Funções recebem a referência do objeto: alterar o parâmetro altera o objeto de quem chamou.',
        },
        {
          kind: 'tip',
          text: '`structuredClone` copia Map, Set, Date e até referências circulares.',
        },
        {
          kind: 'warning',
          text: '`structuredClone` não copia funções nem elementos do DOM, e o resultado perde o protótipo de classes.',
        },
        {
          kind: 'mistake',
          text: 'Usar `JSON.parse(JSON.stringify(obj))` como cópia genérica: ele perde `undefined`, funções e datas (que viram string).',
        },
      ],
      tags: ['referência', 'cópia', 'imutabilidade', 'structuredClone'],
      relatedIds: ['js-destructuring-spread', 'js-array-sem-mutacao', 'js-praticas-modernas'],
    },
    {
      id: 'js-map-set',
      slug: 'map-e-set',
      technologyId: 'javascript',
      categoryId: 'js-objetos',
      title: 'Map e Set',
      description:
        '`Map` guarda pares chave/valor com chaves de qualquer tipo. `Set` guarda valores únicos.',
      whenToUse:
        'Map: dicionários que mudam muito ou com chaves que não são strings. Set: remover duplicados e testar se um valor existe.',
      syntax: code`
const mapa = new Map([['chave', valor]])
mapa.set(k, v) / mapa.get(k) / mapa.has(k) / mapa.delete(k)
mapa.size / mapa.clear()

const conjunto = new Set([1, 2, 2])
conjunto.add(v) / conjunto.has(v) / conjunto.delete(v)
conjunto.size
[...conjunto]  // Set -> array
`,
      examples: [
        {
          caption: 'Map',
          code: code`
const notas = new Map([['Maya', 82]])
notas.set('Leo', 90)

console.log(notas.get('Maya'), notas.has('Leo'), notas.size)
for (const [nome, nota] of notas) {
  console.log(nome, nota)
}
`,
          output: '82 true 2\nMaya 82\nLeo 90',
        },
        {
          caption: 'Set: valores únicos',
          code: code`
const tags = new Set(['web', 'web', 'api'])
tags.add('css')

console.log(tags.size, tags.has('web'))
console.log([...new Set([1, 1, 2, 3, 3])])
`,
          output: '3 true\n[1, 2, 3]',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Map e Set mantêm a ordem de inserção ao percorrer com `for...of`.' },
        { kind: 'tip', text: '`[...new Set(lista)]` remove duplicados de uma lista de primitivos.' },
        {
          kind: 'warning',
          text: 'Objetos são comparados por referência: `new Set([{}, {}]).size` é 2.',
        },
        {
          kind: 'warning',
          text: '`get` devolve `undefined` para chave ausente e também para chave com valor `undefined`. Use `has` para distinguir.',
        },
      ],
      tags: ['map', 'set', 'coleção', 'duplicados'],
      relatedIds: ['js-objetos-acesso', 'js-loops'],
    },
  ],
}
