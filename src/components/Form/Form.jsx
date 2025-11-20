import { Container } from "./FormCSS.js";
import { FormCadUser } from "./FormCadUser/FormCadUser.jsx";
import { FormCadAdmin } from "./FormCadAdmin/FormCadAdmin.jsx";


export function Form({form = 'form-cad-user'}) {
    return (
        <Container>
            <div id="banner-form" hidden>
                <h2>Seja Bem-Vindo</h2>
                <h4>"A escalada é longa e desafiadora, mas cada lagrima e cada gota de suor te levam mais perto do topo."</h4>
            </div>
            <div id="form-area">
                {/* <FormCadUser /> */}
                {form === 'form-cad-user' ? <FormCadUser /> : form == 'form-cad-admin' ? <FormCadAdmin /> : <p>Não foi encontrado nenhum formulário</p>}
            </div>
        </Container>
    )
}