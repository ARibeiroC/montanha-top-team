import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// REACT ROUTER DOM IMPORTS
import { createBrowserRouter, Navigate, Router, RouterProvider } from 'react-router-dom'

// CSS IMPORTS
import './index.css'

// COMPONENTS IMPORTS
import App from './components/App/App'

// ROUTES COMPONENTS IMPORTS
import { MainContainer } from './components/MainContainer/MainContainer'
import { SignUp } from './components/SignUp/SignUp'
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
          element: <Navigate to="/Home" />,
        },
        {
          path: '/Home',
          element: <MainContainer />
        },
        {
          path: '/Login',
          element: <SignUp />
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
