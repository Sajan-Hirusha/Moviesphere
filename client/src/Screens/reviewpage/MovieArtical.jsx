import React, { useState, useEffect } from 'react';
import './MovieArtical.css';

export const MovieArtical = ({ movieId }) => {
  const [movie, setMovie] = useState(null); // Store the movie data
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!movieId) {
      setError('Invalid movie ID');
      return;
    }
    setError(null); // Reset error before fetching
    fetch(`http://127.0.0.1:8000/api/movies/${movieId}/get-movie-by-id/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch movie data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setMovie(data))
      .catch((err) => {
        console.error("Error fetching movie data:", err);
        setError("Failed to fetch movie data.");
      });
  }, [movieId]); 

  const getValidUrl = (url) => {
    if (url && url.startsWith('http://127.0.0.1:8000/media/https%3A')) {
      const decodedUrl = decodeURIComponent(url.replace('http://127.0.0.1:8000/media/', ''));
      return decodedUrl; 
    }
    return url; 
  };

  const trailerUrl = movie?.movieTrailer;

  return (
    <div className="main-container">
      {error && <div className="error-message">{error}</div>} 
      {!error && !movie && <div>Loading...</div>} 

      {movie && (
        <>
          {/* Article Section */}
          <div className="article-container">
            {movie.description ? (
              <div className="article">
                <h3>Article: {movie.title}</h3>
                <p>{movie.description}</p>
              </div>
            ) : (
              <div>No description available</div>
            )}
          </div>

          {/* Video Section
          <div className="video-frame">
            {trailerUrl ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerUrl.split('v=')[1]?.split('&')[0]}?autoplay=1`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div>No Trailer Available</div>
            )}
          </div> */}
        </>
      )}
    </div>
  );
};
