import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';
import * as BooksAPI from "./BooksAPI";

function App() {
  const [myBooks, setMyBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
     const getAllBooks = async () => {
        const res = await BooksAPI.getAll();
        setMyBooks(res);
     }
     
     getAllBooks();
  }, []);

  const updateLibrary = async (book, shelf) => {
    await BooksAPI.update(book, shelf)
    const exists = myBooks.filter((b) => b.id === book.id)

    if(exists.length === 0) {
      const bookData = await BooksAPI.get(book.id);
      setMyBooks(myBooks.concat(bookData));
    }
  }

  /**
   * @param {object} bookOption 
   * @description changes a book from one shelf to another
   * by user's actions
   */
  const changeShelfLibrary = (bookOption) => {
    updateLibrary(bookOption, bookOption.shelf);

    const myNewBooks = myBooks.map((book) => {
      if(book.id == bookOption.id) {
        book.shelf = bookOption.shelf;
      }
      return book;
    })

    setMyBooks(myNewBooks);
  }

  /**
   * @param {object} bookOption
   * @description check if the book is already in
   * library, if not add to it 
   */

  const changeShelfSearch = (bookOption) => {
    updateLibrary(bookOption, bookOption.shelf);

    const isInLibrary = myBooks.filter((book) => book.id === bookOption.id);

    if(isInLibrary.length === 0) {
      setMyBooks(myBooks.concat(bookOption));
    } else {
      changeShelfLibrary(bookOption);
    }
  }

  /**
   * @param {string} searchQuery 
   * @description get myBooks from the server based on search params
   */
  const changeSearch = async (searchQuery) => {
    if(!searchQuery) {
      setSearchBooks([]);
      return;
    }

    const response = await BooksAPI.search(searchQuery, 4);
    if(response.length === 0) {
      setSearchBooks([]);
      return;
    }
    
    for(let i=0; i < response.length; i++) {
      for(let j=0; j < myBooks.length; j++) {
        if(response[i].id === myBooks[j].id) {
          response[i].shelf = myBooks[j].shelf;
        }

        if(response[i].shelf === undefined) {
          response[i].shelf = "none";
        }
      }
    }

    setSearchBooks(response);
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
              books={myBooks}
              onChangeShelfLibrary={changeShelfLibrary} 
            />} />
          
          <Route exact path="/searchpage" element={
            <SearchPage
              books={searchBooks}
              onChangeShelfSearch={changeShelfSearch}
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
