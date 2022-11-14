import Book from './Book';

const ListBooks = ({ books }) => {
   const changeShelf = (e) => {
      console.log('change shelf', e)
      return (
         <li>Olá mundo</li>
      )
   }
   return (
      <div className="list-books-content">
         <div>
            <div className="bookshelf">
               <h2 className="bookshelf-title">Currently Reading</h2>
               <div className="bookshelf-books">
               <ol className="books-grid">
                  { books.filter(book => book.shelf === "currentlyReading").map((book) => (
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
            <div className="bookshelf">
               <h2 className="bookshelf-title">Want to Read</h2>
               <div className="bookshelf-books">
               <ol className="books-grid">
               { books.filter(book => book.shelf === "wantToRead").map((book) => (
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
            <div className="bookshelf">
               <h2 className="bookshelf-title">Read</h2>
               <div className="bookshelf-books">
               <ol className="books-grid">
               { books.filter(book => book.shelf === "read").map((book) => (
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
         </div>
      </div>
   );
}

export default ListBooks;