import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import OrderSuccess from './pages/OrderSuccess';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-boutiqueBg text-gray-800">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<OrderSuccess />} />
            </Route>

            {/* fallback can optionally be added */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
