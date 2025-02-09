import { Container } from "./LogotipoCSS"

export function Logotipo({logotipo}){
    return (
        <Container>
            <img src={logotipo} alt="" />
        </Container>
    )
}