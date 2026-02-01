import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import '@/assets/fonts/fonts.css'
import { StateMenuContextProvider } from '@/context/StateMenuContext'
import { SchoolContextProvider } from '@/context/SchoolContext'
import { AuthContextProvider } from '@/context/AuthContext'
import { router } from '@/routes/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateMenuContextProvider>
      <SchoolContextProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </SchoolContextProvider>
    </StateMenuContextProvider>
  </StrictMode>,
)
