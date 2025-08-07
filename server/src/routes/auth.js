const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign(
      {
        userId: req.user.id,
        email: req.user.email,
        displayName: req.user.displayName
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000 // 1 hour
    });
    
    // Redirect to frontend callback URL
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback`);
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Add a route to get current user
router.get('/me', authenticateToken, (req, res) => {
  // req.user is set by the authenticateToken middleware
  User.findById(req.user.userId)
    .then(user => {
      if (user) {
        res.json({
          success: true,
          user: {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            profilePicture: user.profilePicture
          }
        });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

module.exports = router;