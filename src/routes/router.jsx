import { createBrowserRouter, Navigate } from 'react-router-dom'
import React, { Suspense } from 'react'

// Layout
import App from '@/app/App'

// Lazy Components
const MainContainer = React.lazy(() => import('@/components/MainContainer/MainContainer').then(module => ({ default: module.MainContainer })))
const Login = React.lazy(() => import('@/routes/Login/Login').then(module => ({ default: module.Login })))
const Register = React.lazy(() => import('@/routes/Register/Register').then(module => ({ default: module.Register })))
const AdminPanel = React.lazy(() => import('@/routes/AdminPanel/AdminPanel').then(module => ({ default: module.AdminPanel })))

const Loading = () => <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white'}}>Carregando...</div>

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div style={{color: 'white', textAlign: 'center', marginTop: '2rem'}}>404 - Página não encontrada</div>,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: (
          <Suspense fallback={<Loading />}>
            <MainContainer />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: '/admin-panel',
        element: (
          <Suspense fallback={<Loading />}>
            <AdminPanel />
          </Suspense>
        ),
      },
    ],
  },
])
