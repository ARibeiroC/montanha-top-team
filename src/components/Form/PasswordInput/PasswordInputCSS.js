import styled from 'styled-components'

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`

export const StyledInput = styled.input`
    flex: 1;
    width: 100%;
    padding-right: 2.6rem;
`

export const Toggle = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: .6rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--color-black);
    font-size: 1.2rem;
`