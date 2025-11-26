import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;

    padding-block: .6rem;
    background-color: var(--color-darkred);
    color: var(--color-ice);
    min-height: 6vh;

    .footer-content{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
