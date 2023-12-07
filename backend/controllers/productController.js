const Product = require('../models/product');
const mongoose=require("mongoose")

// Function to get a list of all products
const getAllProducts = async (req, res) => {
  try {
    const productsData=await Product.find()
    res.status(200).json({ data:productsData });
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: 'An error occurred' });
    console.log(error)
  }
};

const getFeaturedProducts=async(req,res)=>{
  try {
    //console.log("working")
    const homePage=await fetch('https://api.pujakaitem.com/api/products')
    const data=await homePage.json()
    res.json({data})
    //console.log(data)
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: 'An error occurred' });
  }
}
// Function to get details of a specific product by ID

const getProductById = async (req, res) => {
  try { 
    const productId = req.params.productId;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid productId format' });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Return the product
    res.json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the product' });
  }
};

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const productsData = await response.json();
    console.log(productsData)
    // Save the data to your database
    await Product.insertMany(productsData);
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: 'An error occurred' });
    console.log(error)
  }
};
//createProduct()
// Function to update a product by ID
const updateProduct = async (req, res) => {
  try {
    // Your logic for updating a product
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Function to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    // Your logic for deleting a product
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
