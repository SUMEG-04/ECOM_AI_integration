const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

// Route to get a list of all products
router.get('/', getAllProducts);

router.get('/home',getFeaturedProducts)

// Route to get details of a specific product by ID
router.get('/:productId', getProductById);

// Use authMiddleware for routes that require authentication
router.post('/', authMiddleware.verifyToken, createProduct);
router.put('/:productId', authMiddleware.verifyToken, updateProduct);
router.delete('/:productId', authMiddleware.verifyToken, deleteProduct);

module.exports = router;
