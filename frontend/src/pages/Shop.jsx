import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from "../context/cartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  // Simplified product fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        // Sort by newest first (simple timestamp comparison)
        const sortedProducts = [...data].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        showToastPopup("⚠️ Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const showToastPopup = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // Reduced duration
  };

  const handleAdd = (item) => {
    addToCart(item);
    showToastPopup("✅ Added to cart");
  };

  // Optimized filter logic
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        (product.title.toLowerCase().includes(term) ||
         product.category.toLowerCase().includes(term)) &&
        (selectedCategory === "all" || product.category === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory]);

  const categories = useMemo(() => 
    ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Simplified Toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-white text-green-700 border border-green-300 shadow-md px-4 py-2 rounded-lg z-50">
          {toastMessage}
        </div>
      )}

      {/* Hero Section with simpler animation */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Premium Collection
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Curated selection of high-quality kitchen essentials
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-50 relative overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                    loading="lazy" // Lazy loading for images
                  />
                  {new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      {product.oldPrice && product.salePrice < product.oldPrice ? (
                        <div>
                          <span className="text-gray-400 line-through text-sm">
                            ${product.oldPrice}
                          </span>
                          <span className="text-teal-600 font-bold ml-2">
                            ${product.salePrice}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-800 font-bold">
                          ${product.salePrice}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleAdd(product)}
                      className="p-2 bg-teal-100 rounded-full text-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;