
// CSS IMPORTS
import { Container } from './HeaderCSS'

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