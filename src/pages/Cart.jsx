import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto px-6 py-16">
        <div className="cart-container bg-white rounded-2xl p-8 shadow text-center">
          <h2 className="text-2xl font-bold text-boutiquePink">Your Cart is Empty</h2>
          <p className="mt-3 text-gray-500">Start shopping to add items to your cart!</p>
          <Link to="/products"><button className="mt-6 btn-primary">Continue Shopping</button></Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    // Here you would call an API; we simulate success:
    clearCart();
    navigate('/success');
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-center text-3xl font-bold text-boutiquePink">Shopping Cart</h1>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow">
        <div className="space-y-4">
          {cartItems.map(item => <CartItem key={item._id || item.id} item={item} />)}
        </div>

        <div className="mt-6 text-right">
          <div className="text-2xl font-bold text-pink-500">Total: ${getCartTotal().toFixed(2)}</div>
          <div className="mt-4 flex gap-3 justify-end">
            <button className="btn-secondary" onClick={clearCart}>Clear Cart</button>
            <button className="btn-primary" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/products"><button className="btn-secondary">Continue Shopping</button></Link>
      </div>
    </main>
  );
};

export default Cart;
