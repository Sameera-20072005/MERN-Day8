import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-pink-100 via-pink-200 to-purple-100 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-pink-700">
          Bella Boutique
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-pink-700">
          <Link to="/" className="hover:-translate-y-0.5 transition">Home</Link>
          <Link to="/about" className="hover:-translate-y-0.5 transition">About</Link>
          <Link to="/products" className="hover:-translate-y-0.5 transition">Products</Link>

          {!isLoggedIn ? (
            <Link to="/login" className="hover:-translate-y-0.5 transition">Login</Link>
          ) : (
            <>
              <span className="text-sm text-gray-600">Hello, {user?.name}</span>
              <button onClick={handleLogout} className="text-sm text-pink-600 font-semibold">Logout</button>
            </>
          )}

          <Link to="/cart" className="relative inline-flex items-center">
            <span className="mr-2">🛒</span>
            <span>Cart</span>
            {getCartCount() > 0 && (
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-pink-500 text-white text-xs w-6 h-6">
                {getCartCount()}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
