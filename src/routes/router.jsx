import { createBrowserRouter, Navigate } from 'react-router-dom'
import React, { Suspense } from 'react'
import { ProtectedRoute } from './ProtectedRoute'

// Layout
import App from '@/app/App'

// Lazy Components
const MainContainer = React.lazy(() => import('@/components/MainContainer/MainContainer'))
const Login = React.lazy(() => import('@/routes/Login/Login'))
const Register = React.lazy(() => import('@/routes/Register/Register'))
const ForgotPassword = React.lazy(() => import('@/routes/ForgotPassword/ForgotPassword'))
const AdminPanel = React.lazy(() => import('@/routes/AdminPanel/AdminPanel'))
const Finance = React.lazy(() => import('@/routes/AdminPanel/Finance/Finance'))
const UserArea = React.lazy(() => import('@/routes/UserArea/UserArea'))

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
        path: '/forgot-password',
        element: (
          <Suspense fallback={<Loading />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: '/admin',
        element: <Navigate to="/admin-panel" replace />,
      },
      {
        path: '/admin-panel',
        element: (
          <ProtectedRoute allowedLevels={[1, 2, 3, 4]}>
            <Suspense fallback={<Loading />}>
              <AdminPanel />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/finance',
        element: (
          <ProtectedRoute allowedLevels={[2, 3, 4]}>
            <Suspense fallback={<Loading />}>
              <Finance />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/user-area',
        element: (
          <ProtectedRoute allowedLevels={[0]}>
            <Suspense fallback={<Loading />}>
              <UserArea />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
])
