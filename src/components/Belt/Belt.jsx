// CSS IMPORT
import { Container } from './BeltCSS.js'

// HOOK IMPORT
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StateMenuContext } from '../../context/StateMenuContext'



export function Belt(){
    const [stateMenu, activeLink] = useContext(StateMenuContext)

    return (
        <Container id='belt'>
            <div className="contact">
                <div className="phone">
                    <i className='fa-brands fa-whatsapp'></i>
                    <p>(11) 97623-5959</p>
                </div>
                {/* <div className="email">
                    <i className="fa-solid fa-at"></i>
                    <p>montanhatopteam@email.com.br</p>
                </div> */}
                <div className="instagram">
                    <Link to='https://www.instagram.com/montanhatopteam/' target='_blank'><i className="fa-brands fa-instagram" ></i></Link>
                    <p to='https://www.instagram.com/montanhatopteam/'>@montanhatopteam</p>
                </div> 
                {/* <div className="address">
                    <i className='fa-solid fa-map-location-dot'></i>
                    <p>Rua Almotacel, 105 - São Paulo/SP</p>
                </div>                */}
            </div>
            <div className="services">
                <Link to='/Panel'>
                    <i className='fa-solid fa-shop'></i>
                    <p>Loja</p>
                </Link>
                <Link to='/Login'>
                    {activeLink.activeLink ? console.log('Exite') : console.log('Não exite')}
                    <i className='fa-solid fa-user'></i>
                    <p>Área do Alunos</p>
                </Link>
                <a href='#'>
                    <i className="fa-solid fa-unlock"></i>
                    <p>Área Restrita</p>
                </a>
            </div>
        </Container>
    )
};