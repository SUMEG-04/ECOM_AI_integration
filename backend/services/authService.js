const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key for JWT token (you should store this in a safe environment)
const JWT_SECRET = 'your-secret-key';

// Generate a JWT token for a user
function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Adjust token expiration as needed
}

// Verify and decode a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null; // Token verification failed
  }
}

// Hash a password using bcrypt
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Compare a password with a hashed password
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
