import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;

    padding: .4rem;

    width: 100%;
    height: 6vh;
    background: var(--color-darkgray);
    color: var(--color-ice);

    p {
        display: none;
    }

    .services {
        display: flex;
        gap: .6rem;

        a {  
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .4rem;
            border: 1px solid transparent;
            border-radius: .6rem;
            transition: .4s;
            font-weight: bold;
            background: var(--color-darkred);
            color: var(--color-ice);
            padding: .2rem .4rem;

            &:hover {
                background: var(--color-red); 
            }
        }
    }

    .contact {
        display: flex;
        justify-content: end;
        gap: 1rem;

        .address, .phone, .email, .instagram {
            display: flex;
            align-items: center;
        }
    }

    .contact {
        cursor: pointer;
    }
    
    
    .phone {
        display: flex;
        gap: .6rem;
    }

    .phone p, .services p {
        display: block;
    }

    @media (max-width: 768px){
        .contact {
            i {
                font-size: 1.4rem;
            }
            .phone{
                i{
                    color: var(--color-whatsapp);
                }
            }
            .instagram {
                color: var(--color-instagram);
            }
        }
        .services {
            a {
                width: 30px;
                p {
                    display: none;
                }
            } 
        }
    }
`