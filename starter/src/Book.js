const Book = ({ id, title, authors, thumbnail, onChangeShelf, shelf, industryIdentifiers }) => {
  const handleSelectShelf = (e) => {
    onChangeShelf({shelf: e.target.value, id:id });
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
              `url("${thumbnail}")`,
            }}
          ></div>

          <div className="book-shelf-changer">
            <select value={shelf} onChange={handleSelectShelf}>
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

        <div className="book-title">{ title }</div>

        <div className="book-authors">
          { authors && authors.length > 0 && authors.map((author) => (
            <div key={author}>{author}</div>
          )) }

          { industryIdentifiers && industryIdentifiers.length > 0 && industryIdentifiers.map((isbn) => (
            <div key={isbn.identifier}>{isbn.type}: {isbn.identifier}</div>
          )) }
        </div>
      </div>
    </div>
  )
}

export default Book;