// AuthComponent.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const AuthComponent = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default AuthComponent;
