const jwt = require('jsonwebtoken');
const User=require('../models/user')
const config = process.env.SECRET_KEY; // You should have a configuration file with your secret key

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    // console.log('Incoming request:', req.method, req.originalUrl);
    // console.log('Token:', token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({ _id: verifyToken._id, 'tokens.token': token });
    if (!rootUser) {
      throw new Error('User not found');
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next()
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


// Middleware to check if the user is an admin
exports.checkAdmin = (req, res, next) => {
  // Assuming you have a 'role' field in your user model
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  next();
};

// You can add more middleware functions for specific authorization checks
