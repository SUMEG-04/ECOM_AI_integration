// Home.js
import React, { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './Home.css';
import Services from '../../components/Services/Services';
import Trusted from '../../components/Trusted/Trusted';
import FearutedProducts from '../../components/ProductList/FeaturedProducts';

const Home = () => {
  // Sample featured products (replace with your actual product data)
  const [featuredProducts,setFeaturedProduct] = useState([
    {
      id: 1,
      name: 'Elegant Watch',
      description: 'Stylish and elegant watch for any occasion.',
      price: 129.99,
      image: 'https://unsplash.com/photos/round-silver-colored-fossil-chronograph-watch-at-922-with-brown-leather-band-4R_WEmhx8og',
      rating:{
        rate:"",
        count:"",
      },
    },
    {
      id: 2,
      name: 'Designer Handbag',
      description: 'A luxurious designer handbag for fashion enthusiasts.',
      price: 299.99,
      image: '/images/handbag.jpg',
      rating:{
        rate:"",
        count:"",
      },
    },
    {
      id: 3,
      name: 'Smartphone X',
      description: 'Cutting-edge smartphone with the latest technology.',
      price: 699.99,
      image: '/images/smartphone.jpg',
      rating:{
        rate:"",
        count:"",
      },
    },
    {
      "id": 4,
      "name": "Smartphone X",
      "description": "Cutting-edge smartphone with the latest technology.",
      "price": 699.99,
      "image": "/images/smartphone.jpg",
      "category": "Electronics",
      "rating": {
        "rate": 4.8,
        "count": 102
      }
    },   
    {
      "id": 5,
      "name": "Laptop Pro",
      "description": "High-performance laptop for work and gaming.",
      "price": 1299.99,
      "image": "/images/laptop.jpg",
      "category": "Electronics",
      "rating": {
        "rate": 4.5,
        "count": 88
      }
    },    
    {
      "id": 6,
      "name": "Smart Speaker",
      "description": "Voice-controlled smart speaker for your home.",
      "price": 149.99,
      "image": "/images/speaker.jpg",
      "category": "Electronics",
      "rating": {
        "rate": 4.3,
        "count": 65
      }
    },   
    {
      "id": 7,
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation.",
      "price": 199.99,
      "image": "/images/headphones.jpg",
      "category": "Electronics",
      "rating": {
        "rate": 4.6,
        "count": 92
      }
    },   
    {
      "id": 8,
      "name": "Elegant Men's Suit",
      "description": "A sophisticated men's suit perfect for formal occasions.",
      "price": 299.99,
      "image": "https://example.com/images/mens-suit.jpg",
      "category": "Men's Fashion",
      "rating": { "rate": 4.5, "count": 20 }
    },
    {
      "id": 9,
      "name": "Stylish Women's Dress",
      "description": "A fashionable women's dress for special events and parties.",
      "price": 149.99,
      "image": "https://example.com/images/womens-dress.jpg",
      "category": "Women's Fashion",
      "rating": { "rate": 4.2, "count": 15 }
    },
    {
      "id": 10,
      "name": "Classic Leather Shoes",
      "description": "Timeless leather shoes suitable for both formal and casual occasions.",
      "price": 79.99,
      "image": "https://example.com/images/leather-shoes.jpg",
      "category": "Footwear",
      "rating": { "rate": 4.7, "count": 25 }
    },
    {
      "id": 11,
      "name": "Fashionable Sunglasses",
      "description": "Trendy sunglasses to protect your eyes and enhance your style.",
      "price": 29.99,
      "image": "https://example.com/images/sunglasses.jpg",
      "category": "Accessories",
      "rating": { "rate": 4.3, "count": 18 }
    },{
      "id": 17,
      "name": "Stainless Steel Mixing Bowls (Set of 3)",
      "description": "A set of three stainless steel mixing bowls for all your kitchen needs.",
      "price": 29.99,
      "image": "/images/mixing-bowls.jpg",
       "rating": { "rate": 4.3, "count": 18 }
    },
    {
      "id": 12,
      "name": "Non-Stick Frying Pan",
      "description": "A high-quality non-stick frying pan for cooking delicious meals.",
      "price": 19.99,
      "image": "/images/frying-pan.jpg",
       "rating": { "rate": 4.3, "count": 18 }
    },
    {
      "id": 14,
      "name": "Cutlery Set (24-Piece)",
      "description": "A complete 24-piece cutlery set for your dining table.",
      "price": 39.99,
      "image": "/images/cutlery-set.jpg",
       "rating": { "rate": 4.3, "count": 18 }
    },
    {
      "id": 15,
      "name": "Glass Food Storage Containers (Set of 5)",
      "description": "A set of five glass food storage containers with secure lids.",
      "price": 24.99,
      "image": "/images/food-containers.jpg",
       "rating": { "rate": 4.3, "count": 18 }
    },
    {
      "id": 16,
      "name": "Coffee Maker with Grinder",
      "description": "An automatic coffee maker with a built-in grinder for fresh coffee every morning.",
      "price": 49.99,
      "image": "/images/coffee-maker.jpg",
      "rating": { "rate": 4.3, "count": 18 }    
    }
    
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/products/home', {
  //         method: 'GET',
  //         credentials:"include",
  //         headers: {
  //           Accept:"application/json",
  //           "Content-Type":"application/json" // Assuming you store the token in localStorage
  //         }
  //       });        
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setFeaturedProduct(data.data);
  //     } catch (error) {
  //       console.error('Error fetching product data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Discover Your Style</h1>
        <p className="hero-subtitle">Shop the latest trends in fashion and technology.</p>
      </div>
      <FearutedProducts/>
      <Services/>
      <Trusted/>
    </div>
  );
};

export default Home;
