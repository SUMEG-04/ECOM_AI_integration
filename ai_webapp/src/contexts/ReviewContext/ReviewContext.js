import { createContext, useContext, useEffect, useReducer } from 'react';
import reviewReducer from '../../reducer/ReviewReducer';

// Define action types
export const ADD_REVIEW = 'ADD_REVIEW';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const EDIT_REVIEW = 'EDIT_REVIEW';

// Create the context
const ReviewContext = createContext();

// Define the initial state
const initialState = {
  reviews: [],
  userReviews: {},
};

// Create the reducer function
const API_URL=`http://localhost:3000/api/reviews/`

// Create the ReviewProvider component
export const ReviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);


  const fetchReviews = async (id) => {
    try {
      // Fetch reviews from your backend API
      const response = await fetch(`${API_URL}/product-reviews/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const reviewsData = await response.json();
      // Dispatch an action to update the reviews in the context
      dispatch({ type: FETCH_REVIEWS, payload: reviewsData });
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  // contexts/ReviewContext/ReviewContext.js

    const updateReview = async (reviewId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/update/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      const updatedReview = await response.json();
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error.message);
      throw error;
    }
  };

  return (
    <ReviewContext.Provider value={{ ...state,dispatch, fetchReviews,updateReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewContext must be used within a ReviewProvider');
  }
  return context;
};
