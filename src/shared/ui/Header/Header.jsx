
import { Container } from './HeaderCSS'

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