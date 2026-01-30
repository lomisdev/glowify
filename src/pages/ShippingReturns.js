import React from 'react';
import './ShippingReturns.css';

const ShippingReturns = () => {
  return (
    <div className="shipping-page">
      <header className="shipping-header">
        <h1>🚚 Shipping & Returns — Powered by Sui Blockchain</h1>
        <p>Experience transparent, secure, and efficient delivery backed by blockchain technology.</p>
      </header>

      <section className="shipping-section">
        <h2>🔗 How It Works</h2>
        <ol>
          <li>
            <strong>Order Confirmation:</strong> When you place an order, a unique transaction record is created on the <b>Sui blockchain</b> — serving as a digital proof-of-purchase that can’t be altered.
          </li>
          <li>
            <strong>Shipping Tracking:</strong> Every step from packing to delivery is updated on-chain, allowing you to verify your product’s movement in real-time.
          </li>
          <li>
            <strong>Returns & Verification:</strong> If you return an item, its blockchain record confirms authenticity and prevents tampering or fraud.
          </li>
          <li>
            <strong>Smart Contract Automation:</strong> Refunds and exchanges are triggered automatically once return conditions are met.
          </li>
        </ol>
      </section>

      <section className="benefits-section">
        <h2>⚙️ Benefits</h2>
        <ul>
          <li>✅ Transparency – Every step is publicly verifiable on the blockchain.</li>
          <li>✅ Trust – Proof of authenticity and delivery stored immutably.</li>
          <li>✅ Efficiency – Smart contracts automate refund and return processes.</li>
          <li>✅ Security – Tamper-proof, cryptographically secured data.</li>
          <li>✅ Sustainability – Reduces paperwork and fraud for a greener supply chain.</li>
        </ul>
      </section>

      <section className="why-sui-section">
        <h2>🌐 Why Sui?</h2>
        <p>
          Sui offers high transaction speed, low fees, and an object-based model perfect for tracking unique cosmetic products. 
          Its scalability and efficiency make it the ideal blockchain for Glowify’s logistics.
        </p>
      </section>

      <footer className="shipping-footer">
        <p>💄 Glowify — Bringing transparency and trust to beauty through innovation.</p>
      </footer>
    </div>
  );
};

export default ShippingReturns;
