const BOOKS_ENDPOINT = 'https://potterapi-fedeperin.vercel.app/en/books'



export const getBooks = async() => {
    const response = await fetch(BOOKS_ENDPOINT)
    const data = await response.json()
    return data;
}