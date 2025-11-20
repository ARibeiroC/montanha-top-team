import styled from "styled-components";

export const Container = styled.div`
    min-height: 90vh;
    color: white;

    position: relative;
    video{
        position:absolute;
        z-index: -1;
    }

    #title-logo{
        font-size: 2.5rem;
        color: var(--color-red);
        text-shadow: 1px 1px 1px var(--color-ice);
    }
        
    #background-video{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: -1;
        
        background-color: rgba(0,0,0,.8);
    }

    video{
        min-width: 100%;
    }

    #home{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        height: 80vh;
        padding: .6rem;
        #logo-container{
            display: flex;
            flex-direction: column;

            
            #logo{
                border: 1px solid var(--color-ice);
                img{
                    width: 20rem;
                }
            }

            #title-logo{
                text-align: center;
                font-size: 2rem;
            }
        }



        .phrase{
            text-align: center;
            font-size: 1.4rem;
        }

        .content-header{
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            text-align: center;
            font-size: 1.2rem;
        }

        .btn-controller{
            display: flex;
            justify-content: center;
            width: 100%;
            button {
                font-size: 1.2rem;
                font-weight: bold;
                padding: .6rem 1rem;
            }

        }

        .arrow-content{
            display: flex;
            font-size: 2rem;

            #border{
                border: 2px solid var(--color-ice);
                border-radius: 1rem;
                height: 4rem;
                width: 2.2rem;

                a{
                    position: relative;
                    color: var(--color-ice);
                    display: inline-block;
                    #arrow{
                        animation: arrowAnimation 1.2s ease-in-out infinite alternate;
                        position: absolute;
                    }
                }

                @keyframes arrowAnimation{
                    from {top: -.1rem;}
                    to {top: -1.8rem;}
                }
            }
        }
    }
`