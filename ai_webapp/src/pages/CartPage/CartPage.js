import React, { useEffect } from 'react';
import Cart from '../../components/Cart/Cart';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/useAuth/useAuth';
import { useCartContext } from '../../contexts/CartContext/CartContext';

const CartPage = () => {
  const { cart, total,getAllCartItems } = useCartContext(); // Use actual cart data from the context
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="cart-page">
      {isAuthenticated ? (
        // Render the content for authenticated users
        <div className='cart-container'>
          <h1 className="cart-page-title">Your Shopping Cart</h1>
          <div className="cart-content">
            <Cart cartItems={cart} total={total} />
          </div>
        </div>
      ) : (
        // Render a message or a login prompt for non-authenticated users
        <div className="login-prompt">
          <div className="login-block">
            <p>Please log in to access your cart.</p>
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
