const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import your User model

// Secret key for JWT
const jwtSecret = process.env.SECRET_KEY;

// Function to register a new user
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if the username already exists in the database
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password });

    newUser.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Function to log in and generate a JWT token
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Find the user by username and verify the password
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret);

      return res.status(200).json({ token });
    });
  });
};
