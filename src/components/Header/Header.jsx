
// CSS IMPORTS
import { Container } from './HeaderCSS.js'

// COMPONENTS IMPORTS
import { Belt } from '../Belt/Belt'
import { Menu } from '../Menu/Menu'

export function Header() {
    return (
        <Container>
            <Belt />
            <Menu />    
        </Container>
    )
}