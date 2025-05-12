import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaAward, FaHeart, FaUsers, FaUtensils } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-teal-700 to-emerald-900 py-24 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 font-serif"
          >
            Our Journey
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            Elevating culinary experiences through innovation since 2010
          </motion.p>
        </div>
      </motion.div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">About CulinaryCraft</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            CulinaryCraft is a premium kitchenware brand dedicated to transforming ordinary cooking into extraordinary culinary experiences. Our thoughtfully designed products combine aesthetic elegance with practical functionality, helping both professional chefs and home cooks achieve exceptional results.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-2 rounded-2xl shadow-xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="CulinaryCraft Team" 
              className="w-full h-auto rounded-lg transform hover:scale-105 transition duration-500"
            />
          </motion.div>

          <div>
            <motion.h3 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 mb-6 font-serif"
            >
              Our Philosophy
            </motion.h3>
            <motion.p 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              We believe that exceptional cookware should be accessible to everyone. Each product undergoes rigorous testing to ensure it meets our standards for performance, durability, and design excellence.
            </motion.p>
            <motion.p 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 leading-relaxed"
            >
              Our team of culinary experts and designers work together to create tools that inspire creativity in the kitchen while making cooking more enjoyable and efficient.
            </motion.p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {[
            {
              icon: <FaLeaf className="text-4xl text-emerald-500 mb-4" />,
              title: "Sustainable Materials",
              desc: "Eco-friendly production with responsibly sourced materials"
            },
            {
              icon: <FaAward className="text-4xl text-amber-500 mb-4" />,
              title: "Award-Winning",
              desc: "Recognized for design innovation and quality"
            },
            {
              icon: <FaHeart className="text-4xl text-rose-500 mb-4" />,
              title: "Customer First",
              desc: "Your satisfaction guides everything we do"
            },
            {
              icon: <FaUtensils className="text-4xl text-teal-500 mb-4" />,
              title: "Chef-Approved",
              desc: "Developed with professional culinary experts"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Commitment Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-2xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 font-serif relative"
          >
            Our Promise
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl max-w-4xl mx-auto relative leading-relaxed"
          >
            We stand behind every product with a lifetime warranty and exceptional customer service. Our team is dedicated to helping you create memorable meals and lasting kitchen memories.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;