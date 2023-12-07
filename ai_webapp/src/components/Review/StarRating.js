import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating, newReview, setNewReview }) => {
    const [hoverRating, setHoverRating] = useState(0);
  
    const handleStarHover = (hoveredRating) => {
      setHoverRating(hoveredRating);
    };
  
    const handleStarClick = () => {
      setRating(hoverRating);
  
      // Update the newReview state with the selected rating
      setNewReview(prevReview => ({ ...prevReview, rating: hoverRating }));
    };
  
    const handleStarLeave = () => {
      setHoverRating(0);
    };
  
    return (
      <div className="rating">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="star"
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleStarLeave}
            onClick={handleStarClick}
          >
            {index <= (hoverRating || rating) ? <FaStar className='icon-star' /> : <FaRegStar className='icon-star' />}
          </div>
        ))}
      </div>
    );
  };
  

export default StarRating;
