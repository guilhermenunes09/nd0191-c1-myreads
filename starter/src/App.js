import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';
import * as BooksAPI from "./BooksAPI";

function App() {

  const [reading, setReading] = useState([]);
  const [wantToRead, setwantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
     const getAllBooks = async () => {
        const res = await BooksAPI.getAll();
        setBooks(res);
        console.log('check response', res)
     }
     
     getAllBooks();
  }, []);

  const changeShelf = (bookOption) => {
    console.log('official', bookOption.shelf, bookOption.id);

    const newBooks = books.map((book) => {
      if(book.id === bookOption.id) {
        console.log('check book', book)
        book.shelf = bookOption.shelf;
      }
      return book;
    });

    console.log('chck new books', newBooks)

    setBooks(newBooks);
  }

  const addBook = (book) => {

  }

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Routes>
            <Route exact path="/" element={<ListBooks books={books} onChangeShelf={changeShelf} onAddBook={addBook} />} />
            <Route exact path="/searchpage" element={<SearchPage books={books} onChangeShelf={changeShelf} />} />
          </Routes>
          <Link to='/newbook'>
          <div className="open-search">
              <Link to="/searchpage">Add a book</Link>
          </div>
          </Link>
        </div>
    </div>
  );
}

export default App;
