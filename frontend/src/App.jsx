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
import Profile from './components/Profile';
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
                        <motion.div
                           className="flex rounded outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-2 items-center"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                          <img src="/b2b.svg" alt="Bridge2BITS Logo" className="h-20 w-auto mr-3" />
                          <p className="text-3xl font-bold text-white transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2"> Bridge2BITS </p>
                        </motion.div>
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
                       
                       {/* About Us Section */}
                       <motion.section
                           className="mt-16 max-w-4xl mx-auto"
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: 0.4 }}
                       >
                           <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                               <motion.h2
                                   className="text-3xl font-bold text-white mb-6 text-center"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 0.6 }}
                               >
                                   About Us
                               </motion.h2>
                               <motion.p
                                   className="text-gray-300 text-lg leading-relaxed text-center"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 0.7 }}
                               >
                                   Bridge2BITS is a community-driven platform designed to connect BITS Pilani students across all campuses. 
                                   We provide quality resources, foster meaningful connections, and create opportunities for collaboration 
                                   and growth in the tech community.
                               </motion.p>
                           </div>
                       </motion.section>

                       {/* Courses Section */}
                       <motion.section
                           className="mt-16 max-w-6xl mx-auto"
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: 0.8 }}
                       >
                           <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                               <motion.h2
                                   className="text-3xl font-bold text-white mb-8 text-center"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 1.0 }}
                               >
                                   Featured Courses
                               </motion.h2>
                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                   {[
                                       { title: "Web Development", description: "Master HTML, CSS, JavaScript and modern frameworks", icon: "🌐" },
                                       { title: "Data Science", description: "Learn Python, ML, and data analysis techniques", icon: "📊" },
                                       { title: "Mobile Development", description: "Build iOS and Android apps with React Native", icon: "📱" },
                                       { title: "Cloud Computing", description: "AWS, Azure, and cloud infrastructure", icon: "☁️" },
                                       { title: "Cybersecurity", description: "Network security and ethical hacking", icon: "🔒" },
                                       { title: "AI & Machine Learning", description: "Deep learning and neural networks", icon: "🤖" }
                                   ].map((course, index) => (
                                       <motion.div
                                           key={index}
                                           className="bg-gray-800/50 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:scale-105"
                                           initial={{ opacity: 0, y: 20 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                           whileHover={{ scale: 1.02 }}
                                       >
                                           <div className="text-4xl mb-4">{course.icon}</div>
                                           <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                                           <p className="text-gray-300">{course.description}</p>
                                       </motion.div>
                                   ))}
                               </div>
                           </div>
                       </motion.section>

                       {/* Blog Section */}
                       <motion.section
                           className="mt-16 max-w-6xl mx-auto"
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: 1.4 }}
                       >
                           <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                               <motion.h2
                                   className="text-3xl font-bold text-white mb-8 text-center"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 1.6 }}
                               >
                                   Latest Blog Posts
                               </motion.h2>
                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                   {[
                                       { title: "Getting Started with React", author: "Tech Team", date: "Dec 15, 2024", readTime: "5 min read" },
                                       { title: "Machine Learning Basics", author: "AI Community", date: "Dec 12, 2024", readTime: "8 min read" },
                                       { title: "Web Development Trends 2024", author: "Dev Team", date: "Dec 10, 2024", readTime: "6 min read" }
                                   ].map((post, index) => (
                                       <motion.div
                                           key={index}
                                           className="bg-gray-800/50 rounded-xl p-6 border border-gray-600 hover:border-green-500 transition-all duration-300"
                                           initial={{ opacity: 0, y: 20 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                                           whileHover={{ scale: 1.02 }}
                                       >
                                           <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
                                           <div className="flex justify-between text-sm text-gray-400 mb-4">
                                               <span>{post.author}</span>
                                               <span>{post.date}</span>
                                           </div>
                                           <p className="text-gray-300 mb-4">Discover the latest insights and tutorials from our community experts.</p>
                                           <div className="flex justify-between items-center">
                                               <span className="text-blue-400 text-sm">{post.readTime}</span>
                                               <button className="text-blue-400 hover:text-blue-300 transition-colors">Read More →</button>
                                           </div>
                                       </motion.div>
                                   ))}
                               </div>
                           </div>
                       </motion.section>

                       {/* Community Section */}
                       <motion.section
                           className="mt-16 max-w-4xl mx-auto"
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: 2.0 }}
                       >
                           <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl">
                               <motion.h2
                                   className="text-3xl font-bold text-white mb-6 text-center"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 2.2 }}
                               >
                                   Join Our Community
                               </motion.h2>
                               <motion.p
                                   className="text-gray-300 text-lg leading-relaxed text-center mb-8"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 2.3 }}
                               >
                                   Connect with fellow BITS students, share knowledge, and grow together in our vibrant community.
                               </motion.p>
                               <motion.div
                                   className="text-center"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 2.4 }}
                               >
                                   <motion.button
                                       className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                                       whileHover={{ scale: 1.05 }}
                                       whileTap={{ scale: 0.95 }}
                                   >
                                       Join Free Community →
                                   </motion.button>
                               </motion.div>
                           </div>
                       </motion.section>

                       {/* Contact Us Section */}
                       <motion.section
                           className="mt-16 max-w-4xl mx-auto"
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: 2.6 }}
                       >
                           <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                               <motion.h2
                                   className="text-3xl font-bold text-white mb-8 text-center"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 2.8 }}
                               >
                                   Contact Us
                               </motion.h2>
                               <motion.p
                                   className="text-gray-300 text-lg leading-relaxed text-center mb-8"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 2.9 }}
                               >
                                   Get in touch with us and follow our social media for the latest updates and community highlights.
                               </motion.p>
                               <motion.div
                                   className="flex justify-center space-x-8"
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 3.0 }}
                               >
                                   <motion.a
                                       href="https://instagram.com/bridge2bits"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
                                       whileHover={{ scale: 1.1 }}
                                       whileTap={{ scale: 0.9 }}
                                   >
                                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                       </svg>
                                       <span className="text-lg font-semibold">Instagram</span>
                                   </motion.a>
                                   <motion.a
                                       href="https://facebook.com/bridge2bits"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                                       whileHover={{ scale: 1.1 }}
                                       whileTap={{ scale: 0.9 }}
                                   >
                                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                       </svg>
                                       <span className="text-lg font-semibold">Facebook</span>
                                   </motion.a>
                                   <motion.a
                                       href="https://linkedin.com/company/bridge2bits"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors"
                                       whileHover={{ scale: 1.1 }}
                                       whileTap={{ scale: 0.9 }}
                                   >
                                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                       </svg>
                                       <span className="text-lg font-semibold">LinkedIn</span>
                                   </motion.a>
                               </motion.div>
                           </div>
                       </motion.section>
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
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
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
