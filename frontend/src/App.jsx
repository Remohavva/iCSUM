import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddReview from './pages/AddReview';
import Login from './pages/Login';
import Artists from './pages/Artists';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-review">Add Review</Link></li>
            <li><Link to="/artists">Artists</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li className="search-container">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artists" element={<Artists />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;