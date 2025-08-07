const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    
    // Check if email domain is authorized
    const allowedDomains = [
      '@goa.bits-pilani.ac.in',
      '@pilani.bits-pilani.ac.in',
      '@hyderabad.bits-pilani.ac.in'
    ];
    
    const isAuthorizedEmail = allowedDomains.some(domain => 
      email.toLowerCase().endsWith(domain)
    );
    
    if (!isAuthorizedEmail) {
      return done(null, false, { message: 'Unauthorized email domain' });
    }
    
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      // For existing users, ensure they have all the new profile fields
      let needsUpdate = false;
      
      if (user.isProfileComplete === undefined) {
        user.isProfileComplete = true;
        needsUpdate = true;
      }
      
      // Add default values for missing fields
      if (!user.bio) user.bio = '';
      if (!user.interests) user.interests = [];
      if (!user.branch) user.branch = '';
      if (!user.year) user.year = '';
      
      // Set campus based on email domain if not set or empty
      if (!user.campus || user.campus === '' || user.campus === undefined) {
        if (user.email.includes('@goa.bits-pilani.ac.in')) {
          user.campus = 'Goa';
        } else if (user.email.includes('@pilani.bits-pilani.ac.in')) {
          user.campus = 'Pilani';
        } else if (user.email.includes('@hyderabad.bits-pilani.ac.in')) {
          user.campus = 'Hyderabad';
        } else {
          user.campus = 'Goa'; // Default fallback
        }
        needsUpdate = true;
      }
      
      if (!user.studentId) user.studentId = '';
      if (!user.phoneNumber) user.phoneNumber = '';
      if (!user.linkedinProfile) user.linkedinProfile = '';
      if (!user.githubProfile) user.githubProfile = '';
      
      if (needsUpdate) {
        await user.save();
      }
      
      return done(null, user);
    }
    
    user = await User.create({
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: email,
      profilePicture: profile.photos[0].value
    });
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;