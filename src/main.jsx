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
import { Login } from './routes/Login/Login'
import { Register } from './routes/Register/Register'
import { StateMenuContextProvider } from './context/StateMenuContext'

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
          index: true,
          path: '/Panel',
          element: <Panel />
        },
        { path: '/Login', 
          element: <Login />
        },
        {
          path: '/Register',
          element: <Register />
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateMenuContextProvider>
      <RouterProvider router={router} />
    </StateMenuContextProvider>
  </StrictMode>,
)
