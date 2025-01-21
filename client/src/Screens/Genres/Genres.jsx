import React from 'react'
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar.jsx"
import Footer from "../../Components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlPattern1 } from '../../../env.jsx'
import MovieCard from '../../Components/MovieCard/MovieCard.jsx';

import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

function Genres() {

    const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${urlPattern1}/api/movies/get_movies/`);
        setAllMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:111111111111111", err);
        console.log("")
        setError("Failed to load movies.");
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <>
      <div className="bg-black text-light">
        <Navbar />
        <div className="content">
          
        <h2 className="mb-4">Movies</h2>
          

        <div>
      {loading && <p>Loading movies...</p>}
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

          

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Genres
