import mestre from "../../assets/mestre-bg-less.png"
import { IoMdArrowDropdown } from "react-icons/io";


// CSS IMPORT
import {Container} from './HomeCss.js'

// IMAGE IMPORT

export function Home() {
  return (
    <Container>
      <div className="content" id="home">
        <div className="content-banner">
          <img src={mestre} alt="Mestre Montanha" />
          <div className="content-left">
            <div className="content-header">
              <h2 className="title">MONTANHA TOP TEAM</h2>
              <p className="subtitle">ESCOLA DE JIU-JITSU</p>
              <h2 className="phrase">"Para muitos o chão é o fim, para nós é só o começo."</h2>
              <h4 className="services">Jiu-Jitsu para competição | Defesa Pessoal | Defesa Funcional</h4>
              <h4 className="services">Crianças | Jovens | Adultos</h4>
            </div>
            <div className="btn-controller">
              <button>Inscrições</button>
            </div>
          </div>
        </div>
        <div className="arrow-content">
          <div>
            <div className="arrow" >
              <a href="#about"><IoMdArrowDropdown /></a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}