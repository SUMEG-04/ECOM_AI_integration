import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import CartAmountToggle from './CartAmountToggle';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext/CartContext';

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { _id, colors, price } = product;
  const stock = 5 || product.stock;
  const [quantity, setQuantity] = useState(1);
  const tempColor = colors && colors.length > 0 ? colors[0] : "black";
  const [color, setColor] = useState(tempColor);

  const setIncrease = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, stock));
  };

  const setDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <>
      <div>
        <p className='color-style'>
          Colors:
          {colors &&
            colors.map((currelem, index) => (
              <button
                key={index}
                style={{ backgroundColor: currelem }}
                onClick={() => {
                  setColor(currelem);
                }}
                className={color === currelem ? "btnStyle active" : "btnStyle"}
              >
                {color === currelem ? <FaCheck className='check' /> : null}
              </button>
            ))}
        </p>
      </div>
      <CartAmountToggle quantity={quantity} setDecrease={setDecrease} setIncrease={setIncrease} />
      <NavLink to={"/cart"} onClick={() => addToCart(_id, color, quantity, product)}>
        <button className='cart-button'>Add to cart</button>
      </NavLink>
    </>
  );
};

export default AddToCart;
