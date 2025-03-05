import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home({ searchQuery }) {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5002/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchReviews();
  }, [navigate]);

  const filteredReviews = reviews.filter(review =>
    review.songTitle?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    review.artist?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    review.review?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className="container">
      <h1 className="page-title">Music Reviews</h1>
      <div className="reviews-grid">
        {filteredReviews.map((review) => (
          <div key={review._id} className="review-card">
            <h2>{review.songTitle}</h2>
            <h3>{review.artist}</h3>
            <div className="rating">
              <span>Rating:</span>
              {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
            </div>
            <p className="review-text">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;