import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const SearchPage = ({ books, onChangeShelf }) => {

   const changeShelf = (book) => {
      onChangeShelf(book);
   }

   return (
      <div className="search-books">
         <div className="search-books-bar">
         <Link to="/" className="close-search">Close</Link>
         <div className="search-books-input-wrapper">
            <input
               type="text"
               placeholder="Search by title, author, or ISBN"
            />
         </div>
         </div>
         <div className="search-books-results">
         <ol className="books-grid">
            { books.map((book) => (
               <li>
                  <Book 
                     id={book.id}
                     title={book.title}
                     authors={book.authors}
                     thumbnail={book.imageLinks.smallThumbnail}
                     shelf={book.shelf}
                     onChangeShelf={changeShelf}
                  />
               </li>
            ))}
         </ol>
         </div>
      </div>
   )
}

export default SearchPage;