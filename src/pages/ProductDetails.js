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
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [notification, setNotification] = useState('');
  const [priceUpdated, setPriceUpdated] = useState(false);

  // Sample product data - in real app, this would come from API
  const sampleProducts = {
    1: {
      id: 1,
      name: 'Rose Lip Balm',
      basePrice: 1500,
      originalPrice: 2000,
      discount: 25,
      description: 'Experience the luxury of our Rose Lip Balm, enriched with natural rose extract and vitamin E. This nourishing balm provides long-lasting hydration while leaving your lips with a subtle rosy tint and delicate fragrance.',
      category: 'makeup',
      inStock: true,
      rating: 4.5,
      reviews: 128,
      images: [
        roseLipBalm,
        roseLipBalm,
        roseLipBalm,
        roseLipBalm
      ],
      sizes: [
        { name: '15ml', price: 1500, originalPrice: 2000 },
        { name: '30ml', price: 2500, originalPrice: 3000 }
      ],
      colors: [
        { name: 'Rose Pink', value: '#FFB6C1' },
        { name: 'Natural', value: '#D2B48C' }
      ],
      features: [
        'Long-lasting hydration',
        'Natural rose extract',
        'Vitamin E enriched',
        'SPF 15 protection',
        'Cruelty-free',
        'Organic ingredients'
      ],
      ingredients: 'Rosa Damascena Flower Extract, Beeswax, Vitamin E, Shea Butter, Jojoba Oil, Coconut Oil, Natural Flavor',
      howToUse: 'Apply liberally to lips as needed throughout the day. Can be worn alone or under lipstick.',
      shipping: 'Free shipping on orders over KSh 5000'
    },
    2: {
      id: 2,
      name: 'Hydrating Serum',
      basePrice: 2500,
      originalPrice: 3500,
      discount: 29,
      description: 'Transform your skin with our powerful Hydrating Serum. This lightweight formula penetrates deep into the skin to deliver intense hydration and restore your natural glow.',
      category: 'skincare',
      inStock: true,
      rating: 4.8,
      reviews: 89,
      images: [
        hydratingSerum,
        hydratingSerum,
        hydratingSerum
      ],
      sizes: [
        { name: '30ml', price: 2500, originalPrice: 3500 },
        { name: '50ml', price: 3500, originalPrice: 4500 }
      ],
      colors: [
        { name: 'Clear', value: 'transparent' }
      ],
      features: [
        'Hyaluronic acid complex',
        'Vitamin C brightening',
        'Anti-aging properties',
        'Oil-free formula',
        'Dermatologist tested',
        'Suitable for all skin types'
      ],
      ingredients: 'Hyaluronic Acid, Vitamin C, Vitamin E, Green Tea Extract, Aloe Vera, Glycerin, distilled Water',
      howToUse: 'Apply 2-3 drops to clean face and neck, morning and evening. Gently massage until absorbed.',
      shipping: 'Free shipping on orders over KSh 5000'
    },
    3: {
      id: 3,
      name: 'Glow Foundation',
      basePrice: 3200,
      originalPrice: 4000,
      discount: 20,
      description: 'Achieve a flawless, radiant complexion with our Glow Foundation. This lightweight formula provides buildable coverage while giving your skin a natural luminous finish.',
      category: 'makeup',
      inStock: true,
      rating: 4.6,
      reviews: 95,
      images: [
        glowFoundation,
        glowFoundation,
        glowFoundation
      ],
      sizes: [
        { name: '30ml', price: 3200, originalPrice: 4000 }
      ],
      colors: [
        { name: 'Ivory', value: '#FFFFF0' },
        { name: 'Natural', value: '#F5DEB3' },
        { name: 'Tan', value: '#D2B48C' },
        { name: 'Deep', value: '#8B4513' }
      ],
      features: [
        'Buildable coverage',
        'Natural luminous finish',
        'SPF 20 protection',
        'Long-lasting wear',
        'Oil-free formula',
        'Suitable for all skin types'
      ],
      ingredients: 'Water, Cyclopentasiloxane, Glycerin, Titanium Dioxide, Iron Oxides, Vitamin E, botanical extracts',
      howToUse: 'Apply to clean, moisturized skin. Blend with foundation brush or sponge for seamless coverage.',
      shipping: 'Free shipping on orders over KSh 5000'
    },
    4: {
      id: 4,
      name: 'Matte Lipstick',
      basePrice: 1800,
      originalPrice: 2500,
      discount: 28,
      description: 'Make a statement with our luxurious Matte Lipstick. This highly pigmented formula delivers intense color payoff with a comfortable, non-drying matte finish.',
      category: 'makeup',
      inStock: true,
      rating: 4.4,
      reviews: 112,
      images: [
        matteLipstick,
        matteLipstick,
        matteLipstick
      ],
      sizes: [
        { name: '3.5g', price: 1800, originalPrice: 2500 }
      ],
      colors: [
        { name: 'Classic Red', value: '#DC143C' },
        { name: 'Nude', value: '#E0B0A0' },
        { name: 'Berry', value: '#8B4789' },
        { name: 'Coral', value: '#FF7F50' }
      ],
      features: [
        'Highly pigmented',
        'Long-lasting wear',
        'Non-drying formula',
        'Vitamin E enriched',
        'Creamy texture',
        'Precise application'
      ],
      ingredients: 'Ceresin, Synthetic Wax, Ethylhexyl Palmitate, Vitamin E, Iron Oxides, Titanium Dioxide, fragrance',
      howToUse: 'Apply directly to lips starting from the center and blending outward. For precise application, use a lip brush.',
      shipping: 'Free shipping on orders over KSh 5000'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = sampleProducts[id];
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0].name);
        }
        if (foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0].value);
        }
      }
      setLoading(false);
    }, 500);
  }, [id]);

  // Get current price based on selected size
  const getCurrentPrice = () => {
    if (!product || !selectedSize) return { price: 0, originalPrice: 0, discount: 0 };
    
    const selectedSizeObj = product.sizes.find(size => size.name === selectedSize);
    if (selectedSizeObj) {
      const discount = Math.round(((selectedSizeObj.originalPrice - selectedSizeObj.price) / selectedSizeObj.originalPrice) * 100);
      return {
        price: selectedSizeObj.price,
        originalPrice: selectedSizeObj.originalPrice,
        discount
      };
    }
    
    return { price: product.basePrice, originalPrice: product.originalPrice, discount: product.discount };
  };

  const currentPrice = getCurrentPrice();

  const handleSizeChange = (sizeName) => {
    setSelectedSize(sizeName);
    setPriceUpdated(true);
    setTimeout(() => setPriceUpdated(false), 600);
  };

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
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
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      if (isFavorite(product.id)) {
        removeFavorite(product.id);
        showNotification('Removed from favorites');
      } else {
        addFavorite(product);
        showNotification('Added to favorites!');
      }
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

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

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Notification */}
        {notification && (
          <div className="notification">
            {notification}
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
              <div className={`product-price ${priceUpdated ? 'price-updated' : ''}`}>
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
              {product.sizes.length > 0 && (
                <div className="option-group">
                  <label>Size:</label>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size.name}
                        className={`size-option ${selectedSize === size.name ? 'active' : ''}`}
                        onClick={() => handleSizeChange(size.name)}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
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
                        {color.value === 'transparent' && <span>Clear</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="option-group">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
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
              <p>Experience the ultimate in luxury and effectiveness with our carefully crafted formula. Each ingredient is selected for its proven benefits and compatibility with all skin types.</p>
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
            {/* Dynamic related products based on available sample products */}
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
                  <a 
                    href={`/product/${relatedProduct.id}`}
                    className="btn-view-details"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    View Details
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
