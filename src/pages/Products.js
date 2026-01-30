import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'name',
    priceRange: [0, 10000]
  });

  useEffect(() => {
    // Simulate loading and fetch products
    const timer = setTimeout(() => {
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [
        {
          id: 1,
          name: 'Rose Lip Balm',
          price: 1500,
          originalPrice: 2000,
          image: '/products/rose-lip-balm.jpg',
          category: 'makeup',
          rating: 4.5,
          reviews: 128,
          discount: 25,
          inStock: true
        },
        {
          id: 2,
          name: 'Hydrating Face Serum',
          price: 3500,
          originalPrice: 4500,
          image: '/products/hydrating-serum.jpg',
          category: 'skincare',
          rating: 4.8,
          reviews: 89,
          discount: 22,
          inStock: true
        },
        {
          id: 3,
          name: 'Glow Foundation',
          price: 2800,
          originalPrice: 3500,
          image: '/products/glow-foundation.jpg',
          category: 'makeup',
          rating: 4.6,
          reviews: 203,
          discount: 20,
          inStock: true
        },
        {
          id: 4,
          name: 'Matte Lipstick Set',
          price: 2200,
          originalPrice: 2800,
          image: '/products/matte-lipstick.jpg',
          category: 'makeup',
          rating: 4.3,
          reviews: 156,
          discount: 21,
          inStock: false
        },
        {
          id: 5,
          name: 'Vitamin C Moisturizer',
          price: 1800,
          originalPrice: 2400,
          image: '/products/vitamin-c-serum.jpg',
          category: 'skincare',
          rating: 4.7,
          reviews: 92,
          discount: 25,
          inStock: true
        },
        {
          id: 6,
          name: 'Volume Mascara',
          price: 3200,
          originalPrice: 4000,
          image: '/products/mascara-volume.jpg',
          category: 'makeup',
          rating: 4.4,
          reviews: 78,
          discount: 20,
          inStock: true
        }
      ];
      setProducts(savedProducts);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'fragrance', label: 'Fragrance' },
    { value: 'haircare', label: 'Haircare' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Premium Beauty Collection</h1>
          <p className="page-subtitle">Discover our curated selection of high-quality cosmetics and skincare products</p>
        </div>

        {/* Filters and Controls */}
        <div className="products-controls">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="category-filter">Category</label>
              <select
                id="category-filter"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter">Sort</label>
              <select
                id="sort-filter"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="price-filter">Max Price: KSh {filters.priceRange[1]}</label>
              <input
                id="price-filter"
                type="range"
                min="0"
                max="10000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                className="price-range"
              />
            </div>
          </div>

          <div className="results-count">
            <span>{filteredProducts.length} products found</span>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="loading-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="product-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-rating"></div>
                  <div className="skeleton-price"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image || "/images/default-product.jpg"}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(product.name);
                    }}
                  />
                  <div className="product-badges">
                    {product.discount && (
                      <span className="discount-badge">-{product.discount}%</span>
                    )}
                    {!product.inStock && (
                      <span className="out-of-stock-badge">Out of Stock</span>
                    )}
                    <button className="wishlist-btn" aria-label="Add to wishlist">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
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
                    <span className="current-price">KSh {product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">KSh {product.originalPrice}</span>
                    )}
                  </div>
                  <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="btn-view-details">
                      View Details
                    </Link>
                    <button 
                      className={`btn-add-cart ${!product.inStock ? 'disabled' : ''}`}
                      disabled={!product.inStock}
                      aria-label={product.inStock ? "Add to cart" : "Out of stock"}
                    >
                      {product.inStock ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <div className="no-products-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search criteria</p>
            <button 
              onClick={() => setFilters({ category: 'all', sortBy: 'name', priceRange: [0, 10000] })}
              className="btn-reset-filters"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

