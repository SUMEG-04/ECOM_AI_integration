import { FETCH_REVIEWS, ADD_REVIEW } from './reviewTypes';
import { getReviews, addReview as addReviewService } from './reviewService';

export const fetchReviews = () => async (dispatch) => {
  try {
    const reviews = await getReviews();
    dispatch({ type: FETCH_REVIEWS, payload: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
  }
};

export const addReview = (newReview) => async (dispatch) => {
  try {
    const addedReview = await addReviewService(newReview);
    dispatch({ type: ADD_REVIEW, payload: addedReview });
  } catch (error) {
    console.error('Error adding review:', error.message);
  }
};
