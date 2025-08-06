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
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:3000';

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // You can add a function here to validate the token with the server
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = () => {
    // Redirect to Google OAuth
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    // Call logout endpoint
    axios.get('/auth/logout');
  };

  const handleAuthCallback = async (authData) => {
    try {
      const { token: newToken, user: userData } = authData;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      
      // Set axios default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      console.error('Error handling auth callback:', error);
    }
  };

  const value = {
    user,
    token,
    loading,
    loginWithGoogle,
    logout,
    handleAuthCallback,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 