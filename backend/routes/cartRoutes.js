const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');


// Route to get the user's shopping cart
router.get('/', authMiddleware.verifyToken, (req,res)=>{
    res.send(req.rootUser)
});

router.post('/items', authMiddleware.verifyToken, cartController.getAllCartItems);

// Route to add a product to the user's cart
router.post('/add-to-cart/', cartController.addToCart);

// Route to remove a product from the user's cart 
// routes/cart.js
router.delete('/remove-from-cart/:productId', cartController.removeFromCart);
// Route to clear the user's cart
router.delete('/clear-cart', cartController.clearCart);

module.exports = router;
