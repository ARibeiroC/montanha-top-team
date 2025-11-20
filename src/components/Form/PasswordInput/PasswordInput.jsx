import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Wrapper, StyledInput, Toggle } from './PasswordInputCSS.js'

export function PasswordInput({ id, name, required, className, onInput, placeholder }){
    const [show, setShow] = useState(false)
    return (
        <Wrapper>
            <StyledInput type={show ? 'text' : 'password'} id={id} name={name} required={required} className={className} onInput={onInput} placeholder={placeholder} />
            <Toggle type="button" aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} onClick={()=>setShow(p=>!p)}>
                {show ? <FaEyeSlash /> : <FaEye />}
            </Toggle>
        </Wrapper>
    )
}