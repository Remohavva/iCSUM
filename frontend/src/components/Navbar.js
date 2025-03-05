import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setSearchQuery }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/artists">Artists</Link></li>
        {token ? (
          <>
            <li><Link to="/add-review">Add Review</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        <li className="search-container">
          <input
            type="text"
            placeholder="Search reviews..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;