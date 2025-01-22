import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, title, image, description }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    console.log(id);
    navigate('/review', { state: { movieid: id } }); // Pass movieId via state
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card fixed-height-card">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
        <h5 className="card-title">{title} - {id}</h5>
          <p className="card-text">{description}</p>
          <button className="btn btn-primary" onClick={handleViewDetails}>
            View Details
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
