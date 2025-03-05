import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import AddReview from './pages/AddReview.js';
import Artists from './pages/Artists.js';

function App() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/artists" element={<Artists />} />
      </Routes>
    </Router>
  );
}

export default App;