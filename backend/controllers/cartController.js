const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose=require("mongoose")

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, color, product } = req.body;

    // Your logic to add a product to the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        products: [{ product: productId, quantity, color, product }],
      });
    } else {
      // If the cart exists, add the product to it
      const existingProduct = cart.products.find((p) => {
        // Check if the product is an ObjectId (it has an `equals` method)
        if (mongoose.Types.ObjectId.isValid(p.product) && mongoose.Types.ObjectId.isValid(productId)) {
          return p.product._id.equals(productId);
        }
        // Fallback to direct comparison if not ObjectId
        return p.product._id === productId;
      });

      if (existingProduct) {
        // Check if the color matches
        if (existingProduct.color === color) {
          // If the color matches, update the quantity
          existingProduct.quantity += quantity;
        } else {
          // If the color is different, add a new item
          console.log("If product is not of same color")
          cart.products.push({ product: productId, quantity, color, product });
        }
      } else {
        // If the product is not in the cart, add it
        console.log("If product is not in cart")
        cart.products.push({ product: productId, quantity, color, product });
      }
    }

    // Save the updated cart
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getAllCartItems = async (req, res) => {
  try {
    const { _id: userId } = req.rootUser;

    // Find the user's cart using their user ID
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.json(cart.products);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ error: 'An error occurred while fetching cart items' });
  }
};


// controllers/cartController.js
exports.removeFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const productId = req.params.productId;
    // Your logic to remove the product from the user's cart
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Remove the product from the cart
      cart.products = cart.products.filter((p) => {
        const productObjectIdString = p._id.toString();
        const requestedProductIdString = productId.toString();
      
        return productObjectIdString !== requestedProductIdString;
      });
      await cart.updateOne({ $pull: { products: { _id: productId } } });

      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear the products in the user's cart
    cart.products = [];

    // Save the updated cart
    const updatedCart = await cart.save();

    return res.status(204).json(updatedCart.products);
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

