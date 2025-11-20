import { Header } from "../../components/Header/Header"
import { MainContainer } from "../../components/MainContainer/MainContainer"

import { Container } from "./PanelCSS"

export function Panel(){
    return(
        <Container>
            <div id="header">
                <Header id="header"/>
            </div>
            <div className="content">
                <MainContainer id="test" />
            </div>
        </Container>
    )
}