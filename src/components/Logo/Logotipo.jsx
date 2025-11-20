import { Container } from "./LogotipoCSS"

import PropTypes from "prop-types"
export function Logotipo({logotipo}){
    Logotipo.propTypes = {
    logotipo: PropTypes.string.isRequired
    }
    return (
        <Container>
            <img src={logotipo} alt="Logotipo da Marcar" />
        </Container>
    )
}