import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MainFrame } from './MainFrame';
import { MovieArtical } from './MovieArtical';
import { Movieselectionlist } from './Movieselectionlist';
import './Review.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

export const Review = () => {
  const location = useLocation();
  const [movieId, setMovieId] = useState(null); // Default movieId as null

  useEffect(() => {
    // Ensure movieid is passed and it's a number
    if (location.state?.movieid) {
      setMovieId(Number(location.state.movieid)); // Convert movieid to a number
    }
  }, [location.state]);

  return (
    <div className="movieReview">
      <Navbar />
      <MainFrame movieId={movieId} />
      <MovieArtical movieId={movieId} />
      <Movieselectionlist movieId={movieId} setMovieId={setMovieId} />
      <Footer />
    </div>
  );
};
