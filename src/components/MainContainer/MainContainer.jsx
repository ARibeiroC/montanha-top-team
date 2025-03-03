
import { Home } from "../../routes/Home/Home"
import { About } from "../../routes/About/About"
import { Footer } from "../Footer/Footer"
import { Team } from "../../routes/Team/Team"

export function MainContainer(){
    return (
        <div className="main-container">
            <Home/>
            <About/>
            {/* <Team/> */}
            <Footer/>
        </div>
    )
}