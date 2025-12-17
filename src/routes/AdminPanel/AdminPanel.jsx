import { useState } from 'react'
import './AdminPanel.css'

// SUB-COMPONENTS
import { Attendance } from './Attendance/Attendance'
import { StudentsManager } from './Students/StudentsManager'
import { Certificates } from './Certificates/Certificates'

// IMPORT VIDEO FOR BACKGROUND
import backgrondVideo from '../../assets/montanha.mp4'

// IMPORT REACT ICONS
import { PiStudentFill } from "react-icons/pi"
import { LiaCoinsSolid } from "react-icons/lia"
import { PiUserListBold } from "react-icons/pi"
import { FaFileAlt, FaCheckSquare } from "react-icons/fa"
import { VscGraph } from "react-icons/vsc"


export function AdminPanel(){
    const [activeTab, setActiveTab] = useState('dashboard')

    const renderContent = () => {
        switch(activeTab) {
            case 'students':
                return <StudentsManager />
            case 'attendance':
                return <Attendance />
            case 'certificates':
                return <Certificates />
            case 'dashboard':
            default:
                return (
                    <div id="dashboard-content">
                        {/* Conteúdo original do Dashboard */}
                        <div className="card-container">
                            <div className="card">
                                <div className="card-data">
                                    <p>25</p>
                                </div>
                                <div className="card-title">
                                    <p>Total Alunos</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-data">
                                    <p>21</p>
                                </div>
                                <div className="card-title">
                                    <p>Ativos</p>
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
                )
        }
    }

    return (
        <div className="admin-container">
            <video src={backgrondVideo} autoPlay loop muted></video>
            <div id="video-overlay"></div>
            <div className="content">
                <div id="header-admin">
                    <div className="title-admin">
                        <PiStudentFill className='icon-logo' />
                        <h1>Painel do Administrador</h1>
                    </div>
                    <div className="user-admin">
                        <p>Olá, Mestre Montanha</p>
                        <div className="avatar">
                            <img src="https://github.com/ARibeiroC.png" alt="" />
                        </div>
                    </div>
                </div>
                
                {renderContent()}

            </div>
            <div id="controllers">
                <ul id='menu-controller'>
                    <li 
                        className={`link-controller ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <VscGraph className='menu-icon' />
                        <p className='label'>Dashboard</p>
                    </li>
                    <li 
                        className={`link-controller ${activeTab === 'students' ? 'active' : ''}`}
                        onClick={() => setActiveTab('students')}
                    >
                        <PiUserListBold className='menu-icon'/>
                        <p className='label'>Alunos / Graduação</p>
                    </li>
                    <li 
                        className={`link-controller ${activeTab === 'attendance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('attendance')}
                    >
                        <FaCheckSquare className='menu-icon'/>
                        <p className='label'>Presença</p>
                    </li>
                    <li className='link-controller'>
                        <LiaCoinsSolid className='menu-icon'/>
                        <p className='label'>Financeiro</p>
                    </li>
                    <li 
                        className={`link-controller ${activeTab === 'certificates' ? 'active' : ''}`}
                        onClick={() => setActiveTab('certificates')}
                    >
                        <FaFileAlt className='menu-icon'/>
                        <p className='label'>Certificados</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}