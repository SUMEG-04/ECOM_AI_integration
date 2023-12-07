import React from 'react';
import { IoMdTrash } from "react-icons/io";

const CartItem = ({ item, removeFromCart }) => {
  const { _id, color, quantity, product } = item;
  return (
    <div className="cart-item">
      <img className='cart-img' src={product.image[0].url|| product.image} alt={product.name || product.title} />
      <div className="cart-item-details">
        <h3 style={{fontSize:13}}>{product.name?.slice(0, 15) || product.title?.slice(0,15)}...</h3>
        <p style={{backgroundColor:color,width:20,height:20}}></p>
        <p>Price: ${product.price*quantity}</p>
        <p>Quantity: {quantity}</p>
        <button className='item-remove-btn' onClick={() => removeFromCart(_id)}><IoMdTrash style={{fontSize:25}}/></button>
      </div>
    </div>
  );
};

export default CartItem;
