import "./App.css";
import { useState } from "react";
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';
import { Route, Routes, Link } from 'react-router-dom';

function App() {

  const [reading, setReading] = useState([]);
  const [wantToRead, setwantToRead] = useState([]);
  const [read, setRead] = useState([]);


  const addBook = (book) => {

  }

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Routes>
            <Route exact path="/" element={<ListBooks onAddBook={addBook} />} />
            <Route exact path="/searchpage" element={<SearchPage/>} />
          </Routes>
          <Link to='/newbook'>
          <div className="open-search">
              <Link to="/searchpage">Add a book</Link>
          </div>
          </Link>
        </div>
    </div>
  );
}

export default App;
