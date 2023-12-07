const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to search for products
router.get('/search', searchController.searchProducts);

module.exports = router;
