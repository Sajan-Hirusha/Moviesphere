import React, { useEffect, useState } from 'react';
import './MainFrame.css';

export const MainFrame = () => {
  const [movie, setMovie] = useState(null); // Store a single movie object
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from Django API
    fetch('http://127.0.0.1:8000/api/movies/2/get-movie-by-id/')
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(err => setError('Failed to fetch movie data.'));
  }, []);

  if (error) {
    return <div>{error}</div>; // Display error message if fetch fails
  }

  if (!movie) {
    return <div>Loading...</div>; // Show loading text until the movie data is fetched
  }

  // Extract and decode image URLs
  const getValidUrl = (url) => {
    if (url && url.startsWith('http://127.0.0.1:8000/media/https%3A')) {
      const decodedUrl = decodeURIComponent(url.replace('http://127.0.0.1:8000/media/', ''));
      return decodedUrl; // Return the decoded external URL
    }
    return url; // Return the original URL if no decoding is needed
  };

  const image1Url = getValidUrl(movie.image1);
  const image2Url = getValidUrl(movie.image2);
  const trailerUrl = movie.movieTrailer;

  // Log the video URL to the console
  console.log('Trailer URL:', trailerUrl);

  return (
    <div className="main-frame">
      <div className="movie-item">
        <div className="photo-frame">
          {image1Url ? (
            <img
              src={image1Url} // Use the decoded image URL
              alt={`${movie.title} Image 1`}
              className="photo"
            />
          ) : (
            <div>No Image Available</div> // Fallback text if image1 is missing
          )}
        </div>

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


        <div className="photo-frame">
          {image2Url ? (
            <img
              src={image2Url} // Use the decoded image URL
              alt={`${movie.title} Image 2`}
              className="photo"
            />
          ) : (
            <div>No Image Available</div> // Fallback text if image2 is missing
          )}
        </div>
      </div>
    </div>
  );
};
