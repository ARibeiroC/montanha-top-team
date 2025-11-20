import { Container } from './AboutCSS'


export function About(){
  return (
    <Container id='about'>
        <div className="description-about">
          <h2>Sobre Nós</h2>
          <h3>
            Equipe Montanha Top Team: Forjada pelo Professor Montanha e moldada por
            grandes mestres.
          </h3>
          <p>
            Sob a liderança do renomado Professor Alderi Henrique da Silva, conhecido carinhosamente como Montanha, a Equipe Montanha Top Team se destaca como referência em Jiu-Jitsu na região do Jardim Guarani - Brasilândia, um refúgio para aqueles que buscam aprimorar suas habilidades, desenvolver sua disciplina e fortalecer o corpo e a mente.  
          </p>
          <p>
            Ao lado do Professor Montanha, contamos com uma equipe de outros professores altamente qualificados, como Fabiano Andrade de Freitas 11/2022 e Odailton Donizete Bezerra Faixa Preta desde 11/2024, que contribuem para o desenvolvimento integral de nossos alunos.
            Com anos de experiência e um profundo conhecimento da arte suave, nossos professores transmitem não apenas técnicas, mas também valores como respeito, humildade e perseverança.
          </p>
          <div className="subscribe">
            <button>Junte-se a Nós!</button>
          </div>
          <div className="social-media">
              <div className="instagram">
                <a href="https://www.instagram.com/montanhatopteam/">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div> 
              <div className="phone">
                <a href="https://wa.me/5511976235959" target="_blank" rel="noopener noreferrer">
                  <i className='fa-brands fa-whatsapp'></i>
                </a>
              </div>
          </div>
        </div>
    </Container>
  )
}
