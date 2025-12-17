import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { StateMenuContextProvider } from '@/context/StateMenuContext'
import { SchoolContextProvider } from '@/context/SchoolContext'
import { router } from '@/routes/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateMenuContextProvider>
      <SchoolContextProvider>
        <RouterProvider router={router} />
      </SchoolContextProvider>
    </StateMenuContextProvider>
  </StrictMode>,
)
