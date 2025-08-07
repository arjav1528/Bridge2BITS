import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const StudentCommunity = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/auth/students');
        setStudents(response.data.students);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students list');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (students.length === 0) {
    return <p className="text-gray-400 text-center py-8">No students found.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Students List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <motion.div
            key={student.id}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              {student.profilePicture ? (
                <img
                  src={student.profilePicture}
                  alt={student.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              )}
              <div className="ml-4">
                <h3 className="text-lg font-bold text-white">{student.displayName}</h3>
                <p className="text-gray-400 text-sm">{student.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              {student.branch && (
                <p className="text-gray-300">
                  <span className="font-medium">Branch:</span> {student.branch}
                </p>
              )}
              {student.year && (
                <p className="text-gray-300">
                  <span className="font-medium">Year:</span> {student.year}
                </p>
              )}
              {student.campus && (
                <p className="text-gray-300">
                  <span className="font-medium">Campus:</span> {student.campus}
                </p>
              )}
              {student.bio && (
                <p className="text-gray-300 mt-3">
                  {student.bio.length > 100 ? `${student.bio.substring(0, 100)}...` : student.bio}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentCommunity;