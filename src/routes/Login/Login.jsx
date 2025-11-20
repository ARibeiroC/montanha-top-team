import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PasswordInput } from '../../components/Form/PasswordInput/PasswordInput.jsx'
import { Container } from './LoginCSS'

export function Login(){
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        setErrors({})
        setLoading(true)
        ;(async()=>{
            try{
                await new Promise(r=>setTimeout(r, 1000))
                const status = 200
                if (status === 200){
                    navigate('/home')
                } else {
                    setErrors({ email: true, password: true })
                }
            } catch(err){
                setErrors({ email: true })
            } finally {
                setLoading(false)
            }
        })()
    }
    return (
        <Container>
            <div className="card">
                <h2>Entrar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required className={errors.email ? 'field-error' : ''} />
                    </div>
                    <div className="row">
                        <label htmlFor="login-password">Senha</label>
                        <PasswordInput id="login-password" name="login-password" required className={errors.password ? 'field-error' : ''} />
                    </div>
                    <div className="actions">
                        <a href="/register">Criar conta</a>
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
        </Container>
    )
}