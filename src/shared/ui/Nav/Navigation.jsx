import { Container } from "./NavCSS"
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa"
import { FaUserGroup } from "react-icons/fa6"
import { FaCalendarAlt } from "react-icons/fa"
import { useLocation } from "react-router-dom"

export function Navigation(){
    const location = useLocation()
    const isHome = location.pathname === '/home'

    return (
        <Container className={isHome ? 'show' : 'hide'}>
            <nav>
                <ul>
                    <li>
                        <a href={isHome ? '#' : '/'}>
                            <FaHome />
                            <p>Home</p>
                        </a>
                    </li>
                    <li>
                        <a href={isHome ? '#about' : '/home#about'}>
                            <FaInfoCircle />
                            <p>Quem somos</p>
                        </a>
                    </li>
                    <li>
                        <a href={isHome ? '#team' : '/home#team'}>
                            <FaUserGroup />
                            <p>Equipe</p>
                        </a>
                    </li>
                    <li>
                        <a href={isHome ? '#schedulesTable' : '/home#schedulesTable'}>
                            <FaCalendarAlt />
                            <p>Horários</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </Container>
    )
}
