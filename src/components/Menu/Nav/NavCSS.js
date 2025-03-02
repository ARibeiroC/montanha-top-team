import styled from "styled-components";

export const Container = styled.nav`
    display: flex;
    justify-content: center;
    
    #navigation {
        display: flex;
        justify-content: center;
        transition: .4s;
        
        margin-top: 16px;

        a {
            border: 1px solid transparent;
            color: var(--color-ice);
            font-weight: bold;
            font-size: 1.2rem;
            text-align: center;
            padding: .6rem 0;
            transition: .4s ease-in-out;

            &:hover{
                border-bottom: 1px solid tran;
                transform: translateY(-2px);
                color: var(--color-red);
            }
        }
    }

    @media (max-width: 768px){
        position: absolute;
        overflow-x: hidden;

        top: 12vh;
        right: 0%;
        
        width: 100%;

        z-index: 2;

        #navigation{
            display: flex;
            flex-direction: column;

            width: 100%;
            position: relative;
            
            a {
                width: 100%;
                background: var(--color-black-opac);
            }
        }

        .show{
            right: 0% !important;
        }

        .hidden {
            right: -100% !important;
        }
    }
`