import React, { useEffect, useState } from 'react';
import { useReviewContext } from '../../contexts/ReviewContext/ReviewContext';
import AddReviewForm from './AddReviewForm';
import './Review.css';
import { useAuth } from '../useAuth/useAuth';
import { useParams } from 'react-router-dom';
import Stars from '../ProductList/Stars';

const ReviewList = () => {
  const { user } = useAuth();
  const { reviews, fetchReviews } = useReviewContext();
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [review, setReview] = useState({});
  const { id } = useParams();
  let userReview=""

  useEffect(() => {
    fetchReviews(id);
  }, [id]);

  useEffect(() => {
    // Check if the user has already reviewed
    if(user){
        userReview = reviews.find(
            (review) => review.user === `${user.firstName} ${user.lastName}`
          );
    }

    if (userReview) {
      setAlreadyReviewed(true);
      setReview(userReview);
    } else {
      setAlreadyReviewed(false);
      setReview({});
    }
  }, [reviews, user]);

  return (
    <div className='review-container'>
      {/* Display reviews */}
      {reviews &&
        reviews.map((review) => (
          <div key={review.id} className='review-section'>
            <h4>{review.user}</h4>
            <Stars stars={review.rating} reviews={review.comment} />
            <hr />
          </div>
        ))}
      {user ? <AddReviewForm alreadyReviewed={alreadyReviewed} review={review} /> : null}
    </div>
  );
};

export default ReviewList;
