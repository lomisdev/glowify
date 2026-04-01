import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';
import Account from './pages/Account';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import AccountAuth from './components/AccountAuth';
import AdminPanel from './pages/AdminPanel';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <FavoritesProvider>
        <AuthProvider>
          <Router>
            {isLoading ? (
              // === Splash Screen ===
              <div className="splash-screen splash-full">
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
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping-returns" element={<ShippingReturns />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/account/auth" element={<AccountAuth />} />
                    <Route path='admin' element={<AdminPanel />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            )}
          </Router>
        </AuthProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
