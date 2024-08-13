import React from 'react';
import { useCart } from '../hooks/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />

      <div className="flex-1 px-4">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-500">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex-1 items-center">
        <button
          className="px-2 py-1 border rounded hover:bg-gray-200 transition"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          className="px-2 py-1 border rounded hover:bg-gray-200 transition"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <button
        className="text-red-500 hover:text-red-700 transition ml-4"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
