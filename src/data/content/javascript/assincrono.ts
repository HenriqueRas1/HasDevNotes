import { code } from '@/lib/code'
import type { CategoryContent } from '@/types'

export const assincrono: CategoryContent = {
  category: {
    id: 'js-assincrono',
    slug: 'assincrono',
    technologyId: 'javascript',
    name: 'Assíncrono',
    description: 'Promises, async/await, event loop, timers e requisições HTTP com fetch.',
  },

  sheets: [
    {
      id: 'js-promises-async',
      slug: 'promises-e-async-await',
      technologyId: 'javascript',
      categoryId: 'js-assincrono',
      title: 'Promises e async/await',
      description:
        'Uma Promise representa um valor que chega no futuro. `async`/`await` permite escrever esse código como se fosse sequencial.',
      whenToUse:
        'Para tudo que leva tempo: requisições, leitura de arquivos, timers. Use `Promise.all` para rodar tarefas independentes em paralelo.',
      syntax: code`
async function carregar() {
  try {
    const valor = await tarefa()
  } catch (erro) {
    // rejeição cai aqui
  }
}

await Promise.all([t1(), t2()])        // todas; falha na primeira rejeição
await Promise.allSettled([t1(), t2()]) // todas, com o estado de cada
await Promise.race([t1(), t2()])       // a primeira a terminar
await Promise.any([t1(), t2()])        // a primeira a dar certo

tarefa().then(usar).catch(tratar).finally(limpar)
`,
      examples: [
        {
          caption: 'await e Promise.all',
          code: code`
async function dobro(n) {
  return n * 2
}

const valor = await dobro(3)
const ambos = await Promise.all([dobro(2), dobro(5)])
console.log(valor, ambos)
`,
          output: '6 [4, 10]',
        },
        {
          caption: 'allSettled não para na primeira falha',
          code: code`
const estados = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error('falha')),
])

console.log(estados.map((e) => e.status))
`,
          output: "['fulfilled', 'rejected']",
        },
      ],
      tips: [
        { kind: 'tip', text: 'Uma função `async` sempre devolve uma Promise, mesmo quando o `return` é um valor simples.' },
        { kind: 'tip', text: 'Uma Promise está em um de três estados: pending (esperando), fulfilled (cumprida) ou rejected (rejeitada).' },
        {
          kind: 'tip',
          text: 'Para itens independentes, `await Promise.all(itens.map(tarefa))` é bem mais rápido que um `await` por vez.',
        },
        { kind: 'warning', text: '`await` só funciona dentro de funções `async` ou no topo de um módulo ES.' },
        { kind: 'mistake', text: 'Esquecer o `await`: a variável recebe a Promise, não o valor, e erros passam sem tratamento.' },
      ],
      tags: ['promise', 'async', 'await', 'assíncrono'],
      relatedIds: ['js-event-loop', 'js-fetch', 'js-erros'],
    },
    {
      id: 'js-event-loop',
      slug: 'event-loop',
      technologyId: 'javascript',
      categoryId: 'js-assincrono',
      title: 'Event loop e temporizadores',
      description:
        'O JavaScript roda uma coisa por vez. O event loop executa o código síncrono, depois as microtarefas (Promises) e só então as tarefas como timers.',
      whenToUse:
        'Para entender a ordem em que o código assíncrono roda, criar atrasos com `setTimeout` e evitar travar a interface.',
      syntax: code`
const id = setTimeout(fn, ms)    // roda uma vez depois de ms (no mínimo)
clearTimeout(id)

const id2 = setInterval(fn, ms)  // repete a cada ms
clearInterval(id2)

// esperar com await
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
await esperar(500)
`,
      examples: [
        {
          caption: 'Ordem de execução',
          code: code`
console.log('A')
setTimeout(() => console.log('D'), 0)
Promise.resolve().then(() => console.log('C'))
console.log('B')
`,
          output: 'A\nB\nC\nD',
        },
        {
          caption: 'Uma pausa com await',
          code: code`
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function rodar() {
  console.log('Antes')
  await esperar(50)
  console.log('Depois')
}

await rodar()
`,
          output: 'Antes\nDepois',
        },
      ],
      tips: [
        { kind: 'tip', text: '`await` libera a execução para outras tarefas: não bloqueia a página.' },
        { kind: 'tip', text: 'O atraso do `setTimeout` é mínimo, não exato: ele espera o código atual e as microtarefas terminarem.' },
        {
          kind: 'warning',
          text: 'Cálculos pesados travam a interface mesmo dentro de funções `async`. Divida o trabalho ou use Web Workers.',
        },
        { kind: 'mistake', text: 'Esquecer o `clearInterval`: o intervalo continua rodando depois que a tela ou o componente saiu.' },
      ],
      tags: ['event loop', 'settimeout', 'microtarefa'],
      relatedIds: ['js-promises-async'],
    },
    {
      id: 'js-fetch',
      slug: 'fetch',
      technologyId: 'javascript',
      categoryId: 'js-assincrono',
      title: 'Fetch e erros HTTP',
      description: '`fetch` faz requisições HTTP e devolve uma Promise com a resposta. O corpo é lido com `json()`, `text()` ou `blob()`.',
      whenToUse: 'Para buscar dados de uma API no navegador ou no Node.js (18 ou superior).',
      syntax: code`
const res = await fetch(url)
res.ok        // true para status 200-299
res.status    // 200, 404, 500…
const dados = await res.json()   // ou res.text(), res.blob()
`,
      examples: [
        {
          caption: 'Buscar com tratamento de erro',
          code: code`
async function carregarUser() {
  const res = await fetch('/api/user')
  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}\`)
  }
  if (res.status === 204) return null // sem corpo
  return res.json()
}

try {
  const user = await carregarUser()
  console.log(user)
} catch (erro) {
  console.error('Falha ao carregar', erro)
}
`,
        },
        {
          caption: 'Montar a query string com URLSearchParams',
          code: code`
const params = new URLSearchParams({ busca: 'café com leite', pagina: 2 })
console.log(\`/api/produtos?\${params}\`)
`,
          output: '/api/produtos?busca=caf%C3%A9+com+leite&pagina=2',
        },
      ],
      tips: [
        { kind: 'tip', text: '`json()` também é assíncrono e pode falhar se a resposta não for um JSON válido.' },
        { kind: 'tip', text: 'O corpo só pode ser lido uma vez: escolha entre `json()`, `text()` e `blob()`.' },
        {
          kind: 'warning',
          text: '`fetch` não rejeita em 404 ou 500: confira `res.ok`. Ele só rejeita em falha de rede ou cancelamento.',
        },
        { kind: 'mistake', text: 'Chamar `res.json()` numa resposta 204 (No Content): não há corpo e o parse falha.' },
      ],
      tags: ['fetch', 'http', 'api', 'json'],
      relatedIds: ['js-http-post', 'js-promises-async', 'js-erros'],
    },
    {
      id: 'js-http-post',
      slug: 'post-e-cancelamento',
      technologyId: 'javascript',
      categoryId: 'js-assincrono',
      title: 'POST e cancelamento',
      description:
        'Enviar dados com `fetch` usando `method`, `headers` e `body`, e cancelar requisições com `AbortController`.',
      whenToUse: 'Para criar e alterar dados numa API e para desistir de requisições lentas ou que não importam mais.',
      syntax: code`
await fetch(url, {
  method: 'POST',                         // GET, POST, PUT, PATCH, DELETE
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dados),
  signal: controller.signal,              // permite cancelar
})

const controller = new AbortController()
controller.abort()                        // cancela
AbortSignal.timeout(5000)                 // sinal que cancela sozinho
`,
      examples: [
        {
          caption: 'POST com timeout de 5 segundos',
          code: code`
try {
  const res = await fetch('/api/itens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: 'Caderno' }),
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  console.log(await res.json())
} catch (erro) {
  if (erro.name === 'TimeoutError') console.log('Demorou demais')
  else console.error(erro)
}
`,
        },
        {
          caption: 'Cancelar a busca anterior ao digitar',
          code: code`
let controller

async function buscar(termo) {
  controller?.abort() // cancela a requisição anterior
  controller = new AbortController()

  try {
    const res = await fetch(\`/api/busca?q=\${encodeURIComponent(termo)}\`, {
      signal: controller.signal,
    })
    return await res.json()
  } catch (erro) {
    if (erro.name !== 'AbortError') throw erro
  }
}
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'GET lê, POST cria, PUT substitui, PATCH altera parte e DELETE remove.' },
        {
          kind: 'warning',
          text: 'CORS é decidido pelo servidor. O modo `no-cors` não libera a leitura da resposta.',
        },
        {
          kind: 'warning',
          text: 'Cancelar não desfaz o que o servidor já processou: um POST cancelado pode ter sido salvo.',
        },
        { kind: 'mistake', text: 'Mandar um objeto direto no `body`: ele precisa virar texto com `JSON.stringify`.' },
      ],
      tags: ['fetch', 'post', 'abortcontroller', 'http'],
      relatedIds: ['js-fetch', 'js-json-storage'],
    },
  ],
}
