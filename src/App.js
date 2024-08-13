import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPages';
import { CartProvider } from './hooks/CartContext';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
