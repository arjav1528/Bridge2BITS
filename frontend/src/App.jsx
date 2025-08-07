import React, { useState } from 'react';
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext';
import DotGrid from './Additives/DotGrid/DotGrid';
import SpotlightCard from './Additives/SpotlightCard';
import { motion } from 'framer-motion';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthCallback from './components/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import ProfileCompletion from './components/ProfileCompletion';
import Community from './components/Community';
import TabBar from './components/TabBar';
import StudentCommunity from './components/StudentCommunity';
import FAQContent from './components/FAQContent';
import ResourcesContent from './components/ResourcesContent';

const LandingPage = () => {
  const { loginWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'community', label: 'Student Community' },
    { id: 'faq', label: 'FAQ' },
    { id: 'resources', label: 'Resources' }
  ];

  return (
    <motion.div
        className="min-h-screen flex flex-col overflow-x-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <header className="relative py-4 md:py-6 mx-4 md:mx-8 lg:mx-12 border-2 border-gray-200 rounded-xl mt-2">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between">
                  <div className="flex-shrink-0 flex items-center">
                      <Link to="/" className="flex items-center">
                        <motion.a
                           title=""
                           className="flex rounded outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-2 items-center"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                          <img src="/b2b.svg" alt="Bridge2BITS Logo" className="h-20 w-auto mr-3" />
                          <p className="text-3xl font-bold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2"> Bridge2BITS </p>
                        </motion.a>
                      </Link>
                  </div>

                  <div className="flex lg:hidden">
                      <motion.button
                          type="button"
                          className="text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                      >
                          <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                          </svg>
                      </motion.button>
                  </div>

                  <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
                      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
                  </div>

                  <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                      <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={loginWithGoogle}
                              className="
                                  px-6 py-3 text-lg
                                  font-semibold
                                  leading-7
                                  text-white
                                  transition-all
                                  duration-200
                                  bg-transparent
                                  border-2 border-gray-200
                                  rounded-xl
                                  font-pj
                                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100
                                  hover:bg-gray-200 hover:text-gray-900
                                  focus:bg-gray-200 focus:text-gray-900
                              "
                      >
                          Login with Google
                      </motion.button>
                  </div>
              </div>
          </div>
      </header>

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
          <div className="relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              {activeTab === 'home' ? (
                  <div className="max-w-3xl mx-auto text-center">
                      <motion.div
                          className="inline-flex px-4 py-2 mb-10 text-base font-semibold text-gray-900 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full font-pj shadow-lg"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                      >
                          Made by Developers, for Developers
                      </motion.div>
                      
                      <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                          <motion.h1
                              className="text-4xl font-bold leading-tight text-white mb-5 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj drop-shadow-xl"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                          >
                              Quality resources shared by the community
                          </motion.h1>
                      </SpotlightCard>
                          

                      <motion.p
                          className="max-w-xl mx-auto mt-6 text-lg leading-7 text-gray-200 font-inter bg-gray-800/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                      >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
                      </motion.p>
                  </div>
              ) : activeTab === 'community' ? (
                  <StudentCommunity />
              ) : activeTab === 'faq' ? (
                  <FAQContent />
              ) : activeTab === 'resources' ? (
                  <ResourcesContent />
              ) : null}
          </div>
      </motion.section>

      
    </motion.div>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/complete-profile" element={<ProfileCompletion />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <LandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
