import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    setCartCount(prevCount => prevCount + quantity);
  };

  // const removeFromCart = (id) => {
  //   setCart(prevCart => prevCart.filter(item => item.id !== id));
  //   setCartCount(prevCount => prevCount - 1);
  // };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const productToRemove = prevCart.find(item => item.id === id);
      if (productToRemove) {
        setCartCount(prevCount => prevCount - productToRemove.quantity);
      }
      return prevCart.filter(item => item.id !== id);
    });
  };

  // const updateQuantity = (id, quantity) => {
  //   setCart(prevCart => {
  //     return prevCart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item);
  //   });
  // };

  const updateQuantity = (id, newQuantity) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const quantityDifference = newQuantity - item.quantity;
          setCartCount(prevCount => prevCount + quantityDifference);
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
