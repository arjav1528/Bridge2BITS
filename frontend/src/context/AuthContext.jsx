import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;

  // Check if user is authenticated by calling the backend
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const loginWithGoogle = () => {
    // Redirect to Google OAuth
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const logout = async () => {
    try {
      setUser(null);
      // Call logout endpoint
      await axios.get('/auth/logout');
      // Refresh the page to ensure clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Still redirect to home page even if logout API fails
      window.location.href = '/';
    }
  };

  const handleAuthCallback = async () => {
    try {
      // Fetch user info from backend
      const response = await axios.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      }
      return response.data.success;
    } catch (error) {
      console.error('Error handling auth callback:', error);
      setUser(null);
      return false;
    }
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
    handleAuthCallback,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};