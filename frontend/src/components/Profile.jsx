import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DotGrid from '../Additives/DotGrid/DotGrid';

const Profile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    bio: '',
    interests: [],
    branch: '',
    year: '',
    campus: 'Goa',
    city: '',
    university: '',
    studentId: '',
    phoneNumber: '',
    linkedinProfile: '',
    githubProfile: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || '',
        interests: user.interests || [],
        branch: user.branch || '',
        year: user.year || '',
        campus: user.campus || 'Goa',
        city: user.city || '',
        university: user.university || '',
        studentId: user.studentId || '',
        phoneNumber: user.phoneNumber || '',
        linkedinProfile: user.linkedinProfile || '',
        githubProfile: user.githubProfile || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(interest => interest.trim()).filter(interest => interest);
    setFormData(prev => ({
      ...prev,
      interests
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        // Update the user context with new data
        updateUserProfile(data.user);
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage('');
    // Reset form data to original user data
    if (user) {
      setFormData({
        bio: user.bio || '',
        interests: user.interests || [],
        branch: user.branch || '',
        year: user.year || '',
        campus: user.campus || 'Goa',
        city: user.city || '',
        university: user.university || '',
        studentId: user.studentId || '',
        phoneNumber: user.phoneNumber || '',
        linkedinProfile: user.linkedinProfile || '',
        githubProfile: user.githubProfile || ''
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col overflow-x-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="relative py-4 md:py-6 mx-4 md:mx-8 lg:mx-12 rounded-xl mt-2">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <motion.div
                  className="flex rounded outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-2 items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src="/b2b.svg" alt="Bridge2BITS Logo" className="h-20 w-auto mr-3" />
                  <p className="text-3xl font-bold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2 hover:border-none">
                    Bridge2BITS
                  </p>
                </motion.div>
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.span
                  className="text-lg font-semibold text-white"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {user?.displayName}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="text-lg font-semibold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  Logout
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <motion.section
        className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DotGrid
            dotSize={2}
            gap={15}
            proximity={0}
            shockRadius={250}
            shockStrength={5}
            returnDuration={0.5}
            baseColor="#FFFFFF"
            activeColor="#FFFF00"
          />
        </motion.div>

        <div className="relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Profile Header */}
            <div className="flex items-center space-x-6 mb-8">
              {user?.profilePicture && (
                <motion.img
                  src={user.profilePicture}
                  alt={user.displayName}
                  className="w-24 h-24 rounded-full border-4 border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
              )}
              <div>
                <motion.h1
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {user?.displayName}
                </motion.h1>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {user?.email}
                </motion.p>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <motion.div
                className={`mb-6 p-4 rounded-lg ${
                  message.includes('successfully') 
                    ? 'bg-green-600/20 border border-green-500 text-green-300' 
                    : 'bg-red-600/20 border border-red-500 text-red-300'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.div>
            )}

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    rows="3"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Interests (comma-separated)</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests.join(', ')}
                    onChange={handleInterestsChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="e.g., Programming, AI, Web Development"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Your city"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Academic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Campus</label>
                  <select
                    name="campus"
                    value={formData.campus}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="Goa">Goa</option>
                    <option value="Pilani">Pilani</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Your student ID"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Profile</label>
                  <input
                    type="url"
                    name="githubProfile"
                    value={formData.githubProfile}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>

                         {/* Action Buttons */}
             <div className="flex justify-between items-center mt-8">
               <motion.button
                 onClick={() => window.location.href = '/dashboard'}
                 className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 ← Back to Dashboard
               </motion.button>
               
               <div className="flex space-x-4">
                 {!isEditing ? (
                   <motion.button
                     onClick={() => setIsEditing(true)}
                     className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Edit Profile
                   </motion.button>
                 ) : (
                   <>
                     <motion.button
                       onClick={handleCancel}
                       className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       disabled={isLoading}
                     >
                       Cancel
                     </motion.button>
                     <motion.button
                       onClick={handleSave}
                       className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       disabled={isLoading}
                     >
                       {isLoading ? 'Saving...' : 'Save Changes'}
                     </motion.button>
                   </>
                 )}
               </div>
             </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Profile;
