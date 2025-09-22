// CSS IMPORT
import { Container } from './BeltCSS.js'

export function Belt(){
    return (
        <Container id='belt'>
            <div className="contact">
                <div className="phone">
                    <i className='fa-brands fa-whatsapp'></i>
                    <p>(11) 97623-5959</p>
                </div>
                <div className="email">
                    <i className="fa-solid fa-at"></i>
                    <p>montanhatopteam@email.com.br</p>
                </div>
                <div className="instagram">
                    <i className="fa-brands fa-instagram"></i>
                    <p>@montanhatopteam</p>
                </div> 
                <div className="address">
                    <i className='fa-solid fa-map-location-dot'></i>
                    <p>Rua Almotacel, 105 - São Paulo/SP</p>
                </div>               
            </div>
            <div className="services">
                <a href='#'>
                    <i className='fa-solid fa-shop'></i>
                    <p>Loja</p>
                </a>
                <a href='#'>
                    <i className='fa-solid fa-user'></i>
                    <p>Área do Alunos</p>
                </a>
                <a href='#'>
                    <i className="fa-solid fa-unlock"></i>
                    <p>Área Restrita</p>
                </a>
            </div>
        </Container>
    )
};