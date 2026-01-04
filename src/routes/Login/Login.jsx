import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput.jsx'
import backgroundImage from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png';
import { useAuth } from '@/context/AuthContext'
import { unifiedService } from '@/services/unifiedService'
import './Login.css'

export function Login(){
    const [step, setStep] = useState('credentials') // 'credentials' | '2fa'
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [tempUser, setTempUser] = useState(null) // User waiting for 2FA
    const [otpCode, setOtpCode] = useState('')
    
    const navigate = useNavigate()
    const { login: authLogin, isAuthenticated, user, loading: authLoading } = useAuth()

    useEffect(() => {
        if (!authLoading && isAuthenticated && user) {
            const level = typeof user.accessLevel === 'number' ? user.accessLevel : 0
            if (level >= 1) {
                navigate('/admin-panel', { replace: true })
            } else {
                navigate('/user-area', { replace: true })
            }
        }
    }, [authLoading, isAuthenticated, user, navigate])

    async function handleCredentialsSubmit(e){
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const email = formData.get('email')
        const password = formData.get('login-password')
        
        setErrors({})
        setLoading(true)
        
        try{
            // First step: Verify credentials only (do not set session yet)
            const result = await unifiedService.login(email, password)
            setTempUser(result.user) // result.user contains the user info
            setStep('2fa')
            // Mock sending 2FA code
            console.log("Código 2FA enviado para: " + email)
            // In a real app, you would trigger the backend to send the code here
        } catch (err) {
            setErrors({ email: true, password: true, message: err.message })
        } finally {
            setLoading(false)
        }
    }

    async function handle2FASubmit(e){
        e.preventDefault()
        setErrors({})
        setLoading(true)

        // Mock 2FA Verification
        // Accepts '123456' or any 6 digit code for demo if not specified
        if (otpCode.length === 6) {
            try {
                // Now complete the login via AuthContext
                // We use the tempUser data to avoid re-sending password if possible, 
                // but AuthContext.login expects email/pass usually.
                // However, since we already verified password, we can just "setSession" if exposed,
                // OR we can just call authLogin(email, password) which will re-verify (safe)
                // BUT, since we don't have the password stored in state (security), 
                // let's assume unifiedService.login returned the 'token' too.
                
                // Let's modify AuthContext to accept a pre-authenticated user object?
                // Or easier: Just Mock the 2FA check and if pass, assume success.
                // But we need to call authLogin to update the Context State.
                
                // Problem: We don't have the password anymore to call authLogin(email, pass).
                // Solution: We should rely on the token we got from the first step.
                // unifiedService.login returns { user, token }.
                // We should pass this token to AuthContext.
                
                // Since AuthContext.login(email, pass) does the whole flow, 
                // let's create a helper in AuthContext or just manually update it if we could.
                // But we can't access setSession outside.
                
                // Alternative: Store password in state? (Less secure but common in SPA memory).
                // Let's store password in tempUser for this moment (memory only).
                
                // Wait, if I change AuthContext to expose a "setSession(user, token)" method, that's better.
                // But I can't easily change the Context interface without breaking things.
                
                // Let's assume for this "Cyber Security" demo, we just call login again.
                // We will need to keep password in memory for the 2FA step.
                
                // Let's simulate:
                await new Promise(r => setTimeout(r, 1000)); // Verify delay
                
                // Call the context login to set the state
                await authLogin(tempUser.email, tempUser.password) // We attached password to tempUser in mock.js? No.
                // We need to pass the password from the first form to this step.
                
            } catch (err) {
                 setErrors({ message: "Erro ao finalizar login: " + err.message })
            }
        } else {
            setErrors({ message: "Código inválido. Use 6 dígitos." })
        }
        setLoading(false)
    }

    // Wrapper to handle state transition
    const handleLoginWith2FA = async (email, password) => {
        setLoading(true)
        try {
            // 1. Verify Creds
            const result = await unifiedService.login(email, password)
            // 2. Store temp data for 2FA step
            setTempUser({ ...result.user, _temp_password: password }) 
            setStep('2fa')
        } catch (err) {
            setErrors({ email: true, password: true, message: err.message })
        } finally {
            setLoading(false)
        }
    }

    const confirm2FA = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (otpCode === '123456' || otpCode.length === 6) { // Accept any 6 digit for demo or specific '123456'
             try {
                // 3. Finalize Login
                await authLogin(tempUser.email, tempUser._temp_password)
                // Navigation happens in useEffect
             } catch(err) {
                setErrors({ message: "Erro na autenticação final." })
             }
        } else {
            setErrors({ message: "Código incorreto. Tente 123456." })
            setLoading(false)
        }
    }

    if (step === '2fa') {
        return (
            <div className="login-container">
                <div className="login-logo">
                    <img src={backgroundImage} alt="" />
                </div>
                <div className="card">
                    <h2>Verificação em Duas Etapas</h2>
                    <p style={{textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', color: '#555'}}>
                        Enviamos um código de 6 dígitos para seu email/app.
                        <br/>(Para demo: use qualquer 6 dígitos)
                    </p>
                    <form onSubmit={confirm2FA}>
                        <div className="row">
                            <label htmlFor="otp">Código de Verificação</label>
                            <input 
                                type="text" 
                                id="otp" 
                                name="otp" 
                                required 
                                maxLength={6}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g,''))}
                                style={{textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem'}}
                                autoFocus
                            />
                        </div>
                        {errors.message && <p className="error-message" style={{color: 'red', fontSize: '0.9rem', marginBottom: '1rem'}}>{errors.message}</p>}
                        <div className="actions">
                            <button type="button" onClick={() => setStep('credentials')} style={{background: 'transparent', color: '#333', border: '1px solid #ccc'}}>Voltar</button>
                            <button type="submit" id="login-button">Verificar</button>
                        </div>
                        {loading && (
                            <div className="loading-overlay">
                                <div className="spinner"></div>
                                <p>Verificando...</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={backgroundImage} alt="" />
            </div>
            <div className="card">
                <h2>Entrar</h2>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    handleLoginWith2FA(formData.get('email'), formData.get('login-password'))
                }}>
                    <div className="row">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required className={errors.email ? 'field-error' : ''} />
                    </div>
                    <div className="row">
                        <label htmlFor="login-password">Senha</label>
                        <PasswordInput id="login-password" name="login-password" required className={errors.password ? 'field-error' : ''} />
                        <div style={{textAlign: 'right', marginTop: '0.5rem'}}>
                            <Link to="/forgot-password" style={{fontSize: '0.8rem', color: '#d4af37', textDecoration: 'none'}}>Esqueci minha senha</Link>
                        </div>
                    </div>
                    {errors.message && <p className="error-message" style={{color: 'red', fontSize: '0.9rem', marginBottom: '1rem'}}>{errors.message}</p>}
                    <div className="actions">
                        <Link to="/register">Criar conta</Link>
                        <button type="submit" id="login-button">Entrar</button>
                    </div>
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p>Aguarde...</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
