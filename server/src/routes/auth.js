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
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        // User is not authorized (wrong email domain)
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/unauthorized`);
      }
      
      req.user = user;
      next();
    })(req, res, next);
  },
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
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000 // 1 hour
    });
    
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback`);
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

router.get('/me', authenticateToken, (req, res) => {
  User.findById(req.user.userId)
    .then(user => {
      if (user) {
        // For existing users who don't have isProfileComplete field, set it to true
        // This prevents them from being stuck in the profile completion flow
        const isProfileComplete = user.isProfileComplete !== undefined ? user.isProfileComplete : true;
        
        res.json({
          success: true,
          user: {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            profilePicture: user.profilePicture,
            isProfileComplete: isProfileComplete,
            // Add default values for existing users
            bio: user.bio || '',
            interests: user.interests || [],
            branch: user.branch || '',
            year: user.year || '',
            campus: user.campus || (user.email.includes('@goa.bits-pilani.ac.in') ? 'Goa' :
                                   user.email.includes('@pilani.bits-pilani.ac.in') ? 'Pilani' :
                                   user.email.includes('@hyderabad.bits-pilani.ac.in') ? 'Hyderabad' : 'Goa'),
            city: user.city || '',
            university: user.university || '',
            studentId: user.studentId || '',
            phoneNumber: user.phoneNumber || '',
            linkedinProfile: user.linkedinProfile || '',
            githubProfile: user.githubProfile || ''
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

router.post('/complete-profile', authenticateToken, async (req, res) => {
  try {
    const {
      bio,
      interests,
      branch,
      year,
      campus,
      city,
      university,
      studentId,
      phoneNumber,
      linkedinProfile,
      githubProfile
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        bio,
        interests,
        branch,
        year,
        campus,
        city,
        university,
        studentId,
        phoneNumber,
        linkedinProfile,
        githubProfile,
        isProfileComplete: true
      },
      { new: true }
    );

    if (updatedUser) {
      res.json({
        success: true,
        message: 'Profile completed successfully',
        user: {
          id: updatedUser.id,
          displayName: updatedUser.displayName,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture,
          isProfileComplete: updatedUser.isProfileComplete
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error completing profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Migration route to fix existing users with empty campus values
router.post('/fix-campus', async (req, res) => {
  try {
    const users = await User.find({ campus: '' });
    
    for (const user of users) {
      let campus = 'Goa'; // Default fallback
      
      if (user.email.includes('@goa.bits-pilani.ac.in')) {
        campus = 'Goa';
      } else if (user.email.includes('@pilani.bits-pilani.ac.in')) {
        campus = 'Pilani';
      } else if (user.email.includes('@hyderabad.bits-pilani.ac.in')) {
        campus = 'Hyderabad';
      }
      
      user.campus = campus;
      await user.save();
    }
    
    res.json({ 
      success: true, 
      message: `Fixed ${users.length} users with empty campus values` 
    });
  } catch (error) {
    console.error('Error fixing campus values:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get all students (for community page)
router.get('/students', async (req, res) => {
  try {
    // Fetch all users with completed profiles
    const students = await User.find({ isProfileComplete: true })
      .select('displayName email profilePicture bio branch year campus createdAt')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      students: students.map(student => ({
        id: student.id,
        displayName: student.displayName,
        email: student.email,
        profilePicture: student.profilePicture,
        bio: student.bio,
        branch: student.branch,
        year: student.year,
        campus: student.campus
      }))
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;