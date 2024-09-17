export const addToList = (book, setReadingList, isAdded, setBooks) => {
    if (!isAdded) {
        
      // Agregar el libro a la lista de lectura
      setReadingList((prevList) => [...prevList, book]);
  
      // Remover el libro de la lista de libros disponibles
      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.filter((b) => b.title !== book.title || b.releaseDate !== book.releaseDate);
        
        // Guardar libros disponibles actualizados en localStorage
        localStorage.setItem('books', JSON.stringify(updatedBooks));
  
        return updatedBooks;
      });
    }
  };
  