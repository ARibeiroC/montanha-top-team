import styled from "styled-components";


export const Container = styled.div`
    max-width: 200px;

    img {
        max-width: 100%;
    }

    @media (max-width: 768px){
        img {
            max-width: 60%;
            max-height: 60%;
        }
    }
`