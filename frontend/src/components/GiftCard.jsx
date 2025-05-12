import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GiftCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[400px] w-full bg-gray-100 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Gift Cards
        </motion.h1>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-1 bg-red-500 mx-auto mb-8"
        />
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8"
        >
          With Top Kitchen Gadget Store's customer-focused service, you can expect fast delivery and reliable support.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition shadow-md"
            >
              Buy a Gift Card
            </motion.button>
          </Link>
          
        </motion.div>
        
      
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 -bottom-20 w-80 h-80 opacity-10 text-red-400"
      >
        🎁
      </motion.div>
    </motion.div>
  );
};

export default GiftCard;