import { createContext, useState } from "react";


export const StateMenuContext = createContext()

export const StateMenuContextProvider = ({children})=>{
    const [stateMenu, setStateMenu] = useState('hidden')
    const [activeLink, setActiveLink] = useState('')

    return (
        <StateMenuContext.Provider value={[{stateMenu, setStateMenu}, {activeLink, setActiveLink}]}>
            {children}
        </StateMenuContext.Provider>
    )
}