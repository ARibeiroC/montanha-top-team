import { Link } from "react-router-dom"
import { Container } from "./NavCSS"

export function Navigation(){
    return (
        <Container>
            <Link to={"/"}>Página Inicial</Link>
            <Link to={"/"}>Sobre nós</Link>
            <Link to={"/"}>Equipe</Link>
            <Link to={"/"}>Eventos</Link>
            <Link to={"/"}>Filiais</Link>
            <Link to={"/"}>Horários</Link>
            <Link to={"/"}>FAQ's</Link>
        </Container>
    )
}