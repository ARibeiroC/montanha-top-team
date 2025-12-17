import { Header } from "../../components/Header/Header"
import { MainContainer } from "../../components/MainContainer/MainContainer"

import './Panel.css'

export function Panel(){
    return(
        <div className="panel-container">
            <div id="header">
                <Header id="header"/>
            </div>
            <div className="content">
                <MainContainer id="test" />
            </div>
        </div>
    )
}