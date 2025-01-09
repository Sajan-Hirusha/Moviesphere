import React, { useState } from 'react';
import './Movieselectionlist.css';

// Import images for the cards
import adminMovieCountBG from '../../assets/Images/adminMovieCountBG.jpg';
// import anotherImage from '../../assets/Images/Images.jpg'; // Add more images if needed

export const Movieselectionlist = () => {
  const cards = [
    { image: adminMovieCountBG, title: 'Card 1', description: 'Description for card 1' },
    { image: adminMovieCountBG, title: 'Card 2', description: 'Description for card 2' },
    { image: adminMovieCountBG, title: 'Card 3', description: 'Description for card 3' },
    { image: adminMovieCountBG, title: 'Card 4', description: 'Description for card 4' },
    // { image: anotherImage, title: 'Card 5', description: 'Description for card 5' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 3; // Number of visible cards at a time

  const handleNext = () => {
    if (currentIndex + visibleCards < cards.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="carousel">
      <button
        className="carousel-btn prev-btn"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        &#8249; {/* Left arrow */}
      </button>

      <div className="carousel-track">
        {cards
          .slice(currentIndex, currentIndex + visibleCards)
          .map((card, index) => (
            <div key={index} className="image-card">
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
      </div>

      <button
        className="carousel-btn next-btn"
        onClick={handleNext}
        disabled={currentIndex + visibleCards >= cards.length}
      >
        &#8250; {/* Right arrow */}
      </button>
    </div>
  );
};
