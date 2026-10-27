import { code } from '@/lib/code'
import type { TechnologyContent } from '@/types'

export const sql: TechnologyContent = {
  technology: {
    id: 'sql',
    slug: 'sql',
    name: 'SQL',
    description: 'Linguagem para consultar e manipular bancos de dados relacionais.',
    color: '#4fa3e0',
    language: 'sql',
  },

  categories: [
    {
      id: 'sql-queries',
      slug: 'consultas',
      technologyId: 'sql',
      name: 'Consultas',
      description: 'Selecionar, filtrar e ordenar registros.',
      order: 1,
    },
    {
      id: 'sql-joins',
      slug: 'joins',
      technologyId: 'sql',
      name: 'Junções',
      description: 'Combinar dados de várias tabelas.',
      order: 2,
    },
    {
      id: 'sql-aggregation',
      slug: 'agregacao',
      technologyId: 'sql',
      name: 'Agregação',
      description: 'Contar, somar e agrupar resultados.',
      order: 3,
    },
  ],

  sheets: [
    {
      id: 'sql-select-where',
      slug: 'select-where',
      technologyId: 'sql',
      categoryId: 'sql-queries',
      title: 'SELECT e WHERE',
      description: '`SELECT` escolhe as colunas a retornar; `WHERE` filtra quais linhas entram no resultado.',
      whenToUse: 'Em praticamente toda leitura de dados: é a base de qualquer consulta.',
      syntax: code`
SELECT coluna1, coluna2
FROM tabela
WHERE condicao;
`,
      examples: [
        {
          caption: 'Filtrar com várias condições',
          code: code`
SELECT nome, email
FROM usuarios
WHERE ativo = TRUE
  AND idade >= 18;
`,
        },
        {
          caption: 'Busca parcial em texto',
          code: code`
SELECT titulo
FROM notas
WHERE titulo LIKE '%react%';
`,
        },
      ],
      tips: [
        { kind: 'warning', text: 'Evite `SELECT *` em produção: traga só as colunas necessárias.' },
        {
          kind: 'mistake',
          text: 'Comparar com NULL usando `= NULL`. O correto é `IS NULL` ou `IS NOT NULL`.',
        },
        { kind: 'tip', text: "`IN (...)` substitui vários `OR`: `WHERE status IN ('aberto', 'pendente')`." },
      ],
      tags: ['select', 'where', 'filtro'],
      relatedIds: ['sql-order-limit', 'sql-group-by'],
    },
    {
      id: 'sql-order-limit',
      slug: 'order-by-limit',
      technologyId: 'sql',
      categoryId: 'sql-queries',
      title: 'ORDER BY e LIMIT',
      description: '`ORDER BY` ordena o resultado; `LIMIT` restringe quantas linhas são retornadas.',
      whenToUse: 'Para rankings, listagens paginadas ou para buscar os registros mais recentes.',
      syntax: code`
SELECT colunas
FROM tabela
ORDER BY coluna [ASC | DESC]
LIMIT quantidade OFFSET pular;
`,
      examples: [
        {
          caption: 'As 5 notas mais recentes',
          code: code`
SELECT titulo, criado_em
FROM notas
ORDER BY criado_em DESC
LIMIT 5;
`,
        },
        {
          caption: 'Paginação: página 3, com 10 itens por página',
          code: code`
SELECT *
FROM produtos
ORDER BY id
LIMIT 10 OFFSET 20;
`,
        },
      ],
      tips: [
        { kind: 'tip', text: '`ASC` (crescente) é o padrão quando nada é informado.' },
        {
          kind: 'warning',
          text: 'Sem `ORDER BY` a ordem das linhas não é garantida, e a paginação com `LIMIT` fica imprevisível.',
        },
        { kind: 'tip', text: 'No SQL Server, o equivalente a `LIMIT` é `SELECT TOP n`.' },
      ],
      tags: ['order by', 'limit', 'paginação'],
      relatedIds: ['sql-select-where'],
    },
    {
      id: 'sql-inner-join',
      slug: 'inner-join',
      technologyId: 'sql',
      categoryId: 'sql-joins',
      title: 'INNER JOIN',
      description: 'Combina linhas de duas tabelas, retornando só as que têm correspondência nas duas.',
      whenToUse: 'Quando você precisa de dados relacionados que obrigatoriamente existem nas duas tabelas.',
      syntax: code`
SELECT a.coluna, b.coluna
FROM tabela_a AS a
INNER JOIN tabela_b AS b ON b.a_id = a.id;
`,
      examples: [
        {
          caption: 'Pedidos com o nome do cliente',
          code: code`
SELECT p.id, p.total, c.nome
FROM pedidos AS p
INNER JOIN clientes AS c ON c.id = p.cliente_id;
`,
        },
      ],
      tips: [
        { kind: 'tip', text: 'Escrever só `JOIN` é o mesmo que `INNER JOIN`.' },
        { kind: 'tip', text: 'Use apelidos curtos (`p`, `c`) para deixar consultas com várias tabelas legíveis.' },
        {
          kind: 'mistake',
          text: 'Esquecer a condição `ON`: o resultado vira a combinação de todas as linhas com todas (produto cartesiano).',
        },
      ],
      tags: ['join', 'relacionamento'],
      relatedIds: ['sql-left-join'],
    },
    {
      id: 'sql-left-join',
      slug: 'left-join',
      technologyId: 'sql',
      categoryId: 'sql-joins',
      title: 'LEFT JOIN',
      description:
        'Retorna todas as linhas da tabela da esquerda e as correspondências da direita. Quando não há correspondência, as colunas da direita vêm como `NULL`.',
      whenToUse: 'Quando o registro principal deve aparecer mesmo sem dados relacionados. Ex.: clientes sem pedidos.',
      syntax: code`
SELECT a.coluna, b.coluna
FROM tabela_a AS a
LEFT JOIN tabela_b AS b ON b.a_id = a.id;
`,
      examples: [
        {
          caption: 'Clientes que nunca fizeram pedidos',
          code: code`
SELECT c.nome
FROM clientes AS c
LEFT JOIN pedidos AS p ON p.cliente_id = c.id
WHERE p.id IS NULL;
`,
        },
      ],
      tips: [
        {
          kind: 'mistake',
          text: "Filtrar a tabela da direita no `WHERE` (ex.: `WHERE p.status = 'pago'`). Isso transforma o `LEFT JOIN` num `INNER JOIN`. Coloque o filtro no `ON`.",
        },
        { kind: 'tip', text: '`RIGHT JOIN` é o espelho do `LEFT JOIN`. Na prática, quase sempre se usa LEFT.' },
      ],
      tags: ['join', 'null', 'relacionamento'],
      relatedIds: ['sql-inner-join'],
    },
    {
      id: 'sql-group-by',
      slug: 'group-by',
      technologyId: 'sql',
      categoryId: 'sql-aggregation',
      title: 'GROUP BY e funções de agregação',
      description: 'Agrupa linhas com o mesmo valor e calcula resumos por grupo: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.',
      whenToUse: 'Para relatórios e métricas, como total de vendas por mês ou quantidade de notas por tecnologia.',
      syntax: code`
SELECT coluna, COUNT(*), SUM(valor)
FROM tabela
GROUP BY coluna
HAVING condicao_sobre_o_grupo;
`,
      examples: [
        {
          caption: 'Total gasto por cliente, apenas acima de 100',
          code: code`
SELECT cliente_id, SUM(total) AS gasto
FROM pedidos
GROUP BY cliente_id
HAVING SUM(total) > 100
ORDER BY gasto DESC;
`,
        },
      ],
      tips: [
        { kind: 'tip', text: '`WHERE` filtra linhas antes de agrupar; `HAVING` filtra os grupos depois.' },
        {
          kind: 'mistake',
          text: 'Selecionar uma coluna que não está no `GROUP BY` nem dentro de uma função de agregação. Isso gera erro na maioria dos bancos.',
        },
        { kind: 'tip', text: '`COUNT(coluna)` ignora `NULL`s; `COUNT(*)` conta todas as linhas.' },
      ],
      tags: ['group by', 'agregação', 'relatório'],
      relatedIds: ['sql-select-where'],
    },
  ],
}
