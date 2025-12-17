import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const StateMenuContext = createContext()

export const StateMenuContextProvider = ({children})=>{
    const [database, setDatabase] = useState('hidden')

    return (
        <StateMenuContext.Provider value={{database, setDatabase}}>
            {children}
        </StateMenuContext.Provider>
    )
}

StateMenuContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}