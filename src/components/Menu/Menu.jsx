// IMPORT HOOK
import logotipo from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png'


// CSS IMPORT
import { Container } from "./MenuCSS"
import { Logotipo } from "./Logo/Logotipo"
import { Navigation } from "./Nav/Navigation"
import { Language } from './Dropdown/Language/Language'
import { useRef, useState } from 'react'

export function Menu() {
    const [state, setState] = useState('hidden')
    const check = useRef()

    if (!check) return


    function changeState(){
        if (check.current.checked) {
            setState('show')
            console.log(check.current.checked)
        } else {
            setState('hidden')
            console.log(check.current.checked)
        }
    }

    console.log(state)

    return (
        <Container>
            <Logotipo logotipo={logotipo} responsive={'responsive'}/>
            <Navigation orientation={'left'} state={state} />
            <Language responsive={"responsive"}/>
            <label className="icon-menu-responsive" onClick={()=>{changeState()}}>
                <input type="checkbox" name="icon-menu-responsive" id="icon-menu-responsive" ref={check}/>
                <i className="fa-solid fa-bars"></i>
            </label>
        </Container>
    )
}