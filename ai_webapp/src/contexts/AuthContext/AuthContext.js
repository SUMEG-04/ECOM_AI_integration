// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  // State to track the user's authentication status
  const [user, setUser] = useState(null);

  // Function to log in the user
  const login = (email, password) => {
    // Simulate authentication for this example
    if (email === 'user@example.com' && password === 'password') {
      setUser({ email, name: 'John Doe' });
    } else {
      setUser(null);
    }
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
  };

  // Provide the context values to the components
  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <div className="auth-context">
        <div className="auth-background"></div>
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export default AuthProvider;