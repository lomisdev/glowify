// src/pages/About.js
import React from 'react';

function About() {
  return (
    <div className="about-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>About Glowify</h1>
      <p style={{ maxWidth: '700px', margin: '1rem auto', lineHeight: '1.6' }}>
        Welcome to <strong>Glowify</strong> — your trusted destination for premium cosmetics, skincare, and beauty essentials.  
        Our mission is to make self-care accessible, enjoyable, and empowering.  
        From luxurious perfumes to skincare products that truly work, we ensure quality and authenticity in every item we offer.
      </p>
      <p style={{ maxWidth: '700px', margin: '1rem auto', lineHeight: '1.6' }}>
        We’re passionate about helping you look and feel your best, every single day.  
        Thank you for choosing Glowify — where beauty meets confidence.
      </p>
    </div>
  );
}

export default About;
