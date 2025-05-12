import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const KitchenGadgetStore = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full bg-white text-center px-4 py-10 flex flex-col items-center justify-center overflow-hidden border-b border-gray-100"
    >
      {/* Minimal decorative elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -right-10 -top-10 w-40 h-40 opacity-5 text-navy-600"
      >
        🍴
      </motion.div>
      
      <div className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Premium Kitchen Tools
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-sm sm:text-base text-gray-600 mb-6 max-w-lg mx-auto"
        >
          Essential gadgets for modern cooking
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/shop" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-navy-800 text-black font-medium py-2 px-6 rounded-md text-sm shadow-sm hover:bg-navy-700 border-black transition-colors"
            >
              Shop Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KitchenGadgetStore;