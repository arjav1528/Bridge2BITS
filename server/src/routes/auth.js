const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

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
    
    // Return JSON response instead of redirecting
    res.json({ 
      success: true,
      token,
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
        profilePicture: req.user.profilePicture
      }
    });
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Add a route to get current user
router.get('/me', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
        profilePicture: req.user.profilePicture
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

module.exports = router;