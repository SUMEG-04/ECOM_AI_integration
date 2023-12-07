const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Create an instance of Express
const app = express();
app.use(cookieParser());

// Middleware for parsing JSON request bodies
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3001', //included origin as true
  credentials: true, //included credentials as true
};

// Enable CORS for cross-origin requests
app.use(cors(corsOptions));

// Connect to the MongoDB database
require('./config/database')
require('./aisupport/cutomerservice')
require('./aisupport/QnARetrival')

// Define API routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const helpRoutes = require('./routes/helpRoutes');


console.log()
// Use API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/help', helpRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
