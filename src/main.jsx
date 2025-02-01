import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// REACT ROUTER DOM IMPORTS
import { createBrowserRouter, Navigate, Router, RouterProvider } from 'react-router-dom'

// CSS IMPORTS
import './index.css'

// COMPONENTS IMPORTS
import App from './components/App/App'

// ROUTES COMPONENTS IMPORTS
import { Panel } from './routes/Panel/Panel'
import { Home } from './routes/Home/Home'

// CREATING BROWSER ROUTER
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <div>404 Not Found</div>,
      children: [
        {
          path: '/',
          element: <Navigate to="/Panel" />,
        },
        {
          path: '/Panel',
          element: <Panel />
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
