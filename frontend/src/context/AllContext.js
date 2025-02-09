import React, { createContext, useContext, useState } from 'react'

const allContext = createContext();

export const useAllContext = () => useContext(allContext);

const AllContext = ({ children }) => {
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const setBusCallback = (buses) => {
        setBuses(buses);
    }

    const setLoaderCallback = (isLoading) => {
        setIsLoading(isLoading);
    }

    return (
        <allContext.Provider value={{
            buses,
            isLoading,
            setBusCallback,
            setLoaderCallback
        }}>
            {children}
        </allContext.Provider>
    )
}

export default AllContext
