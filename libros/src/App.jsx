import { useEffect, useState } from 'react';
import { getBooks } from './services/books';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([])

  useEffect(() => {

    const fetchBooks = async () => {
      const data = await getBooks()
      setBooks(data)
    }

    fetchBooks()
  }, [])

  // some -> comprueba si al menos un elemento del array cumple con la condicion

  const addToList = (book) => {
    if(!readingList.some((item) => item.id === book.id)) {
      setReadingList([...readingList, book])
    }
  }




  return (
    <>
      <main>
        <h1>Books</h1>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.releaseDate}</p>
              <button onClick={() => addToList(book)}>Add to read list</button>
            </li>
          ))
          }
        </ul>

        <section>
          <h2>Reading list</h2>
          <ul>
            {readingList.map((book) => (
              <li key={book.id}>
                <h3>{book.title}</h3>
                <p>{book.releaseDate}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
