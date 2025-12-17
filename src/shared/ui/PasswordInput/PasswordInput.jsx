import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import PropTypes from 'prop-types';
import './PasswordInput.css'

export function PasswordInput({ id, name, required, className, onInput, placeholder }){
    const [show, setShow] = useState(false)
    return (
        <div className="password-input-wrapper">
            <input type={show ? 'text' : 'password'} id={id} name={name} required={required} className={className} onInput={onInput} placeholder={placeholder} />
            <button type="button" className="toggle-btn" aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} onClick={()=>setShow(p=>!p)}>
                {show ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    )
}

PasswordInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    onInput: PropTypes.func,
    placeholder: PropTypes.string
};