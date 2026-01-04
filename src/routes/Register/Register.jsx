// STYLED COMPONENTS IMPORT
import "./Register.css";

// COMPONENTS IMPORT
import { FormCadUser } from "../../components/Form/FormCadUser/FormCadUser.jsx";
import backgroundImage from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png';

export function Register() {
  return (
    <div className="register-container">
        <div className="register-logo">
            <img src={backgroundImage} alt="Montanha Top Team" />
        </div>
        <div className="card">
            <FormCadUser />
        </div>
    </div>
  );
}

export default Register