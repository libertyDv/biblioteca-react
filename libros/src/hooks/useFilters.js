import { useContext } from "react";
import { FiltersContext } from "../context/filter";

export function useFilters() {

    const {filters, setFilters} = useContext(FiltersContext)

    const filterBooks = (books) => {
        return books.filter(book => {
            return(
                book.pages >= filters.minPages
            )
        })
    } 

    return {filters, filterBooks, setFilters}
}