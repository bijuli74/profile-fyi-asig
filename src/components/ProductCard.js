import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, cart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // const handleAddToCart = () => {
  //   addToCart(product);
  //   showToast(`${product.title} added to cart!`);
  // };

  useEffect(() => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${product.title} added to cart!`);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in-right';
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('animate-slide-in-right');
      toast.classList.add('animate-fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  }

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-56 mb-4 overflow-hidden rounded-lg">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.title}</h2>
      <div className="flex items-center mb-4">
        <button
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l focus:outline-none hover:bg-gray-300"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span className="px-4 text-lg text-gray-800">{quantity}</span>
        <button
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r focus:outline-none hover:bg-gray-300"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      <p className="text-lg font-medium text-gray-800 mb-4">${product.price}</p>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );

};

export default ProductCard;
