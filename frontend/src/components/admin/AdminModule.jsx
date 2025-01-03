import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CompanyManagement from './CompanyManagement';
import CommunicationMethodManagement from './CommunicationMethodManagement';

export default function AdminModule() {
  const [activeTab, setActiveTab] = useState('companies');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        Admin Module
      </motion.h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('companies')}
            className={`${
              activeTab === 'companies'
                ? 'text-gray-900 border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-700'
            } flex-1 py-4 px-6 text-center font-medium transition-colors duration-200`}
          >
            Company Management
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`${
              activeTab === 'methods'
                ? 'text-gray-900 border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-700'
            } flex-1 py-4 px-6 text-center font-medium transition-colors duration-200`}
          >
            Communication Method Management
          </button>
        </nav>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'companies' && <CompanyManagement />}
        {activeTab === 'methods' && <CommunicationMethodManagement />}
      </motion.div>
    </motion.div>
  );
}

