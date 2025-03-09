import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ setSearchQuery, onLogout }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="sidebar">
      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="sidebar-content">
        <div className="logo">
          <h1>iCSUM</h1>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search reviews..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/artists" className="nav-item">Artists</Link>
          {token && <Link to="/add-review" className="nav-item">Add Review</Link>}
        </nav>

        <div className="sidebar-footer">
          {token ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="nav-item">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;