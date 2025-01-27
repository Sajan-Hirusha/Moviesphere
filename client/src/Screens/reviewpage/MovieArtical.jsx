import { useState, useEffect } from 'react';
import './MovieArtical.css';

export const MovieArtical = ({ movieId }) => {
  const [movie, setMovie] = useState(null); // Store the movie data
  const [error, setError] = useState(null); // Error state

  console.log(movieId)
  useEffect(() => {
    // Fetch data from Django API
    setError(null); // Reset error before fetching
    fetch(`http://127.0.0.1:8000/api/movies/${movieId}/get-movie-by-id/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ');
          }
          return response.json();
        })
        .then(data => setMovie(data)).catch(err => setError(`Failed to fetch movie data. ${id}`));

  }, [movieId]); // Re-fetch whenever movieId changes


  // Extract and decode image URLs if necessary
  const getValidUrl = (url) => {
    if (url && url.startsWith('http://127.0.0.1:8000/media/https%3A')) {
      const decodedUrl = decodeURIComponent(url.replace('http://127.0.0.1:8000/media/', ''));
      return decodedUrl; // Return the decoded external URL
    }
    return url; // Return the original URL if no decoding is needed
  };

  const trailerUrl = movie?.movieTrailer;

  return (
    <div className="movieArticle main-container">
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      {!error && !movie && <div>Loading...</div>} {/* Display loading message */}

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
