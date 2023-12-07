import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios'
import reducer from '../../reducer/ProductReducer'

const AuthContext = createContext();

const API="https://api.pujakaitem.com/api/products"

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, isAuthenticated: true, user: action.payload };
//     case 'LOGOUT':
//       return { ...state, isAuthenticated: false, user: null };
//     default:
//       return state;
//   }
// };

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: null,
    isLoading:false,
    isError:false,
    products:[],
    featuredProducts:[],
    isSingleLoading:false,
    singleProduct:{},
  });
  

  const login = (user, token) => {
    // Set the token in local storage
    localStorage.setItem('authToken', token);
    // Set the user as authenticated and store user data
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    // Clear the token from local storage
    localStorage.removeItem('authToken');
    // Clear the user data and log out
    dispatch({ type: 'LOGOUT' });
  };

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {

    const resBackend = await axios.get("http://localhost:3000/api/products/");
    const productsBackend = await resBackend.data.data;
    // const resApi = await axios.get(url);
    // const productsApi = await resApi.data;

    // Combine products from both APIs
    const combinedProducts = [ ...productsBackend];
    dispatch({ type: "SET_API_DATA", payload:combinedProducts });
    } catch (error) {
      console.log(error)
      dispatch({ type: "API_ERROR" });
    }
  };

  const getsingleProduct = async (url, source) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(`${source}${url}`);
      const product = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: product });
    } catch (error) {
      console.error('Error fetching single product data:', error);
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    // Check if the user has a valid token and set isAuthenticated and user accordingly
    const token = localStorage.getItem('authToken'); // Get the token from local storage

    getProducts(API);
    if (token) {
      // If there is a token, validate it on the server (e.g., send a request to validate the token)
      // If the token is still valid, fetch the user data
      // If the token is invalid, clear it and log out
      validateToken(token);
    }
  }, []); // The empty dependency array ensures this effect runs only once

  const validateToken = (token) => {
    // Replace the following with a request to validate the token on your server
    fetch('http://localhost:3000/api/auth/session', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (response.ok) {
          // If the token is valid, get user data from your server
          console.log(response)
          return response.json();
        } else {
          console.log(response)
          // If the token is invalid, clear it and log out
          localStorage.removeItem('authToken');
          dispatch({ type: 'LOGOUT' });
          return null;
        }
      })
      .then((userData) => {
        if (userData) {
          // Set the user as authenticated and store user data
          login(userData)
          dispatch({ type: 'LOGIN', payload: userData });
        }
      })
      .catch((error) => {
        console.error('Error validating token:', error);
      });
  };


  return (
    <AuthContext.Provider value={{ ...authState, login, logout,getsingleProduct }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useProductContext=()=>{
  return useContext(AuthContext)
}

export { AuthProvider, useAuth,useProductContext };
