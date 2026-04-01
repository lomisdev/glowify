import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import hydratingSerum from '../assets/products/hydrating-serum.jpg';
import './Homepage.css';

const Homepage = () => {
  const { addItem, itemCount } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Unleash Your",
      highlight: "Natural Glow",
      subtitle: "Discover premium cosmetics that enhance your beauty and boost your confidence",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: 2,
      title: "Bold Looks for",
      highlight: "Every Occasion",
      subtitle: "Long-lasting makeup that stays fresh from day to night",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: 3,
      title: "Pure Skincare",
      highlight: "Essentials",
      subtitle: "Nourish your skin with our 100% organic and cruelty-free formulas",
      image: hydratingSerum,
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFeaturedProducts(getFeaturedProducts());
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setNewsletterSuccess(false);

    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Simulate newsletter signup
    console.log('Newsletter signup:', email);
    setNewsletterSuccess(true);
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => {
      setNewsletterSuccess(false);
    }, 5000);
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleToggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const categories = [
    { name: 'Skincare', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>, count: 245, color: '#FBF9F8' },
    { name: 'Makeup', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 21a9 9 0 0 1-9-9c0-4.97 4.03-9 9-9v18z" /></svg>, count: 189, color: '#F4DCDA' },
    { name: 'Fragrance', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>, count: 98, color: '#F1EDEB' },
    { name: 'Haircare', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>, count: 156, color: '#FBF9F8' },
    { name: 'Accessories', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" /></svg>, count: 67, color: '#F4DCDA' },
  ];

  const benefits = [
    { title: 'Free Shipping', description: 'On orders over $50', icon: '🚚' },
    { title: 'Premium Quality', description: '100% authentic products', icon: '✨' },
    { title: '24/7 Support', description: 'Dedicated customer service', icon: '💬' },
    { title: 'Secure Payment', description: 'Safe & encrypted checkout', icon: '🔒' },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Makeup Artist",
      text: "Glowify has completely transformed my kit. The foundation finishes are unmatched and my clients love the natural glow!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Michelle Alika",
      role: "Verified Buyer",
      text: "Finally found a skincare line that doesn't irritate my sensitive skin. The hydrating serum is a game changer.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Jessica Lee",
      role: "Beauty Blogger",
      text: "Fast shipping, beautiful packaging, and incredible products. I recommend Glowify to all my followers!",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="homepage">
      {/* === Hero Slider Section === */}
      <section className="hero-section">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2)), url(${slide.image})`
            }}
          >
            <div className={`hero-content ${index === currentSlide ? 'active' : ''}`}>
              <div className="hero-badge">New Collection 2024</div>
              <h1 className="hero-title">
                {slide.title} <span>{slide.highlight}</span>
              </h1>
              <p className="hero-subtitle">
                {slide.subtitle}
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn-primary">
                  Shop Now
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* === Trust Indicators === */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="trust-item">
                <div className="trust-icon">{benefit.icon}</div>
                <div className="trust-content">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Categories Section === */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our curated collections</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link key={index} to={`/products?category=${category.name.toLowerCase()}`} className="category-card">
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  <span>{category.icon}</span>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <span className="category-count">{category.count} products</span>
                </div>
                <div className="category-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === Featured Products Section === */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Hand-picked favorites from our collection</p>
          </div>

          {isLoading ? (
            <div className="loading-grid">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="product-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-price"></div>
                    <div className="skeleton-button"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/products" className="btn-view-all">
              View All Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* === Testimonials Section === */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Glow Stories</h2>
            <p>What our community loves about us</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                  <div className="testimonial-meta">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-stars">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Newsletter Section === */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay in the Glow</h2>
            <p>Get exclusive offers and be the first to know about new products</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`newsletter-input ${emailError ? 'error' : ''}`}
                  aria-label="Email address"
                />
                <button type="submit" className="btn-newsletter">Subscribe</button>
              </div>
              {emailError && (
                <div className="newsletter-error" role="alert">
                  {emailError}
                </div>
              )}
              {newsletterSuccess && (
                <div className="newsletter-success" role="status">
                  🎉 Thank you for subscribing! Check your email for confirmation.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
