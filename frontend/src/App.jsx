import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext';
import DotGrid from './Additives/DotGrid/DotGrid';
import SpotlightCard from './Additives/SpotlightCard';
import { motion, useInView } from 'framer-motion';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthCallback from './components/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import ProfileCompletion from './components/ProfileCompletion';
import Profile from './components/Profile';
import TabBar from './components/TabBar';
import StudentCommunity from './components/StudentCommunity';
import FAQContent from './components/FAQContent';
import ResourcesContent from './components/ResourcesContent';
import { MarqueeSection } from './components/Marquee';

const LandingPage = () => {
  const { loginWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const tabs = [
    { id: 'community', label: 'Student Community' },
    { id: 'faq', label: 'FAQ' },
    { id: 'resources', label: 'Resources' }
  ];

 



  return (
    <motion.div
        className="min-h-screen flex flex-col overflow-x-hidden bg-black relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      {/* Fluid Glass Effect - Cursor Following - Temporarily Disabled */}
      {/* <div className="fixed inset-0 z-50 pointer-events-none">
        <FluidGlass
          mode="lens"
          lensProps={{
            ior: 1.15,
            thickness: 5,
            anisotropy: 0.01,
            chromaticAberration: 0.1,
            scale: 0.15
          }}
        />
      </div> */}
             <header className="relative py-4 md:py-6 mx-4 md:mx-8 lg:mx-12 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-2xl border-2 border-yellow-400/20 rounded-3xl mt-6 shadow-2xl">
           <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
               <div className="relative flex items-center justify-between">
                   <div className="flex items-center space-x-8">
                     <div className="flex-shrink-0 flex items-center">
                       <motion.button
                         onClick={() => setActiveTab('home')}
                         whileHover={{ scale: 1.03 }}
                         whileTap={{ scale: 0.97 }}
                         className="flex items-center bg-transparent border-none cursor-pointer group focus-ring"
                       >
                         <motion.div
                            className="flex rounded-2xl outline-none items-center p-3 group-hover:bg-white/10 transition-all duration-300 border border-transparent group-hover:border-white/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                         >
                           <motion.img 
                             src="/b2b.svg" 
                             alt="Bridge2BITS Logo" 
                             className="h-14 w-auto mr-3 drop-shadow-lg"
                           />
                           <p className="text-2xl font-bold text-white transition-all duration-300 rounded font-pj group-hover:text-yellow-300 drop-shadow-lg"> Bridge2BITS </p>
                         </motion.div>
                       </motion.button>
                     </div>
                    <div className="hidden lg:flex lg:items-center">
                      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
                    </div>
                  </div>

                  <div className="flex lg:hidden">
                      <motion.button
                          type="button"
                          className="text-white p-2 rounded-xl hover:bg-white/10 transition-all duration-200 focus-ring"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      >
                          <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                          </svg>
                      </motion.button>
                  </div>
                  
                  {/* Mobile menu */}
                  {isMobileMenuOpen && (
                      <motion.div 
                          className="lg:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-2 border-yellow-400/20 rounded-2xl py-6 mt-4 shadow-2xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                      >
                          <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-8">
                              <TabBar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} onClose={() => setIsMobileMenuOpen(false)} />
                          </div>
                      </motion.div>
                  )}

                                     <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                       <motion.button
                           whileHover={{ scale: 1.03, y: -1 }}
                           whileTap={{ scale: 0.97 }}
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.3 }}
                           onClick={loginWithGoogle}
                           className="
                               px-8 py-4 text-lg
                               font-semibold
                               leading-7
                               text-black
                               transition-all
                               duration-300
                               bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
                               border-0
                               rounded-2xl
                               font-pj
                               shadow-lg hover:shadow-2xl
                               focus-ring focus:ring-yellow-500/50
                               hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-700
                               hover:shadow-yellow-500/25
                               relative overflow-hidden group
                           "
                       >
                           <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                           <span className="relative flex items-center">
                               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                   <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                   <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                   <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                   <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                               </svg>
                               Login with Google
                           </span>
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
                   <div className="max-w-6xl mx-auto text-center">
                                             <motion.div
                           className="inline-flex px-6 py-3 mb-12 text-base font-semibold text-gray-900 bg-gradient-to-r from-white/95 to-gray-100/95 backdrop-blur-xl border-2 border-yellow-400/20 rounded-full font-pj shadow-2xl relative overflow-hidden"
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5 }}
                           whileHover={{ scale: 1.05, y: -2 }}
                       >
                           <motion.span 
                               className="mr-2 relative z-10"
                               animate={{ 
                                   y: [0, -3, 0],
                               }}
                               transition={{ 
                                   duration: 2, 
                                   repeat: Infinity, 
                                   ease: "easeInOut" 
                               }}
                           >
                               🚀
                           </motion.span>
                           
                           <span className="relative z-10">
                               Made by Developers, for Developers
                           </span>
                           
                           <motion.span 
                               className="ml-2 relative z-10"
                               animate={{ 
                                   y: [0, 3, 0],
                               }}
                               transition={{ 
                                   duration: 2, 
                                   repeat: Infinity, 
                                   ease: "easeInOut",
                                   delay: 1
                               }}
                           >
                               💻
                           </motion.span>
                       </motion.div>
                      
                       <SpotlightCard className="custom-spotlight-card border-2 border-yellow-400/20" spotlightColor="rgba(255, 255, 255, 0.2)">
                             <motion.h1
                                 className="text-5xl font-bold leading-tight text-white mb-8 sm:text-6xl sm:leading-tight lg:text-7xl lg:leading-tight font-pj drop-shadow-2xl"
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.5, delay: 0.3 }}
                                 whileHover={{ 
                                     scale: 1.02,
                                 }}
                             >
                                 <motion.span
                                      className="bg-gradient-to-r from-white via-yellow-200 to-yellow-300 bg-clip-text text-transparent"
                                 >
                                     Quality resources shared by the community
                                 </motion.span>
                             </motion.h1>
                         </SpotlightCard>
                          
                      <motion.p
                          className="max-w-3xl mx-auto mt-8 text-xl leading-8 text-gray-300 font-inter bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl px-8 py-6 rounded-2xl shadow-2xl border-2 border-yellow-400/20"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                      >
                          Discover cutting-edge resources, connect with fellow developers, and accelerate your tech journey with our vibrant BITS community.
                      </motion.p>

                      {/* Marquee Section */}
                       <MarqueeSection />

                       {/* About Us Section */}
                       <motion.section
                           className="mt-20 max-w-6xl mx-auto"
                           initial={{ opacity: 0, x: -50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.8, ease: "easeOut" }}
                           viewport={{ once: true, amount: 0.3 }}
                       >
                           <SpotlightCard className="custom-spotlight-card border-2 border-yellow-400/20" spotlightColor="rgba(255, 255, 255, 0.1)">
                               <motion.h2
                                   className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.2 }}
                               >
                                   About Us
                               </motion.h2>
                               <motion.p
                                   className="text-gray-300 text-xl leading-relaxed text-center max-w-4xl mx-auto"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.4 }}
                               >
                                   Bridge2BITS is a community-driven platform designed to connect BITS Pilani students across all campuses. 
                                   We provide quality resources, foster meaningful connections, and create opportunities for collaboration 
                                   and growth in the tech community.
                               </motion.p>
                           </SpotlightCard>
                       </motion.section>

                                               {/* Courses Section */}
                                                 <motion.section
                             className="mt-20 max-w-6xl mx-auto"
                             initial={{ opacity: 0, x: 50 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             transition={{ duration: 0.8, ease: "easeOut" }}
                             viewport={{ once: true, amount: 0.3 }}
                         >
                             <SpotlightCard className="custom-spotlight-card border-2 border-yellow-400/20" spotlightColor="rgba(255, 255, 255, 0.1)">
                                 <motion.h2
                                     className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
                                     initial={{ opacity: 0, y: 20 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ duration: 0.6, delay: 0.2 }}
                                 >
                                     Featured Features
                                 </motion.h2>
                                 <motion.p
                                     className="text-gray-300 text-lg text-center mb-12 max-w-3xl mx-auto"
                                     initial={{ opacity: 0, y: 20 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ duration: 0.6, delay: 0.3 }}
                                 >
                                     Explore our curated collection of courses designed to accelerate your learning journey
                                 </motion.p>
                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                   {[
                                       { title: "Web Development", description: "Master HTML, CSS, JavaScript and modern frameworks", icon: "🌐", color: "from-blue-500 to-cyan-500" },
                                       { title: "Data Science", description: "Learn Python, ML, and data analysis techniques", icon: "📊", color: "from-green-500 to-emerald-500" },
                                       { title: "Mobile Development", description: "Build iOS and Android apps with React Native", icon: "📱", color: "from-purple-500 to-pink-500" },
                                       { title: "Cloud Computing", description: "AWS, Azure, and cloud infrastructure", icon: "☁️", color: "from-yellow-500 to-orange-500" },
                                       { title: "Cybersecurity", description: "Network security and ethical hacking", icon: "🔒", color: "from-red-500 to-rose-500" },
                                       { title: "AI & Machine Learning", description: "Deep learning and neural networks", icon: "🤖", color: "from-indigo-500 to-purple-500" }
                                   ].map((course, index) => (
                                       <motion.div
                                           key={index}
                                           className="relative group bg-gray-800/50 rounded-2xl p-8 border-2 border-yellow-400/20 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 overflow-hidden"
                                           initial={{ opacity: 0, y: 20 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                           whileHover={{ scale: 1.03, y: -5 }}
                                       >
                                           {/* Gradient background overlay */}
                                           <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                                           
                                           <div className="relative z-10">
                                               <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{course.icon}</div>
                                               <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{course.title}</h3>
                                               <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{course.description}</p>
                                           </div>
                                       </motion.div>
                                   ))}
                                                                  </div>
                             </SpotlightCard>
                       </motion.section>


                       {/* Testimonials Section with Infinite Marquee */}
                       <motion.section
                           className="mt-20 w-full overflow-hidden"
                           initial={{ opacity: 0, x: -50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.8, ease: "easeOut" }}
                           viewport={{ once: true, amount: 0.3 }}
                       >
                           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-2 border-yellow-400/20 rounded-2xl p-8 bg-gray-900/50 backdrop-blur-sm">
                               <motion.h2
                                   className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.2 }}
                               >
                                   What Our Community Says
                               </motion.h2>
                                
                               <motion.p
                                   className="text-gray-300 text-xl text-center max-w-4xl mx-auto leading-relaxed"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.4 }}
                               >
                                   Hear from our amazing community of BITS students who are building their future together through collaboration, learning, and innovation.
                               </motion.p>
                           </div>
                       </motion.section>

                       {/* Marquee Section - Moved outside constrained container */}
                       <MarqueeSection />

                       {/* Community Section */}
                       <motion.section
                           className="mt-16 max-w-6xl mx-auto"
                           initial={{ opacity: 0, x: 50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.8, ease: "easeOut" }}
                           viewport={{ once: true, amount: 0.3 }}
                       >
                           <SpotlightCard className="custom-spotlight-card border-2 border-yellow-400/20" spotlightColor="rgba(255, 255, 255, 0.1)">
                               <motion.h2
                                   className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.2 }}
                               >
                                   Join Our Community
                               </motion.h2>
                               <motion.p
                                   className="text-gray-300 text-xl leading-relaxed mb-10 max-w-3xl mx-auto"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.4 }}
                               >
                                   Connect with fellow BITS students, share knowledge, and grow together in our vibrant community of innovators and learners.
                               </motion.p>
                               <motion.div
                                   className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.6 }}
                               >
                                   <motion.button
                                       className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                                       whileHover={{ scale: 1.05, y: -2 }}
                                       whileTap={{ scale: 0.95 }}
                                   >
                                       Join Free Community →
                                   </motion.button>
                                   <div className="flex items-center space-x-4 text-gray-400">
                                       <div className="flex -space-x-2">
                                           {[1, 2, 3, 4].map(i => (
                                               <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-gray-800"></div>
                                           ))}
                                       </div>
                                       <span className="text-sm">Join 500+ students</span>
                                   </div>
                               </motion.div>
                             </SpotlightCard>
                       </motion.section>

                                                                                                                                                                                                                                                                                                                                                                                               {/* Contact Us Section */}
                                                       <motion.section
                                className="mt-16 max-w-6xl mx-auto"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                              <SpotlightCard className="custom-spotlight-card border-2 border-yellow-400/20" spotlightColor="rgba(255, 255, 255, 0.1)">
                                                                   <motion.h2
                                       className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
                                       initial={{ opacity: 0, y: 20 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ duration: 0.6, delay: 0.2 }}
                                   >
                                      Contact Us
                                  </motion.h2>
                                                                  <motion.p
                                      className="text-gray-300 text-lg leading-relaxed text-center mb-8"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.6, delay: 0.4 }}
                                  >
                                     Get in touch with us and follow our social media for the latest updates and community highlights.
                                 </motion.p>
                                                                  <motion.div
                                      className="flex justify-center space-x-8"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.6, delay: 0.6 }}
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
                            </SpotlightCard>
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

      <motion.footer
        className="py-6 text-center text-gray-400 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Made with ❤️ by{' '}
        <motion.a
          href="https://github.com/arjav1528"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          arjav1528
        </motion.a>
        {' '}and{' '}
        <motion.a
          href="https://github.com/Utkarsharma7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Utkarsharma7
        </motion.a>
      </motion.footer>
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
 