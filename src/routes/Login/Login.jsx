import { Container } from "./LoginCSS";

// IMPORT COMPONENTS
import { Belt } from "../../components/Belt/Belt";
import { Footer } from "../../components/Footer/Footer";

export function Login(){
    return (
        <Container> 
            <Belt/>
            <div id="login-page">  
                <h1>Login</h1>
                <form id="login-form">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail"/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha"/>
                    <button type="submit">Entrar</button>
                </form>
                <p>Ainda não possui uma conta? <a href="/Register">Registre-se</a></p>
            </div>
            <Footer/>
        </Container>
    )
}