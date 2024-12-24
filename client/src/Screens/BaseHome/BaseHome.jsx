import React from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar.jsx"
import HeroSection from "../../Components/HeroSection/HeroSection.jsx";
import MovieCard from "../../Components/MovieCard/MovieCard.jsx";
import GenreMovieCard from "../../Components/GenreMovieCard/GenreMovieCard.jsx";
import MovieSlider from '../../Components/MovieSlider/MovieSlider.jsx';
import Footer from "../../Components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { urlPattern1 } from '../../../env.jsx'

const BaseHome = () => {

  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const urlPattern = urlPattern1;

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${urlPattern}/api/movies/get_movies/`);
        setAllMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  // useEffect(() => {
  //   const fetchActionMovies = async () => {
  //     try {

  //       const response = await axios.get(`${urlPattern}/api/movies/get_action/`);
  //       setActionMovies(response.data.results);
  //       console.log(response.data.results);

  //     } catch (err) {
  //       console.error("Error fetching movies:", err);


  //     }
  //   };

  //   fetchActionMovies();
  // }, []);

  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     try {
  //       const response = await axios.get(`${urlPattern}/api/genres/get_genres/`);
  //       setGenres(response.data.results);
  //       console.log(response.data.results);
  //     } catch (err) {
  //       console.error("Error fetching genres:", err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchGenres();
  // }, []);

  // const fetchMoviesForGenre = (genreId) => {
  //   if (movieByGenre[genreId]) {
  //     // If already fetched, do nothing
  //     return;
  //   }
  //   axios
  //     .get(`${urlPattern}/api/genres/${genreId}/grouped-by-genre/`)
  //     .then((response) => {
  //       setMoviesByGenre((prev) => ({
  //         ...prev,
  //         [genreId]: response.data.data,
  //       }));
  //       console.log(response.data.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching movies:", err);
  //     });
  // };

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genreResponse = await axios.get(`${urlPattern}/api/genres/get_genres/`);
        setGenres(genreResponse.data.results);
        const moviesByGenre = {};
        for (let genre of genreResponse.data.results) {
          const movieResponse = await axios.get(`${urlPattern}/api/genres/${genre.id}/grouped-by-genre/`);
          moviesByGenre[genre.id] = movieResponse.data.data;
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
  console.log(genres);
  console.log(allMovies);
  console.log(movies);

  const scrollLeft = (index) => {
    const scroller = document.getElementById(`scroller-${index}`);
    scroller.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (index) => {
    const scroller = document.getElementById(`scroller-${index}`);
    scroller.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-black text-light">
        <Navbar />
        <div className="content">
          <HeroSection />
          <div className="container py-5">
            <h2 className="mb-4">Featured Movies</h2>
            <MovieSlider movies={allMovies} />
          </div>
          <div className="container py-5">
            <h2 className="mb-4">Featured Movies</h2>
            {error ? <div>{error}</div> :
              loading ? <div>loading</div> :
                <div className="row">
                  {allMovies.map((movie, index) => (
                    <MovieCard
                      key={index}
                      title={movie.title}
                      image={movie.image1}
                      description={movie.description}
                    />
                  ))}
                </div>}
          </div>

          {loading && <p>Loading movies...</p>}
          {error && <p>{error}</p>}

          <div className="genre-list">
            {genres.map((genre, index) =>
              movies[genre.id] && movies[genre.id].length > 0 ? (
                <div className="container py-5" key={index}>
                  <h2>{genre.name}</h2>
                  <div className="scroll-container">
                    <button className="carousel-control-prev"
                      type="button"
                      data-bs-target="#movieSlider"
                      data-bs-slide="prev" onClick={() => scrollLeft(index)}>
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <div className="horizontal-scroller" id={`scroller-${index}`}>
                      {movies[genre.id].map((movie, idx) => (
                        <div className="genre-card-wrapper" key={idx}>
                          <GenreMovieCard
                            title={movie.title}
                            image={movie.image1}
                            description={movie.description}
                          />
                        </div>
                      ))}
                    </div>
                    <button className="carousel-control-next"
                      type="button"
                      data-bs-target="#movieSlider"
                      data-bs-slide="next" onClick={() => scrollRight(index)}>
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

              ) : null
            )}
          </div>


        </div>
      </div>
      <Footer />
    </>
  );
};

export default BaseHome;
