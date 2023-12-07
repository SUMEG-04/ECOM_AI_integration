const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Handle POST request to save contact message
router.post('/message', contactController.saveMessage);

module.exports = router;
