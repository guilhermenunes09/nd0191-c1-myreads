import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const SearchPage = () => {

   const [books, setBooks] = useState([]);

   useEffect(() => {
      const getAllBooks = async () => {
         const res = await BooksAPI.getAll();
         setBooks(res);
         console.log('check response', res)
      }
      
      getAllBooks();
   }, []);

   const changeShelf = (e) => {
      console.log('change shelf', e)
      return (
         <li>Olá mundo</li>
      )
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