import { createContext, useState, useContext, useEffect } from 'react';

// Create CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      let newCart;
      if (existingIndex !== -1) {
        // Item exists, update quantity
        newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1
        };
      } else {
        // New item, add to cart
        newCart = [
          ...prevCart,
          {
            _id: item._id,
            title: item.title,
            category: item.category || 'Uncategorized',
            image: item.image,
            oldPrice: item.oldPrice || 0,
            salePrice: item.salePrice || 0,
            quantity: 1,
          }
        ];
      }
      return newCart;
    });
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) => total + (item.salePrice * item.quantity),
    0
  );

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};