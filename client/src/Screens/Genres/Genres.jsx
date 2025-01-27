// import React from 'react'
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlPattern1 } from "../../../env.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GridMovieCard from "../../Components/MovieCardGrid/GridMovieCard.jsx";
import './genres.css'

function Genres() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { genre } = useParams();

  const g = [
    { id: 1, name: "Action" },
    { id: 2, name: "Science Fiction" },
    { id: 3, name: "Most Popular" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Thriller" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Animation" },
    { id: 8, name: "Adventure" },
    { id: 9, name: "Comedy" },
    { id: 10, name: "Fantasy" },
  ];

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genreResponse = await axios.get(
            `${urlPattern1}/api/genres/get_genres/`
        );
        setGenres(genreResponse.data.results);

        const moviesByGenre = {};
        for (let i of g) {
          if (genre === i.name) {
            const movieResponse = await axios.get(
                `${urlPattern1}/api/genres/${i.id}/grouped-by-genre/`
            );
            moviesByGenre[i.id] = movieResponse.data.data;
          }
        }

        setMovies(moviesByGenre);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching genres or movies:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };
    fetchGenresAndMovies();
  }, [genre]);

  return (
      <div className="genres bg-black text-light d-flex flex-column">
        <Navbar />
        <div className="content flex-grow-1">
          {loading && <p>Loading movies...</p>}
          {error ? (
              <div>{error}</div>
          ) : (
              <GridMovieCard movies={movies} genres={genres} />
          )}
        </div>
        <Footer />
      </div>
  );
}

export default Genres;
