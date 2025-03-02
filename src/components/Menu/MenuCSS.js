import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    height: 10vh;
    padding: .6rem 1rem;

    .icon-menu-responsive{
        input {
            display: none;
        }
    }

    // RESPONSIVE DISPLAY LAYOUTS
    @media (max-width: 768px) {
        height: 8vh;
        padding: .6rem .4rem;
        
        .icon-menu-responsive {
            color: white;
            font-size: 2rem;
            input {
                display: inline;
            }
        }
    }
`