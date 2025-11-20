// COMPONENTS IMPORT
import { Logotipo } from '../../components/Logo/Logotipo.jsx'


// REACT ICONS IMPORT
import { IoMdArrowDropdownCircle } from "react-icons/io"


// CSS IMPORT
import {Container} from './HomeCss.js'

// IMAGE IMPORT
import logo from "../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png"
import video from '../../assets/jiu-jitsu-video.mp4'

export function Home() {
  return (
    <Container>
      <video src={video} autoPlay muted loop></video>
      <div id="background-video">
      </div>
      <div className="content" id="home">
        <div id="logo-container">
          <Logotipo logotipo={logo} />
          {/* <h2 id='title-logo'>Montanha Top Team</h2> */}
        </div>
        <h2 className="phrase"> &quot;Para muitos o chão é o fim, para nós é só o começo.&quot;</h2>
        <div className="content-header">
          <h4 className="services">Jiu-Jitsu para competição |</h4>
          <h4 className="services"> Defesa Pessoal | Defesa Funcional</h4>
          <h4 className="services">Crianças | Jovens | Adultos</h4>
        </div>
        <div className="btn-controller">
          <button><a href="/register">Junt-se a Nós!</a></button>
        </div>
        <div className="arrow-content">
          <div id='border'>
            <a href="#about"><IoMdArrowDropdownCircle id='arrow' /></a>
          </div>
        </div>
      </div>
    </Container>
  )
}