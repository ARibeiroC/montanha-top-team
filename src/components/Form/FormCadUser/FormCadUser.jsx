import { useState } from 'react';

import { UserContainer } from './FormCadUserCSS.js';

export function FormCadUser() {
    const [isStudent, setIsStudent] = useState(false)

    return (
        <UserContainer id='form-cad-user'>
            <h2>Cadastro de Aluno</h2>
            <form>
                <div className="row-input">
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="row-input">
                    <label htmlFor="dt-nasc">Data de Nascimento</label>
                    <input type="date" id="dt-nasc" name="dt-nasc" required />
                </div>
                <div id='user-student'>
                    <input type="checkbox" name="student" id="student" onChange={(e)=>setIsStudent(e.target.checked)} />
                    <label htmlFor="student">Você é estudante? ( Fundamental / Médio )</label>
                </div>
                <fieldset id='field' className={isStudent ? 'show' : 'hidden'}>
                    <legend id='title-fieldset'>Dados Escolares</legend>
                    <label htmlFor="school">Nome da Escola Completo</label>
                    <input type="text" id="school" name="school" />
                    <label htmlFor="serie">Serie</label>
                    <input type="text" id="serie" name="serie" />
                </fieldset>
                <div className="row-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="row-input">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="row-input">
                    <label htmlFor="confirm-password">Confirmar Senha</label>
                    <input type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </UserContainer>
    );
}