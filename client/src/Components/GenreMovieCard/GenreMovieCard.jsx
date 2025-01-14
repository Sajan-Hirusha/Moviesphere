import React from "react";
import PropTypes from "prop-types";
import "./GenreMovieCard.css";

const GenreMovieCard = ({ title, image, description }) => {
  return (
    <div className="genre-movie-card">
      <img src={image} alt={title} className="genre-movie-image" />
      <div className="genre-movie-info">
        <h5>{title}</h5>
        {/* <p>{description}</p> */}
        <a href={`/movies/${title}`}><button class="btn"><i class="bi bi-play-circle"></i> Trailer</button></a>
      </div>
    </div>
  );
};

GenreMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default GenreMovieCard;
