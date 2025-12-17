import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start py-4 border-b border-pink-50">

      {/* Product Image */}
      <div className="w-32 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <img 
          src={item.image || item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
          }}
        />
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-400">{item.category}</p>
        <div className="text-pink-500 font-bold mt-2">
          ${item.price.toFixed(2)}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="btn-secondary px-3 py-1"
        >
          -
        </button>

        <div className="font-bold">{item.quantity}</div>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="btn-secondary px-3 py-1"
        >
          +
        </button>
      </div>

      <div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="mt-2 md:mt-0 bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
