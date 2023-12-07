const Review = require('../models/review'); // Import the Review model

// Function to create a new review
exports.createReview = async (req, res) => {
  try {
    const { user, productId, rating, comment } = req.body;

    // Check if the required fields are provided
    if (!user || !productId || !rating) {
      return res.status(400).json({ message: 'User ID, product ID, and rating are required.' });
    }

    // Create a new review
    const newReview = new Review({
      user,
      productId,
      rating,
      comment,
    });

    // Save the review to the database
    await newReview.save();

    return res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    // Find all reviews for the specified product
    const reviews = await Review.find({ productId });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get reviews by a user
exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all reviews created by the specified user
    const reviews = await Review.find({ userId });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// controllers/reviewController.js

exports.updateReview = async (req, res) => {
  const { userId } = req.params;
  const { rating, comment } = req.body;

  try {
    // Find the review by ID
    const review = await Review.findById(userId);

    // Check if the review exists
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the review properties
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    // Save the updated review
    await review.save();

    return res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    console.error('Error updating review:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
