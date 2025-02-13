import React, { createContext, useContext, useState } from 'react'

const allContext = createContext();

export const useAllContext = () => useContext(allContext);

const AllContext = ({ children }) => {
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState(null);

    const setBusCallback = (buses) => {
        setBuses(buses);
    }

    const setLoaderCallback = (isLoading) => {
        setIsLoading(isLoading);
    }

    const setSortByCallback = (sortBy) =>{
        setSortBy(sortBy);
    }

    return (
        <allContext.Provider value={{
            buses,
            sortBy,
            isLoading,
            setBusCallback,
            setLoaderCallback,
            setSortByCallback
        }}>
            {children}
        </allContext.Provider>
    )
}

export default AllContext
