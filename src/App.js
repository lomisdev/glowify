import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';
import AccountAuth from './components/AccountAuth';
import Products from './pages/Products';
import AdminPanel from './pages/AdminPanel';
import './App.css';
import logo from './glowify.gif';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        // === Splash Screen ===
        <div
          className="splash-screen splash-full"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <div className="splash-overlay">
            <h1 className="splash-text"> </h1>
          </div>
        </div>
      ) : (
        // === Main App ===
        <div className="app fade-in">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product/:id" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              <Route path="/account" element={<AccountAuth />} />
              <Route path="/products" elements={<Products />} />
              <Route path='admin' element={<AdminPanel/>} /> 
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
