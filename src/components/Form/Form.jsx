import PropTypes from 'prop-types';
import "./Form.css";
import { FormCadUser } from "./FormCadUser/FormCadUser.jsx";
import { FormCadAdmin } from "./FormCadAdmin/FormCadAdmin.jsx";

const FORM_COMPONENTS = {
    'form-cad-user': FormCadUser,
    'form-cad-admin': FormCadAdmin
};

export function Form({ form = 'form-cad-user' }) {
    const SelectedForm = FORM_COMPONENTS[form];

    return (
        <div className="form-container">
            <div id="banner-form" hidden>
                <h2>Seja Bem-Vindo</h2>
                <h4>&quot;A escalada é longa e desafiadora, mas cada lagrima e cada gota de suor te levam mais perto do topo.&quot;</h4>
            </div>
            <div id="form-area">
                {SelectedForm ? <SelectedForm /> : <p>Não foi encontrado nenhum formulário</p>}
            </div>
        </div>
    )
}

Form.propTypes = {
    form: PropTypes.oneOf(['form-cad-user', 'form-cad-admin'])
};
