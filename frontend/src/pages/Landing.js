import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="logo">
          <h1>iCSUM</h1>
          <p>Share Your Music Journey</p>
        </div>
        <div className="landing-buttons">
          <Link to="/login" className="landing-button">Login</Link>
          <Link to="/register" className="landing-button">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;