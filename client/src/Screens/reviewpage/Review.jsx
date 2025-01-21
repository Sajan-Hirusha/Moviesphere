import React, { useState } from 'react';
import { MainFrame } from './MainFrame';
import { MovieArtical } from './MovieArtical';
import { Movieselectionlist } from './Movieselectionlist';
import './Review.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

export const Review = () => {
  // State to hold the selected movie ID
  const [movieId, setMovieId] = useState(4); // Default movie ID

  return (

    <>
      {/* Passing movieId as a prop */}

      <Navbar/>
      <MainFrame movieId={movieId} />

      <MovieArtical movieId={movieId} />

      <Movieselectionlist movieId={movieId} setMovieId={setMovieId} />
      <Footer/>
    </>
  );
};
