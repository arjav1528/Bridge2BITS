import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// Configure axios to send credentials
axios.defaults.withCredentials = true;

const AuthCallback = () => {
  const { handleAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Call handleAuthCallback to process the authentication
        const isAuthenticated = await handleAuthCallback();
        
        // Redirect based on authentication result
        if (isAuthenticated) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error during authentication callback:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [handleAuthCallback, navigate]);

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