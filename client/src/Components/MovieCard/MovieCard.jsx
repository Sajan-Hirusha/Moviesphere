import React from "react";

const MovieCard = ({ title, image, description }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={`/movies/${title}`} className="btn btn-primary">View Details</a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
