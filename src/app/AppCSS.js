import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 auto;
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    & > *:nth-child(2){
        flex: 1;
    }
`
