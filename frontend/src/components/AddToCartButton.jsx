// src/components/AddToCartButton.jsx
import { useCart } from "../context/cartContext";

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // You can add a toast notification here if you want
    alert(`${product.name} added to cart!`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;