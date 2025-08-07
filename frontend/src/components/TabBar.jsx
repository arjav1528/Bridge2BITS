import React from 'react';
import { motion } from 'framer-motion';

const TabBar = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
            activeTab === tab.id
              ? 'text-white border-b-2 border-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;