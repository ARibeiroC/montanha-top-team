import { Header } from "../../components/Header/Header"
import { Home } from "../Home/Home"
import { About } from "../About/About"
import { Footer } from "../../components/Footer/Footer"

export function Panel(){
    return(
        <>
            <Header />
            <Home />
            <About />
            <Footer />
        </>
    )
}