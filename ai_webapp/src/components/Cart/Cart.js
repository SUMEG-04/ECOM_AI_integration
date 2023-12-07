import React from 'react';
import './Cart.css'
import CartItem from './CartItem'; // Import CartItem component
import { useCartContext } from '../../contexts/CartContext/CartContext'; // Import CartContext
import CheckoutPage from '../../pages/CheckoutPage/CheckoutPage';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const { cart, totalItems, totalAmount, removeFromCart } = useCartContext();
  return (
    <div className="cart">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
      ))}
      <div className="cart-total">
        <p>Total Items: {cart[0]?totalItems:0}</p>
        <p>Total Amount: ${totalAmount}</p>
        <NavLink to={"/checkout"}><button className="checkout-button">Checkout</button></NavLink>
      </div>
      {/* Add additional styling or functionality as needed */}
    </div>
  );
};

export default Cart;
