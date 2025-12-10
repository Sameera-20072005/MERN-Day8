import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories', 'Footwear'];
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const filtered = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleQuickBuy = (product) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: { pathname: `/products/${product.id}` } } });
      return;
    }
    navigate(`/products/${product.id}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-center text-3xl font-bold text-boutiquePink">Our Collection</h1>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={
            `text-sm px-4 py-2 rounded-full border transition
            focus:outline-none focus:ring-0
            ${selectedCategory === cat
                ? 'bg-boutiquePink border-boutiquePink text-white shadow'
                : 'bg-gray-200 border-gray-200 text-gray-900 hover:bg-gray-300'}`
            }
            >
            {cat}
          </button>
        ))}
      </div>

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onQuickBuy={() => handleQuickBuy(p)} />
        ))}
      </section>
    </main>
  );
};

export default Products;
