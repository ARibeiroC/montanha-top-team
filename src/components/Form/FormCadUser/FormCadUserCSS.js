import styled from 'styled-components';

export const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    color: var(--color-white);
    flex: 1;

    h2{
        font-size: 2rem;
    }

    input, select, button {
        padding: .6rem .4rem;
        border-radius: .4rem;
    }
    
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;

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
            legend{
                font-size: 1.2rem;
                font-weight: 600;
                margin-inline: 1rem;
                margin-block: .4rem;
            }
    }
`;