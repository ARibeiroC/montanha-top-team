import { Header } from "../../components/Header/Header"
import { MainContainer } from "../../components/MainContainer/MainContainer"
import { Login } from "../Login/Login"

import { Container } from "./PanelCSS"

import { useParams } from "react-router-dom"

export function Panel(){
    return(
        <Container>
            <div id="header">
                <Header id="header"/>
            </div>
            <div className="content">
                {}
                <MainContainer id="test" />
            </div>
        </Container>
    )
}