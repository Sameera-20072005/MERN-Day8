import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl p-8 shadow text-center">
        <h2 className="text-3xl font-bold text-green-600">Order Successful</h2>
        <p className="mt-4 text-gray-600">Thank you for your purchase — your order has been placed successfully.</p>

        <Link to="/products" className="mt-6 inline-block btn-primary">Continue Shopping</Link>
      </div>
    </main>
  );
};

export default OrderSuccess;
