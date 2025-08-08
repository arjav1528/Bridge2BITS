import React from 'react';
import { motion } from 'framer-motion';

const TabBar = ({ activeTab, setActiveTab, tabs, onClose }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            if (onClose) onClose();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-xl font-bold transition-all duration-200 rounded focus:outline-none font-pj px-4 py-2 ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-white hover:text-opacity-50'
          }`}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TabBar;