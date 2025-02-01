import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
    background: rgba(0,0,0,.8);
    padding: .6rem 1rem;

    .logo {
        display: flex;
        align-items: center;
        height: 100%;
        img {
            max-height: 75%;
        }
    }

    .language {
        width: 3rem;
        height: 3rem;

        border-radius: 1.5rem;
        overflow: hidden;
        padding-right:  15px;
        border: 2px solid var(--color-ice);

        img {
            width: 80px;
            position: relative;
            right: 15px;
            bottom: .6rem;
        }
    }


    



    // // LAYOUT DESKTOP
    // @media (min-width: 1024px) {
    //     .menu {
    //         display: flex;

    //         a {
    //             color: var(--color-ice);

    //             &:hover {
    //                 color: var(--color-red2);
    //             }
    //         }

    //     }        
    // }

    // LAYOUT MOBILE AND OTHER
    // @media (max-width: 1023px) {
    //     display: none;

    //     .top {
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         border: 1px solid white;
    //         padding: 1rem;

    //         ul {
    //             display: flex;
    //             gap: 1rem;
    //             font-size: 1.2rem;

    //             li {
    //                 text-align: center;
    //                 min-width: 6.5rem;
    //                 transition: .4s;
    //                 border: 1px solid transparent;
                    
    //                 &:hover {
    //                     border-bottom: 1px solid white;
    //                     transform: translateY(-2px);
    //                 }
    //             }
    //         }
    //     }

    //     .left, .right {
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: center;
    //         align-items: end;
    //         position: absolute;
    //         top: 0;
    //         width: 100%;
    //         background-color: var(--color-red1-alpha);

    //         ul {
    //             display: flex;
    //             flex-direction: column;
    //             font-size: 1.2rem;
    //             width: 100%; 

    //             li {
    //                 padding: 1rem .6rem;
    //                 min-width: 6.5rem;
    //                 transition: .4s;
    //                 border-bottom: 1px solid var(--color-white);
    //             }
    //         }
    //     }

    //     .left {
    //         left: 0;
    //         ul li {
    //             text-align: left;
    //         }
    //     }

    //     .right {
    //         right: 0;
    //         ul li {
    //             text-align: right;
    //         }
    //     }
    // }
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