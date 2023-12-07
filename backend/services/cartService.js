const Cart = require('../models/cart'); // Assuming you have a Cart model

// Fetch cart items for a specific user
async function getCartItems(userId) {
  try {
    const cart = await Cart.findOne({ userId }).populate('items.product');
    return cart;
  } catch (error) {
    throw error;
  }
}

// Add a product to the user's cart
async function addToCart(userId, productId, quantity) {
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product._id.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

// Remove a product from the user's cart
async function removeFromCart(userId, productId) {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return cart;
    }

    cart.items = cart.items.filter((item) => !item.product._id.equals(productId));
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
};
