import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// REACT ROUTER DOM IMPORTS
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

// CSS IMPORTS
import './index.css'

// COMPONENTS IMPORTS
import App from './app/App'

// ROUTES COMPONENTS IMPORTS
import { Login } from './routes/Login/Login'
import { Register } from './routes/Register/Register'
import { MainContainer } from './components/MainContainer/MainContainer'
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
          element: <Navigate to="/home" />,
        },
        {
          path: '/home',
          element: <MainContainer />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
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
