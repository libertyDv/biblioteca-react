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


  // cargar lista de lectura desde localStorage cuando se monta el componente

  useEffect(() => {
    const storedReadingList = localStorage.getItem('readingList')
    const storagedBooks = localStorage.getItem('books')
    
    if (storedReadingList) {
      setReadingList(JSON.parse(storedReadingList)) // convierte de JSON a array
    }

    if(storagedBooks) {
      try {
        setBooks(JSON.parse(storagedBooks));  // Intentar parsear solo si es JSON válido
      } catch (error) {
        console.error('Error parsing books from localStorage:', error);
        // En caso de error, podrías fallback para cargar los libros
        setBooks([]); 
      }
    }

  }, [])

  // guardar la lista de lectura en localStorage cada vez q cambia
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList))
  }, [readingList])

  // sincronizar la lista de lectura entre pestañas
  useEffect(() => {
    const syncReadingListAndBooks = (event) => {
      if (event.key === 'readingList') {
        const newReadingList = JSON.parse(event.newValue);
        setReadingList(newReadingList);
      }
      if (event.key === 'books') {
        const newBooks = JSON.parse(event.newValue);
        setBooks(newBooks);
      }
    };
  
    window.addEventListener('storage', syncReadingListAndBooks);
  
    return () => {
      window.removeEventListener('storage', syncReadingListAndBooks);
    };
  }, []);

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
        <Filters />
        <h1>Books</h1>
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.title + book.releaseDate}> {/* combino estas 2 propiedades para hacer una key única */}
              <h3>{book.title}</h3>
              <p>{book.releaseDate}</p>
              <img src={book.cover}
                alt={book.title}></img> <br></br>
              <button
                onClick={() => addToList(book,
                  setReadingList,
                  isBookInList(book, readingList),
                  setBooks // modifico la lista de disponibles
                )}
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
              <img src={book.cover}
                alt={book.title}></img> <br></br>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
