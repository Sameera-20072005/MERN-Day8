import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.name);
      }

      if (result.success) {
        if (isLogin) {
          navigate(from, { replace: true });
        } else {
          setIsLogin(true);
          setFormData({ email: '', password: '', confirmPassword: '', name: '' });
          setError('Registration successful! Please login.');
        }
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl p-8 shadow">
        <h2 className="text-center text-2xl font-bold text-boutiquePink">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input name="name" type="text" required value={formData.name} onChange={handleChange}
                     className="mt-2 w-full border border-pink-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" placeholder="Enter your full name" />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange}
                   className="mt-2 w-full border border-pink-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input name="password" type="password" required value={formData.password} onChange={handleChange}
                   className="mt-2 w-full border border-pink-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" placeholder="Enter your password" />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange}
                     className="mt-2 w-full border border-pink-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" placeholder="Confirm your password" />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="text-pink-500 font-semibold" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
