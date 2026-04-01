import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Account updated:', formData);
    alert('Account information updated successfully!');
  };

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 4500,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-28',
      status: 'Processing',
      total: 2800,
      items: 2
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="account-section">
            <h2>Profile Information</h2>
            <form onSubmit={handleSubmit} className="account-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        );
        
      case 'orders':
        return (
          <div className="account-section">
            <h2>Order History</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <div>
                      <h3>{order.id}</h3>
                      <p>{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="order-details">
                    <p>{order.items} items • Total: KSh {order.total}</p>
                    <Link to={`/order/${order.id}`} className="btn-view-order">
                      View Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="account-section">
            <h2>Account Settings</h2>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Email Notifications</h3>
                  <p>Receive updates about your orders and promotions</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>SMS Notifications</h3>
                  <p>Get text updates about your order status</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Newsletter</h3>
                  <p>Subscribe to our weekly newsletter</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile, orders, and preferences</p>
        </div>

        <div className="account-layout">
          <nav className="account-nav">
            <button
              className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
            <button
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders
            </button>
            <button
              className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </nav>

          <div className="account-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
