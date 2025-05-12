import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  // State management
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone1: "",
    phone2: ""
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);

  // Cart item actions
  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  // Submit order to server
  const placeOrder = async () => {
    try {
      const orderPromises = cart.map(item => (
        axios.post("http://localhost:5000/api/orders", {
          productId: item._id,
          quantity: item.quantity,
          customerName: customer.name,
          phone1: customer.phone1,
          phone2: customer.phone2,
          address: `${customer.address}, ${customer.city}`
        })
      ));

      await Promise.all(orderPromises);
      
      // Clear cart and show success
      setCart([]);
      localStorage.removeItem("cart");
      showNotification("🎉 Order confirmed! We'll contact you soon.", "success");
    } catch (error) {
      showNotification("❌ Failed to place order. Please try again.", "error");
    }
  };

  // Notification helper
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 5000);
  };

  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
        <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
        <Link 
          to="/shop" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        {/* Notification */}
        {notification.show && (
          <div className={`mb-6 p-4 rounded-lg text-white ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {notification.message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow flex gap-4">
                <img 
                  src={`http://localhost:5000/uploads/${item.image}`} 
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-gray-500">{item.category}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-red-500 line-through">${item.oldPrice}</span>
                    <span className="font-bold text-green-600">${item.salePrice}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <button 
                      onClick={() => updateQuantity(index, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(index, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={() => removeItem(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            
            <div className="space-y-4">
              {[
                { name: "name", placeholder: "Full Name", required: true },
                { name: "email", placeholder: "Email", type: "email", required: true },
                { name: "address", placeholder: "Address", required: true },
                { name: "city", placeholder: "City", required: true },
                { name: "phone1", placeholder: "Phone Number", required: true },
                { name: "phone2", placeholder: "Alternate Phone (optional)" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  value={customer[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;