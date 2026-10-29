import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const fundamentos: CategoryContent = {
  category: {
    id: 'js-fundamentos',
    slug: 'fundamentos',
    technologyId: 'javascript',
    name: 'Fundamentos',
    description: 'Executar código, variáveis, tipos, operadores, coerção e strings.',
  },

  sheets: [
    {
      id: 'js-executar',
      slug: 'executar',
      technologyId: 'javascript',
      categoryId: 'js-fundamentos',
      title: 'Executar JavaScript',
      description: 'JavaScript roda no navegador (console do DevTools ou `<script>`) e no terminal, com Node.js.',
      whenToUse:
        'No começo de qualquer estudo ou projeto: para testar uma expressão rápida no console ou rodar um arquivo inteiro.',
      syntax: code`
console.log(valor)   // mostra um valor no console

// comentário de uma linha
/* comentário
   de bloco */
`,
      examples: [
        {
          caption: 'Terminal: conferir a versão e rodar um arquivo',
          language: 'bash',
          code: code`
node --version
node app.js
`,
        },
        {
          caption: 'Navegador: carregar o script no HTML',
          language: 'html',
          code: code`
<!-- defer: roda depois que o HTML foi lido -->
<script src="app.js" defer></script>

<!-- módulo: permite import/export e também é adiado -->
<script type="module" src="app.js"></script>
`,
        },
        {
          caption: 'Vários valores no mesmo log',
          code: code`
const nome = 'Maya'
const pontos = 82
console.log(nome, pontos)
`,
          output: 'Maya 82',
        },
      ],
      tips: [
        { kind: 'tip', text: 'No navegador, abra o DevTools com `F12` (ou `Ctrl+Shift+I`) e use a aba Console para testar expressões.' },
        {
          kind: 'tip',
          text: 'Sem `defer` ou `type="module"`, um script no `<head>` roda antes do HTML existir e não encontra os elementos da página.',
        },
        {
          kind: 'warning',
          text: '`document`, `window` e `localStorage` existem só no navegador. No Node.js, esses nomes dão `ReferenceError`.',
        },
      ],
      tags: ['console', 'node', 'script'],
      relatedIds: ['js-modulos', 'js-debugging'],
    },
    {
      id: 'js-variaveis-tipos',
      slug: 'variaveis-e-tipos',
      technologyId: 'javascript',
      categoryId: 'js-fundamentos',
      title: 'Variáveis e tipos',
      description:
        '`const` e `let` criam variáveis com escopo de bloco. Os valores são primitivos (string, number, boolean…) ou objetos.',
      whenToUse:
        'Sempre que guardar um valor. Use `const` por padrão e `let` só quando a variável precisar receber outro valor.',
      syntax: code`
const nome = 'Maya'      // string
let pontos = 82          // number
const ativo = true       // boolean
const vazio = null       // ausência intencional
let pendente             // undefined
const grande = 10n       // bigint
const id = Symbol('id')  // symbol
const pessoa = {}        // object (arrays e funções também são objetos)
`,
      examples: [
        {
          caption: 'Descobrindo o tipo com typeof',
          code: code`
console.log(typeof 82)
console.log(typeof 'oi')
console.log(typeof null)
console.log(typeof [])
console.log(typeof (() => {}))
`,
          output: 'number\nstring\nobject\nobject\nfunction',
        },
        {
          caption: 'const impede reatribuir, não alterar o objeto',
          code: code`
const pessoa = { nome: 'Maya' }
pessoa.nome = 'Leo' // permitido: altera o conteúdo

let pontos = 82
pontos += 1         // permitido: let aceita reatribuição

console.log(pessoa.nome, pontos)
`,
          output: 'Leo 83',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Os 7 primitivos são: string, number, bigint, boolean, undefined, symbol e null. Todo o resto é objeto.',
        },
        { kind: 'tip', text: 'Para saber se algo é array, use `Array.isArray(valor)`: o `typeof` de um array é `"object"`.' },
        {
          kind: 'warning',
          text: '`typeof null` retorna `"object"`. É um erro histórico da linguagem; para testar null, compare direto: `valor === null`.',
        },
        {
          kind: 'mistake',
          text: 'Usar `var` em código novo. Ele tem escopo de função, não de bloco, e causa bugs difíceis de achar.',
        },
      ],
      tags: ['variáveis', 'tipos', 'typeof', 'const', 'let'],
      relatedIds: ['js-operadores', 'js-escopo-hoisting'],
    },
    {
      id: 'js-operadores',
      slug: 'operadores',
      technologyId: 'javascript',
      categoryId: 'js-fundamentos',
      title: 'Operadores e truthiness',
      description:
        'Operadores aritméticos, de comparação e lógicos. Em condições, todo valor é tratado como "truthy" ou "falsy".',
      whenToUse:
        'Para fazer contas, comparar valores e escolher valores padrão com `||`, `??` e `&&`.',
      syntax: code`
+  -  *  /  %  **        // aritmética (% = resto, ** = potência)
===  !==                 // igualdade estrita (sem converter tipos)
<  >  <=  >=             // comparação
&&  ||  !                // E, OU, NÃO
??                       // valor padrão só para null/undefined
`,
      examples: [
        {
          caption: '|| x ??',
          code: code`
console.log(0 || 10)
console.log(0 ?? 10)
console.log(null ?? 'padrão')
console.log('' || 'vazio')
`,
          output: '10\n0\npadrão\nvazio',
        },
        {
          caption: '&& e || devolvem um dos operandos',
          code: code`
const logado = true
console.log(logado && 'Bem-vindo')
console.log(5 === '5', 5 == '5')
console.log(2 ** 3, 7 % 3)
`,
          output: 'Bem-vindo\nfalse true\n8 1',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Valores falsy: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` e `NaN`. Todo o resto é truthy, inclusive `[]` e `{}`.',
        },
        {
          kind: 'tip',
          text: '`&&` e `||` param no primeiro valor que decide o resultado (curto-circuito): `user && user.nome` não quebra se `user` for null.',
        },
        {
          kind: 'warning',
          text: 'Use `??` quando `0`, `false` ou `""` forem valores válidos: `||` troca todos eles pelo padrão.',
        },
        {
          kind: 'mistake',
          text: 'Misturar `??` com `&&` ou `||` sem parênteses: `a || b ?? c` é erro de sintaxe. Escreva `(a || b) ?? c`.',
        },
      ],
      tags: ['operadores', 'truthy', 'falsy', 'nullish'],
      relatedIds: ['js-coercao-numeros', 'js-condicionais', 'js-objetos-acesso'],
    },
    {
      id: 'js-coercao-numeros',
      slug: 'coercao-e-numeros',
      technologyId: 'javascript',
      categoryId: 'js-fundamentos',
      title: 'Coerção e números',
      description:
        'Coerção é a conversão automática de tipos. Para números, o JavaScript usa ponto flutuante e oferece `Number`, `parseInt` e `Math`.',
      whenToUse:
        'Ao converter texto de formulários ou APIs em número, arredondar valores e entender resultados "estranhos" como `"5" + 1`.',
      syntax: code`
Number('42')           // 42  (converte o texto inteiro)
parseInt('12px', 10)   // 12  (lê até onde der, base 10)
parseFloat('3.14kg')   // 3.14
String(42)             // '42'
Boolean('texto')       // true

Number.isNaN(valor)
Number.isFinite(valor)
(12.345).toFixed(2)    // string com 2 casas
Math.round / Math.floor / Math.ceil
`,
      examples: [
        {
          caption: '+ concatena com strings, - converte para número',
          code: code`
console.log('5' + 1)
console.log('5' - 1)
console.log(Number(''), Number('12px'))
console.log(Boolean('false'))
`,
          output: '51\n4\n0 NaN\ntrue',
        },
        {
          caption: 'Arredondar',
          code: code`
console.log(Math.round(2.6), Math.floor(2.9), Math.ceil(2.1))
console.log((9.5).toFixed(2))
console.log(Math.max(3, 9, 4))
`,
          output: '3 2 3\n9.50\n9',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: '`toFixed` devolve uma string. Use para exibir, não para continuar fazendo contas.',
        },
        {
          kind: 'warning',
          text: '`Number("")` e `Number(" ")` dão `0`. Valide se o campo está vazio antes de converter.',
        },
        {
          kind: 'warning',
          text: 'Inteiros só são exatos até `Number.MAX_SAFE_INTEGER` (2**53 - 1). Acima disso, use `BigInt`, sem misturar BigInt e Number na mesma conta.',
        },
        {
          kind: 'mistake',
          text: 'Usar `==`: ele converte tipos e gera surpresas (`0 == ""` é true). Prefira sempre `===` e `!==`.',
        },
        { kind: 'mistake', text: '`Math.random()` não é seguro para senhas ou tokens. Use `crypto.getRandomValues`.' },
      ],
      tags: ['número', 'conversão', 'math', 'coerção'],
      relatedIds: ['js-operadores', 'js-armadilhas'],
    },
    {
      id: 'js-strings',
      slug: 'strings',
      technologyId: 'javascript',
      categoryId: 'js-fundamentos',
      title: 'Strings',
      description:
        'Textos imutáveis com métodos para buscar, cortar, trocar e formatar. Template literals (crases) permitem interpolar valores.',
      whenToUse: 'Para montar mensagens, limpar entradas do usuário, buscar trechos e formatar textos.',
      syntax: code`
\`Olá, \${nome}!\`          // template literal
texto.length
texto.trim()               // remove espaços das pontas
texto.toLowerCase() / .toUpperCase()
texto.includes('x') / .startsWith('x') / .endsWith('x')
texto.slice(inicio, fim)   // fim não entra
texto.split(',')           // string -> array
lista.join('-')            // array -> string
texto.replaceAll('a', 'b')
texto.padStart(3, '0')
`,
      examples: [
        {
          caption: 'Métodos mais usados',
          code: code`
const nome = 'Maya'
console.log(\`Olá, \${nome}!\`)
console.log('  oi  '.trim())
console.log('javascript'.includes('script'))
console.log('abcdef'.slice(0, 2), 'abcdef'.slice(-2))
console.log('7'.padStart(3, '0'))
`,
          output: 'Olá, Maya!\noi\ntrue\nab ef\n007',
        },
        {
          caption: 'Separar e juntar',
          code: code`
const tags = 'web,api,css'.split(',')
console.log(tags)
console.log(tags.join(' | '))
console.log('a-a-a'.replaceAll('a', 'b'))
`,
          output: "['web', 'api', 'css']\nweb | api | css\nb-b-b",
        },
      ],
      tips: [
        { kind: 'tip', text: 'Strings são imutáveis: os métodos devolvem uma string nova e não alteram a original.' },
        { kind: 'tip', text: 'Dentro de `${ }` cabe qualquer expressão: contas, chamadas de função e ternários.' },
        {
          kind: 'warning',
          text: '`length` conta unidades UTF-16, não caracteres visuais: um emoji pode ter `length` 2 ou mais.',
        },
        {
          kind: 'mistake',
          text: 'Usar aspas comuns em vez de crases: `"Olá, ${nome}"` imprime o texto literalmente, sem interpolar.',
        },
      ],
      tags: ['string', 'texto', 'template literal'],
      relatedIds: ['js-regex', 'js-coercao-numeros'],
    },
  ],
}
