import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;
    font-size: 1.4rem;
    color: var(--color-ice);
    
    a{
        color: var(--color-ice);
    }

    #title-site{
        display: flex;
        align-items: center;

        h1{
            font-size: 1.6rem;
            font-weight: bold;
            padding: 0;
            margin: 0;
        }
    }

    .controlls{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        a{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: .4rem;
        }
    }
`