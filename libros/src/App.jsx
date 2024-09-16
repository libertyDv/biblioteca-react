import { useEffect, useState } from 'react';
import { getBooks } from './services/books';
import './App.css';
import { addToList } from './services/addList';
import { Filters } from './components/Filters';
import { useFilters } from './hooks/useFilters';

// función para verificar si el libro está en la lista de lectura usando otras propiedades
const isBookInList = (book, list) => list.some((item) => item.title === book.title && item.releaseDate === book.releaseDate);

function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const { filterBooks } = useFilters()

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      console.log('Fetched books:', data);
      setBooks(data);
    };

    fetchBooks();
  }, []);

  const filteredBooks = filterBooks(books)

  return (
    <>
      <main>
        <Filters/>
        <h1>Books</h1>
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.title + book.releaseDate}> {/* combino estas 2 propiedades para hacer una key única */}
              <h3>{book.title}</h3>
              <p>{book.releaseDate}</p>
              <button 
                onClick={() => addToList(book, setReadingList, isBookInList(book, readingList))}
              >
                {isBookInList(book, readingList) ? '✔ Added' : 'Add to read list'}
              </button>
            </li>
          ))}
        </ul>

        <h2>Reading List</h2>
        <ul>
          {readingList.map((book) => (
            <li key={book.title + book.releaseDate}> {/* Uso de combinación de propiedades para clave */}
              <h3>{book.title}</h3>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
