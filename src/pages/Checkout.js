import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, clearCart } = useCart();
  
  // Redirect if cart is empty
  useEffect(() => {
    if (itemCount === 0) {
      navigate('/cart');
    }
  }, [itemCount, navigate]);

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Kenya'
    },
    
    // Billing Address
    sameAsShipping: true,
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Kenya'
    },
    
    // Shipping Method
    shippingMethod: 'standard',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Order Notes
    orderNotes: '',
    
    // Promo Code
    promoCode: '',
    discount: 0
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = total;
  const shippingCost = formData.shippingMethod === 'express' ? 500 : 200;
  const taxAmount = subtotal * 0.16; // 16% VAT
  const discountAmount = subtotal * (formData.discount / 100);
  const grandTotal = subtotal + shippingCost + taxAmount - discountAmount;

  // Steps configuration
  const steps = [
    { id: 1, name: 'Contact', icon: '👤' },
    { id: 2, name: 'Shipping', icon: '📍' },
    { id: 3, name: 'Payment', icon: '💳' },
    { id: 4, name: 'Review', icon: '✓' }
  ];

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Contact validation
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      // Shipping validation
      if (!formData.shippingAddress.street.trim()) newErrors['shipping.street'] = 'Street address is required';
      if (!formData.shippingAddress.city.trim()) newErrors['shipping.city'] = 'City is required';
      if (!formData.shippingAddress.state.trim()) newErrors['shipping.state'] = 'State is required';
      if (!formData.shippingAddress.zipCode.trim()) newErrors['shipping.zipCode'] = 'ZIP code is required';
      
      // Billing validation (if different from shipping)
      if (!formData.sameAsShipping) {
        if (!formData.billingAddress.street.trim()) newErrors['billing.street'] = 'Billing street is required';
        if (!formData.billingAddress.city.trim()) newErrors['billing.city'] = 'Billing city is required';
        if (!formData.billingAddress.state.trim()) newErrors['billing.state'] = 'Billing state is required';
        if (!formData.billingAddress.zipCode.trim()) newErrors['billing.zipCode'] = 'Billing ZIP is required';
      }
    }

    if (step === 3) {
      // Payment validation
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Invalid format (MM/YY)';
      
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddressChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [field]: value
      }
    }));
    
    // Clear error for this field
    const errorKey = `${type}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle step click
  const handleStepClick = (stepId) => {
    if (stepId < currentStep || completedSteps.includes(currentStep)) {
      setCurrentStep(stepId);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      // Process order
      alert('Order placed successfully! 🎉');
      clearCart();
      navigate('/order-confirmation');
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (formData.promoCode.toUpperCase() === 'GLOWIFY10') {
      setFormData(prev => ({ ...prev, discount: 10 }));
    } else if (formData.promoCode.toUpperCase() === 'WELCOME15') {
      setFormData(prev => ({ ...prev, discount: 15 }));
    } else {
      alert('Invalid promo code');
    }
  };

  // Format card number
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ');
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <h1 className="checkout-title">Secure Checkout</h1>
          <p className="checkout-subtitle">Complete your order in just a few steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="checkout-progress">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${currentStep === step.id ? 'active' : ''} ${completedSteps.includes(step.id) ? 'completed' : ''}`}
              onClick={() => handleStepClick(step.id)}
              style={{ cursor: (step.id < currentStep || completedSteps.includes(currentStep)) ? 'pointer' : 'default' }}
            >
              <div className="progress-number">
                {completedSteps.includes(step.id) ? '✓' : step.id}
              </div>
              <div className="progress-label">{step.name}</div>
            </div>
          ))}
        </div>

        <div className="checkout-container">
          {/* Checkout Form */}
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="form-section">
                  <h2 className="section-title">
                    <span className="section-icon">👤</span>
                    Contact Information
                  </h2>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-input ${errors.firstName ? 'error' : ''}`}
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-input ${errors.lastName ? 'error' : ''}`}
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+254 700 000 000"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="checkout-actions">
                {currentStep > 1 && (
                  <button type="button" className="btn-back" onClick={handlePrevious}>
                    ← Back
                  </button>
                )}
                
                {currentStep < 4 && (
                  <button type="button" className="btn-continue" onClick={handleNext}>
                    Continue →
                  </button>
                )}
                
                {currentStep === 4 && (
                  <button type="submit" className="btn-continue">
                    Place Order • KSh {grandTotal.toLocaleString()}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            {/* Order Items */}
            <div className="order-items">
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-quantity">Qty: {item.quantity}</div>
                  </div>
                  <div className="order-item-price">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="promo-code-section">
              <div className="promo-code-form">
                <input
                  type="text"
                  className="promo-input"
                  value={formData.promoCode}
                  onChange={(e) => handleInputChange('promoCode', e.target.value)}
                  placeholder="Enter promo code"
                />
                <button type="button" className="promo-button" onClick={applyPromoCode}>
                  Apply
                </button>
              </div>
              {formData.discount > 0 && (
                <p style={{ color: 'var(--success-color)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Promo code applied! {formData.discount}% discount
                </p>
              )}
            </div>

            {/* Order Totals */}
            <div className="order-totals">
              <div className="total-row">
                <span className="total-label">Subtotal</span>
                <span className="total-value">KSh {subtotal.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Shipping</span>
                <span className="total-value">KSh {shippingCost.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Tax (16%)</span>
                <span className="total-value">KSh {taxAmount.toLocaleString()}</span>
              </div>
              {formData.discount > 0 && (
                <div className="total-row" style={{ color: 'var(--success-color)' }}>
                  <span className="total-label">Discount ({formData.discount}%)</span>
                  <span className="total-value">-KSh {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span className="total-label">Total</span>
                <span className="total-value">KSh {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
