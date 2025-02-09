import { Link } from "react-router-dom"
import { Container } from "./NavCSS"


export function Navigation({orientation, state}){
    return (
        <Container>
            <div id="navigation" className={`${orientation} ${state}`}>
                <a href="#belt">
                    Página Inicial
                    </a>
                <a href="#about">
                    Sobre nós
                    </a>
                <a href="#team">
                    Equipe
                    </a>
                <Link to={"/"}>
                    Eventos
                </Link>
                <Link to={"/"}>
                    Filiais
                </Link>
                <Link to={"/"}>
                    Horários
                </Link>
                <Link to={"/"}>
                    FAQ's
                </Link>
            </div>
        </Container>
    )
}