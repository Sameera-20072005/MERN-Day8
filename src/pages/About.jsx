import React from 'react';

const About = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <section className="bg-gradient-to-r from-yellow-100 via-pink-200 to-purple-200 rounded-2xl py-16 px-6 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold text-white">About Bella Boutique</h1>
        <p className="mt-4 text-white/90">Empowering women through fashion.</p>
      </section>

      <section className="mt-8 bg-white rounded-xl p-8 shadow">
        <h2 className="text-2xl text-boutiquePink font-bold">Our Story</h2>
        <p className="mt-3 text-gray-600">Founded in 2020, Bella Boutique has been dedicated to providing women with high-quality, fashionable clothing that makes them feel confident and beautiful.</p>
      </section>

      <section className="mt-6 bg-white rounded-xl p-8 shadow">
        <h2 className="text-2xl text-boutiquePink font-bold">Our Mission</h2>
        <p className="mt-3 text-gray-600">We aim to offer a curated selection of clothing that combines comfort, style, and affordability. We're committed to sustainable fashion practices and ethical sourcing.</p>
      </section>

      <section className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-pink-500 font-bold">Quality</h3>
          <p className="mt-2 text-gray-600">We never compromise on quality.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-pink-500 font-bold">Sustainability</h3>
          <p className="mt-2 text-gray-600">Committed to eco-friendly and ethical fashion.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-pink-500 font-bold">Customer First</h3>
          <p className="mt-2 text-gray-600">Your satisfaction is our top priority.</p>
        </div>
      </section>
    </main>
  );
};

export default About;
