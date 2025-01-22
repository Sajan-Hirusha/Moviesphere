// import React from 'react'
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import MultiCardCarousel from "../../Components/MultiCardSlider/MultiCardCarousel.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlPattern1 } from "../../../env.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GridMovieCard from "../../Components/MovieCardGrid/GridMovieCard.jsx";

function Genres() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { genre } = useParams();

  const g = [
    { id: 1, name: "Action" },
    { id: 2, name: "Science Fiction" },
    { id: 3, name: "Drama" },
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
        // console.log(genreResponse.data.results)
        const moviesByGenre = {};
        for (let i of g) {
          console.log(i.name)
          console.log(genre)
          if (genre == i.name) {
            const movieResponse = await axios.get(
              `${urlPattern1}/api/genres/${i.id}/grouped-by-genre/`
            );
            console.log("11111111111111" )
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
  }, []);
  console.log(movies);
  console.log(genres);
  // useEffect(() => {
  //   const fetchAllMovies = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`${urlPattern1}/api/movies/get_movies/`);
  //       setAllMovies(response.data.results);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching movies:111111111111111", err);
  //       console.log("")
  //       setError("Failed to load movies.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllMovies();
  // }, []);
  console.log(genre);
  return (
    <>
      <div className="bg-black text-light">
        <Navbar />
        <div className="content">
          {/* <div>
      {loading && <p>Loading movies...</p>}
      {error ? <div>{error}</div> :
              loading ? <div>loading</div> :
                <div className="row">
                  {movies.map((movie, index) => (
                    <MovieCard
                      key={index}
                      title={movie.title}
                      image={movie.image1}
                      description={movie.description}
                    />
                  ))}
                </div>}
    </div> */}

          <GridMovieCard movies={movies} genres={genres} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Genres;
