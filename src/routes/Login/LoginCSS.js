import styled from "styled-components";
import backgroundImage from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 88vh;

    padding: 2rem;

    color: var(--color-ice);

    background-color: rgba(0,0,0, .9);
    background-image: url(${backgroundImage});
    background-blend-mode: darken;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 96%;

    .card{
        width: 100%;
        max-width: 420px;
        background: var(--color-black-opac-9);
        border: 1px solid var(--color-link);
        border-radius: .6rem;
        box-shadow: 2px 2px 8px rgba(0,0,0,.8);
        padding: 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    h2{
        color: var(--color-link);
        text-align: center;
    }

    .row{
        display: flex;
        flex-direction: column;
        gap: .4rem;
    }

    input, select, button[type="submit"] {
        padding: .6rem .4rem;
        border-radius: .4rem;
    }

    .field-error{
        background-color: rgba(189, 15, 32, .2);
    }

    .actions{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: relative;

        #login-button{
            background: var(--color-link);
            color: var(--color-ice);
            border: none;
            border-radius: .4rem;
            padding: .6rem 1rem;
            font-weight: bold;
            cursor: pointer;
        }
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
        border-radius: .6rem;
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
`
