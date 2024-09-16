import { useId } from "react"
import { useFilters } from "../hooks/useFilters"

useFilters
export function Filters() {

    const { filters, setFilters } = useFilters()
    const minPagesId = useId()

    console.log('Current Filters:', filters);

    const handleMinPages = (event) => {
        console.log('New minPages value:', event.target.value);

        setFilters(prevState => ({
            ...prevState, minPages: Number(event.target.value)
        }))
    }


    return (
        <section>
            <div>
                <label htmlFor={minPagesId}>Min. pages</label>
                <input
                    type="range"
                    id={minPagesId}
                    min="223"
                    max="766"
                    value={filters.minPages}
                    onChange={handleMinPages}
                />
                <span>{filters.minPages}</span>
            </div>
        </section>
    )
}