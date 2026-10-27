import { code } from '@/lib/code'
import type { TechnologyContent } from '@/types'

export const css: TechnologyContent = {
  technology: {
    id: 'css',
    slug: 'css',
    name: 'CSS',
    description: 'Estilo e layout das páginas: cores, espaçamentos, posicionamento e responsividade.',
    color: '#a78bfa',
    language: 'css',
  },

  categories: [
    {
      id: 'css-layout',
      slug: 'layout',
      technologyId: 'css',
      name: 'Layout',
      description: 'Organizar elementos em linhas, colunas e grades.',
      order: 1,
    },
    {
      id: 'css-responsive',
      slug: 'responsividade',
      technologyId: 'css',
      name: 'Responsividade',
      description: 'Adaptar o layout a diferentes tamanhos de tela.',
      order: 2,
    },
  ],

  sheets: [
    {
      id: 'css-flexbox',
      slug: 'flexbox',
      technologyId: 'css',
      categoryId: 'css-layout',
      title: 'Flexbox',
      description: 'Distribui elementos em uma única direção (linha ou coluna) e controla alinhamento e espaço entre eles.',
      whenToUse:
        'Para layouts de uma dimensão: barras de navegação, botões lado a lado, centralizar algo vertical e horizontalmente.',
      syntax: code`
.container {
  display: flex;
  flex-direction: row;          /* ou column */
  justify-content: flex-start;  /* eixo principal */
  align-items: stretch;         /* eixo cruzado */
  gap: 1rem;
}
`,
      examples: [
        {
          caption: 'Centralizar um elemento',
          code: code`
.tela {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
`,
        },
        {
          caption: 'Logo à esquerda, menu à direita',
          code: code`
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: '`justify-content` age no eixo de `flex-direction`; `align-items`, no eixo perpendicular. Com `column` eles "trocam".',
        },
        { kind: 'tip', text: '`flex: 1` faz um item ocupar todo o espaço que sobrar.' },
        {
          kind: 'mistake',
          text: 'Usar `margin` para espaçar itens. Prefira `gap`: ele não cria espaço sobrando nas pontas.',
        },
      ],
      tags: ['flexbox', 'layout', 'alinhamento'],
      relatedIds: ['css-grid'],
    },
    {
      id: 'css-grid',
      slug: 'grid',
      technologyId: 'css',
      categoryId: 'css-layout',
      title: 'CSS Grid',
      description: 'Organiza elementos em linhas e colunas ao mesmo tempo, como uma tabela flexível.',
      whenToUse: 'Para layouts de duas dimensões: galerias de cards, a estrutura geral da página (sidebar + conteúdo).',
      syntax: code`
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
`,
      examples: [
        {
          caption: 'Grade de cards que se adapta sozinha',
          code: code`
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
`,
        },
        {
          caption: 'Sidebar fixa e conteúdo flexível',
          code: code`
.app {
  display: grid;
  grid-template-columns: 17rem 1fr;
  min-height: 100vh;
}
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'A unidade `fr` divide o espaço livre: `1fr 2fr` dá ⅓ e ⅔.' },
        {
          kind: 'tip',
          text: '`repeat(auto-fill, minmax(240px, 1fr))` cria quantas colunas couberem, sem media query.',
        },
        {
          kind: 'tip',
          text: 'Regra prática: Grid para a estrutura da página, Flexbox para alinhar itens dentro de cada parte.',
        },
      ],
      tags: ['grid', 'layout', 'colunas'],
      relatedIds: ['css-flexbox', 'css-media-queries'],
    },
    {
      id: 'css-media-queries',
      slug: 'media-queries',
      technologyId: 'css',
      categoryId: 'css-responsive',
      title: 'Media queries',
      description: 'Aplicam estilos só quando uma condição da tela é verdadeira, como largura mínima ou tema escuro.',
      whenToUse: 'Para mudar o layout entre celular, tablet e desktop, ou respeitar preferências do usuário.',
      syntax: code`
@media (min-width: 768px) {
  /* estilos para telas a partir de 768px */
}
`,
      examples: [
        {
          caption: 'Mobile first: uma coluna, depois duas',
          code: code`
.cards {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}
`,
        },
        {
          caption: 'Respeitar quem prefere menos animação',
          code: code`
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Mobile first: escreva o estilo base para telas pequenas e use `min-width` para ampliar.',
        },
        {
          kind: 'mistake',
          text: 'Esquecer a meta tag viewport no HTML: sem ela, o celular finge ter uma tela larga e ignora as media queries.',
        },
        {
          kind: 'tip',
          text: 'No Tailwind, os prefixos `sm:`, `md:` e `lg:` são media queries de `min-width`.',
        },
      ],
      tags: ['responsivo', 'media query', 'mobile first'],
      relatedIds: ['css-grid'],
    },
  ],
}
