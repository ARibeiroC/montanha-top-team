// IMPORT HOOK
import logotipo from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png'


// CSS IMPORT
import { Container } from "./MenuCSS"
import { Logotipo } from "./Logo/Logotipo"
import { Navigation } from "./Nav/Navigation"
import { Language } from './Dropdown/Language/Language'
import { useContext, useState } from 'react'

import { StateMenuContext } from '../../context/StateMenuContext'

export function Menu() {
   
    const {stateMenu, setStateMenu} = useContext(StateMenuContext)

    function changeState(e){
        const checkbox = e.target
        if (stateMenu === 'hidden'){
            setStateMenu("show")
        } else {
            setStateMenu('hidden')
        }
    }

    return (
        <Container>
            <Logotipo logotipo={logotipo} responsive={'responsive'}/>
            <Navigation state={stateMenu} />
            <Language responsive={"responsive"}/>
            <label className="icon-menu-responsive" onClick={(e)=>changeState(e)}>
                <i className="fa-solid fa-bars"></i>
            </label>
        </Container>
    )
}