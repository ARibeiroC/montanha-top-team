import {Outlet} from 'react-router-dom'

import { Header } from '../shared/ui/Header/Header.jsx'
import { Footer } from '../shared/ui/Footer/Footer.jsx'
import { Container } from './AppCSS.js'

function App() {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer/>
    </Container>
  )
}

export default App
