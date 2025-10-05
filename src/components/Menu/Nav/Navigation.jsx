import { Link } from "react-router-dom"
import { Container } from "./NavCSS"
import { useContext, useEffect } from "react"
import { StateMenuContext } from "../../../context/StateMenuContext"

export function Navigation({state}){

    const [stateMenu] = useContext(StateMenuContext)

    function handleToggleMenu(){
        stateMenu.setStateMenu('hidden')
    }

    return (
        <Container>
            <div id="navigation" className={`${state}`}>
                <a href="#belt" onClick={(e)=> handleToggleMenu()}>
                    Página Inicial
                    </a>
                <a href="#about" onClick={(e)=>handleToggleMenu()}>
                    Sobre nós
                    </a>
                <a href="#team" onClick={(e)=>{handleToggleMenu()}}>
                    Equipe
                    </a>
                <a href="#" onClick={(e)=>{handleToggleMenu()}}>
                    Projetos Sociais
                </a>
                <a href="#" onClick={(e)=>{handleToggleMenu()}}>
                    Filiais
                </a>
                <a href="#schedules" onClick={(e)=>{handleToggleMenu()}}>
                    Horários
                </a>
                <a href="#" onClick={(e)=>{handleToggleMenu()}}>
                    FAQ's
                </a>
            </div>
        </Container>
    )
}