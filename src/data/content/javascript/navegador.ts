import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const navegador: CategoryContent = {
  category: {
    id: 'js-navegador',
    slug: 'navegador',
    technologyId: 'javascript',
    name: 'Navegador',
    description: 'DOM, eventos, JSON, Web Storage e módulos ES.',
  },

  sheets: [
    {
      id: 'js-dom',
      slug: 'dom',
      technologyId: 'javascript',
      categoryId: 'js-navegador',
      title: 'DOM: selecionar e alterar',
      description:
        'O DOM é a árvore de elementos da página. Com ele, o JavaScript encontra, altera, cria e remove elementos.',
      whenToUse: 'Para deixar a página interativa sem framework: mostrar mensagens, montar listas e reagir a cliques.',
      syntax: code`
document.querySelector('#id')          // primeiro elemento ou null
document.querySelectorAll('.classe')   // lista com todos (NodeList)

el.textContent = 'texto'
el.classList.add('x')                  // adiciona a classe
el.classList.remove('x')               // remove
el.classList.toggle('x')               // adiciona se não tem, remove se tem
el.classList.contains('x')             // true/false
el.dataset.id = '42'                   // atributo data-id
el.setAttribute('aria-label', 'Fechar')

const novo = document.createElement('li')
pai.append(novo)
el.remove()
`,
      examples: [
        {
          caption: 'HTML usado nos exemplos',
          language: 'html',
          code: code`
<button id="salvar">Salvar</button>
<ul id="lista"></ul>
`,
        },
        {
          caption: 'Alterar ao clicar e criar um item',
          code: code`
const botao = document.querySelector('#salvar')
botao?.addEventListener('click', () => {
  botao.textContent = 'Salvo'
  botao.classList.add('salvo')
})
// ao clicar: <button id="salvar" class="salvo">Salvo</button>

const li = document.createElement('li')
li.textContent = 'Novo item'
li.dataset.id = '42'
document.querySelector('#lista')?.append(li)
// resultado: <ul id="lista"><li data-id="42">Novo item</li></ul>
`,
        },
      ],
      tips: [
        { kind: 'tip', text: '`querySelectorAll` devolve uma NodeList: percorra com `for...of` ou converta com `[...lista]` para usar `map`.' },
        { kind: 'tip', text: 'Rode o script depois do HTML existir: use `defer` ou `type="module"` na tag `<script>`.' },
        {
          kind: 'warning',
          text: 'Use `textContent` para texto vindo do usuário. `innerHTML` interpreta HTML e permite que alguém injete um script na página (ataque chamado XSS).',
        },
        { kind: 'mistake', text: 'Não tratar o `null` de `querySelector` quando o elemento não existe: `null.textContent` lança `TypeError`.' },
      ],
      tags: ['dom', 'querySelector', 'classList', 'navegador'],
      relatedIds: ['js-eventos', 'js-executar'],
    },
    {
      id: 'js-eventos',
      slug: 'eventos',
      technologyId: 'javascript',
      categoryId: 'js-navegador',
      title: 'Eventos e delegação',
      description:
        '`addEventListener` registra um listener: uma função que roda quando acontece um clique, uma tecla ou um envio. Na delegação, um único listener no elemento pai atende todos os filhos.',
      whenToUse: 'Para responder ao usuário e para listas que mudam, em que itens novos precisam funcionar sem registrar listeners de novo.',
      syntax: code`
el.addEventListener('click', (e) => {
  e.target          // onde o evento começou
  e.currentTarget   // quem tem o listener
  e.preventDefault()   // cancela a ação padrão (ex.: enviar form)
  e.stopPropagation()  // não sobe para os pais
}, { once: true })     // opções: once, signal, capture

el.removeEventListener('click', mesmaFuncao)
`,
      examples: [
        {
          caption: 'HTML usado no exemplo',
          language: 'html',
          code: code`
<ul id="lista">
  <li><button data-id="7">Excluir</button></li>
</ul>
`,
        },
        {
          caption: 'Delegação: um listener para todos os botões',
          code: code`
const lista = document.querySelector('#lista')

lista?.addEventListener('click', (e) => {
  const botao = e.target.closest('button[data-id]')
  if (!botao) return // o clique não foi num botão

  console.log('Excluir', botao.dataset.id)
  botao.closest('li')?.remove()
})
// clique em "Excluir": mostra "Excluir 7" e o item some da lista
`,
        },
        {
          caption: 'Controlar o envio de um formulário',
          code: code`
const form = document.querySelector('form')
form?.addEventListener('submit', (e) => {
  e.preventDefault() // não recarrega a página
  const dados = new FormData(form)
  console.log(dados.get('email')) // o valor do campo name="email"
})
`,
        },
      ],
      tips: [
        { kind: 'tip', text: '`closest` sobe pela árvore até achar o seletor: cobre cliques em ícones dentro do botão.' },
        {
          kind: 'tip',
          text: 'Para remover vários listeners de uma vez, passe `{ signal: controller.signal }` e chame `controller.abort()`.',
        },
        {
          kind: 'warning',
          text: 'Ao tratar um formulário com JavaScript, chame `e.preventDefault()` no `submit`. Sem isso, o navegador recarrega a página.',
        },
        {
          kind: 'mistake',
          text: 'Remover com uma função diferente: `removeEventListener` precisa da mesma referência usada no `addEventListener`.',
        },
      ],
      tags: ['eventos', 'delegação', 'addEventListener', 'navegador'],
      relatedIds: ['js-dom', 'js-praticas-modernas'],
    },
    {
      id: 'js-json-storage',
      slug: 'json-e-storage',
      technologyId: 'javascript',
      categoryId: 'js-navegador',
      title: 'JSON e Web Storage',
      description:
        'JSON é o formato de texto para trocar dados. `localStorage` e `sessionStorage` guardam strings no navegador.',
      whenToUse: 'Para enviar e receber dados de APIs e para salvar preferências e rascunhos no navegador do usuário.',
      syntax: code`
JSON.stringify(valor)           // objeto -> texto
JSON.stringify(valor, null, 2)  // texto indentado
JSON.parse(texto)               // texto -> objeto (lança erro se inválido)

localStorage.setItem('chave', 'texto')   // persiste entre sessões
localStorage.getItem('chave')            // texto ou null
localStorage.removeItem('chave')
sessionStorage.setItem('aba', 'inicio')  // dura só a aba
`,
      examples: [
        {
          caption: 'Ida e volta pelo JSON',
          code: code`
const user = { nome: 'Maya', pontos: 82, ativo: true }
const texto = JSON.stringify(user)
console.log(texto)

const volta = JSON.parse(texto)
console.log(volta.pontos + 1)
`,
          output: '{"nome":"Maya","pontos":82,"ativo":true}\n83',
        },
        {
          caption: 'Salvar e ler com segurança',
          code: code`
function salvar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor))
  } catch (erro) {
    console.warn('Não foi possível salvar', erro)
  }
}

function ler(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave)
    return texto === null ? padrao : JSON.parse(texto)
  } catch {
    return padrao
  }
}

salvar('tema', { escuro: true })
console.log(ler('tema', { escuro: false }))
`,
          output: '{ escuro: true }',
        },
      ],
      tips: [
        { kind: 'tip', text: 'O Storage guarda só strings: sempre use `JSON.stringify` para salvar e `JSON.parse` para ler.' },
        {
          kind: 'warning',
          text: 'O JSON não guarda funções nem `undefined`, e datas voltam como texto: converta de novo com `new Date(texto)`.',
        },
        {
          kind: 'warning',
          text: 'Nunca guarde senhas ou tokens sensíveis no Storage: qualquer script da página consegue ler.',
        },
        {
          kind: 'mistake',
          text: 'Não usar `try`/`catch`: o acesso ao Storage pode falhar (modo privado, cota cheia) e o `JSON.parse` falha com texto inválido.',
        },
      ],
      tags: ['json', 'localStorage', 'sessionStorage'],
      relatedIds: ['js-erros', 'js-http-post', 'js-referencias-copias'],
    },
    {
      id: 'js-modulos',
      slug: 'modulos',
      technologyId: 'javascript',
      categoryId: 'js-navegador',
      title: 'Módulos ES (import/export)',
      description:
        'Cada arquivo é um módulo com escopo próprio. `export` expõe valores e `import` os traz de outro arquivo.',
      whenToUse: 'Para dividir o código em arquivos organizados e reutilizáveis, como em qualquer projeto Vite ou React.',
      syntax: code`
// matematica.js
export const soma = (a, b) => a + b        // export nomeado
export default function dobro(n) {          // export default (um por arquivo)
  return n * 2
}

// app.js
import dobro, { soma as somar } from './matematica.js'
import * as mat from './matematica.js'
const mod = await import('./matematica.js') // import dinâmico: carrega só quando precisar
`,
      examples: [
        {
          caption: 'Usar o módulo no navegador',
          language: 'html',
          code: code`
<script type="module" src="app.js"></script>
`,
        },
        {
          caption: 'Nomeado x default',
          code: code`
// cores.js
export const primaria = '#7d9bf0'
export default { primaria, fundo: '#121316' }

// app.js
import tema, { primaria } from './cores.js'
console.log(primaria === tema.primaria) // true
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'No `import`, o nome nomeado precisa ser igual ao exportado (ou renomeado com `as`); o default aceita qualquer nome.' },
        { kind: 'tip', text: 'Scripts com `type="module"` só rodam depois que o HTML foi lido, como se tivessem `defer`.' },
        {
          kind: 'warning',
          text: 'Abrir o HTML direto pelo `file://` bloqueia módulos. Sirva os arquivos por HTTP (ex.: `npm run dev` no Vite).',
        },
        {
          kind: 'warning',
          text: 'No Node.js, use a extensão `.mjs` ou `"type": "module"` no package.json, e inclua a extensão nos imports relativos.',
        },
        { kind: 'mistake', text: 'Misturar com CommonJS: `require` e `module.exports` são outro sistema de módulos, do Node antigo.' },
      ],
      tags: ['módulos', 'import', 'export', 'esm'],
      relatedIds: ['js-executar'],
    },
  ],
}
