import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">Glowify~Her Luxe</div>
          <p className="tagline">Clean, cruelty-free cosmetics for every glow.</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/shipping-returns">Shipping & Returns</a>
        </nav>

        <div className="footer-contact">
          <a href="mailto:support@glowbeauty.com">support@glowbeauty.com</a>
          <a href="tel:+254 748963356">+254 748963356</a>

          <div className="social" aria-label="Social links">
            <a
              href="https://www.instagram.com/its_ntimi_?igsh=OGRyam8xMWh3MmY4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 8.5h1.8V6.2c-.5-.1-1.6-.3-3-.3-3 0-3.9 1.9-3.9 3.8V12H8v2.5h1.9V22h2.6v-7.5H15l.0-2.0z" fill="currentColor"/>
              </svg>
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              title="Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22 5.9c-.6.3-1.2.5-2 .6.7-.4 1.2-1.1 1.5-1.9-.6.4-1.4.7-2.2.8-.6-.6-1.4-1-2.3-1-1.8 0-3.2 1.7-2.8 3.4-2.4-.1-4.6-1.3-6-3.1-.8 1.4-.1 3.1 1.3 3.9-.5 0-1-.1-1.4-.4 0 1.5 1.1 2.8 2.6 3-.5.1-1 .1-1.5.1-.4 0-.8 0-1.1-.1.8 2.4 3 4.1 5.6 4.2-2.1 1.7-4.7 2.7-7.5 2.7-.5 0-1 0-1.6-.1 2.6 1.7 5.7 2.7 9.1 2.7 10.9 0 16.9-9 16.9-16.9v-.8c1.2-.8 2.2-1.9 3-3.1-.9.4-1.9.7-3 .8z" fill="currentColor"/>
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@mambonilivewithchris?_t=ZM-90llIzYCkky&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 3h2.5v2.3c-.6.2-1.2.3-1.8.3-1.4 0-2.7-.6-3.6-1.6V12.5c0 1.9-1.6 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5c.3 0 .6.0.9.1V7.2c-.3-.1-.6-.1-.9-.1-2.6 0-4.7 2.1-4.7 4.7s2.1 4.7 4.7 4.7 4.7-2.1 4.7-4.7V6.5c.8.7 1.9 1.1 3 1.1V3z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>&copy; {year} GlowBeauty. All rights reserved. <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms</a></small>
      </div>
    </footer>
  );
};

export default Footer;
