import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/CartContext';

const CartPage = () => {
  const { cart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountType, setDiscountType] = useState(null);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const applyDiscount = (subtotal) => {
    let discountAmount = 0;
    if (discountType === 'fixed') {
      discountAmount = 10; // $10 off
    } else if (discountType === 'percentage') {
      discountAmount = subtotal * 0.1; // 10% off
    }
    return Math.max(0, subtotal - discountAmount);
  };

  const handleApplyDiscount = () => {
    if (discountCode === 'FIXED10') {
      setDiscountType('fixed');
      setIsDiscountApplied(true);
      setErrorMessage('');
    } else if (discountCode === 'PERCENT10') {
      setDiscountType('percentage');
      setIsDiscountApplied(true);
      setErrorMessage('');
    } else {
      setDiscountType(null);
      setIsDiscountApplied(false);
      setErrorMessage('Wrong Discount Code');
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const subtotal = calculateSubtotal();
  const total = applyDiscount(subtotal);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-lg text-green-500">Discount: -${(subtotal - total).toFixed(2)}</p>
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <div className="mt-4 flex justify-end items-center">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="border p-2 mr-2"
                disabled={isDiscountApplied}
              />
              <button
                onClick={handleApplyDiscount}
                className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${isDiscountApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isDiscountApplied}
              >
                Apply Discount
              </button>
            </div>
            {errorMessage && (
              <p className="mt-2 text-red-500">{errorMessage}</p>
            )}
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
          <div className='flex justify-center items-center h-full'>
            <button
              onClick={handleBackToHome}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Continue Shopping
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Your cart is empty</p>

          <button
            onClick={handleBackToHome}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Continue Shopping
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
