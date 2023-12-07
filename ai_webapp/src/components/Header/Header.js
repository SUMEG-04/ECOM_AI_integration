import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../useAuth/useAuth';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const [action,setAction]=useState('profile')

  const handleToggleDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownOption = (e) => {
    const option=e.target.value
    setAction(option)
    if(option==='help-support'){
      navigate('/help-support')
      handleToggleDropdown()
    }
    if (option === 'profile') {
      // Redirect to the profile page
      navigate('/profile');
      handleToggleDropdown()
    } else if (option === 'logout') {
      // Logout the user
      logout();
    }
    // Close the dropdown
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          YourBrand<span className="logo-subtitle">Shop</span>
        </NavLink>
        <nav className="nav">
        <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/"  className="nav-Navlink">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-Navlink">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-Navlink">
                Cart
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="user-actions">
          {user ? (
            <div className="dropdown">
            
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} >
                <InputLabel id="demo-simple-select-label">{user.firstName}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={action}
                  onChange={(e) => handleDropdownOption(e)}
                  defaultValue=""
                  >
                    <MenuItem value={'profile'}>profile</MenuItem>
                    <MenuItem value={'logout'}>logout</MenuItem>
                    <MenuItem value={'help-support'}>help&support</MenuItem>
                    </Select>
                  </FormControl>
                </div>
            </div>
          ) : (
            <div>
            <div>
           <NavLink to="/login" className="user-action">
            Login
          </NavLink>
          <NavLink to="/signup" className="user-action">
            Sign Up
          </NavLink>
           </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;




