// IMPORT CSS
import { Container } from "./RegisterCSS"

// IMPORT COMPONENTS
import { Belt } from "../../components/Belt/Belt";
import { Footer } from "../../components/Footer/Footer";


export function Register() {
    return (
        <Container> 
            <Belt/>
            <div id="register-page">  
                <h1>Register</h1>
                <form id="login-form">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail"/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha"/>
                    <button type="submit">Entrar</button>
                </form>
                <p>Já possui uma conta? <a href="/Login">Login</a></p>
            </div>
            <Footer/>
        </Container>
    )
}