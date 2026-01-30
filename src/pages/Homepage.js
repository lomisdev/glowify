import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

// Import local product images
import roseLipBalm from '../assets/products/rose-lip-balm.jpg';
import hydratingSerum from '../assets/products/hydrating-serum.jpg';
import glowFoundation from '../assets/products/glow-foundation.jpg';
import matteLipstick from '../assets/products/matte-lipstick.jpg';

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      image: "https://images.unsplash.com/photo-1556228720-19876274e7fc?auto=format&fit=crop&w=1920&q=80",
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
      setFeaturedProducts([
        { 
          id: 1, 
          name: 'Rose Lip Balm', 
          price: 15, 
          originalPrice: 20,
          image: roseLipBalm, 
          discount: 25,
          rating: 4.5,
          reviews: 128
        },
        { 
          id: 2, 
          name: 'Hydrating Serum', 
          price: 25, 
          originalPrice: 35,
          image: hydratingSerum, 
          discount: 29,
          rating: 4.8,
          reviews: 89
        },
        { 
          id: 3, 
          name: 'Glow Foundation', 
          price: 30, 
          originalPrice: 45,
          image: glowFoundation, 
          discount: 33,
          rating: 4.6,
          reviews: 203
        },
        { 
          id: 4, 
          name: 'Matte Lipstick', 
          price: 18, 
          originalPrice: 24,
          image: matteLipstick, 
          discount: 25,
          rating: 4.3,
          reviews: 156
        },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { name: 'Skincare', icon: '💧', count: 245, color: '#e3f2fd' },
    { name: 'Makeup', icon: '💄', count: 189, color: '#fce4ec' },
    { name: 'Fragrance', icon: '🌸', count: 98, color: '#f3e5f5' },
    { name: 'Haircare', icon: '💇', count: 156, color: '#e8f5e8' },
    { name: 'Accessories', icon: '👜', count: 67, color: '#fff3e0' },
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
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${slide.image})`
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
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-badges">
                      <span className="discount-badge">-{product.discount}%</span>
                      <button className="wishlist-btn" aria-label="Add to wishlist">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="rating-text">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="product-price-container">
                      <span className="current-price">KSh {product.price * 100}</span>
                      <span className="original-price">KSh {product.originalPrice * 100}</span>
                    </div>
                    <div className="product-actions">
                      <Link to={`/product/${product.id}`} className="btn-view-details">
                        View Details
                      </Link>
                      <button className="btn-add-cart">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="section-footer">
            <Link to="/products" className="btn-view-all">
              View All Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn-newsletter">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
