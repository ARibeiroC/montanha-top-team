// REACT HOOKS IMPORT
import { useLocation } from 'react-router-dom'

// CSS IMPORT
import { Container } from './BeltCSS.js'

// REACT ICONS IMPORT
import { FaUser, FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6"

export function Belt(){
    
    const location = useLocation()
    const isHome = location.pathname === '/home'

    return (
        <Container>
            <div id="title-site">
                <h1>Montanha Top Team</h1>
            </div>
            <div className="controlls">
                {isHome ? null : <a href='/' id='home'>
                    <FaHome />
                </a>}
                <a href='#' id='login'>
                    <FaUser />
                </a>
                <a href='#' id='loja'>
                    <FaCartShopping />
                </a>
            </div>
        </Container>
    )
};