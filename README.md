# HasDevNotes

Biblioteca pessoal de cheat sheets de programação: consulta rápida a conceitos,
sintaxes, comandos e exemplos de código, com favoritos e anotações próprias.

## Funcionalidades

- Navegação por **tecnologia → categoria → cheat sheet**, com sidebar e trilha de navegação
- Cheat sheets com sintaxe, exemplos com **destaque de código**, resultado esperado e dicas
- Botão para **copiar** qualquer trecho de código
- **Busca global** (`Ctrl+K`, `⌘K` ou `/`), sem diferenciar acentos, com ranking por relevância
- **Favoritos** e **anotações pessoais** salvos no navegador (localStorage)
- Tema escuro, layout responsivo e navegação completa pelo teclado

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · prism-react-renderer · lucide-react

## Scripts

| Comando           | O que faz                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento com recarga rápida |
| `npm run build`   | Checa os tipos e gera a versão de produção     |
| `npm run preview` | Serve localmente a versão de produção          |
| `npm run lint`    | Analisa o código com o Oxlint                  |

## Estrutura

```
src/
├── app/              Inicialização: App (providers) e rotas
├── pages/            Uma tela por arquivo (Home, Tecnologia, Categoria, Sheet, Busca…)
├── components/
│   ├── layout/       AppLayout, Sidebar, Header
│   ├── cards/        Cards de tecnologia, categoria e cheat sheet
│   ├── sheet/        Peças da página do cheat sheet (CodeBlock, TipList…)
│   └── ui/           Componentes genéricos (Button, EmptyState, Breadcrumbs…)
├── features/         Regras de negócio por funcionalidade
│   ├── favorites/    Contexto, hooks e botão de favoritos
│   ├── notes/        Hook e componentes das anotações
│   └── search/       Motor de busca, paleta Ctrl+K e atalhos
├── data/
│   ├── content/      Conteúdo da biblioteca (um arquivo por tecnologia)
│   ├── repositories/ Persistência dos dados do usuário (localStorage hoje)
│   └── library.ts    Funções de acesso ao conteúdo
├── hooks/            Hooks genéricos (useCopyToClipboard)
├── lib/              Utilitários puros (normalizeText, storage, highlight…)
└── types/            Modelos TypeScript
```

## Como adicionar conteúdo

1. Crie ou edite um arquivo em `src/data/content/` seguindo o tipo `TechnologyContent`.
2. Se for uma tecnologia nova, inclua-a em `src/data/content/index.ts`.
3. Use crases nos textos para destacar código: ``"Use `git pull` antes"``.
4. Rode `npm run dev`: se houver IDs repetidos ou relações quebradas, o console avisa.

## Preparado para o futuro

Os componentes não acessam o localStorage diretamente: eles usam interfaces
(`FavoritesRepository`, `NotesRepository`). Para sincronizar com um servidor,
basta criar uma implementação que chame a API e trocá-la em
`src/data/repositories/index.ts`.
