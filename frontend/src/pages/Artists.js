import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newArtist, setNewArtist] = useState({
    name: '',
    photoUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/artists');
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.post('http://localhost:5002/api/artists', newArtist, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchArtists();
      setNewArtist({ name: '', photoUrl: '', description: '' });
    } catch (error) {
      console.error('Error adding artist:', error);
    }
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="page-title">Artists</h1>
      
      <form onSubmit={handleSubmit} className="add-artist-form">
        <h2>Add New Artist</h2>
        <input
          type="text"
          placeholder="Artist Name"
          value={newArtist.name}
          onChange={(e) => setNewArtist({...newArtist, name: e.target.value})}
          required
        />
        <input
          type="url"
          placeholder="Photo URL"
          value={newArtist.photoUrl}
          onChange={(e) => setNewArtist({...newArtist, photoUrl: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={newArtist.description}
          onChange={(e) => setNewArtist({...newArtist, description: e.target.value})}
        />
        <button type="submit">Add Artist</button>
      </form>

      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="artists-grid">
        {filteredArtists.map((artist) => (
          <div key={artist._id} className="artist-card">
            <img src={artist.photoUrl} alt={artist.name} className="artist-image" />
            <h2>{artist.name}</h2>
            {artist.description && <p>{artist.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artists;