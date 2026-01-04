import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png';
import '../Login/Login.css' // Reuse login styles

export function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        
        // Simulating backend call
        setTimeout(() => {
            console.log(`Email de recuperação enviado para: ${email}`)
            setSent(true)
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={backgroundImage} alt="Montanha Top Team" />
            </div>
            <div className="card">
                <h2>Recuperar Senha</h2>
                {!sent ? (
                    <form onSubmit={handleSubmit}>
                        <p style={{marginBottom: '1rem', color: '#666'}}>
                            Digite seu email para receber um link de redefinição de senha.
                        </p>
                        <div className="row">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="actions">
                            <button type="button" onClick={() => navigate('/login')} style={{background: 'transparent', color: '#333', border: '1px solid #ccc'}}>Voltar</button>
                            <button type="submit" id="login-button">Enviar Link</button>
                        </div>
                        {loading && (
                            <div className="loading-overlay">
                                <div className="spinner"></div>
                                <p>Enviando...</p>
                            </div>
                        )}
                    </form>
                ) : (
                    <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '3rem', color: 'green', marginBottom: '1rem'}}>✓</div>
                        <p>Email enviado com sucesso!</p>
                        <p style={{fontSize: '0.9rem', color: '#666', marginTop: '0.5rem'}}>Verifique sua caixa de entrada (e spam) para redefinir sua senha.</p>
                        <button 
                            onClick={() => navigate('/login')} 
                            style={{marginTop: '2rem', padding: '0.8rem 2rem', background: '#d4af37', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold'}}
                        >
                            Voltar para Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword
