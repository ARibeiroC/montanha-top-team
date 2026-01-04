import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useSchool } from '../../context/SchoolContext'
import './AdminPanel.css'

// SUB-COMPONENTS
import { Attendance } from './Attendance/Attendance'
import { StudentsManager } from './Students/StudentsManager'
import { Certificates } from './Certificates/Certificates'
import { Finance } from './Finance/Finance'

import { UserManagement } from './UserManagement/UserManagement'
import { ProfessorManagement } from './ProfessorManagement/ProfessorManagement'
import { AdminProfile } from './Profile/AdminProfile'

// IMPORT VIDEO FOR BACKGROUND
import backgrondVideo from '../../assets/montanha.mp4'

// IMPORT REACT ICONS
import { PiStudentFill } from "react-icons/pi"
import { LiaCoinsSolid } from "react-icons/lia"
import { PiUserListBold } from "react-icons/pi"
import { FaFileAlt, FaCheckSquare, FaSignOutAlt, FaUsersCog, FaChalkboardTeacher, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { VscGraph } from "react-icons/vsc"


export function AdminPanel(){
    const [activeTab, setActiveTab] = useState('dashboard')
    const location = useLocation()
    const { students } = useSchool()
    const { user } = useAuth()
    const { logout } = useAuth()
    const navigate = useNavigate()
    const level = typeof user?.accessLevel === 'number' ? user.accessLevel : 0
    
    // Scroll Indicator State
    const scrollRef = useRef(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab)
        }
    }, [location])

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        // Using a small tolerance (1px) for floating point calculations
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            // Check initially
            checkScroll();
            // Check on resize
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (el) el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        }
    }, []);

    // Re-check when allowed tabs change (as content width changes)
    useEffect(() => {
        checkScroll();
    }, [level]);

    const allowedTabsByLevel = {
        3: ['dashboard', 'students', 'attendance', 'finance', 'certificates', 'users', 'professors', 'profile'],
        2: ['dashboard', 'students', 'attendance', 'finance', 'certificates', 'profile'],
        1: ['dashboard', 'attendance', 'profile'],
        0: ['dashboard']
    }
    const allowedTabs = allowedTabsByLevel[level] || ['dashboard']
    if (!allowedTabs.includes(activeTab)) {
        // Garante um tab permitido
        setActiveTab(allowedTabs[0])
    }

    // Cálculos para o Dashboard
    const totalStudents = students.length
    const activeStudents = students.filter(s => s.active).length
    const infrequentStudents = students.filter(s => s.active && (!s.attendance || s.attendance.length === 0)).length
    const competitors = students.filter(s => s.active && s.events && s.events.length > 0).length

    const renderContent = () => {
        switch(activeTab) {
            case 'students':
                return <StudentsManager />
            case 'attendance':
                return <Attendance />
            case 'certificates':
                return <Certificates />
            case 'finance':
                return <Finance />
            case 'users':
                return <UserManagement />
            case 'professors':
                return <ProfessorManagement />
            case 'profile':
                return <AdminProfile />
            case 'dashboard':
            default:
                return (
                    <div id="dashboard-content">
                        {/* Conteúdo original do Dashboard */}
                        <div className="card-container">
                            <div className="card">
                                <div className="card-data">
                                    <p>{totalStudents}</p>
                                </div>
                                <div className="card-title">
                                    <p>Total Alunos</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-data">
                                    <p>{activeStudents}</p>
                                </div>
                                <div className="card-title">
                                    <p>Ativos</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-data">
                                    <p>{infrequentStudents}</p>
                                </div>
                                <div className="card-title">
                                    <p>Não frequentes</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-data">
                                    <p>{competitors}</p>
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
                        {/* Avatar removido conforme solicitado */}
                    </div>
                </div>
                
                {renderContent()}

            </div>
            <div id="controllers">
                {showLeftArrow && <div className="scroll-indicator left"><FaChevronLeft /></div>}
                <ul id='menu-controller' ref={scrollRef}>
                    <li 
                        className={`link-controller ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <VscGraph className='menu-icon' />
                        <p className='label'>Dashboard</p>
                    </li>
                    {allowedTabs.includes('students') && (
                        <li 
                            className={`link-controller ${activeTab === 'students' ? 'active' : ''}`}
                            onClick={() => setActiveTab('students')}
                        >
                            <PiUserListBold className='menu-icon'/>
                            <p className='label'>Alunos / Graduação</p>
                        </li>
                    )}
                    {allowedTabs.includes('attendance') && (
                        <li 
                            className={`link-controller ${activeTab === 'attendance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('attendance')}
                        >
                            <FaCheckSquare className='menu-icon'/>
                            <p className='label'>Presença</p>
                        </li>
                    )}
                    {allowedTabs.includes('finance') && (
                        <li 
                            className={`link-controller ${activeTab === 'finance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('finance')}
                        >
                            <LiaCoinsSolid className='menu-icon'/>
                            <p className='label'>Financeiro</p>
                        </li>
                    )}
                    {allowedTabs.includes('certificates') && (
                        <li 
                            className={`link-controller ${activeTab === 'certificates' ? 'active' : ''}`}
                            onClick={() => setActiveTab('certificates')}
                        >
                            <FaFileAlt className='menu-icon'/>
                            <p className='label'>Certificados</p>
                        </li>
                    )}
                    {allowedTabs.includes('users') && (
                        <li 
                            className={`link-controller ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            <FaUsersCog className='menu-icon'/>
                            <p className='label'>Usuários</p>
                        </li>
                    )}
                    {allowedTabs.includes('professors') && (
                        <li 
                            className={`link-controller ${activeTab === 'professors' ? 'active' : ''}`}
                            onClick={() => setActiveTab('professors')}
                        >
                            <FaChalkboardTeacher className='menu-icon'/>
                            <p className='label'>Professores</p>
                        </li>
                    )}
                </ul>
                {showRightArrow && <div className="scroll-indicator right"><FaChevronRight /></div>}
            </div>
        </div>
    )
}

export default AdminPanel
