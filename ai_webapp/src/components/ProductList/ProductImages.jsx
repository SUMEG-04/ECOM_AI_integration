import React, { useState } from 'react';

const ProductImages = ({ imgs = [{ url: "" }] }) => {
  const [pic, setPic] = useState(imgs[0]);


  if (!Array.isArray(imgs)) {
    // Handle the case where imgs is not an array
    return <div className='img-product'><img src={imgs} alt="" /></div>;
  }

  return (
    <>
      <div className="grid grid-four-col">
        {imgs.map((currElem, index) => (
          <figure key={index}>
            <img
              src={currElem.url}
              alt={currElem.filename}
              className='box-image-style'
              onClick={() => setPic(currElem)}
            />
          </figure>
        ))}
      </div>
      <div className="main-section">
        <img src={pic.url} alt={imgs[0].filename} />
      </div>
    </>
  );
};

export default ProductImages;
