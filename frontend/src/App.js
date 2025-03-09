import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import Landing from './pages/Landing.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import AddReview from './pages/AddReview.js';
import Artists from './pages/Artists.js';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar setSearchQuery={setSearchQuery} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home searchQuery={searchQuery} /> : <Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-review" element={isAuthenticated ? <AddReview /> : <Navigate to="/login" />} />
          <Route path="/artists" element={isAuthenticated ? <Artists /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;