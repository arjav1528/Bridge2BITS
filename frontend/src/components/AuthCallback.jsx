import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback; 