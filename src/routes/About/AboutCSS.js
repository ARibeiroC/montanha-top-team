import styled from "styled-components";
import schoolImage from '../../assets/3-mosqueteiros.jpg'

export const Container = styled.div`
    display: flex;

    height: 85vh;
    padding: 1rem;
    background: var(--color-darkgray);
    color: var(--color-ice);

    .description-about {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        width: 60%;
        z-index: 1;
        h2{
            font-size: 4rem;
            color: var(--color-red);
            text-shadow: 2px 2px 2px var(--color-ice);
        }

        h3{
            font-size: 2rem;
        }

        p {
            font-size: 1.4rem;
            line-height: 2.5rem;
        }
    }

    .school-image{
        width: 40%;
        z-index: 0;
        
        background: url(${schoolImage}) no-repeat top;
        background-size: cover;
    }
`