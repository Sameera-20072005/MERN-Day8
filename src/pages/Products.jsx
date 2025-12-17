import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/productApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
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

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-boutiquePink mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center bg-red-50 p-6 rounded-lg">
          <p className="text-red-600">Error loading products: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

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
          <ProductCard key={p._id || p.id} product={p} onQuickBuy={() => handleQuickBuy(p)} />
        ))}
      </section>
    </main>
  );
};

export default Products;
