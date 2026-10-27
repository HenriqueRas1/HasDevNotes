import { code } from '@/lib/code'
import type { TechnologyContent } from '@/types'

export const git: TechnologyContent = {
  technology: {
    id: 'git',
    slug: 'git',
    name: 'Git',
    description: 'Controle de versão: histórico, branches e colaboração no código.',
    color: '#f05032',
    language: 'bash',
  },

  categories: [
    {
      id: 'git-basics',
      slug: 'basico',
      technologyId: 'git',
      name: 'Básico',
      description: 'Criar repositórios, registrar e consultar mudanças.',
      order: 1,
    },
    {
      id: 'git-branches',
      slug: 'branches',
      technologyId: 'git',
      name: 'Branches',
      description: 'Trabalhar em linhas paralelas de desenvolvimento.',
      order: 2,
    },
    {
      id: 'git-remote',
      slug: 'remoto',
      technologyId: 'git',
      name: 'Repositório remoto',
      description: 'Sincronizar com GitHub, GitLab e afins.',
      order: 3,
    },
  ],

  sheets: [
    {
      id: 'git-commit',
      slug: 'add-commit',
      technologyId: 'git',
      categoryId: 'git-basics',
      title: 'git add e git commit',
      description: 'add escolhe quais mudanças entram no próximo registro; commit grava esse registro no histórico.',
      whenToUse: 'Sempre que concluir uma unidade lógica de trabalho, como uma funcionalidade, uma correção ou uma etapa.',
      syntax: code`
git add <arquivo>        # adiciona um arquivo à "staging area"
git add .                # adiciona tudo da pasta atual
git commit -m "mensagem" # grava o commit
`,
      examples: [
        {
          caption: 'Fluxo básico',
          code: code`
git status
git add src/App.tsx
git commit -m "Adiciona tela inicial"
`,
          output: '[main 5eba0c4] Adiciona tela inicial\n 1 file changed, 12 insertions(+)',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Escreva mensagens no imperativo e que expliquem o porquê: "Corrige cálculo do total" é melhor que "ajustes".',
        },
        { kind: 'tip', text: 'Prefira commits pequenos e frequentes: fica fácil revisar e desfazer.' },
        {
          kind: 'warning',
          text: 'Cuidado com git add . em pastas com arquivos sensíveis (.env, senhas). Use o .gitignore.',
        },
      ],
      tags: ['commit', 'staging', 'histórico'],
      relatedIds: ['git-status-log', 'git-push-pull'],
    },
    {
      id: 'git-status-log',
      slug: 'status-log',
      technologyId: 'git',
      categoryId: 'git-basics',
      title: 'git status e git log',
      description: 'status mostra o estado atual dos arquivos; log mostra o histórico de commits.',
      whenToUse: 'Antes de commitar, para conferir o que mudou, e quando precisar entender o histórico do projeto.',
      syntax: code`
git status            # o que mudou e o que está na staging
git log --oneline     # histórico resumido, um commit por linha
git diff              # mudanças ainda não adicionadas
`,
      examples: [
        {
          caption: 'Histórico visual com branches',
          code: code`
git log --oneline --graph --all
`,
          output: '* a1b2c3d (HEAD -> main) Adiciona busca\n* 5eba0c4 Etapa 1: setup',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Rode git status com frequência: ele costuma sugerir o próximo comando.' },
        { kind: 'tip', text: 'git diff --staged mostra o que já foi adicionado e vai entrar no próximo commit.' },
      ],
      tags: ['status', 'log', 'histórico'],
      relatedIds: ['git-commit'],
    },
    {
      id: 'git-branch-switch',
      slug: 'branch-switch',
      technologyId: 'git',
      categoryId: 'git-branches',
      title: 'Criar e trocar de branch',
      description: 'Uma branch é uma linha independente de commits. switch troca a branch em que você está trabalhando.',
      whenToUse: 'Para desenvolver uma funcionalidade ou correção isolada, sem afetar a branch principal.',
      syntax: code`
git branch                 # lista as branches
git switch -c <nome>       # cria e troca para a nova branch
git switch <nome>          # troca para uma branch existente
git branch -d <nome>       # apaga uma branch já mesclada
`,
      examples: [
        {
          caption: 'Começar uma funcionalidade nova',
          code: code`
git switch -c feature/favoritos
# ...trabalho e commits...
git switch main
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'git switch é a forma moderna e mais clara do antigo git checkout para trocar de branch.' },
        {
          kind: 'warning',
          text: 'Mudanças não commitadas "acompanham" você na troca de branch. Faça commit ou git stash antes.',
        },
      ],
      tags: ['branch', 'switch', 'fluxo'],
      relatedIds: ['git-merge'],
    },
    {
      id: 'git-merge',
      slug: 'merge',
      technologyId: 'git',
      categoryId: 'git-branches',
      title: 'git merge',
      description: 'Une o histórico de outra branch à branch atual.',
      whenToUse: 'Quando o trabalho de uma branch está pronto e precisa entrar na branch principal.',
      syntax: code`
git switch <destino>
git merge <origem>
`,
      examples: [
        {
          caption: 'Trazer uma feature para a main',
          code: code`
git switch main
git merge feature/favoritos
`,
        },
        {
          caption: 'Resolver um conflito',
          code: code`
# edite os arquivos marcados com <<<<<<< ======= >>>>>>>
git add arquivo-resolvido.ts
git commit
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Conflito não é erro: o Git só não sabe qual versão manter. Escolha, remova os marcadores e faça commit.',
        },
        { kind: 'tip', text: 'git merge --abort cancela um merge em andamento e volta ao estado anterior.' },
      ],
      tags: ['merge', 'branch', 'conflito'],
      relatedIds: ['git-branch-switch'],
    },
    {
      id: 'git-push-pull',
      slug: 'push-pull',
      technologyId: 'git',
      categoryId: 'git-remote',
      title: 'git push e git pull',
      description: 'push envia seus commits ao repositório remoto; pull traz e integra os commits de lá.',
      whenToUse: 'Para publicar seu trabalho e para se atualizar com o que outras pessoas (ou outros computadores) enviaram.',
      syntax: code`
git remote add origin <url>   # conecta a um remoto (uma vez)
git push -u origin <branch>   # primeiro envio da branch
git push                      # envios seguintes
git pull                      # baixa e integra mudanças
`,
      examples: [
        {
          caption: 'Publicar o projeto no GitHub pela primeira vez',
          code: code`
git remote add origin https://github.com/usuario/hasdevnotes.git
git push -u origin main
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Faça git pull antes de começar a trabalhar para evitar conflitos.' },
        {
          kind: 'warning',
          text: 'Evite git push --force em branches compartilhadas: ele sobrescreve o histórico remoto.',
        },
        { kind: 'mistake', text: 'Tentar fazer push sem commitar antes. O push só envia commits, não arquivos soltos.' },
      ],
      tags: ['remoto', 'github', 'sincronização'],
      relatedIds: ['git-commit'],
    },
  ],
}
