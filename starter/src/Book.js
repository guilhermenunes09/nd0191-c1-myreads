import { useState, useEffect } from "react";

const Book = ({ title, authors, thumbnail, onChangeShelf, shelf }) => {
   const [selectedShelf, setSelectedShelf] = useState();

   useEffect(() => {
      console.log('what is shelf', shelf)
      setSelectedShelf(shelf);
   }, []);

   const handleSelectShelf = (e) => {
      setSelectedShelf(e.target.value)
      onChangeShelf(e.target.value);
   }

   return (
      <li>
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
            teste
            <div className="book-shelf-changer">
               <select value={selectedShelf} onChange={handleSelectShelf}>
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
               <div>{author}</div>
            )) }
         </div>
         </div>
      </li>
   )
}

export default Book;