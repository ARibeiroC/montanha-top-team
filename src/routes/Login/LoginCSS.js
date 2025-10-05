import styled from "styled-components"

export const Container = styled.div`
    color: var(--color-ice);
    height: 86vh;

    #login-page {
        display: flex;
        flex-direction: column;

        gap: 2rem;
        height: 100%;
        padding: 1rem;

        h1 {
            font-size: 3rem;
            text-align: center;
            font-family: 'Black Ops One', cursive;
            color: var(--color-red);
            margin-top: 2rem;
            margin-bottom: 1rem;
        }

        p {
            text-align: center;
            font-size: 1.2rem;
            margin-top: 1rem;
            a {
                color: var(--color-red);
                font-weight: bold;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        #login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            margin: 0 auto;
            width: 90%;
            padding: 1rem;
            background-color: var(--color-darkbrown);
            border-radius: .6rem;


            label {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
                text-shadow: 1px 1px 2px black;
                color: var(--color-ice);
            }

            input {
                padding: 0.5rem;
                font-size: 1rem;
                border: 1px solid var(--color-gray);
                border-radius: 4px;
                outline: none;
            }

            button {
                margin-top: 1rem;
                padding: 0.75rem;
                font-size: 1.2rem;
                background-color: var(--color-red);
                color: var(--color-ice);
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                font-weight: bold;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

                &:hover {
                    background-color: var(--color-dark-red);
                }
            }
    }
    
`