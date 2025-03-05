import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddReview() {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    songTitle: '',
    artist: '',
    rating: '',
    review: '',
    genre: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.post('http://localhost:5002/api/products', reviewData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Add New Review</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song Title"
          value={reviewData.songTitle}
          onChange={(e) => setReviewData({...reviewData, songTitle: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Artist"
          value={reviewData.artist}
          onChange={(e) => setReviewData({...reviewData, artist: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={reviewData.rating}
          onChange={(e) => setReviewData({...reviewData, rating: e.target.value})}
          required
        />
        <textarea
          placeholder="Write your review here..."
          value={reviewData.review}
          onChange={(e) => setReviewData({...reviewData, review: e.target.value})}
          required
        />
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

export default AddReview;