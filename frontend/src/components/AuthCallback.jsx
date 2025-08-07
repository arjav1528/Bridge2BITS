import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

axios.defaults.withCredentials = true;

const AuthCallback = () => {
  const { handleAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const isAuthenticated = await handleAuthCallback();
        
        if (isAuthenticated) {
          // Check if user is authorized (has BITS email domain)
          const response = await axios.get('/auth/me');
          if (response.data.success) {
            const userEmail = response.data.user.email;
            const allowedDomains = [
              '@goa.bits-pilani.ac.in',
              '@pilani.bits-pilani.ac.in',
              '@hyderabad.bits-pilani.ac.in'
            ];
            const isAuthorized = allowedDomains.some(domain => 
              userEmail.toLowerCase().endsWith(domain)
            );
            
            if (isAuthorized) {
              // Check if profile is complete
              // For existing users without isProfileComplete field, treat as complete
              const isProfileComplete = response.data.user.isProfileComplete !== undefined 
                ? response.data.user.isProfileComplete 
                : true;
              
              if (isProfileComplete) {
                navigate('/dashboard');
              } else {
                navigate('/complete-profile');
              }
            } else {
              navigate('/unauthorized');
            }
          } else {
            navigate('/');
          }
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