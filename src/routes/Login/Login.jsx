import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput.jsx'
import backgroundImage from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png';
import { useAuth } from '@/context/AuthContext'
import { unifiedService } from '@/services/unifiedService'
import './Login.css'

export function Login(){
    const [step, setStep] = useState('credentials') // 'credentials' | '2fa'
    const [isSignup, setIsSignup] = useState(false) // Toggle between Login and Signup
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [tempUser, setTempUser] = useState(null) // User waiting for 2FA
    const [otpCode, setOtpCode] = useState('')
    
    // Additional fields for Signup
    const [fullName, setFullName] = useState('')
    
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

    // Resend OTP logic
    async function handleResendOtp() {
        if (!tempUser?.email) return
        setLoading(true)
        try {
            await unifiedService.resendOtp(tempUser.email)
            alert("Código reenviado com sucesso! Verifique seu email.")
        } catch (err) {
            alert("Erro ao reenviar código: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleCredentialsSubmit(e){
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const email = formData.get('email')?.toString().trim()
        const password = formData.get('login-password')?.toString().trim()
        const name = formData.get('full-name')?.toString().trim()
        
        if (!email || !password) {
            setErrors({ message: "Preencha todos os campos obrigatórios." })
            return
        }
        
        setErrors({})
        setLoading(true)
        
        try{
            if (isSignup) {
                // SIGN UP FLOW
                const result = await unifiedService.signUp(email, password, { name })
                setTempUser({ email, ...result.user }) 
                setStep('2fa')
            } else {
                // LOGIN FLOW
                const result = await unifiedService.login(email, password)
                await authLogin(email, password)
            }
        } catch (err) {
            // Check for specific Supabase "Email not confirmed" error
            if (err.message && (err.message.includes("Email not confirmed") || err.message.includes("confirm your email"))) {
                setErrors({ message: "Email não confirmado. Digite o código enviado para seu email." })
                setTempUser({ email }) // We only have email here
                setIsSignup(true) // Switch to signup context for verification
                setStep('2fa')
            } else if (err.message && err.message.includes("rate limit exceeded")) {
                setErrors({ message: "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente." })
            } else {
                setErrors({ 
                    email: true, 
                    password: true, 
                    message: err.message || "Erro na autenticação. Verifique suas credenciais." 
                })
            }
        } finally {
            setLoading(false)
        }
    }

    async function handle2FASubmit(e){
        e.preventDefault()
        setErrors({})
        setLoading(true)
        
        // Allow user to manually input email if not present (e.g. came from "Já tenho código")
        const emailToVerify = tempUser?.email || document.getElementById('verify-email')?.value

        if (!emailToVerify) {
             setErrors({ message: "Email necessário para verificação." })
             setLoading(false)
             return
        }

        if (otpCode.length === 6) {
            try {
                // Always verify as 'signup' for email confirmation
                const result = await unifiedService.verifyOtp(emailToVerify, otpCode, 'signup')
                
                alert("Conta verificada com sucesso! Por favor, faça login.");
                setIsSignup(false);
                setStep('credentials');
                setLoading(false);
                return;

            } catch(err) {
                setErrors({ message: err.message || "Código inválido ou expirado." })
            } finally {
                setLoading(false)
            }
        } else {
            setErrors({ message: "O código deve ter 6 dígitos." })
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
                    <h2>Verifique seu Email</h2>
                    <p style={{textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', color: '#555'}}>
                        Enviamos um código de 6 dígitos para o email:
                        <br/>
                        <strong>{tempUser?.email || "seu email"}</strong>
                        <br/>
                        (Verifique a caixa de spam)
                    </p>
                    <form onSubmit={handle2FASubmit}>
                        {!tempUser?.email && (
                            <div className="row" style={{marginBottom: '1rem'}}>
                                <label htmlFor="verify-email">Confirme seu Email</label>
                                <input type="email" id="verify-email" name="verify-email" required placeholder="Digite seu email" />
                            </div>
                        )}
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
                        <div style={{textAlign: 'center', marginTop: '1rem'}}>
                             <button type="button" onClick={handleResendOtp} style={{background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem'}}>
                                Reenviar código
                             </button>
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
                <h2>{isSignup ? "Criar Nova Conta" : "Bem-vindo ao Portal"}</h2>
                
                <form onSubmit={handleCredentialsSubmit}>
                    {isSignup && (
                        <div className="row">
                            <label htmlFor="full-name">Nome Completo</label>
                            <input 
                                type="text" 
                                id="full-name" 
                                name="full-name" 
                                placeholder="Seu nome"
                                required={isSignup}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="row">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="exemplo@email.com"
                            required
                            className={errors.email ? 'error' : ''}
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="login-password">Senha</label>
                        <PasswordInput 
                            id="login-password" 
                            name="login-password" 
                            placeholder="Sua senha"
                            required
                            className={errors.password ? 'error' : ''}
                        />
                    </div>

                    {errors.message && <p className="error-message">{errors.message}</p>}

                    <div className="actions">
                        <button type="submit" id="login-button" disabled={loading}>
                            {isSignup ? "Cadastrar" : "Entrar"}
                        </button>
                    </div>

                    <div className="toggle-mode" style={{marginTop: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <button 
                            type="button" 
                            onClick={() => {
                                setIsSignup(!isSignup)
                                setErrors({})
                            }}
                            style={{background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer'}}
                        >
                            {isSignup ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
                        </button>
                        
                        {!isSignup && (
                            <button 
                                type="button" 
                                onClick={() => {
                                    setStep('2fa')
                                    setTempUser(null) // Reset user so we ask for email
                                    setIsSignup(true) // Treat as signup verification
                                    setErrors({})
                                }}
                                style={{background: 'none', border: 'none', color: '#555', fontSize: '0.8rem', textDecoration: 'underline', cursor: 'pointer'}}
                            >
                                Já tenho um código de verificação
                            </button>
                        )}
                    </div>

                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p>{isSignup ? "Criando conta..." : "Autenticando..."}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
