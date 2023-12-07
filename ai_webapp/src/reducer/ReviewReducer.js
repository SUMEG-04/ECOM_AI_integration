import { FETCH_REVIEWS, ADD_REVIEW,EDIT_REVIEW } from '../contexts/ReviewContext/ReviewContext';


// ReviewContext.js

// ...


// ...

const reviewReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case ADD_REVIEW:
      const { productId, user } = action.payload;

      // Check if the user has already reviewed the product
      if (!state.userReviews[productId]) {
        state.userReviews[productId] = {};
      }

      state.userReviews[productId][user] = action.payload;

      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        userReviews: { ...state.userReviews },
      };

    case EDIT_REVIEW:
      const { editedReview } = action.payload;
      const { editedProductId, editedUser } = editedReview;

      // Check if the user has already reviewed the product
      if (!state.userReviews[editedProductId]) {
        state.userReviews[editedProductId] = {};
      }

      state.userReviews[editedProductId][editedUser] = editedReview;

      // Update the reviews array with the edited review
      const updatedReviews = state.reviews.map((review) =>
        review.id === editedReview.id ? editedReview : review
      );

      return {
        ...state,
        reviews: updatedReviews,
        userReviews: { ...state.userReviews },
      };

    default:
      return state;
  }
};

// ...


export default reviewReducer;
