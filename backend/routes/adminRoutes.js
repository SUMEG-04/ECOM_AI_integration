const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to protect admin routes
const authMiddleware = require('../middleware/authMiddleware');


// Route to create a new admin user
router.post('/register', adminController.createAdmin);

// Route to log in an admin user
router.post('/login', adminController.loginAdmin);

// Protected routes (requires admin authentication)
router.use(authMiddleware.checkAdmin);

// Route to get admin profile
router.get('/profile', adminController.getAdminProfile);

// Route to update admin profile
router.put('/profile', adminController.updateAdminProfile);

module.exports = router;
