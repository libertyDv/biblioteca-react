export const addToList = (book, setReadingList, isAdded) => {
    if (!isAdded) {
        setReadingList((prevList) => [...prevList, book])
    }

}


