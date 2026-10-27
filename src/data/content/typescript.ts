import { code } from '@/lib/code'
import type { TechnologyContent } from '@/types'

export const typescript: TechnologyContent = {
  technology: {
    id: 'typescript',
    slug: 'typescript',
    name: 'TypeScript',
    description: 'JavaScript com tipos: o editor aponta erros antes de o código rodar.',
    color: '#3178c6',
    language: 'typescript',
  },

  categories: [
    {
      id: 'ts-fundamentals',
      slug: 'fundamentos',
      technologyId: 'typescript',
      name: 'Fundamentos',
      description: 'Descrever o formato dos dados e trabalhar com mais de um tipo possível.',
      order: 1,
    },
    {
      id: 'ts-advanced',
      slug: 'tipos-avancados',
      technologyId: 'typescript',
      name: 'Tipos avançados',
      description: 'Genéricos e tipos utilitários para reaproveitar tipos.',
      order: 2,
    },
  ],

  sheets: [
    {
      id: 'ts-interface-type',
      slug: 'interface-e-type',
      technologyId: 'typescript',
      categoryId: 'ts-fundamentals',
      title: 'interface e type',
      description: 'Duas formas de dar nome ao formato de um objeto. `interface` descreve objetos; `type` aceita qualquer tipo.',
      whenToUse:
        'Sempre que um objeto circula pelo código (props, respostas de API, modelos). Use `interface` para objetos e `type` para uniões, tuplas e combinações.',
      syntax: code`
interface Nome {
  propriedade: tipo
  opcional?: tipo
  readonly fixa: tipo
}

type Nome = { propriedade: tipo } | OutroTipo
`,
      examples: [
        {
          caption: 'Modelando um usuário',
          code: code`
interface User {
  id: number
  name: string
  email?: string // opcional
}

const ana: User = { id: 1, name: 'Ana' }
const erro: User = { id: 2 } // ✗ falta "name"
`,
          output: "Erro: Property 'name' is missing in type '{ id: number; }'",
        },
        {
          caption: 'type para uniões',
          code: code`
type Status = 'idle' | 'loading' | 'error'

let status: Status = 'idle'
status = 'done' // ✗ não é um dos valores permitidos
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Interfaces podem ser estendidas: `interface Admin extends User { role: string }`.' },
        {
          kind: 'tip',
          text: 'Na dúvida, escolha um padrão e seja consistente. Para objetos, os dois funcionam quase igual.',
        },
        {
          kind: 'mistake',
          text: 'Usar `any` para "fazer o erro sumir". Ele desliga a checagem; prefira `unknown` e valide o valor.',
        },
      ],
      tags: ['interface', 'type', 'objetos'],
      relatedIds: ['ts-union-narrowing', 'ts-utility-types'],
    },
    {
      id: 'ts-union-narrowing',
      slug: 'union-e-narrowing',
      technologyId: 'typescript',
      categoryId: 'ts-fundamentals',
      title: 'Union types e narrowing',
      description:
        'Um union (`A | B`) aceita mais de um tipo. Narrowing é a checagem que faz o TypeScript saber qual deles você tem em mãos.',
      whenToUse:
        'Quando um valor pode ter formatos diferentes: um id que é número ou texto, uma resposta de sucesso ou de erro.',
      syntax: code`
function f(valor: string | number) {
  if (typeof valor === 'string') {
    // aqui valor é string
  } else {
    // aqui valor é number
  }
}
`,
      examples: [
        {
          caption: 'Narrowing com typeof',
          code: code`
function formatId(id: string | number): string {
  if (typeof id === 'number') {
    return id.toFixed(0)
  }
  return id.toUpperCase()
}

console.log(formatId('abc'), formatId(42))
`,
          output: 'ABC 42',
        },
        {
          caption: 'Union discriminado (campo em comum)',
          code: code`
type Result =
  | { ok: true; data: string }
  | { ok: false; error: string }

function show(result: Result) {
  if (result.ok) {
    console.log(result.data) // só existe quando ok é true
  } else {
    console.log(result.error)
  }
}
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Outras formas de narrowing: `in` (`"error" in result`), `instanceof` e comparações com `===`.',
        },
        {
          kind: 'warning',
          text: 'Sem narrowing, só dá para usar o que é comum a todos os tipos da união.',
        },
      ],
      tags: ['union', 'narrowing', 'typeof'],
      relatedIds: ['ts-interface-type'],
    },
    {
      id: 'ts-generics',
      slug: 'generics',
      technologyId: 'typescript',
      categoryId: 'ts-advanced',
      title: 'Generics',
      description: 'Um "parâmetro de tipo" (`<T>`) deixa funções e tipos reutilizáveis sem perder a informação do tipo real.',
      whenToUse:
        'Quando a mesma lógica serve para vários tipos: listas, respostas de API, funções utilitárias como "primeiro item".',
      syntax: code`
function nome<T>(valor: T): T {
  return valor
}

interface Caixa<T> {
  conteudo: T
}
`,
      examples: [
        {
          caption: 'Função genérica',
          code: code`
function first<T>(items: T[]): T | undefined {
  return items[0]
}

const n = first([10, 20])      // n: number | undefined
const s = first(['a', 'b'])    // s: string | undefined
`,
        },
        {
          caption: 'Tipo genérico para respostas de API',
          code: code`
interface ApiResponse<T> {
  data: T
  page: number
}

type UsersResponse = ApiResponse<User[]>
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Normalmente o TypeScript deduz o `T` sozinho a partir dos argumentos.' },
        {
          kind: 'tip',
          text: 'Restrinja o que o `T` aceita com `extends`: `<T extends { id: number }>`.',
        },
        {
          kind: 'mistake',
          text: 'Usar `any[]` no lugar de `T[]`: a função funciona, mas o tipo do retorno se perde.',
        },
      ],
      tags: ['generics', 'reuso', 'funções'],
      relatedIds: ['ts-utility-types'],
    },
    {
      id: 'ts-utility-types',
      slug: 'utility-types',
      technologyId: 'typescript',
      categoryId: 'ts-advanced',
      title: 'Partial, Pick, Omit e Record',
      description: 'Tipos utilitários nativos que criam um tipo novo a partir de outro, sem repetir campos.',
      whenToUse: 'Para formulários de edição, dados de criação (sem `id`) ou objetos usados como dicionário.',
      syntax: code`
Partial<T>          // todos os campos opcionais
Pick<T, 'a' | 'b'>  // só os campos escolhidos
Omit<T, 'a'>        // todos menos os escolhidos
Record<K, V>        // objeto com chaves K e valores V
`,
      examples: [
        {
          caption: 'Derivando tipos de um modelo',
          code: code`
interface Note {
  id: string
  content: string
  createdAt: string
}

type NewNote = Omit<Note, 'id' | 'createdAt'>   // { content }
type NoteUpdate = Partial<NewNote>               // { content? }
type NoteSummary = Pick<Note, 'id' | 'content'>  // { id, content }
`,
        },
        {
          caption: 'Record como dicionário',
          code: code`
type Theme = 'dark' | 'light'

const labels: Record<Theme, string> = {
  dark: 'Escuro',
  light: 'Claro',
} // esquecer uma chave gera erro
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Derivar tipos mantém tudo sincronizado: ao mudar `Note`, `NewNote` muda junto.',
        },
        { kind: 'tip', text: 'Outros úteis: `Required<T>`, `Readonly<T>` e `ReturnType<typeof fn>`.' },
      ],
      tags: ['partial', 'pick', 'omit', 'record'],
      relatedIds: ['ts-interface-type', 'ts-generics'],
    },
  ],
}
