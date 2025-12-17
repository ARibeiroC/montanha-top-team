
import './Header.css'

import { Belt } from '../Belt/Belt'
import { Navigation } from '../Nav/Navigation'

export function Header() {
    return (
        <div className="header-container">
            <Belt />
            <Navigation />    
        </div>
    )
}