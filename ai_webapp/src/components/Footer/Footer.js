import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Instagram } from '@mui/icons-material'; // Import MUI icons
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <strong>Email:</strong> contact@yourbrandshop.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p>
            <strong>Address:</strong> 1234 Elm Street, City, Country
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/faq">FAQ</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <NavLink to="#" className="social-icon">
              <Facebook /> {/* MUI Facebook icon */}
            </NavLink>
            <NavLink to="#" className="social-icon">
              <Twitter /> {/* MUI Twitter icon */}
            </NavLink>
            <NavLink to="#" className="social-icon">
              <Instagram /> {/* MUI Instagram icon */}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 YourBrand Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
