import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (itemCount === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1h5l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
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
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart ({itemCount} items)</h1>
          {itemCount > 0 && (
            <button onClick={handleClearCart} className="btn-clear-cart">
              Clear Cart
            </button>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <div className="item-price">
                    KSh {item.price}
                    {item.originalPrice && (
                      <span className="original-price">KSh {item.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="item-quantity">
                  <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="quantity-input"
                    />
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-subtotal">
                  KSh {item.price * item.quantity}
                </div>

                <div className="item-actions">
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="btn-remove"
                    aria-label="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal ({itemCount} items)</span>
                <span>KSh {total}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>KSh {Math.round(total * 0.16)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>KSh {Math.round(total * 1.16)}</span>
              </div>

              <div className="summary-actions">
                <Link to="/checkout" className="btn-primary btn-checkout">
                  Proceed to Checkout
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                
                <Link to="/products" className="btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
