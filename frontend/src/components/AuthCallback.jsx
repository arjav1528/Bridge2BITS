import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const AuthCallback = () => {
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the response from the server
        const response = await axios.get('/auth/google/callback', {
          withCredentials: true
        });

        if (response.data.success) {
          // Handle successful authentication
          handleAuthCallback(response.data);
          
          // Redirect to home page
          window.location.href = '/';
        } else {
          console.error('Authentication failed');
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error during authentication callback:', error);
        window.location.href = '/';
      }
    };

    handleCallback();
  }, [handleAuthCallback]);

  return (
    <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
    >
      <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <motion.div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.p
            className="mt-4 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >Completing authentication...</motion.p>
      </motion.div>
    </motion.div>
  );
};

export default AuthCallback; 