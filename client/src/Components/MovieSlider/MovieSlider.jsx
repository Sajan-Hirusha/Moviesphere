import React from "react";
import {useNavigate} from "react-router-dom";

const MovieSlider = ({ movies }) => {
    const navigate = useNavigate();

    const handleViewDetails = (id) => {
        console.log(id);
        navigate("/review", { state: { movieid: id } }); // Pass movieId via state
    };

  return (
    <div id="movieSlider" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="d-flex justify-content-center">
              <div
                className="card"
                style={{
                  width: "80%", // Adjust width as needed
                  maxWidth: "800px", // Optional: Limit maximum width
                  margin: "0 auto",
                }}
              >
                <img
                  src={movie.image1}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ maxHeight: "400px", minHeight: "400px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                  <button className="btn btn-primary" onClick={()=>handleViewDetails(movie.id)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#movieSlider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#movieSlider"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MovieSlider;
