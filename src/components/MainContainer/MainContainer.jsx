import { Home } from "../../routes/Home/Home"
import { About } from "../../routes/About/About"
import { Footer } from "../Footer/Footer"
import { Schedules } from "../../routes/schedules/Schedules"

export function MainContainer(){
    return (
        <div className="main-container">
            <Home/>
            <About/>
            <Schedules/>
            <Footer/>
        </div>
    )
}