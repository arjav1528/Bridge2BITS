import React from 'react';
import { motion } from 'framer-motion';

const FAQContent = () => {
  // Sample FAQ data
  const faqs = [
    {
      question: "How do I join the community?",
      answer: "Simply sign up with your Google account and complete your profile to get started."
    },
    {
      question: "What resources are available?",
      answer: "We provide study materials, previous year papers, and community-shared resources for various courses."
    },
    {
      question: "How can I connect with other students?",
      answer: "Visit the Student Community tab to browse and connect with fellow students from your campus."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, we only have a web-based platform, but we're working on mobile apps for iOS and Android."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
            <p className="text-gray-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQContent;