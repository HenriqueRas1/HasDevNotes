import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const utilitarios: CategoryContent = {
  category: {
    id: 'js-utilitarios',
    slug: 'regex-e-datas',
    technologyId: 'javascript',
    name: 'Regex e datas',
    description: 'Expressões regulares, datas, fusos e formatação com Intl.',
  },

  sheets: [
    {
      id: 'js-regex',
      slug: 'regex',
      technologyId: 'javascript',
      categoryId: 'js-utilitarios',
      title: 'Regex: buscar e substituir',
      description: 'Expressões regulares descrevem padrões de texto para testar, extrair e substituir trechos.',
      whenToUse: 'Para validar formatos simples (CEP, data), extrair números de um texto ou substituir padrões.',
      syntax: code`
/padrao/flags
re.test(texto)            // true/false
texto.match(re)           // primeira ocorrência (ou todas, com g)
texto.matchAll(re)        // iterador com todas (exige g)
texto.replace(re, 'novo')
re.exec(texto)            // detalhes + grupos

\\d dígito   \\w letra/dígito/_   \\s espaço   . qualquer caractere
[a-z] faixa   [^0-9] negação   ^ início   $ fim
* 0+   + 1+   ? 0 ou 1   {n,m} entre n e m
(grupo)   (?:sem captura)   (?<nome>nomeado)   a|b
flags: g global, i ignora maiúsculas, m multilinha, u unicode, s dotAll
`,
      examples: [
        {
          caption: 'Testar, extrair e substituir',
          code: code`
console.log(/^\\d{5}-\\d{3}$/.test('01310-100'))
console.log('item 42'.match(/\\d+/)?.[0])
console.log('a1 b2'.replace(/\\d/g, '#'))
console.log([...'a1 b2 c3'.matchAll(/\\d/g)].map((m) => m[0]))
`,
          output: "true\n42\na# b#\n['1', '2', '3']",
        },
        {
          caption: 'Grupos nomeados',
          code: code`
const reData = /(?<ano>\\d{4})-(?<mes>\\d{2})-(?<dia>\\d{2})/
const m = reData.exec('Entrega em 2026-10-29')
console.log(m?.groups.dia + '/' + m?.groups.mes + '/' + m?.groups.ano)
console.log('Maya Silva'.replace(/(\\w+) (\\w+)/, '$2, $1'))
`,
          output: '29/10/2026\nSilva, Maya',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Em `new RegExp("\\\\d+")` a barra precisa ser dobrada, porque o padrão está dentro de uma string.' },
        {
          kind: 'warning',
          text: '`\\w` só cobre letras ASCII: não reconhece "é" nem "ç". Para acentos, use `\\p{L}` com a flag `u`.',
        },
        {
          kind: 'warning',
          text: '`test` e `exec` com a flag `g` guardam a posição em `lastIndex`: reutilizar a mesma regex dá resultados alternados.',
        },
        {
          kind: 'mistake',
          text: 'Confiar só em regex para validar regras de negócio (ex.: e-mail existente). Ela confere o formato, não o significado.',
        },
      ],
      tags: ['regex', 'texto', 'validação'],
      relatedIds: ['js-strings'],
    },
    {
      id: 'js-datas-intl',
      slug: 'datas-e-intl',
      technologyId: 'javascript',
      categoryId: 'js-utilitarios',
      title: 'Datas, fuso e Intl',
      description:
        '`Date` representa um instante no tempo. `Intl` formata datas, números e moedas de acordo com o idioma e o fuso.',
      whenToUse: 'Para registrar quando algo aconteceu, mostrar datas no formato brasileiro e formatar valores em reais.',
      syntax: code`
new Date()                        // agora
new Date('2026-10-29T12:00:00Z')  // instante em UTC
new Date(2026, 9, 29)             // data local (mês de 0 a 11!)
Date.now()                        // ms desde 1970
d.toISOString()                   // formato para guardar/enviar
d.getTime()

new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(d)
new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(12.5)
`,
      examples: [
        {
          caption: 'Formatar data e moeda',
          code: code`
const d = new Date('2026-10-29T12:00:00Z')

console.log(d.toISOString())
console.log(new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeZone: 'America/Sao_Paulo',
}).format(d))
console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1234.5))
`,
          output: '2026-10-29T12:00:00.000Z\n29/10/2026\nR$ 1.234,50',
        },
        {
          caption: 'Data inválida e diferença em dias',
          code: code`
const invalida = new Date('ontem')
console.log(Number.isNaN(invalida.getTime()))

const inicio = new Date('2026-10-01T00:00:00Z')
const fim = new Date('2026-10-29T00:00:00Z')
console.log((fim - inicio) / (1000 * 60 * 60 * 24))
`,
          output: 'true\n28',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Guarde e envie datas em ISO (`toISOString`) e formate só na hora de exibir.' },
        { kind: 'tip', text: 'Para medir quanto tempo um código leva, use `performance.now()`.' },
        {
          kind: 'warning',
          text: '`new Date("2026-10-29")` é lido como meia-noite em UTC: no Brasil, aparece como dia 28 às 21h.',
        },
        { kind: 'mistake', text: 'Esquecer que os meses vão de 0 a 11: `new Date(2026, 10, 1)` é 1º de novembro.' },
      ],
      tags: ['date', 'intl', 'fuso', 'moeda'],
      relatedIds: ['js-coercao-numeros'],
    },
  ],
}
