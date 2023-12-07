// Middleware to handle errors
exports.errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging
  
    // Handle specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: err.errors });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Handle other errors
    return res.status(500).json({ error: 'Internal server error' });
  };
  
  // Middleware to handle 404 Not Found
  exports.notFoundHandler = (req, res, next) => {
    return res.status(404).json({ error: 'Not Found' });
  };
  