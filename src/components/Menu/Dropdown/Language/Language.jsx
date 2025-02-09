import bandeira_brasil from '../../../../assets/bandeira-do-brasil.jpg'

import { Container } from './LanguageCSS'

export function Language({language}){
    return (
        <Container>
            <div className="language-dropdown">
                <img src={bandeira_brasil} alt={`${bandeira_brasil} correspondente ao idioma ${language}`} />
            </div>
        </Container>
    )
}