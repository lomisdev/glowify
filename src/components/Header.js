import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ cartCount = 0 }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`} role="banner" aria-label="Main navigation">
        <div className="header-container">
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Brand/Logo */}
          <Link to="/" className="brand-logo" aria-label="Glowify home">
            <div className="logo-container">
              <div className="logo-text">
                <span className="logo-main">Glow</span>
                <span className="logo-accent">ify</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/products?category=skincare" className="nav-link">Skincare</Link>
            <Link to="/products?category=makeup" className="nav-link">Makeup</Link>
            <Link to="/products?category=fragrance" className="nav-link">Fragrance</Link>
            <Link to="/sale" className="nav-link sale-link">Sale</Link>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </div>
            </form>
          </div>

          {/* Action Icons */}
          <div className="header-actions">
            <Link to="/account" className="action-btn" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="action-label">Account</span>
            </Link>

            <Link to="/favorites" className="action-btn" aria-label="Favorites">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="action-label">Favorites</span>
            </Link>

            <Link to="/cart" className="action-btn cart-btn" aria-label={`Shopping cart with ${cartCount} items`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1h5l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="action-label">Cart</span>
              {cartCount > 0 && (
                <span className="cart-count" aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Search Toggle */}
          <button 
            className="mobile-search-toggle" 
            onClick={() => setShowMobileSearch(true)}
            aria-label="Open search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link to="/products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            <Link to="/products?category=skincare" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Skincare</Link>
            <Link to="/products?category=makeup" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Makeup</Link>
            <Link to="/products?category=fragrance" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Fragrance</Link>
            <Link to="/sale" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>
            <Link to="/account" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
            <Link to="/favorites" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Favorites</Link>
            <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Shopping Cart</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay" onClick={() => setShowMobileSearch(false)}>
          <div className="mobile-search-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="mobile-search-form">
              <div className="mobile-search-input-wrapper">
                <svg className="mobile-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="search"
                  className="mobile-search-input"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  aria-label="Search products"
                />
              </div>
            </form>
            <button 
              className="mobile-search-close" 
              onClick={() => setShowMobileSearch(false)}
              aria-label="Close search"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
