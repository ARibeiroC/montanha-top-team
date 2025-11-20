import styled from 'styled-components';

export const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    color: var(--color-white);
    min-height: 88vh;


    h2{
        font-size: 2rem;
        text-align: center;
    }

    input, select, button[type="submit"] {
        padding: .6rem .4rem;
        border-radius: .4rem;
    }

    label{
        font-weight: bold;
    }
    
    form{
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 2rem;
        flex: 1;
        position: relative;

        .row-input{
            display: flex;
            flex-direction: column;
            gap: .4rem;
        }        

        #user-student{
            display: flex;
            gap: .4rem;
        }
        
        #field{
            display: flex;
            flex-direction: column;
            gap: .6rem;

            padding: .8rem .4rem;
            border: 1px solid;
            
            legend {
                font-size: 1.2rem;
                font-weight: 600;
                margin-inline: 1rem;
                margin-block: .4rem;
            }

            &.show {
                display: flex;
            }
    
            &.hidden{
                display: none;
            }
        }

        #register{
            background: var(--color-link);
            
            border: none;

            color: var(--color-ice);
            
            font-weight: bold;
            font-size: 1.4rem;
            margin-top: auto;
            margin-bottom: 2rem;
        }

    }
    .field-error{
        background-color: var(--color-error);
    }

    .loading-overlay{
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,.4);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .6rem;
        color: var(--color-ice);
    }

    .spinner{
        width: 36px;
        height: 36px;
        border: 4px solid var(--color-white-opac);
        border-top-color: var(--color-link);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin{
        to{ transform: rotate(360deg); }
    }
`;