import React from 'react';
import { motion } from 'framer-motion';

const ResourcesContent = () => {
  // Sample resources data
  const resources = [
    {
      title: "Study Materials",
      description: "Comprehensive study materials for all major subjects",
      link: "#"
    },
    {
      title: "Previous Year Papers",
      description: "Access to previous year question papers and solutions",
      link: "#"
    },
    {
      title: "Video Lectures",
      description: "Recorded lectures from top professors",
      link: "#"
    },
    {
      title: "Campus Resources",
      description: "Campus-specific resources and information",
      link: "#"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Helpful Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-colors"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-3">{resource.title}</h3>
            <p className="text-gray-300 mb-4">{resource.description}</p>
            <a 
              href={resource.link} 
              className="inline-block px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Access Resource
            </a>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 text-center py-8 bg-gray-800/50 rounded-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-2">Want to contribute?</h3>
        <p className="text-gray-300 mb-4">
          Share your own resources with the community
        </p>
        <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Submit Resource
        </button>
      </div>
    </motion.div>
  );
};

export default ResourcesContent;