// UserAccount.js
import React from 'react';
import OrderHistory from './OrderHistory';
import './UserAccount.css';

const UserAccount = ({ user, orders }) => {
  return (
    <div className="user-account">
      <div className="user-info">
        <h2 className="user-info-title">Your Account</h2>
        <p className="user-info-text">
          Welcome, <span className="user-name">{user.name}</span>!
        </p>
        <p className="user-info-text">
          Email: <span className="user-email">{user.email}</span>
        </p>
      </div>
      {/* <div className="order-history">
        <h3 className="order-history-title">Order History</h3>
        {orders.length > 0 ? (
          <OrderHistory orders={orders} />
        ) : (
          <p className="order-history-empty">You haven't placed any orders yet.</p>
        )}
      </div> */}
    </div>
  );
};

export default UserAccount;
