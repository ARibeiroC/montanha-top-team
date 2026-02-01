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
import backgroundImage from '../../assets/background.jpg'

// IMPORT REACT ICONS
import { PiStudentFill } from "react-icons/pi"
import { LiaCoinsSolid } from "react-icons/lia"
import { PiUserListBold } from "react-icons/pi"
import { FaFileAlt, FaCheckSquare, FaSignOutAlt, FaUsersCog, FaChalkboardTeacher, FaChevronLeft, FaChevronRight, FaCheck, FaTimes } from "react-icons/fa"
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

    // State para filtro do Dashboard
    const [dashboardFilter, setDashboardFilter] = useState('all') // 'all', 'active', 'paying', 'nonpaying', 'competitor'

    // Filtragem por Filial (Lógica Global do Dashboard)
    const getStudentsByAccessLevel = () => {
        // Lógica idêntica ao StudentsManager para consistência
        if (user?.accessLevel === 2 && user?.branch) {
            return students.filter(s => (s.branch ?? 'Montanha Top Team') === user.branch);
        }
        
        // Level 3 (Admin Geral) vê tudo
        return students;
    }

    const accessibleStudents = getStudentsByAccessLevel();

    // Cálculos para o Dashboard (Baseado nos alunos acessíveis)
    const totalStudents = accessibleStudents.length
    const activeStudents = accessibleStudents.filter(s => s.active).length
    const payingStudents = accessibleStudents.filter(s => s.active && s.financialStatus === 'Em dia').length
    const nonPayingStudents = accessibleStudents.filter(s => s.active && s.financialStatus !== 'Em dia').length
    const competitors = accessibleStudents.filter(s => s.active && s.events && s.events.length > 0).length

    // Filtragem dos alunos na tabela
    const getFilteredDashboardStudents = () => {
        switch (dashboardFilter) {
            case 'active':
                return accessibleStudents.filter(s => s.active)
            case 'paying':
                return accessibleStudents.filter(s => s.active && s.financialStatus === 'Em dia')
            case 'nonpaying':
                return accessibleStudents.filter(s => s.active && s.financialStatus !== 'Em dia')
            case 'competitor':
                return accessibleStudents.filter(s => s.active && s.events && s.events.length > 0)
            default:
                return accessibleStudents
        }
    }

    const filteredDashboardList = getFilteredDashboardStudents()

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
                            <div 
                                className={`card ${dashboardFilter === 'all' ? 'active-card' : ''}`}
                                onClick={() => setDashboardFilter('all')}
                                style={{ cursor: 'pointer', border: dashboardFilter === 'all' ? '2px solid #fff' : 'none' }}
                            >
                                <div className="card-data">
                                    <p>{totalStudents}</p>
                                </div>
                                <div className="card-title">
                                    <p>Total Alunos</p>
                                </div>
                            </div>
                            <div 
                                className={`card ${dashboardFilter === 'active' ? 'active-card' : ''}`}
                                onClick={() => setDashboardFilter('active')}
                                style={{ cursor: 'pointer', border: dashboardFilter === 'active' ? '2px solid #fff' : 'none' }}
                            >
                                <div className="card-data">
                                    <p>{activeStudents}</p>
                                </div>
                                <div className="card-title">
                                    <p>Ativos</p>
                                </div>
                            </div>
                            <div 
                                className={`card ${dashboardFilter === 'paying' ? 'active-card' : ''}`}
                                onClick={() => setDashboardFilter('paying')}
                                style={{ cursor: 'pointer', border: dashboardFilter === 'paying' ? '2px solid #fff' : 'none' }}
                            >
                                <div className="card-data">
                                    <p>{payingStudents}</p>
                                </div>
                                <div className="card-title">
                                    <p>Pagantes</p>
                                </div>
                            </div>
                            <div 
                                className={`card ${dashboardFilter === 'nonpaying' ? 'active-card' : ''}`}
                                onClick={() => setDashboardFilter('nonpaying')}
                                style={{ cursor: 'pointer', border: dashboardFilter === 'nonpaying' ? '2px solid #fff' : 'none' }}
                            >
                                <div className="card-data">
                                    <p>{nonPayingStudents}</p>
                                </div>
                                <div className="card-title">
                                    <p>Não Pagantes</p>
                                </div>
                            </div>
                            <div 
                                className={`card ${dashboardFilter === 'competitor' ? 'active-card' : ''}`}
                                onClick={() => setDashboardFilter('competitor')}
                                style={{ cursor: 'pointer', border: dashboardFilter === 'competitor' ? '2px solid #fff' : 'none' }}
                            >
                                <div className="card-data">
                                    <p>{competitors}</p>
                                </div>
                                <div className="card-title">
                                    <p>Competidores</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="dashboard-list-container">
                            <h2>
                                {dashboardFilter === 'all' && 'Todos os Alunos'}
                                {dashboardFilter === 'active' && 'Alunos Ativos'}
                                {dashboardFilter === 'paying' && 'Alunos Pagantes (Ativos)'}
                                {dashboardFilter === 'nonpaying' && 'Alunos Não Pagantes (Ativos)'}
                                {dashboardFilter === 'competitor' && 'Alunos Competidores'}
                                {' '}({filteredDashboardList.length})
                            </h2>
                            <div className="table-responsive">
                                <table className="dashboard-table">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Status</th>
                                            <th>Pagante</th>
                                            <th>Competidor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDashboardList.map(student => (
                                            <tr key={student.id}>
                                                <td>{student.name}</td>
                                                <td>
                                                    {student.active ? (
                                                        <span className="status-badge active"><FaCheck /> Ativo</span>
                                                    ) : (
                                                        <span className="status-badge inactive"><FaTimes /> Inativo</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {student.financialStatus === 'Em dia' ? (
                                                        <span className="status-text success">Sim</span>
                                                    ) : (
                                                        <span className="status-text danger">Não</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {student.events && student.events.length > 0 ? (
                                                        <span className="status-text success">Sim</span>
                                                    ) : (
                                                        <span className="status-text muted">Não</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="admin-container">
            {activeTab === 'certificates' ? (
                <img src={backgroundImage} className="admin-bg" alt="" />
            ) : (
                <video src={backgrondVideo} autoPlay loop muted></video>
            )}
            <div id="video-overlay"></div>
            <div className="content">
                <div id="header-admin">
                    <div className="title-admin">
                        <PiStudentFill className='icon-logo' />
                        <h1>Painel do Administrador {user?.branch && user.accessLevel !== 3 && <span style={{fontSize: '0.5em', display: 'block', fontWeight: 'normal'}}>{user.branch}</span>}</h1>
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
