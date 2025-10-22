
import {Header} from "../Header/Header.jsx"
import { Home } from "../../routes/Home/Home"
import { About } from "../../routes/About/About"
import { Footer } from "../Footer/Footer"
import { Schedules } from "../../routes/WorkoutSchedules/WorkoutSchedules.jsx"

import { Outlet } from "react-router-dom"

export function MainContainer(){
    return (
        <div className="main-container">
            <Header/>
            <Home/>
            <About/>
            <Schedules/>
            <Footer/>
        </div>
    )
}