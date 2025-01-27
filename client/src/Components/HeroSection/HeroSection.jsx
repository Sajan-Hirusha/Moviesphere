import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-transparent text-white text-center py-5">
      <div className="container">
        <h1 className="display-4">Welcome to Moviesphere</h1>
        <p className="lead">Discover, Rate, and Review your favorite movies!</p>
        <a href="/" className="btn btn-primary btn-lg">Explore Movies</a>
      </div>
    </div>
  );
};

export default HeroSection;
