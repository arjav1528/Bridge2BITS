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

  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;

  const checkAuthStatus = async () => {
    try {
      console.log('Checking auth status...');
      const response = await axios.get('/auth/me');
      console.log('Auth response:', response.data);
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

  const updateUserProfile = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const logout = async () => {
    try {
      setUser(null);
      await axios.get('/auth/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      window.location.href = '/';
    }
  };

  const handleAuthCallback = async () => {
    try {
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

  const isAuthorizedEmail = (email) => {
    if (!email) return false;
    const allowedDomains = [
      '@goa.bits-pilani.ac.in',
      '@pilani.bits-pilani.ac.in',
      '@hyderabad.bits-pilani.ac.in'
    ];
    return allowedDomains.some(domain => email.toLowerCase().endsWith(domain));
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
    handleAuthCallback,
    updateUserProfile,
    isAuthenticated: !!user,
    isAuthorized: user ? isAuthorizedEmail(user.email) : false,
    isProfileComplete: user ? user.isProfileComplete : false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};