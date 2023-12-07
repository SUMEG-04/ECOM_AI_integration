// components/Review/UpdateReviewForm.js
import React, { useState, useEffect } from 'react';
import { useReviewContext } from '../../contexts/ReviewContext/ReviewContext';

const UpdateReviewForm = ({ reviewId, onClose }) => {
  const { updateReview, fetchReviews } = useReviewContext();
  const [updatedReview, setUpdatedReview] = useState({
    rating: 0,
    comment: '',
  });

  useEffect(() => {
    // Fetch the existing review data
    // You can customize this based on how your reviews are stored in the context
    // For example, you might have a function like fetchReviewById(reviewId)
    // that fetches the review data based on the reviewId
    const existingReview = fetchReviews().find((review) => review.id === reviewId);

    if (existingReview) {
      setUpdatedReview({
        rating: existingReview.rating,
        comment: existingReview.comment,
      });
    }
  }, [fetchReviews, reviewId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the updateReview function from your context
      await updateReview(reviewId, updatedReview);

      // Fetch updated reviews
      fetchReviews();

      // Close the update form
      onClose();
    } catch (error) {
      console.error('Error updating review:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          name="rating"
          value={updatedReview.rating}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Comment:
        <textarea
          name="comment"
          value={updatedReview.comment}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Update Review</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateReviewForm;
