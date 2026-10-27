import { code } from '@/lib/code'
import type { TechnologyContent } from '@/types'

export const react: TechnologyContent = {
  technology: {
    id: 'react',
    slug: 'react',
    name: 'React',
    description: 'Biblioteca para construir interfaces com componentes reutilizáveis.',
    color: '#61dafb',
    language: 'tsx',
  },

  categories: [
    {
      id: 'react-components',
      slug: 'componentes',
      technologyId: 'react',
      name: 'Componentes',
      description: 'Props, composição e renderização de listas.',
      order: 1,
    },
    {
      id: 'react-hooks',
      slug: 'hooks',
      technologyId: 'react',
      name: 'Hooks',
      description: 'Estado e efeitos colaterais em componentes de função.',
      order: 2,
    },
  ],

  sheets: [
    {
      id: 'react-props',
      slug: 'props-e-children',
      technologyId: 'react',
      categoryId: 'react-components',
      title: 'Props e children',
      description: 'Props são os parâmetros de um componente. `children` é o conteúdo colocado entre as tags dele.',
      whenToUse:
        'Sempre que um componente precisa receber dados ou se adaptar a quem o usa. Use `children` para componentes "moldura" (cards, layouts, modais).',
      syntax: code`
interface Props {
  title: string
  children: React.ReactNode
}

function Componente({ title, children }: Props) {
  return <section>{children}</section>
}
`,
      examples: [
        {
          caption: 'Card que recebe título e conteúdo',
          code: code`
interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

<Card title="Dica">
  <p>Props descem do pai para o filho.</p>
</Card>
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Props são somente leitura. Para mudar algo, o pai passa um valor novo ou uma função como `onChange`.',
        },
        {
          kind: 'tip',
          text: 'Use valores padrão na desestruturação: `function Button({ variant = "primary" })`.',
        },
        {
          kind: 'mistake',
          text: 'Alterar uma prop diretamente (`props.title = "x"`). O React não percebe a mudança.',
        },
      ],
      tags: ['props', 'children', 'composição'],
      relatedIds: ['react-lists-keys', 'react-use-state'],
    },
    {
      id: 'react-lists-keys',
      slug: 'listas-e-keys',
      technologyId: 'react',
      categoryId: 'react-components',
      title: 'Listas e key',
      description: 'Renderize listas com `map`. Cada item precisa de uma `key` única e estável entre os irmãos.',
      whenToUse: 'Sempre que exibir uma coleção: itens de menu, cards, linhas de tabela.',
      syntax: code`
<ul>
  {itens.map((item) => (
    <li key={item.id}>{item.nome}</li>
  ))}
</ul>
`,
      examples: [
        {
          caption: 'Lista de tarefas',
          code: code`
const tasks = [
  { id: 'a1', title: 'Estudar hooks' },
  { id: 'b2', title: 'Revisar Git' },
]

function TaskList() {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  )
}
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'A `key` ajuda o React a saber qual item mudou, entrou ou saiu da lista.' },
        {
          kind: 'mistake',
          text: 'Usar o índice do `map` como `key` em listas que mudam de ordem ou têm itens removidos: o estado vai parar no item errado.',
        },
        {
          kind: 'tip',
          text: 'Mudar a `key` de um componente faz o React recriá-lo do zero, um jeito simples de "resetar" o estado.',
        },
      ],
      tags: ['listas', 'key', 'map'],
      relatedIds: ['react-props'],
    },
    {
      id: 'react-use-state',
      slug: 'usestate',
      technologyId: 'react',
      categoryId: 'react-hooks',
      title: 'useState',
      description: 'Guarda um valor que, quando muda, faz o componente desenhar a tela de novo.',
      whenToUse:
        'Para tudo que muda com a interação do usuário: texto de um campo, menu aberto ou fechado, item selecionado.',
      syntax: code`
const [valor, setValor] = useState(valorInicial)

setValor(novoValor)
setValor((anterior) => calcularNovo(anterior))
`,
      examples: [
        {
          caption: 'Contador',
          code: code`
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Cliques: {count}
    </button>
  )
}
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Quando o novo valor depende do anterior, use a forma de função: `setCount((c) => c + 1)`.',
        },
        {
          kind: 'mistake',
          text: 'Alterar objetos ou arrays no lugar (`list.push(x)`). Crie uma cópia: `setList([...list, x])`.',
        },
        {
          kind: 'warning',
          text: 'O valor só muda na próxima renderização: logo após `setCount`, `count` ainda tem o valor antigo.',
        },
      ],
      tags: ['hooks', 'estado', 'usestate'],
      relatedIds: ['react-use-effect', 'react-props'],
    },
    {
      id: 'react-use-effect',
      slug: 'useeffect',
      technologyId: 'react',
      categoryId: 'react-hooks',
      title: 'useEffect',
      description: 'Executa código depois da renderização para sincronizar o componente com algo de fora do React.',
      whenToUse:
        'Para assinar eventos do navegador, timers, buscar dados ou integrar bibliotecas que não são React.',
      syntax: code`
useEffect(() => {
  // efeito
  return () => {
    // limpeza (opcional)
  }
}, [dependencias])
`,
      examples: [
        {
          caption: 'Ouvir o tamanho da janela',
          code: code`
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return <p>Largura: {width}px</p>
}
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'O array de dependências diz quando rodar de novo: `[]` só na montagem; `[id]` sempre que `id` mudar.',
        },
        {
          kind: 'mistake',
          text: 'Usar `useEffect` para calcular valores a partir de props ou estado. Calcule direto na renderização.',
        },
        {
          kind: 'warning',
          text: 'Em desenvolvimento, o StrictMode monta o componente duas vezes para revelar efeitos sem limpeza.',
        },
      ],
      tags: ['hooks', 'efeitos', 'useeffect'],
      relatedIds: ['react-use-state'],
    },
  ],
}
