import type { TechnologyContent } from '@/types'
import { css } from './css'
import { git } from './git'
import { javascript } from './javascript'
import { react } from './react'
import { sql } from './sql'
import { typescript } from './typescript'

/**
 * Lista de todas as tecnologias da biblioteca, na ordem da sidebar.
 * Para adicionar uma tecnologia: crie o arquivo nesta pasta e inclua aqui.
 */
export const contentModules: TechnologyContent[] = [javascript, typescript, react, css, git, sql]
