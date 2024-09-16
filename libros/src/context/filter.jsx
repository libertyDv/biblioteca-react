import { createContext, useState } from "react";

export const FiltersContext = createContext()

export function FiltersProvider({children}) {
    const [filters, setFilters] = useState({
        minPages: 0
    })

    console.log('FiltersProvider state:', filters);

    return(
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}