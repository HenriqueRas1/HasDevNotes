import { code } from '@/lib/code'
import type { TechnologyContent } from '@/types'

export const dom: TechnologyContent = {
  technology: {
    id: 'dom',
    slug: 'dom',
    name: 'DOM',
    description: 'A árvore de elementos da página: selecionar, alterar, criar e reagir a eventos com JavaScript.',
    color: '#2dd4bf',
    language: 'javascript',
  },

  categories: [
    {
      id: 'dom-selection',
      slug: 'selecao',
      technologyId: 'dom',
      name: 'Seleção e navegação',
      description: 'Encontrar elementos e percorrer a árvore do documento.',
      order: 1,
    },
    {
      id: 'dom-content',
      slug: 'conteudo',
      technologyId: 'dom',
      name: 'Conteúdo, atributos e estilos',
      description: 'Ler e alterar texto, atributos, classes e estilos.',
      order: 2,
    },
    {
      id: 'dom-creation',
      slug: 'criacao',
      technologyId: 'dom',
      name: 'Criar e remover elementos',
      description: 'Montar elementos com JavaScript e inseri-los na página.',
      order: 3,
    },
    {
      id: 'dom-events',
      slug: 'eventos',
      technologyId: 'dom',
      name: 'Eventos',
      description: 'Reagir a cliques, teclas e outras ações do usuário.',
      order: 4,
    },
    {
      id: 'dom-forms',
      slug: 'formularios',
      technologyId: 'dom',
      name: 'Formulários',
      description: 'Ler, enviar e validar dados de formulários.',
      order: 5,
    },
    {
      id: 'dom-lifecycle',
      slug: 'carregamento-e-observadores',
      technologyId: 'dom',
      name: 'Carregamento e observadores',
      description: 'Quando o DOM está pronto, posição na tela e observação de elementos.',
      order: 6,
    },
  ],

  sheets: [
    // ── Seleção e navegação ────────────────────────────────────────────────
    {
      id: 'dom-query-selector',
      slug: 'query-selector',
      technologyId: 'dom',
      categoryId: 'dom-selection',
      title: 'querySelector e querySelectorAll',
      description:
        'Buscam elementos usando seletores CSS. `querySelector` retorna o primeiro encontrado; `querySelectorAll`, todos.',
      whenToUse:
        'É a forma padrão de pegar elementos da página: qualquer seletor que funciona no CSS funciona aqui.',
      syntax: code`
const el = document.querySelector('seletor')       // Element | null
const lista = document.querySelectorAll('seletor') // NodeList

elemento.querySelector('seletor') // busca só dentro do elemento
`,
      examples: [
        {
          caption: 'HTML usado nos exemplos',
          language: 'html',
          code: code`
<nav id="menu">
  <a class="link ativo" href="/">Início</a>
  <a class="link" href="/sobre">Sobre</a>
</nav>
`,
        },
        {
          caption: 'Selecionando por id, classe e tag',
          code: code`
const menu = document.querySelector('#menu')
const ativo = document.querySelector('.link.ativo')
const links = menu.querySelectorAll('a')

console.log(ativo.textContent, links.length)
`,
          output: 'Início 2',
        },
        {
          caption: 'Percorrendo a NodeList',
          code: code`
document.querySelectorAll('.link').forEach((link) => {
  link.classList.add('pronto')
})

// Para usar map ou filter, converta em array
const textos = [...document.querySelectorAll('.link')].map((a) => a.textContent)
`,
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: 'Esquecer o `#` ou o `.`: `querySelector("menu")` busca a tag `<menu>`, não o id. Use `"#menu"` para id e `".link"` para classe.',
        },
        {
          kind: 'warning',
          text: 'Se nada for encontrado, `querySelector` retorna `null`, e acessar `.textContent` de `null` gera erro. Confira antes ou use `?.`.',
        },
        {
          kind: 'tip',
          text: 'A `NodeList` de `querySelectorAll` tem `forEach`, mas não `map` nem `filter`. Converta com `[...lista]` ou `Array.from(lista)`.',
        },
        { kind: 'tip', text: '`getElementById("menu")` é uma alternativa só para ids, sem o `#`.' },
      ],
      tags: ['seletores', 'querySelector', 'nodelist'],
      relatedIds: ['dom-closest-matches', 'dom-traversal'],
    },
    {
      id: 'dom-closest-matches',
      slug: 'closest-e-matches',
      technologyId: 'dom',
      categoryId: 'dom-selection',
      title: 'closest() e matches()',
      description:
        '`matches` testa se um elemento corresponde a um seletor. `closest` sobe pela árvore e retorna o ancestral mais próximo que corresponde.',
      whenToUse:
        'Na delegação de eventos e quando, a partir do elemento clicado, você precisa encontrar o card ou a linha a que ele pertence.',
      syntax: code`
elemento.matches('seletor') // true ou false
elemento.closest('seletor') // Element | null (inclui o próprio elemento)
`,
      examples: [
        {
          caption: 'HTML',
          language: 'html',
          code: code`
<article class="card" data-id="42">
  <h3>Título</h3>
  <button class="excluir">Excluir</button>
</article>
`,
        },
        {
          caption: 'Do botão até o card',
          code: code`
const botao = document.querySelector('.excluir')

console.log(botao.matches('button.excluir'))
console.log(botao.closest('.card').dataset.id)
`,
          output: 'true\n42',
        },
      ],
      tips: [
        { kind: 'tip', text: '`closest` começa pelo próprio elemento: `botao.closest("button")` retorna o próprio botão.' },
        {
          kind: 'tip',
          text: 'Com delegação de eventos, `event.target.closest(".card")` encontra o card mesmo que o clique tenha caído num ícone dentro do botão.',
        },
        { kind: 'warning', text: 'Retorna `null` se nenhum ancestral corresponder; trate esse caso.' },
      ],
      tags: ['closest', 'matches', 'ancestral'],
      relatedIds: ['dom-event-delegation', 'dom-query-selector'],
    },
    {
      id: 'dom-traversal',
      slug: 'percorrer-a-arvore',
      technologyId: 'dom',
      categoryId: 'dom-selection',
      title: 'Percorrer a árvore',
      description: 'Propriedades para navegar a partir de um elemento: pai, filhos e irmãos.',
      whenToUse:
        'Quando você já tem um elemento e precisa chegar a outro próximo dele, sem fazer uma nova busca no documento.',
      syntax: code`
el.parentElement          // pai
el.children               // filhos (HTMLCollection)
el.firstElementChild      // primeiro filho
el.lastElementChild       // último filho
el.nextElementSibling     // próximo irmão
el.previousElementSibling // irmão anterior
`,
      examples: [
        {
          caption: 'HTML',
          language: 'html',
          code: code`
<ul id="lista">
  <li>Um</li>
  <li>Dois</li>
  <li>Três</li>
</ul>
`,
        },
        {
          caption: 'Navegando pela lista',
          code: code`
const lista = document.querySelector('#lista')
const primeiro = lista.firstElementChild

console.log(primeiro.textContent)
console.log(primeiro.nextElementSibling.textContent)
console.log(lista.children.length)
`,
          output: 'Um\nDois\n3',
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: 'Usar `childNodes`, `firstChild` ou `nextSibling` esperando elementos: eles incluem nós de texto (os espaços e quebras de linha do HTML). Prefira as versões com `Element` no nome.',
        },
        {
          kind: 'tip',
          text: '`children` é uma `HTMLCollection` "viva": ela se atualiza sozinha quando elementos entram ou saem.',
        },
      ],
      tags: ['árvore', 'parentElement', 'children'],
      relatedIds: ['dom-closest-matches', 'dom-query-selector'],
    },

    // ── Conteúdo, atributos e estilos ──────────────────────────────────────
    {
      id: 'dom-text-html',
      slug: 'textcontent-e-innerhtml',
      technologyId: 'dom',
      categoryId: 'dom-content',
      title: 'textContent e innerHTML',
      description:
        '`textContent` lê e altera só o texto. `innerHTML` lê e altera o HTML interno, interpretando as tags.',
      whenToUse:
        'Use `textContent` para exibir qualquer texto, principalmente o que veio do usuário ou de uma API. Use `innerHTML` só com HTML que você mesmo controla.',
      syntax: code`
el.textContent = 'texto'     // seguro: tags viram texto
el.innerHTML = '<b>html</b>' // interpreta as tags
`,
      examples: [
        {
          caption: 'A diferença na tela',
          code: code`
const titulo = document.querySelector('h1')

titulo.textContent = 'Olá, <b>mundo</b>'
// Na tela: Olá, <b>mundo</b>  (as tags aparecem como texto)

titulo.innerHTML = 'Olá, <b>mundo</b>'
// Na tela: Olá, mundo  (com "mundo" em negrito)
`,
        },
        {
          caption: 'O risco do innerHTML (XSS)',
          code: code`
const comentario = '<img src="x" onerror="alert(1)">'

// ✗ Perigoso: o código escondido no "comentário" é executado
caixa.innerHTML = comentario

// ✓ Seguro: aparece como texto
caixa.textContent = comentario
`,
        },
      ],
      tips: [
        {
          kind: 'warning',
          text: 'Nunca coloque dados do usuário ou de APIs no `innerHTML`: isso abre brecha para ataques XSS (scripts injetados na página).',
        },
        {
          kind: 'mistake',
          text: 'Usar `innerHTML +=` dentro de um laço: todo o HTML é recriado a cada volta, o que é lento e apaga os eventos dos elementos. Monte tudo antes ou use `append`.',
        },
        {
          kind: 'tip',
          text: '`innerText` parece com `textContent`, mas considera o CSS (ignora texto escondido) e é mais lento. Na dúvida, use `textContent`.',
        },
        { kind: 'tip', text: '`el.replaceChildren()` remove todos os filhos de um elemento de forma explícita.' },
      ],
      tags: ['texto', 'html', 'xss', 'segurança'],
      relatedIds: ['dom-create-append', 'dom-template-fragment'],
    },
    {
      id: 'dom-attributes',
      slug: 'atributos-e-dataset',
      technologyId: 'dom',
      categoryId: 'dom-content',
      title: 'Atributos e dataset',
      description: 'Leem e alteram atributos HTML. `dataset` dá acesso aos atributos personalizados `data-*`.',
      whenToUse:
        'Para trocar links, imagens e estados (`disabled`, `aria-*`) e para guardar informações no próprio elemento com `data-*`.',
      syntax: code`
el.getAttribute('nome')
el.setAttribute('nome', 'valor')
el.removeAttribute('nome')
el.hasAttribute('nome')

el.dataset.nomeDoDado // lê data-nome-do-dado
`,
      examples: [
        {
          caption: 'HTML',
          language: 'html',
          code: code`
<button id="salvar" data-user-id="7" data-status="rascunho">Salvar</button>
`,
        },
        {
          caption: 'Lendo e alterando',
          code: code`
const botao = document.querySelector('#salvar')

console.log(botao.dataset.userId)  // data-user-id
botao.dataset.status = 'publicado' // muda data-status
botao.setAttribute('aria-busy', 'true')
botao.disabled = true              // propriedade direta
`,
          output: '7',
        },
      ],
      tips: [
        { kind: 'tip', text: 'O `dataset` converte os nomes: `data-user-id` vira `dataset.userId` (camelCase).' },
        {
          kind: 'warning',
          text: 'Valores de `data-*` são sempre strings. Converta com `Number(...)` quando precisar de número.',
        },
        {
          kind: 'tip',
          text: 'Muitos atributos também existem como propriedades: `img.src`, `a.href`, `input.disabled`. Para atributos booleanos, a propriedade é mais simples que `setAttribute`.',
        },
      ],
      tags: ['atributos', 'dataset', 'data-*'],
      relatedIds: ['dom-classlist'],
    },
    {
      id: 'dom-classlist',
      slug: 'classlist',
      technologyId: 'dom',
      categoryId: 'dom-content',
      title: 'classList',
      description: 'Adiciona, remove e alterna classes CSS de um elemento sem mexer nas outras classes.',
      whenToUse:
        'É o jeito recomendado de mudar a aparência pelo JavaScript: o estilo fica no CSS e o JS só liga e desliga classes.',
      syntax: code`
el.classList.add('classe')
el.classList.remove('classe')
el.classList.toggle('classe')       // liga/desliga
el.classList.toggle('classe', cond) // liga se cond for true
el.classList.contains('classe')     // true ou false
el.classList.replace('antiga', 'nova')
`,
      examples: [
        {
          caption: 'Menu que abre e fecha',
          code: code`
const botao = document.querySelector('#abrir-menu')
const menu = document.querySelector('#menu')

botao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto')
  botao.setAttribute('aria-expanded', String(aberto))
})
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: '`toggle` retorna `true` se a classe ficou ligada, útil para sincronizar atributos como `aria-expanded`.',
        },
        { kind: 'mistake', text: 'Usar `el.className = "ativo"`: isso apaga todas as outras classes do elemento.' },
        { kind: 'tip', text: 'Aceita várias classes de uma vez: `classList.add("a", "b")`.' },
      ],
      tags: ['classes', 'css', 'toggle'],
      relatedIds: ['dom-styles', 'dom-attributes'],
    },
    {
      id: 'dom-styles',
      slug: 'estilos',
      technologyId: 'dom',
      categoryId: 'dom-content',
      title: 'style e getComputedStyle',
      description:
        '`style` altera os estilos inline de um elemento. `getComputedStyle` lê o estilo final aplicado, venha ele de onde vier.',
      whenToUse:
        'Para valores realmente dinâmicos, como uma posição calculada ou uma cor escolhida pelo usuário. Para estados fixos, prefira `classList`.',
      syntax: code`
el.style.propriedade = 'valor'          // nome em camelCase
el.style.setProperty('--variavel', 'valor')
getComputedStyle(el).propriedade        // só leitura
`,
      examples: [
        {
          caption: 'Estilos inline e variáveis CSS',
          code: code`
const caixa = document.querySelector('.caixa')

caixa.style.backgroundColor = 'tomato' // background-color
caixa.style.transform = 'translateX(20px)'

// Variáveis CSS: ótimas para temas
document.documentElement.style.setProperty('--cor-destaque', '#22d3ee')

console.log(getComputedStyle(caixa).display)
`,
          output: 'block',
        },
      ],
      tips: [
        { kind: 'tip', text: 'Propriedades com hífen viram camelCase: `font-size` vira `style.fontSize`.' },
        { kind: 'mistake', text: 'Esquecer a unidade: `style.width = 200` não funciona; use `"200px"`.' },
        {
          kind: 'warning',
          text: '`el.style` só enxerga estilos inline. Para saber o valor que veio de uma folha CSS, use `getComputedStyle`.',
        },
        { kind: 'tip', text: 'Para remover um estilo inline, atribua uma string vazia: `el.style.color = ""`.' },
      ],
      tags: ['css', 'estilos', 'variáveis css'],
      relatedIds: ['dom-classlist'],
    },

    // ── Criar e remover elementos ──────────────────────────────────────────
    {
      id: 'dom-create-append',
      slug: 'createelement-e-append',
      technologyId: 'dom',
      categoryId: 'dom-creation',
      title: 'createElement e append',
      description:
        '`createElement` cria um elemento novo em memória; `append`, `prepend`, `before` e `after` o colocam na página.',
      whenToUse: 'Para montar itens de lista, cards ou mensagens a partir de dados, com segurança (sem `innerHTML`).',
      syntax: code`
const el = document.createElement('tag')

pai.append(el)  // vira o último filho
pai.prepend(el) // vira o primeiro filho
ref.before(el)  // entra antes de ref
ref.after(el)   // entra depois de ref
`,
      examples: [
        {
          caption: 'Adicionar um item à lista',
          code: code`
const lista = document.querySelector('#tarefas')

function adicionarTarefa(texto) {
  const item = document.createElement('li')
  item.textContent = texto
  item.classList.add('tarefa')
  lista.append(item)
}

adicionarTarefa('Estudar DOM')
`,
        },
        {
          caption: 'append aceita vários itens, inclusive texto',
          code: code`
const aviso = document.createElement('p')
const forte = document.createElement('strong')
forte.textContent = 'Atenção:'

aviso.append(forte, ' salve antes de sair.')
document.body.append(aviso)
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Um elemento criado só aparece na tela depois de ser inserido no documento.' },
        {
          kind: 'warning',
          text: 'Inserir um elemento que já está na página move ele de lugar; não cria uma cópia. Para copiar, use `cloneNode(true)`.',
        },
        { kind: 'tip', text: '`append` aceita vários elementos e strings; o antigo `appendChild` aceita só um nó.' },
        {
          kind: 'tip',
          text: 'Para inserir HTML pronto numa posição: `el.insertAdjacentHTML("beforeend", html)`, com o mesmo cuidado de segurança do `innerHTML`.',
        },
      ],
      tags: ['createElement', 'append', 'inserir'],
      relatedIds: ['dom-remove-replace', 'dom-template-fragment', 'dom-text-html'],
    },
    {
      id: 'dom-remove-replace',
      slug: 'remove-replace-clone',
      technologyId: 'dom',
      categoryId: 'dom-creation',
      title: 'remove, replaceWith e cloneNode',
      description: 'Removem, substituem e copiam elementos que já estão na página.',
      whenToUse: 'Para excluir itens de uma lista, trocar um conteúdo por outro ou duplicar um modelo.',
      syntax: code`
el.remove()                 // tira da página
el.replaceWith(novo)        // troca por outro elemento
el.cloneNode(true)          // cópia com todos os filhos
pai.replaceChildren(...nos) // troca todos os filhos
`,
      examples: [
        {
          caption: 'Casos comuns',
          code: code`
// Remover o item do botão clicado
botao.closest('li').remove()

// Trocar o "carregando..." pelo conteúdo real
const carregando = document.querySelector('.carregando')
const conteudo = document.createElement('section')
conteudo.textContent = 'Pronto!'
carregando.replaceWith(conteudo)

// Esvaziar uma lista
lista.replaceChildren()
`,
        },
      ],
      tips: [
        { kind: 'tip', text: '`cloneNode(false)` copia só o elemento, sem os filhos.' },
        { kind: 'warning', text: '`cloneNode` não copia os eventos registrados com `addEventListener`.' },
        {
          kind: 'tip',
          text: 'Um elemento removido continua em memória enquanto alguma variável apontar para ele, e pode ser inserido de novo.',
        },
      ],
      tags: ['remover', 'substituir', 'clonar'],
      relatedIds: ['dom-create-append'],
    },
    {
      id: 'dom-template-fragment',
      slug: 'template-e-fragment',
      technologyId: 'dom',
      categoryId: 'dom-creation',
      title: '<template> e DocumentFragment',
      description:
        'O `<template>` guarda HTML que não é exibido, pronto para ser clonado. O `DocumentFragment` agrupa vários elementos para inseri-los de uma vez.',
      whenToUse:
        'Para renderizar listas grandes ou blocos repetidos com uma estrutura HTML legível, sem montar tudo com `createElement`.',
      syntax: code`
const modelo = document.querySelector('#modelo')
const copia = modelo.content.cloneNode(true)

const fragmento = document.createDocumentFragment()
fragmento.append(el1, el2)
pai.append(fragmento) // insere tudo de uma vez
`,
      examples: [
        {
          caption: 'HTML com o modelo',
          language: 'html',
          code: code`
<template id="modelo-card">
  <article class="card">
    <h3 class="card-titulo"></h3>
    <p class="card-texto"></p>
  </article>
</template>

<div id="cards"></div>
`,
        },
        {
          caption: 'Preenchendo cards a partir de dados',
          code: code`
const modelo = document.querySelector('#modelo-card')
const destino = document.querySelector('#cards')
const fragmento = document.createDocumentFragment()

const dados = [
  { titulo: 'map()', texto: 'Transforma itens' },
  { titulo: 'filter()', texto: 'Seleciona itens' },
]

for (const item of dados) {
  const card = modelo.content.cloneNode(true)
  card.querySelector('.card-titulo').textContent = item.titulo
  card.querySelector('.card-texto').textContent = item.texto
  fragmento.append(card)
}

destino.append(fragmento)
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Inserir um fragmento faz o navegador recalcular o layout uma vez só, em vez de uma vez por item.',
        },
        { kind: 'tip', text: 'O conteúdo do `<template>` fica em `.content`, não nos filhos diretos do elemento.' },
        { kind: 'warning', text: 'Depois de inserido, o fragmento fica vazio: os filhos dele foram movidos para a página.' },
      ],
      tags: ['template', 'fragment', 'desempenho'],
      relatedIds: ['dom-create-append', 'dom-text-html'],
    },

    // ── Eventos ────────────────────────────────────────────────────────────
    {
      id: 'dom-add-event-listener',
      slug: 'addeventlistener',
      technologyId: 'dom',
      categoryId: 'dom-events',
      title: 'addEventListener',
      description:
        'Registra uma função que é chamada sempre que um evento acontece num elemento: clique, tecla, envio de formulário…',
      whenToUse:
        'Para qualquer interação. Prefira `addEventListener` ao atributo `onclick` no HTML: separa estrutura e comportamento e permite vários ouvintes.',
      syntax: code`
el.addEventListener('evento', funcao, opcoes)
el.removeEventListener('evento', funcao)

// Opções úteis
{ once: true }    // roda uma vez e se remove
{ passive: true } // promete não chamar preventDefault (scroll mais fluido)
{ signal }        // remove ao chamar controller.abort()
`,
      examples: [
        {
          caption: 'Contador de cliques',
          code: code`
const botao = document.querySelector('#curtir')
let curtidas = 0

botao.addEventListener('click', () => {
  curtidas++
  botao.textContent = \`Curtidas: \${curtidas}\`
})
`,
        },
        {
          caption: 'Remover vários ouvintes de uma vez com AbortController',
          code: code`
const controller = new AbortController()

window.addEventListener('resize', atualizar, { signal: controller.signal })
window.addEventListener('scroll', atualizar, { signal: controller.signal })

// Mais tarde: remove os dois
controller.abort()
`,
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: 'Passar a função já executada: `addEventListener("click", salvar())` chama `salvar` na hora e registra o retorno dela. O certo é `salvar`, sem parênteses.',
        },
        {
          kind: 'warning',
          text: 'Para o `removeEventListener` funcionar, a função precisa ser a mesma referência. Uma arrow function escrita direto no `addEventListener` não pode ser removida assim.',
        },
        {
          kind: 'tip',
          text: 'Eventos comuns: `click`, `input`, `change`, `submit`, `keydown`, `focus`, `blur`, `scroll` e `resize`.',
        },
      ],
      tags: ['eventos', 'click', 'listener'],
      relatedIds: ['dom-event-object', 'dom-event-delegation'],
    },
    {
      id: 'dom-event-object',
      slug: 'objeto-event',
      technologyId: 'dom',
      categoryId: 'dom-events',
      title: 'O objeto event',
      description:
        'O ouvinte recebe um objeto com os detalhes do evento: quem o disparou, qual tecla, a posição do mouse e métodos para controlar o comportamento.',
      whenToUse:
        'Sempre que precisar saber onde ou como o evento aconteceu, ou impedir o comportamento padrão do navegador.',
      syntax: code`
el.addEventListener('click', (event) => {
  event.target            // elemento onde o evento começou
  event.currentTarget     // elemento que tem o ouvinte
  event.preventDefault()  // cancela a ação padrão
  event.stopPropagation() // impede que o evento suba aos pais
})
`,
      examples: [
        {
          caption: 'Impedir que um link navegue',
          code: code`
document.querySelector('a.abrir-modal').addEventListener('click', (event) => {
  event.preventDefault()
  abrirModal()
})
`,
        },
        {
          caption: 'HTML do próximo exemplo',
          language: 'html',
          code: code`
<button id="btn"><span>★</span> Salvar</button>
`,
        },
        {
          caption: 'target e currentTarget (clicando na estrela)',
          code: code`
document.querySelector('#btn').addEventListener('click', (event) => {
  console.log(event.target.tagName)        // onde o clique caiu
  console.log(event.currentTarget.tagName) // onde está o ouvinte
})
`,
          output: 'SPAN\nBUTTON',
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Eventos "sobem" (bubbling): um clique no `<span>` também dispara os ouvintes do botão, do card e do `document`.',
        },
        {
          kind: 'warning',
          text: 'Evite `stopPropagation` sem necessidade: ele pode quebrar outros códigos que dependem do evento subir, como menus que fecham ao clicar fora.',
        },
        {
          kind: 'tip',
          text: 'Em ouvintes com `function`, `this` é igual a `currentTarget`; em arrow functions, não. Prefira `event.currentTarget`.',
        },
      ],
      tags: ['event', 'preventDefault', 'bubbling'],
      relatedIds: ['dom-add-event-listener', 'dom-event-delegation'],
    },
    {
      id: 'dom-event-delegation',
      slug: 'delegacao-de-eventos',
      technologyId: 'dom',
      categoryId: 'dom-events',
      title: 'Delegação de eventos',
      description:
        'Em vez de um ouvinte por item, coloca-se um só no elemento pai e descobre-se qual filho foi clicado com `event.target`.',
      whenToUse:
        'Em listas com muitos itens ou com itens criados dinamicamente: os itens novos funcionam sem registrar nada.',
      syntax: code`
pai.addEventListener('click', (event) => {
  const item = event.target.closest('.item')
  if (!item) return // o clique não foi num item
  // trata o item
})
`,
      examples: [
        {
          caption: 'HTML',
          language: 'html',
          code: code`
<ul id="tarefas">
  <li>
    Estudar DOM
    <button data-acao="concluir">✓</button>
    <button data-acao="excluir">✗</button>
  </li>
</ul>
`,
        },
        {
          caption: 'Um ouvinte para a lista inteira',
          code: code`
const lista = document.querySelector('#tarefas')

lista.addEventListener('click', (event) => {
  const botao = event.target.closest('button[data-acao]')
  if (!botao) return

  const tarefa = botao.closest('li')
  if (botao.dataset.acao === 'excluir') tarefa.remove()
  if (botao.dataset.acao === 'concluir') tarefa.classList.toggle('feita')
})
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Funciona porque os eventos sobem (bubbling) do filho clicado até o pai.' },
        {
          kind: 'mistake',
          text: 'Usar só `event.target` sem `closest`: se o botão tiver um ícone dentro, o `target` será o ícone e a verificação falha.',
        },
        {
          kind: 'warning',
          text: 'Alguns eventos não sobem, como `focus` e `blur`. Para delegar, use `focusin` e `focusout`.',
        },
      ],
      tags: ['delegação', 'eventos', 'bubbling'],
      relatedIds: ['dom-event-object', 'dom-closest-matches'],
    },
    {
      id: 'dom-keyboard',
      slug: 'eventos-de-teclado',
      technologyId: 'dom',
      categoryId: 'dom-events',
      title: 'Eventos de teclado',
      description:
        '`keydown` dispara quando uma tecla é pressionada. `event.key` diz qual tecla ou caractere; `event.code`, a posição física no teclado.',
      whenToUse: 'Para atalhos (Ctrl+K, Esc para fechar), navegação com as setas e ações ao apertar Enter num campo.',
      syntax: code`
document.addEventListener('keydown', (event) => {
  event.key     // "a", "Enter", "Escape", "ArrowDown"
  event.code    // "KeyA", "Enter", "Escape"
  event.ctrlKey // Ctrl pressionado? (metaKey = Cmd no Mac)
  event.shiftKey
  event.altKey
})
`,
      examples: [
        {
          caption: 'Atalho Ctrl+K e Esc',
          code: code`
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault() // impede o atalho do navegador
    abrirBusca()
  }

  if (event.key === 'Escape') fecharBusca()
})
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Use `key` para o significado da tecla (respeita o layout do teclado) e `code` quando a posição importa, como WASD em jogos.',
        },
        { kind: 'mistake', text: 'Usar o evento `keypress` ou `event.keyCode`: os dois estão obsoletos.' },
        {
          kind: 'warning',
          text: 'Ignore atalhos de uma letra quando o usuário está digitando: confira se o `event.target` é um `input` ou `textarea`.',
        },
      ],
      tags: ['teclado', 'atalhos', 'keydown'],
      relatedIds: ['dom-add-event-listener'],
    },

    // ── Formulários ────────────────────────────────────────────────────────
    {
      id: 'dom-form-values',
      slug: 'ler-e-enviar',
      technologyId: 'dom',
      categoryId: 'dom-forms',
      title: 'Ler e enviar formulários',
      description:
        'O evento `submit` captura o envio, e o `FormData` lê todos os campos de uma vez pelo atributo `name`.',
      whenToUse: 'Em qualquer formulário tratado com JavaScript: login, busca, cadastro, filtros.',
      syntax: code`
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const dados = Object.fromEntries(new FormData(form))
})

input.value      // texto do campo
checkbox.checked // true ou false
select.value     // opção escolhida
`,
      examples: [
        {
          caption: 'HTML',
          language: 'html',
          code: code`
<form id="cadastro">
  <input name="nome" required />
  <input name="email" type="email" required />
  <label><input name="newsletter" type="checkbox" /> Quero novidades</label>
  <button>Enviar</button>
</form>
`,
        },
        {
          caption: 'Lendo tudo com FormData',
          code: code`
const form = document.querySelector('#cadastro')

form.addEventListener('submit', (event) => {
  event.preventDefault() // não recarrega a página
  const dados = Object.fromEntries(new FormData(form))
  console.log(dados)
})
`,
          output: "{ nome: 'Ana', email: 'ana@email.com', newsletter: 'on' }",
        },
        {
          caption: 'Reagir enquanto o usuário digita',
          code: code`
const busca = document.querySelector('#busca')

busca.addEventListener('input', () => {
  filtrar(busca.value.trim())
})
`,
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: 'Ouvir o `click` do botão em vez do `submit` do formulário: o envio com Enter deixa de funcionar.',
        },
        {
          kind: 'warning',
          text: 'Campos sem o atributo `name` não entram no `FormData`. Um checkbox desmarcado também não aparece.',
        },
        {
          kind: 'tip',
          text: '`input` dispara a cada tecla; `change` dispara quando o campo perde o foco ou a opção muda.',
        },
        { kind: 'tip', text: '`form.reset()` volta todos os campos aos valores iniciais.' },
      ],
      tags: ['formulários', 'formdata', 'submit'],
      relatedIds: ['dom-form-validation', 'dom-event-object'],
    },
    {
      id: 'dom-form-validation',
      slug: 'validacao',
      technologyId: 'dom',
      categoryId: 'dom-forms',
      title: 'Validação nativa',
      description:
        'Atributos como `required`, `type="email"` e `minlength` validam campos sem JavaScript. A API de validação permite checar e personalizar as mensagens.',
      whenToUse:
        'Antes de escrever validação manual: o navegador já cuida de campos obrigatórios, formatos e limites, com acessibilidade incluída.',
      syntax: code`
form.checkValidity()        // true se tudo estiver válido
form.reportValidity()       // valida e mostra as mensagens
input.validity.valueMissing // detalhe do erro
input.setCustomValidity('mensagem') // erro personalizado
input.setCustomValidity('')         // limpa o erro
`,
      examples: [
        {
          caption: 'HTML',
          language: 'html',
          code: code`
<form id="conta">
  <input id="senha" type="password" minlength="8" required />
  <input id="confirmar" type="password" required />
  <button>Criar conta</button>
</form>
`,
        },
        {
          caption: 'Regra personalizada: senhas iguais',
          code: code`
const senha = document.querySelector('#senha')
const confirmar = document.querySelector('#confirmar')

confirmar.addEventListener('input', () => {
  const iguais = confirmar.value === senha.value
  confirmar.setCustomValidity(iguais ? '' : 'As senhas não conferem')
})
`,
        },
        {
          caption: 'Destacar só depois que o usuário mexeu no campo',
          language: 'css',
          code: code`
input:user-invalid {
  border-color: crimson;
}
`,
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: 'Esquecer de limpar com `setCustomValidity("")`: o campo continua inválido para sempre.',
        },
        {
          kind: 'tip',
          text: 'O atributo `novalidate` no `<form>` desliga as mensagens nativas, útil quando você exibe as suas.',
        },
        {
          kind: 'warning',
          text: 'A validação no navegador é para a experiência do usuário; o servidor sempre precisa validar de novo.',
        },
      ],
      tags: ['validação', 'formulários', 'required'],
      relatedIds: ['dom-form-values'],
    },

    // ── Carregamento e observadores ────────────────────────────────────────
    {
      id: 'dom-ready',
      slug: 'dom-pronto',
      technologyId: 'dom',
      categoryId: 'dom-lifecycle',
      title: 'Quando o DOM está pronto',
      description:
        'Um script só encontra elementos que o navegador já leu. O atributo `defer` e o evento `DOMContentLoaded` garantem que a página inteira já existe.',
      whenToUse:
        'Sempre que um script acessa elementos da página. É a causa mais comum de `querySelector` retornando `null`.',
      syntax: code`
document.addEventListener('DOMContentLoaded', () => {
  // HTML pronto (imagens podem ainda estar carregando)
})

window.addEventListener('load', () => {
  // tudo carregado, inclusive imagens
})
`,
      examples: [
        {
          caption: 'A forma recomendada: defer',
          language: 'html',
          code: code`
<head>
  <script src="app.js" defer></script>
</head>
`,
        },
        {
          caption: 'Módulos também esperam o HTML',
          language: 'html',
          code: code`
<script type="module" src="main.js"></script>
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Com `defer` ou `type="module"`, o script roda depois que o HTML foi lido e não trava o carregamento. Na maioria dos casos, você nem precisa do `DOMContentLoaded`.',
        },
        {
          kind: 'mistake',
          text: 'Colocar `<script src="app.js">` no `<head>` sem `defer`: o script roda antes de o `<body>` existir e todo `querySelector` retorna `null`.',
        },
        { kind: 'tip', text: '`load` espera imagens e estilos; use-o só quando precisar das dimensões finais.' },
      ],
      tags: ['carregamento', 'defer', 'domcontentloaded'],
      relatedIds: ['dom-query-selector'],
    },
    {
      id: 'dom-dimensions-scroll',
      slug: 'tamanho-posicao-scroll',
      technologyId: 'dom',
      categoryId: 'dom-lifecycle',
      title: 'Tamanho, posição e scroll',
      description:
        '`getBoundingClientRect` informa o tamanho e a posição de um elemento na tela. `scrollIntoView` e `scrollTo` rolam a página até um ponto.',
      whenToUse:
        'Para posicionar tooltips e menus, criar um botão "voltar ao topo" e levar o usuário até uma seção.',
      syntax: code`
const r = el.getBoundingClientRect()
r.top, r.left, r.width, r.height // relativos à área visível

el.scrollIntoView({ behavior: 'smooth', block: 'start' })
window.scrollTo({ top: 0, behavior: 'smooth' })
window.scrollY // quanto a página já rolou
`,
      examples: [
        {
          caption: 'Botão "voltar ao topo"',
          code: code`
const topo = document.querySelector('#voltar-topo')

window.addEventListener(
  'scroll',
  () => {
    topo.hidden = window.scrollY < 400
  },
  { passive: true },
)

topo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
`,
        },
        {
          caption: 'Levar o usuário até o primeiro erro',
          code: code`
document
  .querySelector('.campo-invalido')
  ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
`,
        },
      ],
      tips: [
        {
          kind: 'tip',
          text: 'Os valores de `getBoundingClientRect` mudam com o scroll. Para a posição na página inteira, some `window.scrollY` ao `top`.',
        },
        {
          kind: 'warning',
          text: 'Ler medidas logo depois de alterar estilos força o navegador a recalcular o layout. Em laços, leia tudo primeiro e altere depois.',
        },
        {
          kind: 'tip',
          text: 'Para saber se algo entrou na tela, prefira o `IntersectionObserver` a ouvir o evento `scroll`.',
        },
      ],
      tags: ['scroll', 'posição', 'dimensões'],
      relatedIds: ['dom-intersection-observer'],
    },
    {
      id: 'dom-intersection-observer',
      slug: 'intersectionobserver',
      technologyId: 'dom',
      categoryId: 'dom-lifecycle',
      title: 'IntersectionObserver',
      description:
        'Avisa quando um elemento entra ou sai da área visível da tela, sem precisar ouvir o evento de scroll.',
      whenToUse:
        'Para carregar conteúdo só quando ele aparece (lazy loading), rolagem infinita, animações ao entrar na tela e destacar a seção atual de um menu.',
      syntax: code`
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting // está visível?
    entry.target         // elemento observado
  })
}, { rootMargin: '0px', threshold: 0.1 })

observer.observe(elemento)
observer.unobserve(elemento)
observer.disconnect()
`,
      examples: [
        {
          caption: 'Animar elementos quando aparecem',
          code: code`
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel')
        observer.unobserve(entry.target) // anima uma vez só
      }
    }
  },
  { threshold: 0.2 },
)

document.querySelectorAll('.revelar').forEach((el) => observer.observe(el))
`,
        },
        {
          caption: 'Rolagem infinita',
          code: code`
const sentinela = document.querySelector('#fim-da-lista')

new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) carregarMaisItens()
  },
  { rootMargin: '200px' },
).observe(sentinela)
`,
        },
      ],
      tips: [
        { kind: 'tip', text: '`threshold: 0.2` dispara quando 20% do elemento está visível.' },
        {
          kind: 'tip',
          text: '`rootMargin: "200px"` antecipa o aviso em 200px, bom para carregar conteúdo antes de o usuário chegar lá.',
        },
        {
          kind: 'tip',
          text: 'Para imagens, o atributo `loading="lazy"` no `<img>` já faz o carregamento sob demanda sem JavaScript.',
        },
      ],
      tags: ['observer', 'scroll', 'lazy loading'],
      relatedIds: ['dom-dimensions-scroll'],
    },
  ],
}
