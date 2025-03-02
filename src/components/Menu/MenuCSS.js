import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    height: 10vh;
    padding: .6rem 1rem;

    .icon-menu-responsive{
        input {
            display: none;
        }
    }





    // RESPONSIVE DISPLAY LAYOUTS
    @media (max-width: 768px) {
        height: 8vh;
        padding: .6rem .4rem;
        
        .icon-menu-responsive {
            color: white;
            font-size: 2rem;
            input {
                display: inline;
            }
        }

        .left, .right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: end;
            position: absolute;
            top: 0;
            width: 100%;
            background-color: var(--color-red1-alpha);

            ul {
                display: flex;
                flex-direction: column;
                font-size: 1.2rem;
                width: 100%; 

                li {
                    padding: 1rem .6rem;
                    min-width: 6.5rem;
                    transition: .4s;
                    border-bottom: 1px solid var(--color-white);
                }
            }
        }

        .left {
            left: 0;
            ul li {
                text-align: left;
            }
        }

        .right {
            right: 0;
            ul li {
                text-align: right;
            }
        }
    }
        
    // display: none;
    // .top {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     border: 1px solid white;
    //     padding: 1rem;

    //     ul {
    //         display: flex;
    //         gap: 1rem;
    //         font-size: 1.2rem;

    //         li {
    //             text-align: center;
    //             min-width: 6.5rem;
    //             transition: .4s;
    //             border: 1px solid transparent;
                
    //             &:hover {
    //                 border-bottom: 1px solid white;
    //                 transform: translateY(-2px);
    //             }
    //         }
    //     }
    // }

    // .left {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: end;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     background-color: var(--color-red1-alpha);

    //     ul {
    //         display: flex;
    //         flex-direction: column;
    //         font-size: 1.2rem;
    //         width: 100%; 

    //         li {
    //             padding: 1rem .6rem;
    //             text-align: left;
    //             min-width: 6.5rem;
    //             transition: .4s;
    //             border-bottom: 1px solid var(--color-white);
    //         }
    //     }
    // }

    // .right {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: end;
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //     width: 100%;
    //     background-color: var(--color-red1-alpha);

    //     ul {
    //         display: flex;
    //         flex-direction: column;
    //         font-size: 1.2rem;
    //         width: 100%;            

    //         li {
    //             padding: 1rem .6rem;
    //             text-align: right;
    //             min-width: 6.5rem;
    //             transition: .4s;
    //             border-bottom: 1px solid var(--color-white);            
    //         }
    // }
`