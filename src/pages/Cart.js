import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Rose Lip Balm', price: 15, quantity: 1 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
          <p>{item.name} - ${item.price} x {item.quantity}</p>
        </div>
      ))}
      <p>Total: ${total}</p>
      <Link to="/checkout" className="btn">Checkout</Link>
    </div>
  );
};

export default Cart;
