import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer sections data
  const sections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", to: "/shop" },
        { name: "New Arrivals", to: "/shop/new" },
        { name: "Best Sellers", to: "/shop/bestsellers" }
      ]
    },
    {
      title: "Help",
      links: [
        { name: "Contact Us", to: "/contact" },
        { name: "FAQs", to: "/faq" },
        { name: "Shipping Info", to: "/shipping" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", to: "/about" },
        { name: "Privacy Policy", to: "/privacy" },
        { name: "Terms of Service", to: "/terms" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Kitchen Essentials</h3>
            <p className="text-sm mb-4">
              Quality kitchen tools for home chefs.
            </p>
            <div className="flex space-x-4">
              <ContactItem 
                icon={<FaMapMarkerAlt />}
                text="123 Kitchen St, Culinary City"
              />
            </div>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.to} 
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <ContactItem 
                icon={<FaPhone />}
                text="(555) 123-4567"
                link="tel:5551234567"
              />
              <ContactItem 
                icon={<FaEnvelope />}
                text="info@kitchen.com"
                link="mailto:info@kitchen.com"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          © {currentYear} Kitchen Essentials. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Reusable contact item component
const ContactItem = ({ icon, text, link }) => {
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );

  return link ? (
    <a href={link} className="hover:text-white transition-colors">
      {content}
    </a>
  ) : content;
};

export default Footer;