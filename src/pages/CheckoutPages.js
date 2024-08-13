import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Checkout Successful!</h1>
        <p className="text-lg mb-8">Thank you for your purchase.</p>
        <button
          onClick={handleBackToHome}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
