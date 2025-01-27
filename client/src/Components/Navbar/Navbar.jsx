import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/Images/siteLogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user ID exists in sessionStorage
    const userId = sessionStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Set to true if userId exists, otherwise false
  }, []);

  const handleGenresChange = (event) => {
    const selectedGenre = event.target.value;
    if (selectedGenre) {
      navigate(`/genres/${selectedGenre}`); // Navigate to genre page
      window.location.reload();
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.searchQuery.value;
    if (query) {
      navigate(`/search?q=${query}`); // Navigate to search page with query
    }
  };

  const handleLogout = () => {
    // Clear session storage and redirect to home
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
                src={logo}
                alt="logo"
                style={{ width: "130px", height: "40px" }}
            />
          </a>
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item ms-3">
                <select
                    className="form-select bg-dark text-light border-0"
                    onChange={handleGenresChange}
                    style={{ width: "200px" }}
                >
                  <option value="" disabled selected>
                    Movies
                  </option>
                  <option value="MostPopular">Most Popular</option>
                  <option value="ComingSoon">Coming Soon</option>
                  <option value="TopRated">Top Rated</option>
                  <option value="Trending">Trending</option>
                </select>
              </li>

              <li className="nav-item ms-3">
                <select
                    className="form-select bg-dark text-light border-0"
                    onChange={handleGenresChange}
                    style={{ width: "200px" }}
                >
                  <option value="" disabled selected>
                    Genres
                  </option>
                  <option value="Horror">Horror</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Drama">Drama</option>
                  <option value="Romance">Romance</option>
                  <option value="Animation">Animation</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Fantasy">Fantasy</option>
                </select>
              </li>

              <li className="nav-item ms-3 text-white">
                <a className="nav-link text-white" href="/contactus">
                  Contact Us
                </a>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                  className="form-control me-2"
                  type="search"
                  name="searchQuery"
                  placeholder="Search movies..."
                  aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>

            {isLoggedIn ? (
                <button
                    className="btn btn-danger mx-5"
                    onClick={handleLogout}
                >
                  Logout
                </button>
            ) : (
                <a className="btn btn-success mx-5" href="/login">
                  Login
                </a>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
