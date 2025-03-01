import { createContext, useState } from "react";


export const StateMenuContext = createContext()

export const StateMenuContextProvider = ({children})=>{
    const [stateMenu, setStateMenu] = useState('hidden')

    return (
        <StateMenuContext.Provider value={{stateMenu, setStateMenu}}>
            {children}
        </StateMenuContext.Provider>
    )
}