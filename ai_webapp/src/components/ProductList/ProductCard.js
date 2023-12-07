import React from 'react';
import './ProductCard.css';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <NavLink className="products" to={`/singleproduct/${product._id}`}>
    <div className="products">
      <div className="product-card">
        <div className='img'><img src={product.image} alt={product.name || product.title} /></div>
        <div className="product-details">
          <h3>{product.name || product.title}</h3>
          {/* <p className='desc'>{product.description}</p> */}
          <div className="product-footer">
            <div><p>MRP: ${product.price}</p></div>
            {/* <div className="product-rating">
              {product.category && product.color ? (
                // Display for products from one data source (e.g., home page)
                <span>
                  Category: {product.category} | Color: {product.color} reviews
                </span>
              ) : product.rating && product.rating.count ? (
                // Display for products from another data source (e.g., product page)
                <span>
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </span>
              ) : null}
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </NavLink>
  );
};

export default ProductCard;
