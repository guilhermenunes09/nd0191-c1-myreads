import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const SearchPage = ({ books, onChangeShelf, onChangeSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const changeShelf = (book) => {
    onChangeShelf(book);
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    onChangeSearch(e.target.value);
  }

  /**
   * 
   * @param {object} e
   * @description detects use of backspace and update
   * input state using a prop function
   */
  const handleKeyDown = (event) => {
    if (event.keyCode === 8) {
      handleInputChange(event);
    }
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>

        <div className="search-books-input-wrapper">
          <input
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={searchQuery}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          { books && books.map((book) => (
            <li key={`${book.industryIdentifiers[0].identifier}-search-page`}>
              <Book 
                id={book.id}
                title={book.title}
                authors={book.authors}
                industryIdentifiers={book.industryIdentifiers}
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