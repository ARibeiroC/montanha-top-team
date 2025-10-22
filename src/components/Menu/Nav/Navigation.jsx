import { Link } from "react-router-dom"
import { Container } from "./NavCSS"
import { useContext, useEffect } from "react"
import { StateMenuContext } from "../../../context/StateMenuContext"

export function Navigation({state}){

    const {stateMenu, setStateMenu} = useContext(StateMenuContext)

    function handleToggleMenu(element){
        setStateMenu('hidden') 
    }

    useEffect(()=>{
        setStateMenu(state)
    },[stateMenu])

    return (
        <Container>
            <div id="navigation" className={`${stateMenu}`}>
                <a href="#belt" onClick={(e)=> handleToggleMenu(e.target)}>
                    Página Inicial
                    </a>
                <a href="#about" onClick={(e)=>handleToggleMenu(e.target)}>
                    Sobre nós
                    </a>
                <a href="#team" onClick={(e)=>{handleToggleMenu(e.target)}}>
                    Equipe
                    </a>
                {/* <a href="#" onClick={(e)=>{handleToggleMenu(e.target)}}>
                    Projetos Sociais
                </a> */}
                <a href="#" onClick={(e)=>{handleToggleMenu(e.target)}}>
                    Filiais
                </a>
                <a href="#schedules" onClick={(e)=>{handleToggleMenu(e.target)}}>
                    Horários
                </a>
                {/* <a href="#" onClick={(e)=>{handleToggleMenu(e.target)}}>
                    FAQ's
                </a> */}
            </div>
        </Container>
    )
}