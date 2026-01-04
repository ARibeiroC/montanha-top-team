import { useState } from 'react';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput.jsx'
import { useNavigate } from 'react-router-dom'
import { studentService } from '@/services/studentService.js'

import './FormCadUser.css';
// import { StateMenuContext } from '../../../context/StateMenuContext.jsx';

export function FormCadUser() {
    const [isStudent, setIsStudent] = useState(false)
    const [isMinor, setIsMinor] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    // const database = StateMenuContext()

    const handleDateChange = (e) => {
        const birthDate = new Date(e.target.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setIsMinor(age < 18);
    };

    async function handleSubmit(e){
        const aluno = {}
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
        
        // Estrutura para o MongoDB
        aluno.name = data.name
        aluno.birthDate = data['dt-nasc']
        aluno.schoolInfo = data.school ? {
                schoolName: data.school,
                grade: data.serie
            } : null 
        
        // Dados do responsável se for menor
        aluno.guardianName = isMinor ? data.guardian : null

        // Dados de autenticação
        aluno.auth = {
                email: data.email,
                password: data.password,
            }

        // Inicialização de campos de gestão
        aluno.attendance = [] // Histórico de presença
        aluno.beltInfo = {
            currentBelt: 'Branca',
            stripes: 0,
            history: [] // Histórico de graduações
        }
        aluno.events = [] // Campeonatos participados
        aluno.active = true // Status do aluno

        // Dados do perfil (Inicializados vazios)
        aluno.profilePic = null
        aluno.height = null
        aluno.weight = null

        // Filial e Professor
        aluno.branch = data.branch || 'Montanha Top Team'
        aluno.professorName = data.professorName || ''

        setLoading(true)

        try {
            await studentService.createStudent(aluno)
            form.reset()
            setIsStudent(false)
            setIsMinor(false)
            setErrors({})
            navigate('/login')
        } catch(err) {
            console.log(err)
            setErrors(prev=>({ ...prev, email: true }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-cad-user-container" id='form-cad-user'>
            <h2>Cadastro de Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div className="row-input">
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" id="name" name="name" required className={errors.name ? 'field-error' : ''} minLength={12} maxLength={80} />
                </div>
                <div className="row-input">
                    <label htmlFor="dt-nasc">Data de Nascimento</label>
                    <input type="date" id="dt-nasc" name="dt-nasc" required className={errors['dt-nasc'] ? 'field-error' : ''} onChange={handleDateChange} />
                </div>
                
                {isMinor && (
                    <div className="row-input">
                        <label htmlFor="guardian">Nome do Responsável</label>
                        <input type="text" id="guardian" name="guardian" required className={errors.guardian ? 'field-error' : ''} minLength={5} placeholder="Nome do pai, mãe ou responsável" />
                    </div>
                )}

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
                    <label htmlFor="branch">Filial</label>
                    <select id="branch" name="branch" required>
                        <option value="Montanha Top Team">Montanha Top Team (Matriz)</option>
                        <option value="Montanha Top Team - Wagner">Montanha Top Team - Wagner</option>
                        <option value="Montanha Top Team - Marcos">Montanha Top Team - Marcos</option>
                    </select>
                </div>
                <div className="row-input">
                    <label htmlFor="professorName">Nome do Professor</label>
                    <input type="text" id="professorName" name="professorName" required placeholder="Ex: Guilherme Nascimento" />
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
        </div>
    );
}
