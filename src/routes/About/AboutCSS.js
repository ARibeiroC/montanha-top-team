import styled from "styled-components";
import schoolImage from '../../assets/3-mosqueteiros.jpg'

export const Container = styled.div`
    display: flex;

    min-height: 80vh;
    padding: 1rem;
    background: var(--color-darkgray);
    color: var(--color-ice);

    .description-about {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        width: 60%;

        h2{
            font-size: 4rem;
            color: var(--color-link);
            text-shadow: 2px 2px 2px var(--color-ice);
        }

        h3{
            font-size: 2rem;
            color: var(--color-link);
        }

        p {
            font-size: 1.4rem;
            line-height: 1.5rem;
        }
    }

    .school-image{
        width: 40%;
        z-index: 0;
        
        background: url(${schoolImage}) no-repeat top;
        background-size: cover;
    }

    @media (max-width: 768px){
        background-repeat:  no-repeat;
        background-position: top;
        background-size: cover;
        background-color: Whitesmoke;
        background-blend-mode: overlay;
        color: var(--color-black);
        .description-about {
            width: 100%;
            text-align: center;
            h2{
                font-size: 2.6rem;
                text-align: start;
            }

            h3{
                font-size: 1.4rem;
            }

            p{
                font-size: 1rem;
            }
        }

        .school-image{
            display: none;
        }

        .subscribe{
            padding: 2rem;

            button{
                padding: .8rem 1.2rem;
                font-size: 1.2rem;
                background-color: var(--color-link);
                border: none;
                color: var(--color-ice);
                font-weight: bold;
                border-radius: .4rem;
                transition: .2s ease-in-out;

                &:active{
                    transform: translateY(1px);
                    transform: scale(0.99);
                }

                &:hover{
                    cursor: pointer;
                    background-color: var(--color-red);
                }
            } 
        }

    }
`