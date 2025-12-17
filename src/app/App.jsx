import {Outlet} from 'react-router-dom'

import { Header } from '@/shared/ui/Header/Header.jsx'
import { Footer } from '@/shared/ui/Footer/Footer.jsx'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App
