import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: start;
    width: 50px;
    height: 50px;

    overflow: hidden;

    border: 2px solid white;
    border-radius: 50%;
    padding-right: 15px;

    img {
        max-width: 200%;
    }

    @media(max-width: 375px){
        display: none;
    }
`