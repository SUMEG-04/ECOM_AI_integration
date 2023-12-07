const Review = require('../models/review'); // Import your Review model

// Create a new review
async function createReview(userId, productId, rating, comment) {
  try {
    const review = new Review({
      userId,
      productId,
      rating,
      comment,
    });
    await review.save();
    return review;
  } catch (error) {
    throw error;
  }
}

// Get reviews for a specific product
async function getProductReviews(productId) {
  try {
    const reviews = await Review.find({ productId }).populate('userId');
    return reviews;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReview,
  getProductReviews,
};
