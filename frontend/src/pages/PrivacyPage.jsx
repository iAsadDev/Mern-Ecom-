import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield, FaCookieBite } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-800 to-blue-600 py-20 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-center max-w-3xl mx-auto"
          >
            Your trust is our priority. Learn how we protect your information.
          </motion.p>
        </div>
      </motion.div>

      {/* Policy Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Introduction */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaShieldAlt className="mr-3 text-blue-600" />
            Welcome to Top Kitchen Policy
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              At TopKitchenPro, we take your privacy seriously and are committed to protecting your personal information. Our Privacy Policy outlines how we collect, use, and safeguard the data you provide when interacting with our website and services.
            </p>
            <p className="text-gray-700">
              By using topkitchenpro.com, you consent to the practices described in this policy.
            </p>
          </div>
        </motion.section>

        {/* Information Collection */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaLock className="mr-3 text-blue-600" />
            Information We Collect
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              We collect only the necessary information to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Process your orders and transactions</li>
              <li>Enhance your shopping experience</li>
              <li>Communicate about products and promotions</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This may include your name, email address, shipping address, payment information, and browsing behavior.
            </p>
          </div>
        </motion.section>

        {/* Data Usage */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaUserShield className="mr-3 text-blue-600" />
            How We Use Your Information
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              We implement advanced security measures to protect your data from unauthorized access or misuse. Your information helps us to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support</li>
              <li>Personalize your shopping experience</li>
              <li>Analyze website usage and improve our services</li>
              <li>Send relevant promotions (with your consent)</li>
            </ul>
          </div>
        </motion.section>

        {/* Cookies */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaCookieBite className="mr-3 text-blue-600" />
            Cookies & Tracking Technologies
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve site functionality</li>
              <li>Deliver targeted advertisements</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can control cookies through your browser settings. Disabling cookies may affect website functionality.
            </p>
          </div>
        </motion.section>

        {/* Third Parties */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Third-Party Services</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              We may use third-party services for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Website analytics</li>
              <li>Marketing services</li>
              <li>Customer support</li>
            </ul>
            <p className="text-gray-700 mt-4">
              These services have their own privacy policies governing data use. We carefully vet all third-party providers.
            </p>
            <p className="text-gray-700 mt-2">
              Our website may contain links to third-party sites. We are not responsible for their privacy practices.
            </p>
          </div>
        </motion.section>

        {/* Policy Updates */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Policy Updates</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date. We encourage you to review this policy regularly to stay informed about how we protect your information.
            </p>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-blue-50 p-8 rounded-lg border border-blue-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            For questions about this Privacy Policy or your personal data:
          </p>
          <p className="text-blue-600 font-medium">
            Email: privacy@topkitchenpro.com
          </p>
          <p className="text-gray-700 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;