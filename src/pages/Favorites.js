import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import './Favorites.css';

const Favorites = () => {
  const { items: favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const handleRemoveFavorite = (productId) => {
    removeFavorite(productId);
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="empty-favorites">
            <div className="empty-favorites-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>No favorites yet</h2>
            <p>Start adding products you love to your favorites list!</p>
            <Link to="/products" className="btn-primary">
              Browse Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1>My Favorites ({favorites.length} items)</h1>
        </div>

        <div className="favorites-grid">
          {favorites.map(item => (
            <div key={item.id} className="favorite-item">
              <div className="favorite-image">
                <img src={item.image} alt={item.name} />
                <button 
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(item.id)}
                  aria-label="Remove from favorites"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="favorite-info">
                <span className="favorite-category">{item.category}</span>
                <h3>{item.name}</h3>
                <div className="favorite-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(item.rating) ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">{item.rating} ({item.reviews})</span>
                </div>
                <div className="favorite-price">
                  <span className="current-price">KSh {item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price">KSh {item.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="favorite-actions">
                <Link to={`/product/${item.id}`} className="btn-view-details">
                  View Details
                </Link>
                <button className="btn-add-cart" onClick={() => handleAddToCart(item)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
