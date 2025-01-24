import GenreMovieCard from "../GenreMovieCard/GenreMovieCard";
import './MultiCardCarousel.css'

const MultiCardCarousel = ({ genres, movies }) => {
    const scrollLeft = (index) => {
        const scroller = document.getElementById(`scroller-${index}`);
        if (scroller) {
          scroller.scrollBy({ left: -300, behavior: "smooth" });
        }
      };

      const scrollRight = (index) => {
        const scroller = document.getElementById(`scroller-${index}`);
        if (scroller) {
          scroller.scrollBy({ left: 300, behavior: "smooth" });
        }
      };

      return (
        <div>
          {genres.map((genre, index) =>
            movies[genre.id] && movies[genre.id].length > 0 ? (
              <div className="container py-5" key={index}>
                <h2 className="mb-5">{genre.name}</h2>
                <div className="scroll-container position-relative">
                  {/* Previous Button */}
                  <button
                    className="carousel-control-prev custom-control-prev w-2"
                    type="button"
                    onClick={() => scrollLeft(index)}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>

                  {/* Horizontal Scroller */}
                  <div
                    className="horizontal-scroller d-flex overflow-auto px-5"
                    id={`scroller-${index}`}
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {movies[genre.id].map((movie, idx) => (
                      <div
                        className="genre-card-wrapper flex-shrink-0"
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

                  {/* Next Button */}
                  <button
                    className="carousel-control-next custom-control-next"
                    type="button"
                    onClick={() => scrollRight(index)}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      );
    };


export default MultiCardCarousel;
