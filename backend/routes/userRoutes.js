const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRegistration, checkValidation, validateLogin } = require('../utils/validation');


// Route to create a new user
router.post('/register',validateRegistration,checkValidation ,userController.createUser);

// Route to log in a user
router.post('/login',validateLogin,checkValidation , userController.loginUser);

// Route to get user profile
router.get('/profile',authMiddleware.verifyToken,userController.getUserProfile);

// Route to update user profile
router.put('/update',authMiddleware.verifyToken, userController.updateUserProfile);

module.exports = router;
