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

  /**
   * @param {object} bookOption 
   * @description changes a book from one shelf to another
   * by user's actions
   */
  const changeShelf = (bookOption) => {
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
   * @returns {array} concatenation of multiple queries
   * @description it takes a string and check if the string matches
   * with books attributes, for example, title, authors, etc.
   */
  const changeSearch = (searchQuery) => {
    if(!searchQuery) {
      setSearchBooks(books);
      return;
    }
  
    let query = books.filter((book) => {
      return book.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    books.forEach((book, index) => {
      if (book.authors.length > 0) {
        book.authors.forEach((author) => {
          if(author.toLowerCase().includes(searchQuery.toLowerCase())) {
            if(query.filter(q => q.id === books[index].id).length === 0) {  
              query.push(books[index]);
            }
          }
        });
      }
      
      if(book.industryIdentifiers.length > 0) {
        book.industryIdentifiers.every((isbn) => {
          if(String(isbn.identifier).includes(searchQuery)) {
            if(query.filter(q => q.id === books[index].id).length === 0) {    
              query.push(books[index]);
              return false;
            }
          }
          return true;
        })
      }
    });
    
    setSearchBooks(query);
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
