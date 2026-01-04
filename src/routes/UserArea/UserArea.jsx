import { useState, useEffect } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useAuth } from '@/context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import './UserArea.css'

// ICONS
import { FaUserNinja, FaMedal, FaCalendarAlt, FaHistory, FaHome, FaUserEdit, FaTrophy, FaSignOutAlt } from "react-icons/fa"
import { GiKimono, GiBeltArmor } from "react-icons/gi"

// BACKGROUND
import backgrondVideo from '../../assets/montanha.mp4'

export function UserArea() {
    const { updateStudent } = useSchool()
    const { user, logout, updateUser, isAuthenticated, loading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('dashboard')
    
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab)
            // Clear state so refresh doesn't keep resetting? 
            // Actually, keep it simple. If they navigate again, it updates.
            // But we might want to clear it from history so back button works nicely?
            // For now, simple is fine.
        }
    }, [location])

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, loading, navigate])

    const currentUser = user

    const [formData, setFormData] = useState({
        profilePic: '',
        height: '',
        weight: ''
    })

    useEffect(() => {
        if(currentUser) {
            setFormData({
                profilePic: currentUser.profilePic || '',
                height: currentUser.height || '',
                weight: currentUser.weight || ''
            })
        }
    }, [currentUser])

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        // Atualiza no contexto da escola (persistência global/backend simulado)
        updateStudent(currentUser.id, formData)
        // Atualiza no contexto de autenticação (sessão local)
        updateUser(formData)
        alert('Perfil atualizado com sucesso!')
    }

    if (!currentUser) {
        return <div className="user-area-loading">Carregando dados do aluno...</div>
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Check size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("O tamanho máximo da foto deve ser 2MB.");
                return;
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profilePic: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const getBeltDisplay = (belt, stripes) => {
        const romanNumerals = ["", "I", "II", "III", "IV"];
        const roman = stripes >= 1 && stripes <= 4 ? romanNumerals[stripes] : "";
        const suffix = stripes > 0 ? ` (${stripes} graus)` : "";
        return `${belt}${roman ? ' ' + roman : ''}${suffix}`;
    }

    const renderContent = () => {
        switch(activeTab) {
            case 'profile':
                return (
                    <div className="tab-content profile-tab">
                        <h2>Editar Perfil</h2>
                        <form onSubmit={handleProfileUpdate} className="profile-form">

                            <div className="read-only-section">
                                <div className="form-group">
                                    <label>Nome Completo</label>
                                    <div className="read-only-value">{currentUser.name}</div>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <div className="read-only-value">{currentUser.email}</div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Faixa</label>
                                        <div className="read-only-value">{getBeltDisplay(currentUser.belt, currentUser.stripes)}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Professor</label>
                                        <div className="read-only-value">{currentUser.professorName || '—'}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Idade</label>
                                        <div className="read-only-value">25 Anos</div> {/* Mockado pois não temos birthDate no context ainda */}
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            {/* EDITABLE SECTION */}
                            <div className="form-group">
                                <label>Foto de Perfil</label>
                                <div className="file-upload-container">
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        <FaUserEdit /> Escolher Foto
                                    </label>
                                    <input 
                                        id="file-upload" 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    {formData.profilePic && (
                                        <div className="preview-image">
                                            <img src={formData.profilePic} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Altura (m)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={formData.height} 
                                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                                        placeholder="1.75"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Peso (kg)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={formData.weight} 
                                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                        placeholder="75.5"
                                    />
                                </div>
                            </div>
                            
                            <button type="submit" className="save-btn">Salvar Alterações</button>
                        </form>
                    </div>
                )
            case 'attendance':
                return (
                    <div className="tab-content attendance-tab">
                        <h2>Histórico de Presença</h2>
                        <div className="stats-cards">
                            <div className="stat-card">
                                <div className="icon"><FaCalendarAlt /></div>
                                <div className="info">
                                    <h3>{currentUser.attendance?.length || 0}</h3>
                                    <p>Total de Aulas</p>
                                </div>
                            </div>
                        </div>
                        <ul className="attendance-list">
                            {currentUser.attendance && currentUser.attendance.length > 0 ? (
                                currentUser.attendance.map((record, index) => (
                                    <li key={index} className="attendance-item">
                                        <span className="date">{record.date}</span>
                                        <span className="time">{record.time}</span>
                                        <span className="status present">Presente</span>
                                    </li>
                                ))
                            ) : (
                                <p className="empty-msg">Nenhum registro de presença encontrado.</p>
                            )}
                        </ul>
                    </div>
                )
            case 'graduation':
                return (
                    <div className="tab-content graduation-tab">
                        <h2>Minha Graduação</h2>
                        <div className="current-belt-display">
                            <GiKimono className="kimono-icon" />
                            <div className="belt-info">
                                <h3>Faixa Atual</h3>
                                <p className={`belt-name ${currentUser.belt?.toLowerCase()}`}>
                                    {currentUser.belt} {currentUser.stripes > 0 && `- ${currentUser.stripes}º Grau`}
                                </p>
                            </div>
                        </div>
                        <div className="history-section">
                            <h3>Histórico</h3>
                            {/* Futuramente iterar sobre beltHistory */}
                            <p className="empty-msg">Histórico de graduações em breve.</p>
                        </div>
                    </div>
                )
            case 'events':
                return (
                    <div className="tab-content events-tab">
                        <h2>Campeonatos e Eventos</h2>
                        <div className="events-list">
                            {currentUser.events && currentUser.events.length > 0 ? (
                                currentUser.events.map((event, index) => (
                                    <div key={index} className="event-card">
                                        <div className="event-icon"><FaMedal /></div>
                                        <div className="event-details">
                                            <h3>{event.name}</h3>
                                            <div className="event-meta">
                                                <span className="event-date">
                                                    <FaCalendarAlt /> {new Date(event.date).toLocaleDateString('pt-BR')}
                                                </span>
                                                <span className="event-rank">
                                                    <FaTrophy /> {event.rank}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="empty-msg">Você ainda não participou de eventos registrados.</p>
                            )}
                        </div>
                    </div>
                )
            case 'dashboard':
            default:
                return (
                    <div className="dashboard-content">
                        <div className="welcome-banner">
                            <h1>Olá, {currentUser.name.split(' ')[0]}!</h1>
                            <p>Bem-vindo ao seu painel do aluno.</p>
                        </div>
                        
                        <div className="dashboard-grid">
                            <div className="dash-card belt-card">
                                <div className="card-header">
                                    <GiBeltArmor />
                                    <span>Graduação</span>
                                </div>
                                <div className="card-body">
                                    <h3>{currentUser.belt}</h3>
                                    <p>{currentUser.stripes}º Grau</p>
                                </div>
                            </div>

                            <div className="dash-card attendance-card">
                                <div className="card-header">
                                    <FaHistory />
                                    <span>Frequência</span>
                                </div>
                                <div className="card-body">
                                    <h3>{currentUser.attendance?.length || 0}</h3>
                                    <p>Aulas Realizadas</p>
                                </div>
                            </div>

                            <div className="dash-card events-card">
                                <div className="card-header">
                                    <FaMedal />
                                    <span>Eventos</span>
                                </div>
                                <div className="card-body">
                                    <h3>{currentUser.events?.length || 0}</h3>
                                    <p>Participações</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="user-area-container">
            <video src={backgrondVideo} autoPlay loop muted className="bg-video"></video>
            <div className="overlay"></div>
            
            <aside className="sidebar">
                <div className="profile-section">
                    <div className="avatar">
                        {currentUser.profilePic ? (
                            <img src={currentUser.profilePic} alt={currentUser.name} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                        ) : (
                            <FaUserNinja />
                        )}
                    </div>
                    <h3>{currentUser.name}</h3>
                    <span className="role-badge">Aluno</span>
                </div>
                
                <nav className="nav-menu">
                    <button 
                        className={activeTab === 'dashboard' ? 'active' : ''} 
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <FaHome />
                        <span>Dashboard</span>
                    </button>
                    <button 
                        className={activeTab === 'profile' ? 'active' : ''} 
                        onClick={() => setActiveTab('profile')}
                    >
                        <FaUserEdit />
                        <span>Perfil</span>
                    </button>
                    <button 
                        className={activeTab === 'attendance' ? 'active' : ''} 
                        onClick={() => setActiveTab('attendance')}
                    >
                        <FaCalendarAlt />
                        <span>Presença</span>
                    </button>
                    <button 
                        className={activeTab === 'graduation' ? 'active' : ''} 
                        onClick={() => setActiveTab('graduation')}
                    >
                        <GiBeltArmor />
                        <span>Graduação</span>
                    </button>
                    <button 
                        className={activeTab === 'events' ? 'active' : ''} 
                        onClick={() => setActiveTab('events')}
                    >
                        <FaMedal />
                        <span>Eventos</span>
                    </button>
                    
                </nav>
            </aside>

            <main className="main-content">
                {renderContent()}
            </main>
        </div>
    )
}

export default UserArea
