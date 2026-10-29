import type { TechnologyContent } from '@/types'
import { arrays } from './arrays'
import { assincrono } from './assincrono'
import { boasPraticas } from './boas-praticas'
import { classes } from './classes'
import { fluxo } from './fluxo'
import { funcoes } from './funcoes'
import { fundamentos } from './fundamentos'
import { navegador } from './navegador'
import { objetos } from './objetos'
import { utilitarios } from './utilitarios'

/**
 * JavaScript tem muitas categorias, então cada uma fica no seu arquivo.
 * A ordem desta lista é a ordem em que as categorias aparecem na tela.
 */
const groups = [fundamentos, arrays, objetos, fluxo, funcoes, assincrono, navegador, classes, utilitarios, boasPraticas]

export const javascript: TechnologyContent = {
  technology: {
    id: 'javascript',
    slug: 'javascript',
    name: 'JavaScript',
    description: 'A linguagem da web: roda no navegador e, com Node.js, no servidor.',
    color: '#f7df1e',
    language: 'javascript',
  },
  categories: groups.map((group, index) => ({ ...group.category, order: index + 1 })),
  sheets: groups.flatMap((group) => group.sheets),
}
