// ProductPage.js
import React, { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './ProductPage.css';
import { useProductContext } from '../../components/useAuth/useAuth';

const ProductPage = () => {
  const { isloading, products } = useProductContext();
  // State for filtering options
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    price: '',
    // Add more filters as needed
  });
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for displaying filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);


  // Apply filters when filters or searchQuery change
  
  useEffect(() => {
    // Filter products based on category, company, price, etc.
    const filtered = products.filter((product) => {
      // Check category filter
      const categoryMatch =
        !filters.category || (product.category && product.category.toLowerCase() === filters.category.toLowerCase());
  
      // Check company filter
      const companyMatch =
        !filters.company || (product.company && product.company.toLowerCase() === filters.company.toLowerCase());
  
      // Check price filter (you may need to implement a more sophisticated logic)
      const priceMatch =
        !filters.price || (product.price && parseFloat(product.price) <= parseFloat(filters.price));
  
      // Check search query
      const searchMatch =
        !searchQuery ||
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
  
      return categoryMatch && companyMatch && priceMatch && searchMatch;
    });
  
    setFilteredProducts(filtered);
  }, [filters, searchQuery, products]);
  

  if (isloading) {
    return <div>.....Loading</div>;
  }


  return (
    <div className="product-page">
      <div className="sidebar">
        <div className="sidebar-container">
          {/* Filter options */}
        <h3>Filter Options</h3>
        {/* Add your filter UI elements here */}
        {/* Example: */}
        <label>
          Category:
          <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="">All</option>
            {/* Add unique categories from your products */}
            {[...new Set(products.map((product) => product.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        {/* Add more filters as needed */}

        {/* Search bar */}
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
      </div>

      <div className="product-list">
        <h2 className="product-list-title">Explore Our Products</h2>
        {filteredProducts && filteredProducts.length > 0 ? (
          <ProductList product={filteredProducts} />
        ) : (
          <p className="loading-message">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
