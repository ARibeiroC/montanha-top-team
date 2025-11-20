import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    min-width: 200px;
    
    img {
        max-width: 100%;
    }

    @media (max-width: 768px){
        img {
            max-width: 80%;
            max-height: 80%;
        }
    }
`