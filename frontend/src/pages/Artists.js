import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/products/artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
    fetchArtists();
  }, []);

  const filteredArtists = artists.filter(artist =>
    artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="page-title">Artists</h1>
      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="artists-grid">
        {filteredArtists.map((artist, index) => (
          <div key={index} className="artist-card">
            <h2>{artist}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artists;