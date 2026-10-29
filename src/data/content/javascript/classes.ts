import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const classes: CategoryContent = {
  category: {
    id: 'js-classes',
    slug: 'classes-e-prototipos',
    technologyId: 'javascript',
    name: 'Classes e protótipos',
    description: 'Classes, campos privados, herança e a cadeia de protótipos.',
  },

  sheets: [
    {
      id: 'js-classes-encapsulamento',
      slug: 'classes',
      technologyId: 'javascript',
      categoryId: 'js-classes',
      title: 'Classes e encapsulamento',
      description:
        'Classes criam objetos com o mesmo formato. Têm `constructor`, métodos, getters, membros `static` e campos privados com `#`.',
      whenToUse: 'Para modelar entidades com estado e regras próprias, como uma conta, um carrinho ou um jogador.',
      syntax: code`
class Nome {
  #privado = 0                 // campo privado
  static versao = 1            // pertence à classe

  constructor(param) {
    this.publico = param
  }

  metodo() { }
  get valor() { return this.#privado }   // lido como propriedade
}

class Filha extends Nome {
  constructor(param) {
    super(param)               // antes de usar this
  }
}
`,
      examples: [
        {
          caption: 'Campo privado e validação',
          code: code`
class Conta {
  #saldo = 0
  static moeda = 'BRL'

  constructor(titular) {
    this.titular = titular
  }

  depositar(valor) {
    if (!Number.isFinite(valor) || valor <= 0) throw new RangeError('Valor inválido')
    this.#saldo += valor
  }

  get saldo() {
    return this.#saldo
  }
}

const conta = new Conta('Maya')
conta.depositar(10)
console.log(conta.saldo, Conta.moeda, conta.titular)
`,
          output: '10 BRL Maya',
        },
        {
          caption: 'Herança com super',
          code: code`
class Animal {
  constructor(nome) {
    this.nome = nome
  }
  falar() {
    return this.nome + ' faz um som'
  }
}

class Cachorro extends Animal {
  falar() {
    return super.falar() + ': au!'
  }
}

console.log(new Cachorro('Rex').falar())
`,
          output: 'Rex faz um som: au!',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Campos `#privados` só podem ser lidos dentro da própria classe: `conta.#saldo` fora dela é erro de sintaxe.' },
        { kind: 'tip', text: 'Getters são acessados sem parênteses: `conta.saldo`, não `conta.saldo()`.' },
        { kind: 'warning', text: 'O código dentro de classes roda sempre em modo estrito.' },
        {
          kind: 'mistake',
          text: 'Usar `this` no constructor da classe filha antes de chamar `super(...)`: lança `ReferenceError`.',
        },
      ],
      tags: ['classe', 'herança', 'privado', 'poo'],
      relatedIds: ['js-prototipos', 'js-this'],
    },
    {
      id: 'js-prototipos',
      slug: 'prototipos',
      technologyId: 'javascript',
      categoryId: 'js-classes',
      title: 'Protótipos e identidade',
      description:
        'Todo objeto tem um protótipo. Quando uma propriedade não existe no objeto, o JavaScript procura na cadeia de protótipos.',
      whenToUse:
        'Para entender de onde vêm métodos como `map` e `toString`, como as classes funcionam por baixo e como testar tipos.',
      syntax: code`
Object.create(proto)            // novo objeto com esse protótipo
Object.getPrototypeOf(obj)      // lê o protótipo
obj instanceof Classe           // Classe.prototype está na cadeia?
Object.hasOwn(obj, 'chave')     // própria, sem olhar a cadeia
'chave' in obj                  // própria ou herdada
`,
      examples: [
        {
          caption: 'Herança por protótipo',
          code: code`
const base = {
  saudar() {
    return 'Oi, ' + this.nome
  },
}

const user = Object.create(base)
user.nome = 'Maya'

console.log(user.saudar())
console.log(Object.getPrototypeOf(user) === base)
console.log(Object.hasOwn(user, 'saudar'), 'saudar' in user)
`,
          output: 'Oi, Maya\ntrue\nfalse true',
        },
        {
          caption: 'Classes usam o mesmo mecanismo',
          code: code`
class Pessoa {
  andar() {}
}
const p = new Pessoa()

console.log(Object.getPrototypeOf(p) === Pessoa.prototype)
console.log(p instanceof Pessoa, Array.isArray([]))
`,
          output: 'true\ntrue true',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Métodos de classe ficam no `prototype` e são compartilhados por todas as instâncias.' },
        { kind: 'tip', text: 'Para testar arrays, use `Array.isArray`: o `instanceof` pode falhar com arrays de outra janela ou iframe.' },
        { kind: 'warning', text: 'Prefira `Object.getPrototypeOf` a `__proto__`, que é uma forma antiga.' },
        { kind: 'mistake', text: 'Alterar protótipos nativos como `Array.prototype`: afeta todo o código da página, inclusive bibliotecas.' },
      ],
      tags: ['protótipo', 'herança', 'instanceof'],
      relatedIds: ['js-classes-encapsulamento', 'js-objetos-acesso'],
    },
  ],
}
