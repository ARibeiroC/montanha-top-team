import "./FormCadAdmin.css";

export function FormCadAdmin() {
    return (
        <div className="form-cad-admin-container">
            <form>
                <div className="row-form">
                    <label htmlFor="name">Nome Completo:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="row-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="row-form">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="row-form">
                    <label htmlFor="confirm-password">Confirmar Senha:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <button type="submit">Cadastrar Administrador</button>
            </form>
        </div>
    )
}