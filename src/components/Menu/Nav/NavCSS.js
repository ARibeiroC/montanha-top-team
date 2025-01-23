import styled from "styled-components";

export const Container = styled.nav`
    display: flex;
    justify-content: center;
    a {
        width: 120px;
        border: 1px solid transparent;
        color: var(--color-ice);
        font-weight: bold;
        text-align: center;
        padding: .6rem 0;
        transition: .4s;

        &:hover{
            border-bottom: 1px solid ;
            transform: translateY(-2px);
            color: var(--color-red);
        }
    }
`