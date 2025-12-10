import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <section className="bg-gradient-to-r from-yellow-100 via-pink-200 to-purple-200 rounded-2xl py-20 px-6 text-center shadow-lg animate-fadeInUp">
        <h1 className="text-5xl font-extrabold text-white drop-shadow">Welcome to Bella Boutique</h1>
        <p className="mt-4 text-lg text-white/90">Discover your perfect style — curated with love.</p>
        <Link to="/products">
          <button className="mt-8 btn-primary px-8 py-3">Shop Now</button>
        </Link>
      </section>

      <section className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-4xl">✨</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-700">Premium Quality</h3>
          <p className="text-sm text-gray-400 mt-2">Handpicked collection of finest fabrics.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-4xl">🚚</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-700">Fast Delivery</h3>
          <p className="text-sm text-gray-400 mt-2">Quick shipping to your doorstep.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-4xl">💝</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-700">Easy Returns</h3>
          <p className="text-sm text-gray-400 mt-2">Hassle-free 30-day return policy.</p>
        </div>
      </section>

      <section className="mt-10 bg-white rounded-xl p-8 shadow text-center">
        <h2 className="text-2xl text-boutiquePink font-bold">Featured Collections</h2>
        <p className="mt-3 text-gray-600">From elegant dresses to casual wear, we have everything you need to express your unique style.</p>
        <Link to="/products">
          <button className="mt-6 btn-secondary">View All Products</button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
