import GenreMovieCard from "../GenreMovieCard/GenreMovieCard";

const GridMovieCard = ({ genres, movies }) => {
  return (
    <div>
      {genres.map((genre, index) =>
        movies[genre.id] && movies[genre.id].length > 0 ? (
          <div className="container py-5" key={index}>
            <h2>{genre.name}</h2>
            <div className="d-flex flex-wrap justify-content-start">
              {movies[genre.id].slice(0, 3).map((movie, idx) => (
                <div
                  className="genre-card-wrapper flex-shrink-0 m-2"
                  style={{ width: "300px" }}
                  key={idx}
                >
                  <GenreMovieCard
                    title={movie.title}
                    image={movie.image1}
                    description={movie.description}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default GridMovieCard;
