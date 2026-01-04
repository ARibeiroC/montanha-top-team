
import { Home } from "../../routes/Home/Home"
import { About } from "../../routes/About/About"
import { SchedulesTable } from "../../routes/Schedules/SchedulesTable"


export function MainContainer(){
    return (
        <div className="main-container">
            <Home/>
            <About/>
            <SchedulesTable/>
        </div>
    )
}

export default MainContainer