
// COMPONENTS IMPORT
import { Home } from "../../routes/Panel/Home/Home"
import { About } from "../../routes/Panel/About/About"
import { Footer } from "../Footer/Footer"
import { Schedules } from "../../routes/Panel/schedules/Schedules"

export function MainContainer(){
    const isLogin = window.location.href.includes("Login")
    const isLogged = false;


    return (
        <div className="main-container">
            <Home/>
            <About/>
            <Schedules/>
            <Footer/>
        </div>
    )
}