const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to make a payment
router.post('/make-payment', authMiddleware.verifyToken, paymentController.processPayment);

module.exports = router;
