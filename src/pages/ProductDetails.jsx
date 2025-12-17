import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('No product ID provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching product with ID:', id);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-boutiquePink mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl p-8 shadow text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link to="/products" className="mt-4 inline-block btn-secondary">Back to products</Link>
        </div>
      </main>
    );
  }

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      // redirect to login and preserve where we came from
      navigate('/login', { state: { from: window.location.pathname }, replace: true });
      return;
    }

    // If logged in — add to cart and proceed to checkout
    addToCart(product);
    navigate('/cart');
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl p-8 shadow grid md:grid-cols-2 gap-6">
        
        {/* Product Image */}
        <div className="flex items-center justify-center rounded-xl h-[500px] overflow-hidden bg-gradient-to-br from-yellow-100 to-pink-50">
          <img
            src={product.image || product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
            }}
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-500">{product.category}</p>
          <div className="mt-4 text-2xl font-bold text-boutiquePink">
            ${product.price.toFixed(2)}
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex gap-3">
            <button onClick={() => addToCart(product)} className="btn-secondary">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn-primary">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
