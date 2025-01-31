import { useNavigate } from "react-router-dom";
import './MovieCard.css'

const MovieCard = ({ id, title, image, description }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    console.log(id);
    navigate("/review", { state: { movieid: id } }); // Pass movieId via state
  };

  // Function to truncate the description
  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
      <div className="col-md-4 mb-4">
        <div className="card fixed-height-card">
          <img src={image} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title} - {id}</h5>
            <p className="card-text">{truncateDescription(description, 100)}</p>
            <button className="bg-primary btn btn-link p-0 text-white p-2" onClick={handleViewDetails}>
              See More
            </button>
          </div>
        </div>
      </div>
  );
};

export default MovieCard;
