import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/components/layout/AppLayout'
import { CategoryPage } from '@/pages/CategoryPage'
import { ErrorPage } from '@/pages/ErrorPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PalettePage } from '@/pages/PalettePage'
import { SearchPage } from '@/pages/SearchPage'
import { SheetPage } from '@/pages/SheetPage'
import { TechnologyPage } from '@/pages/TechnologyPage'

/**
 * Mapa de URLs da aplicação.
 *
 * A página inicial é a PalettePage, em tela cheia (layout do Claude Design).
 * As demais rotas ficam dentro do AppLayout ("rota de layout"): ele desenha
 * Sidebar e Header, e a página da URL atual aparece no lugar do <Outlet />.
 *
 * Segmentos com ":" são parâmetros. Em /javascript/arrays, por exemplo,
 * techSlug = "javascript" e categorySlug = "arrays".
 */
export const router = createBrowserRouter(
  [
    { index: true, element: <PalettePage />, errorElement: <ErrorPage /> },
    {
      element: <AppLayout />,
      // Erros inesperados em qualquer página caem aqui em vez de deixar a tela em branco.
      errorElement: <ErrorPage />,
      children: [
        { path: 'library', element: <HomePage /> },
        // Rotas fixas têm prioridade sobre parâmetros: /favorites e /search nunca
        // são lidas como uma tecnologia com esse nome.
        { path: 'favorites', element: <FavoritesPage /> },
        { path: 'search', element: <SearchPage /> },
        { path: ':techSlug', element: <TechnologyPage /> },
        { path: ':techSlug/:categorySlug', element: <CategoryPage /> },
        { path: ':techSlug/:categorySlug/:sheetSlug', element: <SheetPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    // Prefixo de todas as rotas: "/HasDevNotes" no GitHub Pages, "/" no dev.
    // BASE_URL vem do `base` do vite.config.ts. Com isso, <Link to="/favorites">
    // vira "/HasDevNotes/favorites" sem mudar nenhum componente.
    basename: import.meta.env.BASE_URL,
  },
)
