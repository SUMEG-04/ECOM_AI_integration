import React, { useEffect, useState } from 'react';
import { useReviewContext } from '../../contexts/ReviewContext/ReviewContext';
import { useAuth } from '../useAuth/useAuth';
import { useParams } from 'react-router-dom';
import { addReview } from './reviewService';
import StarRating from './StarRating';

const AddReviewForm = ({ alreadyReviewed, review }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const { dispatch,updateReview } = useReviewContext();

  const [rating, setRating] = useState(0);
  const [chngreview,setChngreview]=useState(false)
  const [newReview, setNewReview] = useState({
    user: `${user.firstName} ${user.lastName}`,
    productId: id,
    rating: 0,
    comment: '',
  });

  // Set initial state based on the review prop
  useEffect(() => {
    if (review) {
      setRating(review.rating || 0);
      setNewReview({
        user: `${user.firstName} ${user.lastName}`,
        productId: id,
        rating: review.rating || 0,
        comment: review.comment || '',
      });
    }
  }, [review]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled (you can add more validation if needed)
    if (!newReview.user || !newReview.productId || !newReview.rating) {
      alert('User ID, Product ID, and Rating are required.');
      return;
    }

    // Add or update review based on alreadyReviewed status
    if (alreadyReviewed) {
      // Update existing review
      updateReview(newReview);
    } else {
      // Add new review
      addReview(newReview);
      dispatch({ type: 'ADD_REVIEW', payload: newReview });
    }

    // Optionally, you can reset the form or handle other actions after submitting
    setNewReview({ user: '', productId: '', rating: '', comment: '' });
  };

  if (alreadyReviewed || review) {
    // If already reviewed or review prop is available, show the form for editing
    return (
        <>
          {chngreview ? (
            <button>Some Button Text</button>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              {/* Input fields for user, product, rating, comment */}
              <label>
                Rating:
                <StarRating rating={rating} setRating={setRating} />
              </label>
              <br />
              <label>
                Comment:
                <textarea name="comment" value={newReview.comment} onChange={handleInputChange} />
              </label>
              <br />
              <button type="submit">Add Review</button>
            </form>
          )}
        </>
      );
      
  } else {
    // If not already reviewed and no review prop, show the form for adding a new review
    return (
      <form onSubmit={handleSubmit} className="review-form">
        {/* Input fields for user, product, rating, comment */}
        <label>
          Rating:
          <StarRating rating={rating} setRating={setRating} />
        </label>
        <br />
        <label>
          Comment:
          <textarea name="comment" value={newReview.comment} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add Review</button>
      </form>
    );
  }
};

export default AddReviewForm;
