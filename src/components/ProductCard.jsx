import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onQuickBuy }) => {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    // if parent passed quick-buy handler, use it (Products list -> quick buy)
    if (onQuickBuy) {
      onQuickBuy();
      return;
    }
    // otherwise, on product-card-level, go to details (where buy now will be handled)
    navigate(`/products/${product._id || product.id}`);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md transform transition hover:-translate-y-2 animate-fadeInUp">
  
  <div className="h-100 rounded-xl overflow-hidden">
    <img 
      src={product.image || product.imageUrl} 
      alt={product.name} 
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
      }}
    />
  </div>

  <h3 className="mt-4 text-lg font-semibold text-gray-700">{product.name}</h3>
  <p className="text-sm text-gray-400">{product.category}</p>

  <div className="mt-3 flex items-center justify-between">
    <div className="text-2xl font-bold text-boutiquePink">${product.price.toFixed(2)}</div>

    <div className="flex gap-2">
      <button onClick={handleAddToCart} className="btn-secondary">Add</button>
      <button onClick={handleBuyNow} className="btn-primary">Buy Now</button>
    </div>
  </div>

  <div className="mt-3 text-right">
    <Link to={`/products/${product._id || product.id}`} className="text-sm text-gray-500 hover:underline">View Details</Link>
  </div>
</div>
  );
};

export default ProductCard;
