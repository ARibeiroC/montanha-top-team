import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;

    color: var(--color-ice);

    form{
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 300px;
        #type-access-user{
            display: flex;
            justify-content: space-around;
            gap: 1rem;
            .radio-group{
                display: flex;
                gap: .6rem
            }
        }
        label{
            display: flex;
            flex-direction: column;
            font-size: 18px;
            input[type="text"]
            {
                margin-top: 5px;
                padding: 8px;
                border-radius: 5px;
                border: 1px solid var(--color-darkgray);
                font-size: 16px;
            }
        }
    }
`