
import React from "react"
import { useProductContext } from "../useAuth/useAuth"
import ProductCard from "./ProductCard"

const FeaturedProducts = () => {
  const {isloading,featuredProducts}=useProductContext()

  if(isloading){
    return <div>.....Loading</div>
  }
  return (
    <>
     <h2>Our Feature Products</h2>
     <div className="product-list">
      <div className="product-cards">
      {featuredProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </div>
    </>
  )
}

export default FeaturedProducts
