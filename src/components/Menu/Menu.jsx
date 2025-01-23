// IMPORT HOOK
import logotipo from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png'
import bandeira_brasil from '../../assets/bandeira-do-brasil.jpg'


// CSS IMPORT
import { Container } from "./MenuCSS"
import { Logotipo } from "./Logo/Logotipo"
import { Navigation } from "./Nav/Navigation"

export function Menu() {
    return (
        <Container>
            <Logotipo logotipo={logotipo}/>
            <Navigation />
            <div className="language">
                <div className="language-dropdown">
                    <img src={bandeira_brasil} alt="" />
                </div>
            </div>
        </Container>
    )
}