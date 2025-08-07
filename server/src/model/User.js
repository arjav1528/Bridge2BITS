const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String
  },
  // Student profile fields
  bio: {
    type: String,
    default: ''
  },
  interests: {
    type: [String],
    default: []
  },
  branch: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  campus: {
    type: String,
    enum: ['Goa', 'Pilani', 'Hyderabad'],
    default: 'Goa'
  },
  city: {
    type: String,
    default: ''
  },
  university: {
    type: String,
    default: ''
  },
  studentId: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  linkedinProfile: {
    type: String,
    default: ''
  },
  githubProfile: {
    type: String,
    default: ''
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;