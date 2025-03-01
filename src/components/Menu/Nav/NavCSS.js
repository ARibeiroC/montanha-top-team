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
            width: 150px;
            border: 1px solid transparent;
            color: var(--color-ice);
            font-weight: bold;
            font-size: 1.2rem;
            text-align: center;
            padding: .6rem 0;
            transition: .4s;

            &:hover{
                border-bottom: 1px solid tran;
                transform: translateY(-2px);
                color: var(--color-red);
            }
        }
    }

    @media (max-width: 425px){
        #navigation {
            height: 300px;
            width: 100vw;
            background: var(--color-black-opac-9);
            position: absolute;
            top: 12vh;
            right: -100%;

            z-index: 2;
            a {
                width: 100%;
                border-bottom: 1px solid var(--color-white)
            }
        }

        .show {
            right: 0 !important;
        }

        .hidden {
            right: -100% !important
        }

        .right {
            right: -100%;
        }
    }
`