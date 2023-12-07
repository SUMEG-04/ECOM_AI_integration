const Product = require('../models/product'); // Import the Product model

// Function to search for products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.params; // Get the search query from the request parameters

    // Use Mongoose to search for products that match the query
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on product name
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive search on product description
      ],
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
