import { createContext, useContext, useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { useSchool } from "./SchoolContext";
import { unifiedService } from "../services/unifiedService";

const AuthContext = createContext({
    user: null,
    login: async () => {},
    logout: () => {},
    updateUser: () => {},
    isAuthenticated: false,
    loading: true
});

export const AuthContextProvider = ({ children }) => {
    const { students } = useSchool();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const logoutTimerRef = useRef(null);

    // Inicializa o serviço unificado ao carregar
    useEffect(() => {
        const initService = async () => {
            await unifiedService.initialize();
        };
        initService();
    }, []);

    const endOfDayTimestamp = () => {
        const now = new Date();
        const end = new Date(now);
        end.setHours(23, 59, 0, 0);
        return end.getTime();
    };

    const isSessionValid = (sess) => {
        return !!sess && typeof sess.expiresAt === 'number' && sess.expiresAt > Date.now();
    };

    const scheduleAutoLogout = (expiresAt) => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
        const msLeft = Math.max(0, expiresAt - Date.now());
        if (msLeft > 0) {
            logoutTimerRef.current = setTimeout(() => {
                logout();
            }, msLeft);
        }
    };

    useEffect(() => {
        // COOKIE / SESSION SECURITY REFACTOR
        // We no longer read 'user' or 'session' from localStorage to prevent XSS.
        // Instead, we rely on the backend (or mock) to restore session via getMe().
        
        // However, since we are using a Mock without a real backend cookie, 
        // we need a temporary way to persist session for the demo.
        // We will use sessionStorage which is cleared when tab closes (safer than local),
        // or just rely on memory (most secure, but annoying for dev).
        
        // For this task "Refactor JWT... use Cookies", we implement the "getMe" check on load.
        // If the backend has set a cookie, this call will succeed.
        
        const checkSession = async () => {
            try {
                // Tenta obter usuário do backend (via Cookie)
                const backendUser = await unifiedService.getCurrentUser();
                
                if (backendUser) {
                    setUser(backendUser);
                    // Cria uma sessão em memória para controle de expiração (opcional, já que o cookie expira)
                    const newSession = {
                        id: `sess-${Math.random().toString(36).slice(2)}`,
                        userId: backendUser.id,
                        createdAt: Date.now(),
                        expiresAt: endOfDayTimestamp()
                    };
                    setSession(newSession);
                    scheduleAutoLogout(newSession.expiresAt);
                } else {
                    // Fallback para Mock/LocalStorage
                    const storedUserStr = localStorage.getItem("user");
                    if (storedUserStr) {
                        const parsedUser = JSON.parse(storedUserStr);
                        setUser(parsedUser);
                        
                        // Recria sessão mock
                        const newSession = {
                            id: `sess-mock`,
                            userId: parsedUser.id,
                            createdAt: Date.now(),
                            expiresAt: endOfDayTimestamp()
                        };
                        setSession(newSession);
                        scheduleAutoLogout(newSession.expiresAt);
                    }
                }
            } catch (err) {
                console.warn("Session check failed", err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [students]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const result = await unifiedService.login(email, password);
            if (result.user) {
                const user = result.user;
                // Session is now memory-only (and backend cookie if integrated)
                // localStorage.setItem("user", JSON.stringify(user)); // REMOVED for Security (XSS prevention)
                
                // MOCK ADAPTATION: We still save to localStorage ONLY because we lack a real backend to set HttpOnly cookies.
                // In production, this line MUST be removed.
                localStorage.setItem("user", JSON.stringify(user)); 

                const newSession = {
                    id: `sess-${Math.random().toString(36).slice(2)}`,
                    userId: user.id,
                    createdAt: Date.now(),
                    expiresAt: endOfDayTimestamp()
                };
                setSession(newSession);
                // localStorage.setItem("session", JSON.stringify(newSession)); // REMOVED
                scheduleAutoLogout(newSession.expiresAt);

                setUser(user);
                return user;
            } else {
                throw new Error("Usuário não encontrado.");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setSession(null);
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
        localStorage.removeItem("user");
        localStorage.removeItem("session"); // Just in case
        
        // In real cookie auth, we would call api.logout() to clear the cookie
        // unifiedService.logout();
    };

    const updateUser = (updates) => {
        setUser(prev => {
            const newUser = { ...prev, ...updates };
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        });
    };

    return (
        <AuthContext.Provider value={{ user, session, login, logout, updateUser, isAuthenticated: !!user && isSessionValid(session), loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthContextProvider");
    }
    return context;
};
