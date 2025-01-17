import React, { useState, useEffect } from 'react';
import './MovieArtical.css';

export const MovieArtical = () => {
  const [movie, setMovie] = useState(null); // Store the movie data
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch movie data from Django API
    fetch('http://127.0.0.1:8000/api/movies/2/get-movie-by-id/')
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((err) => setError('Failed to fetch movie data.'));
  }, []); // Added empty dependency array to ensure this runs once on mount

  // Extract and decode image URLs if necessary
  const getValidUrl = (url) => {
    if (url && url.startsWith('http://127.0.0.1:8000/media/https%3A')) {
      const decodedUrl = decodeURIComponent(url.replace('http://127.0.0.1:8000/media/', ''));
      return decodedUrl; // Return the decoded external URL
    }
    return url; // Return the original URL if no decoding is needed
  };

  // Ensure movie data is available before using it
  const trailerUrl = movie ? movie.movieTrailer : null;

  return (
    <div className="main-container">
      {/* Article Section (using description as article) */}
      <div className="article-container">
        {movie && movie.description ? (
          <div className="article">
            <h3>Article: {movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        ) : (
          <div>No description available</div>
        )}
      </div>

      {/* Video Section */}
      <div className="video-frame">
        {trailerUrl ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerUrl.split('/').pop()}?autoplay=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div>No Trailer Available</div>
        )}
      </div>
    </div>
  );
};
