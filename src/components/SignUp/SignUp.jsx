// IMPORT STYLED COMPONENTS
import { useEffect, useState } from "react";
import { Container } from "./SignUpCSS";

export function SignUp(TypeAccess){
    const [accessType, setAccessType] = useState(null);
    const [login, setLogin] = useState([]);

    useEffect(()=>{
        setLogin((prevState)=> ({ ...prevState, typeAccess: accessType }));
        // handleSubmit()
    },[accessType, login]);

    function handleSubmit(form){
        form.preventDefault()

        const par = Array.from(form.target)

        par.forEach((input)=>{
            if (input.checked){
                // setLogin();
                setAccessType(input.value);
            }
            if (input.id === 'username' || input.id === 'password'){
                setLogin((prevState)=> ({ ...prevState, [input.id]: input.value }));
            } else{
                return;
            }
        });

   }


    return (
        <Container id="sign-up">
            <h1>Faça o Login</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div id="type-access-user">
                    <div className='radio-group'>
                        <label htmlFor="student">Aluno</label>
                        <input type="radio" name="sign" id="student" value='student' required/>
                    </div>
                    <div className='radio-group'>
                        <label htmlFor="instructor">Instrutor</label>
                        <input type="radio" name="sign" id="instructor" value='instructor' required/>
                    </div>
                </div>
                <label htmlFor='username'>
                    Usuário:
                    <input type="text" name="username" id="username" />
                </label>
                <label htmlFor='password'>
                    Senha:
                    <input type="text" name="password" id="password" />
                </label>
                <button type="submit">Entrar</button>
            </form>
        </Container>
    )
}