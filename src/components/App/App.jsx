import {Outlet} from 'react-router-dom'

// COMPONENTS IMPORTS
import { Header } from '../Header/Header.jsx'
import { Footer } from '../Footer/Footer.jsx'
// CSS IMPORT
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
