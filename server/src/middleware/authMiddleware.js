const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = authenticateToken;