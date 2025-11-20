import { useState } from 'react';
import { PasswordInput } from '../PasswordInput/PasswordInput.jsx'
import { useNavigate } from 'react-router-dom'

import { UserContainer } from './FormCadUserCSS.js';

export function FormCadUser() {
    const [isStudent, setIsStudent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const password = formData.get('password')
        const confirmPassword = formData.get('confirm-password')
        const confirmInput = form.querySelector('#confirm-password')
        confirmInput.setCustomValidity('')
        setErrors({})
        if (password !== confirmPassword) {
            confirmInput.setCustomValidity('As senhas não coincidem')
            confirmInput.reportValidity()
            setErrors(prev=>({ ...prev, password: true, ['confirm-password']: true }))
            return
        }
        const data = Object.fromEntries(formData.entries())
        data.student = formData.has('student')
        setLoading(true)
        ;(async()=>{
            try{
                await new Promise(r=>setTimeout(r, 1200))
                const status = 200
                if (status === 200){
                    form.reset()
                    setIsStudent(false)
                    setErrors({})
                    navigate('/login')
                }
            }catch(err){
                setErrors(prev=>({ ...prev, email: true }))
            }finally{
                setLoading(false)
            }
        })()
        console.log(data)
    }

    return (
        <UserContainer id='form-cad-user'>
            <h2>Cadastro de Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div className="row-input">
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" id="name" name="name" required className={errors.name ? 'field-error' : ''} minLength={12} maxLength={80} />
                </div>
                <div className="row-input">
                    <label htmlFor="dt-nasc">Data de Nascimento</label>
                    <input type="date" id="dt-nasc" name="dt-nasc" required className={errors['dt-nasc'] ? 'field-error' : ''} />
                </div>
                <div id='user-student'>
                    <input type="checkbox" name="student" id="student" onChange={(e)=>setIsStudent(e.target.checked)} />
                    <label htmlFor="student">Você é estudante? ( Fundamental / Médio )</label>
                </div>
                <fieldset id='field' className={isStudent ? 'show' : 'hidden'}>
                    <legend id='title-fieldset'>Dados Escolares</legend>
                    <label htmlFor="school">Nome da Escola Completo</label>
                    <input type="text" id="school" name="school" {...(isStudent ? {required: true} : {})} className={errors.school ? 'field-error' : ''} minLength={12} maxLength={80} />
                    <label htmlFor="serie">Serie</label>
                    <input type="text" id="serie" name="serie" {...(isStudent ? {required: true} : {})} className={errors.serie ? 'field-error' : ''} placeholder='Ex: 8ª C'/>
                </fieldset>
                <div className="row-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required className={errors.email ? 'field-error' : ''} />
                </div>
                <div className="row-input">
                    <label htmlFor="password">Senha</label>
                    <PasswordInput id="password" name="password" required className={errors.password ? 'field-error' : ''} />
                </div>
                <div className="row-input">
                    <label htmlFor="confirm-password">Confirmar Senha</label>
                    <PasswordInput id="confirm-password" name="confirm-password" required className={errors['confirm-password'] ? 'field-error' : ''} onInput={(e)=>{ e.target.setCustomValidity(''); setErrors(prev=>({ ...prev, ['confirm-password']: false })) }} />
                </div>
                <button type="submit" id='register'>Cadastrar</button>
                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <p>Aguarde...</p>
                    </div>
                )}
            </form>
        </UserContainer>
    );
}