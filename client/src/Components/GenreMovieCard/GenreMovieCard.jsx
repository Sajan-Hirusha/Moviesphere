import PropTypes from "prop-types";
import "./GenreMovieCard.css";

const GenreMovieCard = ({ title, image, movieTrailer }) => {
  return (
    <div className="genre-movie-card">
      <img src={image} alt={title} className="genre-movie-image" />
      <div className="genre-movie-info">
        <h5>{title}</h5>
        {/* <p>{description}</p> */}
        <a href={`${movieTrailer}`} target="_blank">
          <button className="btn text-muted">
            <i className="bi bi-play-circle"></i> Trailer
          </button>
        </a>
      </div>
    </div>
  );
};

GenreMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  movieTrailer: PropTypes.string.isRequired,
};

export default GenreMovieCard;
