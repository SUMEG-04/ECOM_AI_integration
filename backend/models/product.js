const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    rate: {
      type: Number,

    },
    count: {
      type: Number,

    },
  },
  title: {
    type: String,
  },
  colors: {
    type: [String],
  },
  company: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  // You can add more fields here as needed (e.g., image URL, ratings, etc.)
  // ...

  // Timestamps for when the product was created and last updated
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
