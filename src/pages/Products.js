import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { productsList } from '../data/products';
import ProductCard from '../components/ProductCard';
import "./Products.css";

const Products = () => {
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
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
      // Check if admin has added custom products
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

      // Cache bust: Force all base products to use the fresh definitions from products.js (fixes broken remote URLs)
      const freshIds = productsList.map(p => p.id);
      const adminAddedProducts = savedProducts.filter(p => !freshIds.includes(p.id));

      const mergedProducts = [...productsList, ...adminAddedProducts];
      setProducts(mergedProducts);
      localStorage.setItem("products", JSON.stringify(mergedProducts));
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    if (product.inStock) {
      addItem(product);
    }
  };

  const handleToggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <div className="no-products-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

