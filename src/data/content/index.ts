import type { TechnologyContent } from '@/types'
import { git } from './git'
import { javascript } from './javascript'
import { sql } from './sql'

/**
 * Lista de todas as tecnologias da biblioteca, na ordem da sidebar.
 * Para adicionar uma tecnologia: crie o arquivo nesta pasta e inclua aqui.
 */
export const contentModules: TechnologyContent[] = [javascript, git, sql]
