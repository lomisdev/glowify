import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product }) => {
    const { addItem } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (product.inStock) {
            addItem(product);
        }
    };

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        if (isFavorite(product.id)) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/300x300/e91e63/ffffff?text=${encodeURIComponent(product.name)}`;
                    }}
                />
                <div className="product-badges">
                    {product.discount && (
                        <span className="discount-badge">-{product.discount}%</span>
                    )}
                    {!product.inStock && (
                        <span className="out-of-stock-badge">Out of Stock</span>
                    )}
                    <button
                        className={`wishlist-btn ${isFavorite(product.id) ? 'active' : ''}`}
                        onClick={handleToggleFavorite}
                        aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite(product.id) ? "var(--primary-color)" : "none"}>
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                {product.inStock && (
                    <div className="quick-add-overlay">
                        <button
                            className="btn-quick-add"
                            onClick={handleAddToCart}
                        >
                            Quick Add
                        </button>
                    </div>
                )}
            </div>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-info">
                    {product.category && <span className="product-category">{product.category}</span>}
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
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
