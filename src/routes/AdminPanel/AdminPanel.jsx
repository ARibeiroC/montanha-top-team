import {Container} from './AdminPanelCSS'


// IMPORT VIDEO FOR BACKGROUND
import backgrondVideo from '../../assets/montanha.mp4'

// IMPORT REACT ICONS
import { PiStudentFill } from "react-icons/pi"
import { LiaCoinsSolid } from "react-icons/lia"
import { PiUserListBold } from "react-icons/pi"
import { FaFileAlt } from "react-icons/fa"
import { VscGraph } from "react-icons/vsc"

export function AdminPanel(){

    return (
        <Container>
            <video src={backgrondVideo} autoPlay muted loop></video>
            <div id="background-video-filter">
            </div>
            <div id="admin-content">
                <h2>DASHBOARD</h2>
                <div id="content">
                    <div className="card">
                        <div className="card-data">
                            <p>73</p>
                        </div>
                        <div className="card-title">
                            <p>Total de Alunos</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-data">
                            <p>61</p>
                        </div>
                        <div className="card-title">
                            <p>Matriculas Renovadas</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-data">
                            <p>12</p>
                        </div>
                        <div className="card-title">
                            <p>Mensalidades Atrasadas</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-data">
                            <p>4</p>
                        </div>
                        <div className="card-title">
                            <p>Não frequentes</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-data">
                            <p>21</p>
                        </div>
                        <div className="card-title">
                            <p>Competidores</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="controllers">
                <ul id='menu-controller'>
                    <li className='link-controller'>
                        <VscGraph className='menu-icon' />
                        <p className='label'>Dashboard</p>
                    </li>
                    <li className='link-controller'>
                        <LiaCoinsSolid className='menu-icon'/>
                        <p className='label'>Financeiro</p>
                    </li>
                    <li className='link-controller'>
                        <PiUserListBold className='menu-icon'/>
                        <p className='label'>Usuários</p>
                    </li>
                    <li className='link-controller'>
                        <PiStudentFill className='menu-icon' />
                        <p className='label'>Alunos</p>
                    </li>
                    <li className='link-controller'>
                        <FaFileAlt className='menu-icon'/>
                        <p className='label'>Documentos</p>
                    </li>
                </ul>
            </div>
        </Container>
    )
}