import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/useAuth/useAuth';
import './Profile.css'

const Profile = () => {
  const { user,login } = useAuth();

  const [data,setData]=useState({
    _id:"",
    firstName:"",
    lastName:"",
    contact:"",
    email:"",
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  })

  const [toupdate,setUpdate]=useState(true)

  useEffect(() => {
    // Fetch user data when the component mounts
    setData({...data,_id:user._id})
  }, []);

  const handleUpdateProfile = async () => {
    setUpdate(!toupdate)
  };
  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/update', {
        method: 'PUT',
        credentials: 'include', // Include credentials if needed
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the updated user data
      });
  
      if (response.ok) {
        // Profile updated successfully
        // user(updateProfile.user);
        const updatedData=await response.json()
        login(updatedData.user)
        console.log('Profile updated successfully');
        handleUpdateProfile()
      } else {
        // Handle the error when updating user data
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {toupdate ? (<>
        <div className="profile">
          <div className="profile-pic">
            <img
              src="https://ideogram.ai/api/images/direct/4Z-8nzjNR7KVi6124mIz1Q.jpg"
              alt=""
            />
          </div>
          <div className="profile-info">
            <div className='profile-details'>
              <label htmlFor="firstName">First Name:</label>
              <p>{user.firstName}</p>
            </div>
            <div className='profile-details'>
              <label htmlFor="lastName">Last Name:</label>
              <p>{user.lastName}</p>
            </div>
            <div className='profile-details'>
              <label htmlFor="email">Email:</label>
              <p>{user.email}</p>
            </div>
            <div className='profile-details'>
              <label htmlFor="contact">Contact:</label>
              <p>{user.contact}</p>
            </div>
          </div>
        </div>
        <button onClick={handleUpdateProfile}>Update Profile</button></>
      ) : (<>
        <div className='profile'>
        <div className="profile-pic">
            <img
              src="https://ideogram.ai/api/images/direct/4Z-8nzjNR7KVi6124mIz1Q.jpg"
              alt=""
            />
          </div>
          <div className="info">
            <div className='profile-details'>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className='profile-details'>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className='profile-details'>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className='profile-details'>
              <label htmlFor="contact">Contact:</label>
              <input
                type="number"
                id="conatct"
                name="contact"
                value={data.contact}
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="address-section">
            <h3>Address Information</h3>
            <div className="address-details">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={data.address.street}
                onChange={(e) => {
                  setData({
                    ...data,
                    address: { ...data.address, [e.target.name]: e.target.value },
                  });
                }}
              />
            </div>
            <div className="address-details">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={data.address.city}
                onChange={(e) => {
                  setData({
                    ...data,
                    address: { ...data.address, [e.target.name]: e.target.value },
                  });
                }}
              />
            </div>
            <div className="address-details">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={data.address.state}
                onChange={(e) => {
                  setData({
                    ...data,
                    address: { ...data.address, [e.target.name]: e.target.value },
                  });
                }}
              />
            </div>
            <div className="address-details">
              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={data.address.postalCode}
                onChange={(e) => {
                  setData({
                    ...data,
                    address: { ...data.address, [e.target.name]: e.target.value },
                  });
                }}
              />
            </div>
            <div className="address-details">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={data.address.country}
                onChange={(e) => {
                  setData({
                    ...data,
                    address: { ...data.address, [e.target.name]: e.target.value },
                  });
                }}
              />
            </div>
          </div>
         </div>
        </div>
        <button onClick={updateProfile}>Update Profile</button></>
      )}
    </div>
  );
  
};

export default Profile;
