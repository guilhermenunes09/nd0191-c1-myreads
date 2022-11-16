import Book from './Book';

const ListBooks = ({ books, onChangeShelfLibrary }) => {
  const changeShelf = (book) => {
    onChangeShelfLibrary(book);
  }

  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          
          <div className="bookshelf-books">
            <ol className="books-grid">
              { books.filter(book => book.shelf === "currentlyReading").map((book) => (
                <li key={`${book.id}-currently-reading`}>
                  <Book 
                    book={book}
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
                <li key={`${book.id}-want-to-read`}>
                  <Book
                    book={book}
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
                <li key={`${book.id}-read`}>
                  <Book 
                    book={book}
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