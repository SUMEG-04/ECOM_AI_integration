import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useProductContext } from '../useAuth/useAuth';
import "./SingleProduct.css"
import { LocalShipping, Repeat, Security } from '@mui/icons-material';
import ProductImages from './ProductImages';
import Stars from './Stars';
import AddToCart from './AddToCart';
import ReviewList from '../Review/ReviewList';

const SingleProduct = () => {
  const { isSingleLoading, singleProduct, getsingleProduct } = useProductContext();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Determine the source URL based on some condition (e.g., product ID)
      const sourceUrl = id.startsWith('thapa') ? 'https://api.pujakaitem.com/api/products/' : 'http://localhost:3000/api/products/';
  
      // Fetch the product details using the determined source URL
      getsingleProduct(id, sourceUrl);
    }
  }, [id]);
  

  if (isSingleLoading) {
    return <div>Loading...</div>;
  }

  if (!singleProduct) {
    return <div>No product found</div>;
  }

  
  return (
    <>
    <div className='route-product'><NavLink to={"/home"}>Home</NavLink>/{singleProduct.title || singleProduct.name}</div>
    <div className="singleproduct-block">
    <div className="single-product-container">
      <div className="product-image">
        <ProductImages imgs={singleProduct.image}/>
      </div>
      <div className="product_details">
        <h1>{singleProduct.name || singleProduct.title}</h1>
        <Stars stars={singleProduct.stars} reviews={singleProduct.review}/>
        <p className="price">MRP: ${singleProduct.price}</p>
        <p className="description">{singleProduct.description}</p>
        <p className="company">Brand:{singleProduct.company}</p>
        <div className="rating">
        {singleProduct.category && singleProduct.colors ? (
                // Display for singleProducts from one data source (e.g., home page)
                <span>
                  Category: {singleProduct.category} 
                </span>
              ) : singleProduct.rating && singleProduct.rating.count ? (
                // Display for singleProducts from another data source (e.g., singleProduct page)
                <span>
                  Rating: {singleProduct.rating.rate} {/*({singleProduct.rating.count} reviews)*/}
                </span>
              ) : null}
        </div>
        <div className='product-date-warrenty'>
           <div className="product-warrenty-data">
                <LocalShipping className='warrenty-icon'/>
                <p>Free Delivery</p>
           </div>
           <div className="product-warrenty-data">
                <Repeat className='warrenty-icon'/>
                <p>20 Days Replacement</p>
           </div>
           <div className="product-warrenty-data">
                <Security className='warrenty-icon'/>
                <p>1 year warrenty</p>
           </div>
        </div>
        <div className="product-data-info">
            <p>Available:{singleProduct.stock>0 ? " In Stock":" Not Available"}</p>
        </div>
        <p>id:{singleProduct.id}</p>
        <AddToCart product={singleProduct}/>
        {singleProduct.stock>0 && <AddToCart product={singleProduct}/>}
      </div>
    </div>
    <ReviewList id={id}/>
    </div>
    </>
  );
};

export default SingleProduct;
