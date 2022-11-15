import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';
import * as BooksAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
     const getAllBooks = async () => {
        const res = await BooksAPI.getAll();
        setBooks(res);
        setSearchBooks(res);
     }
     
     getAllBooks();
  }, []);

  const updateLibrary = async (book, shelf) => {
    await BooksAPI.update(book, shelf)
    const exists = books.filter((b) => b.id === book.id)

    if(exists.length === 0) {
      const bookData = await BooksAPI.get(book.id);
      setBooks(books.concat(bookData));
    }
  }

  /**
   * @param {object} bookOption 
   * @description changes a book from one shelf to another
   * by user's actions
   */
  const changeShelf = (bookOption) => {
    updateLibrary(bookOption, bookOption.shelf);
    const newBooks = books.map((book) => {
      if(book.id === bookOption.id) {
        book.shelf = bookOption.shelf;
      }
      return book;
    });

    setBooks(newBooks);
  }

  /**
   * @param {string} searchQuery 
   * @description get books from the server based on search params
   */
  const changeSearch = async (searchQuery) => {
    if(!searchQuery) {
      setSearchBooks(books);
      return;
    }

  const res = await BooksAPI.search(searchQuery, 10);
    if(res && Array.isArray(res)) {
      setSearchBooks(res);
    }
  }

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <Routes>
          <Route exact path="/" element={
            <ListBooks
              books={books}
              onChangeShelf={changeShelf} 
            />} />
          
          <Route exact path="/searchpage" element={
            <SearchPage
              books={searchBooks}
              onChangeShelf={changeShelf}
              onChangeSearch={changeSearch}
            /> }/>
        </Routes>

        <div className="open-search">
          <Link to="/searchpage">Add a book</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
