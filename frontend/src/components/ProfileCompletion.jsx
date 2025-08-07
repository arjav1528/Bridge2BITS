import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProfileCompletion = () => {
  console.log('ProfileCompletion component starting...');
  const navigate = useNavigate();
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      const response = await axios.post('/auth/complete-profile', formData);
      if (response.data.success) {
        updateUserProfile(response.data.user);
        navigate('/dashboard');
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Show error if no user (not authenticated)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p>Please log in to complete your profile.</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p>Only BITS students can access this application.</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

    // Wrap the entire component in error boundary
  try {
    return (
      <div className="min-h-screen ">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="avatar placeholder mb-4">
                <div className="bg-neutral text-neutral-content rounded-full w-24">
                  <span className="text-3xl">👤</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-base-content mb-4">
                Complete Your Profile
              </h1>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Tell us a bit about yourself to get started with your BITS journey. 
                This information will help us personalize your experience.
              </p>
            </motion.div>

            {/* Main Form Card */}
            <motion.div
              className="card bg-base-100 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card-body p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Personal Information Section */}
                  <div className="divider">
                    <h2 className="text-xl font-semibold text-base-content">Personal Information</h2>
                  </div>

                  {/* Bio */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content font-medium">Bio</span>
                      <span className="label-text-alt text-base-content/60">Tell us about yourself</span>
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="textarea textarea-bordered w-full focus:textarea-primary"
                      placeholder="Share your interests, goals, or anything you'd like others to know about you..."
                    />
                  </div>

                  {/* Academic Information Section */}
                  <div className="divider">
                    <h2 className="text-xl font-semibold text-base-content">Academic Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campus */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content font-medium">Campus</span>
                      </label>
                      <select
                        name="campus"
                        value={formData.campus}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:select-primary"
                      >
                        <option value="">Select Campus</option>
                        {campuses.map(campus => (
                          <option key={campus} value={campus}>{campus}</option>
                        ))}
                      </select>
                    </div>

                    {/* Branch */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content font-medium">Branch</span>
                      </label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:select-primary"
                      >
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content font-medium">Year</span>
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:select-primary"
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    {/* Student ID */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content font-medium">Student ID</span>
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="e.g., f20240488"
                      />
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="divider">
                    <h2 className="text-xl font-semibold text-base-content">Contact Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content font-medium">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* LinkedIn */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content font-medium">LinkedIn Profile</span>
                        <span className="label-text-alt text-base-content/60">Optional</span>
                      </label>
                      <input
                        type="url"
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleInputChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    {/* GitHub */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content font-medium">GitHub Profile</span>
                        <span className="label-text-alt text-base-content/60">Optional</span>
                      </label>
                      <input
                        type="url"
                        name="githubProfile"
                        value={formData.githubProfile}
                        onChange={handleInputChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>

                  {/* Interests Section */}
                  <div className="divider">
                    <h2 className="text-xl font-semibold text-base-content">Interests & Skills</h2>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content font-medium">Interests</span>
                      <span className="label-text-alt text-base-content/60">Add your interests and skills</span>
                    </label>
                    <div className="join w-full">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="input input-bordered join-item flex-1 focus:input-primary"
                        placeholder="Add an interest or skill..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                      />
                      <button
                        type="button"
                        onClick={addInterest}
                        className="btn btn-primary join-item"
                      >
                        Add
                      </button>
                    </div>
                    
                    {/* Interests Tags */}
                    {formData.interests.length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {formData.interests.map((interest, index) => (
                            <div key={index} className="badge badge-primary badge-lg gap-2">
                              {interest}
                              <button
                                type="button"
                                onClick={() => removeInterest(interest)}
                                className="btn btn-ghost btn-xs btn-circle"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Section */}
                  <div className="divider"></div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
                    <div className="text-sm text-base-content/60">
                      All fields marked with * are required
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-lg"
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Complete Profile
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Profile Completion</div>
                  <div className="stat-value text-primary">0%</div>
                  <div className="stat-desc">Just getting started</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
   } catch (error) {
     console.error('ProfileCompletion render error:', error);
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-900">
         <div className="text-white text-center">
           <h2 className="text-2xl font-bold mb-4">Rendering Error</h2>
           <p>Something went wrong while loading the profile completion page.</p>
           <p className="text-sm text-gray-400 mt-2">{error.message}</p>
           <button 
             onClick={() => window.location.reload()} 
             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
           >
             Reload Page
           </button>
         </div>
       </div>
     );
   }
 };

export default ProfileCompletion;
