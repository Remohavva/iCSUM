import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setSearchQuery, onLogout }) {
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
    <nav>
      <ul>
        <div className="nav-left">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/artists">Artists</Link></li>
          {token && <li><Link to="/add-review">Add Review</Link></li>}
          {token && <li><Link to="/my-reviews">My Reviews</Link></li>}
        </div>
        {token ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/register" className="nav-item">Register</Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
export default Sidebar;