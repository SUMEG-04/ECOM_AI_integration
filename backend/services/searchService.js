const Product = require('../models/product'); // Import your Product model

// Search for products based on keywords
async function searchProducts(keywords) {
  try {
    // Use a regular expression to search for products containing the keywords in their name or description
    const regex = new RegExp(keywords, 'i'); // Case-insensitive search
    const products = await Product.find({
      $or: [{ name: regex }, { description: regex }],
    });
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  searchProducts,
};
