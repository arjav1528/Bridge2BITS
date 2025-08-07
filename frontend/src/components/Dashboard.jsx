import React from 'react';
import { useAuth } from '../context/AuthContext';
import DotGrid from '../Additives/DotGrid/DotGrid';
import SpotlightCard from '../Additives/SpotlightCard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <motion.div
        className="min-h-screen flex flex-col overflow-x-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <header className="relative py-4 md:py-6 mx-4 md:mx-8 lg:mx-12 rounded-xl mt-2">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between">
                  <div className="flex-shrink-0">
                      <motion.a
                         href="#"
                         title=""
                         className="flex rounded outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-2"
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                      >
                       <p className="text-4xl font-bold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2 hover:border-none"> Brigde2BITS </p>
                      </motion.a>
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
                      <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                      >
                          <motion.a
                              href="#"
                              title=""
                              className="text-2xl font-semibold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          > Experts </motion.a>
                      </motion.div>

                      <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                      >
                          <motion.a
                              href="#"
                              title=""
                              className="text-2xl font-semibold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          > Community Groups </motion.a>
                      </motion.div>

                      <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                      >
                          <motion.a
                              href="#"
                              title=""
                              className="text-2xl font-semibold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          > Support </motion.a>
                      </motion.div>
                  </div>

                  <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                      <motion.div
                          className="flex items-center space-x-4"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {user?.profilePicture && (
                          <motion.img
                            src={user.profilePicture}
                            alt={user.displayName}
                            className="w-8 h-8 rounded-full"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          />
                        )}
                        <motion.span
                          className="text-lg font-semibold text-white"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >{user?.displayName}</motion.span>
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
              <div className="max-w-3xl mx-auto text-center">
                  <motion.div
                      className="inline-flex px-4 py-2 mb-10 text-base font-semibold text-gray-900 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full font-pj shadow-lg"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                  >
                      Welcome back, {user?.displayName || 'User'}!
                  </motion.div>
                  
                  <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <motion.h1
                          className="text-4xl font-bold leading-tight text-white mb-5 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj drop-shadow-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                      >
                          Your Dashboard
                      </motion.h1>
                  </SpotlightCard>
                      

                  <motion.p
                      className="max-w-xl mx-auto mt-6 text-lg leading-7 text-gray-200 font-inter bg-gray-800/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                  >
                      This is your personalized dashboard. Explore your resources and community connections.
                  </motion.p>

              </div>
          </div>
      </motion.section>

      
    </motion.div>
  );
};

export default Dashboard;