// NotFound.js

import React from 'react';
import './NotFound.css'; // Import your CSS for styling
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-message">The page you are looking for does not exist.</p>
      <button className='home-button'><NavLink to={"/home"}>Home</NavLink></button>
    </div>
  );
};

export default NotFound;
