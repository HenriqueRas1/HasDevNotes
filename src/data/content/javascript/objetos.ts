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
Object.hasOwn(obj, 'nome')  // true se a chave existe no objeto
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
          text: 'Use `?.` só onde o dado realmente pode faltar. Espalhado por todo lado, ele esconde bugs que deveriam aparecer.',
        },
        {
          kind: 'mistake',
          text: 'Acessar uma propriedade de algo que é `undefined`: `user.endereco.cidade` lança `TypeError` se não houver endereço. Use `user.endereco?.cidade`.',
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
Object.freeze(obj)        // impede mudanças (só no primeiro nível)
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
          text: '`keys`, `values` e `entries` devolvem arrays: depois é só usar `map`, `filter` ou `for...of`.',
        },
        { kind: 'warning', text: '`Object.assign(destino, origem)` altera o destino. Para uma cópia, use `Object.assign({}, origem)` ou `{ ...origem }`.' },
        { kind: 'warning', text: '`freeze` só congela o primeiro nível: objetos guardados dentro do objeto congelado ainda podem mudar.' },
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
          text: 'Spread copia só o primeiro nível (cópia rasa): objetos internos continuam compartilhados com o original. Veja Referências e cópias.',
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
        'Uma variável com objeto guarda uma referência (o endereço do objeto), não uma cópia. Spread copia só o primeiro nível (cópia rasa); `structuredClone` copia todos os níveis (cópia profunda).',
      whenToUse:
        'Sempre que for alterar um objeto ou array que outra parte do código também usa, como o estado no React.',
      syntax: code`
const b = a                      // mesma referência (não copia)
const rasa = { ...a }            // novo objeto, filhos compartilhados
const lista2 = [...lista]        // cópia rasa de array
const profunda = structuredClone(a)  // cópia completa

// atualizar um nível interno sem alterar o original
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
          text: '`structuredClone` também copia Map, Set e Date.',
        },
        {
          kind: 'warning',
          text: '`structuredClone` não copia funções: um objeto com métodos dá erro.',
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
mapa.set(k, v)      // adiciona ou troca
mapa.get(k)         // valor ou undefined
mapa.has(k)         // true/false
mapa.delete(k)      // remove
mapa.size           // quantidade de pares
mapa.clear()        // esvazia

const conjunto = new Set([1, 2, 2])  // guarda só 1 e 2
conjunto.add(v)
conjunto.has(v)
conjunto.delete(v)
conjunto.size
const lista = [...conjunto]  // Set -> array
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
        { kind: 'tip', text: '`[...new Set(lista)]` remove duplicados de uma lista de textos ou números.' },
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
