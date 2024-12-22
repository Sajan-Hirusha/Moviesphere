import React from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar.jsx"
import HeroSection from "../../Components/HeroSection/HeroSection.jsx";
import MovieCard from "../../Components/MovieCard/MovieCard.jsx";
import MovieSlider from '../../Components/MovieSlider/MovieSlider.jsx';
import Footer from "../../Components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {urlPattern1} from '../../../env.jsx'

// const movies = [
//   { title: "Inception", image: "https://irs.www.warnerbros.com/hero-banner-v2-tablet-jpeg/movies/media/browser/inception_banner.jpg", description: "A mind-bending thriller by Christopher Nolan." },
//   { title: "Interstellar", image: "https://miro.medium.com/v2/resize:fit:1400/1*xljTBBsrRqJHExiiIyN67Q.jpeg", description: "A journey beyond the stars." },
//   { title: "The Dark Knight", image: "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg", description: "A superhero epic." },
//   { title: "Tenet", image: "https://cdn.prod.website-files.com/6188e55dd468b56ab674f61d/64c92271765761011d3c24c2_story-tenet-poster2-e1598843300390.jpeg", description: "A time-twisting masterpiece." },
//   { title: "Dunkirk", image: "https://www.parisperfect.com/blog/wp-content/uploads/2018/01/dunkirk-movie-header.jpg", description: "A WWII thriller." },
// ];

const BaseHome = () => {

  const [movies, setMovies] = useState([]); // State to store movies
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null);
  const urlPattern = urlPattern1;

  useEffect(() => {
    // Fetch movies from the backend
    const fetchMovies = async () => {
      try {
        setLoading(true); // Set loading to true
        const response = await axios.get(`${urlPattern}/api/movies/get_movies/`); // Replace with your backend URL
        setMovies(response.data.results); // Set movies from the response
        console.log(response.data.results);
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchMovies(); // Call the function
  }, []); // Empty dependency array means this runs only once on mount

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (error) {
    return <div>{error}</div>; // Show an error message
  }

  return (
    <>
      <div
        className="bg-black text-light"

      >
        <Navbar />
        <div className="content">
          <HeroSection />
          <div className="container py-5">
            <h2 className="mb-4">Featured Movies</h2>
            <MovieSlider movies={movies} />
          </div>
          <div className="container py-5">
            <h2 className="mb-4">Featured Movies</h2>
            <div className="row">
              {movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  title={movie.title}
                  image={movie.image1}
                  description={movie.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BaseHome;
