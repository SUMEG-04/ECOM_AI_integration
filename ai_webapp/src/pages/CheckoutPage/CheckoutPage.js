// CheckoutPage.js
import React from 'react';
import Checkout from '../../components/Checkout/Checkout';
import './CheckoutPage.css';

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <h1 className="checkout-page-title">Checkout</h1>
      <div className="checkout-content">
        <Checkout />
      </div>
    </div>
  );
};

export default CheckoutPage;
