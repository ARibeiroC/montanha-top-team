import { useLocation, Link } from 'react-router-dom'
import './Belt.css'

// REACT ICONS IMPORT
import { FaUser, FaHome } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6"

export function Belt(){
    
    const location = useLocation()
    const isHome = location.pathname === '/home'

    return (
        <div className="belt-container">
            <div id="title-site">
                <h1>Montanha Top Team</h1>
            </div>
            <div className="controlls">
                {isHome ? null : <Link to={'/'} id='home'>
                    <FaHome />
                </Link>}
                <Link to={'/login'} id='login'>
                    <FaUser />
                </Link>
                {/* <Link to={'/loja'} id='loja'>
                    <FaCartShopping />
                </Link> */}
            </div>
        </div>
    )
};
