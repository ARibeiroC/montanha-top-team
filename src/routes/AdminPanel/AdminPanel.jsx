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
import { EventsManager } from './Events/EventsManager'
import { AdminProfile } from './Profile/AdminProfile'

// IMPORT VIDEO FOR BACKGROUND
import backgrondVideo from '../../assets/montanha.mp4'
import backgroundImage from '../../assets/background.jpg'

// IMPORT REACT ICONS
import { PiStudentFill } from "react-icons/pi"
import { LiaCoinsSolid } from "react-icons/lia"
import { PiUserListBold } from "react-icons/pi"
import { FaFileAlt, FaCheckSquare, FaSignOutAlt, FaUsersCog, FaChalkboardTeacher, FaChevronLeft, FaChevronRight, FaCheck, FaTimes, FaWhatsapp, FaExclamationTriangle, FaTrophy } from "react-icons/fa"
import { VscGraph } from "react-icons/vsc"


export function AdminPanel(){
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // New state for sidebar
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
    }, [location.state])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    }

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
        3: ['dashboard', 'students', 'attendance', 'finance', 'certificates', 'events', 'users', 'professors', 'profile'],
        2: ['dashboard', 'students', 'attendance', 'finance', 'certificates', 'events', 'profile'],
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

    // Helper: Calcular dias desde a última presença
    const getDaysSinceLastAttendance = (student) => {
        if (!student.attendance || student.attendance.length === 0) return -1; // Nunca compareceu
        
        // Ordenar datas (mais recente primeiro)
        const dates = student.attendance.map(a => new Date(a.date).getTime()).sort((a, b) => b - a);
        const lastDate = dates[0];
        const today = new Date().getTime();
        
        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    };

    // Helper: Obter telefone de contato (Aluno ou Responsável)
    const getContactPhone = (student) => {
        if (student.phone) return student.phone;
        if (student.guardians && student.guardians.length > 0) {
            return student.guardians[0].phone;
        }
        return null;
    };

    // Ação: Enviar WhatsApp
    const sendWhatsApp = (student, type = 'general') => {
        const phone = getContactPhone(student);
        if (!phone) {
            alert("Aluno sem telefone cadastrado.");
            return;
        }

        // Limpar formatação do telefone
        const cleanPhone = phone.replace(/\D/g, '');
        let message = '';

        if (type === 'absent') {
            message = `Olá ${student.name}, sentimos sua falta nos treinos! Tudo bem? Estamos aguardando seu retorno! Oss!`;
        } else {
            message = `Olá ${student.name}, aqui é da ${user?.branch || 'Montanha Top Team'}. Temos novidades para você!`;
        }

        const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // Lógica de Alerta de Evasão (Ausentes há mais de 14 dias e ativos)
    const riskStudents = accessibleStudents.filter(s => {
        if (!s.active) return false;
        const days = getDaysSinceLastAttendance(s);
        return days > 14 || days === -1; // Mais de 14 dias ou nunca veio (mas está ativo)
    });

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
            case 'events':
                return <EventsManager />
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

                        {/* Alertas de Evasão (Novo) */}
                        {riskStudents.length > 0 && (
                            <div className="risk-alert-container" style={{ margin: '20px 0', padding: '15px', backgroundColor: 'rgba(255, 0, 0, 0.1)', borderLeft: '4px solid #ff4444', borderRadius: '4px' }}>
                                <h3 style={{ color: '#ff4444', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FaExclamationTriangle /> Alerta de Evasão ({riskStudents.length})
                                </h3>
                                <p style={{ color: '#ccc', marginBottom: '10px' }}>Alunos ativos sem presença há mais de 14 dias:</p>
                                <div className="risk-list" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                                    {riskStudents.map(student => {
                                        const days = getDaysSinceLastAttendance(student);
                                        return (
                                            <div key={student.id} className="risk-card" style={{ minWidth: '200px', backgroundColor: '#2a2a2a', padding: '10px', borderRadius: '8px', border: '1px solid #444' }}>
                                                <p style={{ fontWeight: 'bold', color: '#fff' }}>{student.name}</p>
                                                <p style={{ fontSize: '0.9em', color: '#aaa' }}>{days === -1 ? 'Nunca veio' : `${days} dias ausente`}</p>
                                                <button 
                                                    onClick={() => sendWhatsApp(student, 'absent')}
                                                    style={{ marginTop: '8px', width: '100%', padding: '6px', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                                                >
                                                    <FaWhatsapp /> Contatar
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        
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
                                            <th>Contato</th>
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
                                                <td>
                                                    <button 
                                                        className="whatsapp-btn-small" 
                                                        onClick={() => sendWhatsApp(student)}
                                                        title="Enviar mensagem"
                                                        style={{ background: 'none', border: 'none', color: '#25D366', cursor: 'pointer', fontSize: '1.2em' }}
                                                    >
                                                        <FaWhatsapp />
                                                    </button>
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
            {/* Menu Lateral / Sidebar */}
            <div id="controllers" className={sidebarCollapsed ? 'collapsed' : ''}>
                <div className="sidebar-content">
                    <ul id="menu-controller">
                        {allowedTabs.includes('dashboard') && (
                            <li 
                                className={`link-controller ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                                title={sidebarCollapsed ? "Dashboard" : ""}
                            >
                                <VscGraph className='menu-icon'/>
                                <p className='label'>Dashboard</p>
                            </li>
                        )}
                        {allowedTabs.includes('students') && (
                            <li 
                                className={`link-controller ${activeTab === 'students' ? 'active' : ''}`}
                                onClick={() => setActiveTab('students')}
                                title={sidebarCollapsed ? "Alunos" : ""}
                            >
                                <PiUserListBold className='menu-icon'/>
                                <p className='label'>Alunos / Graduação</p>
                            </li>
                        )}
                        {allowedTabs.includes('attendance') && (
                            <li 
                                className={`link-controller ${activeTab === 'attendance' ? 'active' : ''}`}
                                onClick={() => setActiveTab('attendance')}
                                title={sidebarCollapsed ? "Presença" : ""}
                            >
                                <FaCheckSquare className='menu-icon'/>
                                <p className='label'>Presença</p>
                            </li>
                        )}
                        {allowedTabs.includes('finance') && (
                            <li 
                                className={`link-controller ${activeTab === 'finance' ? 'active' : ''}`}
                                onClick={() => setActiveTab('finance')}
                                title={sidebarCollapsed ? "Financeiro" : ""}
                            >
                                <LiaCoinsSolid className='menu-icon'/>
                                <p className='label'>Financeiro</p>
                            </li>
                        )}
                        {allowedTabs.includes('certificates') && (
                            <li 
                                className={`link-controller ${activeTab === 'certificates' ? 'active' : ''}`}
                                onClick={() => setActiveTab('certificates')}
                                title={sidebarCollapsed ? "Certificados" : ""}
                            >
                                <FaFileAlt className='menu-icon'/>
                                <p className='label'>Certificados</p>
                            </li>
                        )}
                        {allowedTabs.includes('events') && (
                            <li 
                                className={`link-controller ${activeTab === 'events' ? 'active' : ''}`}
                                onClick={() => setActiveTab('events')}
                                title={sidebarCollapsed ? "Eventos" : ""}
                            >
                                <FaTrophy className='menu-icon'/>
                                <p className='label'>Eventos</p>
                            </li>
                        )}
                        {allowedTabs.includes('users') && (
                            <li 
                                className={`link-controller ${activeTab === 'users' ? 'active' : ''}`}
                                onClick={() => setActiveTab('users')}
                                title={sidebarCollapsed ? "Usuários" : ""}
                            >
                                <FaUsersCog className='menu-icon'/>
                                <p className='label'>Usuários</p>
                            </li>
                        )}
                        {allowedTabs.includes('professors') && (
                            <li 
                                className={`link-controller ${activeTab === 'professors' ? 'active' : ''}`}
                                onClick={() => setActiveTab('professors')}
                                title={sidebarCollapsed ? "Professores" : ""}
                            >
                                <FaChalkboardTeacher className='menu-icon'/>
                                <p className='label'>Professores</p>
                            </li>
                        )}
                    </ul>
                </div>
                
                {/* Desktop Toggle Button (Tab style) */}
                <button className="sidebar-toggle" onClick={toggleSidebar} title={sidebarCollapsed ? "Expandir" : "Recolher"}>
                   {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            </div>
        </div>
    )
}

export default AdminPanel
