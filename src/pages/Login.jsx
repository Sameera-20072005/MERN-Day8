import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // perform "login"
    login(formData.email || 'guest@example.com');

    // after login, redirect to intended route
    navigate(from, { replace: true });
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl p-8 shadow">
        <h2 className="text-center text-2xl font-bold text-boutiquePink">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

          <button type="submit" className="w-full btn-primary">
            {isLogin ? 'Login' : 'Sign Up'}
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
