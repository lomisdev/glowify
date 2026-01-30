// src/pages/FAQ.js
import React from 'react';
import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions (FAQ)</h1>

      <div className="faq-item">
        <h3>What is Glowify?</h3>
        <p>Glowify is a beauty and cosmetics brand offering high-quality, skin-friendly products designed to enhance your natural glow.</p>
      </div>

      <div className="faq-item">
        <h3>How can I place an order?</h3>
        <p>Browse our products, add items to your cart, and checkout. You'll receive a confirmation email once your order is placed.</p>
      </div>

      <div className="faq-item">
        <h3>What payment methods do you accept?</h3>
        <p>We accept M-Pesa, Visa, MasterCard, PayPal, and Cash on Delivery (in select regions).</p>
      </div>

      <div className="faq-item">
        <h3>Can I return or exchange a product?</h3>
        <p>Yes, within 7 days of delivery as long as the product is unused and in original packaging.</p>
      </div>

      <div className="faq-item">
        <h3>How can I contact support?</h3>
        <p>Email us at <a href="mailto:support@glowify.com">support@glowify.com</a> or call +254 748 963 356.</p>
      </div>
    </div>
  );
};

export default FAQ;
