import { RouterProvider } from 'react-router'
import { FavoritesProvider } from '@/features/favorites/FavoritesProvider'
import { router } from './router'

function App() {
  return (
    // Providers ficam por fora do roteador para que todas as páginas os enxerguem.
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  )
}

export default App
