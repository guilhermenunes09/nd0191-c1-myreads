const Book = ({ book, onChangeShelf }) => {
  const handleSelectShelf = (e) => {
    onChangeShelf({shelf: e.target.value, id: book.id });
  }

  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url("${book.imageLinks && book.imageLinks.smallThumbnail}")`,
            }}
          ></div>

          <div className="book-shelf-changer">
            <select value={book.shelf === `none` ? `none` : book.shelf} onChange={handleSelectShelf}>
              <option value="none" disabled>
                Move to...
              </option>

              <option value="currentlyReading">
                Currently Reading
              </option>

              <option value="wantToRead">Want to Read</option>

              <option value="read">Read</option>

              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="book-title">{ book.title }</div>

        <div className="book-authors">
          { book.authors && book.authors.length > 0 && book.authors.map((author) => (
            <div key={author}>{author}</div>
          )) }

          { book.industryIdentifiers && book.industryIdentifiers.length > 0 && book.industryIdentifiers.map((isbn) => (
            <div key={isbn.identifier}>{isbn.type}: {isbn.identifier}</div>
          )) }
        </div>
      </div>
    </div>
  )
}

export default Book;