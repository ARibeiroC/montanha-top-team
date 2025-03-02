import styled from "styled-components";
import background from "../../assets/bg-test.jpg"

export const Container = styled.div`
    
    padding: 1rem;

    height: 80vh;
    background-image: url('${background}');
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0,0,0,.9);
    background-blend-mode: overlay;
    background-size: cover;

    color: var(--color-ice);
    
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .content-banner{
            display: flex;
            flex-direction: column;

            img {
                // display: none;
                max-width: 85%;
                max-height: 85%;
                position: absolute;
                top: 8rem;
                left: 8rem;
                z-index: 0;
            }   

            .content-left {
                display: flex;
                flex-direction: column;
                // justify-content: space-around;
                gap: 5rem;

                z-index: 0;

                .content-header {
                    .title {
                        font-family: Black Ops One;
                        font-size: 5rem;
                        color: var(--color-red);
                        padding-top: 5rem;
                        padding-bottom: 0rem;

                        text-align: center;
                    }

                    .subtitle {
                        font-size: 2rem;
                        font-weight: bold;
                        text-align: center;
                    }
                    
                    .phrase{
                        font-size: 2rem;
                        font-style: italic;
                        color: var(--color-white);
                        padding-top: 2.5rem;
                        text-align: center;
                    }

                    .services {
                        font-size: 1.5rem;
                        font-style: italic;
                        color: var(--color-gold);
                        padding-top: 2.5rem;
                        text-align: center;
                    }
                }

                .btn-controller {
                    display: flex;
                    justify-content: end;

                    padding-right: 5rem;

                    button {
                        padding: 1rem 2rem;
                        background: var(--color-red);
                        box-shadow: 0px 0px 10px 4px var(--color-red);
                        border: 1px solid transparent;
                        
                        font-size: 1.2rem;
                        color: var(--color-white);
                        transition: .3s;

                        &:hover {
                            // background: var(--color-link)
                            
                        }

                        &:active{
                            box-shadow: 2px 2px 10px 2px inset rgb(0,0,0,.8);
                            transform: translateY(2px);
                        }
                    }
                }           
            }
        }
    }

    .arrow-content {
        display: flex;
        justify-content: center;

        padding: 4rem 0;

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 30px;
            border-radius: 16px;
            border: 1px solid white;

            .arrow{
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                
                border-radius: 50%;
                border: 1px solid white;
                width: 22px;
                height: 22px;
                top: -8px;
                cursor: pointer;
                transition: .4s;
                
                animation: translateVert 1s linear 2s infinite alternate;

                &:hover {
                    background: var(--color-white);
                }

                a { 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-ice);

                    &:hover{
                        color: var(--color-black);
                    }
                }
            }

            @keyframes translateVert {
                0%   {top:-8px;}
                25%  {top:-5px;}
                50%  {top:0px;}
                75%  {top:5px;}
                100% {top:8px;}
            }
        }
    }

    @media(max-width: 768px){
        
        .content {
        
            .content-banner{
                img {
                    display:none;
                }
                .content-left{
                    gap: 0;
                    .content-header{
                        .title{
                            font-size: 2.4rem;
                            padding-top: 2rem;
                        }

                        .subtitle {
                            font-size: 1.6rem;
                        }

                        .phrase {
                            font-size: 1.4rem;
                            padding: 1.6rem 0;
                        }

                        .services {
                            font-size: 1.2rem;
                            padding-top: .6rem;
                        }
                }
                .btn-controller {
                    display: flex;
                    justify-content: center;
                    padding: 3rem 0;
                }
            }
        }

        .arrow-content {
            padding: 1rem 0;
        }
        
    }

    

    
`