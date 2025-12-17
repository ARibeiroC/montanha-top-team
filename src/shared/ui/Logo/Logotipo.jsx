import PropTypes from "prop-types"
import './Logotipo.css'

export function Logotipo({logotipo}){
    return (
        <div className="logotipo-container">
            <img src={logotipo} alt="Logotipo da Marcar" />
        </div>
    )
}

Logotipo.propTypes = {
    logotipo: PropTypes.string.isRequired
}
