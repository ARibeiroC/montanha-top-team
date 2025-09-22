import {Outlet} from 'react-router-dom'

// COMPONENTS IMPORT
import { Header } from '../Header/Header'
import { Home } from '../../routes/Home/Home.jsx'
import {Footer} from '../Footer/Footer.jsx'
import {About} from '../../routes/About/About.jsx'

// CSS IMPORT
import { Container } from './AppCSS.js'

function App() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default App
