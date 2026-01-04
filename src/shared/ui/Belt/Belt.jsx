import { useState, useRef, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import './Belt.css'

// REACT ICONS IMPORT
import { FaUser, FaHome, FaEdit, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6"

export function Belt(){
    
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuthenticated, logout, user } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const isHome = location.pathname === '/home'

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        logout()
        setShowDropdown(false)
        navigate('/login')
    }

    const handlePanel = () => {
        setShowDropdown(false)
        const level = typeof user?.accessLevel === 'number' ? user.accessLevel : 0
        if (level >= 1) {
            navigate('/admin-panel')
        } else {
            navigate('/user-area')
        }
    }

    const handleEdit = () => {
        setShowDropdown(false)
        // Determine where to go based on role
        const level = typeof user?.accessLevel === 'number' ? user.accessLevel : 0
        if (level >= 1) {
            navigate('/admin-panel', { state: { activeTab: 'profile' } })
        } else {
            navigate('/user-area', { state: { activeTab: 'profile' } })
        }
    }

    return (
        <div className="belt-container">
            <div id="title-site">
                <h1>Montanha Top Team</h1>
            </div>
            <div className="controlls">
                {isHome ? null : <Link to={'/'} id='home'>
                    <FaHome />
                </Link>}
                
                {isAuthenticated ? (
                    <div className="user-menu" ref={dropdownRef}>
                        <button 
                            className="user-btn" 
                            onClick={() => setShowDropdown(!showDropdown)}
                            aria-label="Menu do Usuário"
                        >
                            {user?.profilePic ? (
                                <img 
                                    src={user.profilePic} 
                                    alt="Foto do usuário" 
                                    className="user-avatar-small"
                                />
                            ) : (
                                <FaUser />
                            )}
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <button onClick={handlePanel} className="dropdown-item">
                                    <FaTachometerAlt /> Painel
                                </button>
                                <button onClick={handleEdit} className="dropdown-item">
                                    <FaEdit /> Editar Perfil
                                </button>
                                <button onClick={handleLogout} className="dropdown-item logout">
                                    <FaSignOutAlt /> Sair
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to={'/login'} id='login'>
                        <FaUser />
                    </Link>
                )}
                
                {/* <Link to={'/loja'} id='loja'>
                    <FaCartShopping />
                </Link> */}
            </div>
        </div>
    )
};
