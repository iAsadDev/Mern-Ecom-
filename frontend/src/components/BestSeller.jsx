import { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayCount, setDisplayCount] = useState(8);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        const sortedProducts = data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const showToastPopup = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleAdd = (item) => {
    addToCart(item);
    showToastPopup("✅ Added to cart");
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [products, searchTerm, selectedCategory]);

  const categories = useMemo(() => 
    ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-white text-green-700 border border-green-300 shadow-md px-4 py-2 rounded-lg z-50">
          {toastMessage}
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-12 md:py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-3">
            Our Best Selling Products
          </h1>
          <div className="w-20 h-1 bg-indigo-300 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-indigo-600 max-w-2xl mx-auto">
            Discover our most popular kitchen essentials
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-600">
              No products found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.slice(0, displayCount).map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  {/* Badges */}
                  {new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                      NEW
                    </span>
                  )}
                  {product.salePrice < product.oldPrice && (
                    <span className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                      {Math.round((1 - product.salePrice / product.oldPrice) * 100)}% OFF
                    </span>
                  )}

                  {/* Product Image */}
                  <div className="h-52 sm:h-60 overflow-hidden bg-gray-50">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-3 border-t border-gray-100">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        {product.oldPrice && product.salePrice < product.oldPrice ? (
                          <div>
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
                          </div>
                        ) : (
                          <span className="text-gray-800 font-bold text-lg">
                            ${product.salePrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAdd(product)}
                        className="p-2.5 bg-indigo-100 hover:bg-indigo-600 rounded-full text-indigo-600 hover:text-white transition-colors duration-200"
                      >
                        <FaShoppingCart className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length > displayCount && (
              <div className="flex justify-center mt-12">
                <Link
                  to="/shop"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
                >
                  See More Products
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
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BestSeller;