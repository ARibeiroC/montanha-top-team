import styled from "styled-components";

export const Container = styled.div`
    color: var(--color-ice);
    padding-inline: 1rem;
    padding-top: 2rem;
    padding-bottom: 4rem;

    h1{
        font-size: 2rem;
        text-align: center;
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

                .header{
                    display: flex;
                    // font-size: .;
                    font-weight: bold;
                    word-wrap: break-word;
                }
                .content{
                    display: flex;
                    flex-direction: column;

                    .row{
                        display: flex;
                        font-size: .9rem;
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

    @media (max-width: 768px){
        .container{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 0;
            .week{
                width: 100%;
                h2{
                    padding: .4rem 2rem;
                }
                .container-card-week{
                    width: 100%;
                    .header{
                        .hours{
                            flex: 1;
                        }
                        .teachers, .classifications{
                            flex: 1;
                        } 
                    }
                    .content{
                        .row{
                            .hours{
                                flex: 1;
                            }
                            .teachers, .classifications{
                                flex: 1;
                            }
                        }
                    }
                }
            }
        }
    }
`