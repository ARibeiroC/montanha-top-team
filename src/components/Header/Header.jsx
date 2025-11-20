
// CSS IMPORTS
import { Container } from './HeaderCSS'

// COMPONENTS IMPORTS
import { Belt } from '../Belt/Belt'
import { Navigation } from '../Nav/Navigation'

export function Header() {
    return (
        <Container>
            <Belt />
            <Navigation />    
        </Container>
    )
}