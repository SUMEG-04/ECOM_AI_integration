// UserAccountPage.js
import React from 'react';
import UserAccount from '../../components/UserAccount/UserAccount';
import './UserAccountPage.css';

const UserAccountPage = () => {
  // Sample user data (replace with actual user data)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  // Sample order history (replace with actual order history data)
  const orders = [
    {
      id: 1,
      date: '2023-10-15',
      total: 259.97,
    },
    {
      id: 2,
      date: '2023-10-20',
      total: 179.99,
    },
  ];

  return (
    <div className="user-account-page">
      <h1 className="user-account-page-title">Your Account</h1>
      <div className="user-account-content">
        <UserAccount user={user} orders={orders} />
      </div>
    </div>
  );
};

export default UserAccountPage;
