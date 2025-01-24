import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/Images/siteLogo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    console.log("Navigate to:", selectedCategory);
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`); // Navigate to category page
    }
  };

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
    console.log("Search query:", query);
    if (query) {
      navigate(`/search?q=${query}`); // Navigate to search page with query
    }
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
            <li className="nav-item">
              <select
                className="form-select bg-dark text-light border-0"
                onChange={handleCategoryChange}
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

            <li className="nav-item">
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

            <li className="nav-item">
              <a className="nav-link" href="/contactus">
               Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Register">Login</a>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
