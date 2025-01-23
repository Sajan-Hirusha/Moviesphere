import React, { useEffect, useState } from 'react';
import './Movieselectionlist.css';
import adminMovieCountBG from '../../assets/Images/adminMovieCountBG.jpg';

export const Movieselectionlist = ({ movieId, setMovieId }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [showFullDescriptionId, setShowFullDescriptionId] = useState(null);
    const range = 5;

    const allMovieIds = Array.from({ length: 1000 }, (_, index) => index + 1);
    const movieIds = [
        ...allMovieIds.filter((id) => id >= movieId - range && id < movieId),
        ...allMovieIds.filter((id) => id > movieId && id <= movieId + range),
    ];

    useEffect(() => {
        setError(null);
        Promise.all(
            movieIds.map((id) =>
                fetch(`http://127.0.0.1:8000/api/movies/${id}/get-movie-by-id/`)
                    .then((response) => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return response.json();
                    })
                    .catch(() => null)
            )
        )
            .then((data) => setMovies(data.filter((movie) => movie !== null)))
            .catch(() => setError('Failed to fetch movie data.'));
    }, [movieIds]);

    const getValidUrl = (url) => {
        if (url && url.startsWith('http://127.0.0.1:8000/media/https%3A')) {
            const decodedUrl = decodeURIComponent(url.replace('http://127.0.0.1:8000/media/', ''));
            return decodedUrl;
        }
        return url;
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 5;

    const handleNext = () => {
        if (currentIndex + visibleCards < movies.length) {
            setCurrentIndex(currentIndex + visibleCards);
        }
    };

    const handlePrev = () => {
        if (currentIndex - visibleCards >= 0) {
            setCurrentIndex(currentIndex - visibleCards);
        }
    };

    const toggleDescription = (event, id) => {

        setShowFullDescriptionId(showFullDescriptionId === id ? null : id);
        setMovieId(id); // Update the selected movie ID
    };

    return (
        <div className="movieList carousel">
            <button
                className="carousel-btn prev-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
            >
                &#8249;
            </button>

            <div className="carousel-track">
                {movies.slice(currentIndex, currentIndex + visibleCards).map((movie, index) => {
                    const image1Url = getValidUrl(movie.image1);

                    return (
                        <div key={index} className="image-card">
                            <img
                                src={image1Url || adminMovieCountBG}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                            <p>
                                {showFullDescriptionId === movie.id
                                    ? movie.description
                                    : `${movie.description.slice(0, 100)}...`}
                                <button
                                    className="see-more-btn"
                                    onClick={(event) => toggleDescription(event, movie.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'blue',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showFullDescriptionId === movie.id ? 'See Less' : 'See More'}
                                </button>
                            </p>
                        </div>
                    );
                })}
            </div>

            <button
                className="carousel-btn next-btn"
                onClick={handleNext}
                disabled={currentIndex + visibleCards >= movies.length}
            >
                &#8250;
            </button>

            {error && <p className="error">{error}</p>}
        </div>
    );
};