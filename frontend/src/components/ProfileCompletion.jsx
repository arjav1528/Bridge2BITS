import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileCompletion = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    interests: user?.interests || [],
    githubProfile: user?.githubProfile || '',
    linkedinProfile: user?.linkedinProfile || '',
    portfolioUrl: user?.portfolioUrl || ''
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const interests = [
    'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
    'Artificial Intelligence', 'Cybersecurity', 'DevOps', 'Cloud Computing',
    'Blockchain', 'Game Development', 'UI/UX Design', 'Product Management'
  ];

  useEffect(() => {
    if (user?.profileCompleted) {
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

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await updateUser({
        ...formData,
        profileCompleted: true
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="theme-section min-h-screen flex items-center justify-center">
        <div className="theme-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="theme-text-primary">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="theme-section min-h-screen flex items-center justify-center">
        <div className="theme-card p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="theme-section-title mb-4">Something went wrong</h2>
          <p className="theme-text-secondary mb-6">{error}</p>
          <button
            onClick={() => setError('')}
            className="theme-button-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-section min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="theme-section-title mb-4">
            Complete Your Profile
          </h1>
          <p className="theme-section-subtitle">
            Let's get to know you better and personalize your experience
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="theme-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="theme-text-primary font-medium">Step {step} of {totalSteps}</span>
            <span className="theme-text-secondary">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="theme-card p-8"
        >
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="theme-section-title text-2xl mb-6">Basic Information</h2>
              
              <div>
                <label className="theme-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="theme-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="theme-label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="theme-input min-h-[100px]"
                  placeholder="Tell us about yourself..."
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="theme-section-title text-2xl mb-6">What interests you?</h2>
              <p className="theme-text-secondary mb-6">
                Select the areas that interest you most. This helps us personalize your experience.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`theme-button-secondary ${
                      formData.interests.includes(interest)
                        ? 'bg-green-600 border-green-500 text-white'
                        : ''
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Social Links */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="theme-section-title text-2xl mb-6">Connect Your Profiles</h2>
              <p className="theme-text-secondary mb-6">
                Add your professional profiles to connect with the community.
              </p>
              
              <div>
                <label className="theme-label">GitHub Profile</label>
                <input
                  type="url"
                  name="githubProfile"
                  value={formData.githubProfile}
                  onChange={handleInputChange}
                  className="theme-input"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="theme-label">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleInputChange}
                  className="theme-input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="theme-label">Portfolio Website</label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  className="theme-input"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="theme-button-secondary"
              >
                Previous
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="theme-button-primary ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="theme-button-primary ml-auto"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Complete Profile'}
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ProfileCompletion;

