import React, { useState } from 'react';
import './Signup.css';
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'; // Import Axios

const Signup = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact:'',
    password: '',
    cpassword: '',
  });

  const [errors, setErrors] = useState({});
  // const resetForm = () => {
  //   setFormData({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     contact: '',
  //     password: '',
  //     cpassword: '',
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({})
  };

  const handleSignup = async () => {


    try {
      const res = await axios.post('http://localhost:3000/api/users/register', formData);
      // Check if the email is already registered
      if (res.status === 201) {
        alert(res.data.message);
        navigate('/login');
      }      

      // You can handle other cases or actions here
    } catch (error) {
      if (error.response && error.response.status === 422) {
        if (error.response.data && error.response.data.error) {
          // Extract validation errors
          setErrors({ [error.response.data.path]: error.response.data.error });
        }
        console.log(error);
      }else{
        if (error.response && error.response.data && error.response.data.errors) {
          // Extract validation errors
          const validationErrors = {};
  
          error.response.data.errors.forEach((err) => {
            // Map the error to the input field (path)
            validationErrors[err.path] = err.msg;
          });
  
          setErrors(validationErrors);
        }
        console.log(error)
      }
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
        <div className="input-container">
          <div>
          <input
            className='signup-input'
            type="text"
            name='firstName'
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
           {errors.firstName && <div className="error">{errors.firstName}</div>}</div>
          <div><input
            className='signup-input'
            type="text"
            name='lastName'
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
           {errors.lastName && <div className="error">{errors.lastName}</div>}</div>
        </div>
        <input
          className='signup-input'
          type="email"
          name='email'
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
         {errors.email && <div className="error">{errors.email}</div>}
        <input
          className='signup-input'
          type="contact"
          name='contact'
          placeholder="Contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
        <input
          className='signup-input'
          type="password"
          name='password'
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <input
          className='signup-input'
          type="password"
          name='cpassword'
          placeholder="Confirm Password"
          value={formData.cpassword}
          onChange={handleInputChange}
        />
         {errors.cpassword && <div className="error">{errors.cpassword}</div>}
        <button className='signup-button' onClick={handleSignup}>Sign Up</button>
        <NavLink to="/login">Already registered!</NavLink>
      </div>
    </div>
  );
};

export default Signup;
