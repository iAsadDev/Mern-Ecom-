import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaSearch, FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/cartContext';

const Kitchen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useContext(CartContext);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      const now = new Date();
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));

      const kitchenProducts = res.data
        .filter(product => product.category.toLowerCase() === 'kitchen')
        .map(p => ({
          ...p,
          isNew: new Date(p.createdAt) > oneWeekAgo,
        }))
        .sort((a, b) => {
          if (a.isNew === b.isNew) return new Date(b.createdAt) - new Date(a.createdAt);
          return a.isNew ? -1 : 1;
        });

      setProducts(kitchenProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const showToastPopup = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  const handleAdd = useCallback((item) => {
    addToCart(item);
    showToastPopup("✅ Item added to cart!");
  }, [addToCart, showToastPopup]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayCount = 6; // Show only 6 products initially

  return (
    <div className="bg-gray-50 min-h-screen">
      {showToast && (
        <div className="fixed top-5 right-5 flex items-center gap-3 bg-white text-green-700 border border-green-300 shadow-lg px-5 py-3 rounded-2xl z-50 animate-fade-in-out">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="bg-gradient-to-r from-teal-700 to-emerald-900 py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kitchen Essentials
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Premium quality kitchen tools and accessories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search kitchen products..."
              className="w-full pl-10 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 text-gray-400 animate-bounce">
              <FaBoxOpen className="text-6xl" />
            </div>
            <h3 className="text-2xl font-medium text-gray-600 mb-2">
              No Kitchen Products Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm ? 
                "No products match your search. Try different keywords." :
                "We're currently updating our kitchen collection. Please check back soon!"
              }
            </p>
            <Link 
              to="/shop" 
              className="mt-6 inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.slice(0, displayCount).map((product) => (
                <div 
                  key={product._id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 relative group border ${
                    product.isNew ? 'border-purple-200' : 'border-gray-100'
                  }`}
                >
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    {product.isNew && (
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        NEW
                      </span>
                    )}
                    {product.salePrice < product.oldPrice && (
                      <span className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        {Math.round((1 - product.salePrice/product.oldPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="h-52 sm:h-60 overflow-hidden relative bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5 space-y-3 border-t border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.oldPrice && product.salePrice < product.oldPrice ? (
                          <>
                            <span className="text-gray-400 line-through text-sm">
                              ${product.oldPrice}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-teal-600 font-bold text-lg">
                                ${product.salePrice}
                              </span>
                              <span className="bg-teal-100 text-teal-800 text-xs px-1.5 py-0.5 rounded">
                                Save ${(product.oldPrice - product.salePrice).toFixed(2)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-800 font-bold text-lg">
                            ${product.salePrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAdd(product)}
                        className="relative p-3 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full text-white shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95"
                      >
                        <FaShoppingCart className="text-lg" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length > displayCount && (
              <div className="flex justify-center mt-12">
                <Link to="/shop/kitchen">
                  <button
                    className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white px-8 py-3 rounded-lg font-medium hover:from-teal-700 hover:to-emerald-800 transition flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    View All Kitchen Products
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Kitchen;