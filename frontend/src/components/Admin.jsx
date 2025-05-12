import React, { useState, useEffect } from "react";
import axios from "axios";

// Constants for API endpoints to avoid hardcoding and enable easy updates
const API_ENDPOINTS = {
  PRODUCTS: "http://localhost:5000/api/products",
  ORDERS: "http://localhost:5000/api/orders",
  BLOG_POSTS: "http://localhost:5000/api/blogposts",
};

/**
 * Main Admin Dashboard Component
 * Manages products, orders, and blog posts with CRUD operations
 */
const Admin = () => {
  // State for active tab selection
  const [activeTab, setActiveTab] = useState("products");

  // Loading states for each data type
  const [loading, setLoading] = useState({
    products: false,
    orders: false,
    blogPosts: false,
  });

  // Data states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  // Form states with initial values
  const [productForm, setProductForm] = useState({
    title: "",
    category: "",
    oldPrice: "",
    salePrice: "",
    image: null,
    editingId: null, // Tracks if we're editing an existing product
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    description: "",
    image: null,
    editingId: null, // Tracks if we're editing an existing blog post
  });

  /**
   * Fetch all initial data when component mounts
   * Uses Promise.all for parallel requests
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set all loading states to true
        setLoading((prev) => ({
          ...prev,
          products: true,
          orders: true,
          blogPosts: true,
        }));

        // Fetch data in parallel
        const [productsRes, ordersRes, blogRes] = await Promise.all([
          axios.get(API_ENDPOINTS.PRODUCTS),
          axios.get(API_ENDPOINTS.ORDERS),
          axios.get(API_ENDPOINTS.BLOG_POSTS),
        ]);

        // Update state with fetched data
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setBlogPosts(blogRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // TODO: Add user-friendly error notification
      } finally {
        // Reset loading states regardless of success/failure
        setLoading((prev) => ({
          ...prev,
          products: false,
          orders: false,
          blogPosts: false,
        }));
      }
    };

    fetchData();
  }, []);

  /**
   * Generic input change handler
   * @param {Object} e - Event object
   * @param {string} formType - Either 'product' or 'blog'
   */
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    const setter = formType === "product" ? setProductForm : setBlogForm;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles image file selection
   * @param {Object} e - Event object
   * @param {string} formType - Either 'product' or 'blog'
   */
  const handleImageChange = (e, formType) => {
    const setter = formType === "product" ? setProductForm : setBlogForm;
    setter((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  /**
   * Resets form to initial state
   * @param {string} formType - Either 'product' or 'blog'
   */
  const resetForm = (formType) => {
    const initialState =
      formType === "product"
        ? {
            title: "",
            category: "",
            oldPrice: "",
            salePrice: "",
            image: null,
            editingId: null,
          }
        : {
            title: "",
            description: "",
            image: null,
            editingId: null,
          };

    const setter = formType === "product" ? setProductForm : setBlogForm;
    setter(initialState);
  };

  // ================= PRODUCT CRUD OPERATIONS =================

  /**
   * Handles product form submission (create/update)
   * @param {Object} e - Event object
   */
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", productForm.title);
    formData.append("category", productForm.category);
    formData.append("oldPrice", productForm.oldPrice);
    formData.append("salePrice", productForm.salePrice);
    if (productForm.image) formData.append("image", productForm.image);

    try {
      let response;

      if (productForm.editingId) {
        // Update existing product
        response = await axios.put(
          `${API_ENDPOINTS.PRODUCTS}/${productForm.editingId}`,
          formData
        );
        setProducts(
          products.map((p) => (p._id === response.data._id ? response.data : p))
        );
      } else {
        // Create new product
        response = await axios.post(API_ENDPOINTS.PRODUCTS, formData);
        setProducts([...products, response.data]);
      }

      resetForm("product");
    } catch (error) {
      console.error("Error saving product:", error);
      // TODO: Add user-friendly error notification
    }
  };

  /**
   * Deletes a product
   * @param {string} id - Product ID to delete
   */
  const handleProductDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
      // TODO: Add user-friendly error notification
    }
  };

  // ================= BLOG POST CRUD OPERATIONS =================

  /**
   * Handles blog post form submission (create/update)
   * @param {Object} e - Event object
   */
  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogForm.title);
    formData.append("author", blogForm.author);
    formData.append("description", blogForm.description);
    if (blogForm.image) formData.append("image", blogForm.image);

    try {
      let response;

      if (blogForm.editingId) {
        // Update existing blog post
        response = await axios.put(
          `${API_ENDPOINTS.BLOG_POSTS}/${blogForm.editingId}`,
          formData
        );
        setBlogPosts(
          blogPosts.map((post) =>
            post._id === response.data._id ? response.data : post
          )
        );
      } else {
        // Create new blog post
        response = await axios.post(API_ENDPOINTS.BLOG_POSTS, formData);
        setBlogPosts([...blogPosts, response.data]);
      }

      resetForm("blog");
    } catch (error) {
      console.error("Error saving blog post:", error);
      // TODO: Add user-friendly error notification
    }
  };

  /**
   * Deletes a blog post
   * @param {string} id - Blog post ID to delete
   */
  const handleBlogDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;

    try {
      await axios.delete(`${API_ENDPOINTS.BLOG_POSTS}/${id}`);
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete blog post", error);
      // TODO: Add user-friendly error notification
    }
  };

  // ================= ORDER OPERATIONS =================

  /**
   * Handles order actions (delete or mark as delivered)
   * @param {string} id - Order ID
   * @param {string} action - Either 'delete' or 'markDelivered'
   */
  const handleOrderAction = async (id, action) => {
    try {
      if (action === "delete") {
        if (!window.confirm("Are you sure you want to delete this order?"))
          return;
        await axios.delete(`${API_ENDPOINTS.ORDERS}/${id}`);
        setOrders(orders.filter((order) => order._id !== id));
      } else if (action === "markDelivered") {
        await axios.put(`${API_ENDPOINTS.ORDERS}/${id}`, { delivered: true });
        setOrders(
          orders.map((order) =>
            order._id === id ? { ...order, delivered: true } : order
          )
        );
      }
    } catch (error) {
      console.error(`Failed to ${action} order`, error);
      // TODO: Add user-friendly error notification
    }
  };

  // Filter orders into new and delivered
  const newOrders = orders.filter((order) => !order.delivered);
  const deliveredOrders = orders.filter((order) => order.delivered);

  // ================= RENDER =================

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {["products", "orders", "blog"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium capitalize ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {productForm.editingId ? "Edit Product" : "Add New Product"}
            </h2>
            <ProductForm
              formData={productForm}
              onInputChange={(e) => handleInputChange(e, "product")}
              onImageChange={(e) => handleImageChange(e, "product")}
              onSubmit={handleProductSubmit}
              onCancel={() => resetForm("product")}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            {loading.products ? (
              <div className="text-center py-8">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={() =>
                      setProductForm({
                        title: product.title,
                        category: product.category,
                        oldPrice: product.oldPrice,
                        salePrice: product.salePrice,
                        image: null,
                        editingId: product._id,
                      })
                    }
                    onDelete={() => handleProductDelete(product._id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-8">
          {/* New Orders Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">New Orders</h2>
            {loading.orders ? (
              <div className="text-center py-8">Loading orders...</div>
            ) : newOrders.length === 0 ? (
              <p className="text-gray-500">No new orders.</p>
            ) : (
              <div className="space-y-4">
                {newOrders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onMarkDelivered={() =>
                      handleOrderAction(order._id, "markDelivered")
                    }
                    onDelete={() => handleOrderAction(order._id, "delete")}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Delivered Orders Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivered Orders</h2>
            {loading.orders ? (
              <div className="text-center py-8">Loading orders...</div>
            ) : deliveredOrders.length === 0 ? (
              <p className="text-gray-500">No delivered orders yet.</p>
            ) : (
              <div className="space-y-4">
                {deliveredOrders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onDelete={() => handleOrderAction(order._id, "delete")}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === "blog" && (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {blogForm.editingId ? "Edit Blog Post" : "Add New Blog Post"}
            </h2>
            <BlogForm
              formData={blogForm}
              onInputChange={(e) => handleInputChange(e, "blog")}
              onImageChange={(e) => handleImageChange(e, "blog")}
              onSubmit={handleBlogSubmit}
              onCancel={() => resetForm("blog")}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
            {loading.blogPosts ? (
              <div className="text-center py-8">Loading blog posts...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogPosts.map((post) => (
                  <BlogPostCard
                    key={post._id}
                    post={post}
                    onEdit={() =>
                      setBlogForm({
                        title: post.title,
                        description: post.description,
                        author: post.author,
                        image: null,
                        editingId: post._id,
                      })
                    }
                    onDelete={() => handleBlogDelete(post._id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

// ================= REUSABLE COMPONENTS =================

/**
 * Product Form Component
 */
const ProductForm = ({
  formData,
  onInputChange,
  onImageChange,
  onSubmit,
  onCancel,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        name="title"
        value={formData.title}
        onChange={onInputChange}
        placeholder="Product Title"
        required
      />
      <InputField
        name="category"
        value={formData.category}
        onChange={onInputChange}
        placeholder="Category"
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        type="number"
        name="oldPrice"
        value={formData.oldPrice}
        onChange={onInputChange}
        placeholder="Old Price"
        required
      />
      <InputField
        type="number"
        name="salePrice"
        value={formData.salePrice}
        onChange={onInputChange}
        placeholder="Sale Price"
        required
      />
    </div>

    <FileInput
      name="image"
      onChange={onImageChange}
      required={!formData.editingId}
    />

    <div className="flex gap-2">
      <Button type="submit" color="primary">
        {formData.editingId ? "Update" : "Add"} Product
      </Button>
      {formData.editingId && (
        <Button type="button" onClick={onCancel} color="secondary">
          Cancel
        </Button>
      )}
    </div>
  </form>
);

/**
 * Blog Post Form Component
 */
const BlogForm = ({
  formData,
  onInputChange,
  onImageChange,
  onSubmit,
  onCancel,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <InputField
      name="title"
      value={formData.title}
      onChange={onInputChange}
      placeholder="Blog Title"
      required
    />
    <InputField
      name="author"
      value={formData.author}
      onChange={onInputChange}
      placeholder="author"
      required
    />

    <TextArea
      name="description"
      value={formData.description}
      onChange={onInputChange}
      placeholder="Blog Content"
      rows="4"
      required
    />

    <FileInput
      name="image"
      onChange={onImageChange}
      required={!formData.editingId}
    />

    <div className="flex gap-2">
      <Button type="submit" color="primary">
        {formData.editingId ? "Update" : "Add"} Post
      </Button>
      {formData.editingId && (
        <Button type="button" onClick={onCancel} color="secondary">
          Cancel
        </Button>
      )}
    </div>
  </form>
);

/**
 * Product Card Component
 */
const ProductCard = ({ product, onEdit, onDelete }) => (
  <div className="bg-white border rounded-lg shadow hover:shadow-md transition p-4">
    <img
      src={`http://localhost:5000/uploads/${product.image}`}
      alt={product.title}
      className="w-full h-40 object-cover rounded mb-3"
      loading="lazy" // Add lazy loading for better performance
    />
    <h3 className="font-semibold">{product.title}</h3>
    <p className="text-sm text-gray-500">{product.category}</p>
    <div className="flex items-center gap-2 mt-1">
      <span className="text-sm line-through text-red-500">
        ${product.oldPrice}
      </span>
      <span className="font-semibold text-green-600">${product.salePrice}</span>
    </div>
    <div className="flex gap-2 mt-3">
      <Button onClick={onEdit} size="sm" color="primary">
        Edit
      </Button>
      <Button onClick={onDelete} size="sm" color="danger">
        Delete
      </Button>
    </div>
  </div>
);

/**
 * Blog Post Card Component
 */
const BlogPostCard = ({ post, onEdit, onDelete }) => (
  <div className="bg-white border rounded-lg shadow hover:shadow-md transition p-4">
    {post.image && (
      <img
        src={`http://localhost:5000/uploads/${post.image}`}
        alt={post.title}
        className="w-full h-40 object-cover rounded mb-3"
        loading="lazy" // Add lazy loading for better performance
      />
    )}
    <h3 className="font-semibold">{post.title}</h3>
    <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
    <div className="flex gap-2 mt-3">
      <Button onClick={onEdit} size="sm" color="primary">
        Edit
      </Button>
      <Button onClick={onDelete} size="sm" color="danger">
        Delete
      </Button>
    </div>
  </div>
);

/**
 * Order Card Component
 */
const OrderCard = ({ order, onMarkDelivered, onDelete }) => (
  <div className="bg-white border rounded-lg shadow p-4">
    <div className="flex gap-4">
      {order.productId?.image && (
        <img
          src={`http://localhost:5000/uploads/${order.productId.image}`}
          alt="Ordered Product"
          className="w-16 h-16 rounded object-cover border"
          loading="lazy" // Add lazy loading for better performance
        />
      )}
      <div className="flex-1">
        <h4 className="font-semibold">{order.customerName}</h4>
        <div className="text-sm text-gray-600 space-y-1 mt-1">
          <p>📞 {order.phone1}</p>
          {order.phone2 && <p>📞 {order.phone2}</p>}
          <p>📍 {order.address}</p>
          <p>
            🛒 {order.productId?.title || "N/A"} (Qty: {order.quantity})
          </p>
        </div>

        {order.delivered ? (
          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
            ✅ Delivered
          </span>
        ) : (
          <div className="flex gap-2 mt-2">
            <Button onClick={onMarkDelivered} size="sm" color="success">
              Mark Delivered
            </Button>
            <Button onClick={onDelete} size="sm" color="danger">
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ================= UI COMPONENTS =================

/**
 * Reusable Input Field Component
 */
const InputField = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

/**
 * Reusable TextArea Component
 */
const TextArea = ({ name, value, onChange, placeholder, rows, required }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    required={required}
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

/**
 * Reusable File Input Component
 */
const FileInput = ({ name, onChange, required }) => (
  <input
    type="file"
    name={name}
    onChange={onChange}
    required={required}
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    accept="image/*"
  />
);

/**
 * Reusable Button Component
 */
const Button = ({
  children,
  type = "button",
  onClick,
  color = "primary",
  size = "base",
}) => {
  // Color variants
  const colors = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  // Size variants
  const sizes = {
    sm: "px-3 py-1 text-sm",
    base: "px-4 py-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colors[color]} ${sizes[size]} text-white rounded transition`}
    >
      {children}
    </button>
  );
};

export default Admin;