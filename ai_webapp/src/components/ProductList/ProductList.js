// ProductList.js
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { useFilterContext } from '../../contexts/FilterContext/FilterContextProvider';
import ListView from './ListView';
import { FaList } from 'react-icons/fa';
import { BsFillGridFill } from "react-icons/bs";

const ProductList = ({ product }) => {
  const {filter_products,grid_view,setGridView}=useFilterContext();
  if(grid_view===false){
    return(
      <div className="product-list">
    <div className="view-buttons">
        <button className={grid_view? "active sort-btn":"sort-btn"} onClick={() => setGridView(true)}><BsFillGridFill/></button>
        <button className={grid_view? "sort-btn":"active sort-btn"} onClick={() => setGridView(false)}><FaList/></button>
      </div>
      <div className="product-cards">
      {filter_products?.map((product) => (
        <ListView key={product.id} product={product}/>
      ))}
      </div>
    </div>
    )
  }
  return (
    <div className="product-list">
    <div className="view-buttons">
        <button className={grid_view? "active sort-btn":"sort-btn"} onClick={() => setGridView(true)}><BsFillGridFill/></button>
        <button className={grid_view? "sort-btn":"active sort-btn"} onClick={() => setGridView(false)}><FaList/></button>
      </div>
      <div className="product-cards">
      {product?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </div>
  );
};

export default ProductList;
