import styled from 'styled-components'

export const Container = styled.div`
    color: var(--color-ice);
    padding: 2rem;

    h1{
        font-size: 4rem;
        color: var(--color-red);
        text-shadow: 2px 2px 2px var(--color-ice);
    }

    .container{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, auto);
        gap: 1rem;

        padding: 2rem;
        .week{
            display: flex;
            flex-direction: column;
            gap: .4rem;
            width: 500px;
            margin: 0 auto;
            text-align: center;

            h2{
                background-color: var(--color-darkred);
                padding: .4rem 6rem;
            }
            .container-card-week{
                width: 100%;
                height: auto;
                // overflow-y: hidden;
                .header{
                    display: flex;
                    display: flex;
                    .hours{
                        flex: 2;
                    }

                    .teachers, .classifications{
                        flex: 3
                    }
                }
                .content{
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    .row{
                        display: flex;
                        .hours{
                            flex: 2;
                        }

                        .teachers, .classifications{
                            flex: 3
                        }
                    }
                }
            }
        }
        
        #saturday{
            grid-column: 2 / 3;
        }
    }
    .hours, .classifications{
        display: flex;
        min-height: 2.5rem;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-darkred);
        p{
            padding: .4rem;
        }
    }

    .teachers{
        display: flex;
        flex-direction: column !important;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-darkred);
        p{
            padding: .4rem;
        }
    }
`