const Product = require('../models/product'); // Assuming you have a Product model

// Fetch all products
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}

// Fetch a product by ID
async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}

// Create a new product
async function createProduct(productData) {
  try {
    const product = new Product(productData);
    const newProduct = await product.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
}

// Update a product by ID
async function updateProduct(productId, updatedData) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

// Delete a product by ID
async function deleteProduct(productId) {
  try {
    await Product.findByIdAndRemove(productId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
