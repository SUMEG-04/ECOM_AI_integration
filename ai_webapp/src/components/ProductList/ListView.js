// ProductList.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './ListView.css'

const ListView = ({ product }) => {
  return (
    
    <div className="list-view">
      <div className="list-item">
        <div className="listview-img"><img src={product.image} alt={product.name || product.title} /></div>
        <div className="list-details">
          <h3>{product.name || product.title}</h3>
          <p>{product.description.slice(0,99)}....</p>
          <div className="list-footer">
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
          <NavLink className="products" to={`/singleproduct/${product._id}`}>
          <button className='btn-read'>Read More</button>
          </NavLink>
        </div>
      </div>
    </div>
    
  );
};

export default ListView;
