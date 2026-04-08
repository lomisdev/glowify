import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './ProductDetails.css';

// Import actual product images
import roseLipBalm from '../assets/products/rose-lip-balm.jpg';
import hydratingSerum from '../assets/products/hydrating-serum.jpg';
import glowFoundation from '../assets/products/glow-foundation.jpg';
import matteLipstick from '../assets/products/matte-lipstick.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  // Sample product data
  const sampleProducts = {
    1: {
      id: 1,
      name: 'Rose Lip Balm',
      basePrice: 1500,
      originalPrice: 2000,
      discount: 25,
      description: 'Experience the luxury of our Rose Lip Balm, enriched with natural rose extract and vitamin E.',
      category: 'makeup',
      inStock: true,
      rating: 4.5,
      reviews: 128,
      images: [roseLipBalm, roseLipBalm, roseLipBalm, roseLipBalm],
      sizes: [{ name: '15ml', price: 1500, originalPrice: 2000 }],
      colors: [{ name: 'Rose Pink', value: '#FFB6C1' }],
      features: ['Natural ingredients', 'Long-lasting', 'Moisturizing'],
      ingredients: 'Rose extract, Vitamin E, Beeswax',
      howToUse: 'Apply to lips as needed',
      shipping: 'Free shipping on orders over KSh 5000'
    },
    2: {
      id: 2,
      name: 'Hydrating Serum',
      basePrice: 2500,
      originalPrice: 3000,
      discount: 17,
      description: 'Advanced hydrating serum with hyaluronic acid for deep skin hydration.',
      category: 'skincare',
      inStock: true,
      rating: 4.8,
      reviews: 256,
      images: [hydratingSerum, hydratingSerum, hydratingSerum],
      sizes: [{ name: '30ml', price: 2500, originalPrice: 3000 }],
      colors: [{ name: 'Clear', value: 'transparent' }],
      features: ['Hyaluronic acid', 'Anti-aging', 'Fast absorption'],
      ingredients: 'Hyaluronic acid, Vitamin C, Peptides',
      howToUse: 'Apply to clean face morning and evening',
      shipping: 'Free shipping on orders over KSh 5000'
    },
    3: {
      id: 3,
      name: 'Glow Foundation',
      basePrice: 1800,
      originalPrice: 2200,
      discount: 18,
      description: 'Lightweight foundation for natural, glowing coverage.',
      category: 'makeup',
      inStock: true,
      rating: 4.3,
      reviews: 89,
      images: [glowFoundation, glowFoundation, glowFoundation],
      sizes: [{ name: '30ml', price: 1800, originalPrice: 2200 }],
      colors: [{ name: 'Natural', value: '#F5DEB3' }],
      features: ['Lightweight', 'Buildable coverage', 'SPF 15'],
      ingredients: 'Water, minerals, SPF 15',
      howToUse: 'Apply with sponge or brush',
      shipping: 'Free shipping on orders over KSh 5000'
    },
    4: {
      id: 4,
      name: 'Matte Lipstick',
      basePrice: 1200,
      originalPrice: 1800,
      discount: 33,
      description: 'Long-lasting matte lipstick in rich, vibrant colors.',
      category: 'makeup',
      inStock: true,
      rating: 4.6,
      reviews: 167,
      images: [matteLipstick, matteLipstick, matteLipstick],
      sizes: [{ name: '3.5g', price: 1200, originalPrice: 1800 }],
      colors: [{ name: 'Classic Red', value: '#DC143C' }],
      features: ['Long-lasting', 'Matte finish', 'Non-drying'],
      ingredients: 'Ceresin, Synthetic Wax, Vitamin E',
      howToUse: 'Apply directly to lips',
      shipping: 'Free shipping on orders over KSh 5000'
    }
  };

  // Load product data
  useEffect(() => {
    console.log('ProductDetails component mounted');
    console.log('ID from params:', id);
    
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        if (!id) {
          setError('No product ID provided');
          setLoading(false);
          return;
        }
        
        const productId = parseInt(id);
        console.log('Looking for product ID:', productId);
        
        const foundProduct = sampleProducts[productId];
        console.log('Found product:', foundProduct);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Set default selections
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0].name);
          }
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0].value);
          }
        } else {
          setError('Product not found');
        }
        
        setLoading(false);
      }, 100);
    } catch (err) {
      console.error('Error in useEffect:', err);
      setError('Failed to load product');
      setLoading(false);
    }
  }, [id]);

  // Utility functions
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: 'success' }), 3000);
  };

  const getCurrentPrice = () => {
    if (!product) return { price: 0, originalPrice: 0, discount: 0 };
    
    if (product.sizes && product.sizes.length > 0 && selectedSize) {
      const selectedSizeObj = product.sizes.find(size => size.name === selectedSize);
      if (selectedSizeObj) {
        const discount = Math.round(((selectedSizeObj.originalPrice - selectedSizeObj.price) / selectedSizeObj.originalPrice) * 100);
        return {
          price: selectedSizeObj.price,
          originalPrice: selectedSizeObj.originalPrice,
          discount
        };
      }
    }
    
    return { 
      price: product.basePrice || 0, 
      originalPrice: product.originalPrice || product.basePrice || 0, 
      discount: product.discount || 0 
    };
  };

  const handleAddToCart = () => {
    try {
      if (!product) {
        showNotification('Please wait for product to load', 'error');
        return;
      }
      
      if (!selectedSize) {
        showNotification('Please select a size', 'error');
        return;
      }
      
      const currentPrice = getCurrentPrice();
      const cartItem = {
        ...product,
        price: currentPrice.price,
        originalPrice: currentPrice.originalPrice,
        discount: currentPrice.discount,
        quantity,
        selectedSize,
        selectedColor: selectedColor === 'transparent' ? 'Clear' : selectedColor
      };
      
      addItem(cartItem);
      showNotification('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      showNotification('Failed to add product to cart', 'error');
    }
  };

  const handleToggleFavorite = () => {
    try {
      if (!product) return;
      
      if (isFavorite(product.id)) {
        removeFavorite(product.id);
        showNotification('Removed from favorites');
      } else {
        addFavorite(product);
        showNotification('Added to favorites!');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      showNotification('Failed to update favorites', 'error');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-not-found">
            <h2>{error || 'Product Not Found'}</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products" className="btn-back-to-products">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state - render product details
  const currentPrice = getCurrentPrice();

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Notification */}
        {notification.message && (
          <div className={`notification ${notification.type === 'error' ? 'error' : 'success'}`}>
            {notification.message}
          </div>
        )}

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-details-container">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x600/e91e63/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/80x80/e91e63/ffffff?text=${encodeURIComponent(product.name.charAt(0))}`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
              
              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="product-price">
                <span className="current-price">KSh {currentPrice.price}</span>
                {currentPrice.originalPrice && (
                  <>
                    <span className="original-price">KSh {currentPrice.originalPrice}</span>
                    <span className="discount-badge">-{currentPrice.discount}%</span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Product Options */}
            <div className="product-options">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="option-group">
                  <label>Size:</label>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size.name}
                        className={`size-option ${selectedSize === size.name ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size.name)}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="option-group">
                  <label>Color:</label>
                  <div className="color-options">
                    {product.colors.map(color => (
                      <button
                        key={color.value}
                        className={`color-option ${selectedColor === color.value ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color.value)}
                        style={{ backgroundColor: color.value === 'transparent' ? '#f0f0f0' : color.value }}
                        title={color.name}
                      >
                        {color.value === 'transparent' && 'Clear'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button 
                className={`btn-add-cart ${!product.inStock ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                className={`btn-favorite ${isFavorite(product.id) ? 'active' : ''}`}
                onClick={handleToggleFavorite}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite(product.id) ? "currentColor" : "none"}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {isFavorite(product.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info">
              <p>🚚 {product.shipping}</p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tabs">
            <button className="tab active">Description</button>
            <button className="tab">Ingredients</button>
            <button className="tab">How to Use</button>
            <button className="tab">Reviews</button>
          </div>
          
          <div className="tab-content">
            <div className="tab-pane active">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <p>Experience the ultimate in luxury and effectiveness with our carefully crafted formula.</p>
            </div>
            
            <div className="tab-pane">
              <h3>Ingredients</h3>
              <p>{product.ingredients}</p>
            </div>
            
            <div className="tab-pane">
              <h3>How to Use</h3>
              <p>{product.howToUse}</p>
            </div>
            
            <div className="tab-pane">
              <h3>Customer Reviews</h3>
              <div className="reviews-summary">
                <div className="overall-rating">
                  <span className="rating-number">{product.rating}</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="reviews-count">Based on {product.reviews} reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>You Might Also Like</h2>
          <div className="related-products-grid">
            {Object.values(sampleProducts)
              .filter(p => p.id !== product.id && p.id <= 4)
              .slice(0, 2)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="related-product-card">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/200x200/e91e63/ffffff?text=${encodeURIComponent(relatedProduct.name.charAt(0))}`;
                    }}
                  />
                  <h4>{relatedProduct.name}</h4>
                  <p>KSh {relatedProduct.basePrice}</p>
                  <Link to={`/product/${relatedProduct.id}`} className="btn-view-details">
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
