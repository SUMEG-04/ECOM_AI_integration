// Checkout.js
import React from 'react';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className="checkout">
      <h2 className="checkout-title">Checkout</h2>
      <form className="checkout-form">
        <div className='checkout-info'>
        <div className="checkout-section">
          <h3 className="checkout-section-title">Shipping Information</h3>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Shipping Address:</label>
            <input type="text" id="address" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
          </div>
        </div>
        <div className="checkout-section">
          <h3 className="checkout-section-title">Payment Method</h3>
          <div className="form-group">
            <label htmlFor="cardNumber">Credit Card Number:</label>
            <input type="text" id="cardNumber" required />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="text" id="expiryDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" required />
          </div>
        </div>
        </div>
        <button className="place-order-button" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
