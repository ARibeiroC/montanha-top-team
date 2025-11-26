import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: start;
    color: var(--color-link);
    position: relative;

    video{
        position: absolute;
        width: 98%;
        z-index: -1;
        left: 0;
        top: 0;
    }

    #background-video-filter{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--color-black-opac);
        z-index: -1;
    }

    #admin-content{
        display: flex;
        flex-direction: column;
        padding: 1rem .4rem;

        width: 100%;
        
        #content{   
            display: flex;
            gap: 2rem;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            padding: 1rem;

            .card{
                display: flex;
                flex-direction: column;
                gap: .2rem;

                width: 6.4rem;
                height: 6.8rem;

                padding: .4rem;

                border-radius: .4rem;
                box-shadow: 2px 2px 6px rgba(200,200,200, .6);
                
                background-color: var(--color-ice);
                

                .card-data{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 2;
                    font-size: 3rem;
                    text-align: center;
                    border-bottom: 1px solid var(--color-darkgray);
                }
                .card-title{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    font-weight: bold;
                    text-align: center;
                    color: var(--color-darkgray);

                    p{
                        font-size: .9rem;
                    }
                }
            }
        }
    }

    #controllers {
        position: fixed;
        bottom: 3.5rem;
        left: .5rem;

        #menu-controller{
            display: flex;
            align-items: start;
            justify-content: space-between;
            gap: .5rem;

            width: 96vw;
            margin-bottom: .6rem;
            padding: .8rem;
            
            overflow-x: scroll;
            background-color: var(--color-ice);
            border-radius: .8rem;

            .link-controller {
                display: flex;
                flex-direction: column;
                align-items: center;
                min-width: 5rem;
                max-width: 5rem;

                cursor: pointer;
                
                border: 1px solid var(--color-link);
                border-radius: .4rem;
                box-shadow: 2px 2px 4px rgba(0,0,0,.4);
                
                position: relative;
                
                padding: .8rem;
                .menu-icon {
                    font-size: 1.4rem;
                }

                .label{
                    font-size: .6rem;
                    font-weight: bold;
                }
            }
        }
    }
`