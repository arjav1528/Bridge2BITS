import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileCompletion = () => {
  console.log('ProfileCompletion component starting...');
  const navigate = useNavigate();
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Debug logging
  console.log('ProfileCompletion rendered:', { user, authLoading, error });
  const [formData, setFormData] = useState({
    bio: '',
    interests: [],
    branch: '',
    year: '',
    campus: '',
    studentId: '',
    phoneNumber: '',
    linkedinProfile: '',
    githubProfile: ''
  });
  const [newInterest, setNewInterest] = useState('');

  const branches = [
    'Computer Science Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Chemical Engineering',
    'Civil Engineering',
    'Electronics and Instrumentation Engineering',
    'Manufacturing Engineering',
    'Pharmacy'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const campuses = ['Goa', 'Pilani', 'Hyderabad'];

  useEffect(() => {
    // Auto-detect campus from email
    if (user?.email) {
      if (user.email.includes('@goa.bits-pilani.ac.in')) {
        setFormData(prev => ({ ...prev, campus: 'Goa' }));
      } else if (user.email.includes('@pilani.bits-pilani.ac.in')) {
        setFormData(prev => ({ ...prev, campus: 'Pilani' }));
      } else if (user.email.includes('@hyderabad.bits-pilani.ac.in')) {
        setFormData(prev => ({ ...prev, campus: 'Hyderabad' }));
      }
    }
    
    // Debug: Check if user is already authenticated and has complete profile
    if (user && user.isProfileComplete) {
      console.log('User already has complete profile, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/auth/complete-profile', formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          updateUserProfile(response.data.user);
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      setError('Error completing profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full mx-auto"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg text-white font-medium"
          >
            Loading your profile...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Show error if no user (not authenticated)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-700 max-w-md w-full mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Authentication Required
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-6"
          >
            Please log in to complete your profile.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Check if user is authorized (has BITS email)
  const allowedDomains = [
    '@goa.bits-pilani.ac.in',
    '@pilani.bits-pilani.ac.in',
    '@hyderabad.bits-pilani.ac.in'
  ];
  const isAuthorized = allowedDomains.some(domain => 
    user.email.toLowerCase().endsWith(domain)
  );

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-700 max-w-md w-full mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Access Denied
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-6"
          >
            Only BITS students can access this application.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-700 max-w-md w-full mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Error
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-6"
          >
            {error}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setError(null)}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Wrap the entire component in error boundary
  try {
    return (
      <div className="min-h-screen bg-black py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <motion.div
                  className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-900 rounded-full flex items-center justify-center border-4 border-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
            <motion.h1
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Complete Your Profile
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Tell us a bit about yourself to get started with your BITS journey.
              This information will help us personalize your experience.
            </motion.p>
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-1 bg-gradient-to-r from-gray-700 to-gray-800"></div>
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information Section */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center">
                    <motion.div 
                      className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </motion.div>
                    <motion.h2
                      className="ml-3 text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Personal Information
                    </motion.h2>
                  </div>

                  {/* Bio */}
                  <motion.div
                    className="form-control"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Bio
                      <span className="text-gray-400 font-normal ml-2">Tell us about yourself</span>
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                      placeholder="Share your interests, goals, or anything you'd like others to know about you..."
                    />
                  </motion.div>
                </motion.div>

                {/* Academic Information Section */}
                <motion.div 
                  className="space-y-6 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center">
                    <motion.div 
                      className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665-2.542L12 4.5 5.175 8.038a12.083 12.083 0 01.665 2.542L12 14z"></path>
                      </svg>
                    </motion.div>
                    <motion.h2
                      className="ml-3 text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      Academic Information
                    </motion.h2>
                  </div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    {/* Campus */}
                    <div className="form-control">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Campus
                      </label>
                      <motion.select
                        name="campus"
                        value={formData.campus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="" className="bg-gray-800 text-white">Select Campus</option>
                        {campuses.map(campus => (
                          <option key={campus} value={campus} className="bg-gray-800 text-white">{campus}</option>
                        ))}
                      </motion.select>
                    </div>

                    {/* Branch */}
                    <div className="form-control">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Branch
                      </label>
                      <motion.select
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="" className="bg-gray-800 text-white">Select Branch</option>
                        {branches.map(branch => (
                          <option key={branch} value={branch} className="bg-gray-800 text-white">{branch}</option>
                        ))}
                      </motion.select>
                    </div>

                    {/* Year */}
                    <div className="form-control">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Year
                      </label>
                      <motion.select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="" className="bg-gray-800 text-white">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year} className="bg-gray-800 text-white">{year}</option>
                        ))}
                      </motion.select>
                    </div>

                    {/* Student ID */}
                    <div className="form-control">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Student ID
                      </label>
                      <motion.input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        placeholder="e.g., f20240488"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Contact Information Section */}
                <motion.div 
                  className="space-y-6 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <div className="flex items-center">
                    <motion.div 
                      className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.455a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.455 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </motion.div>
                    <motion.h2 
                      className="ml-3 text-2xl font-bold text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      Contact Information
                    </motion.h2>
                  </div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    {/* Phone Number */}
                    <div className="form-control">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Phone Number
                      </label>
                      <motion.input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        placeholder="+91 98765 43210"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>

                    {/* LinkedIn */}
                    <div className="form-control">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        LinkedIn Profile
                        <span className="text-gray-400 font-normal ml-2">Optional</span>
                      </label>
                      <motion.input
                        type="url"
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        placeholder="https://linkedin.com/in/yourprofile"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>

                    {/* GitHub */}
                    <div className="form-control">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        GitHub Profile
                        <span className="text-gray-400 font-normal ml-2">Optional</span>
                      </label>
                      <motion.input
                        type="url"
                        name="githubProfile"
                        value={formData.githubProfile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        placeholder="https://github.com/yourusername"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Interests Section */}
                <motion.div 
                  className="space-y-6 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="flex items-center">
                    <motion.div 
                      className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </motion.div>
                    <motion.h2
                      className="ml-3 text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      Interests & Skills
                    </motion.h2>
                  </div>

                  <motion.div
                    className="form-control"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Interests
                      <span className="text-gray-400 font-normal ml-2">Add your interests and skills</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <motion.input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-white transition-all"
                        placeholder="Add an interest or skill..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                        whileFocus={{ scale: 1.02 }}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={addInterest}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-600"
                      >
                        Add
                      </motion.button>
                    </div>
                    
                    {/* Interests Tags */}
                    {formData.interests.length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          <AnimatePresence>
                            {formData.interests.map((interest, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="inline-flex items-center bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm font-medium border border-gray-600"
                                whileHover={{ scale: 1.05 }}
                              >
                                {interest}
                                <motion.button
                                  type="button"
                                  onClick={() => removeInterest(interest)}
                                  className="ml-2 text-gray-400 hover:text-white focus:outline-none"
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.8 }}
                                >
                                  ×
                                </motion.button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>

                {/* Submit Section */}
                <motion.div 
                  className="pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
                    <div className="text-sm text-gray-400">
                      All fields marked with * are required
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full mr-2"
                          ></motion.div>
                          Saving...
                        </div>
                      ) : success ? (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Profile Completed!
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Complete Profile
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          >
            <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-200">Profile Completion</span>
                <span className="text-sm font-medium text-gray-400">0%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <motion.div
                  className="bg-gradient-to-r from-gray-600 to-gray-700 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "25%" }}
                  transition={{ duration: 1, delay: 2 }}
                ></motion.div>
              </div>
              <motion.p
                className="mt-3 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                Just getting started
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProfileCompletion render error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-700 max-w-md w-full mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Rendering Error
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-2"
          >
            Something went wrong while loading the profile completion page.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-400 mb-6"
          >
            {error.message}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Reload Page
          </motion.button>
        </motion.div>
      </div>
    );
  }
};

export default ProfileCompletion;

