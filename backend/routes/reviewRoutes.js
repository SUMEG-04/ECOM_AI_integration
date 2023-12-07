const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new review
router.post('/create-review', authMiddleware.verifyToken, reviewController.createReview);

// Route to get all reviews for a product
router.get('/product-reviews/:productId', reviewController.getProductReviews);

// Route to update reviews for a product
router.put('/update/:userId', authMiddleware.verifyToken,reviewController.updateReview);

module.exports = router;
