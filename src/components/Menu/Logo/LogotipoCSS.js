import styled from "styled-components";


export const Container = styled.div`
    max-width: 200px;

    img {
        max-width: 100%;
    }

    @media (max-width: 425px){
        img {
            width: 60%;
        }
    }
`