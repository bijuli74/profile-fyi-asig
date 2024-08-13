import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/CartContext';

const NavBar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-semibold">My Store</Link>
      <Link to="/cart" className="text-lg font-semibold flex items-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill='currentColor'
          className="h-8  w-8 mr-2"
        >
          <path d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z" data-name="Shopping Cart" />
        </svg>
        Cart
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default NavBar;