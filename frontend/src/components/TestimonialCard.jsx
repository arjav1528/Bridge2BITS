import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      className="relative group w-96 h-56 bg-gradient-to-br from-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-600/30 shadow-2xl mx-4 flex-shrink-0 overflow-hidden"
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      {/* Quote icon */}
      <div className="absolute top-4 right-6 text-gray-600/30 text-4xl font-serif leading-none">
        "
      </div>

      {/* Stars */}
      <div className="flex items-center mb-6">
        <div className="flex text-yellow-400 drop-shadow-sm">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.svg 
              key={i} 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>
      </div>

      {/* Quote text */}
      <div className="relative mb-6 flex-grow">
        <p className="text-gray-200 text-base leading-relaxed font-medium line-clamp-4 relative z-10">
          {testimonial.content}
        </p>
      </div>

      {/* User info */}
      <div className="flex items-center pt-4 border-t border-gray-700/30">
        <motion.div 
          className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {testimonial.name.charAt(0)}
        </motion.div>
        <div className="flex-grow">
          <h4 className="text-white font-semibold text-base tracking-wide">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-sm mt-1">
            {testimonial.role}
          </p>
          <p className="text-blue-400 text-xs font-medium mt-0.5">
            {testimonial.campus}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
